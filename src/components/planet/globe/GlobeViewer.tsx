'use client';

import { Box, useMantineTheme, Center } from '@mantine/core';
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import * as THREE from 'three';
import { useVoyager } from '@/contexts/VoyagerContext';
import { getPlanetContinents } from '@/utils/data/queries/getPlanetContinents';
import { useContinentPolygons } from './useContinentPolygons';
import { planetMoods } from './data';
import LoadingScreen from '@/components/core/loading/LoadingScreen';

// Dynamic import for Globe
const Globe = dynamic(() => import('react-globe.gl'), { ssr: false });

const noise2D = (lat: number, lng: number) =>
  Math.abs(Math.sin(lat / 50 + lng / 50)); // fast pseudo-noise fallback

function getElevation(lat: number, lng: number) {
  return 0.01 + noise2D(lat, lng) * 0.03;
}

interface GlobeViewerProps {
  moodKey?: keyof typeof planetMoods; // Allow dynamic mood selection
}

export default function GlobeViewer({ moodKey = 'cryonix' }: GlobeViewerProps) {
  const globeRef = useRef<any>(null);
  const theme = useMantineTheme();
  const moodSettings = planetMoods[moodKey];
  const [continents, setContinents] = useState<any[]>([]);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });
  const { voyager, loading } = useVoyager();
  const backgroundColor = theme.colorScheme === 'dark' ? 'black' : 'white';

  // Fetch continents data based on the current planet
  useEffect(() => {
    if (loading || !voyager?.location) return;

    const fetchContinents = async () => {
      const data = await getPlanetContinents(voyager.location);
      setContinents(data);
    };

    fetchContinents();
  }, [voyager?.location, loading]);

  if (loading || !voyager) return <LoadingScreen />;

  // Handle window resizing
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Trigger resize initially

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Ensure globeRef is properly set before applying auto-rotation and fog
  useEffect(() => {
    if (!globeRef.current) return; // Ensure the globeRef is available

    const controls = globeRef.current.controls();
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.3;

    const scene = globeRef.current.scene();
    const light = new THREE.PointLight(0xccccff, 1, 0);
    light.position.set(0, 0, 300);
    scene.add(light);

    return () => {
      scene.remove(light); // Clean up the light when the component unmounts
    };
  }, []);

  // Use useContinentPolygons unconditionally
  const geoJson = useContinentPolygons({ continents });
  if (!geoJson) return <LoadingScreen />;

  return (
    <Box w="100%" pos="relative">
      <Center> 
        <Globe
          ref={globeRef}
          backgroundColor={backgroundColor}
          polygonsData={geoJson.features}
          polygonAltitude={(d: any) => {
            const c = d.geometry.coordinates?.[0]?.[0];
            return c ? getElevation(c[1], c[0]) : 0.01;
          }}
          polygonLabel={(d: any) => `<b>${d.properties.name}</b><br/>${d.properties.description || ''}`}
          onPolygonClick={(d: any) => alert('Clicked continent: ' + d.properties.name)}
          globeMaterial={new THREE.MeshStandardMaterial({
            color: moodSettings.globe.color,
            emissive: moodSettings.globe.emissive,
            emissiveIntensity: 0.7,
            metalness: 0.4,
            roughness: 0.3,
          })}
          polygonCapColor={() => moodSettings.continentColor}
          polygonSideColor={() => moodSettings.side}
          polygonStrokeColor={() => moodSettings.stroke}
          onGlobeClick={() => {
            const controls = globeRef.current.controls();
            controls.autoRotate = !controls.autoRotate;
          }} 

          width={windowSize.width}
          height={windowSize.height - 150} // Adjust height to remove navbar space
        />
      </Center>
    </Box>
  );
}

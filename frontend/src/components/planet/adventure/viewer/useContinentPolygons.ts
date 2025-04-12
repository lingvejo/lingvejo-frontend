import { useMemo } from 'react';
import { polygon as turfPolygon } from '@turf/turf';
import { createNoise2D } from 'simplex-noise';
import type { FeatureCollection, Feature } from 'geojson';

const noise2D = createNoise2D();

function generatePolygon(center: [number, number], radius = 20): number[][] {
  const [centerLat, centerLng] = center;
  const points: number[][] = [];
  const steps = 100;

  for (let i = 0; i < steps; i++) {
    const angle = (2 * Math.PI * i) / steps;
    let r = radius;

    const noise1 = noise2D(Math.cos(angle) + centerLat / 90, Math.sin(angle) + centerLng / 180);
    const noise2 = noise2D(2 * Math.cos(angle) + centerLat / 90, 2 * Math.sin(angle) + centerLng / 180);
    const noise3 = noise2D(4 * Math.cos(angle) + centerLat / 90, 4 * Math.sin(angle) + centerLng / 180);
    const elevation = 1 + 0.4 * noise1 + 0.2 * noise2 + 0.1 * noise3;

    r *= elevation;

    const lat = centerLat + r * Math.cos(angle);
    const lng = centerLng + r * Math.sin(angle);
    points.push([lng, lat]);
  }

  points.push(points[0]);
  return points;
}

interface Continent {
  continentId: number;
  name: string;
  description?: string;
}

interface UseContinentPolygonsProps {
  continents: Continent[];
}

export function useContinentPolygons({ continents }: UseContinentPolygonsProps): FeatureCollection | null {
  // Wrap the logic in useMemo but return null when continents are empty or invalid
  return useMemo(() => {
    if (!continents || continents.length === 0) {
      return null; // Return null if continents are empty or invalid
    }

    const continentFeatures: Feature[] = [];

    continents.forEach((c, ci) => {
      const phi = Math.acos(1 - 2 * (ci + 0.5) / continents.length);
      const theta = Math.PI * (1 + Math.sqrt(5)) * (ci + 0.5);

      let latC = 90 - (phi * 180) / Math.PI;
      const maxLat = 60;
      latC = Math.max(Math.min(latC, maxLat), -maxLat);

      const lngC = ((theta * 180) / Math.PI + 180) % 360 - 180;
      const center: [number, number] = [latC, lngC];
      const polyCoords = generatePolygon(center, 20);
      const polygon = turfPolygon([polyCoords]);

      continentFeatures.push({
        type: 'Feature',
        properties: {
          level: 'continent',
          continentId: c.continentId,
          name: c.name,
          description: c.description,
        },
        geometry: polygon.geometry,
      });
    });

    return {
      type: 'FeatureCollection',
      features: continentFeatures,
    };
  }, [continents]); // Re-run when continents data changes
}

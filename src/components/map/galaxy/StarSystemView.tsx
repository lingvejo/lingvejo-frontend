import React, { useState } from 'react';
import { Center, Tooltip } from '@mantine/core';
import { motion } from 'framer-motion';
import { IconPlanet, IconSun } from '@tabler/icons-react';
import AstronomicalObjectInfo from './AstronomicalObjectInfo';

interface Planet {
  name: string;
  iso: string;
  orbitWidth: number;
  orbitHeight: number;
  duration: number;
  adventurers: number;
  wizards: number;
  discovered: { date: string; by: string };
  lastObserved: { date: string; by: string };
  color: string;
}

interface StarSystemViewProps {
  systemName: string;
  planets: Planet[];
}

const calculateOrbitData = (planets: Planet[]) => {
  const baseOrbit = 12;
  const orbitIncrement = 6;
  const baseDuration = 90;

  return planets.map((planet, index) => {
    const orbitWidth = baseOrbit + index * orbitIncrement;
    const orbitHeight = orbitWidth * 0.6;
    const duration = baseDuration * Math.pow(orbitWidth / baseOrbit, 1.5);
    const startAngle = Math.random() * 360;

    return { ...planet, orbitWidth, orbitHeight, duration, startAngle };
  });
};

const PlanetWithTooltip: React.FC<{ planet: Planet; onClick: (planet: Planet) => void, planetInfoClosed: boolean }> = ({
  planet, onClick, planetInfoClosed
}) => (
  <motion.div
    animate={{
      x: [`${planet.orbitWidth}vw`, 0, `-${planet.orbitWidth}vw`, 0, `${planet.orbitWidth}vw`],
      y: [0, `${planet.orbitHeight}vw`, 0, `-${planet.orbitHeight}vw`, 0],
    }}
    transition={{ duration: planet.duration, repeat: Infinity, ease: 'linear' }}
    style={{
      position: 'absolute',
      top: '0%',
      left: '50%',
      transform: 'translate(-50%, 0%)',
      cursor: 'pointer',
    }}
    onClick={() => onClick(planet)}
  >
    <Tooltip label={planet.name} withArrow position="bottom" opened={planetInfoClosed}>
      <IconPlanet size={24} color={planet.color} style={{ filter: 'drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.5))' }} />
    </Tooltip>
  </motion.div>
);

const StarSystemView: React.FC<StarSystemViewProps> = ({ systemName, planets }) => {
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null);
  const planetData = calculateOrbitData(planets);

  return (
    <Center style={{ position: 'relative', width: '90%', height: '70vh', overflow: 'hidden' }}>
      <Tooltip label={systemName} withArrow position="bottom">
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            filter: 'drop-shadow(0px 6px 15px rgba(255, 255, 0, 0.8))',
          }}
        >
          <IconSun size={100} color="orange" />
        </motion.div>
      </Tooltip>

      {planetData.map((planet) => (
        <motion.div
          key={planet.name}
          animate={{ rotate: [planet.startAngle, planet.startAngle + 360] }}
          transition={{ duration: planet.duration, repeat: Infinity, ease: 'linear' }}
          style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
        >
          <PlanetWithTooltip planet={planet} onClick={setSelectedPlanet} planetInfoClosed={!selectedPlanet} />
        </motion.div>
      ))}

      <AstronomicalObjectInfo planet={selectedPlanet} planetInfoOpened={!!selectedPlanet} onClose={() => setSelectedPlanet(null)} />
    </Center>
  );
};

export default StarSystemView;

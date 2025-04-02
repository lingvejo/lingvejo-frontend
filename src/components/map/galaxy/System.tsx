import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { IconPlanet, IconSun } from '@tabler/icons-react';
import { Center, Tooltip } from '@mantine/core';

// Function to calculate scientifically accurate orbit properties
const calculateOrbitData = (planets: { name: string; iso: string }[]) => {
  const baseOrbit = 12; // Minimum orbit size in viewport units (vw)
  const orbitIncrement = 6; // Increment per planet
  const baseDuration = 60; // Base duration for the closest orbit

  return planets.map((planet, index) => {
    const orbitWidth = baseOrbit + index * orbitIncrement;
    const orbitHeight = orbitWidth * 0.6; // Elliptical orbit ratio
    const duration = baseDuration * Math.pow(orbitWidth / baseOrbit, 1.5); // Kepler’s approximation
    const startAngle = Math.random() * 360;

    return { ...planet, orbitWidth, orbitHeight, duration, startAngle };
  });
};

const PlanetWithTooltip: React.FC<{ planet: any; planetInfoOpened: boolean; onClick: (planet: any) => void }> = ({
  planet,
  planetInfoOpened,
  onClick,
}) => {
  const planetRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={planetRef}
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
      <Tooltip label={planet.name} withArrow position="bottom" opened={!planetInfoOpened}>
        <IconPlanet
          size={24}
          color={planet.color}
          style={{
            filter: 'drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.5))', // Shadow effect
          }}
        />
      </Tooltip>
    </motion.div>
  );
};

const System: React.FC<{
  systemName: string;
  planets: { name: string; iso: string }[];
  onPlanetClick: (planet: any) => void;
  planetInfoOpened: boolean;
}> = ({ systemName, planets, onPlanetClick, planetInfoOpened }) => {
  const planetData = calculateOrbitData(planets);

  return (
    <Center style={{ position: 'relative', width: '90%', height: '70vh', overflow: 'hidden' }}>
      {/* Sun at the center */}
      <Tooltip label={systemName} withArrow position="bottom">
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            filter: 'drop-shadow(0px 6px 15px rgba(255, 255, 0, 0.8))', // Glowing shadow for the sun
          }}
        >
          <IconSun size={50} color="orange" />
        </motion.div>
      </Tooltip>

      {/* Planets */}
      {planetData.map((planet) => (
        <motion.div
          key={planet.name}
          animate={{ rotate: [planet.startAngle, planet.startAngle + 360] }}
          transition={{ duration: planet.duration, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <PlanetWithTooltip planet={planet} planetInfoOpened={planetInfoOpened} onClick={onPlanetClick} />
        </motion.div>
      ))}
    </Center>
  );
};

export default System;

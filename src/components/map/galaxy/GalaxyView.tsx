import { motion } from 'framer-motion';
import { IconGalaxy, IconSun } from '@tabler/icons-react';
import { Center, Tooltip } from '@mantine/core';
import StarSystemView from './StarSystemView';

type System = {
  systemName: string;
  planets: any[];
};

type GalaxyViewProps = {
  systems: System[];
  selectedSystem: System | null;
  setSelectedSystem: (system: System | null) => void;
};

const calculateOrbitData = (systems: System[]) => {
  const baseOrbit = 5;
  const orbitIncrement = 6;
  const baseDuration = 90;

  return systems.map((system, index) => {
    const orbitWidth = baseOrbit + index * orbitIncrement + Math.random() * 10;
    const orbitHeight = orbitWidth * (0.6 + Math.random() * 0.4);
    const duration = baseDuration * Math.pow(orbitWidth / baseOrbit, 1.5);
    const startAngle = Math.random() * 360;

    return { ...system, orbitWidth, orbitHeight, duration, startAngle };
  });
};

const GalaxyView: React.FC<GalaxyViewProps> = ({ systems, selectedSystem, setSelectedSystem }) => {
  const calculatedSystems = calculateOrbitData(systems);

  return (
    <Center style={{ position: 'relative', width: '70vw', height: '70vh', overflow: 'hidden' }}>
      {!selectedSystem ? (
        <>
          <Tooltip label="Galaxy" withArrow position="bottom">
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
                filter: 'drop-shadow(0px 6px 15px rgba(0, 0, 0, 0.8))',
              }}
            >
              <IconGalaxy size={100} color="gray" />
            </motion.div>
          </Tooltip>

          {calculatedSystems.map((system) => (
            <motion.div
              key={system.systemName}
              animate={{ rotate: [system.startAngle, system.startAngle + 360] }}
              transition={{ duration: system.duration, repeat: Infinity, ease: 'linear' }}
              style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
            >
              <motion.div
                animate={{
                  x: [`${system.orbitWidth}vw`, 0, `-${system.orbitWidth}vw`, 0, `${system.orbitWidth}vw`],
                  y: [0, `${system.orbitHeight}vw`, 0, `-${system.orbitHeight}vw`, 0],
                }}
                transition={{ duration: system.duration, repeat: Infinity, ease: 'linear' }}
                style={{ position: 'absolute', top: '0%', left: '50%', transform: 'translate(-50%, 0%)', cursor: 'pointer' }}
                onClick={() => setSelectedSystem(system)}
              >
                {/* Sun rotates while orbiting */}
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                >
                  <Tooltip label={system.systemName} withArrow position="bottom" opened>
                    <IconSun
                      size={30}
                      color="orange"
                      style={{ filter: 'drop-shadow(0px 4px 10px rgba(255, 165, 0, 0.6))' }}
                    />
                  </Tooltip>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </>
      ) : (
        <StarSystemView
          systemName={selectedSystem.systemName}
          planets={selectedSystem.planets}
          onPlanetClick={() => {}}
          planetInfoOpened={false}
        />
      )}
    </Center>
  );
};

export default GalaxyView;

import React, { useState, useEffect } from 'react';
import { Button, Group } from '@mantine/core';
import System from './System';
import { getGalaxy } from '@/utils/data';
import PlanetInformation from './PlanetInformation';

const Galaxy: React.FC = () => {
  const systems = getGalaxy();
  const [selectedSystem, setSelectedSystem] = useState<string>('English');
  const [planetInfoOpened, setPlanetInfoOpened] = useState(false); // Modal state for planet info
  const [selectedPlanet, setSelectedPlanet] = useState<any | null>(null); // Store selected planet info
  const currentSystem = systems.find((system) => system.systemName === selectedSystem);

  // Effect to clear previous system's planets when switching
  useEffect(() => {
    setSelectedPlanet(null); // Clear planet information when system changes
  }, [selectedSystem]);

  const handlePlanetClick = (planet: any) => {
    setSelectedPlanet(planet);
    setPlanetInfoOpened(true); // Open modal when a planet is clicked
  };

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {/* System Selector */}
      <Group position="center" style={{ position: 'absolute', top: '10px', zIndex: 100 }}>
        {systems.map((system) => (
          <Button
            key={system.systemName}
            variant={selectedSystem === system.systemName ? 'filled' : 'outline'}
            color="var(--mantine-primary-color-filled)"
            onClick={() => setSelectedSystem(system.systemName)}
            style={{
              fontWeight: selectedSystem === system.systemName ? 'bold' : 'normal',
              padding: '12px 30px',
              borderRadius: '8px',
              boxShadow: selectedSystem === system.systemName ? '0px 4px 10px rgba(0, 0, 0, 0.2)' : 'none',
            }}
          >
            {system.systemName}
          </Button>
        ))}
      </Group>

      {/* Render the selected system */}
      {currentSystem && (
        <System
          systemName={currentSystem.systemName}
          planets={currentSystem.planets}
          onPlanetClick={handlePlanetClick}
          planetInfoOpened={planetInfoOpened} 
        />
      )}

      {/* Modal to display planet information */}
      <PlanetInformation planet={selectedPlanet} planetInfoOpened={planetInfoOpened} onClose={() => setPlanetInfoOpened(false)} />
    </div>
  );
};

export default Galaxy;

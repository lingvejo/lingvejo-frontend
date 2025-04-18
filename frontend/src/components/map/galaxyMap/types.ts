// Type for the Planet object
type Planet = {
    id: number;
    name: string;
    iso: string;
    description: string;
    discoveredDate: string;
    discoveredBy: string;
    lastObservedDate: string;
    lastObservedBy: string;
    adventurers: string[];
    wizards: string[];
  };
  
  // Type for the Solar System object
  type SolarSystem = {
    id: number;
    name: string;
    iso: string;
    planetsBySolarSystemId: {
      nodes: Planet[];
    };
  };
  
  // Type for the GalaxyMap component state and props
  type GalaxyMapProps = {
    systems: SolarSystem[];
    selectedSystem: SolarSystem | null;
    setSelectedSystem: React.Dispatch<React.SetStateAction<SolarSystem | null>>;
  };
  
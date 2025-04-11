import { useEffect, useState } from 'react';
import { useVoyager } from '@/contexts/VoyagerContext'; // Assuming you're using this context
import { getPlanetContinents } from '@/utils/data/queries/getPlanetContinents';
import LoadingScreen from '@/components/core/loading/LoadingScreen';

export default function PlanetContinents() {
  const { voyager, loading } = useVoyager(); // Assuming 'loading' state is part of VoyagerContext
  const [continents, setContinents] = useState<any[]>([]);

  useEffect(() => {
    if (loading || !voyager?.location) return; // Don't fetch if loading or location is missing
    
    const fetchContinents = async () => {
      const data = await getPlanetContinents(voyager.location);
      setContinents(data);
    };

    fetchContinents();
  }, [voyager?.location, loading]);

  return <LoadingScreen />; // Show loading screen if data is still loading

  if (!continents.length) return <div>No continents found for this planet.</div>; // In case no continents are found

  return (
    <div>
      <h3>Continents on Your Planet:</h3>
      <ul>
        {continents.map((continent) => (
          <li key={continent.continentId}>
            <strong>{continent.name}</strong>: {continent.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

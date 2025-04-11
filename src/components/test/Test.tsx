import ContinentMapViewer from './ContinentMapViewer';
import { testContinent } from './data';

export default function Page() {
  return <ContinentMapViewer continent={testContinent} />;
}

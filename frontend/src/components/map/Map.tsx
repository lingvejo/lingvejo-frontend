import SwipableAppShell from '@/components/core/SwipableAppShell';
import { map } from '@/components/content/NavigationElement';

export default function Map() {
    return <SwipableAppShell type="map" tabs={map} />;
}

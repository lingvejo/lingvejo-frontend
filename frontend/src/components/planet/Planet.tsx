import SwipableAppShell from '@/components/core/SwipableAppShell';
import { planet } from '@/components/content/NavigationElement';

export default function Planet() {
    return <SwipableAppShell type="planet" tabs={planet} />;
}

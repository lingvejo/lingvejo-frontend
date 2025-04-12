import SwipableAppShell from '@/components/core/SwipableAppShell';
import { profile } from '@/components/content/NavigationElement';

export default function Profile() {
    return <SwipableAppShell type="profile" tabs={profile} />;
}

import SwipableAppShell from '@/components/core/SwipableAppShell';
import { leaderboard } from '@/components/content/NavigationElement';

export default function Leaderboard() {
    return <SwipableAppShell type="leaderboard" tabs={leaderboard} />;
}

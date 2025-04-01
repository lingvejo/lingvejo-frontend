import React, { useRef, useState } from 'react';
import { Container, Text, List, ScrollArea, Card, Divider, Burger, Box, NavLink } from '@mantine/core';
import { getLeaderboardData } from '@/utils/data';
import { IconArrowBadgeDown, IconRocket } from '@tabler/icons-react'; // Import icons

const Leaderboard: React.FC = () => {
    const leaderboardData = getLeaderboardData();
    const userRefs = useRef<(HTMLLIElement | null)[]>([]);
    const [selectedLevel, setSelectedLevel] = useState<string>(leaderboardData[0].level);
    const [navbarOpened, setNavbarOpened] = useState<boolean>(false);

    const focusUser = (levelIndex: number) => {
        if (userRefs.current[levelIndex]) {
            userRefs.current[levelIndex]?.focus();
        }
    };

    const renderUserList = (level: string) => {
        const tier = leaderboardData.find(t => t.level === level);
        if (!tier) return null;

        return (
            <ScrollArea style={{ height: 200 }}>
                <List
                    spacing="sm"
                    size="sm"
                    center
                    icon={<IconRocket size={16} />}
                >
                    {tier.users.map((user, userIndex) => (
                        <List.Item
                            key={user}
                            ref={(el) => (userRefs.current[userIndex] = el)}
                            tabIndex={0} // Make it focusable
                            onFocus={() => focusUser(userIndex)}
                            style={{ padding: '10px', borderRadius: '4px', transition: 'background-color 0.2s' }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f0f0f0')}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                        >
                            {user}
                        </List.Item>
                    ))}
                </List>
            </ScrollArea>
        );
    };

    return (
        <Container>
            <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px' }}>
                <Burger opened={navbarOpened} onClick={() => setNavbarOpened((o) => !o)} />
                {!navbarOpened && <Text size="lg" weight={500}>{selectedLevel}</Text>}
            </Box>
            <Container style={{ display: navbarOpened ? 'block' : 'none', padding: '10px' }}>
                {leaderboardData.map((tier) => (
                    <NavLink
                        key={tier.level}
                        label={
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <IconArrowBadgeDown size={20} style={{ marginRight: 8 }} /> {/* Level icon */}
                                {tier.level}
                            </div>
                        }
                        onClick={() => {
                            setSelectedLevel(tier.level);
                            setNavbarOpened(false);
                        }}
                        style={{ cursor: 'pointer', padding: '10px', borderRadius: '4px', transition: 'background-color 0.2s' }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e9ecef')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                    />
                ))}
            </Container>
            {/* Only show user list when navbar is not opened */}
            {!navbarOpened && (
                <>
                    <Card shadow="sm" padding="lg" mb="md">
                        {renderUserList(selectedLevel)}
                    </Card>
                    <Divider my="lg" />
                    <Text align="center" size="sm" color="dimmed">Updated as of {new Date().toLocaleDateString()}</Text>
                </>
            )}
        </Container>
    );
};

export default Leaderboard;

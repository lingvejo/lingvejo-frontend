import React, { useRef } from 'react';
import { Container, Title, Text, Group, List, ScrollArea, Card, Divider } from '@mantine/core';
import { getLeaderboardData } from '@/utils/data';

const Leaderboard: React.FC = () => {
    const leaderboardData = getLeaderboardData();
    const userRefs = useRef<(HTMLLIElement | null)[]>([]);

    const focusUser = (levelIndex: number) => {
    if (userRefs.current[levelIndex]) {
        userRefs.current[levelIndex]?.focus();
    }
    };

    return (
        <Container>
            <Title order={2} align="center" mb="lg">User Leaderboard</Title>
            {leaderboardData.map((tier, index) => (
            <Card key={tier.level} shadow="sm" padding="lg" mb="md">
                <Text size="lg" weight={500} mb="sm">{tier.level} Level</Text>
                <ScrollArea style={{ height: 200 }}>
                <List spacing="sm" size="sm" center>
                    {tier.users.map((user, userIndex) => (
                    <List.Item
                        key={user}
                        ref={(el) => (userRefs.current[userIndex] = el)}
                        tabIndex={0} // Make it focusable
                        onFocus={() => focusUser(index)}
                        style={{ padding: '10px', borderRadius: '4px', transition: 'background-color 0.2s' }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f0f0f0')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                        {user}
                    </List.Item>
                    ))}
                </List>
                </ScrollArea>
            </Card>
            ))}
            <Divider my="lg" />
            <Text align="center" size="sm" color="dimmed">Updated as of {new Date().toLocaleDateString()}</Text>
        </Container>
    );
};

export default Leaderboard;

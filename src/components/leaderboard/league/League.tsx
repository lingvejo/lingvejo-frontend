import React, { useRef, useState, useEffect } from 'react';
import { Container, Progress, Text, List, ScrollArea, Card, Divider, Burger, Box, NavLink, Button, Textarea, Group } from '@mantine/core';
import { getLeaderboardData } from '@/utils/data';
import { IconArrowBadgeDown, IconRocket, IconMessageCircle, IconUsers } from '@tabler/icons-react';

const Leaderboard: React.FC = () => {
  const leaderboardData = getLeaderboardData();
  const userRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<string>(leaderboardData[0].level);
  const [navbarOpened, setNavbarOpened] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const focusUser = (levelIndex: number) => {
    if (userRefs.current[levelIndex]) {
      userRefs.current[levelIndex]?.focus();
    }
  };

  const renderUserList = (level: string) => {
    const tier = leaderboardData.find(t => t.level === level);
    if (!tier) return null;

    return (
      <ScrollArea style={{ height: 250 }}>
        <List spacing="sm" size="sm" center icon={<IconRocket size={16} />}>
          {tier.users.map((user, userIndex) => (
            <List.Item
              key={user}
              ref={(el) => (userRefs.current[userIndex] = el)}
              tabIndex={0}
              onFocus={() => focusUser(userIndex)}
              style={{ padding: '10px', borderRadius: '4px', transition: 'background-color 0.2s', cursor: 'pointer' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f0f0f0')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              {user}
              <Button 
                variant="subtle" 
                lefticon={<IconMessageCircle />} 
                size="xs" 
                style={{ marginLeft: '8px' }}
                onClick={() => alert(`Send a message to ${user}`)} // Implement messaging feature
              >
                Message
              </Button>
              <Button 
                variant="subtle" 
                lefticon={<IconUsers />} 
                size="xs" 
                style={{ marginLeft: '8px' }}
                onClick={() => alert(`Send a friend request to ${user}`)} // Implement friend request feature
              >
                Add Friend
              </Button>
            </List.Item>
          ))}
        </List>
      </ScrollArea>
    );
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    alert('Message sent!');
  };

  const handleJoinGroup = () => {
    alert('Joined a study group!');
  };

  return (
    <Container>
      <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px' }}>
        <Burger opened={navbarOpened} onClick={() => setNavbarOpened((o) => !o)} />
        <Text size="lg" weight={500}>{selectedLevel}</Text>
      </Box>
      
      <Container style={{ display: navbarOpened ? 'block' : 'none', padding: '10px' }}>
        {leaderboardData.map((tier) => (
          <NavLink
            key={tier.level}
            label={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <IconArrowBadgeDown size={20} style={{ marginRight: 8 }} />
                {tier.level}
              </div>
            }
            onClick={() => {
              setSelectedLevel(tier.level);
              setNavbarOpened(false);
            }}
            style={{
              cursor: 'pointer',
              padding: '10px',
              borderRadius: '4px',
              transition: 'background-color 0.2s',
              backgroundColor: '#f9f9f9'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e9ecef')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          />
        ))}
      </Container>

      {!navbarOpened && (
        <>
          {isLoading ? (
            <Card shadow="sm" padding="lg" mb="md">
              <Progress size="xl" animate value={100} />
            </Card>
          ) : (
            <Card shadow="sm" padding="lg" mb="md">
              {renderUserList(selectedLevel)}
            </Card>
          )}

          <Divider my="lg" />
          
          {/* Social Interaction Section */}
          <Text align="center" size="md" weight={500}>Message Board</Text>
          <Textarea
            placeholder="Send a message to the leaderboard"
            value={message}
            onChange={handleMessageChange}
            size="md"
            autosize
          />
          <Group position="center" mt="sm">
            <Button variant="filled" color="blue" onClick={handleSendMessage}>Send Message</Button>
          </Group>

          <Divider my="lg" />
          
          {/* Group Challenges Section */}
          <Text align="center" size="md" weight={500}>Join Study Group</Text>
          <Button variant="outline" color="green" onClick={handleJoinGroup}>Join Group</Button>

          <Divider my="lg" />
          <Text align="center" size="sm" color="dimmed">Updated as of {new Date().toLocaleDateString()}</Text>
        </>
      )}
    </Container>
  );
};

export default Leaderboard;

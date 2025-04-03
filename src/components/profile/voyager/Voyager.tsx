import React, { useState, useEffect } from 'react';
import { Container, Avatar, TextInput, Text, Button, Group, Divider, Title, Textarea, Progress, Flex, Loader, useMantineTheme } from '@mantine/core';
import { IconEdit, IconRocket, IconUser, IconMail, IconPhone, IconMapPin } from '@tabler/icons-react';
import { getVoyager } from '@/utils/data/getter/getVoyager'; // Assuming this is a custom async function
import { getVoyagerLeague } from '@/utils/data/getter/getVoyagerLeague';
import LoadingScreen from '@/components/core/LoadingScreen';

const VoyagerProfile: React.FC = () => {
  const theme = useMantineTheme(); // Access Mantine theme
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [league, setLeague] = useState<string>('');  // State for the voyager's league
  const [voyager, setVoyager] = useState<any>(null);  // State to hold voyager data
  const [loading, setLoading] = useState<boolean>(true);  // Loading state
  const [error, setError] = useState<string | null>(null);  // Error state
  const testVoyagerId = 2; // Change this to test with different IDs

  // Fetch voyager data using getVoyager function
  useEffect(() => {
    const fetchVoyager = async () => {
      try {
        setLoading(true);
        const data = await getVoyager(testVoyagerId);
        setVoyager(data);
        // Fetch the voyager's league based on their totalXP
        const voyagerLeague = getVoyagerLeague(data.totalXP);
        setLeague(voyagerLeague);
        setLoading(false);
      } catch (err) {
        setError('Error fetching voyager data');
        setLoading(false);
      }
    };

    fetchVoyager();
  }, [testVoyagerId]);

  if (loading) return <LoadingScreen />;
  if (error) return <Text align="center" color="red">{error}</Text>;

  // Define fields to be rendered dynamically
  const fields = [
    { label: 'First Name', value: voyager.firstName, key: 'firstName', icon: <IconUser size={16} /> },
    { label: 'Last Name', value: voyager.lastName, key: 'lastName', icon: <IconUser size={16} /> },
    { label: 'Email', value: voyager.email, key: 'email', icon: <IconMail size={16} /> },
    { label: 'Bio', value: voyager.bio || '', key: 'bio', icon: null },
    { label: 'Language', value: voyager.language || '', key: 'language', icon: null },
  ];

  return (
    <Container fluid style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <Group position="center" direction="column" mb="md" style={{ textAlign: 'center' }}>
        <Avatar size={120} src={voyager.profilePicture || "https://via.placeholder.com/120"} alt="User Avatar" radius="xl" />
        <Title order={2} weight={700}>{voyager.username}</Title>
        <Text size="sm" color="dimmed">{voyager.email}</Text>
      </Group>

      <Divider my="sm" />

      <Group direction="column" spacing="md" mb="md">
        {fields.map((field) => (
          <TextInput
            key={field.key}
            label={field.label}
            value={field.value}
            onChange={(e) => console.log(`Update ${field.key}`)} // Add logic to handle input change
            disabled={!isEditing}
            icon={field.icon}
            size="md"
            required
            styles={{ input: { borderRadius: '8px' } }}
          />
        ))}
        <Textarea
          label="Bio"
          value={voyager.bio || ''}
          onChange={(e) => console.log('Update bio')} // Add logic to handle bio change
          disabled={!isEditing}
          placeholder="Tell us something about yourself"
          size="md"
          required
          styles={{ input: { borderRadius: '8px' }, textarea: { borderRadius: '8px' } }}
        />
      </Group>

      <Divider my="sm" />

      {/* Level and XP Section */}
      <Group direction="column" spacing="md" mb="md">
        <Text size="lg" weight={700}>League: {league || "Loading..."}</Text>
        <Progress value={(voyager.totalXP / 200) * 100} color="blue" size="xl" label={`XP: ${voyager.totalXP}/200`} />
        <Text color="dimmed" size="sm">Complete tasks to earn XP and level up!</Text>
      </Group>

      <Divider my="sm" />

      {/* Edit Profile Button */}
      <Flex justify="center" mt="md">
        <Button
          onClick={() => setIsEditing(!isEditing)}
          leftIcon={isEditing ? <IconRocket size={16} /> : <IconEdit size={16} />}
          size="md"
          color="blue"
          fullWidth
          variant="outline"
          style={{ borderRadius: '8px' }}
        >
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </Button>
      </Flex>
    </Container>
  );
};

export default VoyagerProfile;

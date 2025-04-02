import React, { useState } from 'react';
import {
  Container,
  Avatar,
  TextInput,
  Text,
  Button,
  Group,
  Divider,
  Title,
  Textarea,
  Flex,
  Select,
  Progress
} from '@mantine/core';
import { IconEdit, IconRocket, IconUser, IconMail, IconPhone, IconMapPin, IconStar } from '@tabler/icons-react';

const UserProfile: React.FC = () => {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [phone, setPhone] = useState('+123 456 7890');
  const [address, setAddress] = useState('123 Main St, City, Country');
  const [bio, setBio] = useState('This is a short bio about me...');
  const [isEditing, setIsEditing] = useState(false);
  const [theme, setTheme] = useState('light'); // Default theme
  const [xp, setXp] = useState(120); // Current XP
  const [level, setLevel] = useState(3); // Current Level
  const [xpThreshold] = useState(200); // XP needed for the next level

  const handleSave = () => {
    setIsEditing(false);
  };

  // Calculate progress towards next level
  const xpProgress = (xp / xpThreshold) * 100;

  // Theme styles
  const themeStyles = {
    light: {
      background: '#f0f0f0',
      textColor: '#333',
      buttonColor: 'blue',
      buttonTextColor: 'white',
    },
    dark: {
      background: '#333',
      textColor: '#f0f0f0',
      buttonColor: 'green',
      buttonTextColor: 'white',
    },
    colorful: {
      background: '#ffeb3b',
      textColor: '#000',
      buttonColor: 'pink',
      buttonTextColor: 'white',
    },
  };

  const currentTheme = themeStyles[theme];

  return (
    <Container style={{ backgroundColor: currentTheme.background, color: currentTheme.textColor, borderRadius: '10px' }}>
      <Group position="center" direction="column" mb="md">
        <Avatar size={80} src="https://via.placeholder.com/120" alt="User Avatar" radius="xl" />
        <Title order={3} weight={700}>{name}</Title>
        <Text size="sm" color="dimmed">{email}</Text>
      </Group>

      <Divider my="sm" />
      
      <Group direction="column" spacing="md" mb="md">
        <TextInput
          label="Name"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          disabled={!isEditing}
          icon={<IconUser size={16} />}
          size="md"
          required
          styles={{ input: { borderRadius: '8px' } }}
        />
        <TextInput
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          disabled={!isEditing}
          icon={<IconMail size={16} />}
          size="md"
          required
          styles={{ input: { borderRadius: '8px' } }}
        />
        <TextInput
          label="Phone"
          value={phone}
          onChange={(e) => setPhone(e.currentTarget.value)}
          disabled={!isEditing}
          icon={<IconPhone size={16} />}
          size="md"
          required
          styles={{ input: { borderRadius: '8px' } }}
        />
        <TextInput
          label="Address"
          value={address}
          onChange={(e) => setAddress(e.currentTarget.value)}
          disabled={!isEditing}
          icon={<IconMapPin size={16} />}
          size="md"
          required
          styles={{ input: { borderRadius: '8px' } }}
        />
        <Textarea
          label="Bio"
          value={bio}
          onChange={(e) => setBio(e.currentTarget.value)}
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
        <Text size="lg" weight={700}>Level {level}</Text>
        <Progress value={xpProgress} color="blue" size="xl" label={`XP: ${xp}/${xpThreshold}`} />
        <Text color="dimmed" size="sm">Complete tasks to earn XP and level up!</Text>
      </Group>

      <Divider my="sm" />

      {/* Theme Selection */}
      <Group position="center" direction="column" mb="md">
        <Select
          label="Choose Theme"
          value={theme}
          onChange={setTheme}
          data={[
            { value: 'light', label: 'Light' },
            { value: 'dark', label: 'Dark' },
            { value: 'colorful', label: 'Colorful' },
          ]}
          style={{ width: '100%' }}
        />
      </Group>

      <Flex justify="space-between" mt="md">
        <Group>
          {isEditing ? (
            <Button onClick={handleSave} leftIcon={<IconRocket size={16} />} size="md" color={currentTheme.buttonColor} fullWidth>
              Save Changes
            </Button>
          ) : (
            <Button onClick={() => setIsEditing(true)} leftIcon={<IconEdit size={16} />} size="md" color={currentTheme.buttonColor} fullWidth>
              Edit Profile
            </Button>
          )}
        </Group>
      </Flex>
    </Container>
  );
};

export default UserProfile;

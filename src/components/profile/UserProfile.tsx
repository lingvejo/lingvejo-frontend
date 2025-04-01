import React, { useState } from 'react';
import {
    Container,
    Avatar,
    TextInput,
    Text,
    Button,
    Group,
    Paper,
    Divider,
    Title,
    Textarea,
    Select,
    Box,
} from '@mantine/core';
import { IconEdit, IconRocket, IconUser, IconMail, IconPhone, IconMapPin } from '@tabler/icons-react';

const UserProfile: React.FC = () => {
    const [name, setName] = useState('John Doe');
    const [email, setEmail] = useState('john.doe@example.com');
    const [phone, setPhone] = useState('+123 456 7890');
    const [address, setAddress] = useState('123 Main St, City, Country');
    const [bio, setBio] = useState('This is a short bio about me...');
    const [isEditing, setIsEditing] = useState(false);

    const handleSave = () => {
        // Logic to save the updated user profile
        setIsEditing(false);
    };

    return (
        <Container>
            <Paper padding="lg" shadow="sm" style={{ maxWidth: 600, margin: 'auto' }}>
                <Group position="center" direction="column" mb="md">
                    <Avatar size={120} src="https://via.placeholder.com/120" alt="User Avatar" />
                    <Title order={2}>{name}</Title>
                </Group>
                <Divider my="md" />
                <Group direction="column" spacing="md">
                    <TextInput
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.currentTarget.value)}
                        disabled={!isEditing}
                        icon={<IconUser size={16} />}
                    />
                    <TextInput
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.currentTarget.value)}
                        disabled={!isEditing}
                        icon={<IconMail size={16} />}
                    />
                    <TextInput
                        label="Phone"
                        value={phone}
                        onChange={(e) => setPhone(e.currentTarget.value)}
                        disabled={!isEditing}
                        icon={<IconPhone size={16} />}
                    />
                    <TextInput
                        label="Address"
                        value={address}
                        onChange={(e) => setAddress(e.currentTarget.value)}
                        disabled={!isEditing}
                        icon={<IconMapPin size={16} />}
                    />
                    <Textarea
                        label="Bio"
                        value={bio}
                        onChange={(e) => setBio(e.currentTarget.value)}
                        disabled={!isEditing}
                        placeholder="Tell us something about yourself"
                    />
                </Group>
                <Group position="apart" mt="md">
                    {isEditing ? (
                        <Button onClick={handleSave} leftIcon={<IconRocket size={16} />}>
                            Save Changes
                        </Button>
                    ) : (
                        <Button onClick={() => setIsEditing(true)} leftIcon={<IconEdit size={16} />}>
                            Edit Profile
                        </Button>
                    )}
                </Group>
            </Paper>
        </Container>
    );
};

export default UserProfile;

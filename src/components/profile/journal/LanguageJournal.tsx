import React, { useState } from 'react';
import {
  Container,
  Textarea,
  Button,
  Group,
  Title,
  Text,
  Divider,
  Paper,
  Flex
} from '@mantine/core';
import { IconEdit, IconCheck } from '@tabler/icons-react';

interface JournalEntry {
  date: string;
  content: string;
}

const LanguageJournal: React.FC = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [currentEntry, setCurrentEntry] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [points, setPoints] = useState(0);

  const handleSaveEntry = () => {
    if (currentEntry.trim() !== '') {
      const newEntry: JournalEntry = {
        date: new Date().toLocaleDateString(),
        content: currentEntry,
      };
      setEntries((prevEntries) => [newEntry, ...prevEntries]);
      setCurrentEntry('');
      setIsEditing(false);

      // Increment points for updating the journal
      setPoints((prevPoints) => prevPoints + 10); // Rewarding 10 points for each entry
    }
  };

  return (
    <Container style={{ maxWidth: '600px', marginTop: '20px' }}>
      <Paper padding="md" shadow="sm">
        <Title order={3} mb="md">
          Language Journal
        </Title>

        <Text size="sm" color="dimmed" mb="md">
          Log your language progress, reflect on what you've learned, and keep track of your journey. Earn rewards for regular updates!
        </Text>

        {!isEditing ? (
          <Group position="apart" mb="md">
            <Text size="lg">Points: {points}</Text>
            <Button
              leftIcon={<IconEdit size={16} />}
              onClick={() => setIsEditing(true)}
              size="md"
            >
              Write Journal Entry
            </Button>
          </Group>
        ) : (
          <Group direction="column" spacing="md" mb="md">
            <Textarea
              value={currentEntry}
              onChange={(e) => setCurrentEntry(e.currentTarget.value)}
              label="What did you learn today?"
              placeholder="Write about your language learning progress..."
              size="md"
              minRows={5}
              maxRows={8}
              required
            />
            <Group position="apart" style={{ width: '100%' }}>
              <Button
                leftIcon={<IconCheck size={16} />}
                onClick={handleSaveEntry}
                size="md"
                color="green"
              >
                Save Entry
              </Button>
              <Button
                onClick={() => setIsEditing(false)}
                size="md"
                color="gray"
              >
                Cancel
              </Button>
            </Group>
          </Group>
        )}

        <Divider my="md" />

        <Title order={4}>Previous Entries</Title>
        {entries.length === 0 ? (
          <Text color="dimmed">No entries yet. Start writing your progress!</Text>
        ) : (
          <Group direction="column" spacing="md">
            {entries.map((entry, index) => (
              <Paper padding="md" shadow="xs" key={index}>
                <Text size="sm" color="dimmed">{entry.date}</Text>
                <Text size="md" mt="sm">{entry.content}</Text>
              </Paper>
            ))}
          </Group>
        )}
      </Paper>
    </Container>
  );
};

export default LanguageJournal;

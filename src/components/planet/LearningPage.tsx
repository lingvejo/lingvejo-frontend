// components/LearningPage.js
import { Container, Button, Text } from '@mantine/core';

const LearningPage = ({ onClose }) => {
  return (
    <Container style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <Text size="xl" weight={700}>Learning Page</Text>
      <Text size="md" style={{ marginTop: '20px' }}>This is where the learning content will go.</Text>
      <Button
        variant="outline"
        style={{ marginTop: '20px' }}
        onClick={onClose}
      >
        Close
      </Button>
    </Container>
  );
};

export default LearningPage;
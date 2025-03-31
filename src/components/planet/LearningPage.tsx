import { Container, Button, Text, Progress } from '@mantine/core';
import { useState } from 'react';

export const LearningPageTitle = () => {
  return (
    <div style={{ width: '85vw' }}>
      <Progress value={50} />
    </div>
  );
};


const LearningPage = () => {
  return (
    <Container>
      <Text size="xl" weight={700}>Learning Page</Text>
      <Text size="md" style={{ marginTop: '20px' }}>This is where the learning content will go.</Text>
      <Button
        variant="outline"
        style={{ marginTop: '20px' }}
      >
        Close
      </Button>
    </Container>
  );
};

export default LearningPage;

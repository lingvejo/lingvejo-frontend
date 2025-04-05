import { useEffect, useState } from 'react';
import { Paper, Text, Button, Center, Divider, Stack, Loader } from '@mantine/core';

type Choice = {
  label: string;
  next: number;
};

type Props = {
  speaker: string;
  text: string;
  isTypingDone: boolean;
  setIsTypingDone: (val: boolean) => void;
  onNext: () => void;
  choices: Choice[] | null;
  handleChoice: (nextIndex: number) => void;
};

const DialogueBox = ({
  speaker,
  text,
  choices,
  isTypingDone,
  setIsTypingDone,
  onNext,
  handleChoice,
}: Props) => {
  const [displayedText, setDisplayedText] = useState('');

  // Typing animation effect for dialogue text
  useEffect(() => {
    let i = 0;
    const speed = 30;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i));
      i++;
      if (i > text.length) {
        clearInterval(interval);
        setIsTypingDone(true); // Mark typing as done
      }
    }, speed);

    return () => {
      clearInterval(interval); // Cleanup the interval on unmount or text change
    };
  }, [text, setIsTypingDone]);

  return (
    <Paper
      radius="lg"
      p="md"
      shadow="xl"
      style={{
        border: '2px solid white',
        margin: 10,
        background: 'rgba(0, 0, 0, 0.5)', // Adjusted opacity for better readability
        color: 'white',
        fontFamily: 'serif', // Visual novel-inspired font
      }}
    >
      <Stack spacing="sm">
        {/* Speaker name */}
        <Text c="white" size="xl" weight={500}>
          {speaker}
        </Text>

        <Divider />

        {/* Display the typed text */}
        <Text
          c="white"
          style={{
            whiteSpace: 'pre-wrap',
            minHeight: 80,
            fontSize: '18px',
            lineHeight: '1.6',
            color: '#eee', // Lighter text for readability
          }}
        >
          {displayedText}
        </Text>

        {/* Display choices or Next button */}
        {isTypingDone ? (
          choices ? (
            <Stack spacing="xs">
              {choices.map((choice, i) => (
                <Button
                  key={i}
                  onClick={() => handleChoice(choice.next)}
                  color="white"
                  variant="outline" // Slightly more polished look for choice buttons
                  style={{
                    border: '1px solid white',
                  }}
                >
                  {choice.label}
                </Button>
              ))}
            </Stack>
          ) : (
            <Button
              onClick={onNext}
              color="white"
              variant="outline"
              style={{
                border: '1px solid white',
              }}
            >
              Next
            </Button>
          )
        ) : (
          <Loader color="white" size="xs" />
        )}
      </Stack>
    </Paper>
  );
}

export default DialogueBox;
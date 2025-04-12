import { useEffect, useState } from 'react';
import { Paper, Text, Button, Divider, Stack, Loader } from '@mantine/core';
import { DialogueBoxProps } from './types';
import { useTranslations } from 'next-intl';
import ReactMarkdown from 'react-markdown';
import DialogueInteraction from './DialogueInteraction';

const DialogueBox = ({
  character,
  text,
  choices,
  interaction,
  isTypingDone,
  setIsTypingDone,
  onNext,
  handleChoice,
}: DialogueBoxProps) => {
  const t = useTranslations('visualNovel');

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
        {character && (
          <>
            <Text c="white" size="xl" weight={500}>
              {character}
            </Text>
            <Divider />
          </>
        )}

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
          <ReactMarkdown>{displayedText}</ReactMarkdown>
        </Text>

        {/* Display choices or Next button */}
        {isTypingDone ? (
          interaction ? (
            <DialogueInteraction interaction={interaction} onComplete={onNext} />
          ) : choices ? (
            <Stack spacing="xs">
              {choices.map((choice, i) => (
                <Button
                  key={i}
                  onClick={() => handleChoice(choice.next)}
                  color="white"
                  variant="outline"
                  style={{ border: '1px solid white' }}
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
              style={{ border: '1px solid white' }}
            >
              {t('next')}
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
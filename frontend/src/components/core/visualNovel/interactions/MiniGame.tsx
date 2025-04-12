'use client';

import React, { useState, useEffect } from 'react';
import { Button, Card, SimpleGrid, Stack, Text } from '@mantine/core';
import { MiniGameProps } from '../types';

interface CardData {
    word: string;
    type: string;
    id: number;
}

const MiniGame = ({ words, gameType, onComplete }: MiniGameProps) => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);

  useEffect(() => {
    // Creating shuffled cards from the words array passed via props
    const mixedCards = words.flatMap((pair, index) => [
      { word: pair.translation, type: 'translation', id: index * 2 },
      { word: pair.text, type: 'text', id: index * 2 + 1 },
    ]);
    setCards(mixedCards.sort(() => Math.random() - 0.5)); // Shuffle the cards
  }, [words]);

  const handleCardClick = (id: number) => {
    if (selected.length === 2 || matchedPairs.includes(id)) return;

    setSelected((prev) => [...prev, id]);

    if (selected.length === 1) {
      const firstCard = cards.find((c) => c.id === selected[0]);
      const secondCard = cards.find((c) => c.id === id);

      if (
        firstCard &&
        secondCard &&
        firstCard.word !== secondCard.word &&
        firstCard.type !== secondCard.type
      ) {
        setMatchedPairs((prev) => [...prev, selected[0], id]);
      }

      setTimeout(() => setSelected([]), 800);
    }
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack align="center" spacing="md">
        <SimpleGrid cols={2} spacing="md">
          {cards.map((card) => (
            <Card
              key={card.id}
              shadow="sm"
              radius="md"
              withBorder
              onClick={() => handleCardClick(card.id)}
              style={{
                cursor: 'pointer',
                backgroundColor: matchedPairs.includes(card.id)
                  ? '#D3F9D8'
                  : selected.includes(card.id)
                  ? '#FAE3E3'
                  : 'white',
              }}
            >
              <Text align="center">
                {selected.includes(card.id) || matchedPairs.includes(card.id)
                  ? card.word
                  : '?'}
              </Text>
            </Card>
          ))}
        </SimpleGrid>

        {matchedPairs.length === cards.length && (
            <Button
                onClick={onComplete}
                variant="filled"
                radius="md"
                size="md"
            >
                Continue
            </Button>
        )}
      </Stack>
    </Card>
  );
};

export default MiniGame;

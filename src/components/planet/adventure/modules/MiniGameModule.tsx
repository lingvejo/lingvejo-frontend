import React, { useState, useEffect } from "react";
import { Button, Card, SimpleGrid, Stack, Text } from "@mantine/core";

interface MiniGameModuleProps {
  data: {
    gameType: string;
    words: { esperanto: string; english: string }[];
  };
}

interface CardData {
  word: string;
  type: "esperanto" | "english";
  id: number;
}

const MiniGameModule: React.FC<MiniGameModuleProps> = ({ data }) => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);

  useEffect(() => {
    const mixedCards = data.words.flatMap((pair, index) => [
      { word: pair.esperanto, type: "esperanto", id: index * 2 },
      { word: pair.english, type: "english", id: index * 2 + 1 },
    ]);
    setCards(mixedCards.sort(() => Math.random() - 0.5)); // Shuffle
  }, [data.words]);

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
      <Stack align="center">
        <Text size="lg" weight={600}>
          Memory Match: Esperanto & English
        </Text>
        <SimpleGrid cols={2} spacing="md">
          {cards.map((card) => (
            <Card
              key={card.id}
              shadow="sm"
              radius="md"
              withBorder
              onClick={() => handleCardClick(card.id)}
              style={{
                cursor: "pointer",
                backgroundColor: matchedPairs.includes(card.id)
                  ? "#D3F9D8"
                  : selected.includes(card.id)
                  ? "#FAE3E3"
                  : "white",
              }}
            >
              <Text align="center">{selected.includes(card.id) || matchedPairs.includes(card.id) ? card.word : "?"}</Text>
            </Card>
          ))}
        </SimpleGrid>

        {matchedPairs.length === cards.length && (
          <Button onClick={() => window.location.reload()}>Play Again</Button>
        )}
      </Stack>
    </Card>
  );
};

export default MiniGameModule;

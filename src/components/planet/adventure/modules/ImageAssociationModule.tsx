import React, { useState } from "react";
import { Card, Image, SimpleGrid, Stack, Text, Button } from "@mantine/core";

interface ImageAssociationModuleProps {
  data: {
    images: { image: string; word: string }[];
  };
}

const ImageAssociationModule: React.FC<ImageAssociationModuleProps> = ({ data }) => {
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ [key: string]: boolean }>({});

  const handleSelection = (imageWord: string) => {
    if (!selectedWord) return;
    setFeedback((prev) => ({
      ...prev,
      [imageWord]: selectedWord === imageWord,
    }));
    setSelectedWord(null);
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack align="center">
        <Text size="lg" weight={600}>Match Images with Words</Text>
        <SimpleGrid cols={3} spacing="md">
          {data.images.map((item) => (
            <Card
              key={item.image}
              shadow="sm"
              radius="md"
              withBorder
              onClick={() => handleSelection(item.word)}
              style={{
                cursor: "pointer",
                borderColor: feedback[item.word] === true ? "green" : feedback[item.word] === false ? "red" : undefined,
              }}
            >
              <Image src={item.image} alt={item.word} height={100} fit="contain" />
            </Card>
          ))}
        </SimpleGrid>

        <SimpleGrid cols={3} spacing="md">
          {data.images.map((item) => (
            <Button
              key={item.word}
              onClick={() => setSelectedWord(item.word)}
              color={selectedWord === item.word ? "blue" : "gray"}
            >
              {item.word}
            </Button>
          ))}
        </SimpleGrid>
      </Stack>
    </Card>
  );
};

export default ImageAssociationModule;

'use client';

import React, { useState } from 'react';
import { Button, Card, Image, SimpleGrid, Stack, Text } from '@mantine/core';
import { ImageAssociationProps } from '../types';
import '../DialogueInteraction.css';

const ImageAssociation = ({ images, onComplete }: ImageAssociationProps) => {
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<{ [key: string]: boolean }>({});
  const [shake, setShake] = useState<{ [key: string]: boolean }>({});

  const handleSelection = (
    item: { word: string; image: string },
    type: 'image' | 'word'
  ) => {
    if (type === 'image') {
      setSelectedImage(item.image);
      if (selectedWord) {
        evaluateMatch(item.image, selectedWord);
      }
    } else if (type === 'word') {
      setSelectedWord(item.word);
      if (selectedImage) {
        evaluateMatch(selectedImage, item.word);
      }
    }
  };

  const evaluateMatch = (image: string, word: string) => {
    const isCorrect = images.some(
      (item) => item.image === image && item.word === word
    );

    if (isCorrect) {
      setMatchedPairs((prev) => ({ ...prev, [image]: true, [word]: true }));
      setSelectedImage(null);
      setSelectedWord(null);
    } else {
      setShake((prev) => ({ ...prev, [image]: true, [word]: true }));
      setTimeout(() => resetSelection(), 500);
    }
  };

  const resetSelection = () => {
    setSelectedImage(null);
    setSelectedWord(null);
    setShake({});
  };

  const allMatched = Object.keys(matchedPairs).length === images.length * 2;
  const columns = images.length < 3 ? images.length : 3;

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack align="center">
        <Text size="lg" weight={600}>
          Match Images with Words
        </Text>

        <SimpleGrid cols={columns} spacing="md">
          {images.map((item) => (
            <Card
              key={item.image}
              shadow="sm"
              radius="md"
              withBorder
              onClick={() => {
                if (!matchedPairs[item.image]) {
                  handleSelection(item, 'image');
                }
              }}
              style={{
                cursor: matchedPairs[item.image] ? 'not-allowed' : 'pointer',
                opacity: matchedPairs[item.image] ? 0.5 : 1,
                animation: shake[item.image] ? 'shake 0.5s' : 'none',
                border:
                  selectedImage === item.image
                    ? '2px solid black'
                    : undefined,
              }}
            >
              <Image src={item.image} alt={item.word} height={100} fit="contain" />
            </Card>
          ))}
        </SimpleGrid>

        <SimpleGrid cols={columns} spacing="md">
          {images.map((item) => (
            <Button
              key={item.word}
              onClick={() => {
                if (!matchedPairs[item.word]) {
                  handleSelection(item, 'word');
                }
              }}
              color={selectedWord === item.word ? 'black' : 'gray'}
              disabled={matchedPairs[item.word]}
              style={{
                animation: shake[item.word] ? 'shake 0.5s' : 'none',
              }}
            >
              {item.word}
            </Button>
          ))}
        </SimpleGrid>

        {allMatched && (
          <Button onClick={onComplete} variant="filled" radius="md" size="md">
            Continue
          </Button>
        )}
      </Stack>
    </Card>
  );
};

export default ImageAssociation;

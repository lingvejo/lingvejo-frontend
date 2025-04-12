'use client';

import { useEffect, useState } from 'react';
import { Stack, Button, Card, Text, Paper } from '@mantine/core';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, useSortable, arrayMove } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { DragAndDropProps } from '../types';

const DragAndDrop = ({ words, onComplete }: DragAndDropProps) => {
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    const shuffle = (arr: string[]) => {
      const copy = [...arr];
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      return copy;
    };

    let shuffled = shuffle(words);
    while (JSON.stringify(shuffled) === JSON.stringify(words)) {
      shuffled = shuffle(words);
    }

    setItems(shuffled);
  }, [words]);

  const onDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = items.indexOf(active.id);
      const newIndex = items.indexOf(over.id);
      setItems(arrayMove(items, oldIndex, newIndex));
    }
  };

  const isCorrect = JSON.stringify(items) === JSON.stringify(words);

  return (
    <Card shadow="md" padding="lg" radius="md" withBorder>
      <Stack spacing="md" align="center">
        <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
          <SortableContext items={items}>
            <Stack spacing="xs">
              {items.map((word) => (
                <SortableItem key={word} id={word} />
              ))}
            </Stack>
          </SortableContext>
        </DndContext>

        {isCorrect && (
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

export default DragAndDrop;

const SortableItem = ({ id }: { id: string }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: '8px 12px',
    borderRadius: '8px',
    backgroundColor: 'white',
    color: 'black',
    textAlign: 'center' as const,
    cursor: 'grab',
    border: '1px solid #ccc',
  };

  return (
    <Paper ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {id}
    </Paper>
  );
};

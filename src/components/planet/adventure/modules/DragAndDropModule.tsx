import { useState } from "react";
import { Paper, Stack, Text, Button } from "@mantine/core";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, arrayMove, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface DragAndDropModuleProps {
  data: {
    words: string[];
  };
}

const SortableItem = ({ id }: { id: string }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: "8px",
    background: "var(--mantine-primary-color-light)",
    borderRadius: "8px",
    textAlign: "center",
    cursor: "grab",
  };
  return (
    <Paper ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {id}
    </Paper>
  );
};

const DragAndDropModule: React.FC<DragAndDropModuleProps> = ({ data }) => {
  const [items, setItems] = useState(data.words);

  const onDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = items.indexOf(active.id);
      const newIndex = items.indexOf(over.id);
      setItems(arrayMove(items, oldIndex, newIndex));
    }
  };

  return (
    <Paper p="md" shadow="sm" radius="md">
      <Text size="lg" mb="sm">Arrange the words in the correct order:</Text>
      <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <SortableContext items={items}>
          <Stack>
            {items.map((word) => (
              <SortableItem key={word} id={word} />
            ))}
          </Stack>
        </SortableContext>
      </DndContext>
      <Button fullWidth mt="md">Submit</Button>
    </Paper>
  );
};

export default DragAndDropModule;

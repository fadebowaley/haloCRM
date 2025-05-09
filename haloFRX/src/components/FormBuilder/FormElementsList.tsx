
import React from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import FormElement from './FormElement';
import { FormElementType } from '@/types/form-builder';

interface FormElementsListProps {
  elements: FormElementType[];
  onElementsChange: (elements: FormElementType[]) => void;
  editingElementId: string | null;
  onEditElement: (id: string | null) => void;
}

const FormElementsList = ({
  elements,
  onElementsChange,
  editingElementId,
  onEditElement,
}: FormElementsListProps) => {
  const [activeId, setActiveId] = React.useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (over && active.id !== over.id) {
      const oldIndex = elements.findIndex((item) => item.id === active.id);
      const newIndex = elements.findIndex((item) => item.id === over.id);

      const newElements = arrayMove(elements, oldIndex, newIndex);
      onElementsChange(newElements);
    }
  };

  const handleRemoveElement = (id: string) => {
    const newElements = elements.filter((element) => element.id !== id);
    onElementsChange(newElements);
    if (editingElementId === id) {
      onEditElement(null);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={elements.map((e) => e.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-1">
          {elements.length === 0 && (
            <div className="text-center p-8 border border-dashed rounded-md text-muted-foreground">
              Drag elements here to build your form
            </div>
          )}
          {elements.map((element) => (
            <FormElement
              key={element.id}
              element={element}
              onRemove={handleRemoveElement}
              onEdit={onEditElement}
              isEditing={element.id === editingElementId}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default FormElementsList;

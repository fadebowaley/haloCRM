
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button } from '@/components/ui/button';
import { X, GripVertical } from 'lucide-react';
import { FormElementType } from '@/types/form-builder';

interface FormElementProps {
  element: FormElementType;
  onRemove: (id: string) => void;
  onEdit: (id: string) => void;
  isEditing: boolean;
}

const FormElement = ({ element, onRemove, onEdit, isEditing }: FormElementProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: element.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(element.id);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove(element.id);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative border rounded-md p-4 mb-3 bg-white form-element-hover
        ${isDragging ? 'dragging' : ''}
        ${isEditing ? 'ring-2 ring-primary' : ''}
      `}
      onClick={() => onEdit(element.id)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 flex-1">
          <div 
            {...attributes}
            {...listeners}
            className="drag-handle p-1 rounded hover:bg-gray-100 cursor-grab"
          >
            <GripVertical size={16} />
          </div>
          <div className="font-medium text-sm">{element.label || 'Untitled element'}</div>
        </div>
        
        <div className="element-actions flex space-x-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={handleRemove}
          >
            <X size={16} />
          </Button>
        </div>
      </div>
      
      <div className="mt-2">
        {element.renderPreview ? element.renderPreview() : (
          <div className="text-sm text-muted-foreground">Preview not available</div>
        )}
      </div>
    </div>
  );
};

export default FormElement;

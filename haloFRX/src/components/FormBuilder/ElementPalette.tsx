
import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Card } from '@/components/ui/card';
import { FormFieldIcon } from './FormFieldIcon';
import { ELEMENT_TYPES, ElementType } from '@/types/form-builder';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";

interface ElementPaletteItemProps {
  type: ElementType;
  label: string;
  onAddElement: (type: ElementType) => void;
}

const ElementPaletteItem = ({ type, label, onAddElement }: ElementPaletteItemProps) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `palette-${type}`,
    data: { type },
  });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={`cursor-grab ${isDragging ? 'opacity-50' : ''}`}
      onClick={() => onAddElement(type)}
    >
      <Card className="p-2 flex items-center space-x-2 hover:bg-muted/50 transition-colors">
        <FormFieldIcon type={type} />
        <span className="text-sm">{label}</span>
      </Card>
    </div>
  );
};

interface ElementPaletteProps {
  onAddElement: (type: ElementType) => void;
}

const ElementPalette = ({ onAddElement }: ElementPaletteProps) => {
  // Group elements by category
  const categories = Object.entries(ELEMENT_TYPES).reduce((acc, [key, value]) => {
    const category = value.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push({ type: key as ElementType, label: value.label });
    return acc;
  }, {} as Record<string, { type: ElementType; label: string }[]>);

  const [openCategories, setOpenCategories] = React.useState<Record<string, boolean>>({
    Basic: true,
    Selection: true,
    Advanced: true,
    Special: true,
    Action: true,
  });

  const toggleCategory = (category: string) => {
    setOpenCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  // Order categories
  const orderedCategories = ['Basic', 'Selection', 'Advanced', 'Special', 'Action'];
  
  return (
    <div className="space-y-3">
      <div className="font-medium">Form Elements</div>
      
      <ScrollArea className="h-[calc(100vh-120px)]">
        <div className="pr-3 space-y-3">
          {orderedCategories.map(category => {
            const elements = categories[category];
            if (!elements?.length) return null;
            
            return (
              <Collapsible key={category} open={openCategories[category]} onOpenChange={() => toggleCategory(category)}>
                <CollapsibleTrigger className="flex items-center w-full justify-between text-sm font-medium p-1 hover:bg-muted/30 rounded">
                  <span>{category}</span>
                  {openCategories[category] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-2 mt-2">
                  {elements.map(element => (
                    <ElementPaletteItem 
                      key={element.type} 
                      type={element.type} 
                      label={element.label} 
                      onAddElement={onAddElement}
                    />
                  ))}
                </CollapsibleContent>
              </Collapsible>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ElementPalette;


import React, { useState } from 'react';
import { 
  DndContext, 
  DragEndEvent, 
  DragOverEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { toast } from 'sonner';
import ElementPalette from './ElementPalette';
import FormElementsList from './FormElementsList';
import ElementEditor from './ElementEditor';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { generateElement, FormElementType, ElementType } from '@/types/form-builder';
import FormBuilderHeader from './FormBuilderHeader';
import FormPreviewPanel from './FormPreviewPanel';

const FormBuilder = () => {
  const [elements, setElements] = useState<FormElementType[]>([]);
  const [editingElementId, setEditingElementId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'preview' | 'json'>('preview');
  const [wizardMode, setWizardMode] = useState<boolean>(false);
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const editingElement = elements.find(el => el.id === editingElementId) || null;

  const handleDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type) {
      // This is a drag from the palette
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    // Handle drag over events if needed
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    // If dragging from palette to the form area
    if (active.data.current?.type && over) {
      const type = active.data.current.type as ElementType;
      const newElement = generateElement(type);
      
      setElements([...elements, newElement]);
      setEditingElementId(newElement.id);
      
      toast.success(`Added ${type} element`);
    }
  };

  const handleWizardModeToggle = (enabled: boolean) => {
    setWizardMode(enabled);
    
    if (enabled) {
      toast.info("Wizard mode enabled. You can now add Next/Back buttons for multi-step forms.");
    }
  };

  const handleAddElement = (type: ElementType) => {
    const newElement = generateElement(type);
    
    // If adding a button and wizard mode is on, default to "next" type
    if (type === 'button' && wizardMode) {
      newElement.properties.buttonType = 'next';
      newElement.properties.buttonText = 'Next';
    }
    
    setElements([...elements, newElement]);
    setEditingElementId(newElement.id);
    toast.success(`Added ${type} element`);
  };

  const handleElementUpdate = (updatedElement: FormElementType) => {
    const newElements = elements.map(element => 
      element.id === updatedElement.id ? updatedElement : element
    );
    setElements(newElements);
  };

  const handleElementsChange = (newElements: FormElementType[]) => {
    setElements(newElements);
  };

  const handleSaveForm = () => {
    console.log('Form structure:', JSON.stringify(elements, null, 2));
    toast.success('Form structure logged to console');
  };

  const handleClearForm = () => {
    if (window.confirm('Are you sure you want to clear the form? This will remove all elements.')) {
      setElements([]);
      setEditingElementId(null);
      toast.info('Form cleared');
    }
  };

  const handleExportForm = (format: 'json' | 'html') => {
    if (format === 'json') {
      const dataStr = JSON.stringify(elements, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      const exportFileName = 'form-structure.json';
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileName);
      linkElement.click();
      
      toast.success('Form JSON exported successfully');
    } else {
      toast.info('HTML export functionality coming soon');
    }
  };

  const handleDuplicateElement = () => {
    if (editingElement) {
      const duplicatedElement = {
        ...editingElement,
        id: generateElement(editingElement.type).id,
        label: `${editingElement.label} (Copy)`,
      };
      setElements([...elements, duplicatedElement]);
      setEditingElementId(duplicatedElement.id);
      toast.success(`Duplicated ${editingElement.type} element`);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <FormBuilderHeader 
        wizardMode={wizardMode} 
        onWizardModeToggle={handleWizardModeToggle}
        onSaveForm={handleSaveForm}
        onClearForm={handleClearForm}
        onExportForm={handleExportForm}
      />
      
      <div className="flex-grow overflow-hidden">
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={20} minSize={15} maxSize={30} className="border-r">
              <div className="p-4">
                <ElementPalette onAddElement={handleAddElement} />
              </div>
            </ResizablePanel>
            
            <ResizablePanel defaultSize={50} className="overflow-hidden">
              <ResizablePanelGroup direction="vertical">
                <ResizablePanel defaultSize={60} className="overflow-auto">
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-3">
                      <h2 className="text-lg font-semibold">Form Structure</h2>
                      {editingElement && (
                        <button 
                          className="px-3 py-1 text-sm bg-secondary rounded border border-border"
                          onClick={handleDuplicateElement}
                        >
                          Duplicate Element
                        </button>
                      )}
                    </div>
                    <FormElementsList 
                      elements={elements} 
                      onElementsChange={handleElementsChange} 
                      editingElementId={editingElementId}
                      onEditElement={setEditingElementId}
                    />
                  </div>
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={40}>
                  <div className="h-full bg-muted/30">
                    <ElementEditor 
                      element={editingElement} 
                      onElementUpdate={handleElementUpdate}
                      elements={elements}
                      wizardMode={wizardMode}
                    />
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
            </ResizablePanel>
            
            <ResizableHandle />
            
            <ResizablePanel defaultSize={30} className="overflow-auto">
              <FormPreviewPanel 
                elements={elements}
                onSave={handleSaveForm}
                activeTab={activeTab}
                onTabChange={setActiveTab}
              />
            </ResizablePanel>
          </ResizablePanelGroup>
        </DndContext>
      </div>
    </div>
  );
};

export default FormBuilder;

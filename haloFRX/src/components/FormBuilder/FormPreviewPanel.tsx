
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, Code } from 'lucide-react';
import FormPreview from './FormPreview';
import { FormElementType } from '@/types/form-builder';

interface FormPreviewPanelProps {
  elements: FormElementType[];
  onSave: () => void;
  activeTab: 'preview' | 'json';
  onTabChange: (value: 'preview' | 'json') => void;
}

const FormPreviewPanel = ({ 
  elements, 
  onSave, 
  activeTab, 
  onTabChange 
}: FormPreviewPanelProps) => {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold">Preview</h2>
        <Tabs value={activeTab} onValueChange={(value) => onTabChange(value as 'preview' | 'json')}>
          <TabsList>
            <TabsTrigger value="preview">
              <Eye size={16} className="mr-1" /> Preview
            </TabsTrigger>
            <TabsTrigger value="json">
              <Code size={16} className="mr-1" /> JSON
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {activeTab === 'preview' ? (
        <FormPreview elements={elements} onSave={onSave} />
      ) : (
        <pre className="bg-muted p-4 rounded-lg text-sm overflow-auto max-h-[calc(100vh-200px)]">
          {JSON.stringify(elements, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default FormPreviewPanel;

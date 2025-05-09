
import React from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { LayoutGrid } from 'lucide-react';
import { toast } from 'sonner';

interface FormBuilderHeaderProps {
  wizardMode: boolean;
  onWizardModeToggle: (enabled: boolean) => void;
  onSaveForm: () => void;
  onClearForm: () => void;
  onExportForm: (format: 'json' | 'html') => void;
}

const FormBuilderHeader = ({
  wizardMode,
  onWizardModeToggle,
  onSaveForm,
  onClearForm,
  onExportForm
}: FormBuilderHeaderProps) => {
  return (
    <header className="border-b px-6 py-3 flex items-center justify-between">
      <h1 className="text-xl font-semibold">Form Builder</h1>
      <div className="flex items-center gap-4">
        <div className="flex items-center space-x-2">
          <Switch 
            id="wizard-mode"
            checked={wizardMode}
            onCheckedChange={onWizardModeToggle}
          />
          <Label htmlFor="wizard-mode" className="flex items-center gap-1 cursor-pointer">
            <LayoutGrid size={16} />
            <span>Wizard Mode</span>
          </Label>
        </div>
        
        <ThemeToggle />
        
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Export</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onExportForm('json')}>
                Export as JSON
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onExportForm('html')}>
                Export as HTML
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button variant="outline" onClick={onClearForm}>
            Clear
          </Button>
          <Button variant="blue" onClick={onSaveForm}>
            Save Form
          </Button>
        </div>
      </div>
    </header>
  );
};

export default FormBuilderHeader;

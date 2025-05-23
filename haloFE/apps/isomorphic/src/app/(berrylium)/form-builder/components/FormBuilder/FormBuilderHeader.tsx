
import React from 'react';
import { Button } from 'rizzui';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { ThemeToggle } from '../../components/ThemeToggle';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { AiOutlineAppstore } from 'react-icons/ai';
import { toast } from 'react-hot-toast';

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
            <AiOutlineAppstore size={16} />
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
          <Button variant="solid" onClick={onSaveForm}>
            Save Form
          </Button>
        </div>
      </div>
    </header>
  );
};

export default FormBuilderHeader;

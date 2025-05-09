
import React, { useState } from 'react';
import { FormElementType } from '@/types/form-builder';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Clock as ClockIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';

interface FormPreviewProps {
  elements: FormElementType[];
  onSave?: () => void;
}

const FormPreview = ({ elements, onSave }: FormPreviewProps) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [date, setDate] = useState<Record<string, Date | undefined>>({});
  const [currentStep, setCurrentStep] = useState<number>(0);

  // Group elements into steps (any element after a "next" button starts a new step)
  const steps = elements.reduce((acc: FormElementType[][], element, index) => {
    if (index === 0) {
      acc.push([element]);
    } else if (
      elements[index - 1].type === 'button' && 
      elements[index - 1].properties.buttonType === 'next'
    ) {
      acc.push([element]);
    } else {
      acc[acc.length - 1].push(element);
    }
    return acc;
  }, []);

  // If no steps were created (no next buttons), put all elements in one step
  const formSteps = steps.length > 0 ? steps : [elements];

  const handleInputChange = (id: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form data:', formData);
    toast.success('Form submitted! Check the console for data.');
    if (onSave) onSave();
  };

  const moveToNextStep = () => {
    if (currentStep < formSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const moveToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Check if an element should be shown based on conditional logic
  const shouldShowElement = (element: FormElementType): boolean => {
    if (!element.properties.conditional) return true;
    
    const { conditionalLogic } = element.properties;
    if (!conditionalLogic?.dependsOn) return true;
    
    const dependsOnValue = formData[conditionalLogic.dependsOn];
    return dependsOnValue === conditionalLogic.showWhen;
  };

  const renderField = (element: FormElementType) => {
    const { id, type, label, properties } = element;
    const { 
      required, 
      helpText, 
      placeholder, 
      defaultValue, 
      options, 
      buttonText, 
      buttonType,
      min,
      max,
      step
    } = properties;
    
    // Don't render if this element should be hidden based on conditional logic
    if (!shouldShowElement(element)) return null;

    switch (type) {
      case 'text':
        return (
          <div key={id} className="space-y-2">
            <Label htmlFor={id}>
              {label} {properties.validation?.required && <span className="text-destructive">*</span>}
            </Label>
            <Input
              id={id}
              placeholder={placeholder}
              defaultValue={defaultValue}
              required={properties.validation?.required}
              onChange={(e) => handleInputChange(id, e.target.value)}
            />
            {helpText && <p className="text-sm text-muted-foreground">{helpText}</p>}
          </div>
        );
      
      case 'textarea':
        return (
          <div key={id} className="space-y-2">
            <Label htmlFor={id}>
              {label} {properties.validation?.required && <span className="text-destructive">*</span>}
            </Label>
            <Textarea
              id={id}
              placeholder={placeholder}
              defaultValue={defaultValue}
              required={properties.validation?.required}
              onChange={(e) => handleInputChange(id, e.target.value)}
            />
            {helpText && <p className="text-sm text-muted-foreground">{helpText}</p>}
          </div>
        );
      
      case 'number':
        return (
          <div key={id} className="space-y-2">
            <Label htmlFor={id}>
              {label} {properties.validation?.required && <span className="text-destructive">*</span>}
            </Label>
            <Input
              id={id}
              type="number"
              placeholder={placeholder}
              defaultValue={defaultValue}
              min={min}
              max={max}
              step={step}
              required={properties.validation?.required}
              onChange={(e) => handleInputChange(id, e.target.value)}
            />
            {helpText && <p className="text-sm text-muted-foreground">{helpText}</p>}
          </div>
        );
      
      case 'email':
        return (
          <div key={id} className="space-y-2">
            <Label htmlFor={id}>
              {label} {properties.validation?.required && <span className="text-destructive">*</span>}
            </Label>
            <Input
              id={id}
              type="email"
              placeholder={placeholder}
              defaultValue={defaultValue}
              required={properties.validation?.required}
              onChange={(e) => handleInputChange(id, e.target.value)}
            />
            {helpText && <p className="text-sm text-muted-foreground">{helpText}</p>}
          </div>
        );
      
      case 'password':
        return (
          <div key={id} className="space-y-2">
            <Label htmlFor={id}>
              {label} {properties.validation?.required && <span className="text-destructive">*</span>}
            </Label>
            <Input
              id={id}
              type="password"
              placeholder={placeholder}
              defaultValue={defaultValue}
              required={properties.validation?.required}
              onChange={(e) => handleInputChange(id, e.target.value)}
            />
            {helpText && <p className="text-sm text-muted-foreground">{helpText}</p>}
          </div>
        );
      
      case 'checkbox':
        return (
          <div key={id} className="space-y-2">
            <Label>
              {label} {properties.validation?.required && <span className="text-destructive">*</span>}
            </Label>
            <div className="space-y-2">
              {options && options.map((option, i) => (
                <div key={`${id}-option-${i}`} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`${id}-option-${i}`}
                    onCheckedChange={(checked) => {
                      const currentSelections = formData[id] || [];
                      const newSelections = checked 
                        ? [...currentSelections, option]
                        : currentSelections.filter((item: string) => item !== option);
                      handleInputChange(id, newSelections);
                    }}
                  />
                  <Label htmlFor={`${id}-option-${i}`}>{option}</Label>
                </div>
              ))}
            </div>
            {helpText && <p className="text-sm text-muted-foreground">{helpText}</p>}
          </div>
        );
      
      case 'radio':
        return (
          <div key={id} className="space-y-2">
            <Label>
              {label} {properties.validation?.required && <span className="text-destructive">*</span>}
            </Label>
            <RadioGroup
              defaultValue={defaultValue}
              onValueChange={(value) => handleInputChange(id, value)}
            >
              {options && options.map((option, i) => (
                <div key={`${id}-option-${i}`} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`${id}-option-${i}`} />
                  <Label htmlFor={`${id}-option-${i}`}>{option}</Label>
                </div>
              ))}
            </RadioGroup>
            {helpText && <p className="text-sm text-muted-foreground">{helpText}</p>}
          </div>
        );
      
      case 'dropdown':
        return (
          <div key={id} className="space-y-2">
            <Label htmlFor={id}>
              {label} {properties.validation?.required && <span className="text-destructive">*</span>}
            </Label>
            <Select defaultValue={defaultValue} onValueChange={(value) => handleInputChange(id, value)}>
              <SelectTrigger id={id}>
                <SelectValue placeholder={placeholder || 'Select option'} />
              </SelectTrigger>
              <SelectContent>
                {options && options.map((option, i) => (
                  <SelectItem key={`${id}-option-${i}`} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {helpText && <p className="text-sm text-muted-foreground">{helpText}</p>}
          </div>
        );
      
      case 'datepicker':
        return (
          <div key={id} className="space-y-2">
            <Label htmlFor={id}>
              {label} {properties.validation?.required && <span className="text-destructive">*</span>}
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id={id}
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date[id] && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date[id] ? format(date[id] as Date, "PPP") : placeholder || "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date[id]}
                  onSelect={(newDate) => {
                    setDate(prev => ({ ...prev, [id]: newDate }));
                    handleInputChange(id, newDate);
                  }}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
            {helpText && <p className="text-sm text-muted-foreground">{helpText}</p>}
          </div>
        );
      
      case 'timepicker':
        return (
          <div key={id} className="space-y-2">
            <Label htmlFor={id}>
              {label} {properties.validation?.required && <span className="text-destructive">*</span>}
            </Label>
            <div className="flex space-x-2">
              <Input
                id={`${id}-hour`}
                type="number"
                placeholder="HH"
                min={0}
                max={23}
                className="w-20"
                onChange={(e) => {
                  const hour = e.target.value;
                  const minute = formData[`${id}-minute`] || '00';
                  handleInputChange(id, `${hour}:${minute}`);
                  handleInputChange(`${id}-hour`, hour);
                }}
              />
              <span className="text-xl self-center">:</span>
              <Input
                id={`${id}-minute`}
                type="number"
                placeholder="MM"
                min={0}
                max={59}
                className="w-20"
                onChange={(e) => {
                  const minute = e.target.value;
                  const hour = formData[`${id}-hour`] || '00';
                  handleInputChange(id, `${hour}:${minute}`);
                  handleInputChange(`${id}-minute`, minute);
                }}
              />
            </div>
            {helpText && <p className="text-sm text-muted-foreground">{helpText}</p>}
          </div>
        );
      
      case 'fileupload':
        return (
          <div key={id} className="space-y-2">
            <Label htmlFor={id}>
              {label} {properties.validation?.required && <span className="text-destructive">*</span>}
            </Label>
            <Input
              id={id}
              type="file"
              required={properties.validation?.required}
              className="cursor-pointer"
              accept={properties.acceptedTypes}
              onChange={(e) => handleInputChange(id, e.target.files?.[0])}
            />
            {helpText && <p className="text-sm text-muted-foreground">{helpText}</p>}
          </div>
        );
      
      case 'toggle':
        return (
          <div key={id} className="space-y-2">
            <div className="flex items-center space-x-2">
              <Switch 
                id={id}
                onCheckedChange={(checked) => handleInputChange(id, checked)}
              />
              <Label htmlFor={id}>
                {label} {properties.validation?.required && <span className="text-destructive">*</span>}
              </Label>
            </div>
            {helpText && <p className="text-sm text-muted-foreground">{helpText}</p>}
          </div>
        );
      
      case 'slider':
        return (
          <div key={id} className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor={id}>
                {label} {properties.validation?.required && <span className="text-destructive">*</span>}
              </Label>
              <span>{formData[id] || defaultValue || min}</span>
            </div>
            <Slider
              id={id}
              defaultValue={[parseInt(defaultValue) || min || 0]}
              min={min || 0}
              max={max || 100}
              step={step || 1}
              onValueChange={([value]) => handleInputChange(id, value)}
            />
            {helpText && <p className="text-sm text-muted-foreground">{helpText}</p>}
          </div>
        );
      
      case 'hidden':
        return (
          <Input
            key={id}
            id={id}
            type="hidden"
            value={defaultValue || ''}
          />
        );
      
      case 'button':
        if (buttonType === 'submit') {
          return (
            <div key={id} className="space-y-2">
              <Button type="submit">
                {buttonText || 'Submit'}
              </Button>
            </div>
          );
        } else if (buttonType === 'reset') {
          return (
            <div key={id} className="space-y-2">
              <Button 
                type="reset" 
                variant="outline"
                onClick={() => setFormData({})}
              >
                {buttonText || 'Reset'}
              </Button>
            </div>
          );
        } else if (buttonType === 'next') {
          return (
            <div key={id} className="space-y-2">
              <Button 
                type="button" 
                onClick={moveToNextStep}
              >
                {buttonText || 'Next'}
              </Button>
            </div>
          );
        } else if (buttonType === 'back') {
          return (
            <div key={id} className="space-y-2">
              <Button 
                type="button"
                variant="outline"
                onClick={moveToPreviousStep}
              >
                {buttonText || 'Back'}
              </Button>
            </div>
          );
        } else {
          return (
            <div key={id} className="space-y-2">
              <Button type="button">
                {buttonText || 'Button'}
              </Button>
            </div>
          );
        }
      
      default:
        return null;
    }
  };

  const currentElements = formSteps[currentStep] || [];
  const hasSubmitButton = currentElements.some(e => e.type === 'button' && e.properties.buttonType === 'submit');
  const isLastStep = currentStep === formSteps.length - 1;

  return (
    <div className="p-4 border rounded-lg bg-white">
      {formSteps.length > 1 && (
        <div className="mb-4 flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            Step {currentStep + 1} of {formSteps.length}
          </div>
          <div className="flex space-x-2">
            {currentStep > 0 && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={moveToPreviousStep}
              >
                Previous
              </Button>
            )}
            {currentStep < formSteps.length - 1 && (
              <Button 
                size="sm" 
                onClick={moveToNextStep}
              >
                Next
              </Button>
            )}
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {currentElements.map(renderField)}
          
          {isLastStep && !hasSubmitButton && currentElements.length > 0 && (
            <Button type="submit" className="mt-4">Submit Form</Button>
          )}

          {currentElements.length === 0 && (
            <div className="text-center p-8 text-muted-foreground">
              Your form preview will appear here
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default FormPreview;

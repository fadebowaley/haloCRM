
import { ReactNode } from "react";

export type ElementType = 
  'text' | 
  'textarea' | 
  'number' | 
  'email' | 
  'password' |
  'checkbox' | 
  'radio' | 
  'dropdown' | 
  'datepicker' |
  'timepicker' |
  'fileupload' | 
  'toggle' |
  'slider' |
  'hidden' |
  'button';

export type ButtonType = 'submit' | 'reset' | 'next' | 'back';

export interface ValidationRules {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  min?: number;
  max?: number;
}

export interface FormElementType {
  id: string;
  type: ElementType;
  label: string;
  properties: {
    placeholder?: string;
    defaultValue?: string;
    helpText?: string;
    options?: string[];
    conditional?: boolean;
    conditionalLogic?: {
      dependsOn?: string;
      showWhen?: string;
    };
    validation?: ValidationRules;
    buttonText?: string;
    buttonType?: ButtonType;
    acceptedTypes?: string;
    min?: number;
    max?: number;
    step?: number;
    hidden?: boolean;
    [key: string]: any;
  };
  renderPreview?: () => ReactNode;
}

let elementCounter = 0;

export const generateId = () => {
  return `element-${Date.now()}-${elementCounter++}`;
};

export const ELEMENT_TYPES: Record<ElementType, { label: string; category: string }> = {
  text: { label: 'Text Input', category: 'Basic' },
  textarea: { label: 'Text Area', category: 'Basic' },
  number: { label: 'Number Input', category: 'Basic' },
  email: { label: 'Email Input', category: 'Basic' },
  password: { label: 'Password Field', category: 'Basic' },
  checkbox: { label: 'Checkbox Group', category: 'Selection' },
  radio: { label: 'Radio Group', category: 'Selection' },
  dropdown: { label: 'Dropdown', category: 'Selection' },
  datepicker: { label: 'Date Picker', category: 'Advanced' },
  timepicker: { label: 'Time Picker', category: 'Advanced' },
  fileupload: { label: 'File Upload', category: 'Advanced' },
  toggle: { label: 'Toggle Switch', category: 'Selection' },
  slider: { label: 'Slider', category: 'Advanced' },
  hidden: { label: 'Hidden Field', category: 'Special' },
  button: { label: 'Button', category: 'Action' },
};

export const generateElement = (type: ElementType): FormElementType => {
  const baseElement = {
    id: generateId(),
    type,
    label: ELEMENT_TYPES[type].label,
    properties: {
      placeholder: '',
      defaultValue: '',
      helpText: '',
      conditional: false,
      validation: {
        required: false
      },
    },
  };

  switch (type) {
    case 'text':
      return {
        ...baseElement,
        renderPreview: () => (
          <div className="w-full h-8 bg-muted/50 rounded border border-input" />
        ),
      };
      
    case 'textarea':
      return {
        ...baseElement,
        renderPreview: () => (
          <div className="w-full h-20 bg-muted/50 rounded border border-input" />
        ),
      };
      
    case 'number':
      return {
        ...baseElement,
        properties: {
          ...baseElement.properties,
          min: 0,
          max: 100,
          step: 1,
        },
        renderPreview: () => (
          <div className="w-full h-8 bg-muted/50 rounded border border-input" />
        ),
      };
      
    case 'email':
      return {
        ...baseElement,
        renderPreview: () => (
          <div className="w-full h-8 bg-muted/50 rounded border border-input" />
        ),
      };
      
    case 'password':
      return {
        ...baseElement,
        renderPreview: () => (
          <div className="w-full h-8 bg-muted/50 rounded border border-input" />
        ),
      };
      
    case 'checkbox':
      return {
        ...baseElement,
        properties: {
          ...baseElement.properties,
          options: ['Option 1', 'Option 2', 'Option 3'],
        },
        renderPreview: () => (
          <div className="space-y-1">
            {['Option 1', 'Option 2', 'Option 3'].map((option, i) => (
              <div key={i} className="flex items-center space-x-2">
                <div className="w-4 h-4 border border-input rounded" />
                <div className="text-sm">{option}</div>
              </div>
            ))}
          </div>
        ),
      };
      
    case 'radio':
      return {
        ...baseElement,
        properties: {
          ...baseElement.properties,
          options: ['Option 1', 'Option 2', 'Option 3'],
        },
        renderPreview: () => (
          <div className="space-y-1">
            {['Option 1', 'Option 2', 'Option 3'].map((option, i) => (
              <div key={i} className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full border border-input" />
                <div className="text-sm">{option}</div>
              </div>
            ))}
          </div>
        ),
      };
      
    case 'dropdown':
      return {
        ...baseElement,
        properties: {
          ...baseElement.properties,
          options: ['Option 1', 'Option 2', 'Option 3'],
        },
        renderPreview: () => (
          <div className="w-full h-8 bg-muted/50 rounded border border-input flex items-center px-2">
            <div className="text-sm text-muted-foreground">Select an option</div>
          </div>
        ),
      };
      
    case 'datepicker':
      return {
        ...baseElement,
        renderPreview: () => (
          <div className="w-full h-8 bg-muted/50 rounded border border-input flex items-center px-2">
            <div className="text-sm text-muted-foreground">Pick a date</div>
          </div>
        ),
      };
      
    case 'timepicker':
      return {
        ...baseElement,
        renderPreview: () => (
          <div className="w-full h-8 bg-muted/50 rounded border border-input flex items-center px-2">
            <div className="text-sm text-muted-foreground">Select time</div>
          </div>
        ),
      };
      
    case 'fileupload':
      return {
        ...baseElement,
        properties: {
          ...baseElement.properties,
          acceptedTypes: '.jpg,.png,.pdf',
        },
        renderPreview: () => (
          <div className="w-full h-8 bg-muted/50 rounded border border-input flex items-center px-2">
            <div className="text-sm text-muted-foreground">Choose file</div>
          </div>
        ),
      };
      
    case 'toggle':
      return {
        ...baseElement,
        renderPreview: () => (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-4 rounded-full bg-muted/70 flex items-center">
              <div className="w-3 h-3 rounded-full bg-background ml-0.5"></div>
            </div>
            <div className="text-sm">Toggle option</div>
          </div>
        ),
      };
      
    case 'slider':
      return {
        ...baseElement,
        properties: {
          ...baseElement.properties,
          min: 0,
          max: 100,
          step: 1,
          defaultValue: '50',
        },
        renderPreview: () => (
          <div className="w-full pt-3">
            <div className="h-1 w-full bg-muted/70 rounded-full">
              <div className="h-1 w-1/2 bg-primary rounded-full"></div>
              <div className="h-3 w-3 rounded-full bg-primary relative -top-1" style={{ marginLeft: '50%' }}></div>
            </div>
          </div>
        ),
      };
      
    case 'hidden':
      return {
        ...baseElement,
        properties: {
          ...baseElement.properties,
          hidden: true,
        },
        renderPreview: () => (
          <div className="p-2 border border-dashed border-muted-foreground/50 rounded bg-muted/20">
            <div className="text-sm text-muted-foreground">Hidden field (not visible in form)</div>
          </div>
        ),
      };
      
    case 'button':
      return {
        ...baseElement,
        properties: {
          ...baseElement.properties,
          buttonText: 'Submit',
          buttonType: 'submit',
        },
        renderPreview: () => (
          <div className="bg-primary text-primary-foreground py-1 px-4 rounded text-center w-24">
            Submit
          </div>
        ),
      };
      
    default:
      return baseElement;
  }
};

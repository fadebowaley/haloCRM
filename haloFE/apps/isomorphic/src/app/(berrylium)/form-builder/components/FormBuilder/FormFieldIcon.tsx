
import React from 'react';
import {
  AiOutlineFileText,
  AiOutlineBorder,
  AiOutlineCalendar,
  AiOutlineUpload,
  AiOutlinePlus,
  AiOutlineNumber,
  AiOutlineMail,
  AiOutlineLock,
  AiOutlineClockCircle,
  AiOutlineEye,
  AiOutlineArrowRight,
  AiOutlineArrowLeft,
} from 'react-icons/ai';
import {
  MdRadioButtonChecked,
  MdChecklist,
  MdToggleOff,
  MdTune,
} from 'react-icons/md';
import { ElementType } from '../../types/form-builder';

interface FormFieldIconProps {
  type: ElementType;
  size?: number;
  buttonType?: string;
}

export const FormFieldIcon = ({ type, size = 18, buttonType }: FormFieldIconProps) => {
  if (type === 'button' && buttonType) {
    switch (buttonType) {
      case 'next':
        return <AiOutlineArrowRight size={size} />;
      case 'back':
        return <AiOutlineArrowLeft size={size} />;
      case 'submit':
        return <AiOutlinePlus size={size} />;
      case 'reset':
        return <AiOutlinePlus size={size} />;
      default:
        return <AiOutlinePlus size={size} />;
    }
  }

  switch (type) {
    case 'text':
      return <AiOutlineFileText size={size} />;
    case 'textarea':
      return <AiOutlineFileText size={size} />;
    case 'number':
      return <AiOutlineNumber size={size} />;
    case 'email':
      return <AiOutlineMail size={size} />;
    case 'password':
      return <AiOutlineLock size={size} />;
    case 'checkbox':
      return <AiOutlineBorder size={size} />;
    case 'radio':
      return <MdRadioButtonChecked size={size} />;
    case 'dropdown':
      return <MdChecklist size={size} />;
    case 'datepicker':
      return <AiOutlineCalendar size={size} />;
    case 'timepicker':
      return <AiOutlineClockCircle size={size} />;
    case 'fileupload':
      return <AiOutlineUpload size={size} />;
    case 'toggle':
      return <MdToggleOff size={size} />;
    case 'slider':
      return <MdTune size={size} />;
    case 'hidden':
      return <AiOutlineEye size={size} />;
    case 'button':
      return <AiOutlinePlus size={size} />;
    default:
      return <AiOutlineFileText size={size} />;
  }
};
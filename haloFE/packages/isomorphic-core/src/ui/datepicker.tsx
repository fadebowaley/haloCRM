"use client";

import { useState } from "react";
import { Input, InputProps } from "rizzui";
import cn from "../utils/class-names";
import { PiCalendarBlank, PiCaretDownBold } from "react-icons/pi";
import ReactDatePicker, {
  type DatePickerProps as ReactDatePickerProps,
} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const calendarContainerClasses = {
  base: "[&.react-datepicker]:shadow-lg [&.react-datepicker]:border-gray-100 [&.react-datepicker]:rounded-md",
  monthContainer: {
    padding: "[&.react-datepicker>div]:pt-5 [&.react-datepicker>div]:pb-3",
  },
};

const prevNextButtonClasses = {
  base: "[&.react-datepicker>button]:items-baseline [&.react-datepicker>button]:top-7",
  border:
    "[&.react-datepicker>button]:border [&.react-datepicker>button]:border-solid [&.react-datepicker>button]:border-gray-300 [&.react-datepicker>button]:rounded-md",
  size: "[&.react-datepicker>button]:h-[22px] [&.react-datepicker>button]:w-[22px]",
  children: {
    position: "[&.react-datepicker>button>span]:top-0",
    border:
      "[&.react-datepicker>button>span]:before:border-t-[1.5px] [&.react-datepicker>button>span]:before:border-r-[1.5px] [&.react-datepicker>button>span]:before:border-gray-400",
    size: "[&.react-datepicker>button>span]:before:h-[7px] [&.react-datepicker>button>span]:before:w-[7px]",
  },
};

const timeOnlyClasses = {
  base: "[&.react-datepicker--time-only>div]:pr-0 [&.react-datepicker--time-only>div]:w-28",
};

const popperClasses = {
  base: "[&>svg]:!fill-white dark:[&>svg]:!fill-gray-100 [&>svg]:!stroke-gray-300 dark:[&>svg]:!stroke-muted dark:[&>svg]:!text-muted",
};

export type DatePickerProps = ReactDatePickerProps & {
  inputProps?: InputProps;
};

export const DatePicker = ({
  inputProps,
  customInput,
  onCalendarOpen,
  onCalendarClose,
  popperClassName,
  calendarClassName,
  dateFormat = "d MMMM yyyy",
  showPopperArrow = false,
  ...props
}: DatePickerProps) => {
  const [isCalenderOpen, setIsCalenderOpen] = useState(false);
  const handleCalenderOpen = () => setIsCalenderOpen(true);
  const handleCalenderClose = () => setIsCalenderOpen(false);
  return (
    <div
      className={cn(
        "flex [&_.react-datepicker-wrapper]:flex [&_.react-datepicker-wrapper]:w-full",
        props?.className
      )}
    >
      <ReactDatePicker
        customInput={
          customInput || (
            <Input
              prefix={<PiCalendarBlank className="w-5 h-5 text-gray-500" />}
              suffix={
                <PiCaretDownBold
                  className={cn(
                    "h-4 w-4 text-gray-500 transition",
                    isCalenderOpen && "rotate-180"
                  )}
                />
              }
              {...inputProps}
            />
          )
        }
        onCalendarOpen={onCalendarOpen || handleCalenderOpen}
        onCalendarClose={onCalendarClose || handleCalenderClose}
        calendarClassName={cn(
          calendarContainerClasses.base,
          calendarContainerClasses.monthContainer.padding,
          prevNextButtonClasses.base,
          prevNextButtonClasses.border,
          prevNextButtonClasses.size,
          prevNextButtonClasses.children.position,
          prevNextButtonClasses.children.border,
          prevNextButtonClasses.children.size,
          timeOnlyClasses.base,
          calendarClassName
        )}
        popperClassName={cn(popperClasses.base, popperClassName)}
        dateFormat={dateFormat}
        showPopperArrow={showPopperArrow}
        {...props}
      />
    </div>
  );
};

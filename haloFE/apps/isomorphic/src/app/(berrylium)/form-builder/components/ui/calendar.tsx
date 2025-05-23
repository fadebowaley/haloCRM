import * as React from "react";
import DatePicker from "react-datepicker";
import { FiChevronLeft as ChevronLeft, FiChevronRight as ChevronRight } from "react-icons/fi";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs"; // Replaced date-fns with dayjs

import { cn } from "../../lib/utils";
import { buttonVariants } from "../ui/button";

export type CalendarProps = {
  className?: string;
  selected?: Date;
  onChange: (date: Date | null) => void;
};

function Calendar({ className, selected, onChange }: CalendarProps) {
  return (
    <div className={cn("p-3", className)}>
      <DatePicker
        selected={selected}
        onChange={(date) => {
        if (date) {
           onChange(date); // Call the onChange function only if date is not null
         }
        }}
        inline
        renderCustomHeader={({
          date,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div className="flex justify-center items-center mb-2 relative">
            <button
              onClick={decreaseMonth}
              disabled={prevMonthButtonDisabled}
              className={cn(
                buttonVariants({ variant: "outline" }),
                "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute left-1"
              )}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-sm font-medium">{dayjs(date).format("MMMM YYYY")}</span> {/* Updated */}
            <button
              onClick={increaseMonth}
              disabled={nextMonthButtonDisabled}
              className={cn(
                buttonVariants({ variant: "outline" }),
                "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute right-1"
              )}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
        calendarClassName="!bg-white !border-none !rounded-md !shadow-md"
        dayClassName={() =>
          cn(
            buttonVariants({ variant: "ghost" }),
            "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
          )
        }
      />
    </div>
  );
}

Calendar.displayName = "Calendar";

export { Calendar };
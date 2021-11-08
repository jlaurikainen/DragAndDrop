import { startOfDay } from "date-fns";
import React, { ReactNode, useState } from "react";
import CalendarContext from "./CalendarContext";

interface CalendarProviderProps<T extends Date | Date[]> {
  children: ReactNode;
  locale: string;
  onChange?: (date: T) => void;
  selectRange?: boolean;
  value?: T;
}

const CalendarProvider = <ValueType extends Date | Date[]>({
  children,
  locale,
  onChange,
  selectRange,
  value,
}: CalendarProviderProps<ValueType>) => {
  const [navigationDate, setNavigationDate] = useState(
    startOfDay((value && Array.isArray(value) ? value[0] : value) ?? new Date())
  );

  const month = navigationDate.getMonth();
  const year = navigationDate.getFullYear();

  return (
    <CalendarContext.Provider
      value={{
        locale,
        navigationDate,
        navigationMonth: month,
        navigationYear: year,
        selectRange,
        setNavigationDate,
        onChange,
        value,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export default CalendarProvider;

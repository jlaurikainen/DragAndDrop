import { startOfDay } from "date-fns";
import React, { FC, useState } from "react";
import CalendarContext from "./CalendarContext";

interface CalendarProviderProps {
  locale: string;
  onChange?: (date: Date) => void;
  value?: Date | Date[];
}

const CalendarProvider: FC<CalendarProviderProps> = ({
  children,
  locale,
  onChange,
  value,
}) => {
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

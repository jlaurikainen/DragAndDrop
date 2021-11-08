import React from "react";
import CalendarMenu from "./components/CalendarMenu";
import Controls from "./components/Controls";
import MonthView from "./components/MonthView";
import Weekdays from "./components/Weekdays";
import Weeks from "./components/Weeks";
import CalendarProvider from "./context/CalendarProvider";

interface ICalendar<ValueType extends Date | Date[]> {
  locale?: string;
  onChange?: (date: ValueType) => void;
  selectRange?: boolean;
  value?: ValueType;
}

const Calendar = <ValueType extends Date | Date[]>({
  locale = "fi",
  onChange,
  selectRange,
  value,
}: ICalendar<ValueType>) => {
  return (
    <CalendarProvider
      locale={locale}
      onChange={onChange}
      selectRange={selectRange}
      value={value}
    >
      <CalendarMenu>
        <Controls />
        <Weeks />
        <Weekdays />
        <MonthView />
      </CalendarMenu>
    </CalendarProvider>
  );
};

export default Calendar;

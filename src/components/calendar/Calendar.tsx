import React from "react";
import CalendarMenu from "./components/CalendarMenu";
import Controls from "./components/Controls";
import MonthView from "./components/MonthView";
import Weekdays from "./components/Weekdays";
import Weeks from "./components/Weeks";
import CalendarProvider from "./context/CalendarProvider";

interface ICalendar<ValueType extends Date | Date[]> {
  locale?: string;
  navigationValue?: Date;
  onChange?: (date: ValueType) => void;
  selectRange?: boolean;
  setNavigationValue?: (date: Date) => void;
  value?: ValueType;
}

const Calendar = <ValueType extends Date | Date[]>({
  locale = "fi",
  navigationValue,
  onChange,
  selectRange,
  setNavigationValue,
  value,
}: ICalendar<ValueType>) => {
  return (
    <CalendarProvider
      locale={locale}
      navigationValue={navigationValue}
      onChange={onChange}
      selectRange={selectRange}
      setNavigationValue={setNavigationValue}
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

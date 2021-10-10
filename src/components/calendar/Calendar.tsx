import React from "react";
import CalendarMenu from "./components/CalendarMenu";
import Controls from "./components/Controls";
import MonthView from "./components/MonthView";
import Weekdays from "./components/Weekdays";
import Weeks from "./components/Weeks";
import CalendarProvider from "./context/CalendarProvider";

interface ICalendar {
  locale?: string;
  onChange?: (date: Date) => void;
  value?: Date;
}

const Calendar = ({ locale = "fi", onChange, value }: ICalendar) => {
  return (
    <CalendarProvider locale={locale} onChange={onChange} value={value}>
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

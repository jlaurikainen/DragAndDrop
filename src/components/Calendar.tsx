import {
  addMonths,
  getDate,
  getDay,
  getDaysInMonth,
  getISOWeeksInYear,
  getMonth,
  getWeek,
  getYear,
  startOfMonth,
  subDays,
} from "date-fns";
import { addDays, startOfDay, subMonths } from "date-fns/esm";
import React, { useState } from "react";
import Controls from "./Controls";
import MonthView from "./MonthView";
import { CalendarWrapper } from "./styled";
import { getMonthString } from "./utils";
import Weekdays from "./Weekdays";
import Weeks from "./Weeks";

interface ICalendar {
  value?: Date;
  onChange?: (date: Date) => void;
}

const Calendar = ({ onChange, value }: ICalendar) => {
  const [navigationDate, setNavigationDate] = useState(startOfDay(new Date()));
  const firstWeekOfMonth = getWeek(
    new Date(getYear(navigationDate), getMonth(navigationDate), 1),
    {
      locale: { code: "fi-FI" },
      firstWeekContainsDate: 7,
    }
  );

  const gotToPrevMonth = () => {
    setNavigationDate(subMonths(navigationDate, 1));
  };

  const goToNextMonth = () => {
    setNavigationDate(addMonths(navigationDate, 1));
  };

  const handleKeyEvents = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const key = event.key;

    switch (key) {
      case "ArrowUp":
        event.preventDefault();
        setNavigationDate(subDays(navigationDate, 7));
        break;
      case "ArrowDown":
        event.preventDefault();
        setNavigationDate(addDays(navigationDate, 7));
        break;
      case "ArrowLeft":
        event.preventDefault();
        setNavigationDate(subDays(navigationDate, 1));
        break;
      case "ArrowRight":
        event.preventDefault();
        setNavigationDate(addDays(navigationDate, 1));
        break;
      case "Enter":
        event.preventDefault();
        onChange?.(navigationDate);
        break;
      case "PageUp":
        event.preventDefault();
        setNavigationDate(subMonths(navigationDate, 1));
        break;
      case "PageDown":
        event.preventDefault();
        setNavigationDate(addMonths(navigationDate, 1));
    }
  };

  return (
    <CalendarWrapper
      onBlur={() => value && setNavigationDate(value)}
      onKeyDown={handleKeyEvents}
      tabIndex={0}
    >
      <Controls
        month={getMonthString(navigationDate)}
        next={goToNextMonth}
        prev={gotToPrevMonth}
        year={getYear(navigationDate)}
      />
      <Weeks
        firstWeekOfMonth={firstWeekOfMonth}
        weeksInYear={getISOWeeksInYear(navigationDate)}
      />
      <Weekdays />
      <MonthView
        day={getDate(navigationDate)}
        dayCount={getDaysInMonth(navigationDate)}
        firstDayOfMonth={getDay(startOfMonth(navigationDate))}
        navigationSetter={setNavigationDate}
        month={getMonth(navigationDate)}
        onChange={onChange}
        value={value}
        year={getYear(navigationDate)}
      />
    </CalendarWrapper>
  );
};

export default Calendar;

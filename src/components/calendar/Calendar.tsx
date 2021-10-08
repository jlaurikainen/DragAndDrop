import {
  addMonths,
  getDay,
  getDaysInMonth,
  getISOWeeksInYear,
  getMonth,
  getWeek,
  getYear,
  startOfMonth,
} from "date-fns";
import { startOfDay, subMonths } from "date-fns/esm";
import React, { useState } from "react";
import { handleCalendarKeyEvents } from "./handleCalendarKeyEvents";
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
  const [navigationDate, setNavigationDate] = useState(
    (value && startOfDay(value)) || startOfDay(new Date())
  );

  const firstWeekOfMonth = getWeek(
    new Date(getYear(navigationDate), getMonth(navigationDate), 1),
    {
      locale: { code: "fi-FI" },
      firstWeekContainsDate: 7,
    }
  );

  return (
    <CalendarWrapper
      onKeyDown={(e) =>
        handleCalendarKeyEvents(e, navigationDate, setNavigationDate, onChange)
      }
      tabIndex={0}
    >
      <Controls
        month={getMonthString(navigationDate)}
        next={() => setNavigationDate(addMonths(navigationDate, 1))}
        prev={() => setNavigationDate(subMonths(navigationDate, 1))}
        year={getYear(navigationDate)}
      />
      <Weeks
        firstWeekOfMonth={firstWeekOfMonth}
        weeksInYear={getISOWeeksInYear(navigationDate)}
      />
      <Weekdays />
      <MonthView
        dayCount={getDaysInMonth(navigationDate)}
        firstDayOfMonth={getDay(startOfMonth(navigationDate))}
        navigationDate={navigationDate}
        setNavigationDate={setNavigationDate}
        navMonth={navigationDate.getMonth()}
        navYear={navigationDate.getFullYear()}
        onChange={onChange}
        value={value}
      />
    </CalendarWrapper>
  );
};

export default Calendar;

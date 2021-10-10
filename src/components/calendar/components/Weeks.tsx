import { getISOWeeksInYear, getWeek } from "date-fns";
import React, { memo, useContext } from "react";
import CalendarContext from "../context/CalendarContext";
import { WeeksWrapper, Week } from "../styled";

const Weeks = () => {
  const { navigationMonth, navigationYear } = useContext(CalendarContext);

  const weeksInYear = getISOWeeksInYear(
    new Date(navigationYear, navigationMonth)
  );

  const firstWeekOfMonth = getWeek(
    new Date(navigationYear, navigationMonth, 1),
    {
      locale: { code: "fi-FI" },
      firstWeekContainsDate: 7,
    }
  );

  const weekNumbers = () => {
    let weeksFromYearStart = 1;

    return new Array(6).fill(null).map((_, i) => {
      if (firstWeekOfMonth + i > weeksInYear) {
        return weeksFromYearStart++;
      }

      return firstWeekOfMonth + i;
    });
  };

  return (
    <WeeksWrapper>
      {weekNumbers().map((week, i) => (
        <Week key={i}>{week}</Week>
      ))}
    </WeeksWrapper>
  );
};

export default memo(Weeks);

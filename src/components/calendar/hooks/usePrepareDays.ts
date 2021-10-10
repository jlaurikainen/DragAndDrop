import { addMonths, getDate, getDaysInMonth, lastDayOfMonth } from "date-fns";
import { useContext, useMemo } from "react";
import { DayProps } from "../components/Day";
import CalendarContext from "../context/CalendarContext";
import { daysEqual, daysInFront } from "../utils";

const usePrepareDays = () => {
  const {
    navigationDate,
    navigationMonth,
    navigationYear,
    onChange,
    setNavigationDate,
    value,
  } = useContext(CalendarContext);

  const { dayCount, emptyDays, prevMonthLastDay } = useMemo(() => {
    const monthDate = new Date(navigationYear, navigationMonth);

    return {
      dayCount: getDaysInMonth(monthDate),
      emptyDays: daysInFront(monthDate),
      prevMonthLastDay: getDate(lastDayOfMonth(addMonths(monthDate, -1))) + 1,
    };
  }, [navigationMonth, navigationYear]);

  let nextMonthDays = 1;
  let prevMonthDays = emptyDays;

  const getDayValue = (p: { i: number; isNext: boolean; isPrev: boolean }) => {
    if (p.isNext) return nextMonthDays;
    if (p.isPrev) return prevMonthLastDay - prevMonthDays--;
    return p.i + 1 - emptyDays;
  };

  const getMontValue = (p: { isNext: boolean; isPrev: boolean }) => {
    if (p.isNext) return navigationMonth + 1;
    if (p.isPrev) return navigationMonth - 1;
    return navigationMonth;
  };

  return new Array(42).fill(true).map((_, i): DayProps => {
    const isPrev = i < emptyDays;
    const isNext = i >= emptyDays + dayCount;

    const date = new Date(
      navigationYear,
      getMontValue({ isNext, isPrev }),
      getDayValue({ i, isNext, isPrev })
    );

    return {
      isHighlighted: daysEqual(date, navigationDate),
      isSelected: value && daysEqual(date, value),
      isOutside: isPrev || isNext,
      onTileClick: () => {
        setNavigationDate(date);
        onChange?.(date);
      },
      tileValue: isNext ? `${nextMonthDays++}` : `${date.getDate()}`,
    };
  });
};

export default usePrepareDays;

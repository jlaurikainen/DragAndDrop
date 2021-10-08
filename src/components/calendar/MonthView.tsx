import { getDate, startOfDay } from "date-fns";
import { lastDayOfMonth } from "date-fns/esm";
import React, { useCallback, useMemo } from "react";
import Day, { DayProps } from "./Day";
import { MonthViewWrapper } from "./styled";
import { daysInFront } from "./utils";

interface Props {
  dayCount: number;
  firstDayOfMonth: number;
  navigationDate: Date;
  navMonth: number;
  navYear: number;
  onChange?: (date: Date) => void;
  setNavigationDate: React.Dispatch<React.SetStateAction<Date>>;
  value?: Date;
}

const MonthView = ({
  dayCount,
  firstDayOfMonth,
  onChange,
  navigationDate,
  setNavigationDate,
  navMonth,
  navYear,
  value,
}: Props) => {
  const onDayClick = useCallback(
    (date: Date) => {
      setNavigationDate(date);
      onChange?.(date);
    },
    [setNavigationDate, onChange]
  );

  const daysToRender = useMemo(() => {
    const prevMonthLastDay =
      getDate(lastDayOfMonth(new Date(navYear, navMonth - 1, 1))) + 1;
    const emptyDays = daysInFront(firstDayOfMonth);
    let prevMonthDays = emptyDays;
    let nextMonthDays = 1;

    return new Array(42).fill(null).map((_, i): DayProps => {
      if (i < emptyDays) {
        const prevMonthDayValue = new Date(
          navYear,
          navMonth - 1,
          prevMonthLastDay - prevMonthDays--
        );

        return {
          as: "div",
          isOutside: true,
          event: () => {
            onDayClick(prevMonthDayValue);
          },
          value: `${prevMonthDayValue.getDate()}`,
        };
      }

      if (i >= emptyDays + dayCount) {
        const nextMonthDayValue = new Date(
          navYear,
          navMonth + 1,
          nextMonthDays
        );

        return {
          as: "div",
          isOutside: true,
          event: () => {
            onDayClick(nextMonthDayValue);
          },
          value: `${nextMonthDays++}`,
        };
      }

      const currentDayValue = new Date(navYear, navMonth, i + 1 - emptyDays);

      return {
        as: "button",
        isHighlighted:
          startOfDay(currentDayValue).getTime() ===
          startOfDay(navigationDate).getTime(),
        isSelected:
          value &&
          startOfDay(currentDayValue).getTime() === startOfDay(value).getTime(),
        event: () => {
          onDayClick(currentDayValue);
        },
        value: `${i + 1 - emptyDays}`,
      };
    });
    // eslint-disable-next-line
  }, [dayCount, firstDayOfMonth, navigationDate, value]);

  return (
    <MonthViewWrapper>
      {daysToRender.map((day, i) => (
        <Day key={i} {...day} />
      ))}
    </MonthViewWrapper>
  );
};

export default MonthView;

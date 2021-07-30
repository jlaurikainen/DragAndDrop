import { getDate, isValid, startOfDay } from "date-fns";
import { lastDayOfMonth } from "date-fns/esm";
import React, { useEffect, useMemo, useRef } from "react";
import { MonthViewWrapper } from "./styled";
import { daysInFront } from "./utils";

interface DayProps {
  value: string;
  isSelected: boolean;
  isOutside: boolean;
  event: () => void;
}

interface Props {
  day: number;
  dayCount: number;
  firstDayOfMonth: number;
  navigationSetter: React.Dispatch<React.SetStateAction<Date>>;
  month: number;
  onChange?: (date: Date) => void;
  value?: Date;
  year: number;
}

const MonthView = ({
  day,
  dayCount,
  firstDayOfMonth,
  navigationSetter,
  month,
  value,
  onChange,
  year,
}: Props) => {
  const monthView = useRef<HTMLDivElement>(null);

  const resetHighlight = (date: Date) => {
    navigationSetter(date);
  };

  const daysToRender = useMemo(() => {
    const prevMonthLastDay = getDate(lastDayOfMonth(new Date(year, month, 1)));
    const emptyDays = daysInFront(firstDayOfMonth);
    let prevMonthDays = emptyDays;
    let nextMonthDays = 1;

    return new Array(42).fill(null).map((_, i) => {
      if (i < emptyDays) {
        const prevMonthDayValue = new Date(year, month - 1, prevMonthDays);

        return {
          className: "outside",
          element: "button",
          event: () => {
            onChange?.(prevMonthDayValue);
            resetHighlight(prevMonthDayValue);
          },
          value: `${prevMonthLastDay - prevMonthDays--}`,
        };
      }

      if (i >= emptyDays + dayCount) {
        const nextMonthDayValue = new Date(year, month + 1, nextMonthDays);

        return {
          className: "outside",
          element: "button",
          event: () => {
            onChange?.(nextMonthDayValue);
            resetHighlight(nextMonthDayValue);
          },
          value: `${nextMonthDays++}`,
        };
      }

      const currentDayValue = new Date(year, month, i + 1 - emptyDays);

      return {
        element: "button",
        event: () => {
          onChange?.(currentDayValue);
          resetHighlight(currentDayValue);
        },
        value: `${i + 1 - emptyDays}`,
      };
    });
    // eslint-disable-next-line
  }, [dayCount, firstDayOfMonth, month, year]);

  useEffect(() => {
    if (monthView.current && value && isValid(value)) {
      const monthViewDays = Array.from(monthView.current.children);

      monthViewDays.forEach((day) => {
        if (day.textContent) {
          const compareDate = new Date(year, month, +day.textContent).getTime();

          if (compareDate !== startOfDay(value).getTime()) {
            day.classList.remove("selected");
          } else {
            day.classList.add("selected");
          }
        }
      });
    }
  }, [value, month, year]);

  useEffect(() => {
    if (monthView.current) {
      const dayWithActiveNavigation = day.toString();
      const monthViewDays = Array.from(monthView.current.children);

      monthViewDays.forEach((day) => {
        if (day.textContent) {
          if (
            day.textContent !== dayWithActiveNavigation ||
            day.classList.contains("outside")
          ) {
            day.classList.remove("highlighted");
          } else {
            day.classList.add("highlighted");
          }
        }
      });
    }
  }, [day, month, year]);

  return <MonthViewWrapper ref={monthView}></MonthViewWrapper>;
};

export default MonthView;

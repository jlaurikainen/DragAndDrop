import {
  getDay,
  isEqual,
  isWithinInterval,
  setDay,
  startOfDay,
  startOfWeek,
} from "date-fns";

const formatter = (locale = "fi", options: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat(locale, options);

export const classNames = (classes: [boolean | undefined, string][]) => {
  return classes
    .filter(([isActive]) => isActive)
    .map(([_, name]) => name)
    .join(" ");
};

export const dayInValue = ({
  dateToCompare,
  value,
}: {
  dateToCompare: Date;
  value: Date | Date[];
}) => {
  if (Array.isArray(value)) {
    const sortedDates = value.sort((a, b) => (a > b ? 1 : -1));

    return isWithinInterval(dateToCompare, {
      start: sortedDates[0],
      end: sortedDates[value.length - 1],
    });
  }

  return isEqual(startOfDay(dateToCompare), startOfDay(value));
};

export const daysInFront = (date: Date) => {
  const firstDayOfMonth = getDay(date);

  if (firstDayOfMonth === 0) return 6;
  if (firstDayOfMonth === 1) return 7;
  return firstDayOfMonth - 1;
};

export const getDayNames = (locale = "fi") => {
  const refDay = startOfWeek(new Date());

  return new Array(7).fill(true).map((_, i) =>
    formatter(locale, {
      weekday: "short",
    }).format(setDay(refDay, i + 1))
  );
};

export const getMonthString = ({
  date,
  locale = "fi",
}: {
  date: Date;
  locale: string;
}) => {
  return formatter(locale, { month: "long" }).format(date);
};

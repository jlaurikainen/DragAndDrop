import { getDay, isEqual, setDay, startOfDay, startOfWeek } from "date-fns";

const formatter = (locale = "fi", options: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat(locale, options);

export const daysEqual = (a: Date, b: Date) => {
  return isEqual(startOfDay(a), startOfDay(b));
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

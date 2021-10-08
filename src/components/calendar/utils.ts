export const getMonthString = (date: Date) => {
  const intl = new Intl.DateTimeFormat("fi-FI", { month: "long" });

  return intl.format(date);
};

export const daysInFront = (day: number) => {
  if (day === 0) {
    return 6;
  }

  if (day === 1) {
    return 7;
  }

  return day - 1;
};

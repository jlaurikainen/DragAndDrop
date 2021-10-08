import { addDays, addMonths } from "date-fns";
import { Dispatch, SetStateAction } from "react";

export const handleCalendarKeyEvents = (
  event: React.KeyboardEvent<HTMLDivElement>,
  navigationDate: Date,
  setNavigationDate: Dispatch<SetStateAction<Date>>,
  onChange?: (date: Date) => void
) => {
  const key = event.key;

  switch (key) {
    case "ArrowDown":
      event.preventDefault();
      setNavigationDate(addDays(navigationDate, 7));
      break;
    case "ArrowLeft":
      event.preventDefault();
      setNavigationDate(addDays(navigationDate, -1));
      break;
    case "ArrowRight":
      event.preventDefault();
      setNavigationDate(addDays(navigationDate, 1));
      break;
    case "ArrowUp":
      event.preventDefault();
      setNavigationDate(addDays(navigationDate, -7));
      break;
    case "Enter":
      event.preventDefault();
      onChange?.(navigationDate);
      break;
    case "PageDown":
      event.preventDefault();
      setNavigationDate(addMonths(navigationDate, 1));
      break;
    case "PageUp":
      event.preventDefault();
      setNavigationDate(addMonths(navigationDate, -1));
      break;
  }
};

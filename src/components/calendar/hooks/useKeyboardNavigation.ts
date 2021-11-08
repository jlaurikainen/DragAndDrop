import { addDays, addMonths } from "date-fns";
import { KeyboardEvent, useContext } from "react";
import CalendarContext from "../context/CalendarContext";

export const useKeyboardNavigation = () => {
  const { navigationDate, setNavigationDate, onChange } =
    useContext(CalendarContext);

  const keyboardHadler = (event: KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
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

  return keyboardHadler;
};

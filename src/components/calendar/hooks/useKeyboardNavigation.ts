import { addDays, addMonths } from "date-fns";
import { KeyboardEvent, useContext } from "react";
import CalendarContext from "../context/CalendarContext";

export const useKeyboardNavigation = <T extends HTMLElement>(
  setNavigationValue: (date: Date) => void
) => {
  const { navigationValue, onChange, value } = useContext(CalendarContext);

  const keyboardHadler = (event: KeyboardEvent<T>) => {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setNavigationValue(addDays(navigationValue, 7));
        break;
      case "ArrowLeft":
        event.preventDefault();
        setNavigationValue(addDays(navigationValue, -1));
        break;
      case "ArrowRight":
        event.preventDefault();
        setNavigationValue(addDays(navigationValue, 1));
        break;
      case "ArrowUp":
        event.preventDefault();
        setNavigationValue(addDays(navigationValue, -7));
        break;
      case "Enter":
        event.preventDefault();
        onChange(navigationValue);
        break;
      case "Home":
        event.preventDefault();
        setNavigationValue(value ?? new Date());
        break;
      case "PageDown":
        event.preventDefault();
        setNavigationValue(addMonths(navigationValue, 1));
        break;
      case "PageUp":
        event.preventDefault();
        setNavigationValue(addMonths(navigationValue, -1));
        break;
    }
  };

  return keyboardHadler;
};

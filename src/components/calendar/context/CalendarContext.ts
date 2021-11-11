import { createContext } from "react";

interface CalendarContextProps<T extends Date | Date[] = any> {
  locale: string;
  navigationValue: Date;
  navigationMonth: number;
  navigationYear: number;
  onChange: (date: T) => void;
  selectRange?: boolean;
  setNavigationValue: (date: Date) => void;
  value: T;
}

const CalendarContext = createContext<CalendarContextProps>(
  {} as CalendarContextProps
);

export default CalendarContext;

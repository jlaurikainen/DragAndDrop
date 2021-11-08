import { createContext, Dispatch, SetStateAction } from "react";

interface CalendarContextProps<T extends Date | Date[] = any> {
  locale: string;
  navigationDate: Date;
  navigationMonth: number;
  navigationYear: number;
  onChange?: (date: T) => void;
  selectRange?: boolean;
  setNavigationDate: Dispatch<SetStateAction<Date>>;
  value?: T;
}

const CalendarContext = createContext<CalendarContextProps>(
  {} as CalendarContextProps
);

export default CalendarContext;

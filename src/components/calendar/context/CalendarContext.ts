import { createContext, Dispatch, SetStateAction } from "react";

interface CalendarContextProps {
  locale: string;
  navigationDate: Date;
  navigationMonth: number;
  navigationYear: number;
  onChange?: (date: Date) => void;
  setNavigationDate: Dispatch<SetStateAction<Date>>;
  value?: Date | Date[];
}

const CalendarContext = createContext<CalendarContextProps>(
  {} as CalendarContextProps
);

export default CalendarContext;

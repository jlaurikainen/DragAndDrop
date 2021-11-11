import React, { ReactNode, useState } from "react";
import CalendarContext from "./CalendarContext";

interface CalendarProviderProps<T extends Date | Date[]> {
  children: ReactNode;
  locale: string;
  navigationValue?: Date;
  onChange?: (date: T) => void;
  selectRange?: boolean;
  setNavigationValue?: (date: Date) => void;
  value?: T;
}

const CalendarProvider = <ValueType extends Date | Date[]>({
  children,
  locale,
  navigationValue,
  onChange,
  selectRange,
  setNavigationValue,
  value,
}: CalendarProviderProps<ValueType>) => {
  const initialStartingValue =
    Array.isArray(value) && value.length > 0 ? value[0] : (value as Date);
  const [internalNavigationValue, setInternalNavigationValue] = useState(
    initialStartingValue ?? new Date()
  );
  const [internalValue, setInternalValue] = useState<ValueType | undefined>(
    value
  );

  const handleChange = (date: ValueType) => {
    onChange?.(date) ?? setInternalValue(date);
  };

  const handleNavigation = (date: Date) => {
    setNavigationValue?.(date) ?? setInternalNavigationValue(date);
  };

  const month = (navigationValue ?? internalNavigationValue).getMonth();
  const year = (navigationValue ?? internalNavigationValue).getFullYear();

  return (
    <CalendarContext.Provider
      value={{
        locale,
        navigationMonth: month,
        navigationValue: navigationValue ?? internalNavigationValue,
        navigationYear: year,
        selectRange,
        setNavigationValue: handleNavigation,
        onChange: handleChange,
        value: value ?? internalValue,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export default CalendarProvider;

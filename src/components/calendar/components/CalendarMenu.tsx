import React, { FC, useContext } from "react";
import { CalendarWrapper } from "../styled";
import { useKeyboardNavigation } from "../hooks/useKeyboardNavigation";
import CalendarContext from "../context/CalendarContext";

const CalendarMenu: FC = ({ children }) => {
  const { setNavigationValue } = useContext(CalendarContext);
  const keyboardHandler =
    useKeyboardNavigation<HTMLDivElement>(setNavigationValue);

  return (
    <CalendarWrapper onKeyDown={keyboardHandler} tabIndex={0}>
      {children}
    </CalendarWrapper>
  );
};

export default CalendarMenu;

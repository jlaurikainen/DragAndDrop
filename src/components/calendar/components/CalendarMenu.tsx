import React, { FC } from "react";
import { CalendarWrapper } from "../styled";
import { useKeyboardNavigation } from "../hooks/useKeyboardNavigation";

const CalendarMenu: FC = ({ children }) => {
  const keyboardHandler = useKeyboardNavigation();

  return (
    <CalendarWrapper onKeyDown={keyboardHandler} tabIndex={0}>
      {children}
    </CalendarWrapper>
  );
};

export default CalendarMenu;

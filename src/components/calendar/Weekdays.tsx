import React, { memo } from "react";
import { Weekday, WeekdaysWrapper } from "./styled";

const Weekdays = () => {
  const shortDays = ["Ma", "Ti", "Ke", "To", "Pe", "La", "Su"];

  return (
    <WeekdaysWrapper>
      {shortDays.map((day, i) => (
        <Weekday key={i}>{day}</Weekday>
      ))}
    </WeekdaysWrapper>
  );
};

export default memo(Weekdays);

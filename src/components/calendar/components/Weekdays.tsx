import React, { memo, useContext } from "react";
import CalendarContext from "../context/CalendarContext";
import { WeekdaysWrapper, Weekday } from "../styled";
import { getDayNames } from "../utils";

const Weekdays = () => {
  const { locale } = useContext(CalendarContext);

  return (
    <WeekdaysWrapper>
      {getDayNames(locale).map((day, i) => (
        <Weekday key={i}>{day}</Weekday>
      ))}
    </WeekdaysWrapper>
  );
};

export default memo(Weekdays);

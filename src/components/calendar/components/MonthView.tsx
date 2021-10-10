import React from "react";
import usePrepareDays from "../hooks/usePrepareDays";
import { MonthViewWrapper } from "../styled";
import Day from "./Day";

const MonthView = () => {
  const daysToRender = usePrepareDays();

  return (
    <MonthViewWrapper>
      {daysToRender.map((day, i) => (
        <Day key={i} {...day} />
      ))}
    </MonthViewWrapper>
  );
};

export default MonthView;

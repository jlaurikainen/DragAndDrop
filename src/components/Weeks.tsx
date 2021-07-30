import React, { memo } from "react";
import { Week, WeeksWrapper } from "./styled";

interface Props {
  firstWeekOfMonth: number;
  weeksInYear: number;
}

const Weeks = ({ firstWeekOfMonth, weeksInYear }: Props) => {
  const getWeeks = () => {
    let weeksFromYearStart = 1;

    return new Array(6).fill(null).map((_, i) => {
      if (firstWeekOfMonth + i > weeksInYear) {
        return weeksFromYearStart++;
      }

      return firstWeekOfMonth + i;
    });
  };

  return (
    <WeeksWrapper>
      {getWeeks().map((week, i) => (
        <Week key={i}>{week}</Week>
      ))}
    </WeeksWrapper>
  );
};

export default memo(Weeks);

import { addMonths } from "date-fns";
import React, { useContext } from "react";
import CalendarContext from "../context/CalendarContext";
import { ControlsWrapper, Control, TileMarker, Month } from "../styled";
import { getMonthString } from "../utils";

const Controls = () => {
  const { locale, navigationValue, navigationYear, setNavigationValue } =
    useContext(CalendarContext);

  return (
    <ControlsWrapper>
      <Control
        onClick={() => setNavigationValue(addMonths(navigationValue, -1))}
      >
        <TileMarker />
        {"<"}
      </Control>
      <Month>{`${getMonthString({
        date: navigationValue,
        locale,
      })} ${navigationYear}`}</Month>
      <Control
        onClick={() => setNavigationValue(addMonths(navigationValue, 1))}
      >
        <TileMarker />
        {">"}
      </Control>
    </ControlsWrapper>
  );
};

export default Controls;

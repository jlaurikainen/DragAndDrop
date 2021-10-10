import { addMonths } from "date-fns";
import React, { useContext } from "react";
import CalendarContext from "../context/CalendarContext";
import { ControlsWrapper, Control, TileMarker, Month } from "../styled";
import { getMonthString } from "../utils";

const Controls = () => {
  const { locale, navigationDate, navigationYear, setNavigationDate } =
    useContext(CalendarContext);

  return (
    <ControlsWrapper>
      <Control onClick={() => setNavigationDate(addMonths(navigationDate, -1))}>
        <TileMarker />
        {"<"}
      </Control>
      <Month>{`${getMonthString({
        date: navigationDate,
        locale,
      })} ${navigationYear}`}</Month>
      <Control onClick={() => setNavigationDate(addMonths(navigationDate, 1))}>
        <TileMarker />
        {">"}
      </Control>
    </ControlsWrapper>
  );
};

export default Controls;

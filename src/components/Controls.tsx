import React from "react";
import { Control, ControlsWrapper, Month, TileMarker } from "./styled";

interface Props {
  month: string;
  year: number;
  next: () => void;
  prev: () => void;
}

const Controls = ({ month, year, next, prev }: Props) => {
  return (
    <ControlsWrapper>
      <Control onClick={prev}>
        <TileMarker />
        {"<"}
      </Control>
      <Month>{`${month} ${year}`}</Month>
      <Control onClick={next}>
        <TileMarker />
        {">"}
      </Control>
    </ControlsWrapper>
  );
};

export default Controls;

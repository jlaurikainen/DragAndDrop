import React, { Fragment } from "react";
import { Day as StyledDay, TileMarker } from "../styled";

export interface DayProps {
  isHighlighted?: boolean;
  isSelected?: boolean;
  isOutside?: boolean;
  onTileClick: () => void;
  tileValue: string;
}

const Day: React.FC<DayProps> = ({
  isHighlighted,
  isSelected,
  isOutside,
  onTileClick: event,
  tileValue: value,
}) => {
  return (
    <StyledDay
      as="button"
      className={`${isSelected ? "selected" : ""}${
        isOutside ? " outside" : ""
      }${isHighlighted ? " highlighted" : ""}`}
      onClick={event}
      tabIndex={-1}
    >
      {value && (
        <Fragment>
          <TileMarker />
          {value}
        </Fragment>
      )}
    </StyledDay>
  );
};

export default Day;

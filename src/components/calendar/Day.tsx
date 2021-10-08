import React, { Fragment } from "react";
import { Day as StyledDay, TileMarker } from "./styled";

export interface DayProps {
  as: "button" | "div";
  isHighlighted?: boolean;
  isSelected?: boolean;
  isOutside?: boolean;
  event: () => void;
  value: string;
}

const Day: React.FC<DayProps> = ({
  as,
  isHighlighted,
  isSelected,
  isOutside,
  event,
  value,
}) => {
  return (
    <StyledDay
      as={as}
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

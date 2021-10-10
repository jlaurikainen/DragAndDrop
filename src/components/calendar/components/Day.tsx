import React, { Fragment } from "react";
import { Day as StyledDay, TileMarker } from "../styled";
import { classNames } from "../utils";

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
      className={classNames([
        [isHighlighted, "highlighted"],
        [isSelected, "selected"],
        [isOutside, "outside"],
      ])}
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

import React from "react";
import { Day as StyledDay, TileMarker } from "./styled";

interface Props {
  as: "div" | "button";
  className?: string;
  onClick?: () => void;
  value?: string;
}

const Day: React.FC<Props> = ({ as, className, onClick, value }) => {
  return (
    <StyledDay as={as} className={className} onClick={onClick} tabIndex={-1}>
      {value && (
        <>
          <TileMarker />
          {value}
        </>
      )}
    </StyledDay>
  );
};

export default Day;

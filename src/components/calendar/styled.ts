import styled from "styled-components";

export const CalendarWrapper = styled.div`
  display: inline-grid;
  grid-template-columns: auto auto;
  grid-template-rows: auto auto auto;
  padding: 16px;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.35);
`;

export const Tile = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  width: 48px;
  font-family: sans-serif;
  font-size: 16px;
  line-height: 1;
`;

export const TileMarker = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  height: 90%;
  width: 90%;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: background-color 25ms ease-out;
  z-index: -1;
`;

export const ControlsWrapper = styled.div`
  grid-area: 1 / 1 / 2 / 3;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Control = styled(Tile)`
  position: relative;
  cursor: pointer;
  font-weight: bold;
  user-select: none;

  :hover > ${TileMarker} {
    background-color: lightgray;
  }
`;

export const WeekdaysWrapper = styled.div`
  grid-area: 2 / 1 / 3 / 3;
  display: flex;
  justify-self: end;
`;

export const Weekday = styled(Tile)`
  color: #666;
  text-transform: capitalize;
`;

export const WeeksWrapper = styled.div`
  grid-area: 3 / 1 / 4 / 2;
  display: flex;
  flex-direction: column;
`;

export const Week = styled(Tile)`
  color: #666;
`;

export const MonthViewWrapper = styled.div`
  grid-area: 3 / 2 / 4 / 3;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

export const Month = styled.h2`
  font-family: sans-serif;
  font-size: 20px;
  text-transform: capitalize;
`;

export const Day = styled(Tile)`
  position: relative;
  border: 0;
  background-color: transparent;
  font-weight: bold;

  :focus {
    outline: none;
  }

  &.outside {
    color: #999;
    font-weight: normal;
  }

  &.selected > ${TileMarker} {
    background-color: lightblue;
  }

  &.highlighted > ${TileMarker} {
    box-shadow: inset 0 0 0 2px lightblue;
  }

  :hover > ${TileMarker} {
    background-color: lightgray;
  }
`;

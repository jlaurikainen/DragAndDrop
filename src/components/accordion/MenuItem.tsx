import React, { HTMLAttributes } from "react";
import styled from "styled-components";

interface Props extends HTMLAttributes<HTMLDivElement> {
  active?: boolean;
}

const MenuItem: React.FC<Props> = ({ active = false, children, ...rest }) => {
  return (
    <StyleItem
      {...rest}
      className={`${active ? "active" : ""} ${rest.className}`}
    >
      {children}
    </StyleItem>
  );
};

export default MenuItem;

const StyleItem = styled.div`
  position: relative;
  height: 48px;
  padding: 4px 16px;
  display: flex;
  align-items: center;
  font: normal 16px sans-serif;

  :hover {
    background-color: lightgray;
  }

  &.level1 {
    padding-left: 32px;
  }

  &.level2 {
    padding-left: 64px;
  }

  &.active {
    ::after {
      content: "";
      position: absolute;
      height: 100%;
      left: 0;
      width: 4px;
      background-color: slateblue;
    }
  }
`;

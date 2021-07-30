import * as faker from "faker";
import React, { useState } from "react";
import styled, { css } from "styled-components";

interface IItem {
  id: string;
  number: number;
  name: string;
  order: number;
}

const items: IItem[] = new Array(6).fill(null).map((_, i) => ({
  id: `item${i}`,
  number: Math.floor(Math.random() * 10000 + Math.random() * 100 * i),
  name: `${faker.finance.accountName()} ${faker.lorem.words(2)}`,
  order: i,
}));

const App = () => {
  const [dragId, setDragId] = useState<string | null>(null);
  const [boxes, setBoxes] = useState<IItem[]>(items);

  const handleDrag = (e: React.DragEvent) => {
    setDragId(e.currentTarget.id);
  };

  const handleDrop = (e: React.DragEvent) => {
    const dragItem = boxes.find((b) => b.id === dragId);
    const dropTarget = boxes.find((b) => b.id === e.currentTarget.id);

    const dragIndex = dragItem!.order;
    const dropIndex = dropTarget!.order;

    /** Do nothing if drop target is drag target */
    if (dragIndex === dropIndex) return;

    /** We are dragging from top to bottom */
    if (dragIndex < dropIndex) {
      const smallerAndNoDrag = boxes.filter(
        (b) => b.order <= dropIndex && b.order !== dragIndex
      );
      const rest = boxes.filter((b) => b.order > dropIndex);

      const newBoxes = [...smallerAndNoDrag, dragItem!, ...rest].map(
        (b, i) => ({ ...b, order: i })
      );

      setBoxes(newBoxes);
      setDragId(null);
      return;
    }

    /** We are dragging from bottom to top */
    const smallerAndNoDrag = boxes.filter((b) => b.order < dropIndex);

    const rest = boxes.filter(
      (b) => b.order >= dropIndex && b.order !== dragIndex
    );

    const newBoxes = [...smallerAndNoDrag, dragItem!, ...rest].map((b, i) => ({
      ...b,
      order: i,
    }));

    setBoxes(newBoxes);
    setDragId(null);
  };

  return (
    <div>
      <button
        onClick={() =>
          setBoxes(
            boxes
              .sort((a, b) => a.number - b.number)
              .map((b, i) => ({ ...b, order: i }))
          )
        }
      >
        Autosort by number
      </button>
      {boxes.map((item) => (
        <Item
          draggable={true}
          id={item.id}
          onDragStart={handleDrag}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          key={item.order}
        >
          <Handle tabIndex={-1} title="Sort by dragging" />
          <Number>{item.number}</Number>
          <Name>{item.name}</Name>
          <Button title="Remove from list" />
        </Item>
      ))}
    </div>
  );
};

export default App;

const Item = styled.div`
  display: grid;
  flex: 1 1 100%;
  grid-template-columns: min-content 6ch auto min-content;
  padding: 8px;
  gap: 16px;
  align-items: center;
  box-shadow: 0 3px 5px 1px rgba(0, 0, 0, 0.15);
  background-color: white;

  & + & {
    margin-top: 8px;
  }

  &[draggable] {
    opacity: 1;
  }
`;

const baseStyles = css`
  display: flex;
  align-items: center;
  font-family: sans-serif;
  font-size: 16px;
  line-height: 1;
`;

const Handle = styled.button`
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 0 24 24' width='24px' fill='%23999999'%3E%3Cpath d='M0 0h24v24H0V0z' fill='none'/%3E%3Cpath d='M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z'/%3E%3C/svg%3E");
  background-position: center center;
  background-repeat: no-repeat;
  border: 0;
  background-color: transparent;
  width: 48px;
  height: 100%;
  cursor: ns-resize;
`;

const Number = styled.div`
  grid-area: 1 / 2 / 2 / 3;
  font-weight: bold;
  ${baseStyles}
  margin: 0;
`;

const Name = styled.div`
  grid-area: 1 / 3 / 2 / 4;
  font-weight: normal;
  ${baseStyles}
  margin: 0;
  padding: 16px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Button = styled.button`
  cursor: pointer;
  grid-area: 1 / 4 / 2 / 5;
  border: 0;
  background-color: transparent;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 0 24 24' width='24px' fill='%23000000'%3E%3Cpath d='M0 0h24v24H0V0z' fill='none'/%3E%3Cpath d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z'/%3E%3C/svg%3E");
  background-position: center center;
  background-repeat: no-repeat;
  height: 48px;
  width: 48px;
  ${baseStyles}
`;

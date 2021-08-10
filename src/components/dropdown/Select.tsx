import { useCombobox, useMultipleSelection } from "downshift";
import React, { useState } from "react";

interface Props {
  items: Item[];
}

type Item = {
  label: string;
  value: string | number;
};

const Select = ({ items }: Props) => {
  const [inputValue, setInputValue] = useState("");

  const filterItems = () =>
    items.filter(
      (item) =>
        selectedItems.indexOf(item) < 0 &&
        item.label.toLowerCase().includes(inputValue.toLowerCase())
    );

  const {
    // getSelectedItemProps,
    getDropdownProps,
    addSelectedItem,
    // removeSelectedItem,
    selectedItems,
  } = useMultipleSelection<Item>({ initialSelectedItems: [] });

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    inputValue,
    defaultHighlightedIndex: 0,
    selectedItem: null,
    items: filterItems(),
    stateReducer: (_, { type, changes }) => {
      switch (type) {
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
          return {
            ...changes,
            isOpen: true,
          };
      }
      return changes;
    },
    onStateChange: ({ inputValue, type, selectedItem }) => {
      switch (type) {
        case useCombobox.stateChangeTypes.InputChange:
          setInputValue(inputValue ?? "");
          break;
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
          console.log(selectedItem);
          if (selectedItem) {
            setInputValue("");
            addSelectedItem(selectedItem);
          }
          break;
        default:
          break;
      }
    },
  });

  return (
    <div>
      <label {...getLabelProps()}>Label</label>
      <div>
        {selectedItems.length + "valintaa"}

        <div {...getComboboxProps()}>
          <input
            {...getInputProps(getDropdownProps({ preventKeyAction: isOpen }))}
          />
          <button {...getToggleButtonProps()}>&#8595;</button>
        </div>
      </div>
      <ul {...getMenuProps()}>
        {isOpen &&
          items.map((item, index) => (
            <li
              key={index}
              style={
                highlightedIndex === index
                  ? { backgroundColor: "lightgray" }
                  : {}
              }
              {...getItemProps({ item, index })}
            >
              {selectedItems.indexOf(item) === index && "x"}
              {item.label}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Select;

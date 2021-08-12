import React from "react";
import { default as BaseSelect, AsyncProps } from "react-select/async";
import { GroupBase } from "react-select/dist/declarations/src";

// const MenuList = (props: MenuListProps<any, boolean>) => {
//   const { options, getValue, setValue } = props;
//   const value = getValue();

//   const handleSelectAll = () => {
//     let hasAllSelected = false;

//     if ("options" in options?.[0]) {
//       hasAllSelected =
//         options.map((optGroup) => optGroup.options).flat().length ===
//         value.length;
//     } else {
//       hasAllSelected = options.length === value.length;
//     }

//     if (!hasAllSelected) {
//       if ("options" in options?.[0]) {
//         const all = options.map((optGroup) => optGroup.options).flat();
//         setValue(all, "select-option", null);
//         return;
//       }
//       setValue(options, "select-option", null);
//       return;
//     }

//     setValue([], "deselect-option", null);
//     return;
//   };

//   return (
//     <div>
//       <div style={{ display: "flex", justifyContent: "space-between" }}>
//         <button onClick={handleSelectAll}>Select all</button>
//       </div>
//       <components.MenuList {...props}></components.MenuList>
//     </div>
//   );
// };

// const Group = (props: GroupProps<any, boolean>) => {
//   const { getValue, setValue, data } = props;

//   const value = getValue();

//   const hasValue = (options?: readonly object[], option?: object) => {
//     return options?.some((opt) => opt === option);
//   };

//   const remaining = data.options.filter((opt) => !hasValue(value, opt));

//   const handleGroupSelect = () => {
//     if (remaining.length > 0) {
//       setValue([...value, ...remaining], "select-option", null);
//       return;
//     }

//     setValue(
//       value.filter((opt) => !hasValue(data.options, opt)),
//       "select-option",
//       null
//     );
//   };

//   return (
//     <div>
//       <span>{data.label}</span>
//       <button onClick={handleGroupSelect}>Select all</button>
//       <components.Group {...props}></components.Group>
//     </div>
//   );
// };

const Select = <T extends object, B extends boolean>(
  props: AsyncProps<T, B, GroupBase<T>>
) => {
  // const [showSelected, setShowSelected] = useState(false);

  return <BaseSelect {...props} />;
};

export default Select;

import React, { useState } from "react";
import Calendar from "./components/calendar/Calendar";

// interface User {
//   id: number;
//   name: string;
//   username: string;
//   email: string;
//   address: {
//     street: string;
//     suite: string;
//     city: string;
//     zipcode: string;
//     geo: {
//       lat: number;
//       lng: number;
//     };
//   };
//   phone: string;
//   website: string;
//   company: {
//     name: string;
//     catchPhrase: string;
//     bs: string;
//   };
// }

// const debounce = <T extends unknown[], U>(
//   callback: (...args: T) => PromiseLike<U> | U,
//   wait: number
// ) => {
//   let timer: number;

//   return (...args: T): Promise<U> => {
//     clearTimeout(timer);
//     return new Promise((resolve) => {
//       timer = window.setTimeout(() => resolve(callback(...args)), wait);
//     });
//   };
// };

const App = () => {
  // const [options] = useState([
  //   {
  //     label: "Group 1",
  //     options: [
  //       { label: "One", value: "1" },
  //       { label: "Two", value: "2" },
  //       { label: "Four", value: "3" },
  //       { label: "Five", value: "4" },
  //       { label: "Six", value: "5" },
  //       { label: "Seven", value: "6" },
  //     ],
  //   },
  //   {
  //     label: "Group 2",
  //     options: [
  //       { label: "Eight", value: "7" },
  //       { label: "Nine", value: "8" },
  //       { label: "Ten", value: "9" },
  //       { label: "Eleven", value: "10" },
  //       { label: "Twelve", value: "11" },
  //       { label: "Thirteen", value: "12" },
  //     ],
  //   },
  // ]);

  const [value, setValue] = useState(new Date());

  return (
    <>
      {/* <TabNavigation activeItem={1}>
        <TabItem tabId={1}>Item 1</TabItem>
        <TabItem tabId={2}>Item 2</TabItem>
        <TabItem tabId={3}>Item 3</TabItem>
      </TabNavigation> */}
      {/* <Grid>
        <Item colSpan={4} rowSpan={2}>
          <input type="text" style={{ boxSizing: "border-box", width: "100%" }} />
        </Item>
        <Item colSpan={4}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium reiciendis ipsam quis ipsa quod.
          Necessitatibus est expedita aut, exercitationem, veniam tempore voluptatibus odio nobis asperiores quasi rerum
          optio soluta voluptate. Eaque labore enim consequatur quam architecto pariatur beatae dolores maxime mollitia
          ab ut porro minus ad velit fugit praesentium, perspiciatis hic vitae libero officia. Officia in labore
          incidunt maxime dolorem. Sapiente temporibus officia nobis vitae tempora, molestiae nisi error corrupti
          asperiores fugit.
        </Item>
        <Item colSpan={4}>Poop</Item>
        <Item colSpan={12}>Poop</Item>
        <Item>Poop</Item>
        <Item colSpan={6}>Poop</Item>
      </Grid> */}
      <Calendar value={value} onChange={(v) => setValue(v)} />
      {/* <FourOFour error="Oh shit! 404" description="Something went fucky-wucky" link="someurl" /> */}
      {/* <Select<OptionTypeBase, true> options={options} isMulti hideSelectedOptions={false} closeMenuOnSelect={false} /> */}
    </>
  );
};

export default App;

// const Grid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(12, 1fr);
//   grid-auto-rows: auto;
//   gap: 16px;
// `;

// const Item = styled.div<{ colSpan?: number; rowSpan?: number }>`
//   ${({ colSpan }) =>
//     colSpan &&
//     css`
//       grid-column: span ${colSpan};
//     `};

//   ${({ rowSpan }) =>
//     rowSpan &&
//     css`
//       grid-row: span ${rowSpan};
//     `}
// `;

// type IMenu = { label: string; menuItems?: IMenuItem[] }[];

// interface IMenuItem {
//   label: string;
//   subItems?: Omit<IMenuItem, "subItems">[];
// }

// const testItems: IMenu = [
//   {
//     label: "Menu 1",
//     menuItems: [
//       {
//         label: "Item 1",
//       },
//       {
//         label: "Item 1",
//         subItems: [
//           { label: "Subitem 1" },
//           { label: "Subitem 2" },
//           { label: "Subitem 3" },
//         ],
//       },
//       {
//         label: "Item 1",
//       },
//     ],
//   },
//   { label: "Menu middle" },
//   { label: "Menu 2", menuItems: [{ label: "Item 1" }, { label: "Item 2" }] },
// ];

// const Menu = ({ menu }: { menu: IMenu }) => {
//   const [activeMenuItem, setActiveMenuItem] = useState(-1);

//   const handleMenuItem = (id: number) => {
//     setActiveMenuItem(id);
//   };

//   const mapMenu = () => {
//     let itemIndex = 0;

//     return menu.map((top) => ({
//       ...top,
//       menuId: itemIndex++,
//       menuItems: top.menuItems?.map((items) => ({
//         ...items,
//         menuId: itemIndex++,
//         subItems: items.subItems?.map((sub) => {
//           return { ...sub, menuId: itemIndex++ };
//         }),
//       })),
//     }));
//   };

//   return (
//     <>
//       {mapMenu().map(({ label, menuItems, menuId }, i) => {
//         const hasMenuItems = menuItems !== undefined && menuItems.length > 0;

//         if (!hasMenuItems)
//           return (
//             <MenuItem
//               active={activeMenuItem === menuId}
//               onClick={() => {
//                 handleMenuItem(menuId);
//               }}
//             >
//               {label}
//             </MenuItem>
//           );

//         return (
//           <Accordion heading={label} key={i}>
//             {menuItems?.map(({ label, subItems, menuId }, i) => {
//               const hasSubMenu = subItems !== undefined && subItems.length > 0;

//               if (!hasSubMenu)
//                 return (
//                   <MenuItem
//                     active={activeMenuItem === menuId}
//                     onClick={() => {
//                       handleMenuItem(menuId);
//                     }}
//                     className="level1"
//                     key={i}
//                   >
//                     {label}
//                   </MenuItem>
//                 );

//               return (
//                 <Accordion className="sub" heading={label} key={i}>
//                   {subItems?.map(({ label, menuId }, i) => {
//                     return (
//                       <MenuItem
//                         active={activeMenuItem === menuId}
//                         onClick={() => {
//                           handleMenuItem(menuId);
//                         }}
//                         className="level2"
//                         key={i}
//                       >
//                         {label}
//                       </MenuItem>
//                     );
//                   })}
//                 </Accordion>
//               );
//             })}
//           </Accordion>
//         );
//       })}
//     </>
//   );
// };

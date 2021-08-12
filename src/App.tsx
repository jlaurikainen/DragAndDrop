import React from "react";
import Select from "./components/select/Select";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: number;
      lng: number;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

const debounce = <T extends unknown[], U>(
  callback: (...args: T) => PromiseLike<U> | U,
  wait: number
) => {
  let timer: number;

  return (...args: T): Promise<U> => {
    clearTimeout(timer);
    return new Promise((resolve) => {
      timer = window.setTimeout(() => resolve(callback(...args)), wait);
    });
  };
};

const App = () => {
  const handleOptions = debounce(
    async (_: string, callback: (options: User[]) => void) => {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await res.json();

      return callback(data);
    },
    500
  );

  return (
    <>
      <Select<User, true>
        closeMenuOnSelect={false}
        getOptionLabel={(o) => o.name}
        getOptionValue={(o) => `${o.id}`}
        hideSelectedOptions={false}
        isMulti
        loadOptions={handleOptions}
      />
    </>
  );
};

export default App;

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

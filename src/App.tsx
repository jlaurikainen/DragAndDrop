import { isValid, parse } from "date-fns";
import React, { useState } from "react";
import Calendar from "./components/calendar/Calendar";

const App = () => {
  const [value, setValue] = useState<Date>();

  const [inputValue, setInputValue] = useState("");

  return (
    <>
      <input
        value={inputValue}
        onChange={({ currentTarget: { value } }) => {
          setInputValue(value);
          const newValue = parse(value, "dd.MM.yyyy", new Date());
          if (isValid(newValue)) {
            console.log(newValue);
            setValue(newValue);
          }
        }}
      />
      <Calendar onChange={(v) => setValue(v as Date)} value={value} />
    </>
  );
};

export default App;

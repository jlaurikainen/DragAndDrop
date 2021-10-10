import React, { useState } from "react";
import Calendar from "./components/calendar/Calendar";

const App = () => {
  const [value, setValue] = useState<Date | Date[]>([
    new Date(2021, 9, 9),
    new Date(2021, 9, 18),
  ]);

  return (
    <>
      <Calendar onChange={(v) => setValue(v)} value={value} />
    </>
  );
};

export default App;

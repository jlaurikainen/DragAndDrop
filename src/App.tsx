import React, { useState } from "react";
import Calendar from "./components/calendar/Calendar";

const App = () => {
  const [value, setValue] = useState(new Date());

  return (
    <>
      <Calendar onChange={(v) => setValue(v)} value={value} />
    </>
  );
};

export default App;

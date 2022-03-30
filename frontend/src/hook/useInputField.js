import { useState } from "react";

const useInputField = (props) => {
  const [value, setValue] = useState("");

  const changeValue = (e) => setValue(e.target.value);

  return [value, setValue, changeValue];
};

export default useInputField;

import { useState } from 'react';

const useToggle = (initialState: boolean = false) => {
  const [isToggled, setIsToggled] = useState(initialState);

  const toggle = () => {
    setIsToggled((prevState) => !prevState);
  };

  return [isToggled, toggle] as const;
};

export default useToggle;

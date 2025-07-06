import { useState } from "react";
import cls from "./SearchInput.module.css";

export const SearchInput = () => {
  const [searchValue, setSearchValue] = useState("")

  const onSearchChangeHandler = (e) => {
    setSearchValue(e.target.value)
  }

  return (
     <div className={cls.searchinput}>
        <input type="text" value={searchValue} placeholder="Search..." onChange={onSearchChangeHandler}/>
      </div>
  );
};

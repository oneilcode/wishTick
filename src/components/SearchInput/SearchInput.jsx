import cls from "./SearchInput.module.css";

export const SearchInput = ( {value, onChange}) => {
  return <input type="text" value={value}  onChange={onChange} className={cls.search} placeholder="Search..." />  
};

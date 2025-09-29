import { IoMdSearch } from "react-icons/io";

export const CustomInput = ({ className, handleOnChange }) => {
  return (
    <div
      className={
        `flex gap-4 px-6 py-4 rounded-[48px] items-center bg-white ` + className
      }
    >
      <IoMdSearch size={42} color="grey" />
      <input
        onChange={handleOnChange}
        type="text"
        placeholder="Search the city"
        className="w-[455px] h-[44px] text-black text-[32px] font-bold outline-none"
      ></input>
    </div>
  );
};
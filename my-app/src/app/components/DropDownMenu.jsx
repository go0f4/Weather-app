import { CiLocationOn } from "react-icons/ci";

export const DropDownMenu = ({ className, cityName, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="w-[519px] h-[56px] flex gap-4 items-center"
    >
      <CiLocationOn size={32} color="black" />
      <p className="text-black text-[28px] font-bold">{cityName}</p>
    </div>
  );
};
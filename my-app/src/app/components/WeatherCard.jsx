import React from "react";
import { MdOutlineLocationOn } from "react-icons/md";
import { TbHome } from "react-icons/tb";
import { CiLocationOn } from "react-icons/ci";
import { IoMdHeartEmpty } from "react-icons/io";
import { LuUser } from "react-icons/lu";

export const WeatherCard = ({ isDaytime, city, dayTemp, dayStatus }) => {
  const today = new Date();
  const options = { month: "long", day: "numeric", year: "numeric" };
  const formattedDate = today.toLocaleDateString("en-US", options);
  return (
    <div
      className={`w-max-[414px] w-fit h-max-[832px] h-fit pb-10 rounded-[48px] z-40 backdrop-blur-md bg-opacity-50 flex items-center pt-2 flex-col px-2  ${
        isDaytime ? "bg-white/50" : "bg-gray-900/50"
      }`}
    >
      <div
        className={`w-[398px] h-[440px] rounded-[42px] backdrop-blur-md bg-opacity-100 flex flex-col items-center ${
          isDaytime ? "" : "bg-gradient-to-b from-gray-800 to-transparent"
        }`}
      >
        <div className="flex items-center justify-center w-full pr-[40px] pt-[64px] pl-[48px]   ">
          <div className="flex flex-col w-full">
            <p
              className={` text-[18px] font-medium ${
                isDaytime ? "text-[#111827]" : "text-[#9CA3AF]"
              }`}
            >
              {formattedDate}
            </p>
            <p
              className={`text-[48px] font-extrabold ${
                isDaytime ? "text-[#111827]" : "text-white "
              }`}
            >
              {city}
            </p>
          </div>
          <MdOutlineLocationOn
            className={`w-8 h-8 ${isDaytime ? "fill-[#4B5563]" : "fill-white"}`}
          />
        </div>
        {isDaytime ? (
          <div className="relative">
            <img className="w-[264.891px] h-[264.891px]" src="/sun.png"></img>
          </div>
        ) : (
          <div className="relative">
            <img className="w-[264.891px] h-[264.891px]" src="/moon.png"></img>
          </div>
        )}
      </div>
      <div className="w-full pl-[48px] ">
        <h1
          className={`text-[144px] font-bold  text-transparent bg-clip-text ${
            isDaytime
              ? "bg-gradient-to-b from-[#111827] to-[#6B7280]"
              : " bg-gradient-to-b from-gray-300 to-gray-600"
          }`}
        >
          {dayTemp}°
        </h1>
        <p
          className={`text-[24px] font-bold   ${
            isDaytime ? "text-[#FF8E27]" : "text-[#777CCE]"
          }`}
        >
          {dayStatus}
        </p>
      </div>
      <div className="flex justify-between w-full px-[48px] pt-[40px]">
        <TbHome size={32} color={isDaytime ? "#4B5563" : "#9CA3AF"} />
        <CiLocationOn size={32} color={isDaytime ? "#4B5563" : "#9CA3AF"} />
        <IoMdHeartEmpty size={32} color={isDaytime ? "#4B5563" : "#9CA3AF"} />
        <LuUser size={32} color={isDaytime ? "#4B5563" : "#9CA3AF"} />
      </div>
    </div>
  );
};
"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import {
  CustomInput,
  DropDownMenu,
  RoundCircle,
  WeatherCard,
} from "./components";

export default function Home() {
  const circleData = ["340px", "540px", "940px", "1340px"];
  const defaultCity = "Ulan Bator";

  const [weatherData, setWeatherData] = useState(null);
  const [inputData, setInputData] = useState(defaultCity);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleOnChange = (event) => {
    setInputData(event.target.value);
  };

  const handleDropDownClick = (cityName) => {
    setInputData(cityName);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (!inputData.trim()) {
        console.warn("");
        return;
      }

      const url = `/api/weather?q=${encodeURIComponent(inputData.trim())}`;

      axios
        .get(url)
        .then((res) => {
          setErrorMessage(null);
          setWeatherData(res.data);
        })
        .catch((err) => {
          const status = err?.response?.status;
          const data = err?.response?.data;
          const message = err?.message;
          const friendly = typeof data === "string" ? data : (data?.error ?? message ?? "Unknown error");
          setErrorMessage(`Request failed${status ? ` (${status})` : ""}: ${friendly}`);
        });
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [inputData]);

  return (
    <div className="w-screen h-screen flex relative">
      <div className="w-1/2 h-full bg-[#F3F4F6] flex flex-col justify-center items-center overflow-hidden">
        <CustomInput
          handleOnChange={handleOnChange}
          className="absolute z-50 top-10 left-10 shadow-lg max-w-full"
          placeholder="Enter city name"
        />

        {errorMessage && (
          <div className="absolute top-[110px] left-10 z-50 bg-red-50 text-red-700 px-4 py-2 rounded-xl shadow">
            {errorMessage}
          </div>
        )}

        {inputData && inputData !== defaultCity && weatherData && (
          <div className="flex flex-col items-start absolute top-[150px] left-10 z-50 bg-white px-6 py-4 rounded-3xl shadow-lg">
            <DropDownMenu
              cityName={weatherData.location.name}
              onClick={() => handleDropDownClick(weatherData.location.name)}
            />
          </div>
        )}

        <WeatherCard
          city={weatherData?.location?.name}
          dayTemp={weatherData?.forecast?.forecastday[0]?.day?.maxtemp_c}
          dayStatus={
            weatherData?.forecast?.forecastday[0]?.day?.condition?.text
          }
          isDaytime={true}
          inputData={inputData}
        />
      </div>

      <div className="w-1/2 h-full bg-[#0F141E] flex justify-center items-center overflow-hidden">
        <WeatherCard
          city={weatherData?.location?.name}
          dayTemp={weatherData?.forecast?.forecastday[0]?.day?.mintemp_c}
          dayStatus={
            weatherData?.forecast?.forecastday[0]?.day?.condition?.text
          }
          isDaytime={false}
          inputData={inputData}
        />
      </div>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-[140px] h-[140px] bg-[#F3F4F6] rounded-full flex items-center justify-center gap-4 absolute top-1/2 left-[45%] transform -translate-x-[45%] -translate-y-1/2">
            <img src="logo1.png" className="w-[43px] h-[86px]"></img>
            <img src="logo2.png" className="w-[43px] h-[86px]"></img>
          </div>
        </div>
      </div>

      <div className="w-full h-full absolute overflow-hidden">
        {circleData.map((value, index) => (
          <RoundCircle key={index} size={value} className="" />
        ))}
      </div>
    </div>
  );
}

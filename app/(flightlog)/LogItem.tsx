import { useState } from "react";


import { logItems } from "../interface/logItems";

type Props = {
  item : logItems,
  key : string 
}

export default function LogItem({key,item} : Props) {
  return (
    <div className="flex flex-row h-full justify-center items-center py-[2vh]">
      <span className="flex justify-center w-full text-gray-500 text-base font-medium"><p>{item.passengerName}</p></span>
      <span className="flex justify-center w-full text-gray-500 text-base font-medium">{item.airport}</span>
      <span className="flex justify-center w-full text-gray-500 text-base font-medium">{item.timestamp}</span>
      <span className="flex justify-center w-full text-gray-500 text-base font-medium">
        {item.type === "departure" ? "Departure" : "Arrival"}
      </span>
    </div>
  );
}


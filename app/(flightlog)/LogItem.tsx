import { useState } from "react";


import { logItems } from "../interface/logItems";

type Props = {
  item : logItems,
  key : string 
}

export default function LogItem({key,item} : Props) {
  return (
    <div style={{ display: "flex" }}>
      <span style={{ flex: 1 }}>{item.passengerName}</span>
      <span style={{ flex: 1 }}>{item.airport}</span>
      <span style={{ flex: 1 }}>{item.timestamp}</span>
      <span style={{ flex: 1 }}>
        {item.type === "departure" ? "Departure" : "Arrival"}
      </span>
    </div>
  );
}


import { useState, useEffect } from "react";
import LogItem from "./LogItem";
import { logItems } from "../interface/logItems";

type Props = {
  data : logItems[]
}

function LogCard( {data} : Props) {
  const [logs, setLogs] = useState(data);

  useEffect(() => {
    setLogs(data);
  }, [data]);

  return (
    <div
      className="w-full flex flex-col gap-x-4"
    >
      <div
        style={{
          display: "flex",
          marginBottom: 4,
          fontSize: 16,
          fontWeight: "bold",
        }}
      >
        <span style={{ flex: 1 }}>Passenger Name</span>
        <span style={{ flex: 1 }}>Airport</span>
        <span style={{ flex: 1 }}>Timestamp</span>
        <span style={{ flex: 1 }}>Type</span>
      </div>
      {logs.map((item : logItems) => (
        <LogItem key={`${item.passengerName}`} item={item}></LogItem>
      ))}
    </div>
  );
}

export default LogCard;

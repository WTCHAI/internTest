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
    <div className="w-full flex flex-col bg-white">
      <div className="flex flex-row justify-between items-center py-[1vh] pr-[1.25vw]">
        <span className="flex justify-center w-full text-gray-600 text-xl font-semibold">Passenger Name</span>
        <span className="flex justify-center w-full text-gray-600 text-xl font-semibold">Airport</span>
        <span className="flex justify-center w-full text-gray-600 text-xl font-semibold">Timestamp</span>
        <span className="flex justify-center w-full text-gray-600 text-xl font-semibold">Type</span>
      </div>
      <ul className="flex flex-col h-full justify-center max-h-[30vh] overflow-y-scroll">
        {logs.map((item : logItems) => {
          return(
            <li className="border-b-2 hover:bg-sky-50">
              <LogItem key={`${item.passengerName}`} item={item}></LogItem>
            </li>
          )
        })}        
      </ul>

    </div>
  );
}

export default LogCard;

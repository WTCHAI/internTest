"use client";

import {  useState, useEffect } from "react";

import { logItems } from "../interface/logItems";

import styles from "./Home.module.css";

import { FlightLogService } from "../(flightlog)/fightlog.service";
import LogCard from "../(flightlog)/LogCard";
import LogForm from "../(flightlog)/LogForm";
// import BoardingPassCard from "../(boardingpass)/BoardingPassCard";


const flightLogService = new FlightLogService();

export default function Home() {
  const [logs, setLogs] = useState<logItems[]>([]);
  // finding average path handering 
  const [flightPath, setFlightPath] = useState<{ [key: string]: number}>({});
  const [userMem,onSetUser] = useState<{ [key: string]: boolean}>({})

  const handleAddLog = (log : logItems)=>{
    const updatedLog : logItems[] = [...logs,log]
    setLogs(updatedLog); 
  }

  const flightAvgHandle = () => {
    //after knowing what flight was arrive mean it must already succeed
    Object.entries(flightPath).forEach(([key, value]) => {
      const path  = key.split('-')
      const date = new Date(value * 1000);
      
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();

      console.log(`From ${path[0]} to ${path[1]} : ${hours === 0 ? '': `${hours} hours`} ${minutes === 0 ? '': `${minutes} minutes`} ${seconds === 0 ? '': `${seconds} seconds`}`);

    })
  }

  // prepare data for avg paths 
  useEffect(()=>{
    const arrivesLogs = logs.filter((e)=>e.type === "arrival")
    const departureLogs = logs.filter((e)=>e.type === "departure")
    
    arrivesLogs.map((arrivelog )=>{
      departureLogs.map((departurelog )=>{
        if (arrivelog.passengerName === departurelog.passengerName && !userMem[arrivelog.passengerName]){
            let calTimeUsed = (parseInt(arrivelog.timestamp)*1000) - (parseInt(departurelog.timestamp)*1000)
            const targetPath = `${departurelog.airport}-${arrivelog.airport}`
            
            setFlightPath((prevState) => ({
              ...prevState,
              [targetPath]: prevState[targetPath]
                ? (calTimeUsed + prevState[targetPath])/2
                : calTimeUsed,
            }))

            onSetUser(prevState=>({
              ...prevState,
              [arrivelog.passengerName] : true
            }))
        }
      })
    })

  },[logs])

  useEffect(() => {
    const fetch = async () => {
      try{
        const response : logItems[] = await flightLogService.getLogs();
        setLogs(response);

      }catch {
        console.log("error")
      }
    }

    fetch()
  }, [])

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next Airline!</a>
        </h1>
        <p className={styles.description}>
          Get started by editing{" "}
          <code className={styles.code}>app/(home)/page.tsx</code>
        </p>

        <div className={styles.card} style={{ margin: 16, width: "100%" }}>
          <h2>Flight Logs here</h2>
          <LogCard data={logs} ></LogCard>
        </div>
        <div className="w-full flex bg-black">
          <button className="p-5 w-full"
          onClick={flightAvgHandle}>
            See logs Flight Avg time !
          </button>
        </div>
        <div className={styles.card} style={{ margin: 16, width: "100%" }}>
          <h2>Departure Logging</h2>
          <LogForm
            style={{ width: "100%" }}
            data={logs}
            type={"departure"}
            onSubmit={handleAddLog}
          ></LogForm>
        </div>

        <div className={styles.card} style={{ margin: 16, width: "100%" }}>
          <h2>Arrival Logging</h2>
          <LogForm
            style={{ width: "100%" }}
            data={logs}
            type={"arrival"}
            onSubmit={handleAddLog}
          ></LogForm>
        </div>

        {/* Render boarding pass here */}
        {/* {[].map((_, i) => ( */}
        {/*   <BoardingPassCard key={i} /> */}
        {/* ))} */}
      </main>
    </div>
  );
}

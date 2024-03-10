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
  
  const [flightPath, onSetFlightLogs] = useState<any>([
    
  ])
  
  const handleAddLog = (log : logItems)=>{
    const updatedLog : logItems[] = [...logs,log]
    setLogs(updatedLog); 
  }

  const flightAvgHandle = () => {
    // onPrepareLogs()
    //after knowing what flight was arrive mean it must already succeed
    
  }

  // prepare dat afor avg paths 
  useEffect(()=>{
    const arrivesLog = logs.filter((e)=>e.type === "arrival")
    // console.log(arrivesLog)

    logs.forEach(log => {
      // loop though log find case is log have valid on arrive log if yes creating find avg prepare now O(n*(n/2)) 
      // or u can change all current data structure to optimize later 
      arrivesLog.map(arrivelog =>{
        if (arrivelog.passengerName === log.passengerName && log.type === "departure"){
          // console.log("Have arrival log for", log.passengerName, "and type" , log.type)
          // creating path data 
          let calTimeUsed = (arrivelog.timestamp*1000) - (log.timestamp*1000)
          // Convert the time difference to a human-readable format
          const hours = Math.floor(calTimeUsed / (1000 * 60 * 60));
          const minutes = Math.floor((calTimeUsed % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((calTimeUsed % (1000 * 60)) / 1000);

          console.log(`${hours} hours, ${minutes} minutes, ${seconds} seconds`);
          onSetFlightLogs([
            ...flightPath,
            {
              path : `${log.airport}-${arrivelog.airport}`,
              // timeUsed :
            }
          ])
        }
      })
    });

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

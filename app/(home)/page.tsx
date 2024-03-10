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
  
  const [flightPath, setFlightPath] = useState<{ [key: string]: number[] }>({});
  const [userMem,onSetMem] = useState<{ [key: string]: boolean }>({})

  const handleAddLog = (log : logItems)=>{
    const updatedLog : logItems[] = [...logs,log]
    setLogs(updatedLog); 
  }

  const flightAvgHandle = () => {
    //after knowing what flight was arrive mean it must already succeed
    // console.log(flightPath)
    Object.entries(flightPath).forEach(([key, value]) => {
      console.log("Key:", key);
      console.log("Value:", value);
  
      // Iterate through the value array
      value.forEach((time) => {
        console.log("Time used:", time);
      });
    });
  }

  // prepare data for avg paths 
  useEffect(()=>{
    const arrivesLogs = logs.filter((e)=>e.type === "arrival")
    const departureLogs = logs.filter((e)=>e.type === "departure")
    
    arrivesLogs.map((arrivelog )=>{
      departureLogs.map((departurelog )=>{
        if (arrivelog.passengerName === departurelog.passengerName){
            let calTimeUsed = (parseInt(arrivelog.timestamp)*1000) - (parseInt(departurelog.timestamp)*1000)
            const targetPath = `${departurelog.airport}-${arrivelog.airport}`
            if (flightPath[`${targetPath}`] && !userMem[arrivelog.passengerName]){
              // path already valid 
              setFlightPath((prevState) => ({
                ...prevState,
                [targetPath]: [...prevState[targetPath], calTimeUsed],
              }))
            } else {
              // creating new path
              setFlightPath((prevState) => ({
                ...prevState,
                [targetPath]: [calTimeUsed]
              }))
              onSetMem((prevState)=>({
                ...prevState,
                [arrivelog.passengerName] : true
              }))

            }

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

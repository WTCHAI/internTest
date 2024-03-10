"use client";

import { useCallback, useState, useEffect } from "react";
import Image from "next/image";
import styles from "./Home.module.css";
import { FlightLogService } from "../(flightlog)/fightlog.service";
import LogCard from "../(flightlog)/LogCard";
import LogForm from "../(flightlog)/LogForm";
// import BoardingPassCard from "../(boardingpass)/BoardingPassCard";

const flightLogService = new FlightLogService();

export default function Home() {
  const [logs, setLogs] = useState([]);

  const handleAddLog = useCallback(
    (log) => {
      logs.push(log);
      setLogs(logs);
    },
    [logs]
  );

  useEffect(() => {
    const fetch = async () => {
      const data = await flightLogService.getLogs();
      setLogs(data);
    };

    fetch();
  }, []);

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
          <h2>Flight Logs</h2>
          <LogCard style={{ width: "100%" }} data={logs}></LogCard>
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

import { logItems } from "../interface/logItems";

export class FlightLogService {
  initialData : logItems[] = [
    {
      passengerName: "cherprang",
      airport: "bangkok",
      timestamp: 1630454400,
      type: "departure",
    },
    {
      passengerName: "sita",
      airport: "chiangmai",
      timestamp: 1630627200,
      type: "departure",
    },
    {
      passengerName: "cherprang",
      airport: "tokyo",
      timestamp: 1630454405,
      type: "arrival",
    },
  ];

  getLogs() : Promise<logItems[]>{
    return new Promise( (resolve) => {

      setTimeout( () => {
        resolve(this.initialData || []);
      }, 2000);

    });
  }
}

import { useState, useCallback } from "react";

import { logItems } from "../interface/logItems";


const emptyForm : logItems= {
  passengerName: "",
  airport: "",
  timestamp: "",
  type : ""
};

type Props = {
  style : any,
  data : logItems[],
  type : string ,
  onSubmit : (data : logItems)=>void
}


function LogForm({type ,onSubmit} : Props) {
  const [formData, setFormData] = useState<logItems>(emptyForm);

  const handleSubmit = useCallback(() => {
    onSubmit({ ...formData, type });
    setFormData(emptyForm);
  }, [formData, type, onSubmit]);

  return (
    <div style={{ display: "flex", columnGap: 8 }}>

      <div
        style={{ flex: 1, display: "flex", flexDirection: "column", rowGap: 4 }}
      >
        <label htmlFor="pname" style={{ fontWeight: "bold" }}>
          Passenger Name:
        </label>
        <input
          type="text"
          id="pname"
          name="pname"
          placeholder="eg. Somechai"
          value={formData.passengerName}
          onChange={(e)=>{
            setFormData({
              ...formData,
              passengerName : e.target.value
            })
          }}
        />
      </div>

      <div
        style={{ flex: 1, display: "flex", flexDirection: "column", rowGap: 4 }}
      >
        <label htmlFor="airport" style={{ fontWeight: "bold" }}>
          Airport:
        </label>
        <input
          type="text"
          id="airport"
          name="airport"
          placeholder="eg. suvarnabhumi "
          value={formData.airport}
          onChange={(e)=>{
            setFormData({
              ...formData,
              airport : e.target.value
            })
          }}/>
      </div>

      <div
        style={{ flex: 1, display: "flex", flexDirection: "column", rowGap: 4 }}
      >
        <label htmlFor="timestamp" style={{ fontWeight: "bold" }}>
          Timestamp:
        </label>
        <input
          type="text"
          id="timestamp"
          name="timestamp"
          value={formData.timestamp}
          onChange={(e)=>{
            setFormData({
              ...formData,
              timestamp : e.target.value
            })
          }} />
      </div>

      <div style={{ flex: 1, display: "flex", alignItems: "flex-end" ,width : "100%"}}>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default LogForm;

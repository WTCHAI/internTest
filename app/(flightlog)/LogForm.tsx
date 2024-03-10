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
    if (formData.airport != "" && formData.passengerName != "" && formData.timestamp != ""){
      onSubmit({ ...formData, type });
      setFormData(emptyForm);      
    }
  }, [formData, type, onSubmit]);

  const isFormValid = formData.airport && formData.passengerName && parseInt(formData.timestamp);


  return (
    <div className="flex flex-col h-full gap-y-[1vh]">

      <div
        style={{ flex: 1, display: "flex", flexDirection: "column", rowGap: 4 }}
      >
        <label htmlFor="pname" className="text-lg font-medium text-gray-600">
          Passenger Name :
        </label>
        <input
          type="text"
          id="pname"
          name="pname"
          placeholder="eg. Somechai"
          className="py-[1vh] px-[2vw] rounded-xl shadow-sm"
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
        <label htmlFor="airport" className="text-lg font-medium text-gray-600">
          Airport :
        </label>
        <input
          type="text"
          id="airport"
          name="airport"
          placeholder="eg. suvarnabhumi "
          className="py-[1vh] px-[2vw] rounded-xl shadow-sm"

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
        <label htmlFor="timestamp" className="text-lg font-medium text-gray-600">
          Timestamp :
        </label>
        <input
          type="text"
          id="timestamp"
          name="timestamp"
          value={formData.timestamp}
          className="py-[1vh] px-[2vw] rounded-xl shadow-sm"
          onChange={(e)=>{
            setFormData({
              ...formData,
              timestamp : e.target.value
            })
          }} />
      </div>

      <div className="flex justify-center items-center mt-[1vh]">
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-gray-200 font-medium py-[0.5vh] px-[1vw] rounded-lg hover:opacity-95 shadow-md disabled:cursor-not-allowed"
          disabled={!isFormValid}
        >Submit</button>
      </div>
    </div>
  );
}

export default LogForm;

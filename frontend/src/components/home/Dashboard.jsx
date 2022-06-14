import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function Dashboard() {
  const history = useHistory();

  const [openTab, setOpenTab] = useState(1);
  const user = JSON.parse(localStorage.getItem("userInfo"));

  return (
    <div className="mx-auto flex flex-wrap flex-col w-[80%] h-full items-center justify-start  content-start">
      <div class="btn-group grid grid-cols-2">
        <button
          className={`btn btn-outline ${openTab === 1 ? "btn-active" : ""}`}
          onClick={(e) => {
            setOpenTab(1);
          }}
        >
          Eggs Count
        </button>
        <button
          onClick={(e) => {
            setOpenTab(2);
          }}
          className={`btn btn-outline ${openTab === 2 ? "btn-active" : ""}`}
        >
          Prices
        </button>
      </div>
      {/*Egg count component  */}
      <div className={openTab === 1 ? "block" : "hidden"}>Eggs Count</div>

      {/*price component  */}
      <div className={openTab === 2 ? "block" : "hidden"}>Prices</div>
    </div>
  );
}

export default Dashboard;

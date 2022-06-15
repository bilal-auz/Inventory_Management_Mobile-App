import React, { useEffect, useState } from "react";
import axios from "axios";

function EggPrices({ change, setChange }) {
  const [price_w1, setPriceW1] = useState(0);
  const [price_w2, setPriceW2] = useState(0);
  const [price_w3, setPriceW3] = useState(0);

  const user = JSON.parse(localStorage.getItem("userInfo"));

  const getPrices = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/price/getPrices", config);
      setPriceW1(data.price_w1);
      setPriceW2(data.price_w2);
      setPriceW3(data.price_w3);
    } catch (error) {}
  };

  const handleReloadPrices = () => {
    setChange(!change);
  };

  useEffect(() => {
    getPrices();
  }, [change]);

  return (
    <div className="bg-darkgreen rounded-box col-span-3 row-span-3 mx-2 grid flex-shrink-0 place-items-center items-center gap-4 p-4 py-8 shadow-xl xl:mx-0 xl:w-full svelte-1n6ue57 overflow-hidden relative">
      <div className="absolute top-2 right-2">
        <button className="btn btn-square btn-sm" onClick={handleReloadPrices}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </button>
      </div>
      <div>
        <p className="text-[1.3rem] text-[color:white]">Prices</p>
        {/* <p className="text-[1.5rem] text-[color:white] font-bold">{"date"}</p> */}
      </div>
      <div class="stats shadow w-[100%] overflow-hidden">
        <div class="stat">
          <div class="stat-value text-[2rem]">{price_w1}</div>
        </div>

        <div class="stat items-center p-1">
          <div class="stat-value text-[1.2rem] font-medium">1500g-1550g</div>
        </div>
      </div>
      <div class="stats shadow w-[100%] overflow-hidden">
        <div class="stat">
          <div class="stat-value text-[2rem]">{price_w2}</div>
        </div>

        <div class="stat items-center p-1">
          <div class="stat-value text-[1.2rem]  font-medium">1760g-1870g</div>
        </div>
      </div>
      <div class="stats shadow w-[100%] overflow-hidden">
        <div class="stat">
          <div class="stat-value text-[2rem]">{price_w3}</div>
        </div>

        <div class="stat items-center p-1">
          <div class="stat-value text-[1.2rem]  font-medium">1890g-2000g</div>
        </div>
      </div>
    </div>
  );
}

export default EggPrices;

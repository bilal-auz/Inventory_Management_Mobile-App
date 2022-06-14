import React, { useEffect, useState } from "react";
import axios from "axios";

function EggPrices({ user, change }) {
  const [price_w1, setPriceW1] = useState(0);
  const [price_w2, setPriceW2] = useState(0);
  const [price_w3, setPriceW3] = useState(0);

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
  useEffect(() => {
    getPrices();
  }, [change]);
  return (
    <div className="bg-darkgreen rounded-box col-span-3 row-span-3 mx-2 grid flex-shrink-0 place-items-center items-center gap-4 p-4 py-8 shadow-xl xl:mx-0 xl:w-full svelte-1n6ue57 overflow-hidden">
      <div>
        <p className="text-[1.3rem] text-[color:white]">Prices</p>
        {/* <p className="text-[1.5rem] text-[color:white] font-bold">{"date"}</p> */}
      </div>
      <div class="stats shadow w-[100%] overflow-hidden">
        <div class="stat">
          <div class="stat-value text-[2rem]">{price_w1}</div>
        </div>

        <div class="stat items-center p-1">
          <div class="stat-value text-[1.2rem] font-medium">1500-1800g</div>
        </div>
      </div>
      <div class="stats shadow w-[100%] overflow-hidden">
        <div class="stat">
          <div class="stat-value text-[2rem]">{price_w2}</div>
        </div>

        <div class="stat items-center p-1">
          <div class="stat-value text-[1.2rem]  font-medium">1800-1900g</div>
        </div>
      </div>
      <div class="stats shadow w-[100%] overflow-hidden">
        <div class="stat">
          <div class="stat-value text-[2rem]">{price_w3}</div>
        </div>

        <div class="stat items-center p-1">
          <div class="stat-value text-[1.2rem]  font-medium">1900-2000g</div>
        </div>
      </div>
    </div>
  );
}

export default EggPrices;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import AddEggForm from "./../EggFuncions/AddEggForm";

function EggCount({ change, setChange }) {
  const history = useHistory();
  const [egg_w1, setEggW1] = useState(0);
  const [egg_w2, setEggW2] = useState(0);
  const [egg_w3, setEggW3] = useState(0);
  const [egg_total, setEggTotal] = useState(0);
  const [date, setDate] = useState(0);
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("userInfo"));

  const getData = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/egg/getEggs", config);

      setEggW1(data.total_eggs_w1.toLocaleString("en"));
      setEggW2(data.total_eggs_w2.toLocaleString("en"));
      setEggW3(data.total_eggs_w3.toLocaleString("en"));
      setEggTotal(data.total.toLocaleString("en"));
      //EDIT: get date from backend
      const month = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const dateString = `${new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })} ${new Date().toLocaleTimeString("en", {
        hour: "2-digit",
        minute: "2-digit",
      })}`;

      setDate(dateString);
      setLoading(true);
    } catch (error) {
      history.push("/");
    }
  };

  const verifyToken = async (token) => {
    try {
      const config = {
        headers: { "Content-type": "application/json" },
      };

      const { data } = await axios.post(
        "/api/user/verifyToken",
        { token },
        config
      );

      if (!data) {
      } else {
        setLoading(true);
      }
    } catch (error) {
      console.log(error.message);
      history.push("/");
    }
  };

  const handleReload = async () => {
    setChange(!change);
  };

  useEffect(() => {
    setLoading(false);
    // verifyToken(user.token);
    getData();
  }, [change]);

  return (
    <React.Fragment>
      {loading && (
        <div>
          <div className="bg-darkgreen rounded-box col-span-3 row-span-3 mx-2 grid flex-shrink-0 place-items-center items-center gap-4 p-4 py-8 shadow-xl xl:mx-0 xl:w-full svelte-1n6ue57 overflow-hidden relative">
            <div className="absolute top-2 right-2">
              <button className="btn btn-square btn-sm" onClick={handleReload}>
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
              <p className="text-[1.3rem] text-[color:white]">
                Eggs Count till Date:
              </p>
              <p className="text-[1.5rem] text-[color:white] font-bold">
                {date}
              </p>
            </div>
            <div class="stats shadow w-[100%] overflow-hidden">
              <div class="stat px-0">
                <div class="stat-value text-[2rem]">{egg_w1}</div>
              </div>

              <div class="stat items-center p-1">
                <div class="stat-value text-[1.2rem] font-medium">
                  1500g-1550g
                </div>
              </div>
            </div>
            <div class="stats shadow w-[100%] overflow-hidden">
              <div class="stat px-0">
                <div class="stat-value text-[2rem]">{egg_w2}</div>
              </div>

              <div class="stat items-center p-1">
                <div class="stat-value text-[1.2rem]  font-medium">
                  1760g-1870g
                </div>
              </div>
            </div>
            <div class="stats shadow w-[100%] overflow-hidden">
              <div class="stat px-0">
                <div class="stat-value text-[2rem]">{egg_w3}</div>
              </div>

              <div class="stat items-center p-1 justify-end">
                <div class="stat-value text-[1.2rem]  font-medium">
                  1890g-2000g
                </div>
              </div>
            </div>
            <div class="stats shadow w-[100%] overflow-hidden">
              <div class="stat px-0">
                <div class="stat-value text-[2.3rem]">{egg_total}</div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <label for="my-modal-3" class="btn modal-button bg-darkgreen">
              Add yours
              <svg
                width="24"
                height="24"
                stroke-width="1.5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 22C16.4183 22 20 18.4183 20 14C20 9.58172 16.4183 2 12 2C7.58172 2 4 9.58172 4 14C4 18.4183 7.58172 22 12 22Z"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </label>
            <input type="checkbox" id="my-modal-3" class="modal-toggle" />
            <div class="modal sm:modal-middle absolute">
              <AddEggForm user={user} change={change} setChange={setChange} />
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default EggCount;

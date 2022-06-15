import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import EggCount from "./../pages/EggCount";
import EggPrices from "./../pages/EggPrices";
import AddEggForm from "./../EggFuncions/AddEggForm";
import axios from "axios";

function Dashboard() {
  const history = useHistory();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );
  const [openTab, setOpenTab] = useState(1);
  const [change, setChange] = useState(false);

  const [loading, setLoading] = useState(false);

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
      console.log(data);

      if (!data) {
        history.push("/");
      } else {
        setLoading(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (!user) return history.push("/");

    verifyToken(user.token);
  }, []);

  const logoutHandler = () => {
    localStorage.clear();
    history.push("/");
  };

  return (
    <React.Fragment>
      {loading && (
        <div>
          <div className="relative">
            <div className="mx-auto flex flex-wrap flex-col w-[90%] h-full items-center justify-start md-5 content-center">
              <div class="btn-group grid grid-cols-2 mb-5">
                <button
                  className={`btn btn-outline ${
                    openTab === 1 ? "btn-active" : ""
                  }`}
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
                  className={`btn btn-outline ${
                    openTab === 2 ? "btn-active" : ""
                  }`}
                >
                  Prices
                </button>
              </div>
              {/*Egg count component  */}
              <div className={openTab === 1 ? "block w-[100%]" : "hidden"}>
                <EggCount user={user} change={change} setChange={setChange} />
              </div>
              {/*price component  */}
              <div className={openTab === 2 ? "block w-[100%]" : "hidden"}>
                <EggPrices user={user} change={change} />
              </div>
            </div>
          </div>
          <div className="absolute bottom-[-21px] right-5">
            <button class="btn btn-circle btn-md" onClick={logoutHandler}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 20 23"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default Dashboard;

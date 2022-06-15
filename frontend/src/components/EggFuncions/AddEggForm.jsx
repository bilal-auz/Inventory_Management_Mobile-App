import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

function AddEggForm({ change, setChange }) {
  const history = useHistory();
  const [eggs_w1_input, setW1Input] = useState("");
  const [eggs_w2_input, setW2Input] = useState("");
  const [eggs_w3_input, setW3Input] = useState("");

  const [selectedFarm, setSelectedFarm] = useState("");

  const user = JSON.parse(localStorage.getItem("userInfo"));

  const addEggsHandler = async () => {
    if (!selectedFarm || !eggs_w1_input || !eggs_w2_input || !eggs_w3_input)
      return toast.warning("Fill all fields");

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const body = {
        farmId: selectedFarm,
        eggs_w1: eggs_w1_input,
        eggs_w2: eggs_w2_input,
        eggs_w3: eggs_w3_input,
      };

      const { data } = await axios.post("/api/egg/addEggs", body, config);

      setChange(!change);
    } catch (error) {
      history.push("/");
    }
  };

  const cancelHandler = async () => {
    setW1Input("");
    setW2Input("");
    setW3Input("");
    setSelectedFarm("");
  };

  const handleChangeFarm = (e) => {
    console.log(e.target.value);
    setSelectedFarm(e.target.value);
  };

  return (
    <div class="modal-box">
      <div className="flex flex-col gap-2 w-[96%]">
        <select
          class="select select-bordered justify-center"
          onChange={handleChangeFarm}
          value={selectedFarm}
        >
          <option key={5555} value={""} disabled>
            Select the farm
          </option>
          {user.farms.map((farm, index) => (
            // <option>{farm.farmName}</option>
            <option key={farm._id} value={farm._id}>
              {"Farm " + (index + 1)}
            </option>
          ))}
        </select>
        <div class="form-control">
          <label class="input-group input-group-md justify-center">
            <input
              disabled={!selectedFarm}
              type="text"
              placeholder="Type here"
              class="input input-bordered input-md focus:outline-none"
              value={eggs_w1_input}
              onChange={(e) => {
                setW1Input(e.target.value);
              }}
            />
            <span className="px-[0.5rem]">1500g-1550g</span>
          </label>
        </div>
        <div class="form-control">
          <label class="input-group input-group-md justify-center">
            <input
              disabled={!selectedFarm}
              type="text"
              placeholder="Type here"
              class="input input-bordered input-md focus:outline-none"
              value={eggs_w2_input}
              onChange={(e) => {
                setW2Input(e.target.value);
              }}
            />
            <span className="px-[0.5rem]">1760g-1870g</span>
          </label>
        </div>
        <div class="form-control">
          <label class="input-group input-group-md justify-center">
            <input
              disabled={!selectedFarm}
              type="text"
              placeholder="Type here"
              class="input input-bordered input-md focus:outline-none"
              value={eggs_w3_input}
              onChange={(e) => {
                setW3Input(e.target.value);
              }}
            />
            <span className="px-[0.5rem]">1890g-2000g</span>
          </label>
        </div>
      </div>
      <div class="modal-action justify-center">
        <button
          for="my-modal-3"
          className={`btn ${!selectedFarm && "btn-disabled"}`}
          onClick={addEggsHandler}
        >
          Add
        </button>
        <label for="my-modal-3" class="btn" onClick={cancelHandler}>
          cancel
        </label>
      </div>
    </div>
  );
}

export default AddEggForm;

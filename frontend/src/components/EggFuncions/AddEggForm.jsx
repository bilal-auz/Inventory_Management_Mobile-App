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

      var index = user.farms.findIndex((farm) => farm._id == data._id);

      user.farms[index] = data;

      localStorage.setItem("userInfo", JSON.stringify(user));

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

  const handleInput = (e) => {
    const res = e.target.value.replace(/\D/g, "");
    setW1Input(eggs_w1_input + res);
    // const regexNumbers = "[0-9]";
    // const keyCharCode = e.which;

    // console.log(keyCharCode);
    // if (keyCharCode >= 48 && keyCharCode <= 57)
    //   setW1Input(eggs_w1_input + e.key);

    // const input = parseInt(e.target.value);

    // if (Number.isInteger(input)) setW1Input(input);
    // setW1Input(e.target.value.match(regexNumbers).input);
    // console.log(e.which);
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
            Sélectionnez la ferme
          </option>
          {user.farms.map((farm, index) => (
            // <option>{farm.farmName}</option>
            <option key={farm._id} value={farm._id} disabled={farm.submitted}>
              {"Farm " + (index + 1)} {farm.submitted && "(Déjà ajouté)"}
            </option>
          ))}
        </select>
        <div class="form-control">
          <label class="input-group input-group-md justify-center">
            <input
              disabled={!selectedFarm}
              type="text"
              placeholder="Tapez ici"
              class="input input-bordered input-md focus:outline-none"
              value={eggs_w1_input}
              onChange={(e) => {
                setW1Input(e.target.value.replace(/\D/g, ""));
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
              placeholder="Tapez ici"
              class="input input-bordered input-md focus:outline-none"
              value={eggs_w2_input}
              onChange={(e) => {
                setW2Input(e.target.value.replace(/\D/g, ""));
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
              placeholder="Tapez ici"
              class="input input-bordered input-md focus:outline-none"
              value={eggs_w3_input}
              onChange={(e) => {
                setW3Input(e.target.value.replace(/\D/g, ""));
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
          Ajoutez
        </button>
        <label for="my-modal-3" class="btn" onClick={cancelHandler}>
          Annuler
        </label>
      </div>
    </div>
  );
}

export default AddEggForm;

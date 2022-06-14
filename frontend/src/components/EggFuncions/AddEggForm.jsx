import axios from "axios";
import React, { useState } from "react";

function AddEggForm({ user, change, setChange }) {
  const [eggs_w1_input, setW1Input] = useState(user.eggs_w1);
  const [eggs_w2_input, setW2Input] = useState(user.eggs_w2);
  const [eggs_w3_input, setW3Input] = useState(user.eggs_w3);

  const addEggsHandler = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const body = {
        eggs_w1: eggs_w1_input,
        eggs_w2: eggs_w2_input,
        eggs_w3: eggs_w3_input,
      };
      const { data } = await axios.post("/api/egg/addEggs", body, config);
      console.log(data);
      setChange(!change);
    } catch (error) {}
  };

  return (
    <div class="modal-box">
      <div className="flex flex-col gap-2 ">
        <div class="form-control">
          <label class="input-group input-group-md">
            <input
              type="text"
              placeholder="Type here"
              class="input input-bordered input-md focus:outline-none"
              value={eggs_w1_input}
              onChange={(e) => {
                setW1Input(e.target.value);
              }}
            />
            <span>1500-1800g</span>
          </label>
        </div>
        <div class="form-control">
          <label class="input-group input-group-md">
            <input
              type="text"
              placeholder="Type here"
              class="input input-bordered input-md focus:outline-none"
              value={eggs_w2_input}
              onChange={(e) => {
                setW2Input(e.target.value);
              }}
            />
            <span>1800-1950g</span>
          </label>
        </div>
        <div class="form-control">
          <label class="input-group input-group-md">
            <input
              type="text"
              placeholder="Type here"
              class="input input-bordered input-md focus:outline-none"
              value={eggs_w3_input}
              onChange={(e) => {
                setW3Input(e.target.value);
              }}
            />
            <span>1950-2050g</span>
          </label>
        </div>
      </div>
      <div class="modal-action justify-center">
        <label for="my-modal-3" class="btn" onClick={addEggsHandler}>
          Add
        </label>
        <label for="my-modal-3" class="btn">
          cancel
        </label>
      </div>
    </div>
  );
}

export default AddEggForm;

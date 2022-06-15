import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

function Login() {
  const history = useHistory();

  const [show, setShow] = useState(false);

  // Temp
  const [userId, setUserId] = useState("52169400225");
  const [password, setPassword] = useState("Taoufiq123");
  const [loading, setLoading] = useState(false);

  const loginHandler = async () => {
    setLoading(true);

    if (!userId || !password) {
      toast.warning("Fill all fields");
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: { "Content-type": "application/json" },
      };

      const res = await axios.post(
        "/api/user/login",
        { userId, password },
        config
      );

      localStorage.setItem("userInfo", JSON.stringify(res.data));

      setLoading(false);

      history.push("/dashboard");
      return;
    } catch (error) {
      toast.warning(error.message);
      setLoading(false);
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
      if (data) history.push("/dashboard");
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) verifyToken(user.token);
  }, []);

  return (
    <main className="mx-auto flex w-[80%] h-[100%] items-center justify-center bg-blue-900 text-white ">
      <section className="flex w-[30rem] flex-col items-center space-y-10">
        <div className="text-center text-4xl font-medium">Log In</div>

        <div className="w-[80%] transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
          <input
            type="text"
            placeholder="ID"
            className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>

        <div className="w-[80%] transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
          <input
            type={show ? "text" : "password"}
            placeholder="Password"
            className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
            <label className="swap">
              <input type="checkbox" />
              <div className="swap-on" onClick={(e) => setShow(true)}>
                Hide
              </div>
              <div className="swap-off" onClick={(e) => setShow(false)}>
                Show
              </div>
            </label>
          </div>
        </div>

        <button
          onClick={loginHandler}
          className={`btn transform rounded-sm bg-indigo-600 py-2 font-bold duration-300 hover:bg-indigo-400 w-[50%]
            ${loading ? "loading" : ""}`}
        >
          {loading ? "" : "LOG IN"}
        </button>
      </section>
    </main>
  );
}

export default Login;

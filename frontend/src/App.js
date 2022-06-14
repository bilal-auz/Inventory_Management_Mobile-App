import { Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Auth/Login";
import Dashboard from "./components/home/Dashboard";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App ">
      <Route path="/" exact component={Login} />
      <Route path="/dashboard" exact component={Dashboard} />
      <ToastContainer
        position="bottom-center"
        autoClose={1300}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />
    </div>
  );
}

export default App;

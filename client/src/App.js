import "./assets/sass/main.scss";
import React from "react";

import Main from "./Main";
import Navbar from "./components/Navbar";
import Cookies from "universal-cookie";
import Login from "./pages/Login";
import { BrowserRouter } from "react-router-dom";

function App() {
  const cookies = new Cookies();

  let user = cookies.get("user");

  if (user == undefined) {
    return <Login />;
  } else {
    return (
      <BrowserRouter>
        <div className="page">
          <Navbar />
          <Main />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

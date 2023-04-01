import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import { NavBar } from "./components/NavBar";
import { AllNewsList} from "./http/newsAPI";
import { useNavigate } from "react-router-dom";



function App() {
  const navigate = useNavigate()

  function handClick1(){
    navigate("/new")
  }
  
  return (
      <div className="App">
      <NavBar />
      <AllNewsList/>
      
      
    </div>
  );
}

export default App;
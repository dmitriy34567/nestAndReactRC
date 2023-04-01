import "../App.css";
import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import { NavBar } from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import { OneAuthSortApi } from "../http/authorsAPI";


export const AuthorsPage = (props) => {
    const { id } = props;
    const navigate = useNavigate();
  
    function handClick() {
      navigate("/");
    }
  
    return (
      <>
        <NavBar />
        <OneAuthSortApi/>
        
      </>
    );
  };
  
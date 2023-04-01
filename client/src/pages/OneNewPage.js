import "../App.css";
import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import { NavBar } from "../components/NavBar";
import {  OneNewApi} from "../http/newsAPI";
import { useNavigate } from "react-router-dom";

export const OneNewPage = (props) => {
  const { id } = props;
  const navigate = useNavigate();

  function handClick() {
    navigate("/");
  }

  return (
    <>
      <NavBar />
      <OneNewApi id={id} />,
      {console.log(id)}
    </>
  );
};


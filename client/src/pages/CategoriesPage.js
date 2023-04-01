import "../App.css";
import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import { NavBar } from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import { CategoriesApiPage } from "../http/categoriesAPI";
import SubscriptionForm from "../components/subscForm";

export const CategoriesPage = (props) => {
    const { id } = props;
    const navigate = useNavigate();
  
    function handClick() {
      navigate("/");
    }
  
    return (
      <>
        <NavBar />
        <CategoriesApiPage id={id} />
        <SubscriptionForm/>
      </>
    );
  };
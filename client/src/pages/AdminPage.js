import "../App.css";
import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import { NavBar } from "../components/NavBar";
import { FeedbackList } from "../components/FeedbackListForAdmin";
import { NewCategoryForm,NewPostForm } from "../components/FormsForAdminPage";


export const AdminPage = () => {
  

    return (
      <>
        <NavBar />
        <FeedbackList />
        <NewPostForm/>
        <NewCategoryForm/>
      </>
    );
  };
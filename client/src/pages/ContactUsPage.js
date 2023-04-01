import "../App.css";
import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import { NavBar } from "../components/NavBar";
import ContactForm from "../components/FeedBackForm"


export const ContactUsPage = () => {
    const handleSendMail = () => {
      console.log('hi')
      //Mail.send("cowosak617@youke1.com", "privet!") 
    };
  
    return (
      <>
        <NavBar />
        <ContactForm/>
        
        
      </>
    );
  };
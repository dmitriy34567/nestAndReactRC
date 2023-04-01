import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';


function ValueOfComments(param) {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/comments/${param}`)
      .then(response => {
        setFeedbacks(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const feedbackCount = feedbacks.length;

  return (
    feedbackCount
  );
}

export const CommentsListForNewss = () => {
    const { id } = useParams();
    const idAsInt = parseInt(id, 10);
  
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const navigate = useNavigate();

    const valueOfoneNews = ValueOfComments(id)
  
    useEffect(() => {
      fetch(`http://localhost:5000/api/comments/${idAsInt}`)
        .then((res) => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setItems(result);
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        );
    }, []);
  
  
    if (error) {
      return <p>Error {error.message}</p>;
    } else if (!isLoaded) {
      return <p>Loading...</p>;
    } else {
      const itemsList = items.map((item) => (
        <p key={item.id}>
          <p style={{textAlign: 'left', marginLeft: '100px'}}><strong >Автор:{item.authorname}</strong></p>
          <p style={{textAlign: 'left', marginLeft: '100px'}}>Комментарий:{item.text} </p>
   </p>
      ));
  
      return (
        <>
            <p style={{textAlign: 'left', marginTop: '100px'}}><strong>Коментарии:</strong> </p>
          <div >{itemsList}</div>
        </>
      );
    }
  };
  
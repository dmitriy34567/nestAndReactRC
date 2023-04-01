import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";


export const FeedbackList = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/feedbacks')
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
          const categories = [...new Set(result.map((item) => item.category))];
          setCategories(categories);
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
    return (
      <><p>Список сообщений из формы обратной связи:</p>
        {items.map((item) => (
          <p key={item.nid}>
            <p style={{ textAlign: 'left', marginLeft: '100px' }}>
              <strong>{item.nid}</strong>
            </p>
            <p style={{ textAlign: 'left', marginLeft: '100px' }}>
              <strong>name: {item.name}</strong>
            </p>
            <p style={{ textAlign: 'left', marginLeft: '100px' }}>
              email: {item.email}
            </p>
            <p style={{ textAlign: 'left', marginLeft: '100px' }}>
              messsage: {item.text}
            </p>
          </p>
        ))}
      </>
    );
  }
};




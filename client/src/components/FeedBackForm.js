import React, { useState, useEffect } from 'react';
import axios from 'axios';


function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/feedbacks')
      .then(response => {
        setFeedbacks(response.data);
      })
      .catch(error => {
        console.log("мы не узнали количество наявных фидбеков" + error);
      });
  }, []);

  const valueOfFeedbacks = feedbacks.length;

  return (
    valueOfFeedbacks
  );
}



function ContactForm() {
  const [nid, setNid] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const feedbackCount = FeedbackList()

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const data = {
      nid: feedbackCount+1,
      name: name,
      email: email,
      text: message,
    };

    fetch("http://localhost:5000/api/feedbacks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          setIsSubmitting(false);
          setSubmitSuccess(true);
          setNid("");
          setName("");
          setEmail("");
          setMessage("");
        } else {
          throw new Error("Network response was not ok.");
        }
      })
      .catch((error) => {
        setIsSubmitting(false);
        setSubmitError(error.message);
      });
  };

  return (
    
    <div id="contactform">
      <p><h1>Свяжитесь с нами</h1></p>
      {submitSuccess && <p>Спасибо за ваше сообщение!</p>}
      {!submitSuccess && (
        <form onSubmit={handleSubmit}>
          <label>
            Имя:
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>
          <label>
            Сообщение:
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              required
            />
          </label>
          <button type="submit" disabled={isSubmitting}>
            Отправить
          </button>
          {submitError && (
            <p>Произошла ошибка при отправке сообщения.</p>
          )}
          <style>
            {`
              form, h1 {
                display: flex;
                flex-direction: column;
                align-items: center;

              }
              
              label {
                display: flex;
                flex-direction: column;
                margin-bottom: 1rem;
              }
              
              input, textarea {
                margin-top: 0.5rem;
              }
              #contactform  {
                margin-top:50px;
                margin-bottom: 100px;
              }
            `}
          </style>
        </form>
      )}
    </div>
  );
}

export default ContactForm;
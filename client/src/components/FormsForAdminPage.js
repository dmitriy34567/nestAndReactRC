//тут будут две формы для панели админа Создание новости и Создание категории
import React, { useState, useEffect } from 'react';
import axios from 'axios';


//заменить фидбеки на новости для красоты и понятности. сейчас работает
function NewsList() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/news')
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



export function NewPostForm() {
  const [nid, setNid] = useState("");
  const [categoryja, setCategori] = useState("");
  const [authornews, setAuthornews] = useState("");
  const [tittle, setTittlee] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const newsListVal = NewsList()

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const data = {
        nid: newsListVal + 1,
        categoryja: categoryja,
        authornews: authornews,
        tittle: tittle,
        description: description
    };

    fetch("http://localhost:5000/api/news", {
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
          setCategori("");
          setAuthornews("");
          setTittlee("");
          setDescription("");
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
      <p><h1>Создать новую новость</h1></p>
      {submitSuccess && <p>Спасибо за ваше сообщение!</p>}
      {!submitSuccess && (
        <form onSubmit={handleSubmit}>
          <label>
            номер категории:
            <input
              type="text"
              value={categoryja}
              onChange={(event) => setCategori(event.target.value)}
              required
            />
          </label>
          <label>
            номер автора новости:
            <input
              type="text"
              value={authornews}
              onChange={(event) => setAuthornews(event.target.value)}
              required
            />
          </label>
          <label>
            заголовок:
            <input
              type="text"
              value={tittle}
              onChange={(event) => setTittlee(event.target.value)}
              required
            />
          </label>
          <label>
            описание новости:
            <input
              type="text"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
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




export function NewCategoryForm() {
  const [nid, setNid] = useState("");
    const [name, setName] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState(null);
  
    const handleSubmit = (event) => {
      event.preventDefault();
      setIsSubmitting(true);
  
      const data = {
        nid:nid,
        name: name
      };
  
      fetch("http://localhost:5000/api/categories", {
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
        <p><h1>Создать новую категорию </h1></p>
        {submitSuccess && <p>Спасибо за ваше сообщение!</p>}
        {!submitSuccess && (
          <form onSubmit={handleSubmit}>
            <label>
              id, нужно посчитать сколько их уже есть:
              <input
                type="text"
                value={nid}
                onChange={(event) => setNid(event.target.value)}
                required
              />
            </label>
            <label>
              Имя категории:
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
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
  

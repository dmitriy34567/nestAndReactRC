import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import { Component } from "react";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Accordion from 'react-bootstrap/Accordion';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { NavBar } from "../components/NavBar";
import styles from './News.module.css';






export const fetchItems = (id, setIsLoaded, setItems, setError) => {
  fetch(`http://localhost:5000/api/news/authors/${id}`)
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
};

export const AuthorList = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]); // добавляем локальный стейт для хранения списка категорий
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/authors")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
          setCategories(result); // сохраняем список категорий в локальном стейте
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  const handClick2 = (id) => {
    navigate("/authors/" + id);
  };

  const handleButtonClick = () => {
    fetch("https://run.mocky.io/v3/f872e7e7-8399-4369-a555-ec4f7f3d1bdd")
      .then((res) => res.json())
      .then(
        (result) => {
          setCategories(result); // обновляем локальный стейт с новым списком категорий
        },
        (error) => {
          setError(error);
        }
      );
  };

  if (error) {
    return <p>Error {error.message}</p>;
  } else if (!isLoaded) {
    return <p>Loading...</p>;
  } else {
    return (
      <div>
        <DropdownButton as={ButtonGroup} title="Авторы" id="bg-vertical-dropdown-1" classname="mt-3">
          {
            categories.map((author) => <Dropdown.Item onClick={() => handClick2(author.nid)} key={author.name}>{author.name} </Dropdown.Item>)
          }
        </DropdownButton>
      </div>
    );
  }
};
export const OneAuthSortApi = () => {
  const { id } = useParams();
  const idAsInt = parseInt(id, 10);

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchItems(idAsInt, setIsLoaded, setItems, setError);
  }, [idAsInt]);

  const handleButtonClick = () => {
    fetchItems(idAsInt, setIsLoaded, setItems, setError);
  };

  if (error) {
    return <p>Error {error.message}</p>;
  } else if (!isLoaded) {
    return <p>Loading...</p>;
  } else {
    const itemsList = items.map((item) => (
      <p key={item.id}>
        <strong>{item.tittle}</strong>
        <p>{item.description} </p>
      </p>
    ));

    return (
      <>
        <div>{itemsList}</div>
      </>
    );
  }
};
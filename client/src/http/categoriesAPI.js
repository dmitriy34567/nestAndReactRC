import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from './News.module.css';



export const fetchItems = (id, setIsLoaded, setItems, setError) => {
  fetch(`http://localhost:5000/api/news/categories/${id}`)
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

export const CategoriesList = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]); // добавляем локальный стейт для хранения списка категорий
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/categories")
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
    navigate("/categories/" + id);
  };

  if (error) {
    return <p>Error {error.message}</p>;
  } else if (!isLoaded) {
    return <p>Loading...</p>;
  } else {
    return (
      <div>
        <DropdownButton as={ButtonGroup} title="Категории" id="bg-vertical-dropdown-1" classname="mt-3" >
          {
            categories.map((category) => <Dropdown.Item onClick={() => handClick2(category.nid)} key={category.name}>{category.name} </Dropdown.Item>)
          }
        </DropdownButton>
      </div>
    );
  }
};

export const CategoriesApiPage = () => {
  const { id } = useParams();
  const idAsInt = parseInt(id, 10);

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetchItems(idAsInt, setIsLoaded, setItems, setError);
  }, [idAsInt]);

  const handleButtonClick = () => {
    fetchItems(idAsInt, setIsLoaded, setItems, setError);
  };
  
  const PAGE_SIZE = 2;
  const totalPages = Math.ceil(items.length / PAGE_SIZE);
  const startIdx = (currentPage - 1) * PAGE_SIZE;
  const endIdx = startIdx + PAGE_SIZE;
  const displayedItems = Array.isArray(items) ? items.slice(startIdx, endIdx) : [];

  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
  };

  if (error) {
    return <p>Error {error.message}</p>;
  } else if (!isLoaded) {
    return <p>Loading...</p>;
  } else {
    return (
      <>
        {displayedItems.map((item) => (
          <p key={item.nid}>
            <strong>{item.tittle}</strong>
            <p>{item.description} </p>
          </p>
        ))}
        <div className="pagination" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop:"50px" }}>
          {currentPage > 1 && (
            <button onClick={() => handlePageChange(currentPage - 1)}>
              Previous
            </button>
          )}
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={currentPage === i + 1 ? "active" : ""}
            >
              {i + 1}
            </button>
          ))}
          {currentPage < totalPages && (
            <button onClick={() => handlePageChange(currentPage + 1)}>
              Next
            </button>
          )}
        </div>
      </>
    );
  }
};









//тот же категори лист но для страницы фильтров 
export const CategoriesListForFiltrs = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]); // добавляем локальный стейт для хранения списка категорий
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://run.mocky.io/v3/f872e7e7-8399-4369-a555-ec4f7f3d1bdd")
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
        <DropdownButton as={ButtonGroup} title="еще раз категории такое тз)" id="bg-vertical-dropdown-1" classname="mt-3">
          {
            categories.map((category) => <Dropdown.Item  key={category.name}>{category.name} </Dropdown.Item>)
          }
        </DropdownButton>
      </div>
    );
  }
};



/*Шаблон простого запроса с фетчем без кеширования и без выноса фетча в отделную

export const CategoriesList = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]); // добавляем локальный стейт для хранения списка категорий
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://run.mocky.io/v3/f872e7e7-8399-4369-a555-ec4f7f3d1bdd")
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
    navigate("/categories/" + id);
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
        <DropdownButton as={ButtonGroup} title="Категории" id="bg-vertical-dropdown-1" classname="mt-3" >
          {
            categories.map((category) => <Dropdown.Item onClick={() => handClick2(category.id)} key={category.name}>{category.name} </Dropdown.Item>)
          }
        </DropdownButton>
      </div>
    );
  }
};


*/
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
import ShowMore from "../components/PagBar"
import { useParams } from "react-router-dom";
import styles from './News.module.css';
import CommentForm from "../components/CommentsForm";
import { CommentsListForNewss } from "../components/CommentsListForNew";
import { useMemo } from 'react';


const PAGE_SIZE = 4; // number of news items per page
const CACHE_LIFESPAN = 5 * 60 * 1000; // 5 minutes in milliseconds

export const AllNewsList = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState([]); // Define and initialize the items state variable
  const navigate = useNavigate();

  useMemo(() => {
    const cachedItems = JSON.parse(localStorage.getItem("newsItems")) || {};
    const timestamp = cachedItems.timestamp || 0;
    const now = Date.now();
    if (now - timestamp < CACHE_LIFESPAN) {
      setItems(cachedItems.items || []); // Use setItems to update the items state variable
      setIsLoaded(true);
    } else {
      fetch("http://localhost:5000/api/news")
        .then((res) => res.json())
        .then(
          (result) => {
            localStorage.setItem(
              "newsItems",
              JSON.stringify({ timestamp: Date.now(), items: result })
            );
            setItems(result); // Use setItems to update the items state variable
            setIsLoaded(true);
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        );
    }
  }, []);

  const handClick2 = (nid) => {
    navigate("/new/" + nid);
  };

  const totalPages = Math.ceil(items.length / PAGE_SIZE);
  const startIdx = (currentPage - 1) * PAGE_SIZE;
  const endIdx = startIdx + PAGE_SIZE;
  const displayedItems = items.slice(startIdx, endIdx);
  console.log(items)
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
        <Accordion>
          {displayedItems.map((item) => (
            <Accordion.Item key={item.nid} eventKey={item.nid}>
              <Accordion.Header>{item.tittle}</Accordion.Header>
              <Accordion.Body>
                {item.description}{" "}
                <Button onClick={() => handClick2(item.nid)} variant="primary">
                  Читать больше
                </Button>{" "}
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
        <div className="pagination">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={currentPage === i + 1 ? "active" : ""}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </>
    );
  }
};




//One News api

export const OneNewApi = () => {
  const { id } = useParams();
  const idAsInt = parseInt(id, 10);
  console.log(`http://localhost:5000/api/news/${idAsInt}`);

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/api/news/${idAsInt}`)
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
      <p key={item.nid}>
        <strong>{item.tittle}</strong>
        <p>{item.description} </p>
 </p>
    ));

    return (
      <>
        <div>{itemsList}</div>
        <CommentsListForNewss />
        <CommentForm />
        
      </>
    );
  }
};




//NewsListAPI(used for navbar)
export class NewsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
    };
  }
  componentDidMount() {
    //fetch("http://localhost:5000/api/news")
    fetch("http://localhost:5000/api/news")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
          });
        }
      ); 
  }

  render() { 
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <p>Error {error.message}</p>;
    } else if (!isLoaded) {
      return <p>Loading...</p>;
    } else { 
      
      return(
        
        console.log(items),
      <DropdownButton as={ButtonGroup} title="News" id="bg-vertical-dropdown-1">
        {
          items.map((item) => <Dropdown.Item key={item.tittle}>{item.tittle}</Dropdown.Item>)
        }
      </DropdownButton>
      
      )
    }
  }
}


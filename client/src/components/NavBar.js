import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthorList } from "../http/authorsAPI";
import { CategoriesList } from "../http/categoriesAPI";


//NavBar
export const NavBar = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">News Portal</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/cont">Contact Us</Nav.Link>
          
        </Nav>
        <CategoriesList/>
        <AuthorList />
      </Container>
    </Navbar>
  );
};
 //<Nav.Link href="/filtr">Filtr Page</Nav.Link>
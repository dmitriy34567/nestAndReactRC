import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import {OneNewPage  } from "./pages/OneNewPage"
import {CategoriesPage} from "./pages/CategoriesPage"
import {AuthorsPage} from "./pages/AuthorsPage"
import {ContactUsPage} from "./pages/ContactUsPage"
import {AdminPage} from "./pages/AdminPage"





const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  }, 
  {
    path: "/new/:id",
    element: <OneNewPage />
  },
  {
    path: "/categories/:id",
    element: <CategoriesPage />
  },
  {
    path: "/authors/:id",
    element: <AuthorsPage />
  },
  {
    path: "/cont",
    element: <ContactUsPage />
  },
  {
    path: "/admin",
    element: <AdminPage />
  }
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} />);






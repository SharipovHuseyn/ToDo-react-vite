import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router";
import Complected from "./Complected.jsx"
import './index.css';
import App from './App.jsx';

const root = createRoot(document.getElementById('root')); // Определяем root

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <StrictMode>
        <App />
      </StrictMode>
    ),
  },
  {
    path: "/complected",
    element: (
      <StrictMode>
        <Complected/>
      </StrictMode>
    )
  }
]);

root.render(
  <RouterProvider router={router} />
);
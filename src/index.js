import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './user/pages/Home';
import Profile from './user/pages/Profile';
import UsersList from './user/pages/UsersList';
import Help from './user/pages/Help';

var router = createBrowserRouter([
  {
    path:"/",
    element:<App />,
    children:[
      {
        path:"/",
        element:<Home />
      },
      {
        path:"/Profile",
        element:<Profile />
      },
      {
        path:"/users/:role",
        element:<UsersList />
      },
      {
        path:""
      },
      {
        path:"/Help",
        element:<Help />
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}>
    <App />
    </RouterProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import './index.css';
import AuthComponent from './components/AuthComponent/AuthComponent';
import App from './App';

const router = createBrowserRouter([
    {
        path: "/",
        element: <AuthComponent/>,
    },
    {
        path: "/lists",
        element: <App />
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);


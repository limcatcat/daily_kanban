import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// import ReactDOM from "react-dom/client";
import App from "./components/App";

const rootElement = document.getElementById("app");

const root = createRoot(rootElement);
root.render(
    <StrictMode>
        <App />
    </StrictMode>
);
    
console.log("React app is starting!");
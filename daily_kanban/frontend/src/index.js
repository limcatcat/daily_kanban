import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// import ReactDOM from "react-dom/client";
import App from "./components/App";
import { AuthProvider } from './context/AuthContext';

const rootElement = document.getElementById("app");

const root = createRoot(rootElement);
root.render(
    <StrictMode>
        <AuthProvider>
            <App />
        </AuthProvider>
    </StrictMode>
);
    
console.log("React app is starting!");
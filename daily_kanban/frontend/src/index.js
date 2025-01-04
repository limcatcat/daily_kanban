import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// import ReactDOM from "react-dom/client";
import App from "./components/App";
import { AuthProvider } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';

const rootElement = document.getElementById("app");

const root = createRoot(rootElement);
root.render(
    <StrictMode>
        <AuthProvider>
            <TaskProvider>
                <App />
            </TaskProvider>
        </AuthProvider>
    </StrictMode>
);
    
console.log("React app is starting!");
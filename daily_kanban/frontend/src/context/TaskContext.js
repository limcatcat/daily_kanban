import React, { createContext, useState, useContext, useEffect } from "react";

const TaskContext = createContext();


// replace it with Django API endpoints later
const testTasks = [
    { id: 1, description: "Quokka Princess", status: "Today" },
    { id: 2, description: "Quokka Baby Pug", status: "In Progress" },
    { id: 3, description: "Quokka Angel", status: "Done" },
    { id: 4, description: "Quokka Bawinuguri", status: "Today" },
    { id: 5, description: "Quokka Backlog 1", status: "Backlog" },
    { id: 6, description: "Quokka Backlog 2", status: "Backlog" },
];

export function TaskProvider({ children }) {
    const [tasks, setTasks] = useState(testTasks);
    const [activeId, setActiveId] = useState(null)

    // put Django API endpoints here later

    return (
        <TaskContext.Provider value={{ tasks, setTasks, activeId, setActiveId }}>
            {children}
        </TaskContext.Provider>
    );

}


export function useTaskContext() {
    return useContext(TaskContext);
}
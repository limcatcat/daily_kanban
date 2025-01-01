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
    const [tasks, setTasks] = useState([]);
    const [activeId, setActiveId] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

    // put Django API endpoints here later (added below)
    const fetchTasks = async (date) => {

        const csrftoken = document.querySelector('[name=csrf-token]').content;
        const formattedDate = date.toLocaleDateString('en-CA');

        try {
            const response = await fetch(`/tasks?date=${formattedDate}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'X-CSRFToken': csrftoken,
                },
            });
            if (!response.ok) throw new Error('Failed to fetch tasks');
            const data = await response.json();
            setTasks(data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };


    const handleMonthChange = (selectedDate) => {
        setSelectedMonth(selectedDate.getMonth());
    }

    useEffect(() => {
        fetchTasks(selectedDate);
        handleMonthChange(selectedDate);
        
    }, [selectedDate]);


    return (
        <TaskContext.Provider value={{ tasks, setTasks, activeId, setActiveId, selectedDate, setSelectedDate, selectedMonth }}>
            {children}
        </TaskContext.Provider>
    );

}


export function useTaskContext() {
    return useContext(TaskContext);
}
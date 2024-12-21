import React, { useState } from 'react';
import Cal from './Calendar';
import Calendar from 'react-calendar';
import KanbanBoard from './KanbanBoard';
import WeekView from './WeekView';
import KanbanColumn from './KanbanColumn';
import { TaskProvider } from "../context/TaskContext.js"

function App() {

    const [selectedDate, setSelectedDate] = useState(new Date());

    const [showBacklog, setShowBacklog] = useState(false);

    return(
        <TaskProvider>

            <div className='main-container'>
                <div className='calendar'>
                    {showBacklog ? (
                        <>
                            <KanbanColumn 
                                className='column'
                                title='Backlog'
                                status='Backlog'
                                />
                            <a href="" className='show-calendar'
                            onClick={(e) => {
                                e.preventDefault();
                                setShowBacklog(false);
                            }}>
                            show Calendar</a>
                        </>

                    ):(
                        <>
                            {/* <h1>Calendar</h1> */}
                            
                            <Calendar onChange={setSelectedDate}/>
                            <a href="" className='show-backlog'
                            onClick={(e) => {
                                e.preventDefault();
                                setShowBacklog(true);
                            }}
                            >
                            show Backlog</a>
                        </>
                    )}
        
                        </div>
                        
                        <div className='main-content'>
                            <div className='week'>
                                <WeekView selectedDate={selectedDate} />
                            </div>
                
                    <KanbanBoard />
                
                </div>
            </div>

        </TaskProvider>
    );
    
}

export default App;
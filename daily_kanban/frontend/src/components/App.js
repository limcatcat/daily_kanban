import React, { useState } from 'react';
import Cal from './Calendar';
import Calendar from 'react-calendar';
import KanbanBoard from './KanbanBoard';
import WeekView from './WeekView';
import KanbanColumn from './KanbanColumn';
import { TaskProvider } from "../context/TaskContext.js"


function App() {

    const [selectedDate, setSelectedDate] = useState(new Date());
    // const [showBacklog, setShowBacklog] = useState(true);

    return(
        <TaskProvider>

            <div className='main-container'>
                <div className='week'>
                    <WeekView selectedDate={selectedDate} />
                </div>
                        
                <div className='main-content'>
              
                    <KanbanBoard setSelectedDate={setSelectedDate} />
                
                </div>
            </div>

        </TaskProvider>
    );
    
}

export default App;

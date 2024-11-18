import React from 'react';
import Cal from './Calendar';
import Calendar from 'react-calendar';
import KanbanBoard from './KanbanBoard';

function App() {
    
    return(
        <div className='main-container'>
            <div className='calendar'>
                {/* <h1>Calendar</h1> */}
                <Calendar />

            </div>

            <div className='main-content'>
                <div className='week'>
                    <h3>Week</h3>
                </div>

                <KanbanBoard />
            
            </div>
        </div>
    )
    
}

export default App;
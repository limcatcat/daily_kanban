import React from 'react';
import Cal from './Calendar';
import Calendar from 'react-calendar';

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

                <div className='kanban'>
                    <div className='column'>
                        <h3>Today</h3>
                    </div>

                    <div className='column'>
                        <h3>In Progress</h3>
                    </div>

                    <div className='column'>
                        <h3>Done</h3>
                    </div>
                </div>
            </div>
        </div>
    )
    
}

export default App;
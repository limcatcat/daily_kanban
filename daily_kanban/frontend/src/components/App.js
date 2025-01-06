import React, { useContext, useState } from 'react';
import KanbanBoard from './KanbanBoard';
import WeekView from './WeekView';
import { AuthContext } from '../context/AuthContext.js';
import Navbar from './Navbar.js';
import LoginPage from './LoginPage.js';
import Stats from './Stats.js';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';


function App() {

    const {isAuthenticated} = useContext(AuthContext);
    // const [selectedDate, setSelectedDate] = useState(new Date());
    // const [showBacklog, setShowBacklog] = useState(true);

    return(

        <Router>
            <Navbar />
            <div className='main-container'>
               <Routes>
                    {!isAuthenticated ? (
                        <Route path='*' element={<LoginPage />} />
                    ) : (
                        <>

                            <Route path='*' element={
                                <>
                                    <div className='week'>
                                        <WeekView />
                                    </div>
                                            
                                    <div className='main-content'>
                                        <KanbanBoard />
                                    </div>
                                </>    
                            } />

                            <Route path='/stats' element={<Stats />} />
                            <Route path='*' element={<Navigate to='*' />} />

                        </>

                    )}
                </Routes>
            </div>
        </Router>

    );
    
}

export default App;

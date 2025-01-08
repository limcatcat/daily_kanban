import React, { useContext, useState } from 'react';
import KanbanBoard from './KanbanBoard';
import WeekView from './WeekView';
import { AuthContext } from '../context/AuthContext.js';
import Navbar from './Navbar.js';
import LoginPage from './LoginPage.js';
import Stats from './Stats.js';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RegisterPage from './RegisterPage.js';


function App() {

    const {token, setToken, isAuthenticated, setIsAuthenticated} = useContext(AuthContext);
    // const [selectedDate, setSelectedDate] = useState(new Date());
    // const [showBacklog, setShowBacklog] = useState(true);

    // useEffect(() => {
    //     localStorage.removeItem('token');
    //     setToken(null);
    //     setIsAuthenticated(false);
    //     console.log('User is logged out automatically on app start.');
    // }, []);

    return(

        <Router>
            <Navbar />
            <div className='main-container'>
               <Routes>
                    <Route path='/register' element={<RegisterPage />} />
                    {/* this Route should be outside isAuthenticated check block */}
                    
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

import React, { useContext, useState } from 'react';
import KanbanBoard from './KanbanBoard';
import WeekView from './WeekView';
import { AuthContext } from '../context/AuthContext.js';
import Navbar from './Navbar.js';
import LoginPage from './LoginPage.js';
import Stats from './Stats.js';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RegisterPage from './RegisterPage.js';
import CongratsModal from './CongratsModal.js';


function App() {

    const {token, setToken, isAuthenticated, setIsAuthenticated} = useContext(AuthContext);
    const [completedTasksCount, setCompletedTasksCount] = useState(0);
    const [showModal, setShowModal] = useState(false);
    // const [selectedDate, setSelectedDate] = useState(new Date());
    // const [showBacklog, setShowBacklog] = useState(true);

    // useEffect(() => {
    //     localStorage.removeItem('token');
    //     setToken(null);
    //     setIsAuthenticated(false);
    //     console.log('User is logged out automatically on app start.');
    // }, []);

    const handleTaskCompletion = (count) => {
        setCompletedTasksCount(count);
        if (count % 10 === 0) {
            setShowModal(true);
            console.log(`completed_tasks_count:${count}`);
            
        }
    };


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
                                        <KanbanBoard onTaskComplete={handleTaskCompletion} />
                                        {showModal && <CongratsModal show={showModal} count={completedTasksCount} onHide={() => setShowModal(false)} />}
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

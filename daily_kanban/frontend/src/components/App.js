import React, { useContext, useState } from 'react';
import Cal from './Calendar';
import Calendar from 'react-calendar';
import KanbanBoard from './KanbanBoard';
import WeekView from './WeekView';
import KanbanColumn from './KanbanColumn';
import { TaskProvider } from '../context/TaskContext.js';
import { AuthProvider, AuthContext } from '../context/AuthContext.js';
import LoginPage from './LoginPage.js';


function App() {

    const {isAuthenticated, logout} = useContext(AuthContext);

    const [selectedDate, setSelectedDate] = useState(new Date());
    // const [showBacklog, setShowBacklog] = useState(true);

    return(
        <AuthProvider>
            <TaskProvider>

                <div className='main-container'>
                    {isAuthenticated ? (
                        // User authenticated
                        <>
                            <div className='week'>
                                <WeekView />
                            </div>
                                    
                            <div className='main-content'>
                        
                                <KanbanBoard />
                            
                            </div>
                        </>
                    ) : (
                        // User not authenticated
                        <LoginPage />
                    )}
                </div>

            </TaskProvider>
        </AuthProvider>
    );
    
}

export default App;

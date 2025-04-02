import React, { useState, useEffect } from 'react';
// import { useContext, useTaskContext } from '../context/TaskContext';
// import Task from './Task';
// import '../../static/css/task.css';
// import '../../static/css/index.css';
import StatsBox from './StatsBox';
import StatsWeeklyContainer from './StatsWeeklyContainer';
import '../../static/css/stats.css';


const Stats = () => {

    // const {tasks} = useTaskContext();

    const [stats, setStats] = useState({
        total_completed: 0,
        most_productive_day_this_week: { date: '-', day: '-', count: 0},
        most_productive_day_overall: { weekday: '-', count: 0},
        average_completed_tasks_per_day: 0,
        completed_percentage: 0
    });

    const [weeklyCompleted, setWeeklyCompleted] = useState({
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
        sunday: []
    });

    // const completedTasks = tasks.filter(task => task.status === '3');

    const fetchStatistics = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('/stats/api/task-stats/', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(`Error thrown while fetching stats: ${response.status}`)
            }

            const data = await response.json();
            setStats(data);
            console.log(data);
        } catch (error) {
            console.error('Error fetching statistics:', error);
        }
    };

    
    const fetchWeeklyCompleted = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('/stats/api/weekly-completed/', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(`Error thrown while fetching weekly completed tasks: ${response.status}`)
            }

            const data = await response.json();
            setWeeklyCompleted(data);
            console.log(data);            
        } catch (error) {
            console.error('Error fetching weekly completed tasks:', error);
        }
    };


    useEffect(() => {
        fetchStatistics();
        fetchWeeklyCompleted();
    }, []);


    return (
        <>
            <div className='grid-container'>

                <StatsBox
                    title='Total Completed Tasks'
                    value={stats.total_completed}
                    description={`You've completed ${stats.completed_percentage}% of today's tasks!`}
                    icon="✅"
                />

                <StatsBox
                    title="Average Tasks Per Day"
                    value={stats.average_completed_tasks_per_day.toFixed(2)}
                    icon="📈"
                />

                <StatsBox 
                    title="Most Productive Day This Week"
                    value={stats.most_productive_day_this_week.day || 'No data'}
                    description={`Completed ${stats.most_productive_day_this_week.count} tasks`}
                    icon="📅"
                />

                <StatsBox
                    title="Most Productive Day (Overall)"
                    value={stats.most_productive_day_overall.weekday || 'No data'}
                    description={`Average of ${stats.most_productive_day_overall.count} tasks`}
                    icon="🥇"
                />


            </div>

            <div className='weekly-completed-container'>
                <StatsWeeklyContainer weeklyCompleted={weeklyCompleted}/>
            </div>
        
        </>


    );

}

export default Stats;
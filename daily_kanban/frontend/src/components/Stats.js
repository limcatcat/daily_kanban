import React, { useState, useEffect } from 'react';

const Stats = () => {

    const [stats, setStats] = useState({
        total_completed: 0,
        most_productive_day_this_week: { date: '-', count: 0},
        most_productive_day_overall: { day: '-', average: 0},
        average_completed_tasks_per_day: 0,
        unfinished_percentage: 0,
        completed_percentage: 0
    });

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


    useEffect(() => {
        fetchStatistics();
    }, []);


    return (
        <div>
            <h1>Task Statistics</h1>
            <ul>
                <li><strong>Total Completed Tasks:</strong> {stats.total_completed}</li>
                {/* <li>
                    <strong>Most Productive Day This Week:</strong> 
                    {stats.most_productive_day_this_week} with {stats.most_productive_day_this_week.count} completed tasks
                </li>
                <li>
                    <strong>Most Productive Day of the Week (All Time):</strong> 
                    {stats.most_productive_day_overall.day} with an average of {stats.most_productive_day_overall.average} tasks
                </li>
                <li><strong>Average Completed Tasks Per Day:</strong> {stats.average_completed_tasks_per_day}</li>
                <li><strong>Unfinished to Completed Tasks Ratio:</strong> {stats.completed_percentage}</li> */}
            </ul>
        </div>
    )

}

export default Stats;
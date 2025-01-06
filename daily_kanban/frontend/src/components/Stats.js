import React, { useState, useEffect } from 'react';

const Stats = () => {

    const [stats, setStats] = useState({
        total_completed: 0,
        most_productive_day_this_week: { date: '-', day: '-', count: 0},
        most_productive_day_overall: { weekday: '-', count: 0},
        average_completed_tasks_per_day: 0,
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


    const resultParser = (most_productive_day_this_week) => {

        if (most_productive_day_this_week.count === 0) {
            return 'No tasks have been completed this week yet.\nGo ahead and make today the most productive day this week!'
        } else {
            if (most_productive_day_this_week.count === 1) {
                return `${most_productive_day_this_week.day} (${most_productive_day_this_week.date}), completing ${most_productive_day_this_week.count} task`
            } else {
                return `${most_productive_day_this_week.day} (${most_productive_day_this_week.date}), completing ${most_productive_day_this_week.count} tasks`
            }
        }
    };


    return (
        <div>
            <h1>Task Statistics</h1>
            <ul>
                <li><strong>So far, you've completed </strong>{stats.total_completed} tasks, and that's {stats.completed_percentage}% of your tasks. Well done! 👏🏻</li>
                <li>
                    <strong>This week, you're most productive on </strong> 
                    {resultParser(stats.most_productive_day_this_week)}
                </li>
                <li>
                    <strong>In general, you're most productive on </strong> 
                    {stats.most_productive_day_overall.weekday}s, completing an average of {stats.most_productive_day_overall.count} tasks
                </li>
                <li><strong>Each day, you finished on average</strong> {stats.average_completed_tasks_per_day} tasks</li>
            </ul>
        </div>
    )

}

export default Stats;
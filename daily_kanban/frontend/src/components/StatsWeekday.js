import React from 'react';

const StatsWeekday = ({weekday, completedTasks}) => {

    return (

        <div>
            <h3 className='stats-weekday'>{weekday}</h3>
            {completedTasks.length === 0 ? (
                <p>no tasks</p>
            ) : (
                completedTasks.map((task, index) => (
                    <p key={index}>{task}</p>
                ))
            )}
        </div>

    )

}

export default StatsWeekday;     
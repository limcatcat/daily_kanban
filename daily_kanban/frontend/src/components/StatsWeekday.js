import React from 'react';

const StatsWeekday = ({weekday, completedTasks}) => {

    return (

        <div className='stats-weekday'>
            <h4 className='completed-weekday'>{weekday}</h4>
            {completedTasks.length === 0 ? (
                <p style={{color: 'D3D3D3'}}>-</p>
            ) : (
                completedTasks.map((task, index) => (
                    <p key={index}>{task}</p>
                ))
            )}
        </div>

    )

}

export default StatsWeekday;     
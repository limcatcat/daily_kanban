import React from 'react';
import Task from './Task';


function KanbanColumn({title, tasks}) {

    return (
        <div className='column'>
            <h3>{title}</h3>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        <Task description={task.description} status={task.status} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default KanbanColumn;
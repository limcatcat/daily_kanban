import React from 'react';
import '../../static/css/task.css'

function Task({description}) {
    return (
        <div className='task'>
            <p>{description}</p>
        </div>
    );
}

export default Task;
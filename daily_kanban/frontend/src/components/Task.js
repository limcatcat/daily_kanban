import React from 'react';
import '../../static/css/task.css'

function Task(props) {

    let taskStatus = '';
    
    if (props.status == 'Backlog')
        taskStatus = 'backlog'
    else if (props.status == 'Today')
        taskStatus = 'today'
    else if (props.status == 'In Progress')
        taskStatus = 'in-progress'
    else if (props.status == 'Done')
        taskStatus = 'done'


    return (
        <div className={`task ${taskStatus}`}>
            <p>{props.description}</p>
        </div>
    );
}

export default Task;
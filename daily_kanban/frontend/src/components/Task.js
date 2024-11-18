import React from 'react';
import '../../static/css/task.css'

function Task({description}) {
    return <div class='task'>{description}</div>;
}

export default Task;
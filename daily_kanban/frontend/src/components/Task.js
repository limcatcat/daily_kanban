import React from 'react';
import '../../static/css/task.css'
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';


function Task({id, description, status, handleDragStart}) {

    const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id});

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    let taskStatus = '';
    
    if (status == 'Backlog')
        taskStatus = 'backlog'
    else if (status == 'Today')
        taskStatus = 'today'
    else if (status == 'In Progress')
        taskStatus = 'in-progress'
    else if (status == 'Done')
        taskStatus = 'done'
    
    return (
        <>
            <div className={`task ${taskStatus}`} style={style} ref={setNodeRef} {...attributes} {...listeners} onDragStart={e => handleDragStart(e, {id, description, status})}>
                {description}
            </div>
        </>
    );
}

export default Task;
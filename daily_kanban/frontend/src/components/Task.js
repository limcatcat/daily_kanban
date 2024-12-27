import React from 'react';
import '../../static/css/task.css'
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';


function Task({id, description, status, handleDragStart, isDragging}) {

    const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id});

    // const isDragging = id === activeId;

    const style = {
        transition: transition || 'transform 200ms ease',
        transform: CSS.Transform.toString(transform),
    };

    let taskStatus = '';
    
    if (status == '0')
        taskStatus = 'backlog'
    else if (status == '1')
        taskStatus = 'today'
    else if (status == '2')
        taskStatus = 'in-progress'
    else if (status == '3')
        taskStatus = 'done'
    
    return (
        <>
            <div className={`task ${taskStatus} ${isDragging ? 'dragging' : ''}`} style={style} ref={setNodeRef} {...attributes} {...listeners} onDragStart={e => handleDragStart(e, {id, description, status})}>
                {description}
            </div>
        </>
    );
}

export default Task;
import React, { useState } from 'react';
import Task from './Task';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';


function KanbanColumn({title, tasks, status}) {

    const tasksByStatus = tasks.filter(task => task.status === status);

    const {setNodeRef, isOver} = useDroppable({id:status});

    return (
        <div ref={setNodeRef} className={`column ${isOver ? 'highlight' : ''}`}>
            <SortableContext items={tasksByStatus.map(task => task.id)} strategy={verticalListSortingStrategy}>
            <h3>{title}</h3>
           
                {tasksByStatus.map(task => (
                    <Task id={task.id} key={task.id} description={task.description} status={task.status}/>
                ))}             
            </SortableContext>
        </div>
    );
}

export default KanbanColumn;
import React, { useState } from 'react';
import Task from './Task';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';


function KanbanColumn({title, tasks, status, setTasks}) {

    const tasksByStatus = tasks.filter(task => task.status === status);

    return (
        <div className='column'>
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
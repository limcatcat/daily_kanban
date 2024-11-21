import React, { useState } from 'react';
import Task from './Task';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';


function KanbanColumn({title, tasks, status, activeId}) {

    const tasksByStatus = tasks.filter(task => task.status === status);

    const {setNodeRef} = useDroppable({id:status});

    // console.log(`activeID: ${activeId}`);
    

    return (
        <div ref={setNodeRef} className='column'>
            <SortableContext items={tasksByStatus.map(task => task.id)} strategy={verticalListSortingStrategy}>
            <h3>{title}</h3>
           
                {tasksByStatus.map(task => {
                    const isDragging = task.id === activeId;

                    return (
                        <Task className={`task ${status} ${isDragging ? 'dragging' : ''}`} id={task.id} key={task.id} description={task.description} status={task.status} isDragging={isDragging} />
                    );
            })}             
            </SortableContext>
        </div>
    );
}

export default KanbanColumn;
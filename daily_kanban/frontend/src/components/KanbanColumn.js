import React, { useState } from 'react';
import Task from './Task';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import { useTaskContext } from '../context/TaskContext';


function KanbanColumn({title, status, activeId}) {

    const { tasks } = useTaskContext();

    const tasksByStatus = tasks.filter(task => task.status === status);

    const {setNodeRef, isOver} = useDroppable({id:status});

    const columnStyle = {
        backgroundColor: isOver ? '#efdff0' : undefined,
        transition: 'background-color 0.3s ease',
    };

    // console.log(`activeID: ${activeId}`);
    

    return (
        <div 
            ref={setNodeRef} className='column'
            style={columnStyle}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'aliceblue')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = isOver ? '#efdff0' : 'white')}
            >
            <SortableContext items={tasksByStatus.map(task => task.id)} strategy={verticalListSortingStrategy}>
                <h3>{title}</h3>

                    {tasksByStatus.map(task => {
                        const isDragging = task.id === activeId;
                        
                        return (
                            <Task className={`task ${status} ${isDragging ? 'dragging' : ''}`} id={task.id} key={task.id} description={task.description} status={task.status} isDragging={isDragging}
                            />
                        );
                    })}             
            </SortableContext>
        </div>
    );
}

export default KanbanColumn;
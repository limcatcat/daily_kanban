import React from 'react';
import Task from './Task';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';


function KanbanColumn({title, tasks}) {

    return (
        <div className='column'>
            <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
            <h3>{title}</h3>
           

                    {tasks.map(task => (
                        <Task id={task.id} key={task.id} description={task.description} status={task.status} />
                    ))}
                
            </SortableContext>
        </div>
    );
}

export default KanbanColumn;
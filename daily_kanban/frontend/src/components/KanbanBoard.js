import React from 'react';
import KanbanColumn from './KanbanColumn';


const tasks = [
    {
        id: 1,
        description: "Quokka Princess",
        status: "Today"
    },
    {
        id: 2,
        description: "Quokka Baby Pug",
        status: "In Progress"
    },
    {
        id: 3,
        description: "Quokka Angel",
        status: "Done"
    },
    {
        id: 4,
        description: "Quokka Bawinuguri",
        status: "Today"
    }

]


function KanbanBoard() {

    const tasksByStatus = {
        today: tasks.filter(task => task.status == 'Today'),
        in_progress: tasks.filter(task => task.status == 'In Progress'),
        done: tasks.filter(task => task.status == 'Done')
    };

    return (
        <div className='kanban'>
            <KanbanColumn className='column' title='Today' tasks={tasksByStatus.today} />
            <KanbanColumn className='column' title='In Progress' tasks={tasksByStatus.in_progress} />
            <KanbanColumn className='column' title='Done' tasks={tasksByStatus.done} />
        </div>
    );
}

export default KanbanBoard;
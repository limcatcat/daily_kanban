import React from 'react';
import KanbanColumn from './KanbanColumn';
import { closestCorners, DndContext, KeyboardSensor, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { useState } from 'react';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';


const testTasks = [
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

    const [tasks, setTasks] = useState(testTasks);

    const tasksByStatus = {
        today: tasks.filter(task => task.status == 'Today'),
        in_progress: tasks.filter(task => task.status == 'In Progress'),
        done: tasks.filter(task => task.status == 'Done')
    };

    const getTaskPos = id => tasks.findIndex(task => task.id === id)

    const handleDragEnd = event => {
        const {active, over} = event

        if(active.id === over.id) return;

        setTasks(tasks => {
            const originalPos = getTaskPos(active.id)
            const newPos = getTaskPos(over.id)

            return arrayMove(tasks, originalPos, newPos)
        });
    };

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor, {coordinateGetter: sortableKeyboardCoordinates})
    );

    return (
        <div className='kanban'>
            <DndContext sensors={sensors} onDragEnd={handleDragEnd}>

                <KanbanColumn className='column' title='Today' tasks={tasksByStatus.today} />
                <KanbanColumn className='column' title='In Progress' tasks={tasksByStatus.in_progress} />
                <KanbanColumn className='column' title='Done' tasks={tasksByStatus.done} />

            </DndContext>
        </div>
    );
}

export default KanbanBoard;
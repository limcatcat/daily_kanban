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

    // const tasksByStatus = {
    //     today: tasks.filter(task => task.status == 'Today'),
    //     in_progress: tasks.filter(task => task.status == 'In Progress'),
    //     done: tasks.filter(task => task.status == 'Done')
    // };

    const handleDragEnd = e => {
        const {active, over} = e;

        if(!over || active.id === over.id) return;

        setTasks(prevTasks => {

            const activeTaskIndex = prevTasks.findIndex(task => task.id === active.id);
            const overTaskIndex = prevTasks.findIndex(task => task.id === over.id);

            if (activeTaskIndex === -1 || overTaskIndex === -1) return prevTasks;

            const activeTask = prevTasks[activeTaskIndex];
            const overTask = prevTasks[overTaskIndex];

            if (activeTask.status === overTask.status) {

                const filteredTasks = prevTasks.filter(task => task.status === activeTask.status);
                const activeReIndex =filteredTasks.findIndex(task => task.id === active.id);
                const overReIndex = filteredTasks.findIndex(task => task.id === over.id);

                const reorderedTasks = arrayMove(
                    filteredTasks, activeReIndex, overReIndex
                );

                return [
                    ...prevTasks.filter(task => task.status !== activeTask.status),
                    ...reorderedTasks
                ];
            }

            return prevTasks.map(task => task.id === active.id ? {...task, status: overTask.status} : task);

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

                <KanbanColumn className='column' title='Today' status='Today' tasks={tasks} setTasks={setTasks} />
                <KanbanColumn className='column' title='In Progress' status='In Progress' tasks={tasks} setTasks={setTasks} />
                <KanbanColumn className='column' title='Done' status='Done' tasks={tasks} setTasks={setTasks} />

            </DndContext>
        </div>
    );
}

export default KanbanBoard;
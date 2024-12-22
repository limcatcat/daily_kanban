import React from 'react';
import KanbanColumn from './KanbanColumn';
import { DndContext, DragOverlay, KeyboardSensor, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { useState } from 'react';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import Task from './Task';
import { useTaskContext } from '../context/TaskContext';
import Cal from './Calendar';
import Calendar from 'react-calendar';


// const testTasks = [
//     {
//         id: 1,
//         description: "Quokka Princess",
//         status: "Today"
//     },
//     {
//         id: 2,
//         description: "Quokka Baby Pug",
//         status: "In Progress"
//     },
//     {
//         id: 3,
//         description: "Quokka Angel",
//         status: "Done"
//     },
//     {
//         id: 4,
//         description: "Quokka Bawinuguri",
//         status: "Today"
//     },
//     {
//         id: 5,
//         description: "Quokka Backlog 1",
//         status: "Backlog"
//     },
//     {
//         id: 6,
//         description: "Quokka Backlog 2",
//         status: "Backlog"
//     },

// ]


function KanbanBoard() {

    // const [tasks, setTasks] = useState(testTasks);
    const { tasks, setTasks } = useTaskContext();
    const [activeId, setActiveId] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showBacklog, setShowBacklog] = useState(true);

    // const tasksByStatus = {
    //     today: tasks.filter(task => task.status == 'Today'),
    //     in_progress: tasks.filter(task => task.status == 'In Progress'),
    //     done: tasks.filter(task => task.status == 'Done')
    // };

    const handleDragStart = e => {
        setActiveId(e.active.id);
        // console.log(`Dragging started with activeId: ${e.active.id}`);     
    }

    const handleDragEnd = e => {
        const {active, over} = e;
        // console.log(`Dragging ended with activeId: ${active.id}`);
        

        
        if(!over || active.id === over.id) {
            setActiveId(null);
            return;
        }

        setTasks(prevTasks => {

            const activeTaskIndex = prevTasks.findIndex(task => task.id === active.id);
            const activeTask = prevTasks[activeTaskIndex];
            
            // const overTaskIndex = prevTasks.findIndex(task => task.id === over.id);
            // const overTask = prevTasks[overTaskIndex];

            // if (activeTaskIndex === -1 || overTaskIndex === -1) return prevTasks;

            if (!activeTask) return prevTasks;

            const overTask = prevTasks.find(task => task.id === over.id);
            const overColumn = overTask ? overTask.status : over.id;


            if (activeTask.status === overColumn) {
                // Reorder tasks within the same column
                const tasksInSameColumn = prevTasks.filter(task => task.status === overColumn);
                const activeIndexInColumn = tasksInSameColumn.findIndex(task => task.id === active.id);
                const overIndexInColumn = tasksInSameColumn.findIndex(task => task.id === over.id);

                const reorderedTasksInColumn = arrayMove(tasksInSameColumn, activeIndexInColumn, overIndexInColumn);

                return [
                    ...prevTasks.filter(task => task.status !== overColumn),
                    ...reorderedTasksInColumn,
                ];
            } else {
                // Move task to a different column
                return prevTasks.map(task =>
                    task.id === active.id ? { ...task, status: overColumn } : task
                );
            }

        });
        
        setActiveId(null);
    
    };


    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor, {coordinateGetter: sortableKeyboardCoordinates})
    );


    return (
        <div className='kanban'>
            <DndContext
                sensors={sensors}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}    
            >

{showBacklog ? (
                        <div className='backlog-column'>
                            <KanbanColumn 
                                className='column'
                                title='Backlog'
                                status='Backlog'
                                />
                            <a href="" className='show-calendar'
                            onClick={(e) => {
                                e.preventDefault();
                                setShowBacklog(false);
                            }}>
                            show Calendar</a>
                            
                        </div> 

                    ):(
                        <div className='backlog-column'>
                            {/* <h1>Calendar</h1> */}
                            
                            <Calendar onChange={setSelectedDate}/>
                            <a href="" className='show-backlog'
                            onClick={(e) => {
                                e.preventDefault();
                                setShowBacklog(true);
                            }}
                            >
                            show Backlog</a>
                            
                        </div> 
                    )}
                <KanbanColumn className='column' title='Today' status='Today' activeId={activeId} />
                <KanbanColumn className='column' title='In Progress' status='In Progress' activeId={activeId} />
                <KanbanColumn className='column' title='Done' status='Done' activeId={activeId} />


                <DragOverlay>
                    {
                        activeId ? (
                            <Task 
                                id={activeId}
                                description={tasks.find(task => task.id === activeId)?.description}
                                status={tasks.find(task => task.id === activeId)?.status}
                                className='task dragging'
                            />
                        ) : null
                    }
                </DragOverlay>

            </DndContext>
        </div>
    );
}

export default KanbanBoard;
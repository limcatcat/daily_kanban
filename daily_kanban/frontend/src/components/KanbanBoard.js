import React, { useEffect } from 'react';
import KanbanColumn from './KanbanColumn';
import { DndContext, DragOverlay, KeyboardSensor, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { useState } from 'react';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import Task from './Task';
import { useTaskContext, fetchTasks } from '../context/TaskContext';
import Cal from './Calendar';
import Calendar from 'react-calendar';
import { format } from 'date-fns';


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
    // const { tasks, setTasks, selectedDate, setSelectedDate } = useTaskContext();
    const { tasks, setTasks, selectedDate, setSelectedDate } = useTaskContext();
    const [activeId, setActiveId] = useState(null);
    const [showBacklog, setShowBacklog] = useState(true);

    const [isAdding, setIsAdding] = useState(false);
    const [newTaskDescription, setNewTaskDescription] = useState('');

    // const tasksByStatus = {
    //     today: tasks.filter(task => task.status == 'Today'),
    //     in_progress: tasks.filter(task => task.status == 'In Progress'),
    //     done: tasks.filter(task => task.status == 'Done')
    // };

    const formattedSelectedDate = format(selectedDate, "yyyy-MM-dd'T'hh:mm:ss");


    const handleDateChange = (date) => {
        console.log(date);
        
        setSelectedDate(date);
    };


    const handleDragStart = e => {
        setActiveId(e.active.id);
        // console.log(`Dragging started with activeId: ${e.active.id}`);     
    };

    const handleDragEnd = e => {
        const {active, over} = e;
        // console.log('over object:', over);
        
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

            // const overColumn = over?.data?.current?.title;
            // console.log('Drag ended:', {activeId: active.id, overColumn});
            
            if (!overColumn) return prevTasks;


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
                const updatedTasks = prevTasks.map(task =>
                    task.id === active.id ? { ...task, status: overColumn } : task
                );

                const csrftoken = document.querySelector('[name=csrf-token]').content;
                
                fetch(`/tasks/${active.id}/update-status/`, {
                    method: 'PATCH',
                    headers: {
                        'Content-type': 'application/json',
                        'X-CSRFToken': csrftoken,
                    },
                    body: JSON.stringify({status: overColumn, date: new Date().toLocaleDateString('en-CA') == formattedSelectedDate.split('T')[0] ? format(new Date(), "yyyy-MM-dd'T'hh:mm:ss") : formattedSelectedDate}),
                })
                    .then(response => {
                        if (!response.ok) {
                            console.error('Failed to update task status');
                        }
                        
                    })
                    .catch(error => console.error('Error:', error));
                
                    
                console.log('updated tasks:', updatedTasks);
                    
                return updatedTasks;
            }    
        
        });
          
        setActiveId(null);
    
    };


    const handleUpdateTask = (taskId, newDescription) => {
        const updatedTasks = tasks.map(task =>
            task.id === taskId ? {...task, description: newDescription} : task
        );
        setTasks(updatedTasks);


        const csrftoken = document.querySelector('[name=csrf-token]').content;

        fetch(`/tasks/${taskId}/update-description/`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({description: newDescription}),
        })
            .then(response => {
                if (!response.ok) {
                    setTasks(tasks); // revert the change if the update fails
                    console.error('Failed to update task description');
                } else {
                    console.log('Task description updated successfully');
                    
                }
            })
            .catch(error => {
                setTasks(tasks);
                console.error('Error:', error)
            });
    };



    const handleDeleteTask = taskId => {
        const updatedTasks = tasks.filter(task => task.id !== taskId);
        setTasks(updatedTasks);

        const csrftoken = document.querySelector('[name=csrf-token').content;

        fetch(`/tasks/${taskId}/delete/`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({archived: true}),
        })
        .then(response => {
            if (!response.ok) {
                setTasks(tasks);
                console.error('Failed to delete task');
            }
        })
        .catch(error => {
            setTasks(tasks);
            console.error('Error:', error);
        });
    };



    const handleAddTask = description => {
        const csrftoken = document.querySelector('[name=csrf-token').content;
        const token = localStorage.getItem('token');

        fetch('/tasks/', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ description, status: '0', date_created: format(new Date(), "yyyy-MM-dd'T'hh:mm:ss")}),
        })
        .then(response => {
            if (response.ok) {
                console.log('new task added');         
                return response.json();
            }
            throw new Error('Failed to add task');
        })
        .then(newTask => {
            setTasks([...tasks, newTask]);
            setIsAdding(false);
            setNewTaskDescription(''); // reset input field
        })
        .catch(error => console.error(error));
    };

    const handleStartAddingTask = () => {
        setIsAdding(true);
    };

    const handleCancelAddingTask = () => {
        setIsAdding(false);
        setNewTaskDescription('');
    }



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
                                status='0'
                                activeId={activeId}
                                onUpdateTask={handleUpdateTask}
                                onDeleteTask={handleDeleteTask}
                                isAdding={isAdding}
                                newTaskDescription={newTaskDescription}
                                onAddTask={handleAddTask}
                                onStartAddingTask={handleStartAddingTask}
                                onCancelAddingTask={handleCancelAddingTask}
                                onInputChange={setNewTaskDescription}
                                />
                            <a href="" className='show-calendar'
                            onClick={(e) => {
                                e.preventDefault();
                                setShowBacklog(false);
                            }}>
                            show Calendar</a>
                            
                            {/* {console.log(tasks)}; */}
                        </div> 

                    ):(
                        <div className='backlog-column'>
                            {/* <h1>Calendar</h1> */}
                            
                            <Calendar onChange={handleDateChange} />
                            <a href="" className='show-backlog'
                            onClick={(e) => {
                                e.preventDefault();
                                setShowBacklog(true);
                            }}
                            >
                            show Backlog</a>
                            
                        </div> 
                    )}
                <KanbanColumn className='column' title='Today' status='1' activeId={activeId} onUpdateTask={handleUpdateTask} onDeleteTask={handleDeleteTask} />
                <KanbanColumn className='column' title='In Progress' status='2' activeId={activeId} onUpdateTask={handleUpdateTask} onDeleteTask={handleDeleteTask} />
                <KanbanColumn className='column' title='Done' status='3' activeId={activeId} onUpdateTask={handleUpdateTask} onDeleteTask={handleDeleteTask} />


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
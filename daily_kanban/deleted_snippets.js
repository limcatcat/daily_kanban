// KanbanBoard

    return prevTasks.map(task => task.id === active.id ? {...task, status: overTask.status} : task);

    // if (!activeTask || !overTask) return prevTasks;

    // const newStatus = overTask.status;

    // if (activeTask.status !== newStatus) {
    //     return prevTasks.map(task => task.id === active.id ? {...task, status: newStatus} : task);
    // }

    // return prevTasks;

    // const originalPos = getTaskPos(activeTask.id)
    // const newPos = getTaskPos(overTask.id)

    // return arrayMove(tasks, originalPos, newPos)



// KanbanColumn

    // const [active, setActive] = useState(false);

    // const handleDragStart = (e, task) => {
    //     e.dataTransfer.setData("id", task.id);
    // };

    // const handleDragEnd = e => {
    //     // setActive(false);

    //     const taskId = e.dataTransfer.getData("id");

    //     const before = element.dataset.before || "-1";

    //     if (before !== id) {
    //         let copy = [...tasks];

    //         let taskToMove = copy.find(task => task.id === taskId);

    //         if (!taskToMove) return;
    //         taskToMove = {...taskToMove, status};

    //         copy = copy.filter(task => task.id !== taskId);

    //         const moveToBack = before === "-1";

    //         if (moveToBack) {
    //             copy.push(taskToMove);
    //         } else {
    //             const insertAtIndex = copy.findIndex(el => el.id === before);
    //             if (insertAtIndex === undefined) return;

    //             copy.splice(insertAtIndex, 0, taskToMove);
    //         }

    //         setTasks(copy);
    //     }
    // };

    // const handleDragOver = e => {
    //     e.preventDefault()
    // };

    const tasksByStatus = tasks.filter(task => task.status === status);
import React, { useState, useEffect, useRef } from 'react';
import '../../static/css/task.css'
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';


function Task({id, description, status, handleDragStart, isDragging, onUpdateTask, onDeleteTask}) {

    const [isEditing, setIsEditing] = useState(false);
    const [editedDescription, setEditedDescription] = useState(description);
    const [showContextMenu, setShowContextMenu] = useState(false);
    const [contextMenuPosition, setContextMenuPosition] = useState({x: 0, y: 0});

    const contextMenuRef = useRef(null);
    const longPressTimerRef = useRef(null);

    const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id});

    // const isDragging = id === activeId;

    const style = {
        transition: transition || 'transform 200ms ease',
        transform: CSS.Transform.toString(transform),
    };

    let taskStatus = '';
    
    if (status == '0')
        taskStatus = 'backlog'
    else if (status == '1')
        taskStatus = 'today'
    else if (status == '2')
        taskStatus = 'in-progress'
    else if (status == '3')
        taskStatus = 'done'



    const handleContextMenu = e => {
        e.preventDefault();
        setContextMenuPosition({x: e.clientX, y: e.clientY});
        setShowContextMenu(true);
    };

    const handleTouchStart = e => {
        longPressTimerRef.current = setTimeout(() => {
            const rect = e.target.getBoundingClientRect();
            setContextMenuPosition({x:rect.left, y:rect.bottom});
            setShowContextMenu(true);
        }, 500);
    };

    const handleTouchEnd = () => {
        clearTimeout(longPressTimerRef.current);
    };

    const handleEdit = () => {
        setIsEditing(true);
        setShowContextMenu(false);
    };

    const handleInputChange = e => {
        setEditedDescription(e.target.value);
    };

    const handleSave = () => {
        if (editedDescription.trim() && editedDescription !== description) {
            onUpdateTask(id, editedDescription.trim());
        }
        setIsEditing(false);
    };

    const closeContextMenu = (e) => {
        if (contextMenuRef.current && !contextMenuRef.current.contains(e.target)) {
            setShowContextMenu(false);
        }
    };


    const handleKeyDown = e => {
        if (e.key === 'Enter') {
            handleSave();
            e.preventDefault();
        } else if (e.key === ' ') {
            e.stopPropagation(); // this is necessary to prevent space bar from stopping the editing mode!!!
        } else if (e.key === 'Escape') {
            setIsEditing(false);
        }
    }
    

    useEffect(() => {
        if (showContextMenu) {
            document.addEventListener('click', closeContextMenu);
        } else {
            document.removeEventListener('click', closeContextMenu);
        }

        return () => {
            document.removeEventListener('click', closeContextMenu);
        };
    }, [showContextMenu]);


    const handleDelete = () => {
        const confirmed = window.confirm('Are you sure you want to delete this task?');

        if (confirmed) {
            onDeleteTask(id);
        }
        setShowContextMenu(false);
    };



    return (
        <>
            <div className={`task ${taskStatus} ${isDragging ? 'dragging' : ''}`}
            style={style}
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            onDragStart={e => !isEditing && handleDragStart(e, {id, description, status})}
            onContextMenu={handleContextMenu}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            >
                {isEditing ? (
                    <input 
                        type='text'
                        value={editedDescription}
                        onChange={handleInputChange}
                        onBlur={handleSave}
                        onKeyDown={handleKeyDown}
                        autoFocus    
                    />
                ) : description}
            </div>


            {/* context menu */}
            {showContextMenu && (
                <div
                    ref={contextMenuRef}
                    className="context-menu"
                    style={{ position: 'absolute', left: contextMenuPosition.x, top: contextMenuPosition.y }}
                    onClick={closeContextMenu} // Close the menu when clicked outside
                >
                    <ul>
                        <li onClick={handleEdit}>Edit</li>
                        <li onClick={handleDelete}>Delete</li>
                    </ul>
                </div>
            )}

        </>
    );
}

export default Task;
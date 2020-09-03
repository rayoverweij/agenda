import React, { useState } from 'react';
import './DayItem.scss';
import { Task } from '../types/Task';
import Dropdown from 'react-bootstrap/Dropdown';
import { Draggable } from 'react-beautiful-dnd';
import { GripHorizontal, ThreeDots, Trash2, Option } from 'react-bootstrap-icons';
import EditText from './EditText';


type DayItemProps = {
    task: Task,
    index: number,
    updateTask: (task: Task) => void,
    deleteTask: (id: number) => void
}

const DayItem = ({task, index, updateTask, deleteTask}: DayItemProps) => {
    const [selected, setSelected] = useState(false);

    const onDropdownToggle = (isOpen: boolean) => {
        if(isOpen) setSelected(true);
        else setSelected(false);
    }

    const editTask = (value: string) => {
        const newTask = {...task};
        newTask.content = value;
        updateTask(newTask);
    }

    return (
        <Draggable draggableId={task.id.toString()} index={index}>
            {(provided, snapshot) => 
                <div
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    className={`
                        dragContainer
                        ${snapshot.isDragging ? "isDragging" : ""}
                        ${selected ? "selected" : ""}
                    `}
                >
                    <div
                        {...provided.dragHandleProps}
                        className="dragHandle"
                        >
                        <GripHorizontal />
                    </div>
                    <div className="taskContent">
                        <EditText
                            name="editTask"
                            type="edit"
                            start={task.content}
                            placeholder="empty task"
                            fn={editTask}
                        />
                    </div>
                    <div className="taskMenu">
                        <Dropdown onToggle={onDropdownToggle}>
                            <Dropdown.Toggle as="div" className="taskDropdownToggle">
                                <ThreeDots />
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="taskDropdownMenu">
                                <Dropdown.Item onClick={() => {deleteTask(task.id)}}>
                                    <Trash2 />&nbsp;&nbsp;Delete
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <Option />&nbsp;&nbsp;Option 2
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <Option />&nbsp;&nbsp;Option 3
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            }
        </Draggable>
    );
}

export default DayItem;
import React, { useState } from 'react';
import './DayItem.scss';
import { Task } from '../types/Task';
import Dropdown from 'react-bootstrap/Dropdown';
import { Draggable } from 'react-beautiful-dnd';
import { GripHorizontal, ThreeDots, Trash2, Option } from 'react-bootstrap-icons';


type DayItemProps = {
    task: Task,
    index: number
}

const DayItem = ({task, index}: DayItemProps) => {
    const [selected, setSelected] = useState(false);

    const onDropdownToggle = (isOpen: boolean) => {
        if(isOpen) setSelected(true);
        else setSelected(false);
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
                        {task.content}
                    </div>
                    <div className="taskMenu">
                        <Dropdown onToggle={onDropdownToggle}>
                            <Dropdown.Toggle as="div" className="taskDropdownToggle">
                                <ThreeDots />
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="taskDropdownMenu">
                                <Dropdown.Item><Trash2 />&nbsp;&nbsp;Delete</Dropdown.Item>
                                <Dropdown.Item><Option />&nbsp;&nbsp;Option 2</Dropdown.Item>
                                <Dropdown.Item><Option />&nbsp;&nbsp;Option 3</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            }
        </Draggable>
    );
}

export default DayItem;
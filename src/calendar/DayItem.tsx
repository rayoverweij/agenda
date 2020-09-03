import React from 'react';
import './DayItem.scss';
import { Task } from '../types/Task';
import { Draggable } from 'react-beautiful-dnd';
import { GripHorizontal } from 'react-bootstrap-icons';


type DayItemProps = {
    task: Task,
    index: number
}

const DayItem = ({task, index}: DayItemProps) => {
    return (
        <Draggable draggableId={task.id.toString()} index={index}>
            {(provided, snapshot) => 
                <div
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    className={`dragContainer ${snapshot.isDragging ? "isDragging" : ""}`}
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
                </div>
            }
        </Draggable>
    );
}

export default DayItem;
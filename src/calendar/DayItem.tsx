import React from 'react';
import './DayItem.scss';
import { Draggable } from 'react-beautiful-dnd';
import { Task } from '../types/Task';


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
                    </div>
                    {task.content}
                </div>
            }
        </Draggable>
    );
}

export default DayItem;
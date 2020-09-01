import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Task } from '../types/Task';


type DayItemProps = {
    task: Task,
    index: number
}

const DayItem = ({task, index}: DayItemProps) => {
    return (
        <Draggable draggableId={task.id.toString()} index={index}>
            {(provided) => 
                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    {task.content}
                </div>
            }
        </Draggable>
    );
}

export default DayItem;
import React from 'react';
import './WeekDay.scss';
import DayItem from './DayItem';
import { Day } from '../types/Day';
import { Task } from '../types/Task';
import Col from 'react-bootstrap/Col';
import { Droppable } from 'react-beautiful-dnd';
import { format, isToday } from 'date-fns';


type WeekDayProps = {
    day: Day,
    tasks: { [key: number]: Task }
}

const WeekDay = ({day, tasks}: WeekDayProps) => {
    const todaysDate = new Date(day.date);
    const todaysTasks = day.tasks.map(taskId => tasks[taskId]);

    return (
        <Col className="weekDay">
            <p className={isToday(todaysDate) ? "today" : ""}>
                {format(todaysDate, 'iiii d')}
            </p>
            <Droppable droppableId={format(todaysDate, 'yyyy-MM-dd')}>
                {(provided, snapshot) => 
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={`dropContainer ${snapshot.isDraggingOver ? "isDraggingOver" : ""}`}
                    >
                        {todaysTasks.map((task, index) => {
                            return (
                                <DayItem key={`task-${task.id}`} task={task} index={index} />
                            );
                        })}
                        {provided.placeholder}
                    </div>
                }
            </Droppable>
        </Col>
    );
}

export default WeekDay;
import React from 'react';
import './WeekDay.scss';
import DayItem from './DayItem';
import EditText from './EditText';
import { Day } from '../types/Day';
import { Task, TaskSet } from '../types/Task';
import Col from 'react-bootstrap/Col';
import { Droppable } from 'react-beautiful-dnd';
import { format, isToday } from 'date-fns';


type WeekDayProps = {
    day: Day,
    tasks: { [key: number]: Task },
    updateTasks: (newTasks: TaskSet) => void,
    updateDay: (newDay: Day) => void
}

const WeekDay = ({day, tasks, updateTasks, updateDay}: WeekDayProps) => {
    const todaysDate = new Date(day.date);
    const todaysTasks = day.tasks.map(taskId => tasks[taskId]);

    const addTask = (value: string) => {
        const taskCounter = Object.keys(tasks).length;
        const newTasks = {...tasks}
        newTasks[taskCounter] = { id: taskCounter, content: value };
        updateTasks(newTasks);

        const newDay = {...day};
        newDay.tasks.push(taskCounter);
        updateDay(newDay);
    }

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
                        <EditText name="addTask" fn={addTask} />
                    </div>
                }
            </Droppable>
        </Col>
    );
}

export default WeekDay;
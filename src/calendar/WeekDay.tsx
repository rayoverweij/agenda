import React from 'react';
import './WeekDay.scss';
import DayItem from './DayItem';
import EditText from './EditText';
import { Day } from '../types/Day';
import { Task, TaskSet } from '../types/Task';
import Col from 'react-bootstrap/Col';
import { Droppable } from 'react-beautiful-dnd';
import { format, isToday } from 'date-fns';
import { RawDraftContentState } from 'draft-js';


type WeekDayProps = {
    tasks: { [key: number]: Task },
    taskCounter: number,
    day: Day,
    updateTasks: (newTasks: TaskSet) => void,
    updateTaskCounter: (newCounter: number) => void,
    updateDay: (newDay: Day) => void
}

const WeekDay = ({tasks, taskCounter, day, updateTasks, updateTaskCounter, updateDay}: WeekDayProps) => {
    const todaysDate = new Date(day.date);
    const todaysTasks = day.tasks.map(taskId => tasks[taskId]);

    const addTask = (value: RawDraftContentState) => {
        const newTasks = {...tasks};
        newTasks[taskCounter] = { id: taskCounter, content: value, highlight: false };
        updateTasks(newTasks);
        updateTaskCounter(taskCounter + 1);

        const newDay = {...day};
        newDay.tasks.push(taskCounter);
        updateDay(newDay);
    }

    const updateTask = (task: Task) => {
        const newTasks = {...tasks};
        newTasks[task.id] = task;
        updateTasks(newTasks);
    }

    const deleteTask = (taskId: number) => {
        const newTasks = {...tasks};
        delete newTasks[taskId];
        updateTasks(newTasks);

        const newDay = {...day};
        const index = newDay.tasks.findIndex(el => el === taskId);
        newDay.tasks.splice(index, 1);
        updateDay(newDay);
    }

    return (
        <Col className="weekDay">
            <div className="dayName">
                <p className={isToday(todaysDate) ? "today" : ""}>
                    {format(todaysDate, 'iiii d')}
                </p>
            </div>
            <Droppable droppableId={format(todaysDate, 'yyyy-MM-dd')}>
                {(provided, snapshot) => 
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={`dropContainer ${snapshot.isDraggingOver ? "isDraggingOver" : ""}`}
                    >
                        {todaysTasks.map((task, index) => {
                            return (
                                <DayItem
                                    key={`task-${task.id}`}
                                    task={task}
                                    index={index}
                                    updateTask={updateTask}
                                    deleteTask={deleteTask}
                                />
                            );
                        })}
                        {provided.placeholder}
                        {todaysTasks.length === 0 ?
                            <div className="addTask">
                                <EditText
                                    type="add"
                                    placeholder=""
                                    handleSubmit={addTask}
                                />
                            </div>
                        :
                            <></>
                        }
                    </div>
                }
            </Droppable>
        </Col>
    );
}

export default WeekDay;
import React, { useState, useEffect } from 'react';
import firebase from '../firebase';
import './WeekDay.scss';
import DayItem from './DayItem';
import EditText from './EditText';
import { Task } from '../types/Task';
import Col from 'react-bootstrap/Col';
import { Droppable } from 'react-beautiful-dnd';
import { format, isToday } from 'date-fns';
import { RawDraftContentState } from 'draft-js';


type WeekDayProps = {
    date: string,
}

const WeekDay = ({date}: WeekDayProps) => {
    const database = firebase.database();

    const [tasks, setTasks] = useState([] as Task[]);

    useEffect(() => {
        database.ref('tasks').on('value', (snapshot) => {
            const todaysTasks = snapshot.val();
            const newTasks = [];

            for(let task in todaysTasks) {
                if(todaysTasks[task].date === date) {
                    newTasks.push({
                        id: task,
                        date: todaysTasks[task].date,
                        content: JSON.parse(todaysTasks[task].content),
                        highlight: todaysTasks[task].highlight
                    });
                }
            }

            setTasks(newTasks);
        });
    }, [database, date]);

    const todaysDate = new Date(date);

    const addTask = (value: RawDraftContentState) => {
        const newTask = {
            date: date,
            content: JSON.stringify(value),
            highlight: false
        }

        database.ref('tasks').push(newTask);
    }

    const updateTask = (task: Task) => {
        console.log(task);
        const newTask = {
            date: task.date,
            content: JSON.stringify(task.content),
            highlight: task.highlight
        };

        database.ref('tasks/' + task.id).update(newTask);
    }

    const deleteTask = (taskId: string) => {
        database.ref('tasks/' + taskId).remove();
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
                        {tasks.map((task, index) => {
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
                        <div className="addTask">
                            <EditText
                                type="add"
                                placeholder="Add task..."
                                handleSubmit={addTask}
                            />
                        </div>
                    </div>
                }
            </Droppable>
        </Col>
    );
}

export default WeekDay;
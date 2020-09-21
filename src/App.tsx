import React, { useState } from 'react';
import './App.scss';
import WeekDay from './calendar/WeekDay';
import MiniCal from './minical/MiniCal';
import { TaskSet } from './types/Task';
import { Day, DaySet } from './types/Day';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { ArrowLeftCircle, ArrowRightCircle, ArrowDownCircle } from 'react-bootstrap-icons';
import { format, getWeek, getMonth, getYear, startOfWeek, addDays, addWeeks, subWeeks } from 'date-fns';


const App = () => {
    // Initialize local storage
    if(localStorage.getItem("tasks") === null) {
        localStorage.setItem("tasks", JSON.stringify({}));
    }

    if(localStorage.getItem("taskCounter") === null) {
        localStorage.setItem("taskCounter", JSON.stringify(0));
    }

    if(localStorage.getItem("days") === null) {
        localStorage.setItem("days", JSON.stringify({}));
    }


    // Initialize state
    const [currentDate, setCurrentDate] = useState(new Date());
    const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks")!) as TaskSet);
    const [taskCounter, setTaskCounter] = useState(JSON.parse(localStorage.getItem("taskCounter")!));
    const [days, setDays] = useState(JSON.parse(localStorage.getItem("days")!) as DaySet);


    // Update storage
    const updateTasks = (newTasks: TaskSet) => {
        setTasks(newTasks);
        localStorage.setItem("tasks", JSON.stringify(newTasks));
    }

    const updateTaskCounter = (newCounter: number) => {
        setTaskCounter(newCounter);
        localStorage.setItem("taskCounter", JSON.stringify(newCounter));
    }

    const updateDays = (newDays: DaySet) => {
        setDays(newDays);
        localStorage.setItem("days", JSON.stringify(newDays));
    }

    const updateDay = (newDay: Day) => {
        const newDays = {...days};
        newDays[newDay.date] = newDay;
        updateDays(newDays);
    }


    // Information based on current state
    const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });

    const weekDays: Date[] = [];
    for(let i = 0; i < 7; i++) {
        weekDays.push(addDays(weekStart, i));

        const currDay = format(weekDays[i], 'yyyy-MM-dd');
        if(!days.hasOwnProperty(currDay)) {
            const newDays = {...days};
            newDays[currDay] = {date: currDay, tasks: []};
            setDays(newDays);
        }
    }

    const thisMonth = () => {
        const startMonth = getMonth(weekDays[0]);
        const endMonth = getMonth(weekDays[6]);

        if(startMonth === 11 && endMonth === 0) {
            const lastYear = getYear(weekDays[0]);
            return `${format(weekDays[0], 'MMM')} ${lastYear} - ${format(weekDays[6], 'MMM Y')}`;
        } else if(startMonth !== endMonth) {
            return `${format(weekDays[0], 'MMM')} - ${format(weekDays[6], 'MMM Y')}`;
        } else {
            return format(weekDays[0], 'MMMM Y');
        }
    }


    // Calendar navigation
    const prevWeek = () => { setCurrentDate(subWeeks(currentDate, 1)); }
    const nextWeek = () => { setCurrentDate(addWeeks(currentDate, 1)); }
    const today = () => { setCurrentDate(new Date()); }


    // Drag and drop tasks
    const onDragEnd = (result: DropResult) => {
        const { destination, source, draggableId } = result;

        if(!destination) return;

        if(destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        const start = days[source.droppableId]!;
        const finish = days[destination.droppableId]!;

        if(start === finish) {
            const newTaskList = [...start.tasks];
            newTaskList.splice(source.index, 1);
            newTaskList.splice(destination.index, 0, Number(draggableId));

            const newDay = {...finish, tasks: newTaskList};
            updateDay(newDay);
            
        } else {
            const newStartTaskList = [...start.tasks];
            newStartTaskList.splice(source.index, 1);
            const newStart = {...start, tasks: newStartTaskList};
    
            const newFinishTaskList = [...finish.tasks];
            newFinishTaskList.splice(destination.index, 0, Number(draggableId));
            const newFinish = {...finish, tasks: newFinishTaskList};
    
            const newDays = {...days};
            newDays[newStart.date] = newStart;
            newDays[newFinish.date] = newFinish;
            
            updateDays(newDays);
        }
    }


    // Render
    return (
        <Container fluid>
            <header>
                <h1>Agenda</h1>
                <span className="weekNumber">Week {getWeek(currentDate, { weekStartsOn: 1 })}, {thisMonth()}</span>
            </header>
            <main>
                <Row className="daysOfWeek">
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Col id="toolCol">
                            <div className="weekNav">
                                <ArrowLeftCircle className="weekChevron" onClick={prevWeek} />
                                <ArrowDownCircle className="weekChevron" onClick={today} />
                                <ArrowRightCircle className="weekChevron" onClick={nextWeek} />
                            </div>
                            <div>
                                <MiniCal
                                    currentDate={currentDate}
                                    setCurrentDate={setCurrentDate}
                                />
                            </div>
                        </Col>
                        {
                            weekDays.map((weekDay, index) => {
                                const weekDayString = format(weekDay, 'yyyy-MM-dd');
                                const day = days[weekDayString];

                                return (
                                    <WeekDay
                                        key={`weekDay-${index}`}
                                        tasks={tasks}
                                        taskCounter={taskCounter}
                                        day={day}
                                        updateTasks={updateTasks}
                                        updateTaskCounter={updateTaskCounter}
                                        updateDay={updateDay}
                                    />
                                )
                            })
                        }
                    </DragDropContext>
                </Row>
            </main>
        </Container>
    );
}


export default App;

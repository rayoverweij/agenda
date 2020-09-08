import React, { useState } from 'react';
import './App.scss';
import WeekDay from './calendar/WeekDay';
import MiniCal from './minical/MiniCal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { ArrowLeftCircle, ArrowRightCircle, ArrowDownCircle } from 'react-bootstrap-icons';
import { format, getWeek, getMonth, getYear, startOfWeek, addDays, addWeeks, subWeeks } from 'date-fns';


const App = () => {
    // Initialize state
    const [currentDate, setCurrentDate] = useState(new Date());


    // Information based on current state
    const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });

    const weekDays: Date[] = [];
    for(let i = 0; i < 7; i++) {
        weekDays.push(addDays(weekStart, i));
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
        // const { destination, source, draggableId } = result;

        // if(!destination) return;

        // if(destination.droppableId === source.droppableId && destination.index === source.index) {
        //     return;
        // }

        // const start = source.droppableId;
        // const finish = destination.droppableId;

        // if(start === finish) {
        //     const newTaskList = [...JSON.parse(start.tasks)];
        //     newTaskList.splice(source.index, 1);
        //     newTaskList.splice(destination.index, 0, draggableId);

        //     const newDay = {...finish, tasks: JSON.stringify(newTaskList)};
        //     database.ref('days/' + finish.date).update(newDay);
            
        // } else {
        //     const newStartTaskList = [...JSON.parse(start.tasks)];
        //     newStartTaskList.splice(source.index, 1);
        //     const newStart = {...start, tasks: JSON.stringify(newStartTaskList)};
    
        //     const newFinishTaskList = [...JSON.parse(finish.tasks)];
        //     newFinishTaskList.splice(destination.index, 0, draggableId);
        //     const newFinish = {...finish, tasks: JSON.stringify(newFinishTaskList)};

        //     const updates = {} as DaySet
        //     updates['/days/' + newStart.date] = newStart;
        //     updates['/days/' + newFinish.date] = newFinish;
    
        //     database.ref().update(updates);
        // }
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

                                return (
                                    <WeekDay
                                        key={`weekDay-${index}`}
                                        date={weekDayString}
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

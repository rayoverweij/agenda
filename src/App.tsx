import React, { useState } from 'react';
import './App.scss';
import WeekDay from './calendar/WeekDay';
import MiniCal from './minical/MiniCal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ArrowLeftCircle, ArrowRightCircle, ArrowDownCircle } from 'react-bootstrap-icons';
import { format, getWeek, getMonth, getYear, startOfWeek, endOfWeek, addDays, addWeeks, subWeeks } from 'date-fns';


const App = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
    const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 });

    const weekDays: string[] = [];
    for(let i = 0; i < 7; i++) {
        const newDay = format(addDays(weekStart, i), 'yyyy-MM-dd');
        weekDays.push(newDay);
    }

    const thisMonth = () => {
        const startMonth = getMonth(weekStart);
        const endMonth = getMonth(weekEnd);

        if(startMonth === 11 && endMonth === 0) {
            const lastYear = getYear(weekStart);
            return `${format(weekStart, 'MMM')} ${lastYear} - ${format(weekEnd, 'MMM Y')}`;
        } else if(startMonth !== endMonth) {
            return `${format(weekStart, 'MMM')} - ${format(weekEnd, 'MMM Y')}`;
        } else {
            return format(weekStart, 'MMMM Y');
        }
    }


    const prevWeek = () => { setCurrentDate(subWeeks(currentDate, 1)); }
    const nextWeek = () => { setCurrentDate(addWeeks(currentDate, 1)); }
    const today = () => { setCurrentDate(new Date()); }


    // Render
    return (
        <Container fluid>
            <header>
                <h1>Agenda</h1>
                <span className="weekNumber">Week {getWeek(currentDate, { weekStartsOn: 1 })}, {thisMonth()}</span>
            </header>
            <main>
                <Row className="daysOfWeek">
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
                            return (
                                <WeekDay
                                    key={`weekDay-${index}`}
                                    date={weekDay}
                                />
                            )
                        })
                    }
                </Row>
            </main>
        </Container>
    );
}


export default App;

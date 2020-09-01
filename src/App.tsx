import React, { useState } from 'react';
import './App.scss';
import WeekDay from './calendar/WeekDay';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ArrowLeftCircle, ArrowRightCircle, ArrowDownCircle } from 'react-bootstrap-icons';
import { format, getWeek, getMonth, getYear, startOfWeek, addDays, addWeeks, subWeeks } from 'date-fns';


const App = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

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

    const prevWeek = () => {
        setCurrentDate(subWeeks(currentDate, 1));
    }

    const nextWeek = () => {
        setCurrentDate(addWeeks(currentDate, 1));
    }

    const today = () => {
        setCurrentDate(new Date());
    }


    return (
        <Container fluid>
            <header>
                <Row>
                    <Col>
                        <h1>Agenda</h1>
                        <span className="weekNumber">Week {getWeek(currentDate)}, {thisMonth()}</span>
                    </Col>
                </Row>
            </header>
            <main>
                <Row className="daysOfWeek">
                    <Col id="toolCol">
                        <ArrowLeftCircle className="weekChevron" onClick={prevWeek} />
                        <ArrowDownCircle className="weekChevron" onClick={today} />
                        <ArrowRightCircle className="weekChevron" onClick={nextWeek} />
                    </Col>
                    {
                        weekDays.map((weekDay, index) => {
                            return (
                                <WeekDay date={weekDay} key={`weekDay-${index}`} />
                            )
                        })
                    }
                </Row>
            </main>
        </Container>
    );
}


export default App;

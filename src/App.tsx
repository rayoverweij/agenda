import React, { useState } from 'react';
import './App.scss';
import WeekDay from './calendar/WeekDay';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { getWeek, startOfWeek, addDays } from 'date-fns';


const App = () => {
    const [currentDate, _] = useState(new Date());

    const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });

    const weekDays: Date[] = [];
    for(let i = 0; i < 7; i++) {
        weekDays.push(addDays(weekStart, i));
    }

    return (
        <Container fluid>
            <header>
                <Row>
                    <Col>
                        <h1>Agenda</h1>
                        <span className="weekNumber">Week {getWeek(currentDate)}</span>
                    </Col>
                </Row>
            </header>
            <main>
                <Row className="daysOfWeek">
                    <Col>
                    </Col>
                    {
                        weekDays.map(weekDay => {
                            return (
                                <WeekDay date={weekDay} />
                            )
                        })
                    }
                </Row>
            </main>
        </Container>
    );
}


export default App;

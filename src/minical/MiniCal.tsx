import React, { useState } from 'react';
import './MiniCal.scss';
import { Row, Col, Button } from 'react-bootstrap';
import { format, startOfMonth, startOfWeek, addDays, isToday, isSameDay, subMonths, addMonths, isSameMonth } from 'date-fns';
import { ArrowUpShort, ArrowDownShort } from 'react-bootstrap-icons';


type MiniCalProps = {
    currentDate: Date,
    setCurrentDate: (date: Date) => void
}

const MiniCal = ({currentDate, setCurrentDate}: MiniCalProps) => {
    const [selectedDate, setSelectedDate] = useState(currentDate);

    const monthStart = startOfMonth(selectedDate);
    const startOfFirstWeekInMonth = startOfWeek(monthStart, { weekStartsOn: 1 });

    const displayedDays: Date[] = [];
    for(let i = 0; i < 42; i++) {
        displayedDays.push(addDays(startOfFirstWeekInMonth, i));
    }

    const onClick = (day: Date) => { setCurrentDate(day); }

    const prevMonth = () => { setSelectedDate(subMonths(selectedDate, 1)); }
    const nextMonth = () => { setSelectedDate(addMonths(selectedDate, 1)); }

    return (
        <div className="miniCal">
            <div className="miniCalHeader">
                <div>
                    {format(selectedDate, 'MMMM')}
                </div>
                <div>
                    <Button
                        variant="light"
                        onClick={prevMonth}
                    >
                        <ArrowUpShort />
                    </Button>
                    <Button
                        variant="light"
                        onClick={nextMonth}
                    >
                        <ArrowDownShort />
                    </Button>
                </div>
            </div>
            <div className="miniCalBody">
                {[0, 1, 2, 3, 4, 5].map(no => {
                    return (
                        <Row key={`miniCal-row-${no}`}>
                            {displayedDays.slice(no * 7, (no + 1) * 7).map((day, index) => {
                                return (
                                    <Col key={`miniCal-row-${no}-day-${index}`}>
                                        <Button
                                            variant="light"
                                            className={`
                                                ${isSameMonth(selectedDate, day) ? "" : "notThisMonth"}
                                                ${isToday(day) ? "today" : ""}
                                                ${isSameDay(currentDate, day) ? "selected" : ""}
                                            `}
                                            onClick={() => onClick(day) }
                                        >
                                            {format(day, 'd')}
                                        </Button>
                                    </Col>
                                );
                            })}
                        </Row>
                    );
                })}
            </div>
        </div>
    );
}

export default MiniCal;
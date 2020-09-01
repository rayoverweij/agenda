import React from 'react';
import './WeekDay.scss';
import Col from 'react-bootstrap/Col';
import { format } from 'date-fns';


type WeekDayProps = {
    date: Date
}

const WeekDay = ({date}: WeekDayProps) => {
    return (
        <Col className="weekDay">
            {format(date, 'iiii d')}
        </Col>
    );
}

export default WeekDay;
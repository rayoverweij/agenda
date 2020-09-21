import React, { useState, useEffect } from 'react';
import firebase from '../firebase';
import './WeekDay.scss';
import DayItem from './DayItem';
import EditText from './EditText';
import { Day } from '../types/Day';
import Col from 'react-bootstrap/Col';
import { format, isToday } from 'date-fns';
import { EditorState, RawDraftContentState, convertToRaw } from 'draft-js';


type WeekDayProps = {
    date: string
}

const WeekDay = ({date}: WeekDayProps) => {
    const database = firebase.database();
    const todaysDate = new Date(date);

    const emptyContent = convertToRaw(EditorState.createEmpty().getCurrentContent());
    const [content, setContent] = useState(emptyContent);

    useEffect(() => {
        database.ref('days/' + date).on('value', (snapshot) => {
            const dataDay = snapshot.val();
            if(dataDay) {
                setContent(JSON.parse(dataDay.content));
            }
        });
    }, [database, date]);

    const saveDay = (newContent: RawDraftContentState) => {
        const newDay = {
            date: date,
            content: JSON.stringify(newContent)
        }

        database.ref('days/' + date).set(newDay);
    }

    return (
        <Col className="weekDay">
            <div className="dayName">
                <p className={isToday(todaysDate) ? "today" : ""}>
                    {format(todaysDate, 'iiii d')}
                </p>
            </div>
            <div className="dayContent">
                <DayItem
                    start={content}
                    saveDay={saveDay}
                />
            </div>
        </Col>
    );
}

export default WeekDay;
import React from 'react';
import './DayItem.scss';
import EditText from './EditText';
import { RawDraftContentState } from 'draft-js';


type DayItemProps = {
    start: RawDraftContentState,
    saveDay: (content: RawDraftContentState) => void
}

const DayItem = ({start, saveDay}: DayItemProps) => {
    console.log('rendering...')

    return (
        <EditText
            start={start}
            placeholder="Add item..."
            handleSubmit={saveDay}
        />
    );
}

export default DayItem;
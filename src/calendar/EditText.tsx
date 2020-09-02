import React, { useState, ChangeEvent, KeyboardEvent } from 'react';


type EditTextProps = {
    name: string,
    cols?: number,
    fn: (value: string) => void
}

const EditText = ({name, cols, fn}: EditTextProps) => {
    const [value, setValue] = useState("");

    const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setValue(event.target.value);
    }

    const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
        if(event.which === 13) (event.target as HTMLTextAreaElement).blur();
    }

    const onBlur = (event: ChangeEvent<HTMLTextAreaElement>) => {
        event.preventDefault();
        if(value === "") return;
        fn(value);
        setValue("");
    }

    return (
        <textarea
            className="editText"
            name={name}
            rows={1}
            cols={cols || (value.length > 8 ? value.length : 8)}
            value={value}
            autoComplete="off"
            onChange={onChange}
            onKeyDown={onKeyDown}
            onBlur={onBlur}
        />
    );
}

export default EditText;
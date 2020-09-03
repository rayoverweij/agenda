import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import TextareaAutosize from 'react-textarea-autosize';


type EditTextProps = {
    name: string,
    placeholder?: string,
    fn: (value: string) => void
}

const EditText = ({name, placeholder, fn}: EditTextProps) => {
    const [value, setValue] = useState("");

    const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setValue(event.target.value);
    }

    const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
        if(event.which === 13) {
            event.preventDefault();
            if(value === "") return;
            fn(value);
            setValue("");
        }
    }

    return (
        <TextareaAutosize
            className="editText"
            name={name}
            cols={value.length > 8 ? value.length : 8}
            value={value}
            autoComplete="off"
            placeholder={placeholder}
            onChange={onChange}
            onKeyDown={onKeyDown}
        />
    );
}

export default EditText;
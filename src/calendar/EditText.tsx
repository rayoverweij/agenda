import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import TextareaAutosize from 'react-textarea-autosize';


type EditTextProps = {
    name: string,
    type: "add" | "edit",
    start?: string,
    placeholder?: string,
    fn: (value: string) => void
}

const EditText = ({name, type, start, placeholder, fn}: EditTextProps) => {
    const [value, setValue] = useState(start || "");

    const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setValue(event.target.value);
    }

    const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
        if(event.which === 13) {
            event.preventDefault();
            if(type === "add" && value === "") return;
            fn(value);
            if(type === "add") setValue("");
            if(type === "edit") (event.target as HTMLTextAreaElement).blur();
        }
    }

    const onBlur = (event: ChangeEvent<HTMLTextAreaElement>) => {
        event.preventDefault();
        fn(value);
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
            onBlur={type === "edit" ? onBlur : undefined}
        />
    );
}

export default EditText;
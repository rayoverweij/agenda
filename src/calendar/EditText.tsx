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

    const submit = () => {
        fn(value);
        if(type === "add") setValue("");
    }

    const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setValue(event.target.value);
    }

    const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
        if(event.which === 13) {
            event.preventDefault();
            submit();
            if(type === "edit") (event.target as HTMLTextAreaElement).blur();
        }
    }

    const onBlur = (event: ChangeEvent<HTMLTextAreaElement>) => {
        event.preventDefault();
        submit();
    }

    return (
        <TextareaAutosize
            className="editText"
            name={name}
            value={value}
            autoComplete="off"
            spellCheck={false}
            placeholder={placeholder}
            onChange={onChange}
            onKeyDown={onKeyDown}
            onBlur={onBlur}
        />
    );
}

export default EditText;
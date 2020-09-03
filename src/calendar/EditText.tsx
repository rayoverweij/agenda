import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import TextareaAutosize from 'react-textarea-autosize';


type EditTextProps = {
    name: string,
    type: "add" | "edit",
    start?: string,
    placeholder?: string,
    handleSubmit: (value: string) => void,
    handleDelete?: () => void
}

const EditText = ({name, type, start, placeholder, handleSubmit, handleDelete}: EditTextProps) => {
    const [value, setValue] = useState(start || "");

    const submit = () => {
        handleSubmit(value);
        if(type === "add") setValue("");
    }

    const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setValue(event.target.value);
    }

    const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
        switch(event.which) {
            case 8:
                if (value === "" && handleDelete !== undefined) {
                    handleDelete();
                }
                break;
            case 13:
                if(!event.shiftKey) {
                    event.preventDefault();
                    submit();
                    if(type === "edit") (event.target as HTMLTextAreaElement).blur();
                }
                break;
            default:
                break;
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
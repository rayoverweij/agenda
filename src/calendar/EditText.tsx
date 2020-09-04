import React, { useState, FocusEvent, KeyboardEvent } from 'react';
import { Editor, EditorState, RawDraftContentState, RichUtils, getDefaultKeyBinding, convertToRaw, convertFromRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';


type EditTextProps = {
    type: "add" | "edit",
    start?: RawDraftContentState,
    placeholder?: string,
    handleSubmit: (value: RawDraftContentState) => void,
    handleDelete?: () => void
}

const EditText = ({type, start, placeholder, handleSubmit, handleDelete}: EditTextProps) => {
    const [editorState, setEditorState] = useState(
        start === undefined ? () => EditorState.createEmpty() : () => EditorState.createWithContent(convertFromRaw(start)),
    )

    const submit = () => {
        handleSubmit(convertToRaw(editorState.getCurrentContent()));
        if(type === "add") setEditorState(EditorState.createEmpty());
    }

    const customKeyBindingFn = (event: KeyboardEvent) => {
        switch(event.which) {
            case 8:
                if(!editorState.getCurrentContent().hasText() && handleDelete !== undefined) {
                    return 'delete-item';
                } else {
                    return getDefaultKeyBinding(event);
                }
            case 13:
                if(!event.shiftKey) {
                    event.preventDefault();
                    return 'submit-item';
                }
            default:
                return getDefaultKeyBinding(event);
        }
    }

    const handleKeyCommand = (command: string, editorState: EditorState) => {
        if(command === "delete-item") {
            handleDelete!();
            return 'handled';
        }
        
        if(command === "submit-item") {
            submit();
            if(type === "edit") (document.activeElement! as HTMLDivElement).blur();
            return 'handled';
        }

        const newState = RichUtils.handleKeyCommand(editorState, command);

        if(newState) {
            setEditorState(newState);
            return 'handled';
        }

        return 'not-handled';
    }

    const onBlur = (event: FocusEvent) => {
        event.preventDefault();
        if(type === "add" && !editorState.getCurrentContent().hasText()) return;
        submit();
    }

    return (
        <div className="editText">
            <Editor
                editorState={editorState}
                autoComplete="off"
                spellCheck={false}
                placeholder={placeholder}
                onChange={setEditorState}
                handleKeyCommand={handleKeyCommand}
                keyBindingFn={customKeyBindingFn}
                onBlur={onBlur}
            />
        </div>
    );
}

export default EditText;
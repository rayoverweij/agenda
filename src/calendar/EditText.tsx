import React, { useState, FocusEvent, KeyboardEvent } from 'react';
import { OverlayTrigger, Popover, Button } from 'react-bootstrap';
import { Editor, EditorState, RawDraftContentState, RichUtils, getDefaultKeyBinding, convertToRaw, convertFromRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { TypeBold, TypeItalic, TypeUnderline, TypeStrikethrough, Code } from 'react-bootstrap-icons';


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
    );

    const submit = () => {
        handleSubmit(convertToRaw(editorState.getCurrentContent()));
        if(type === "add") setEditorState(EditorState.createEmpty());
    }

    const customKeyBindingFn = (event: KeyboardEvent) => {
        switch(event.key) {
            case 'Backspace':
                if(!editorState.getCurrentContent().hasText() && handleDelete !== undefined) {
                    return 'delete-item';
                } else {
                    return getDefaultKeyBinding(event);
                }
            case 'Enter':
                if(!event.shiftKey) {
                    event.preventDefault();
                    return 'submit-item';
                } else {
                    return getDefaultKeyBinding(event);
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

    const toggleInlineStyle = (style: string) => {
        const newState = RichUtils.toggleInlineStyle(editorState, style);
        setEditorState(newState);
    }

    const styleMap = {
        'STRIKETHROUGH': {
            textDecoration: 'line-through'
        },
        'CODE': {
            fontFamily: 'monospace',
            fontSize: '1rem',
            color: 'var(--pink)'
        }
    }


    const editor = (
        <Editor
            editorState={editorState}
            customStyleMap={styleMap}
            autoComplete="off"
            spellCheck={false}
            placeholder={placeholder}
            onChange={setEditorState}
            handleKeyCommand={handleKeyCommand}
            keyBindingFn={customKeyBindingFn}
            onBlur={onBlur}
        />
    );

    const editingControls = (
        <Popover id="editingControls">
            <Popover.Content>
                <Button
                    variant="light"
                    onClick={() => { toggleInlineStyle('BOLD') }}
                >
                    <TypeBold />
                </Button>
                <Button
                    variant="light"
                    onClick={() => { toggleInlineStyle('ITALIC') }}
                >
                    <TypeItalic />
                </Button>
                <Button
                    variant="light"
                    onClick={() => { toggleInlineStyle('UNDERLINE') }}
                >
                    <TypeUnderline />
                </Button>
                <Button
                    variant="light"
                    onClick={ () => { toggleInlineStyle('STRIKETHROUGH') }}
                >
                    <TypeStrikethrough />
                </Button>
                <Button
                    variant="light"
                    onClick={ () => { toggleInlineStyle('CODE') }}
                >
                    <Code />
                </Button>
            </Popover.Content>
        </Popover>
    );


    return (
        <div className="editText">
            {
                type === "edit"
                ?
                <OverlayTrigger
                    trigger="focus"
                    placement="top"
                    overlay={editingControls}
                >
                    {editor}
                </OverlayTrigger>
                :
                editor
            }
        </div>
    );
}

export default EditText;
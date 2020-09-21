import React, { useState, FocusEvent, KeyboardEvent } from 'react';
import { OverlayTrigger, Popover, Button } from 'react-bootstrap';
import { Editor, EditorState, RawDraftContentState, RichUtils, getDefaultKeyBinding, convertToRaw, convertFromRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { TypeBold, TypeItalic, TypeUnderline, TypeStrikethrough, Code } from 'react-bootstrap-icons';


type EditTextProps = {
    start: RawDraftContentState,
    placeholder?: string,
    handleSubmit: (value: RawDraftContentState) => void
}

const EditText = ({start, placeholder, handleSubmit}: EditTextProps) => {
    const [editorState, setEditorState] = useState(
        () => EditorState.createWithContent(convertFromRaw(start)),
    );

    const submit = () => {
        handleSubmit(convertToRaw(editorState.getCurrentContent()));
    }

    const customKeyBindingFn = (event: KeyboardEvent) => {
        switch(event.key) {
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
        if(command === "submit-item") {
            submit();
            (document.activeElement! as HTMLDivElement).blur();
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
            <OverlayTrigger
                trigger="focus"
                placement="top"
                overlay={editingControls}
            >
                {editor}
            </OverlayTrigger>
        </div>
    );
}

export default EditText;
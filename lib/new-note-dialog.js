"use babel";

import React, { useState, useEffect, useCallback } from "react";
import { useModal } from "inkdrop";

import { createNoteInBook } from "./notes";

const NewNoteSelectFolderDialog = (props) => {
    const [filterBy, setFilterBy] = useState("");
    const [text, setText] = useState();
    const [selectedBookId, setSelectedBookId] = useState(false);
    const modal = useModal();
    const { Dialog, NotebookListBar } = inkdrop.components.classes;

    useEffect(() => {
        const subscription = inkdrop.commands.add(document.body, {
            "note-from-selection:toggle-dialog": toggle,
        });
        return () => subscription.dispose();
    }, []);

    const toggle = useCallback(({ detail }) => {
        setText(detail.text);
        modal.show();
    }, []);

    const save = async () => {
        await createNoteInBook(text, selectedBookId);
        close();
    };

    const close = () => {
        modal.close();
        setTimeout(() => {
            setFilterBy("");
            setSelectedBookId(false);
        }, 500);
    };

    return (
        <Dialog {...modal.state} onBackdropClick={close}>
            <Dialog.Title>Select notebook for new note</Dialog.Title>
            <Dialog.Content>
                <div className="ui message">Select a notebook</div>
                <div className="ui form">
                    <div className="field">
                        <NotebookListBar onItemSelect={setSelectedBookId} />
                    </div>
                </div>
            </Dialog.Content>
            <Dialog.Actions>
                <button className="ui button" onClick={close}>
                    Close
                </button>
                <button
                    className="ui button"
                    disabled={!selectedBookId}
                    onClick={save}
                >
                    OK
                </button>
            </Dialog.Actions>
        </Dialog>
    );
};

export default NewNoteSelectFolderDialog;

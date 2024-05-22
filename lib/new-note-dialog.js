"use babel";

import React, { useState, useEffect, useCallback } from "react";
import { useModal } from "inkdrop";

import { createNoteInBook } from "./notes";

const NewNoteSelectFolderDialog = (props) => {
    const [text, setText] = useState();
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

    const handleNotebookSelect = useCallback(
        async (notebookId) => {
            await createNoteInBook(text, notebookId);
            modal.close();
        },
        [text],
    );

    return (
        <Dialog
            {...modal.state}
            large
            onBackdropClick={modal.close}
            onEscKeyDown={modal.close}
        >
            <Dialog.Title>Select notebook for new note</Dialog.Title>
            <Dialog.Content className="flex">
                <NotebookListBar onItemSelect={handleNotebookSelect} />
            </Dialog.Content>
        </Dialog>
    );
};

export default NewNoteSelectFolderDialog;

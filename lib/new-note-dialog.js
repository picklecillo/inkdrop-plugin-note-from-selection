"use babel";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { useModal } from "inkdrop";

import { sortBooks, sortBooksWithPath } from "./books";
import { createNoteInBook } from "./notes";

const NewNoteSelectFolderDialog = (props) => {
    const { books } = inkdrop.main.dataStore.getLocalDB();
    const [filterBy, setFilterBy] = useState("");
    const [booksJSON, setBooksJSON] = useState();
    const [sortedBooks, setSortedBooks] = useState();
    const [booksWithPath, setBooksWithPath] = useState();
    const [text, setText] = useState();
    const [selectedBookId, setSelectedBookId] = useState(false);
    const modal = useModal();
    const { Dialog } = inkdrop.components.classes;
    const inputRef = useRef(null);

    useEffect(() => {
        const subscription = inkdrop.commands.add(document.body, {
            "note-from-selection:toggle-dialog": toggle,
        });
        return () => subscription.dispose();
    }, []);

    useEffect(() => {
        books.allAsJSON().then((books) => {
            setSortedBooks(sortBooks(JSON.parse(books)));
            setBooksWithPath(sortBooksWithPath(JSON.parse(books)));
        });
    }, [books]);

    const toggle = useCallback(({ detail }) => {
        setText(detail.text);
        modal.show();
        inputRef.current.focus();
    }, []);

    const selectBook = (item) => {
        const bookId = item.target.getAttribute("data-value");
        setSelectedBookId(bookId);
    };

    const renderBookItem = (book) => {
        return (
            <div
                className={`item content withWhite ${
                    selectedBookId == book["_id"] ? "active" : ""
                }`}
                id={book["_id"]}
                data-value={book["_id"]}
                onClick={selectBook}
            >
                {book["path"] ?? book["name"]}
            </div>
        );
    };

    const filterBooks = (books) => {
        return books.filter((book) =>
            book["name"].toLowerCase().includes(filterBy.toLowerCase()),
        );
    };

    const renderBookItems = () => {
        if (!filterBy && sortedBooks) {
            return sortedBooks.map(renderBookItem);
        }

        if (filterBy && booksWithPath) {
            return filterBooks(booksWithPath).map(renderBookItem);
        }

        return <div>...</div>;
    };

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
                <div className="notebook-list-bar">
                    <div className="ui fluid left icon input">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={filterBy}
                            onChange={(input) => {
                                setFilterBy(input.target.value);
                            }}
                            ref={inputRef}
                        />
                        <i className="search icon"></i>
                    </div>
                    <div
                        className="list-bar ui middle aligned selection list "
                        tabindex="0"
                    >
                        {renderBookItems()}
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

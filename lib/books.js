const prependSpaceToName = (book, token, arr) => {
    book["name"] = token + book["name"];
};

const prependParentBookName = (book, token, arr) => {
    if (book["parentBookId"]) {
        const parent = arr.filter(
            (item) => item["_id"] == book["parentBookId"],
        )[0];
        if (!book["path"]) {
            book["path"] = book["name"];
        }
        if (!parent["path"]) {
            parent["path"] = parent["name"];
        }
        book["path"] = parent["path"] + " : " + book["path"];
    }
};

const traverse = (arr, book, token, defaultToken, bookModifier) => {
    bookModifier(book, token, arr);
    return arr
        .filter((item) => item["parentBookId"] === book["_id"])
        .reduce(
            (result, current) =>
                result.concat(
                    traverse(
                        arr,
                        current,
                        token + defaultToken,
                        defaultToken,
                        bookModifier,
                    ),
                ),
            [book],
        );
};

const sortBooks = (books) => {
    const rootBooks = books.filter(({ parentBookId }) => !parentBookId);
    const bookTree = rootBooks.reduce(
        (result, current) =>
            result.concat(
                traverse(books, current, "", "    ", prependSpaceToName),
            ),
        [],
    );

    return bookTree;
};

const sortBooksWithPath = (books) => {
    const rootBooks = books.filter(({ parentBookId }) => !parentBookId);

    const bookTree = rootBooks.reduce(
        (result, current) =>
            result.concat(
                traverse(books, current, "", "", prependParentBookName),
            ),
        [],
    );

    return bookTree;
};

module.exports = {
    sortBooks,
    sortBooksWithPath,
};

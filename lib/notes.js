function markdownLink(title, noteId) {
  const notePath = noteId.replace(":", "/");

  return `[](inkdrop://${notePath}) <!-- ${title} -->`;
}

function defaultNoteTitle(selection) {
  const titleLength = inkdrop.config.get(
    "note-from-selection.defaultTitleLength",
  );

  const firstLine = selection.split("\n")[0];
  return firstLine.substr(0, titleLength - 1);
}

function noteFromSelection(id, title, selection, bookId) {
  const body = selection.concat("\n");

  return {
    _id: id,
    bookId,
    title,
    body,
    doctype: "markdown",
    updatedAt: Date.now(),
    createdAt: Date.now(),
  };
}

async function createNoteInBook(text, bookId) {
  var editor = inkdrop.getActiveEditor().cm;
  const db = inkdrop.main.dataStore.getLocalDB();
  const notes = db.notes;

  const newNoteId = await notes.createId();
  const title = defaultNoteTitle(text);

  var newNote = noteFromSelection(newNoteId, title, text, bookId);

  await notes.put(newNote);

  editor.doc.replaceSelection(markdownLink(title, newNoteId));
}

async function createNoteInCurrentBook(text) {
  const { editingNote } = inkdrop.store.getState();
  const bookId = editingNote.bookId;

  await createNoteInBook(text, bookId);
}

module.exports = {
  createNoteInCurrentBook,
  createNoteInBook,
};

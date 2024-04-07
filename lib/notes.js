function markdownLink(text, noteId) {
  return `[${text}](inkdrop://${noteId})`;
}

function noteFromSelection(id, selection, bookId) {
  const newNoteTitle = selection.substr(0, 127);
  const newNoteBody = selection.concat("\n");

  return {
    _id: id,
    bookId: bookId,
    title: newNoteTitle,
    body: newNoteBody,
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
  var newNote = noteFromSelection(newNoteId, text, bookId);

  await notes.put(newNote);

  editor.doc.replaceSelection(markdownLink(text, newNoteId));
}

async function createNoteInCurrentBook(text) {
  const { editingNote } = inkdrop.store.getState();
  const bookId = editingNote.bookId;

  await createNoteInBook(text, bookId);
}

module.exports = {
  markdownLink,
  createNoteInBook,
  createNoteInCurrentBook,
};

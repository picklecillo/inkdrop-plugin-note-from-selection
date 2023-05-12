function markdownLink(selection, noteId) {
  return `[${selection}](inkdrop://${noteId})`;
}

function noteFromSelection(id, selection, bookId) {
  const newNoteTitle = selection.substr(0, 127);
  const newNoteBody = selection.substr(128);

  return {
    _id: id,
    bookId: bookId,
    title: newNoteTitle,
    body: "..." + newNoteBody,
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
  const newNote = noteFromSelection(newNoteId, text, bookId);
  notes.put(newNote);

  editor.doc.replaceSelection(markdownLink(text, newNoteId));

  return newNoteId;
}

async function createNoteInCurrentBook(text) {
  const { editingNote } = inkdrop.store.getState();
  const bookId = editingNote.bookId;

  const newNoteId = await createNoteInBook(text, bookId);
  return newNoteId;
}

module.exports = {
  markdownLink,
  createNoteInBook,
  createNoteInCurrentBook,
};

function markdownLink(text, noteId) {
  return `[${text}](inkdrop://${noteId})`;
}

function linksSection(links) {
  var contents = "\n# Links\n";

  for (var link of links) {
    contents = contents.concat("* ", link, "\n");
  }

  return contents;
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

async function addBackLinkToParent(note) {
  const { editingNote } = inkdrop.store.getState();

  note.body = note.body.concat(
    linksSection([markdownLink(editingNote.title, editingNote._id)]),
  );
}

async function createNoteInBook(text, bookId) {
  var editor = inkdrop.getActiveEditor().cm;
  const db = inkdrop.main.dataStore.getLocalDB();
  const notes = db.notes;

  const newNoteId = await notes.createId();
  var newNote = noteFromSelection(newNoteId, text, bookId);

  const createBacklinkOnNewNote = inkdrop.config.get(
    "note-from-selection.createBacklinkOnNewNote",
  );

  if (createBacklinkOnNewNote) {
    addBackLinkToParent(newNote);
  }
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

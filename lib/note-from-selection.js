'use babel';

function markdownLink(selection, noteId) {
  return `[${selection}](inkdrop://${noteId})`
}

function noteFromSelection(id, selection) {
  const newNoteTitle = selection.substr(0, 127);
  const newNoteBody = selection.substr(128);

  const { editingNote } = inkdrop.store.getState();

  return {
    "_id": id,
    "bookId": editingNote.bookId,
    "title": newNoteTitle,
    "body": "..." + newNoteBody,
    "doctype": "markdown",
    "updatedAt": Date.now(),
    "createdAt": Date.now(),
  };
}

module.exports = {
  create(note) {
    var editor = global.inkdrop.getActiveEditor().cm;

    const selectedText = editor.doc.getSelection();

    const db = inkdrop.main.dataStore.getLocalDB();
    const notes = db.notes;

    const newNoteId = notes.createId();
    const newNote = noteFromSelection(newNoteId, selectedText);
    notes.put(newNote);

    editor.doc.replaceSelection(markdownLink(selectedText, newNoteId));
  },
  activate() {
    this.editorSubscription = inkdrop.commands.add(document.body, {
        'note-from-selection:create': this.create,
      });
  },
  deactivate() {
    this.editorSubscription.dispose();
  }
};

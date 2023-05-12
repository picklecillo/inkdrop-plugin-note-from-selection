"use babel";

import NewNoteSelectFolderDialog from "./new-note-dialog";

import { createNoteInCurrentBook, markdownLink } from "./notes";

let commandListener = null;

async function createWithModal(note) {
  var editor = global.inkdrop.getActiveEditor().cm;

  const selectedText = editor.doc.getSelection();

  inkdrop.commands.dispatch(
    document.body,
    "note-from-selection:toggle-dialog",
    { text: selectedText },
  );
}

function create(note) {
  var editor = global.inkdrop.getActiveEditor().cm;

  const selectedText = editor.doc.getSelection();

  const newNoteId = createNoteInCurrentBook(selectedText);
}

module.exports = {
  activate() {
    inkdrop.components.registerClass(NewNoteSelectFolderDialog);
    inkdrop.layouts.addComponentToLayout("modal", "NewNoteSelectFolderDialog");

    commandListener = inkdrop.commands.add(document.body, {
      "note-from-selection:create": create,
      "note-from-selection:createWithModal": createWithModal,
    });
  },
  deactivate() {
    inkdrop.layouts.removeComponentFromLayout(
      "modal",
      "NewNoteSelectFolderDialog",
    );
    inkdrop.components.deleteClass(NewNoteSelectFolderDialog);
    commandListener.dispose();
  },
};

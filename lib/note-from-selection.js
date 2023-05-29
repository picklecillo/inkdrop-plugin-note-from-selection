"use babel";

import NewNoteSelectFolderDialog from "./new-note-dialog";

import { createNoteInCurrentBook } from "./notes";

let commandListener = null;

const config = {
  createBacklinkOnNewNote: {
    title: "Create backlink on the new note",
    description: "Create link to parent note on newly created one",
    type: "boolean",
    default: true,
  },
};

async function createWithModal() {
  var editor = global.inkdrop.getActiveEditor().cm;

  const selectedText = editor.doc.getSelection();

  inkdrop.commands.dispatch(
    document.body,
    "note-from-selection:toggle-dialog",
    { text: selectedText },
  );
}

function create() {
  var editor = global.inkdrop.getActiveEditor().cm;

  const selectedText = editor.doc.getSelection();

  createNoteInCurrentBook(selectedText);
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
  config,
};

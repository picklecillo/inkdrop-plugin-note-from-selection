"use babel";

import NewNoteSelectFolderDialog from "./new-note-dialog";

import { createNoteInCurrentBook } from "./notes";

let commandListener = null;

const config = {
  defaultTitleLength: {
    title: "Default selection length for new note title",
    description: "New note title defaults to the first 80 chars of selected content",
    type: "number",
    default: 80,
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

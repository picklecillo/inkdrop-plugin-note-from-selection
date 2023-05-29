# Inkdrop plugin: New note from selected text

Create a new note from selected text
Wraps selection with link to new note

## Commands

* **For all new notes**: The first 128 characters are used for the note's title. All selected text goes into the new note's body.

### New note on the same notebook
* Creates a new note on the same notebook for the active note
* Mapped to `cmd-shift-e`

### New note on a different notebook
* Displays a modal for notebook selection
* Mapped to `cmd-shift-ctrl-e`


## Config Options

### Create backlink on the new note (`createBacklinkOnNewNote`)
Disable to skip creating a link to the parent of the new note.


## TO DO

* [x] Shortcut for note on the same notebook
* [x] Secondary command shows modal for notebook selection
* [x] Link to parent note
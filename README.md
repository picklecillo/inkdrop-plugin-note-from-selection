# Inkdrop plugin: New note from selected text

Create a new note from selected text
Wraps selection with link to new note

## Commands

* **For all new notes**: Selected text is split into title and body for the new note
    * 128 characters for the title
    * the rest goes to the body

### New note on the same notebook
* Creates a new note on the same notebook for the active note
* Mapped to `cmd-shift-e`

### New note on a different notebook
* Displays a modal for notebook selection
* Mapped to `cmd-shift-ctrl-e`

## TO DO

* [x] Shortcut for note on the same notebook
* [x] Secondary command shows modal for notebook selection

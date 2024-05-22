# Inkdrop plugin: New note from selected text

Create a new note from selected text
Wraps selection with link to new note


## Commands

### New note on the same notebook
* Creates a new note on the same notebook for the active note
* Mapped to `cmd-shift-e`

### New note on a different notebook
* Displays a modal for notebook selection
* Mapped to `cmd-shift-ctrl-e`


## App's new core features
[Inkdrop `v5.8.0` introduces its own New Note from Selection feature](https://forum.inkdrop.app/t/inkdrop-desktop-v5-8-0/4511#create-a-new-note-from-the-selection-4) that will create a new sibling note from selected text but only after prompting the user for the new note's name.

Because of this, I'm updating this plugin so it provides commands to create a note from selection:
* with a default name (more on that below)
* on a different notebook

`v5.8.0` also brings a new panel on top of the preview pane with all the [backlinks to the current note](https://forum.inkdrop.app/t/inkdrop-desktop-v5-8-0/4511#backlinks-2), So I'm also removing the backlink option, as the core feature is a lot better.


## About new note names
* **For all new notes**: The first 80 (default config) characters of the first line of selection will be used for the note's title. All selected text will go into the new note's body.
* The link to the new note will have no title, so the previewed link still shows the referenced note's status and tags even if the name changes. Also, the new note's title will be added as a comment after the link, to make it easier to identify while editing, like this:
    ```
    [](inkdrop://note:<noteId>)  <!-- First line of selection and new note title -->
    ```


* **Note**: As long as the link text remains blank, it will keep the reflecting the latest title, status and tags of the referenced note in previews, but setting it to something else will break that and it will no longer show status or tags. (Maybe this changes in future versions of the app?)


## Config Options

### [REMOVED] Create backlink on the new note (`createBacklinkOnNewNote`)
Disable to skip creating a link to the parent of the new note.

### Default selection length for new note title (`defaultTitleLength`)
New note title max length defaults to the first 80 chars of the first line of selected text

## TO DO

* [x] Shortcut for note on the same notebook
* [x] Secondary command shows modal for notebook selection
* [x] Link to parent note
* [x] Remove backlinks option
* [x] Leave link text blank and set note title as comment after

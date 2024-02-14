
import { useState } from 'react';
import NoteContext from './noteContest';
//import { json } from 'react-router-dom';

const NoteState = (props) => {
    const host = 'http://localhost:8000'
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial);

    // Get all Note
    const getNote = async () => {
        // API Call 
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }

        });
        const json = await response.json()
        console.log(json)
        setNotes(json)
    }

    // Add Note
    const addNote = async (title, description, tag) => {
        // API Call 
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})
        });

        const note = await response.json();
        setNotes(notes.concat(note))
    }

    // Deleat a note
    const deleteNote = async (id) => {
        // API Call 
        const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }

        });
        const json = await response.json();
        console.log(json)

        console.log("deleting the note with id" + id);
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes);
    }
    //Update a Note
    const updateNote = async (id, title, description, tag) => {
        // API Call 
        const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();
        console.log(json)

        // Logic to update in client
        let newNote = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < newNote.length; index++) {
            const element = newNote[index];
            if (element._id === id) {
                element.title = title;
                element.description = description;
                element.tag = tag; 
            }

        }
        setNotes(newNote);
    }
    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, updateNote, getNote }}>
            {props.children}
        </NoteContext.Provider>
    )

}

export default NoteState;
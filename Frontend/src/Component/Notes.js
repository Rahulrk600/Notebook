
import React, { useContext, useEffect, useRef,useState } from 'react'
import noteContext from '../Context/notes/noteContest';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
    let navigate = useNavigate();
    const context = useContext(noteContext);
    const { notes, getNote, updateNote } = context;

    useEffect(() => {
        if(localStorage.getItem('token')){
            getNote();
        }
        else{
       navigate("/login");
        }
         // eslint-disable-next-line
    }, [])
    const ref = useRef(null)
    const refclose = useRef(null);
    const [note, setNote] = useState({id: '', etitle: '',edescription:'', etag:''})

    const editNote = (currentNote) => {
        ref.current.click();
        setNote({id: currentNote._id ,etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag} );
       
    }
    const handleclick = (e)=>{
        console.log("update ",note)
        updateNote(note.id, note.etitle, note.edescription, note.etag)
        refclose.current.click();
        props.showAlert("Updated Successfully", "success")
            
    }

    const change = (e)=>{
        setNote({...note,[e.target.name]: e.target.value})
    }

    return (
        <>
            <AddNote showAlert={props.showAlert} />

            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                        <form className='my-3'>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">title</label>
                        <input type="text" className="form-control" id="etitle" name='etitle'
                         value={note.etitle}
                        aria-describedby="emailHelp" onChange={change} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="edescription" name='edescription'
                          value={note.edescription}
                        onChange={change} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="etag" name='etag'
                         value={note.etag}
                        onChange={change} />
                    </div>
                    
                </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled= {note.etitle.length<3 || note.edescription.length<5} onClick={handleclick} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container'>
            <div className='row my-3 '>
                <h2>Your Notes</h2>
                <div>
                {notes.length=== 0 && ' No notes to display'}
                </div>
                {notes.map((note) => {
                    return <NoteItem key={note._id} updateNote={editNote} showAlert={props.showAlert} note={note} />
                })}
            </div>
            </div>
        </>
    )
}

export default Notes

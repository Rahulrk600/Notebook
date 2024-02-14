import React,{useContext, useState} from 'react'
import noteContext from '../Context/notes/noteContest';

const AddNote = (props) => {
    const context = useContext(noteContext);
    const {addNote } = context;
    const [note, setNote] = useState({title: '',description:'', tag:''})
    const handleclick = (e)=>{
        e.preventDefault();
            addNote(note.title, note.description, note.tag);
            setNote({title: '',description:'', tag:''})
            props.showAlert("Added Successfully", "success")
    }

    const change = (e)=>{
        setNote({...note,[e.target.name]: e.target.value})
    }

    return (
        <div>
            <div className=' container my-1'>
                <h2>Add Notes</h2>
                <form className='my-3'>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" value={note.title} onChange={change} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name='description' value={note.description} onChange={change} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={change} />
                    </div>
                    <button disabled= {note.title.length<3 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleclick} >Add Note</button>
                </form>
            </div>


        </div>
    )
}

export default AddNote

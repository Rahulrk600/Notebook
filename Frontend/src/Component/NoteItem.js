import React,{useContext} from 'react'
import { Link } from 'react-router-dom';
import noteContext from '../Context/notes/noteContest';

const NoteItem = (props) => {
    const context = useContext(noteContext);
    const {deleteNote } = context;
    const { note , updateNote } = props;
    return (
        <div className='col-md-2'>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <div className="d-flex justify-content-evenly">
                        <Link><p onClick={()=>(deleteNote(note._id))}>Deleat</p></Link>
                        <Link><p onClick={()=>{updateNote(note)}}>Update</p></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NoteItem

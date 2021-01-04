import React,{useContext} from 'react'
import NotesIcon from '@material-ui/icons/Notes';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import './notes-style/variables.css'
import './styles/timeline.css'
import { AuthContext } from './context/AuthContext';

function Timeline({notes}) {

  const {user} = useContext(AuthContext);
    
    const noteUl = document.querySelector("ul.active");
    let foundNote;
    let id;
    if(noteUl){
       id = noteUl.getAttribute("data-note-id")
    }
// new Date().toUTCString
    if(id){
        foundNote = notes.find(e => e.id === id);
    }

    return (
        <div className="timeline">
            
            <div className="time-side">
                <div className="time-header">INFO</div>
                <div>
                    <h4 style={{marginBottom:'0'}}>Modified</h4>
                    <p className="timing" style={{marginTop:'5px'}}>{foundNote && foundNote.time}</p>
                </div>
                <div className="word">
                   <span> { foundNote  && foundNote.note.replace( /(<([^>]+)>)/ig, ' ').trim().replace(/\s+/g, ' ').split(' ').length } Words</span> 
                </div>
                <div className="characters" style={{margin:'10px 0px'}}>
                   <span>{foundNote && foundNote.note.replace( /(<([^>]+)>)/ig, '').replace(/\s+/g, '').length} characters</span> 
                </div>
                <div className="Author">
                   <span>{user && user.name}</span> 
                </div>
                
            </div>
           
            <span className="close-side-right" onClick={() => {document.querySelector(".timeline").classList.remove("show-time")
            document.querySelector(".root").classList.remove("opac")

        }
        }>&times;</span>
        </div>
    )
}

export default Timeline

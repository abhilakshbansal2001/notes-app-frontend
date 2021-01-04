import React,{useState,useEffect,useContext} from 'react';
// import {useHistory} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import Container from '@material-ui/core/Container';
import './notes-style/variables.css'
import './notes-style/header-left-top.css'
import './notes-style/header-right-top.css'
import './notes-style/notes-list.css'
import './notes-style/notes-content.css'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {Editor, EditorState} from 'draft-js';
import 'draft-js/dist/Draft.css';
import Setting from './setting'
import uniqid from 'uniqid';
import {Link, useHistory} from 'react-router-dom'
import AddIcon from '@material-ui/icons/Add';
import HistoryIcon from '@material-ui/icons/History';
import ShareIcon from '@material-ui/icons/Share';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import FormatBoldOutlinedIcon from '@material-ui/icons/FormatBoldOutlined';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import LinkIcon from '@material-ui/icons/Link';
import ListIcon from '@material-ui/icons/List';
import ClearIcon from '@material-ui/icons/Clear';
import Timeline from './timeline';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import SaveIcon from '@material-ui/icons/Save';
import { AuthContext } from './context/AuthContext';
import DocServices  from './services/DocServices';
import AuthService from './services/AuthService';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

function Trash({trash,setTrash,setNotes,notes,state,setState}) {

  const history = useHistory()
  const {isAuthenticated,user,setIsAuthenticated,setUser} = useContext(AuthContext);

  useEffect(()=>{
    DocServices.getDocs().then(data =>{
      console.log("<<<<<<",data);
      if(data && !data.message.msgError){
      setNotes(data.notes.notes)
      setTrash(data.notes.trash)
      
      setIsAuthenticated(data.isAuthenticated)}
      

    });
  
      AuthService.isAuthenticated().then(data =>{
          setUser(data.user);
          setIsAuthenticated(data.isAuthenticated);
          if(!data.isAuthenticated){
            history.replace("/form")
          }
      

      });

      
      console.log(isAuthenticated);
  
},[]);
    const [value, setValue] = useState('');
  const [search, setSearch] = useState();
  
  const [trashDocs, setTrashDocs] = useState(trash ? trash : []);

  const classes = useStyles();
  
  const [sampleCondition, setsampleCondition] = useState(false)
  // let sampleCondition = false


  const [editorState, setEditorState] = React.useState(
    () => EditorState.createEmpty(),
  );
  useEffect(() => {
    if(!search){
      setTrashDocs(trash)
    }
  }, [trash])

  useEffect(() => {
    const editor1 = document.querySelector(".ql-editor")
    // if(editor1)
    // editor1.style.height="78vh"
    const toolbar = document.querySelector(".ql-toolbar")
    if(!sampleCondition){
    editor1.contentEditable = false;
    toolbar.style.display= 'none';
    // editor1.innerHTML = '<div><img src="./images/addtrash.svg" alt="Write Note" className="note-img" /> </div>'
}
else {
  editor1.contentEditable = true;

  toolbar.style.display= 'block';
}
    
  }, [sampleCondition])
  const [tags, setTags] = useState([])
  

  function addTag(e){
    e.preventDefault();
    const input = document.getElementById("tag-input")
    if(input.value)
    setTags(prev => {
      return [...prev , input.value ]
    })
    input.value = '';
  }
  function removeTag(e){
    const tag = e.target.getAttribute('data-tag')
    setTags(prev => {
      return prev.filter(e => e !== tag)
    })
    console.log(tag);
  }

  useEffect(() => {

    const noteUl = document.querySelector("ul.active");
    let id;
    if(noteUl){
       id = noteUl.getAttribute("data-note-id")
    }
    if(trashDocs && trash){
   
    const find = trashDocs.findIndex(e => e.id === id);
    const findN = trash.findIndex(e => e.id === id);
    let newArr = [...trash]; 
    let newDocsArr = [...trashDocs]
    
    if(findN && newArr[findN]){
      newArr[findN].tags = tags;

    }
    if(find && newDocsArr[find]){
      newDocsArr[find].tags = tags;
      postAddOrDelete(newDocsArr)
    }
    setTrash(newArr);
    setTrashDocs(newDocsArr)}
    
  }, [tags])

  function toggleMenu(){
    const leftSide = document.querySelector(".setting")
    leftSide.classList.add("show")
    document.querySelector(".root").classList.add("opac")
  }
  function toggleTime(){
    const leftSide = document.querySelector(".timeline")
    leftSide.classList.add("show-time")
    // document.body.classList.add("show-time")
    document.querySelector(".root").classList.add("opac")
  }
  function input(id) {
    const ul = document.getElementById(id);
    trashDocs.forEach(el => {
      const noteId =  document.getElementById(el.id);
      if(noteId)
      noteId.classList.remove("active")
    })
    ul.classList.add("active");
    const noteFound = trashDocs.find((e) => e.id  === id );
    // console.log(noteFound);
    const editor = document.querySelector(".ql-editor");
    console.log("clicked");
    setValue(noteFound.note)
    editor.focus()
    setTags(noteFound.tags)

  }

  function activeList(e) {
    
    const id = e.target.getAttribute('data-note-id')
    // input(id)
    

      // setValue("hello")
    setsampleCondition(true)
    input(id)

  }

  useEffect(() => {
    setValue('');
    // function searchChange(el){
    const doc = trashDocs.filter(e => e.note.includes(search))
    if(!doc){
      
    }
    if(!search){
      setTrash(trashDocs)
      setsampleCondition(false)
      trashDocs.forEach(el => {
        const noteId =  document.getElementById(el.id);
        if(noteId)
        noteId.classList.remove("active")
      })

    }
    if(doc && search){
      
      setsampleCondition(false)
      trash.forEach(el => {
        const noteId =  document.getElementById(el.id);
        if(noteId)
        noteId.classList.remove("active")
      })
      setTrash(doc)
      // console.log(trash);

    }
    else{
      
    }
  // }
  }, [search])
  

  useEffect(() => {
    const noteUl = document.querySelector("ul.active");
    let id;
    if(noteUl){
       id = noteUl.getAttribute("data-note-id")
    }
    // setTrash(prev => {
    //   return (
    //     // trash.find(note => note.id === id )
    //   )
    // })
    if(trashDocs && trash){
    const find = trashDocs.findIndex(e => e.id === id);
    const findN = trash.findIndex(e => e.id === id);
    // find.note = value
    let newArr = [...trash]; // copying the old datas array

    let newDocArr = [...trashDocs];

    const text = document.querySelector(".save");
    if(text)
    text.innerHTML = "Save";
    
    // console.log(id,"<><>",find);
    
    if(find && newDocArr[find]){
    newDocArr[find].note = value;
   }
    if(find && newArr[findN]){
      newArr[findN].note = value;

    }
  
    // console.log(value);
    setTrash(newArr);
    setTrashDocs(newDocArr);
  }

  }, [value])

//   function addNote(){
//     const id = uniqid()
//     const note =
//       {
//         id,
//         tittle:'Your New Note',
//         tags:[],
//         note:'<p><h1>New Note </h1></p>'
//     }
//     setTrash(prev => {
//       return [...prev , note]
//     })
//     const f = trash.find(e => e.id === id)
//     if(f)
//     setTimeout(document.getElementById(id).click(),100)
//   }

  function deleteForever(){
    const noteUl = document.querySelector("ul.active");
    let id;
    if(noteUl){
       id = noteUl.getAttribute("data-note-id")
    }
    
    let newArr = [...trash]; 
    let newDocsArr = [...trashDocs]



    if(id && id !== '18' ){



      newArr = newArr.filter(e => e.id !== id )
      newDocsArr = newDocsArr.filter(e => e.id !== id )
      
    setTrash(newArr);
    setTrashDocs(newDocsArr)

    trashDocs.forEach(el => {
      const noteId =  document.getElementById(el.id);
      if(noteId)
      noteId.classList.remove("active")
    })
    postAddOrDelete(newDocsArr);

    setValue('')
    setsampleCondition(false)

}
  }

  function recover(){
    const noteUl = document.querySelector("ul.active");
    let id;

    if(noteUl){
        id = noteUl.getAttribute("data-note-id")
     }
    let newArr = [...trashDocs]; 

    let Data = [...notes]
     if(id && id !== '18' ){


        let recoverData = newArr.find(e => e.id === id )
        // postAddOrDelete(recoverData)
      Data.push(recoverData)
  
      setNotes(prev => {
          return [...prev , recoverData]
      })
      recoverNote(Data)

      deleteForever();
  }


  }



  function recoverNote(note){
    let data;

    data ={ 
      doc_id:user.doc_id,
     notes:note 
 }
 DocServices.postNote(data)

  }


  function postAddOrDelete(arr){
    let data;

     data ={ 
      doc_id:user.doc_id,
      trash:arr 
  }
  DocServices.postTrash(data)
 
  }

  function postNewNote(){
    let data;

     data ={ 
      doc_id:user.doc_id,
      trash: trashDocs 
  }
  DocServices.postTrash(data)
 
  }

  async function saveNote(){
    const text = document.querySelector(".save");
    text.innerHTML = "Saving";
    const update = await postNewNote();
    if(update){
      text.innerHTML="Saved";
    }
  }
 

  return (
    <div className={classes.root}>
      <Setting tags={tags} setState={setState} state={state} notes={notes} setNotes={setNotes} trash={trash} setTrash={setTrash} />

        <Container className="root" style={{height:"100vh",padding:'0'}}>
      <Grid container spacing={3} style={{height:'100%'}} >
        <Grid item xs={4} className="header-left-container">
          <MenuIcon className={"hamburger"} onClick={toggleMenu}  style={{marginLeft:'10px'}} />
          <input type="text" className="header-left-container-search w-75" value={search} onChange={(e) =>  setSearch(e.target.value) }  placeholder="Search " />
          
        </Grid>

        <Grid item xs={8}  className="header-right-container">

      
           
              
              <div><h3>VN</h3></div>

              {sampleCondition && <div style={{marginLeft:"auto",display:"flex"}}>
              <div className={"save-btn"} onClick={saveNote}>
                <SaveIcon className={"icon-header"} ></SaveIcon>
                  <span className={"save"}>SAVE</span>
                </div>
              <ButtonGroup size="large" color="primary" onClick={recover}  aria-label="large outlined button group">
                    <Button>Recover</Button>
               </ButtonGroup>
              <ButtonGroup size="large" color="secondary"  style={{margin:'0px 10px'}} aria-label="large outlined primary button group">
                    <Button onClick={deleteForever}>Delete Forever</Button>
               </ButtonGroup>
              </div>}
           
            

          
        </Grid>
          
        
        <Grid xs={4} className="notes-list" > 


       
           {trash && trash.map(note => {
            return (<ul style={{listStyle:"none"}} id={note.id} onClick={activeList} data-note-id={note.id} >
             <li><h3 style={{margin:"0"}}  data-note-id={note.id} >{note.note.replace( /(<([^>]+)>)/ig, '').slice(0,24)}... </h3>
             <p style={{margin:"0"}} data-note-id={note.id} >{note.note.replace( /(<([^>]+)>)/ig, '').slice(24,45)}</p></li>
           </ul>)

           })}
           
         
        
      
        </Grid>
        <Grid xs={8} className="trash-content">
           
          

          
          
             
            <ReactQuill value={value} onChange={ () => {
              setValue(document.querySelector(".ql-editor").innerHTML)
            }} theme={'snow'}  />
            
          

     {sampleCondition && 
      <Grid xs={12} className={"tags"}>
        <div className={"tag-input"}>
          <div>TAGS:</div>
          
          <form>
              
              <input type="text" name="name" id="tag-input" style={{margin:"0"}} autoComplete="off" />
              <input type="submit" onClick={addTag} style={{display:"none"}} />
          </form>
        </div>
        <div className="tags-list">
          {tags.map(tag => {
            return(
          <div className="tag-item">{tag} <span className="close" data-tag={tag } onClick={removeTag} >&times;</span></div>
          )
          })}
        
        </div>
        </Grid>
}

        </Grid>
        
       </Grid>
       </Container>
    </div>
  );
}

export default Trash

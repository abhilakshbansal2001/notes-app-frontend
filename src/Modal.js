import React from 'react';
import ModalBox from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import ShareIcon from '@material-ui/icons/Share';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const buttonStyle = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

export default function Modal({notes ,id,activeId,postAddOrDelete,setNotes,docs,setDocs}) {
  const classes = useStyles();
  const btn = useStyles();
  const [open, setOpen] = React.useState(false);

  const modalOpen = () => {
    setOpen(true);
  };

  const modalClose = () => {
    setOpen(false);
  };
let note;
note = docs.find(el => el.id === activeId)
  function yes(){
      const newArr = [...notes];
      const newArrDocs = [...docs];

    const index =  notes.findIndex(e => e.id === activeId);
    const indexDoc =  docs.findIndex(e => e.id === activeId);
if(index){
    newArr[index].isShared = true;
    newArr[index].link = `http://localhost:3000/publish/${id}${activeId}`;
    setNotes(newArr)
    

}
if(indexDoc){
    newArrDocs[indexDoc].isShared = true;
    newArrDocs[indexDoc].link = `http://localhost:3000/publish/${id}${activeId}`;
    setDocs(newArrDocs)
    postAddOrDelete(newArrDocs);


}

  }

  function privateDoc(){
    const newArr = [...notes];
    const newArrDocs = [...docs];

  const index =  notes.findIndex(e => e.id === activeId);
  const indexDoc =  docs.findIndex(e => e.id === activeId);
    if(index){
    newArr[index].isShared = false;
    newArr[index].link = '';
    setNotes(newArr)
    

    }
if(indexDoc){
  newArrDocs[indexDoc].isShared = false;
  newArrDocs[indexDoc].link = '';
  setDocs(newArrDocs)
  postAddOrDelete(newArrDocs);


}

  }

  return (
    <div>
      
      <ShareIcon className={"icon-header"}  onClick={modalOpen} />
      <ModalBox
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={modalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Do you want to share it?</h2>
            <div id="transition-modal-description">
            <div className={btn.root}>

         {note && !note.isShared ?   <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                <Button onClick={yes}>Yes</Button>
                <Button onClick={modalClose}>No</Button>
                
            </ButtonGroup>
            :
            <>
            <h3>Make private</h3> 
            <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
                <Button onClick={privateDoc}>Private</Button>
                
            </ButtonGroup>  
            </> 
        }
            </div>
                <p>{note && note.isShared && note.link}</p>
           </div>
            
          </div>
        </Fade>
      </ModalBox>
    </div>
  );
}

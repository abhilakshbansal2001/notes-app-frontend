import React,{useContext} from 'react'
import NotesIcon from '@material-ui/icons/Notes';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import './notes-style/variables.css'
import './styles/setting.css'
import { withStyles } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {Link ,useHistory} from 'react-router-dom'
import { AuthContext } from './context/AuthContext';
import AuthService from './services/AuthService'

function Setting({tags,notes,setNotes,trash,setTrash}) {
    const history = useHistory();

        const [state, setState] = React.useState({
          
          checkedC: true
        });
         const {user , isAuthenticated,setUser,setIsAuthenticated} = useContext(AuthContext);
       
      
        const handleChange = (event) => {
          setState({ ...state, [event.target.name]: event.target.checked });
          console.log(state.checkedC);
        };

        if(state.checkedC){
            document.body.classList.add("dark")
            document.body.classList.remove("light")
        }else {
            document.body.classList.add("light")
            document.body.classList.remove("dark")
        }

        const AntSwitch = withStyles((theme) => ({
            root: {
              width: 28,
              height: 16,
              padding: 0,
              display: 'flex',
            },
            switchBase: {
              padding: 2,
              color: theme.palette.grey[500],
              '&$checked': {
                transform: 'translateX(12px)',
                color: theme.palette.common.white,
                '& + $track': {
                  opacity: 1,
                  backgroundColor: theme.palette.primary.main,
                  borderColor: theme.palette.primary.main,
                },
              },
            },
            thumb: {
              width: 12,
              height: 12,
              boxShadow: 'none',
            },
            track: {
              border: `1px solid ${theme.palette.grey[500]}`,
              borderRadius: 16 / 2,
              opacity: 1,
              backgroundColor: theme.palette.common.white,
            },
            checked: {},
          }))(Switch);

          const url = window.location.href.split('/')
         const addr = url[url.length - 1]
          
         function logout(){
          AuthService.logout().then(data=>{
            if(data.success){
                setUser(data.user);
                setIsAuthenticated(false);
            }
            history.replace("/")
        });
         }

    return (
        <div className="setting">

            <div className="upper-section">
            <Link  className="link-setting " to="/note">

                <div className="notes">
                    {addr === 'note' ? 
                    <>
                    <NotesIcon  className="icon-setting-link active" /> <span className="icon-text active">Notes</span> 
</>
                    : 
                    <>
                     <NotesIcon  className="icon-setting-link " /> <span className="icon-text ">Notes</span> 
</>
                    }
                </div>
                </Link>

                <div className="notes" onClick={logout} style={{cursor:"pointer"}}>
                    
                   
                    
                    <ExitToAppIcon className="icon-setting-link"  /> <span className="icon-text">LogOut</span>
                    
                    
              

                </div>

                <Link className="link-setting" to="/trash">
               


                <div className="notes">
                    {addr !== 'note' ? 
                    <><DeleteOutlineOutlinedIcon className="icon-setting-link active" /> <span className="icon-text active">Trash</span> </>
                    :
                    <><DeleteOutlineOutlinedIcon className="icon-setting-link" /> <span className="icon-text">Trash</span> </>
                    
                }
                </div>
                </Link>
            </div>
            <div className="tags-side">
                <div className="header">Tags</div>
                <ul className="tag-item-side">
                    {tags.map(e => {
                        return <li className="tags-list-side">{e}</li>
                    })}
                </ul>
            </div>
            <div className="dark-toggle">
            <div className="header">Theme</div>
            <FormGroup>
                
                <Typography component="div">
                    <Grid component="label" container alignItems="center" spacing={1}>
                    <Grid item>Light Mode</Grid>
                    <Grid item>
                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                    </Grid>
                    <Grid item>Dark Mode</Grid>
                    </Grid>
                </Typography>
                </FormGroup>
            </div>
            <span className="close-side-left" onClick={() => {document.querySelector(".setting").classList.remove("show")
            document.querySelector(".root").classList.remove("opac")

        }
        }>&times;</span>
        </div>
    )
}

export default Setting

import React ,{useState,useEffect,useContext} from 'react';
import Form from './Form'
import Home from './Home'
import Note from './Note'
import {BrowserRouter as Router , Switch , Route, useHistory, Link } from 'react-router-dom'
import Notes from './notes'
import Trashes from './trashes'
import Trash from './Trash';
import Publish from './Publish';



function App() {

  const history = useHistory();
  const [notes, setNotes] = useState([]);
  const [trash, setTrash] = useState();
  // const [user, setUser] = useState();
  // const [trash, setTrash] = useState();
  const [state, setState] = React.useState({
          
    checkedC: true
  });
 




  // if(isAuthenticated){
  //   history.replace("/note")
  // }
  
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path={'/'}>
            
            <h1>Home</h1>
            <Link to="/form">Login/signUp</Link>
          </Route>
      
          <Route path={'/form'}>
            <Form />
          </Route>

          <Route path={'/home'}>
            <Home />
          </Route>

          <Route path={'/note'}>
            <Note  notes={notes} state={state} setState={setState} setNotes={setNotes} trash={trash} setTrash={setTrash}  />
          </Route>
          <Route path={'/trash'}>
            <Trash  notes={notes} state={state} setState={setState} setNotes={setNotes} trash={trash} setTrash={setTrash} />
          </Route>
        <Route path={'/publish/:id'} render={(props) => <Publish {...props} notes={notes} />} />
          

      </Switch>
    </div>
    </Router>
    
  );
}

export default App;

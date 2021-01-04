import React,{useEffect,useState} from 'react'
import {useHistory} from 'react-router-dom'
import './styles/publish.css'
import './notes-style/variables.css'

const Publish = ({match,notes}) => {
    const noteId = match.params.id;
    const [data, setData] = useState()
    const [error, setError] = useState()
    const history = useHistory();

    useEffect(()=>{
        
            fetch("http://localhost:8000/publish/"+ noteId)
            .then(res => res.json())
            .then(dataEl => {
            console.log(dataEl);

                if(dataEl){
             setData(dataEl)
            
            }
             else{
            history.replace("/form")

             }              
            }).catch(err => {
                setError(err)
            history.replace("/form")

            })
    },[])

    // const noteF =  notes.find(note => note.id === noteId);


    
        
   


    useEffect(() => {
        console.log(data);
        if(data && !data.isShared){
            history.replace("/form")
        }
        // else if(!data){
        //     history.replace("/form")

        // }
        const publish = document.getElementById("publish");
        if(data && data !== 'No such document')
        publish.innerHTML = data.note.replace( /(<p><br><\/p>)/ig, '');
    }, [data])

    return (
        <div className="publish-note" id="publish">
            
        </div>
    )
}

export default Publish

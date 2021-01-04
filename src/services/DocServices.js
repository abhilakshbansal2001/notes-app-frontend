export default {
    getDocs : ()=>{
        return fetch('http://localhost:8000/user/note', {
            method: "GET",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
             
            },
            credentials: 'include'
          })
                .then(response=>{
                    if(response.status !== 401){
                        return response.json().then(data => data);
                    }
                    else
                        return {message : {msgBody : "UnAuthorized",msgError : true}};
                });
    },
    postNote: note=>{
        return fetch('http://localhost:8000/user/note',{
            method : "post",
            body : JSON.stringify(note),
            
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },  credentials: "include",
        }).then(response=>{
            if(response.status !== 401){
                return response.json().then(data => data);
            }
            else
                return {message : {msgBody : "UnAuthorized"},msgError : true};
        });
    },
    postTrash: trash=>{
        return fetch('http://localhost:8000/user/trash',{
            method : "post",
            body : JSON.stringify(trash),
            headers:{
                'Content-Type' : 'application/json'
            },  credentials: "include"
        }).then(response=>{
            if(response.status !== 401){
                return response.json().then(data => data);
            }
            else
                return {message : {msgBody : "UnAuthorized"},msgError : true};
        });
    }
}
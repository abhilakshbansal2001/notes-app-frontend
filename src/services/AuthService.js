
export default {
    login : user =>{
       
        return fetch('http://localhost:8000/user/login',{
            method : "post",
            
          
            headers: {
                
                'Content-Type': 'application/json',
                "Accept":"application/json"
              },  credentials: "include",
              body : JSON.stringify(user)
        }).then(res => {
            if(res.status !== 401)
                return res.json().then(data => data);
            else
                return { isAuthenticated : false, user : {username : "",doc_id : "",name:""}};
        })
    },
    register : user =>{
        console.log(user);
        return fetch('http://localhost:8000/user/register',{
            method : "post",
            body : JSON.stringify(user),
            headers : {
                'Content-Type' : 'application/json'
            },  credentials: "include"
        }).then(res => {
            if(res.status !== 401)
                return res.json().then(data => data);
            else
                return { isAuthenticated : false, user : {username : "",doc_id : "",name:""}};
        })
    },
    logout : ()=>{
        return fetch('http://localhost:8000/user/logout', {
            method: "GET",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
             
            },
            credentials: 'include'
          })
                .then(res => res.json())
                .then(data => data);
    },
    isAuthenticated : ()=>{
        return fetch('http://localhost:8000/user/authenticated', {
            method: "GET",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
             
            },
            credentials: 'include'
          })
                .then(res=>{
                    if(res.status !== 401)
                        return res.json().then(data => data);
                    else
                        return { isAuthenticated : false, user : {username : "",doc_id : "",name:""}};
                });
    }

}
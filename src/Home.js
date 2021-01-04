import React,{useContext} from 'react'
import { AuthContext } from './context/AuthContext';

function Home() {
const {isAuthenticated,user,setIsAuthenticated,setUser} = useContext(AuthContext);
console.log(isAuthenticated,user);
    return (
        <div>
            Home
        </div>
    )
}

export default Home

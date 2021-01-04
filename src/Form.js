import React,{useEffect,useContext,useState} from 'react'
import { useFormik } from 'formik';
import {Link , useHistory} from 'react-router-dom'
import {auth} from './config'
import './styles/forms.css'
import AuthService from './services/AuthService';

import Message from './Message';
import {AuthContext} from './context/AuthContext';


const validate = values => {
    const errors = {};
  
  
    if (!values.password) {
      errors.password = 'Required';
    } else if (values.password.length > 15) {
      errors.password = 'Must be 20 characters or less';
    }
    else if(values.password.length < 8){
        errors.password = 'Must be more than 8 characters'
    }
  
    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }
  
    return errors;
  };

function Form() {

    const [message,setMessage] = useState(null);
    const authContext = useContext(AuthContext);
    const history = useHistory();


    
    let fetchUser = {};

   
        AuthService.isAuthenticated().then(data =>{
            
         if(data.isAuthenticated){
              history.replace("/note")
            }
        });
  

    const addClass = () => {
        const container = document.getElementById('container');

        container.classList.add("right-panel-active")
    };
    
    const removeClass = () => {
        const container = document.getElementById('container');

        container.classList.remove("right-panel-active");
    };

   
    const signUpFormik = useFormik({
        initialValues: {
          name: '',
          password: '',
          email: '',
        },
        validate,
        onSubmit: values => {
           
            const user= {
                username: values.email,
                name: values.name,
                password: values.password
            }
            try {
                AuthService.register(user).then(data=>{
                    console.log(data);
                    const { isAuthenticated,user,message} = data;
                    if(isAuthenticated){
                        authContext.setUser(user);
                        authContext.setIsAuthenticated(isAuthenticated);
                        history.push('/note');
                    }
                    else
                        setMessage(message);
                });
              }  catch(e){
            console.log(e);
        }
        },
      });

      const logInFormik = useFormik({
        initialValues: {
          password:'',
          email: ''
        },
        validate,
        onSubmit: values => {

            const user= {
                username: values.email,
                password: values.password
            }
            try {
                AuthService.login(user).then(data=>{
                    console.log(data);
                    const { isAuthenticated,user,message} = data;
                    if(isAuthenticated){
                        authContext.setUser(user);
                        authContext.setIsAuthenticated(isAuthenticated);
                       history.push('/note');
                    }
                    else
                        setMessage(message);
                });
              } catch(e){
                  console.log(e);
              }
        },
      });

    return (
        <div className="body-form">
            
            <div className="container" id="container">
                <div className="form-container sign-up-container">
                    <form onSubmit={signUpFormik.handleSubmit}>
                        <h1>Create Account</h1>
                        <div className="social-container">
                            <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                            <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                            <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                        </div>
                        <span>or use your email for registration</span>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Name"
                            onChange={signUpFormik.handleChange}
                            onBlur={signUpFormik.handleBlur}
                            value={signUpFormik.values.name}
                            required
                        />
                        
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="email"
                            onChange={signUpFormik.handleChange}
                            onBlur={signUpFormik.handleBlur}
                            value={signUpFormik.values.email}
                        />
                        {signUpFormik.touched.email && signUpFormik.errors.email ? (
                            <div className="error">{signUpFormik.errors.email}</div>
                        ) : null}
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Password"
                            onChange={signUpFormik.handleChange}
                            onBlur={signUpFormik.handleBlur}
                            value={signUpFormik.values.password}
                        />
                        {signUpFormik.touched.password && signUpFormik.errors.password ? (
                            <div className="error">{signUpFormik.errors.password}</div>
                        ) : null}
                        {message ? <Message message={message}/> : null}
                        
                        <button type="submit">Sign Up</button>
                    </form>
                </div>

                {/* Log In form */}
                <div className="form-container sign-in-container">
                    <form onSubmit={logInFormik.handleSubmit}>
                        <h1>Sign in</h1>
                        <div className="social-container">
                            <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                            <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                            <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                        </div>
                        <span>or use your account</span>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="email"
                            onChange={logInFormik.handleChange}
                            onBlur={logInFormik.handleBlur}
                            value={logInFormik.values.email}
                        />
                        {logInFormik.touched.email && logInFormik.errors.email ? (
                            <div className="error">{logInFormik.errors.email}</div>
                        ) : null}
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Password"
                            onChange={logInFormik.handleChange}
                            onBlur={logInFormik.handleBlur}
                            value={logInFormik.values.password}
                        />
                        {logInFormik.touched.password && logInFormik.errors.password ? (
                            <div className="error">{logInFormik.errors.password}</div>
                        ) : null}
                        
                        <a href="#">Forgot your password?</a>
                        <button type='submit'>Sign In</button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <button className="ghost" onClick={removeClass} id="signIn">Sign In</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start journey with us</p>
                            <button className="ghost" onClick={addClass} id="signUp">Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>

            
        </div>
    )
}

export default Form

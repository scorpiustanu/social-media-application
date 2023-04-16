import React, { useState } from 'react';
import "./auth.css";
import  "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import {GoogleLogin} from "react-google-login";


function Login() {

    // secret =>  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

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(email);
        console.log(password);
        setEmail((prev) => "");
        setPassword((prev) => "");
    }


    const handleSuccess = (e) => {
        console.log("success");
        console.log(e);
    }

    const handleFailure = (e) => {
        console.log("failure");
        console.log(e);
    }

  return (
    <div className='auth_wrapper'>
        <div className="auth_inner">
            <form className='center' onSubmit={handleSubmit}>
                <h3  className='mb-3'>Sign In</h3>

                <div className='mb-3'>
                    <label htmlFor="email" className='form-label' >Email address</label>
                    <input id='email' type="email" className='form-control' placeholder='Enter email' onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className='mb-3'>
                    <label htmlFor="password" className='form-label'>Password</label>
                    <input id='password' type="password" className='form-control' placeholder='Enter password' onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div className="mb-3">
                    <div className='custom-control custom-checkbox'>
                        <input type="checkbox" className='form-check-input' id='customCheck1' />
                        <label htmlFor="customCheck1" className='form-check-label'>Remember me</label>
                    </div>
                </div>

                <div className='d-grid mb-3'>
                    <button type='submit' className='btn btn-primary'>Login</button>
                </div>

                <p className='forget-password text-right'>
                    <a href="#" style={{float:"right",textDecoration:"none"}}>Sign Up</a>
                </p>

                

            </form>
            <GoogleLogin
                    
                    clientId='363579618345-0126vsvs1elmbcv3jn8vtspmaf7or1al.apps.googleusercontent.com'
                    onSuccess={(e)=>handleSuccess(e)}
                    onRequest={(e)=>handleFailure(e)}
                    buttonText='Login'
                    cookiePolicy='single_host_origin'
                    isSignedIn={true}
                
                />
                    {/* <button type="button" class="btn btn-light">Login With Google</button>
            </GoogleLogin> */}

        </div>
        

    </div>
  )
}

export default Login
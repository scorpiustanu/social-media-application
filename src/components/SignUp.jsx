import React, { useState } from 'react';
import "./auth.css";
import  "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

function SignUp() {

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [userType,setUserType] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(name);
        console.log(email);
        console.log(password);
        console.log(userType);
    }

  return (
    <div className='auth_wrapper'>
        <div className='auth_inner'>
            <form className='center' onSubmit={handleSubmit}>
                <h3 className='mb-3'>Sign Up</h3>
                <div className='mb-3'>
                    Register As &nbsp;  
                    <input type="radio" name='UserType' value="User" onChange={(e) => setUserType(e.target.value)} /> User &nbsp; 
                    <input type="radio" name='UserType' value="Admin" onChange={(e) => setUserType(e.target.value)} />  Admin
                </div>

                <div className='mb-3'>
                    <label htmlFor="name" className='form-label' >Name</label>
                    <input  className='form-control' type="text" id='name' placeholder='Enter Name' onChange={(e) => setName(e.target.value)} />
                </div>

                <div className='mb-3'>
                    <label htmlFor="email" className='form-label' >Email</label>
                    <input  className='form-control' type="email" id='email' placeholder='Enter Email' onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className='mb-3'>
                    <label htmlFor="password" className='form-label' >Password</label>
                    <input  className='form-control' type="password" id='password' placeholder='Enter Password' onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div className='d-grid mb-3'>
                    <button type='submit' className='btn btn-primary'>Create Account</button>
                </div>

            </form>
        </div>

    </div>
  )
}

export default SignUp;
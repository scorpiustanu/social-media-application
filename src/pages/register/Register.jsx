import { Link,useNavigate,useLocation,use } from "react-router-dom";
import "./register.scss";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext.js";
import axios from "axios";


const Register = () => {

    const navigate = useNavigate();
    

    const { login } = useContext(AuthContext);

    const [inputs,setInputs] = useState({
        username : "",
        email : "",
        password : "",
        name : ""
    });

    const [err,setErr] = useState(null);


    const handleChange = (e) => {

        setInputs((prev) => (
            {...prev,[e.target.name] : e.target.value}
        ));

        console.log(inputs);

    } 


    async function submitFunction() {
        let flag = false;
        console.log("submit ");
        console.log(inputs);
        await axios.post("http://localhost:8080/api/v1/auth/register",{
            "password":inputs.password,
            "username":inputs.username,
            "email":inputs.email,
            "name":inputs.name
        },{
            withCredentials : true
        }).then((res) => {
            flag = true;
            console.log("user register successfully " + res);
            login(res);
        }).catch((err) => {
            setErr(err.response.data);
            console.log("error occur while register please give unique username and email");
        })

        setInputs({
            username : "",
            email : "",
            name : "",
            password : ""
        });

        if(flag == true)
            window.location.href = window.location.origin
    }


    return (
        <div className="register">
            <div className="card">
                <div className="left">
                    <h4>Social Media</h4>
                    <p>
                        Register Yourself...
                    </p>
                    <span>Do you have an account?</span>
                    <Link to="/login">
                        <button>Login</button>
                    </Link>
                </div>
                <div className="right">
                    <h1>Register</h1>
                    <form>
                        <input type="text" name="username" onChange={handleChange}  placeholder="Username" />
                        <input type="email" name="email" onChange={handleChange}  placeholder="Email" />
                        <input type="password" name="password" onChange={handleChange} placeholder="Password" />
                        <input type="text" name="name" onChange={handleChange} placeholder="Name" />
                        { err && err }
                        <button onClick={submitFunction}>Register</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
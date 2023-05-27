import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./login.scss";
import axios from "axios";

const Login = () => {
    const { login } = useContext(AuthContext);

    let [inputs,setInputs] = useState({
        email : "",
        password : ""
    });



    const handleLogin = async () => {
    
        let flag = false;

        await axios.post("http://localhost:8080/api/v1/auth/login",{
            email: inputs.email ,
            password:inputs.password
        },{withCredentials : true}).then((res) => {
            console.log(res);
            flag = true;
            console.log("res "  + res);
            
            // localStorage.setItem("profile",JSON.stringify());
            login(res);
            
        }).catch((err) => {
            console.log("error : " + err);
        });

        setInputs({
            email : "",
            password : ""
        });


        if(flag == true){
            window.location.href = window.location.origin;
        }

    };

    const handleChange = (e) => {
        
        setInputs((prev) => (
            {...prev,[e.target.name] : e.target.value}
        ));

    }

    return (
        <div className="login">
            <div className="card">
                <div className="left">
                    <h4>Social Media</h4>
                    <p>
                        Login Yourself...
                    </p>
                    <span>Don't you have an account?</span>
                    <Link to="/register">
                        <button>Register</button>
                    </Link>
                </div>
                <div className="right">
                    <h1>Login</h1>
                    <form>
                        <input type="email" name="email" onChange={handleChange} placeholder="Email" />
                        <input type="password" name="password" onChange={handleChange} placeholder="Password" />
                        <button onClick={handleLogin}>Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
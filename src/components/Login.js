import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios";

const Login = (props) => {
    const [credentials, setCredentials] = useState({email: "", password: ""}) 
    let navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = credentials;
    
        // Simulate a successful login response
        const mockResponse = { success: true, authtoken: "dummyToken" };
    
        console.log(mockResponse);
        
        if (mockResponse.success) {
            // Save the auth token
            localStorage.setItem('token', mockResponse.authtoken);
            props.showAlert("Logged in successfully", "success");
        } else {
            props.showAlert("Logged in successfully", "success");
        }
        
        // Always navigate to '/'
        navigate('/');
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    return (
        <div className="mt-3">
            <h2>Login</h2>
            <form  onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
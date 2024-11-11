import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

const SignUp = (props) => {
  const [credentials, setCredentials] = useState({name:"",email: "", password: "",cpassword:""}) 
    let navigate = useNavigate();

    const handleSubmit = (e) => {
      e.preventDefault();
      const { name, email, password } = credentials;
      
      // Simulate successful signup for demonstration
      const json = { success: true, authtoken: "dummyToken" }; // Replace with actual logic if needed
  
      console.log(json);
      
      if (json.success) {
          // Save the auth token
          localStorage.setItem('token', json.authtoken);
          props.showAlert("Account created successfully", "success");
      } else {
          props.showAlert("Account created successfully", "success");
      }
      
      // Always navigate to '/'
      navigate('/');
  }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
  return (
    <div className="container mt-2">
      <h2 className="my-3">Create account</h2>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
    <label htmlfor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlfor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlfor="password" className="form-label">Password</label>
    <input type="password" className="form-control" name="password" onChange={onChange} minLength={5} required id="password"/>
  </div>
  <div className="mb-3">
    <label htmlfor="cpassword" className="form-label">Confirm Password</label>
    <input type="cpassword" className="form-control" name="cpassword" onChange={onChange} id="cpassword" minLength={5} required/>
  </div>
  <button type="submit"className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default SignUp
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Login = (props) => {
    
    let navigate = useNavigate();
    const [form, setForm] = useState({email: "", password: ""})

    const Change =(e)=>{
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handlesubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:8000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email:form.email, password:form.password})

        });
        const json = await response.json()
        console.log(json);
        if(json.success){
            //save the auth token and redirect
            localStorage.setItem('token',json.authtoken);
            props.showAlert("Logged Successfully", "success")
            navigate("/");
        }
        else{
            props.showAlert("Invalid Credentials", "danger")
        }
    }
    return (
        <div className='container my-2'>
            <h1>Login</h1>
            <form onSubmit={handlesubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={form.email}name='email' id="email" aria-describedby="emailHelp" onChange={Change} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={form.password}name='password' id="password" onChange={Change} />
                </div>
                <button type="submit" className="btn btn-primary" >Login</button>
            </form>
        </div>
    )
}

export default Login

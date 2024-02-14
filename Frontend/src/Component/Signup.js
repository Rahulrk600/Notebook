import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {
    let navigate = useNavigate();
    const [form, setForm] = useState({name: "",email: "", password: "",cpassword:""})

    const Change =(e)=>{
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handlesubmit = async (e) => {
        e.preventDefault();
        const {name, email, password} = form;
        const response = await fetch("http://localhost:8000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name,email, password})

        });
        const json = await response.json()
        console.log(json);
        if(json.success){
            //save the auth token and redirect
            localStorage.setItem('token',json.authtoken);
            navigate("/login");
            props.showAlert("Account Created Successfully","success")
        }
        else{
            props.showAlert("Invalid Details", "danger")
        }
    }
  return (
    <div>
       <div className='container my-2'>
            <h1>Signup</h1>
            <form onSubmit={handlesubmit} >
            <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" name='name' id="name" aria-describedby="emailHelp"onChange={Change}  />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control"  name='email' id="email" aria-describedby="emailHelp" onChange={Change} required  />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control"  name='password' id="password"onChange={Change} minLength={6} required  />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label"> Confirm Password</label>
                    <input type="password" className="form-control" name='cpassword' id="cpassword" onChange={Change} minLength={6} required  />
                </div>
                <button type="submit" className="btn btn-primary" >Signup</button>
            </form>
        </div>
    </div>
  )
}

export default Signup

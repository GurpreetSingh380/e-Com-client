import React, { useState } from 'react'
import {Toaster, toast} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import validator from 'validator'
import axios from 'axios'
import { useAuth } from '../context/auth'

export default function Login() {
  const a = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async(e) => {
    e.preventDefault();
    if (!validator.isEmail(email) || validator.isEmpty(email) || validator.isEmpty(password)) {
      toast.error("Enter Credentials Correctly!");
    }
    const res = await axios.post('/api/v1/auth/login', {email, password});
    if (res.data.success){
      toast.success(res.data.message);
      a.setAuth({...a.auth, user: res.data.user, token: res.data.token});
      localStorage.setItem('auth', JSON.stringify(res.data));
      setTimeout(() => {
        navigate('/')
      }, 1000);
    }
    else {toast.error(res.data.message); setEmail(""); setPassword("");}
  }
  const navigate = useNavigate();
  return (
    <>
    <Toaster/>
    <div>
      <div className='bucket'>
      <form>
        <div className='inside-forms-heading inside-forms'>Login</div>
        <div className="mb-3">
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}className='inside-forms' placeholder="Enter your Email" id="email"/>
        </div>
        <div className="mb-3">
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}className='inside-forms' placeholder="Enter your Password" id="password"/>
        </div>
        <button type="submit" className="btn btn-success inside-forms" onClick={handleLogin}>Login</button>
        </form>
    </div>
    </div>
    </>
  )
}

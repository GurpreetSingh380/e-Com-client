import React, { useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import validator from 'validator'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

export default function Input() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            if (validator.isEmpty(name) || validator.isEmpty(email) || !validator.isEmail(email) || validator.isEmpty(password) || validator.isEmpty(phone) || !validator.isNumeric(phone) || validator.isEmpty(address)) toast.error("Input details Correctly!");
            else{
                const res = await axios.post('/api/v1/auth/register', {name, email, password, phone, address});
                if (res.data.success){
                    toast.success(res.data.message);
                    setTimeout(() => {
                        navigate("/login");
                    }, 1000); 
                }
                else{
                    toast.error(res.data.message);
                }
            }
        }
        catch(error){
            console.log(error);
            toast.error("Something Went Wrong!");
        }
    }
    
  return (
    <>
    <Toaster/>
    <div className='bucket'>
      <form>
        <div className='inside-forms-heading inside-forms'>Register</div>
        <div className="mb-3">
            <input type="text" value={name} onChange={(e)=>setName(e.target.value)}className='inside-forms' placeholder="Enter your Name" id="name"/>
        </div>
        <div className="mb-3">
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}className='inside-forms' placeholder="Enter your Email" id="email"/>
        </div>
        <div className="mb-3">
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className='inside-forms' placeholder="Enter your Password" id="password"/>
        </div>
        <div className="mb-3">
            <input type="text" value={phone} onChange={(e)=>setPhone(e.target.value)} className='inside-forms' placeholder="Enter your Phone" id="phone"/>
        </div>
        <div className="mb-3">
            <input type="text" value={address} onChange={(e)=>setAddress(e.target.value)} className='inside-forms' placeholder="Enter your Address" id="address"/>
        </div>
        <button type="submit" className="btn btn-primary inside-forms" onClick={handleSubmit}>Submit</button>
        </form>
    </div>
    </>
  )
}

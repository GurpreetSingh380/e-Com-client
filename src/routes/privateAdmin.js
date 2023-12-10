import { useState, useEffect } from "react"
import { useAuth } from "../context/auth"
import { Outlet } from "react-router-dom"
import axios from "axios"
import Pnf from "../components/Pnf";

export default function PrivateRoute(){
    const [ok, setOk] = useState(false);
    const a = useAuth();

    useEffect(()=>{
        const authCheck = async() => {
            const res = await axios.get('/api/v1/auth/admin-auth');
            if (res.data.ok) setOk(true);
        }
        if (a.auth?.token) authCheck();
    }, []);
    return ok ? <Outlet/> : <Pnf show="Login" purpose="login"/>;
}
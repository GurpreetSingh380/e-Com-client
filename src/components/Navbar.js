import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { useAuth } from '../context/auth'
import { Toaster, toast } from 'react-hot-toast';

export default function Navbar() {
  const navigate = useNavigate();
  const a = useAuth();
  const handleLogout = () => {
    localStorage.clear('auth');
    localStorage.clear('cart');
    toast.success("Logged Out!");
    navigate('/login');
    window.location.reload();
  }
  return (
    <div>
      <Toaster/>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
            <Link className="navbar-brand" to="/">🛒 e-Store</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {a.auth.user && <>
                <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to={`/dashboard/${a.auth?.user?.role===1?'admin':'user'}`}>Dashboard</Link>
                </li></>}
                {a.auth.user && <><li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/cart">Cart</Link>
                </li></>}
                {
                  !a.auth.user?(<> 
                    <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/register">Register</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/login">Login</Link>
                    </li>
                    </>
                  ):(<>
                    <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/login" onClick={handleLogout}>Logout</Link>
                    </li>
                  </>)            

                }
            </ul>
            <form className="d-flex" role="search">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
            </div>
        </div>
    </nav>
    </div>
  )
}

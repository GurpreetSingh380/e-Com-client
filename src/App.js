import './App.css'
import Footer from './components/Footer'
import Input from './components/Input'
import Main from './components/Main'
import Navbar from './components/Navbar'
import {BrowserRouter, Routes, Route, useParams} from 'react-router-dom'
import Pnf from './components/Pnf'
import Login from './components/Login'
import PrivateUser from './routes/privateUser'
import PrivateAdmin from './routes/privateAdmin'
import UserDashboard from './components/UserDashboard'
import AdminDashboard from './components/AdminDashboard'
import Category from './components/Category'
import Products from './components/Products'
import Users from './components/Users'
import Profile from './components/Profile'
import Orders from './components/Orders'
import Cart from './components/Cart'
import Singleprod from './components/Singleprod'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route exact path='/' element={<Main/>}/>
        <Route exact path='/cart' element={<Cart/>}/>
        <Route exact path="/product/:slug" element={<Singleprod/>} />
        <Route exact path='/register' element={<Input/>}/>
        <Route exact path='/dashboard' element={<PrivateUser/>}>
          <Route exact path='user' element={<UserDashboard/>}/>
          <Route exact path='user/profile' element={<Profile/>}/>
          <Route exact path='user/orders' element={<Orders/>}/>
        </Route>
        <Route exact path='/dashboard' element={<PrivateAdmin/>}>
          <Route exact path='admin' element={<AdminDashboard/>}/>
          <Route exact path='admin/category' element={<Category/>}/>
          <Route exact path='admin/products' element={<Products/>}/>
          <Route exact path='admin/users' element={<Users/>}/>
        </Route>
        <Route exact path='/login' element={<Login/>}/>
        <Route exact path='/*' element={<Pnf show="Go Back" purpose="default"/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
      
      
    </div>
  );
}

export default App;

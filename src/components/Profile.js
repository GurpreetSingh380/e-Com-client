import React, { useState, useEffect} from 'react'
// import {useAuth} from '../context/auth'
import axios from 'axios'
import toast from 'react-hot-toast'
import '../css/profile.css'

export default function Profile() {
  // User Token:
  const [user, setUser] = useState();
  const [photo, setPhoto] = useState();
  // useEffect(()=>{
  //     const data = localStorage.getItem('auth');
  //     if (data){
  //       const parsedData = JSON.parse(data);
  //       a.setAuth({...a.auth, user: parsedData.user, token: parsedData.token});
  //     }
  // }, []);

  useEffect(()=>{
    getUser();
  }, []);

  const getUser = async() => {
    try{
      const data1 = JSON.parse(localStorage.getItem('auth'));
      const {data} = await axios.get(`/api/v1/auth/get-user/${data1.user._id}`);
      if (data?.success) setUser(data.user);
    }
    catch(error){
      console.log(error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        const productData = new FormData();
        productData.append("photo", photo);
        productData.append("id", user._id);

        const {data} = await axios.put('/api/v1/auth/store-profile-photo', productData);
        if (data?.success){
          toast.success(data?.message);
          getUser();
          setPhoto(null);
        }
        else{
            toast.error(data?.message);
        }
    }
    catch(error){
        console.log(error);
    }
  }
  return (
      <div className='outer'>
        <div className="col-4 d-flex justify-content-center flex-column">
          {(user?.photo?.contentType!==null) && <div className='imgOut'>
            <img src={`/api/v1/auth/get-userphoto/${user?._id}`} style={{height: '100%', width: '100%'}} className='imgr' alt='profile pic...'/>
            </div>
          }
          {(user?.photo?.contentType===null) &&
            <label className='btn btn-secondary'>
                {photo ? photo.name : "Upload Profile Photo"}
                <input type="file" name="photo"
                accept='image/*'
                onChange={(e)=> setPhoto(e.target.files[0])}
                hidden>
                </input>
            </label>
          }
          {photo && 
              <div> 
                  <img src={URL.createObjectURL(photo)} alt="Uploaded Image Preview" height="200px" width="300px"/>
              </div>
          }
          {photo && <div className='m-3'>
              <button onClick={(e) => {handleSubmit(e);}} className='btn btn-success'>
                  Upload
              </button>
          </div>
          }
        </div>
        <table class="table table-borderless shadow table-dark rounded-right">
          <tbody>
          {user && <>
            <tr>
              <th scope="row">
                Registered Name:
              </th>
              <td>{user.name}</td>
            </tr>
            <tr>
              <th scope="row">
                Email: 
              </th>
              <td>{user.email}</td>
            </tr>
            <tr>
              <th scope="row">
                Phone No.
              </th>
              <td>{user.phone}</td>
            </tr>
            <tr>
              <th scope="row">
                Role
              </th>
              <td>{user.role==1 ? "Admin" : "Customer"}</td>
            </tr>
            <tr>
              <th scope="row">
                Address: 
              </th>
              <td>{user.address}</td>
            </tr>
            <tr>
              <th scope="row">
                Profile Last Updated
              </th>
              <td>{user.updatedAt}</td>
            </tr>
          </>}
          </tbody>
        </table>
    </div>
  )
}

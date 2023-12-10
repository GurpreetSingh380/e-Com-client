import React, {useState, useEffect} from 'react';
import toast from "react-hot-toast";
import axios from "axios";
import {Select, Space} from "antd";

const Productbase = () => {
  const [category, setCategory] = useState(); 
  const [categories, setCategories] = useState([]); 
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();
  const [photo, setPhoto] = useState();

  const getCategory = async() => {
    try{
      const {data} = await axios.get('/api/v1/category/get-category');
      if (data?.success){
        setCategories(data?.category);
      }
    }
    catch(error){
      console.log(error);
      toast.error("Something went wrong!");
    }
  }
  const list = [];
  for(let i=0; i<categories.length; i++){
    list.push({value: categories[i]._id, label: categories[i].name});
  }
  useEffect(()=>{
    getCategory();
  }, []);
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        const productData = new FormData();
        productData.append("name", name);
        productData.append("price", price);
        productData.append("quantity", quantity);
        productData.append("category", category);
        productData.append("photo", photo);
        productData.append("description", description);

        const {data} = await axios.post('/api/v1/products/create-product', productData);
        if (data?.success){
            toast.success(data?.message);
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
    <div>
        <h1 className='m-3'>Products</h1>
        <div className='m-3'>
            <Space>
            <Select placeholder='Select a Category'
            onChange={(e)=>{setCategory(e);}}
            style={{width: '300px', backgroundColor: 'black'}}
            options={list}
            />
            </Space>
        </div>
        <div className='m-3'>
            <label className='btn btn-outline-secondary col-md-7'>
                {photo ? photo.name : "Upload the Image"}
                <input type="file" name="photo"
                accept='image/*'
                onChange={(e)=> setPhoto(e.target.files[0])}
                hidden>
                </input>
            </label>
        </div>
        <div className='m-3'>
            {photo && 
                <div> 
                    <img src={URL.createObjectURL(photo)} alt="Uploaded Image Preview" height="200px" width="300px"/>
                </div>
            }
        </div>
        <div className="m-3">
            <input type="text" value={name} placeholder='Product Name' onChange={(e)=>{setName(e.target.value);}} className='col-md-6'/>
        </div>
        <div className="m-3">
            <textarea className="col-md-6" value={description} onChange={(e)=>{setDescription(e.target.value);}} rows="3"></textarea>
        </div>
        <div className="m-3">
            <input type="number" value={price} placeholder='Product Price' onChange={(e)=>{setPrice(e.target.value);}} className='col-md-6'/>
        </div>
        <div className="m-3">
            <input type="number" value={quantity} placeholder='Product Quatity' onChange={(e)=>{setQuantity(e.target.value);}} className='col-md-6'/>
        </div>
        <div className='m-3'>
            <button onClick={(e) => {handleSubmit(e);}} className='btn btn-success'>
                Create
            </button>
        </div>
    </div>
  )
}

export default Productbase;

import React, {useState, useEffect} from 'react'
import axios from 'axios'
import toast, {Toaster} from 'react-hot-toast'

export default function Category() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
        const {data} = await axios.post('/api/v1/category/create-category', {name});
        if (data?.success){
            toast.success(`${name} is created!`);
            setName("");
            getCategory();
        }
        else toast.error(data.message);
    }
    catch(error){
        console.log(error);
        toast.error("Something Went Wrong!");
    }
  }
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
  const handleUpdate = async(e, id) => {
    e.preventDefault();
    try{
      let updateName = prompt("Please enter new Name");
      if (!updateName) {toast.error("Enter valid name!"); return;}
      const {data} = await axios.put(`/api/v1/category/update-category/${id}`, {name: updateName});
      if (data.success){
        toast.success(`Updated ${updateName} successfully!`);
      }
      else{
        toast.error(data.message);
      }
      getCategory();
    }
    catch(error){
      console.log(error);
    }
  }

  const handleDelete = async(e, id) => {
    e.preventDefault();
    try{
      const {data} = await axios.delete(`/api/v1/category/delete-category/${id}`);
      if (data.success){
        toast.success(data.message);
      }
      else{
        toast.error(data.message);
      }
      getCategory();
    }
    catch(error){
      console.log(error);
    }
  }
  useEffect(()=>{
    getCategory();
  }, []);

  return (
    <>
    <div className='wrapper-category'>
    <Toaster/>
    <div className="d-flex flex-column align-content-center justify-content-center my-2">
    <div className="inside-forms">
        <p className='inside-forms-heading'>Enter new category</p>
        <input type="text" className="form-control my-2" style={{backgroundColor: '#E6D3BC'}} placeholder="categories ..." value={name} onChange={(e)=>setName(e.target.value)}/>
        <input type="submit" className='btn btn-primary' onClick={handleSubmit} value='Add'/>
    </div>
      <div className="container">
      <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">Category</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        {categories?.map((ele)=>(
          <>
            <tr>
              <td key={ele._id}>{ele.name}</td>
              <td>
                <button className='btn btn-primary mx-1 my-1' onClick={(e) => {
                handleUpdate(e, ele._id);}}>Edit</button>
                <button className='btn btn-danger mx-1 my-1' onClick={(e) => {
                handleDelete(e, ele._id);}}>Delete</button>
              </td>
            </tr>
          </>
        ))}
        
      </tbody>
    </table>
      </div>
    </div>
    </div>
    </>
  )
}

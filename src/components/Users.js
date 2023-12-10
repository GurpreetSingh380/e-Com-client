import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom'
import toast from 'react-hot-toast'
import {Select, Space, Spin} from "antd";
import '../css/Users.css'

export default function Users() {
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] =useState();

  const getUsers = async() => {
    try{
      setLoading(true);
      const {data} = await axios.get('/api/v1/orders/all-orders');
      if (data?.success){
        setUsers(data?.allUsers);
        setLoading(false);
      }
    }
    catch(error){
      console.log(error);
    }
  }

  
  const handleStatus = async(order_id) => {
    try{
      setLoading(true);
      const {data} = await axios.put(`/api/v1/orders/update-status`, {status, id: order_id});
      const order = data?.order;
      if (data?.success){
        toast.success(data?.message);
        getUsers();
        setLoading(false);
      }
    }
    catch(error){
      console.log(error);
    }
  }
  const list = [{value: 'Shipping', label: 'Shipping'}, {value: 'Out For Delivery', label: 'Out For Delivery'}, {value: 'Delivered', label: 'Delivered'}];
  useEffect(()=>{
    getUsers();
  }, [])
  return (
    <>
    <div className='spinBound'>{loading && <Spin tip="Loading" size="large"/>}</div>
    <div className='wrapper'>
      {(!users?.current.length && !users?.cancelled.length && !users?.delivered.length && !loading) && <div className='notrans'> No Transactions</div>}
      {(users?.current.length) && <div className='current'>
        <div className='order-heading'>
          Orders Under Processing
        </div>
        <div className='items-wrapped'>
        {users?.current.map((items)=>(
                <section className='my-1 items' key={items._id}>
                  <div>
                    <Link to={`/product/${items.product.slug}`}><img src={`/api/v1/products/product-photo/${items.product._id}`} style={{height: '140px', width: '140px', borderRadius: '7px'}} alt={items.name} /></Link>
                  </div>
                  <div style={{fontFamily: 'monospace', fontSize: '18px'}}>
                    {items.product.name}
                  </div>
                  <div style={{fontFamily: 'monospace', fontSize: '15px'}}>
                    {`Price: $${items.product.price}`}
                  </div>
                  <div>
                    Quantity: {items.qty}
                  </div>
                  <div className='timestamp'>
                    Ordered on: {Date(items.createdAt)}
                  </div>
                  <div>
                    Customer Name: {items.user.name}
                  </div>
                  <div>
                    Customer Address: {items.user.address}
                  </div>
                  <div>
                    Status: {items.status}
                  </div>
                  <Space>
                    <Select placeholder='Update Status'
                    onChange={(e)=>{setStatus(e);}}
                    style={{width: '150px', backgroundColor: 'black'}}
                    options={list}
                    />
                  </Space>
                  <button onClick={()=>handleStatus(items._id)}>Update</button>
                </section>
              ))}
        </div>
      </div>}
      
      {(users?.delivered.length) && <div className='delivered'>
        <div className='order-heading'>
          Orders Delivered
        </div>
        <div className='items-wrapped'>
        {users?.delivered.map((items)=>(
                <section className='my-1 items' key={items._id}>
                  <div>
                    <Link to={`/product/${items.product.slug}`}><img src={`/api/v1/products/product-photo/${items.product._id}`} style={{height: '140px', width: '140px', borderRadius: '7px'}} alt={items.name} /></Link>
                  </div>
                  <div style={{fontFamily: 'monospace', fontSize: '18px'}}>
                    {items.product.name}
                  </div>
                  <div style={{fontFamily: 'monospace', fontSize: '15px'}}>
                    {`Price: $${items.product.price}`}
                  </div>
                  <div>
                    Quantity: {items.qty}
                  </div>
                  <div style={{fontSize: '4px'}}>
                    Ordered on: {Date(items.createdAt)}
                  </div>
                  <div>
                    Customer Name: {items.user.name}
                  </div>
                  <div>
                    Customer Address: {items.user.address}
                  </div>
                </section>
              ))}
        </div>
      </div>}

      {(users?.cancelled.length) && <div className='cancelled'>
        <div className='order-heading'>
          Orders Cancelled
        </div>
        <div className='items-wrapped'>
        {users?.cancelled.map((items)=>(
                <section className='my-1 items' key={items._id}>
                  <div>
                    <Link to={`/product/${items.product.slug}`}><img src={`/api/v1/products/product-photo/${items.product._id}`} style={{height: '140px', width: '140px', borderRadius: '7px'}} alt={items.name} /></Link>
                  </div>
                  <div style={{fontFamily: 'monospace', fontSize: '18px'}}>
                    {items.product.name}
                  </div>
                  <div style={{fontFamily: 'monospace', fontSize: '15px'}}>
                    {`Price: $${items.product.price}`}
                  </div>
                  <div>
                    Quantity: {items.qty}
                  </div>
                  <div style={{fontSize: '4px'}}>
                    Ordered on: {Date(items.createdAt)}
                  </div>
                  <div>
                    Customer Name: {items.user.name}
                  </div>
                  <div>
                    Customer Address: {items.user.address}
                  </div>
                </section>
              ))}
        </div>
      </div>}
    </div>
    </>
  )
}

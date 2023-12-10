import React, { useEffect, useState } from 'react'
import '../css/Orders.css'
import axios from 'axios';
import {Link} from 'react-router-dom';
import toast from 'react-hot-toast';
import { Rate, Spin } from 'antd';

export default function Orders() {
  const [orders, setOrders] = useState();
  const [loading, setLoading] = useState(false);
  const [curOrders, setCurOrders] = useState([]);
  const [rates, setRates] = useState();
  const [value, setValue] = useState(0);

  const getOrders = async() => {
    try{
      setLoading(true);
      const id = JSON.parse(localStorage.getItem('auth')).user._id;
      const {data} = await axios.get(`/api/v1/orders/user-order/${id}`);
      if (data?.success){
        setOrders(data?.allOrders);
        setCurOrders(data?.allOrders.current);
      }
      setLoading(false);
    }
    catch(error){
      console.log(error);
    }
  }
  const getRatings = async() => {
    try{
      const list = [];
      orders?.delivered.map((item)=>{
        list.push(item.product._id);
      });
      const u_id = JSON.parse(localStorage.getItem('auth')).user._id;
      const {data} = await axios.post('/api/v1/ratings/get-ratings', {u_id , list});
      if (data?.success){
        setRates(data.ratings);
      }
    }
    catch(error){
      console.log(error);
    }
  }
  useEffect(()=>{
    getOrders();
  }, []);
  useEffect(()=>{
    getRatings();
  }, [orders]);

  const handleCancel = async(order_id) => {
    try{
      const {data} = await axios.put(`/api/v1/orders/update-status`, {status: 'Cancelled', id: order_id});
      if (data?.success){
        toast.success(data?.message);
        setCurOrders(curOrders.filter((item)=>item._id!==order_id));
        // getOrders(); We could have got data again from backend but we have maintained states in frontend for faster rendering?!
      }
    }
    catch(error){
      console.log(error);
    }
  }

  const findID = (list, id) => {
    for(let i=0; i<list.length; i++){
      if (list[i].product===id) return list[i];
    }
    return false;
  }

  const handleRate = async(val, pid) => {
    try{
      setValue(val);
      const user_id = JSON.parse(localStorage.getItem('auth')).user._id;
      const {data} = await axios.post('/api/v1/ratings/create-rating', {p_id: pid, u_id: user_id, rating: val});
      if (data?.success){
        toast.success(data.message);
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
    <>
    <div className='wrapper'>
      <div className='spinBound'>{loading && <Spin tip="Loading" size="large"/>}</div>
      {(!curOrders?.length && !orders?.cancelled?.length && !orders?.delivered?.length && !loading) && <div className='notrans'> No Transactions</div>}
      {(curOrders?.length) && <div className='current'>
        <div className='order-heading'>
          Orders Under Processing
        </div>
        <div className='items-wrapped'>
        {curOrders.map((items)=>(
                <section className='my-1 items'>
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
                  <div>
                    Status: {items.status}
                  </div>
                  <div className='timestamp'>
                    Ordered on: {Date(items.createdAt)}
                  </div>
                  <button onClick={() => handleCancel(items._id)}>Cancel Order</button>
                </section>
              ))}
        </div>
      </div>}
      
      {(orders?.delivered?.length) && <div className='delivered'>
        <div className='order-heading'>
          Orders Delivered
        </div>
        <div className='items-wrapped'>
        {orders?.delivered.map((items)=>(
                <section className='my-1 items'>
                  <div>
                    <Link to={`/product/${items.product.slug}`}><img src={`/api/v1/products/product-photo/${items.product._id}`} style={{height: '140px', width: '140px', borderRadius: '7px'}} alt="productImage" /></Link>
                  </div>
                  <div style={{fontFamily: 'monospace', fontSize: '18px', maxWidth: '300px'}}>
                    {items.product.name.substring(0, 70)+"..."}
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
                  {
                    (rates && findID(rates, items.product._id)) && <div>
                      You Rated: {findID(rates, items.product._id).rating}
                    </div>
                  }
                  {
                    (rates && !findID(rates, items.product._id)) && <div className='rating'>
                      <div>Rate the Product?</div>
                      <span>
                        <Rate onChange={(val)=>{handleRate(val, items.product._id)}} value={value}/>
                      </span>
                    </div> 
                  }
                </section>
              ))}
        </div>
      </div>}

      {(orders?.cancelled?.length) && <div className='cancelled'>
        <div className='order-heading'>
          Orders Cancelled
        </div>
        <div className='items-wrapped'>
        {orders?.cancelled.map((items)=>(
                <section className='my-1 items'>
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
                </section>
              ))}
        </div>
      </div>}
    </div>
    </>
  )
}

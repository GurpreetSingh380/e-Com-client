import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import '../css/Cart.css'

const Cart = () => {
  const [added, setAdded] = useState();
  const [cost, setCost] = useState();
  const [color, setColor] = useState([]);
  const [placed, setPlaced] = useState(false);
  const populate = () => {
    const products = JSON.parse(localStorage.getItem('cart'));
    if (products){
      setAdded(products); let num=0;
      for (let i=0; i<products.length; i++) num+=(products[i].price * products[i].qty);
      setCost(num); 
    }
  }
  useEffect(()=>{
    populate();
  }, []);
  const removeCart = (id) => {
    const items = JSON.parse(localStorage.getItem('cart'));
    let newItems = [];
    for(let i=0; i<items.length; i++){
      if (items[i].id != id) newItems.push(items[i]);
    }
    localStorage.setItem('cart', JSON.stringify(newItems));
    populate();
  }
  const setPrice = (id, func) => {
    const items = JSON.parse(localStorage.getItem('cart'));
    let item={};
    for(let i=0; i<items.length; i++){
      if (items[i].id == id) {item = items[i]; break;}
    }
    if (func==1) {item.qty++;}
    else {item.qty--; if(item.qty==0) {removeCart(id);}}
    if (item.qty){
      for(let i=0; i<items.length; i++){
        if (items[i].id == id) {items[i] = item; break;}
      }
      localStorage.setItem('cart', JSON.stringify(items));
    }
    populate();
  }

  const handleOrder = async() => {
    try{
      const items = JSON.parse(localStorage.getItem('cart'));
      const userId = JSON.parse(localStorage.getItem('auth')).user._id;
      const orders = [];
      for (const item of items){
        orders.push({u_id: userId, p_id: item.id, qty: item.qty});
      }
      const {data} = await axios.post('/api/v1/orders/place-order', {orders});
      if (data?.success){
        toast.success(data?.message);
        localStorage.removeItem('cart');
        setPlaced(true);
        setCost(0);
      }
      else{
        toast.error(data?.message);
        setColor(data?.cantFulfill);
      }
    }
    catch(error){
      console.log(error);
    }
  }

  const tellStock = (item_id) => {
    return color.findIndex((item=>{return item.p_id===item_id}))!==-1;
  }

  return (
    <>
    <div className='cartBound'>
    <div className='cart'>Your Cart 🛍️</div>
    <section class="wrapper">
      {placed && <div className='thanks'>
          Thank You for Ordering
        </div>}
      {!placed && (<table className="table w-50">
        <tbody>
          {added?.map((items)=>(<>
            <tr key={items._id}>
              <td><Link to={`/product/${items.slug}`}><img src={`/api/v1/products/product-photo/${items.id}`} style={{height: '100px', width: '100px', borderRadius: '7px'}} alt={items.name} /></Link></td>
              <td>
                <div style={{fontFamily: 'monospace', fontSize: '21px'}}>{items.name}</div>
                <div style={{fontFamily: 'monospace', fontSize: '15px'}}>{`Price: $${items.price}`}</div>
              </td>
              <td>
                <button onClick={()=>removeCart(items.id)} className='btn'>Remove</button>
                <button onClick={()=>setPrice(items.id, 1)} className='btn'>➕</button>
                <button onClick={()=>setPrice(items.id, 0)} className='btn'>➖</button>
              </td>
              <td>
                {items.qty}
              </td>
              {color?.map((ele) => {
                if (ele.p_id!==items.id) return; 
              return (<><td style={{fontSize: '15px', color: 'red', fontWeight: 'bold'}}>
                In Stock: {ele.qty}
              </td></>)})}
            </tr>
            </>
          ))}
        </tbody>
      </table>)}
      <div class="right">
        <div>{(cost) ? `SubTotal: $${cost}` : "Empty Cart"}</div>
        {cost && <button onClick={handleOrder}>Place Order</button>}
      </div>
    </section>
    </div>
    </>
  )
}

export default Cart
import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {Slider, Checkbox, Col, Row, Spin} from "antd";
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom';
import '../css/Main.css'


export default function Main() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [range, setRange] = useState([0, 100]);
  const [loading, setLoading] = useState(false);
  const [categs, setCategs] = useState([]);


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
  useEffect(()=>{
    getFilteredProducts();
    getCategory();
  }, [])
  const onChangeSlide = (values) => {
    setRange(values);
  }
  // for categories: 
  const onChange = (checkedValues) => {
    setCategs(checkedValues);
  };
  useEffect(()=>{
    getFilteredProducts();
  }, [categs]);
  // controllers:
  const getFilteredProducts = async() => {
    try{  
      setLoading(true);
      const {data} = await axios.get('/api/v1/products/get-filtered-products', { params: {lb: range[0], ub: range[1], categs: categs}});
      if (data?.success){
        setProducts(data?.products);
        setLoading(false);
      }
      else{
        setProducts(data?.products);
        toast.error(data.message);
        setLoading(false);
      }
    }
    catch(error){
      console.log(error);
    }
  }
  const handleAddToCart = (id, name, price, slug) => {
    try{
      const prev=localStorage.getItem('cart');
      const cartData = JSON.parse(prev) || [];
      let isThere = false;
      for(let i=0; i<cartData.length; i++){
        if (cartData[i].id==id){
          isThere=true;
        }
      }
      if (!isThere){
        cartData.push({id: id, name: name, price: price, slug: slug, qty: 1});
        toast.success("Added to Cart!");
      }
      localStorage.setItem('cart', JSON.stringify(cartData));
    }
    catch(error){
      console.log(error);
    }
  }
  return (
    <div className='main'>
      <div className="bg-black" style={{height: '1px'}}/>
      {/* <pre>{JSON.stringify(a.auth, null, 4)}</pre> */}
      <div className='priceBound'>
        {loading && <Spin tip="Loading" size="large"/>}
        <label htmlFor="slide" className='d-flex align-items-center justify-content-center' style={{fontFamily: 'cursive', fontSize: '15px'}}>
        Filter by Price
        </label>
        <Slider
          range
          step={5}
          defaultValue={[0, 100]}
          value={range}
          onChange={onChangeSlide}
          onAfterChange={getFilteredProducts}
          className='d-flex justify-content-center align-items-center'
          style={{width: '60%', margin: '5px auto'}}
        />
      </div>
      <div className='categBound'>
        <label htmlFor="categ" className='d-flex align-items-center justify-content-center' style={{fontFamily: 'cursive', fontSize: '15px'}}>
          Filter by Category
        </label>
          <Checkbox.Group
          style={{
            width: '70%',
          }}
          onChange={onChange}
          >
            <Row> 
          {categories?.map((c)=>(
            <>
              <Col span={8}>
                <Checkbox value={c._id}>{c.name}</Checkbox>
              </Col>
            </>
          ))}  
          </Row>
        </Checkbox.Group>
        
      </div>
      <div className="container">
        <div className="display">
          {products?.map((p)=>(
            <>
              <div key={p._id}>
                <div className="card" style={{width: '18rem'}}>
                <Link to={`/product/${p.slug}`}><img src={`/api/v1/products/product-photo/${p._id}`}  className="card-img-top" alt={p.slug} style={{height: '287px', width: '287px'}}/></Link>
                  <div className="card-body">
                    <h5 className="card-title-dup-main">{p.name.substring(0, 50)+"..."}</h5>
                    <h5 className='prod-price'><span>$</span>{p.price}</h5>
                  </div>
                  <button onClick={() => {handleAddToCart(p._id, p.name, p.price, p.slug)}}>Add to Cart</button>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
      
    </div>
  )
}

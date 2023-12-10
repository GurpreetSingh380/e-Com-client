import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast'
import Badge from '../images/badge.png'
import '../css/Singleprod.css';

const Singleprod = () => {
    const Navigate = useNavigate();
    const { slug } = useParams();
    const [prod, setProd] = useState();
    const [relProd, setRelProd] = useState([]);
    const [add, setAdd] = useState(false);
    const [rating, setRating] = useState();
    const [ratingStyle, setRatingStyle] = useState({});

    const getSingleProduct = async() => {
        try{
            const {data} = await axios.get(`/api/v1/products/get-product/${slug}`);
            if (data?.success){
                setProd(data.product);
                setRelProd(data.relProducts);
            }
        }
        catch(error){
            console.log(error);
        }
    }
    const getRatings = async() => {
        try{
            const {data} = await axios.get(`/api/v1/ratings/get-rating/${prod?._id}`);
            if (data?.success){
                data.average = Math.round(data.average * 10) / 10;
                setRating(data);
                const percentage = (data?.average/5)*100;
                setRatingStyle({background: `linear-gradient(to right, #6ea15e ${percentage}%, transparent ${percentage}%)`});
            }
        }
        catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
        getSingleProduct();
    }, []);
    useEffect(()=>{
        getRatings();
    }, [prod]);
    const handleAddCart = (id, name, price, slug) => {
        try{
          setAdd(true);
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

    const handleBuyNow = (id, name, price, slug) => {
        try{
          localStorage.removeItem('cart');
          const cartData = [];
          cartData.push({id: id, name: name, price: price, slug: slug, qty: 1});
          localStorage.setItem('cart', JSON.stringify(cartData));
          Navigate('/cart');
        }
        catch(error){
          console.log(error);
        }
    }

  return (
    <div className='wrapper'>
        <div className="centralise text-center">
            <div className="griddy">
                <div className="griddy-left">
                    {prod && <>
                        <div className='image-wrap'><img src={`/api/v1/products/product-photo/${prod._id}`} alt={prod.slug}/></div>
                        <h5 className="card-title">{prod.name}</h5>
                        <h5 className="card-title prod-price"><span>$</span>{prod.price}</h5>
                        <span className='badge'><img src={Badge}/></span>
                    </>}
                </div>
                <div className="griddy-mid">
                    <div className='griddy-middle-heading'>Product Details</div>
                    <div className='desc'>{prod && <>
                        <p className="card-text" style={{fontStyle: 'oblique'}}>
                            <ul className='myList'>
                                {prod.description.map((desc)=>(
                                    <li className='myListItems'>{desc}</li>
                                ))}
                            </ul>
                        </p>
                    </>}</div>
                </div>
                <div className="griddy-right">
                    <div>{prod?.quantity!==0 ? <div className='inStock griddy-right-items'>In Stock</div> : <div className='outStock griddy-right-items'>Out of Stock</div>}</div>
                    {rating && <div className='rating-box'>
                        <div style={ratingStyle} className='active-rating'>{rating?.average}/5</div>
                        <span>Total Ratings: {rating?.totalRatings}</span>
                    </div>}
                    <div className='griddy-right-buttons griddy-right-items'>
                    <button onClick={()=>handleAddCart(prod._id, prod.name, prod.price, prod.slug)}>{!add ? <>Add to Cart</> : <>Added to Cart</>}</button>
                    <button onClick={()=>handleBuyNow(prod._id, prod.name, prod.price, prod.slug)}>Buy Now</button>
                    </div>
                </div>
            </div>

            {/* Recommendations */}
            <div className='relProds'>Related Products</div>
            <div className="col-md-14 d-flex align-items-center">
            <div class="scrollmenu">
            {relProd?.map((p)=>(
                        <> 
                        <div className="inside">
                            <div className="card" style={{width: '13rem'}}>
                            <Link to={`/product/${p.slug}`}><div style={{height: '206px', display: 'flex', alignItems: 'center'}}><img src={`/api/v1/products/product-photo/${p._id}`} style={{height: '100%', width: '100%'}} className="card-img-top" href={`/product/${p.slug}`} alt={p.slug} /></div></Link>
                            <div className="card-body">
                                <h5 className="card-title-dup">{p.name.substring(0, 70)+"..."}</h5>
                                <h5 className='prod-price'><span>$</span>{p.price}</h5>
                            </div>
                            </div>
                        </div>
                        </>
                    ))}
            </div>
            </div>
            <div className="comments">
                
            </div>
        </div>
    </div>
  )
}

export default Singleprod;

import React, { useEffect, useState } from 'react'
import PageHeader from '../components/PageHeader';
import { Link } from 'react-router-dom';
import delImgUrl from '../assets/images/shop/del.png'
import CheckOutPage from './CheckOutPage';

const CartPage = () => {

    const [cartItem, setCartItem] = useState([])
    useEffect(() => {
        //fetch cart item from local storage
        const storedCartItems = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItem(storedCartItems)
    }, [])

    //calculate prices 
    const calcuateTotalPrice = (item) => {
        return item.price * item.quantity;
    }

    //handle quantity increase
    const handleIncrease = (item) => {
        item.quantity += 1;
        setCartItem([...cartItem])

        //update local storage with new cart items
        localStorage.setItem("cart", JSON.stringify(cartItem));
    }

    // handle quantity decrease
    const handleDecrease = (item) => {
        if (item.quantity > 1) {
            item.quantity -= 1;
            setCartItem([...cartItem])

            //update local storage with new cart items
            localStorage.setItem("cart", JSON.stringify(cartItem));
        }
    }

    //handle item remove
    const handleRemoveItem = (item) => {
        const updatedCart = cartItem.filter((cartItem) => cartItem.id !== item.id);

        //update new cart
        setCartItem(updatedCart);

        updateLocalstorage(updatedCart);
    }

    const updateLocalstorage = (cart) => {
        localStorage.setItem("cart", JSON.stringify(cart))
    }

    //cart subtotal

    const cartSubtotal = cartItem.reduce((total, item) => {
        return total + calcuateTotalPrice(item);
    }, 0)

    //order total 
    const orderTotal = cartSubtotal

    return (
        <div>
            <PageHeader title={"Shop Cart"} curPage={"Cart Page"} />

            <div className="shop-cart padding-tb">
                <div className="container">
                    <div className="section-wrapper">
                        {/* Cart top  start*/}
                        <div className="cart-top">
                            <table>
                                <thead>
                                    <tr>
                                        <th className='cat-product'>Product</th>
                                        <th className='cat-price'>Price</th>
                                        <th className='cat-quantity'>Quantity</th>
                                        <th className='cat-toprice'>Total</th>
                                        <th className='cat-edit'>Edit</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        cartItem.map((item, indx) => (
                                            <tr key={indx}>
                                                <td className='product-item cat-product'>
                                                    <div className='p-thumb'>
                                                        <Link to="/shop"><img src={item.img} alt="" /></Link>
                                                    </div>
                                                    <div className='p-content'>
                                                        <Link to="/shop">{item.name}</Link>
                                                    </div>
                                                </td>
                                                <td className="cart-price">$ {item.price}</td>
                                                <td className="cat-quantity">
                                                    <div className="cart-plus-minus">
                                                        <div className="dec qtybutton" onClick={() => handleDecrease(item)}>-</div>
                                                        <input type="text" className='cart-plus-minus-box' name="qtybutton" value={item.quantity} />
                                                        <div className="inc qtybutton" onClick={() => handleIncrease(item)}>+</div>
                                                    </div>
                                                </td>
                                                <td className="cat-toprice">${calcuateTotalPrice(item)}</td>
                                                <td className="cat-edit">
                                                    <a href="#" onClick={() => handleRemoveItem(item)}>
                                                        <img src={delImgUrl} alt="" />
                                                    </a>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                        {/* Cart top end */}


                        {/* Cart bottom */}
                        <div className="cart-bottom">
                            {/* Checkout Box */}
                            <div className="cart-checkout-box">
                                <form className="coupon">
                                    <input className='cart-page-input-text' type="text" name="coupon" id="coupon" placeholder='Coupon code ....' />
                                    <input type="submit" value="Apply Coupon" />
                                </form>

                                <form className="cart-checkout">
                                    <input type="submit" value="Update Cart" />
                                    <div>
                                        <CheckOutPage/>
                                    </div>
                                </form>
                            </div>
                            {/* checkout box end */}

                            {/* Shipping box */}
                            <div className="shiping-box">
                                <div className="row ">
                                    <div className="col-md-6 col-12">
                                        <div className="calculate-shiping">
                                            <h3>Calculate Shiping</h3>
                                            <div className="outline-select">
                                                <select>
                                                    <option value="uk">United Kingdom (UK)</option>
                                                    <option value="us">United States (USA)</option>
                                                    <option value="ind">India</option>
                                                    <option value="bd">Bangladesh</option>
                                                    <option value="pk">Pakisthan</option>
                                                    <option value="np">Nepal</option>
                                                </select>
                                                <span className="select-icon">
                                                    <i className="icofont-rounded-down"></i>
                                                </span>
                                            </div>

                                            <div className="outline-select shipping-select">
                                                <select>
                                                    <option value="uk">New York</option>
                                                    <option value="us">London</option>
                                                    <option value="ind">New Delhi</option>
                                                    <option value="bd">Dhaka</option>
                                                    <option value="pk">Karachi</option>
                                                </select>
                                                <span className="select-icon">
                                                    <i className="icofont-rounded-down"></i>
                                                </span>
                                            </div>
                                            <input type="text" name='postalCode' id='postalCode' className='cart-page-input-text' 
                                            placeholder='Postalcode/ZIP *' />
                                            <button type='submit'>Update Address</button>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-12">
                                        <div className="cart-overview">
                                            <h3>Cart Total</h3>
                                            <ul className="lab-ul">
                                                <li>
                                                    <span className='pull-left'>Cart Subtotal</span>
                                                    <p className="pull-right">$ {cartSubtotal}</p>
                                                </li>
                                                <li>
                                                    <span className="pull-left">Shipping and Handling</span>
                                                    <p className="pull-right">Free Shipping</p>
                                                </li>
                                                <li>
                                                    <span className="pull-left">Order Total</span>
                                                    <p className="pull-right">$ {orderTotal.toFixed(2)}</p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartPage
import React from "react";
import '../pages/CartPage.css';

function CartPage({ cart, updateQuantity, removeItem }) {
  const totalPrice = cart.reduce((total, item) => {
    const price = Number(item.newprice);
    return total + price * item.quantity;
  }, 0);

  const shippingCost = 0;
  const taxCost = totalPrice * 0.07;
  const total = totalPrice + shippingCost + taxCost;

  const handleIncrement = (index) => {
    updateQuantity(index, 1); 
  };

  const handleDecrement = (index) => {
    updateQuantity(index, -1); 
  };

  const handleDelete = (index) => {
    removeItem(index);
  }



  return (
    <div className="cart-page">
      <h2 className="title">Your Shopping Cart</h2>
      
      {cart.length > 0 ? (
        <>
          <ul>
            {cart.map((item, index) => (
              <li key={`${item.title}-${index}`} className="cart-item">
                <img src={item.img} alt={item.title} width="50" className="cart-image" />
                <span className="cart-title">{item.title}</span> ${Number(item.newprice).toFixed(2)} (Qty: {item.quantity})
                <div className="quantity-controls">
                  <button className="minor" onClick={() => handleDecrement(index)} disabled={item.quantity <= 1}>−</button>
                  <span>  {item.quantity}  </span>
                  <button className='plus' onClick={() => handleIncrement(index)}>+</button>
                  <button className='cart-del' onClick={() => handleDelete(index)}> remove </button>
                </div>
              </li>
            ))}
          </ul>
          <h3 className="total-price">Prices Summary: ${totalPrice.toFixed(2)}</h3>
          <h4 className="shipping">Shipping Cost (0% PROMOTION): ${shippingCost.toFixed(2)}</h4>
          <h4 className="tax">Tax (7%): ${taxCost.toFixed(2)}</h4>
          <h3 className="total-price">Total: ${total.toFixed(2)}</h3>
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
}

export default CartPage;

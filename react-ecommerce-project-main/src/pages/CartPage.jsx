import React from "react";
import '../pages/CartPage.css';

function CartPage({ cart, updateQuantity, removeItem }) {
  const totalPrice = cart.reduce((total, item) => {
    const price = Number(item.newPrice);
    return total + price * item.quantity;
  }, 0);

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
                <span className="cart-title">{item.title}</span> ${Number(item.newPrice).toFixed(2)} (Qty: {item.quantity})
                <div className="quantity-controls">
                  <button onClick={() => handleDecrement(index)} disabled={item.quantity <= 1}>−</button>
                  <span>  {item.quantity}  </span>
                  <button onClick={() => handleIncrement(index)}>+</button>
                  <button onClick={() => handleDelete(index)}> remove </button>
                </div>
              </li>
            ))}
          </ul>
          <h3 className="total-price">Total: ${totalPrice.toFixed(2)}</h3>
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
}

export default CartPage;

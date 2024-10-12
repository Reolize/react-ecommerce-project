import React from 'react';

const CartPage = () => {
  const cartItems = [
    { id: 1, name: 'Product 1', price: '$10', quantity: 2 },
    // Add more cart items here or fetch from state
  ];

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div>
      <h1>Your Cart</h1>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.name} - {item.price} x {item.quantity}
          </li>
        ))}
      </ul>
      <p>Total: ${total}</p>
      <button>Proceed to Checkout</button>
    </div>
  );
};

export default CartPage;

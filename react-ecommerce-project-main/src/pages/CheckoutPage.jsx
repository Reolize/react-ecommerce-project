import React, { useState } from 'react';

const CheckoutPage = () => {
  const [userDetails, setUserDetails] = useState({ name: '', address: '', email: '' });

  const handleInputChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit order logic here
    console.log(userDetails);
  };

  return (
    <div>
      <h1>Checkout</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" onChange={handleInputChange} value={userDetails.name} />
        </div>
        <div>
          <label>Address:</label>
          <input type="text" name="address" onChange={handleInputChange} value={userDetails.address} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" onChange={handleInputChange} value={userDetails.email} />
        </div>
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default CheckoutPage;

// Card.js
import React from 'react';

const Card = ({ img, title, prevprice, newprice, addToCart }) => {
  // Log the received props for debugging
  console.log("Card Props:", { img, title, prevprice, newprice });

  // Convert string prices to numbers
  const prevPriceNum = parseFloat(prevprice.replace(/[$,]/g, ''));
  const newPriceNum = parseFloat(newprice.replace(/[$,]/g, ''));

  // Calculate discount percentage
  const discountPercentage = prevPriceNum && newPriceNum 
    ? ((prevPriceNum - newPriceNum) / prevPriceNum) * 100 
    : 0;

  return (
    <div className="card">
      <img src={img} alt={title} className="card-img" />
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <div className="price-container">
          {prevprice && (
            <p className="card-prev-price" >
              {`$${prevprice}`}
            </p>
          )}
          {prevPriceNum && newPriceNum && (
            <p className="card-discount">
              {discountPercentage.toFixed(2)}%
            </p>
          )}
        </div>
        <p className="card-new-price">{newprice ? `$${newprice}` : 'N/A'}</p>
        <button onClick={addToCart} className="add-to-cart-btn">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Card;

import React from 'react';
import { useParams } from 'react-router-dom';

const ProductDetailPage = () => {
  const { id } = useParams();
  const product = { id, name: 'Product ' + id, price: '$' + id * 10, description: 'This is product ' + id };

  return (
    <div>
      <h1>{product.name}</h1>
      <p>Price: {product.price}</p>
      <p>Description: {product.description}</p>
      <button>Add to Cart</button>
    </div>
  );
};

export default ProductDetailPage;

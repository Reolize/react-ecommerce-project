import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Warehouse = () => {
  const [products, setProducts] = useState([]);
  const [forms, setForms] = useState([
    {
      img: '',
      title: '',
      prevprice: '',
      newprice: '',
      company: '',
      color: '',
      category: '',
      quantity: 0,
    },
  ]);
  const [editProduct, setEditProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // New state for search term

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:4000/products/fetch');
      console.log("Fetched Products :", response.data);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const newForms = [...forms];
    newForms[index][name] = value;
    setForms(newForms);
  };

  const addProductForm = () => {
    setForms([
      ...forms,
      {
        img: '',
        title: '',
        prevprice: '',
        newprice: '',
        company: '',
        color: '',
        category: '',
        quantity: 0,
      },
    ]);
  };

  const submitProducts = async () => {
    try {
      const response = await axios.post('http://localhost:4000/products/create', forms[0]);
      setProducts([...products, response.data]);
      resetForms();
    } catch (error) {
      console.error('Error adding products:', error);
    }
  };

  const startEditProduct = (product) => {
    setEditProduct(product);
    setForms([{
      img: product.img,
      title: product.title,
      prevprice: product.prevprice,
      newprice: product.newprice,
      company: product.company,
      color: product.color,
      category: product.category,
      quantity: product.quantity,
    }]);
    window.scrollTo(0, 0);
  };

  const deleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`http://localhost:4000/products/delete/${id}`);
        setProducts(products.filter((product) => product._id !== id));
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const updateProduct = async () => {
    if (!editProduct) return;

    try {
      const response = await axios.put(`http://localhost:4000/products/update/${editProduct._id}`, forms[0]);
      setProducts(products.map(product => (product._id === editProduct._id ? response.data : product)));
      resetForms();
      setEditProduct(null);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const resetForms = () => {
    setForms([
      {
        img: '',
        title: '',
        prevprice: '',
        newprice: '',
        company: '',
        color: '',
        category: '',
        quantity: 0,
      },
    ]);
  };

  // Filter products based on the search term
  const filteredProducts = products.filter(product =>
    Object.values(product).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="warehouse">
      <h2>Product Warehouse</h2>

      {/* Search bar */}
      <div>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginBottom: '20px', padding: '8px', width: '20%' }}
        />
      </div>

      {/* Form for adding new products */}
      <div>
        <h3>{editProduct ? "Edit Product" : "Add New Product"}</h3>
        {forms.map((form, index) => (
          <div key={index} style={{ display: 'flex',marginBottom: '20px', gap: '15px' }}>
            {/* Input fields */}
            <input
              name="img"
              placeholder="Image URL"
              value={form.img}
              onChange={(e) => handleChange(index, e)}
            />
            <input
              name="title"
              placeholder="Title"
              value={form.title}
              onChange={(e) => handleChange(index, e)}
            />
            <input
              name="prevprice"
              placeholder="Previous Price"
              value={form.prevprice}
              onChange={(e) => handleChange(index, e)}
            />
            <input
              name="newprice"
              placeholder="New Price"
              value={form.newprice}
              onChange={(e) => handleChange(index, e)}
            />
            <input
              name="company"
              placeholder="Company"
              value={form.company}
              onChange={(e) => handleChange(index, e)}
            />
            <input
              name="color"
              placeholder="Color"
              value={form.color}
              onChange={(e) => handleChange(index, e)}
            />
            <input
              name="category"
              placeholder="Category"
              value={form.category}
              onChange={(e) => handleChange(index, e)}
            />
            <input
              name="quantity"
              type="number"
              placeholder="Quantity"
              value={form.quantity}
              onChange={(e) => handleChange(index, e)}
            />
          </div>
        ))}
        <button type="button" onClick={editProduct ? updateProduct : submitProducts}>
          {editProduct ? "Update Product" : "Submit Products"}
        </button>
      </div>

      {/* Product List */}
      <h3>Product List</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {filteredProducts.map((product) => (
          <div key={product._id} style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'center' }}>
            <img
              src={product.img}
              alt={product.company}
              style={{
                width: '200px',
                height: '130px',
              }}
            />
            <p>Title: {product.title}</p>
            <p>Previous Price: ${product.prevprice}</p>
            <p>New Price: ${product.newprice}</p>
            <p>Company: {product.company}</p>
            <p>Color: {product.color}</p>
            <p>Category: {product.category}</p>
            <p>Quantity: {product.quantity}</p>
            <button onClick={() => startEditProduct(product)}>Edit</button>
            <button onClick={() => deleteProduct(product._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Warehouse;

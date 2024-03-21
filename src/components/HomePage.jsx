// HomePage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddProductForm from './AddProductForm';
import SearchBar from './SearchBar';
import ProductList from './ProductList';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';


  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  const handleAddProduct = (product) => {
    // Check for duplicates
    const isDuplicate = products.some((p) => p.productName === product.productName);
    if (isDuplicate) {
      alert('Product with this name already exists.');
      return;
    }

    // Add product to the list
    setProducts([...products, product]);
  };

  const handleSearch = (query) => {
    // Filter products based on search query
    const filteredProducts = products.filter((product) =>
      product.productName.toLowerCase().includes(query.toLowerCase())
    );
    // Update product list
    setProducts(filteredProducts);
  };

  const handleLogout = () => {
    // Clear authentication status
    localStorage.removeItem('isLoggedIn');
    // Navigate to login page
    navigate('/login');
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '50px',
        padding: '20px',
        borderRadius: '10px',
        background: '#eaf4f1',
      }}
    >
      <button
        style={{ marginBottom: '16px', padding: '8px 16px', borderRadius: '5px', background: '#fff', color: '#0099ff', border: '1px solid #0099ff', cursor:"pointer" , marginLeft:"auto"}}
        onClick={handleLogout}
      >
        Logout
      </button>
      <div style={{ width: '50%', marginBottom: '24px' }}>
        <AddProductForm onAddProduct={handleAddProduct} />
      </div>
      <div style={{ width: '50%', marginBottom: '24px' }}>
        <SearchBar onSearch={handleSearch} />
      </div>
      <div style={{ width: '50%' }}>
        <ProductList products={products} />
      </div>
    </div>
  );
};

export default HomePage;

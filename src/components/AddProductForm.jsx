// AddProductForm.jsx
import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';

const AddProductForm = ({ onAddProduct }) => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = () => {
    if (!productName || !price) {
      message.error('Please enter product name and price.');
      return;
    }

    const newProduct = { productName, price: parseFloat(price) };
    onAddProduct(newProduct);

    // Reset form fields
    setProductName('');
    setPrice('');
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
      <h2>Add Product</h2>
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="Product Name" style={{ marginBottom: '12px' }}>
          <Input value={productName} onChange={(e) => setProductName(e.target.value)} style={{ marginBottom: '12px' }} />
        </Form.Item>
        <Form.Item label="Price" style={{ marginBottom: '12px' }}>
          <Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} style={{ marginBottom: '12px' }} />
        </Form.Item>
        <Form.Item style={{ marginBottom: 0 }}>
          <Button type="primary" htmlType="submit">Add</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddProductForm;

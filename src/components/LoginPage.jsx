import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message, Spin } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // State to track loading status
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/home');
    }
  }, [isLoggedIn, navigate]);

  const handleLogin = async () => {
    setLoading(true); // Set loading state to true when login button is clicked
    try {
      const response = await fetch('https://reqres.in/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('isLoggedIn', 'true');
        navigate('/home');
      } else {
        message.error(data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      message.error('An error occurred. Please try again.');
    } finally {
      setLoading(false); // Set loading state to false after API request completes
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'linear-gradient(to right, #72abfb, white)' }}>
      <Form
        style={{ width: 300, padding: 20, borderRadius: 10, background: '#fff', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}
        onFinish={handleLogin}
        initialValues={{ remember: true }}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ borderRadius: 5 }}
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ borderRadius: 5 }}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%', borderRadius: 5 }} loading={loading}>
            {loading ? <Spin size="small" /> : 'Log in'} {/* Display Spin loader when loading */}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;

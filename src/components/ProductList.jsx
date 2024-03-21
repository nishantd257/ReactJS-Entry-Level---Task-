// ProductList.jsx
import React from 'react';
import { List, Empty, Card } from 'antd';

const ProductList = ({ products }) => {
  return (
    <div>
      <h2>List of Added Products</h2>
      {products.length > 0 ? (
        <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={products}
        renderItem={(item) => (
          <List.Item>
            <Card title={item.productName} bordered={true} style={{ backgroundColor: '#fff' }}>
              ${item.price}
            </Card>
          </List.Item>
        )}
      />
      ) : (
        <Empty description="No Product Found" />
      )}
    </div>
  );
};

export default ProductList;

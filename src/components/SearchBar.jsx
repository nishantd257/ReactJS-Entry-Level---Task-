// SearchBar.jsx
import React from 'react';
import { Input } from 'antd';

const SearchBar = ({ onSearch }) => {
  const handleSearch = (value) => {
    onSearch(value);
  };

  return (
    <Input.Search
      placeholder="Search products by name"
      allowClear
      onSearch={handleSearch}
      style={{ width: 300, marginBottom: 24 }}
    />
  );
};

export default SearchBar;

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledSelect = styled.select`
  width: 100px;
  height: 20px;
  flex-shrink: 0;
  border-radius: 5px;
  border: 1px solid #B4B4B4;
  background: #FFF;
  font-size: 10px;
  color: #333;
`;

const ProductDropdown = ({ onSelect }) => {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (!userInfo) throw new Error('User info not found in localStorage');
        
        const { accessToken, memberId } = userInfo;

        const response = await fetch(`http://15.165.14.203/api/member-data/products/${memberId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        
        const data = await response.json();
        setProducts(data); // API에서 가져온 데이터를 상태에 설정
      } catch (error) {
        setError(error.message);
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

    return () => {
      // Optionally, you can clear products on unmount
      // setProducts([]);
    };
  }, []);

  const handleChange = (e) => {
    const selectedId = e.target.value;
    setSelectedProductId(selectedId);
    onSelect(selectedId);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <StyledSelect value={selectedProductId} onChange={handleChange}>
        <option value="">상품을 선택하세요</option>
        {products.map((product) => (
          <option key={product.id} value={product.id}>
            {product.productName}
          </option>
        ))}
      </StyledSelect>
    </div>
  );
};

ProductDropdown.propTypes = {
  onSelect: PropTypes.func.isRequired,
};

export default ProductDropdown;

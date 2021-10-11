import React from 'react';
import Product from './Product';

function Products() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      <Product />
    </div>
  );
}

export default Products;

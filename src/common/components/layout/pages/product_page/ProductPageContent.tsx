import React from 'react';
import Image from 'next/image';

export interface IProduct {
  path: string;
  id: number;
}

interface IProductPageContentProps {
  productType: string;
  product: IProduct;
}

const ProductPageContent: React.FC<IProductPageContentProps> = ({
  product,
  productType,
}) => {
  return (
    <div style={{ flexGrow: 1, width: '984px' }}>
      This is the <em>{productType}</em> product page for{' '}
      <strong>{product.path}</strong>
      <br />
      <br />
      Product data:
      <pre>{JSON.stringify(product, null, 2)}</pre>
    </div>
  );
};
export default ProductPageContent;

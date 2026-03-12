import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Product} from "../models/Product";
import {ProductType} from "../models/ProductType";

const Products = ({productType}: { productType: ProductType }) => {
    const [listOfProducts, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get<Product[]>(`http://localhost:3001/get-products-by-category?productType=${productType.toString()}`);
                const products = response.data.map(item => new Product(item));
                setProducts(products);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [productType]);

    return (
        <div className="content-container">
            <h2>Products</h2>
            <div className='product-item-container'>
        {listOfProducts.map((product, index) => (
                <div className='product-item' key={index}>
            <img src={product.imageUrl} alt={product.title} style={{ width: '100px', height: '100px' }} />
    <h3>{product.title}</h3>
    <p>Price: ${product.getPrice()}</p>
    </div>
))}
    </div>
    </div>
);

};

export default Products;

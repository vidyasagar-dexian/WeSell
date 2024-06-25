import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import getProducts from '../Services/ProductServices';

function Products() {
    const dispatch = useDispatch();
    const productList = useSelector(state => state.productSlice);
    
    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    return (
        <Container>
            <Row style={{ marginTop: '20px', marginBottom: '20px' }}>
                {productList.map((product, index) =>
                    <ProductCard key={index} product={product} />
                )}
            </Row>
        </Container>
    );
}

export default Products;
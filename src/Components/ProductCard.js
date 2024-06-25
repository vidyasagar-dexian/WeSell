import React from 'react';
import { Col, Card, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import {add} from '../Redux-store/CartSlice';

const ProductCard = ({ product }) => {
    const { title, price } = product;
    const image = product.image;
    const dispatch = useDispatch();

    const addToCart = ()=>{
        dispatch(add(product));
    }

    return (
        <Col xs={12} sm={6} md={4} lg={3} style={{marginBottom:'20px'}}>
            <Card style={{ height: '100%' }}>
                <Card.Img variant="top" src={image} alt={title} style={{ height: '200px',padding:"5px", objectFit: 'contain' }} />
                <Card.Body style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                        <Card.Title>{title}</Card.Title>
                        <Card.Text>${price}</Card.Text>
                    </div>
                    <Button variant="primary" onClick={addToCart}>Add to Cart</Button>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default ProductCard;

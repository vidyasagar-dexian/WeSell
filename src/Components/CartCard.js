import React from 'react';
import { Col, Card, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { remove } from '../Redux-store/CartSlice';

const CartCard = ({product}) => {
    const { title, price } = product;
    const image = product.image;
    const dispatch = useDispatch();
    const removeFromCart=()=>{
        dispatch(remove(product.id));
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
                    <Button variant="danger" onClick={removeFromCart}>Remove</Button>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default CartCard;

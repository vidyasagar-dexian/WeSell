import { Container, Row } from 'react-bootstrap';
import CartCard from './CartCard';
import { useSelector } from 'react-redux';

function Cart() {
    const cartProducts = useSelector(state =>state.cartSlice)
    return (
        <Container >
            <Row style={{ marginTop: '20px',marginBottom: '20px'}}>
                {cartProducts.map((product, index) =>
                    <CartCard key={index} product={product} />
                )}
            </Row>
        </Container>
    );
}

export default Cart;

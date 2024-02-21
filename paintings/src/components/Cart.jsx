import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import { Navigationbar } from './Navigationbar';
import './Cart.css';
import { faShoppingCart, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './Collections.css';
import BackTop from 'antd/es/float-button/BackTop';

const Cart = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const newId = sessionStorage.getItem('userId');
    const [totalAmount, setTotalAmount] = useState(0);
    const [showBackToTop, setShowBackToTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowBackToTop(true);
            } else {
                setShowBackToTop(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };


    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/shopping-cart/${newId}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch cart: ${response.status}`);
                }

                const data = await response.json();
                setCart(data);
                const calculatedTotalAmount = data.arts.reduce((acc, art) => acc + art.price, 0);
                setTotalAmount(calculatedTotalAmount);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, []);

    const [artToRemove, setArtToRemove] = useState(null);
    const [removeError, setRemoveError] = useState(false);
    const [removeSuccess, setRemoveSuccess] = useState(false);

    const handleRemoveFromCart = async (artId) => {
        try {
            const response = await fetch(`http://localhost:8080/api/shopping-cart/${newId}/delete/${artId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setRemoveSuccess(true);
                setArtToRemove(null);
            } else {
                setRemoveError(true);

                console.error('Failed to remove item from cart:', response.status);
            }
        } catch (error) {
            setRemoveError(true);
            console.error('Error removing item from cart:', error);
        }
    };

    const handleCloseModals = () => {
        window.location.reload();
        setRemoveSuccess(false);
        setRemoveError(false);
    };

    return (
        <>
            <Navigationbar />
            &nbsp;&nbsp;&nbsp;<Button variant='btn btn-outline-secondary' className='mt-3' onClick={() => navigate(-1)}>
                <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Back
            </Button>

            <section className="h-100 gradient-form">
                <Container className="py-5 h-100">
                    <Row>
                        <Col>
                            <div>
                                <img src={`https://www.truthmedia.gr/sites/default/files/online-shopping-ecommerce-ss-1920_1.png`} className="temp-img mb-5" />
                            </div>

                        </Col>
                    </Row>
                    <Row className="d-flex justify-content-center align-items-center h-100">
                        <div className="text-center">
                            <h2 className="cart-title"><b>Shopping Cart</b></h2>
                        </div>
                        <Col xl={10}>
                            <div className="card rounded-3 text-black">
                                <div className='mt-2'>
                                    <FontAwesomeIcon icon={faShoppingCart} className="cart-icon" />
                                    <span className="ml-2"> Items in Cart: {cart?.arts.length}</span>
                                </div>
                                <Row className="g-0">
                                    <Col lg={6}>
                                        <div className="card-body">
                                            <div className="cart-info-container">
                                                <div className="items">
                                                    <ul className="art-items-list">
                                                        {cart?.arts.map((art) => (
                                                            <ul key={art.id} className="item-in-cart">
                                                                <img src={`http://localhost:8080/artist/fetch/pic/${art.id}`} alt={art.title} className="art-image mb-5" />
                                                                <div className="art-info">
                                                                    <p className="art-title"><b>Title:</b> {art.title}</p>
                                                                    <p className="art-artist"><b>Artist:</b> {art.artistName}</p>
                                                                    <p className="art-size"><b>Size:</b> {art.size}</p>
                                                                    <p className="art-medium"><b>Medium:</b> {art.medium}</p>
                                                                    <p className="art-price"><b>Price:</b> {art.price}</p>
                                                                    <Button
                                                                        variant="danger"
                                                                        className="remove-button"
                                                                        onClick={() => {
                                                                            setArtToRemove(art);
                                                                            handleRemoveFromCart(art.id);
                                                                        }}
                                                                    >
                                                                        <FontAwesomeIcon icon={faTrash} className="mr-2" />
                                                                        Remove
                                                                    </Button>
                                                                </div>
                                                            </ul>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col lg={6}>
                                        <div className='mt-4'>
                                            <p className="cart-info"><b>Total Amount:</b> ${totalAmount.toFixed(2)}</p>
                                            <p className="cart-info"><b>Status:</b> {cart?.status}</p>
                                        </div>

                                        <div className="mt-3">
                                            <Button>Proceed to Checkout</Button>
                                        </div>
                                    </Col>


                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>


            <Modal show={removeSuccess} onHide={handleCloseModals}>
                <Modal.Header closeButton>
                    <Modal.Title>Item Removed</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>The item has been successfully removed from your cart.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleCloseModals}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Remove Error Modal */}
            <Modal show={removeError} onHide={handleCloseModals}>
                <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>There was an error removing the item from your cart. Please try again later.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleCloseModals}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {showBackToTop && (
                <BackTop>
                    <Button type="primary" shape="circle" icon={<i class="fa-solid fa-chevron-up"></i>} onClick={scrollToTop} />
                </BackTop>
            )}

        </>
    );
};

export default Cart;

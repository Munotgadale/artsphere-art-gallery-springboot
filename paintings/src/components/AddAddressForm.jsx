import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Navigationbar } from './Navigationbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import BackTop from 'antd/es/float-button/BackTop';

const AddAddressForm = () => {
    const navigate = useNavigate();
    const newid = sessionStorage.getItem('userId');
    const newAddressArtId = sessionStorage.getItem('addressArtId');

    const [showBackToTop, setShowBackToTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowBackToTop(window.scrollY > 300);
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

    const [address, setAddress] = useState({
        name: '',
        phoneNumber: '',
        email: '',
        address: '',
        city: '',
        country: '',
        pincode: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleInputChange = (e) => {
        setAddress((prevAddress) => ({ ...prevAddress, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError(null);
        setSuccessMessage(null);

        try {
            const response = await fetch(`http://localhost:8080/api/address/add/${newAddressArtId}/${newid}`, {
                method: 'POST',
                body: JSON.stringify(address), 
                headers: {
                    'Content-Type': 'application/json',
                },
            });


            console.log(response);

            setTimeout(() => {
                navigate('/add-to-cart');
            }, 2000);

            if (response.ok) {
                setSuccessMessage('Address added successfully');
                setAddress({
                    name: '',
                    phoneNumber: '',
                    email: '',
                    address: '',
                    city: '',
                    country: '',
                    pincode: '',
                });
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Failed to add address');
            }
        } catch (error) {
            setError('Error: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navigationbar />
            &nbsp;&nbsp;&nbsp;
            <Button variant="btn btn-outline-secondary" className="mt-3" onClick={() => navigate(-1)}>
                <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Back
            </Button>
            <Container>
                <h1>
                    <b>Enter the Delivery Address</b>
                </h1>
                <Row className="justify-content-center mt-5">
                    <Col lg={5} className="d-flex align-items-center gradient-custom-2">
                        <div className="text-black px-3 py-4 p-md-5 mx-md-4">
                            <h4 className="mb-4">Artsphere Art Gallery</h4>
                            <p className="small mb-0">
                                Artsphere Art Gallery is a haven for art enthusiasts, showcasing a diverse collection
                                of contemporary and traditional artworks. Our mission is to promote and celebrate
                                artistic expression, providing a platform for both emerging and established artists
                                to connect with a broader audience. Explore the beauty of creativity as we curate
                                exhibitions that captivate the imagination and inspire a deeper appreciation for
                                the arts.
                            </p>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="card">
                            <div className="card-body">
                                {error && <div className="alert alert-danger">{error}</div>}
                                {successMessage && <div className="alert alert-success">{successMessage}</div>}
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group controlId="formName">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="name"
                                            value={address.name}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formPhoneNumber">
                                        <Form.Label>Phone Number</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="phoneNumber"
                                            value={address.phoneNumber}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            value={address.email}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formAddress">
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            name="address"
                                            value={address.address}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formCity">
                                        <Form.Label>City</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="city"
                                            value={address.city}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formCountry">
                                        <Form.Label>Country</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="country"
                                            value={address.country}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formPincode">
                                        <Form.Label>Pincode</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="pincode"
                                            value={address.pincode}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </Form.Group>

                                    <Button variant="primary" type="submit" disabled={loading}>
                                        {loading ? 'Submitting...' : 'Submit'}
                                    </Button>
                                </Form>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
            {showBackToTop && (
                <BackTop>
                    <Button
                        type="primary"
                        shape="circle"
                        icon={<i className="fa-solid fa-chevron-up"></i>}
                        onClick={scrollToTop}
                    />
                </BackTop>
            )}
        </>
    );
};

export default AddAddressForm;

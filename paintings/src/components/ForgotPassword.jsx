import React, { useState } from 'react';
import { Button, Container, Form, Modal, Row, Col } from 'react-bootstrap';
import { Navigationbar } from './Navigationbar';
import './ForgotPassword.css';
import { forgotArtistPass, forgotPass } from '../Services/UserService';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const sendPasswordResetEmail = async () => {
        try {
            const response = await forgotPass(email);
            console.log(response);

            if (response === "User password reset email sent successfully") {
                setMessage(response);
                setShowModal(true);
                setTimeout(() => {
                    navigate('/log-in');
                }, 2000);
            } else {
                throw new Error("First API call failed");
            }
        } catch (error) {
            console.error(error);
            try {
                const artistResponse = await forgotArtistPass(email);
                console.log(artistResponse);

                if (artistResponse === "Artist password reset email sent successfully") {
                    setMessage(artistResponse);
                    setShowModal(true);
                    setTimeout(() => {
                        navigate('/log-in');
                    }, 2000);
                } else {
                    setMessage("Both API calls failed");
                    setShowModal(true);
                }
            } catch (secondApiError) {
                setMessage(secondApiError.message);
                setShowModal(true);
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        sendPasswordResetEmail();
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <Navigationbar />
            &nbsp;&nbsp;&nbsp;<Button variant='btn btn-outline-secondary' className='mt-3' onClick={() => navigate(-1)}>
                <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Back
            </Button>
            <Container className="vh-100">
                <Row className="d-flex align-items-center justify-content-center h-100">
                    <Col md={6} lg={5} xl={5}>
                        <img
                            src="https://bootstrapbrain.com/demo/components/password-resets/password-reset-8/assets/img/logo-img-1.webp"
                            alt='img'
                            className="img-fluid"
                        />
                    </Col>
                    <Col md={6} lg={5} xl={5} className="custom-form-col">
                        <div className="col-md-12">
                            <h2 className="mb-3 text-center"><b>Password Reset</b></h2>
                            <p className="funny-text">Don't worry, we've all been there! Enter your email address below, and we'll work our magic to help you reset your password.</p>
                            <Form onSubmit={handleSubmit} className="forgot-password-form">
                                <Form.Group className="mb-4">
                                    <Form.Label>Email:</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter your email address"
                                        value={email}
                                        onChange={handleEmailChange}
                                        required
                                    />
                                </Form.Group>
                                <Button type="submit" className="btn btn-warning btn-lg mx-auto d-block subBtn">
                                    Submit
                                </Button>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Password Reset Status</Modal.Title>
                </Modal.Header>
                <Modal.Body>{message}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ForgotPassword;

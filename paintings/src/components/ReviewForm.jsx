import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import './ReviewForm.css';
import StarRating from 'react-rating-stars-component';
import { Navigationbar } from './Navigationbar';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import BackTop from 'antd/es/float-button/BackTop';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';  
import { isAuthenticated } from '../utils/TokenUtil';

const ReviewForm = ({ onUpload }) => {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        if(isAuthenticated()){
        e.preventDefault();

        const apiUrl = 'http://localhost:8080/api/reviews/add-review';

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userName,
                    userEmail,
                    comment,
                    rating,
                }),
            });
            console.log(response);
            if (response.ok == true) {
                setUserName('');
                setUserEmail('');
                setComment('');
                setRating(1);
                setShowModal(true);
                setModalMessage('Review submitted successfully!');
            } else {
                console.error('Failed to upload review');
                setShowModal(true);
                setModalMessage('Failed to submit review. Please try again.');
            }
        } catch (error) {
            console.error('Error uploading review:', error);
            setShowModal(true);
            setModalMessage('Error uploading review. Please try again.');
        }
    }else{
        navigate(`/log-in`);
    }
    };
    

    const handleCloseModal = () => {
        setShowModal(false);
    };

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

    return (
        <>
            <Navigationbar></Navigationbar>
            &nbsp;&nbsp;&nbsp;<Button variant='btn btn-outline-secondary' className='mt-3' onClick={() => navigate(-1)}>
                <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Back
            </Button>
            <Container className="py-5 h-100">
                <div className="text-center">
                    <h2 className="revive-h2 mb-2"><b>Artsphere Art Gallery</b></h2>
                    <h4 className="revive-h2 mb-3">Share Your Experience</h4>
                </div>
                <Row className="d-flex justify-content-center align-items-center h-100">
                    <Col xl={6}>
                        <div className="card rounded-3 text-black p-md-5 mx-md-4">


                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-4">
                                    <Form.Label>Name:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={userName}
                                        onChange={(e) => setUserName(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-4">
                                    <Form.Label>Email:</Form.Label>
                                    <Form.Control
                                        type="email"
                                        value={userEmail}
                                        onChange={(e) => setUserEmail(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-4">
                                    <Form.Label>Comment:</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-4">
                                    <Form.Label>Rating:</Form.Label>
                                    <StarRating
                                        count={5}
                                        size={40}
                                        value={rating}
                                        onChange={(newRating) => setRating(newRating)}
                                    />
                                    {rating === 5 ? (
                                        <p className="text-success">Best</p>
                                    ) : rating >= 4 ? (
                                        <p className="text-success">Good</p>
                                    ) : rating >= 2 ? (
                                        <p className="text-warning">Better</p>
                                    ) : (
                                        <p className="text-danger">Bad</p>
                                    )}
                                </Form.Group>
                                <div className="text-center pt-1 mb-5 pb-1">
                                    <Button
                                        variant="primary"
                                        className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                                        type="submit"
                                    >
                                        Submit Review
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </Col>
                    <Col xl={6}>
                        <div className="card rounded-3 text-black p-md-5 mx-md-4">

                            <p className="review-art mt-1">
                                Artsphere Art Gallery is a haven for art enthusiasts, showcasing a diverse collection
                                of contemporary and traditional artworks. Our mission is to promote and celebrate
                                artistic expression, providing a platform for both emerging and established artists
                                to connect with a broader audience. Explore the beauty of creativity as we curate
                                exhibitions that captivate the imagination and inspire a deeper appreciation for
                                the arts.
                            </p>
                            <Row className="mb-2">
                                <Col xs={12}>
                                    <img
                                        src="https://www.searchenginejournal.com/wp-content/uploads/2021/12/google-reviews-map-61b9ed75818cc-sej.png"
                                        alt="Art"
                                        className="img-fluid rounded"
                                    />
                                </Col>

                            </Row>
                            <p className="review-art mb-0">
                                Join us in celebrating the diversity of artistic expression. Our gallery provides a
                                welcoming space for art lovers to explore and connect with the world of creativity.
                                Whether you're a seasoned art enthusiast or just beginning your art journey, Artsphere
                                Art Gallery invites you to immerse yourself in the vibrant world of visual arts.
                            </p>
                        </div>
                    </Col>
                </Row>

                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Review Status</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{modalMessage}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>

            {showBackToTop && (
                <BackTop>
                    <Button type="primary" shape="circle" icon={<i class="fa-solid fa-chevron-up"></i>} onClick={scrollToTop} />
                </BackTop>
            )}
        </>
    );
};

export default ReviewForm;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import { Navigationbar } from './Navigationbar';
import './AuctionForm.css';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import BackTop from 'antd/es/float-button/BackTop';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AuctionForm = () => {
    const navigate = useNavigate();
    const [artId, setArtId] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        setArtId(sessionStorage.getItem('auctionArtId'));

        try {
            const response = await axios.post('http://localhost:8080/api/auctions/create-auction', {
                art: { id: artId },
                startTime,
                endTime,
            });

            console.log('Auction created successfully:', response.data);

            setModalMessage('Auction created successfully');
            setShowModal(true);

            navigate('/bidding-collection');

        } catch (error) {
            console.error('Error creating auction:', error.message);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <Navigationbar />
            &nbsp;&nbsp;&nbsp;
            <Button variant='btn btn-outline-secondary' className='mt-3' onClick={() => navigate(-1)}>
                <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Back
            </Button>
            <section className="h-100 gradient-form">
                <Container className="py-5 h-100">
                    <Row className="d-flex justify-content-center align-items-center h-100">
                        <Col xl={10}>
                            <div className="card rounded-3 text-black">
                                <Row className="g-0">
                                    <Col lg={6}>
                                        <div className="card-body p-md-5 mx-md-4">
                                            <div className="text-center">
                                                <h4 className="mt-1 mb-5 pb-1">Create Auction</h4>
                                            </div>

                                            <Form onSubmit={handleSubmit}>
                                                <Form.Group className="mb-4">
                                                    <Form.Label className="form-label" htmlFor="startDateTime">
                                                        Start Time:
                                                    </Form.Label>
                                                    <Form.Control
                                                        type="datetime-local"
                                                        id="startDateTime"
                                                        className="form-control"
                                                        value={startTime}
                                                        onChange={(e) => setStartTime(e.target.value)}
                                                        required
                                                    />
                                                </Form.Group>

                                                <Form.Group className="mb-4">
                                                    <Form.Label className="form-label" htmlFor="endDateTime">
                                                        End Time:
                                                    </Form.Label>
                                                    <Form.Control
                                                        type="datetime-local"
                                                        id="endDateTime"
                                                        className="form-control"
                                                        value={endTime}
                                                        onChange={(e) => setEndTime(e.target.value)}
                                                        required
                                                    />
                                                </Form.Group>

                                                <div className="text-center pt-1 mb-5 pb-1">
                                                    <Button
                                                        className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                                                        type="submit"
                                                    >
                                                        Create Auction
                                                    </Button>
                                                </div>
                                            </Form>
                                        </div>
                                    </Col>
                                    <Col lg={6} className="d-flex align-items-center gradient-custom-2">
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
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Auction Status</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalMessage}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {showBackToTop && (
                <BackTop>
                    <Button
                        type="primary"
                        shape="circle"
                        icon={<i class="fa-solid fa-chevron-up"></i>}
                        onClick={scrollToTop}
                    />
                </BackTop>
            )}
        </>
    );
};

export default AuctionForm;

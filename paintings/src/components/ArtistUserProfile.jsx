import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import BackTop from 'antd/es/float-button/BackTop';
import { getArtistDetails } from '../Services/UserService';
import { Navigationbar } from './Navigationbar';
import { useNavigate } from 'react-router-dom';
import './ArtistUserProfile.css';

function ArtistUserProfile() {
    const newid = sessionStorage.getItem('artistNewId');

    const navigate = useNavigate();

    const [userImages, setUserImages] = useState([]);
    const [loading, setLoading] = useState(true);

    const [artistData, setArtistData] = useState([]);

    useEffect(() => {
        const fetchArtistDetails = async () => {
            try {
                const artistNew = await getArtistDetails(newid);
                setArtistData(artistNew);
            } catch (error) {
                console.error('Error fetching artist details:', error);
            }
        };

        if (newid) {
            fetchArtistDetails();
        }
    }, [newid]);

    useEffect(() => {
        fetchUserImages(newid);
    }, [newid]);

    const fetchUserImages = async (userId) => {
        try {
            const response = await fetch(`http://localhost:8080/art/fetchArtPhotosByArtist/${userId}`);
            const data = await response.json();

            if (data.status) {
                setUserImages(data.list);
                setLoading(false);
            } else {
                console.error('Failed to fetch user images:', data.statusMessage);
            }
        } catch (error) {
            console.error('Error fetching user images:', error);
        }
    };

    const renderUserImages = () => {
        return (
            <div className="user-images">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    Array.isArray(userImages) && userImages.length > 0 ? (
                        userImages.map((image, index) => (
                            <div key={index} className="user-new-image-container">
                                <img
                                    src={`http://localhost:8080/artist/fetch/pic/${image.id}`}
                                    alt={`Img`}
                                    className="user-new-user-images"
                                />
                            </div>
                        ))
                    ) : (
                        <p>No Artist images available.</p>
                    )
                )}
            </div>
        );
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
            <Navigationbar />
            &nbsp;&nbsp;&nbsp;
            <Button variant='btn btn-outline-secondary' className='mt-3' onClick={() => navigate(-1)}>
                <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Back
            </Button>
            <Container className="mt-5">
                <Card className="card">
                    <Card.Header className="card-new-header">
                        <h2><b>Artist Profile</b></h2>
                    </Card.Header>
                    <Card.Body className="card-new-body">
                        <Row>
                            <Col md={4}>
                                <div className="profile-for-picture">
                                    <img
                                        className="new-user-Image"
                                        src={`http://localhost:8080/artist/fetch/profilePic/${newid}`}
                                        alt="Profile Pic"
                                    />
                                </div><br />
                                <div className="info-item">
                                    <h4 style={{ color: '#555' }}>Name</h4>
                                    <p>{artistData.artistName}</p>
                                </div>
                                <div className="info-item">
                                    <h4 style={{ color: '#555' }}>Art Style</h4>
                                    <p>{artistData.artStyle}</p>
                                </div>
                            </Col>
                            <Col md={8}>
                                <div className="profile-info">
                                    <div className="info-item">
                                        <h4 style={{ color: '#555' }}><b>Artists Arts</b></h4>
                                        {renderUserImages()}
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
            {showBackToTop && (
                <BackTop>
                    <Button type="primary" shape="circle" icon={<FontAwesomeIcon icon={faChevronUp} />} onClick={scrollToTop} />
                </BackTop>
            )}
        </>
    );
}

export default ArtistUserProfile;

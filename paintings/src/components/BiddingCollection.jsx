import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Modal, Form } from 'react-bootstrap';
import { Navigationbar } from './Navigationbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import BackTop from 'antd/es/float-button/BackTop';
import './BiddingCollection.css';

function BiddingCollections() {
    const navigate = useNavigate();
    const [arts, setArts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showZoom, setShowZoom] = useState(false);
    const [zoomedImage, setZoomedImage] = useState(null);
    const [showBackToTop, setShowBackToTop] = useState(false);
    const [bidAmount, setBidAmount] = useState('');
    const [showBidModal, setShowBidModal] = useState(false);
    const [currentArt, setCurrentArt] = useState(null);
    const [bidSubmissionError, setBidSubmissionError] = useState(null);

    const newId = sessionStorage.getItem('userId');

    // Check if 'newId' is null and handle it appropriately
    useEffect(() => {
        if (newId === null) {
            // Handle the case when 'newId' is null, e.g., redirect to login or handle it appropriately.
            navigate('/login'); // Redirect to login page as an example
        }
    }, [newId, navigate]);

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
        const fetchArts = async () => {
            try {
                const response = await fetch('http://localhost:8080/art/fetchAllArts');
                const data = await response.json();
                setArts(data.list);
            } catch (error) {
                console.error('Error fetching arts:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchArts();
    }, []);

    const handleOpenZoom = (artId) => {
        fetchAuctionDetails(artId);
        setZoomedImage(`http://localhost:8080/artist/fetch/pic/${artId}`);
        setShowZoom(true);
    };

    const handleZoomOut = () => {
        setShowZoom(false);
    };

    const handleAuction = (AuctionArtId) => {
        sessionStorage.setItem('auctionArtId', AuctionArtId);
        navigate('/auction-form');
    };

    const handleShowBidModal = (art) => {
        setCurrentArt(art);
        setShowBidModal(true);
    };

    const handleHideBidModal = () => {
        setCurrentArt(null);
        setShowBidModal(false);
    };

    const handleBidSubmit = async (event) => {
        event.preventDefault();

        // Check if 'newId' is null before creating the bid
        if (newId === null) {
            // Handle the case when 'newId' is null, e.g., redirect to login or handle it appropriately.
            navigate('/login'); // Redirect to login page as an example
            return;
        }

        // Check if 'bidAmount' is a valid number
        const bidAmountValue = parseFloat(bidAmount);
        if (isNaN(bidAmountValue) || bidAmountValue <= 0) {
            setBidSubmissionError('Bid amount should be a valid positive number.');
            setTimeout(() => {
                setBidSubmissionError(null);
                setBidAmount('');
            }, 3000);
            return;
        }

        const passData = {
            art: {
                id: currentArt.id,
            },
            user: {
                userId: newId,
            },
            bidAmount: bidAmountValue,
            bidExpirationTimestamp: '2024-02-29T12:00:00',
        };

        try {
            const response = await fetch('http://localhost:8080/api/bidding/place-bid', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(passData),
            });

            setBidSubmissionError('Bid placed successfully!');
            setTimeout(() => {
                handleHideBidModal();
                // window.location.reload();
            }, 3000);
        } catch (error) {
            setBidSubmissionError('Amount Should Be Greater Than Previous Bid Amount.');
            setTimeout(() => {
                setBidSubmissionError(null);
                setBidAmount('');
            }, 3000);
        }
    };

    const [auctionDetails, setAuctionDetails] = useState(null);

    const fetchAuctionDetails = async (artId) => {
        try {
            const response = await fetch(`http://localhost:8080/api/auctions/get-auction-by-art/${artId}`);

            if (response.ok) {
                const data = await response.json();
                setAuctionDetails(data);
            } else if (response.status === 404) {
                setAuctionDetails(null);
            } else {
                console.error('Error fetching auction details:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching auction details:', error);
        }
    };

    const [currentTime, setCurrentTime] = useState(new Date());

    const [tempVal, setTempVal] = useState(true);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const calculateRemainingTime = () => {
        if (!auctionDetails || !auctionDetails.startTime) {
            if (tempVal) {
                setTempVal(false);
            }
            return 'Auction details not available';
        }
        const oneHourInMillis = 60 * 60 * 1000;
        const startTime = new Date(auctionDetails.startTime).getTime();
        const endTime = startTime + oneHourInMillis;

        const remainingTime = endTime - currentTime.getTime();
        const remainingTimeInSeconds = Math.floor(remainingTime / 1000);

        const hours = Math.floor(remainingTimeInSeconds / 3600);
        const minutes = Math.floor((remainingTimeInSeconds % 3600) / 60);
        const seconds = remainingTimeInSeconds % 60;
        if (hours <= 0 && minutes <= 0 && seconds <= 0) {
            return 'Auction End';
        }
        if (hours >= 1) {
            return 'Auction Will Start Soon';
        }
        return `${hours}:${minutes}:${seconds}`;
    };


    return (
        <>
            <Navigationbar />
            &nbsp;&nbsp;&nbsp;
            <Button variant='btn btn-outline-secondary' className='mt-3' onClick={() => navigate(-1)}>
                <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Back
            </Button>
            <h1 className="mb-2 head text-center">Arts For Bidding</h1>
            <Container className="asdf">
                <Card className="card">
                    <Card.Body className="card-body">
                        <div className="text-center mb-4 imageList">
                            {loading ? (
                                <p>Loading arts...</p>
                            ) : (
                                <div className="div1">
                                    {arts
                                        .filter((art) => art.biddingArtStatus === 'BIDDING')
                                        .map((art) => (
                                            <div key={art.id} className="artContainer">
                                                <img
                                                    className="arts"
                                                    src={`http://localhost:8080/artist/fetch/pic/${art.id}`}
                                                    alt={`Art ${art.id}`}
                                                    onClick={() => handleOpenZoom(art.id)}
                                                />

                                                <div className="art-info mt-5">
                                                    <div className="art-details">
                                                        <ul key={art.id} className="art-detail-item">
                                                            <div className="detail-pair">
                                                                <p className="detail-label">Title:</p>
                                                                <p className="detail-value">{art.title}</p>
                                                            </div>
                                                            <div className="detail-pair">
                                                                <p className="detail-label">Artist Name:</p>
                                                                <p className="detail-value">{art.artistName}</p>
                                                            </div>
                                                            <div className="detail-pair">
                                                                <p className="detail-label">Size:</p>
                                                                <p className="detail-value">{art.size}</p>
                                                            </div>
                                                            <div className="detail-pair">
                                                                <p className="detail-label">Accepted Price:</p>
                                                                <p className="detail-value">₹{art.price}/-</p>
                                                            </div>
                                                            <div className="detail-pair">
                                                                <p className="detail-label">Art Status:</p>
                                                                <p className="detail-value">{art.artStatus}</p>
                                                            </div>
                                                            <div className="detail-pair">
                                                                <p className="detail-label">Current Bid:</p>
                                                                <p className="detail-value">₹{art.currentBid}/-</p>
                                                            </div>
                                                            <Card.Body className="prev-bid">
                                                                <div className="detail-pair">
                                                                    <p className="detail-label">Previous Bids:</p>
                                                                    <ul>
                                                                        <br />
                                                                        {art.bids.map((bid) => (
                                                                            <li
                                                                                key={bid.id}
                                                                                className="bid-item"
                                                                            >
                                                                                <span className="bid-username">
                                                                                    {bid.user.userName}:
                                                                                </span>{' '}
                                                                                ₹{bid.bidAmount}/-
                                                                                {sessionStorage.setItem('winner', bid.user.userName)}
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            </Card.Body>
                                                            {calculateRemainingTime() === 'Auction End' && (
                                                                <h1>Winner -- {sessionStorage.getItem('winner')}</h1>
                                                            )}
                                                        </ul>
                                                    </div>
                                                    {sessionStorage.getItem("adminMessage") === "secret" ? (
                                                        < Button
                                                            variant="btn btn-outline-dark"
                                                            onClick={() => handleAuction(art.id)}
                                                        >
                                                            Add in Auction
                                                        </Button>
                                                    ) : null}
                                            </div>
                                                { (
                                                    <Button
                                                        variant="btn btn-outline-warning"
                                                        onClick={() => handleShowBidModal(art)}
                                                    >
                                                        Accept Bid
                                                    </Button>
                                                )}
                                            </div>
                                        ))}
                                </div>
                            )}
                        </div>
                    </Card.Body>
                </Card>
            </Container >

            <Modal show={showBidModal} onHide={handleHideBidModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Accept Bid</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {bidSubmissionError && (
                        <div className="alert alert-danger" role="alert">
                            {bidSubmissionError}
                        </div>
                    )}
                    <Form onSubmit={handleBidSubmit}>
                        <Form.Group controlId="bidAmount">
                            <Form.Label>Bid Amount:</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter bid amount"
                                value={bidAmount}
                                onChange={(e) => setBidAmount(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button variant="btn btn-outline-danger" type="submit">
                            Submit Bid
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
            <Modal show={showZoom} onHide={() => setShowZoom(false)}>
                <Modal.Body className="p-0">
                    <img className="arts zoomed-image" src={zoomedImage} alt={`Zoomed Art`} />
                    <div>
                        <div className="detail-pair">
                            <p className="detail-label">Remaining Time:</p>
                            <p className="detail-value">{calculateRemainingTime()}</p>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="btn btn-outline-dark" onClick={handleZoomOut}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {
                showBackToTop && (
                    <BackTop>
                        <Button
                            type="primary"
                            shape="circle"
                            icon={<i class="fa-solid fa-chevron-up"></i>}
                            onClick={scrollToTop}
                        />
                    </BackTop>
                )
            }
        </>
    );
}

export default BiddingCollections;

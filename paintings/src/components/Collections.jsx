import React, { useState, useEffect } from 'react';
import { Container, Card, Pagination, Button, Modal } from 'react-bootstrap';
import { Navigationbar } from './Navigationbar';
import { AiOutlineDownload } from 'react-icons/ai';
import { saveAs } from 'file-saver';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './Collections.css';
import BackTop from 'antd/es/float-button/BackTop';


function Collections() {
  const navigate = useNavigate();
  const [artData, setArtData] = useState([]);
  const [arts, setArts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [likedArtIds, setLikedArtIds] = useState([]);
  const [showDownloadConfirmation, setShowDownloadConfirmation] = useState(false);
  const [selectedArtId, setSelectedArtId] = useState(null);
  const [showZoom, setShowZoom] = useState(false);
  const [zoomedImage, setZoomedImage] = useState(null);
  const itemsPerPage = 4;
  const newid = sessionStorage.getItem('userId');
  const [showBackToTop, setShowBackToTop] = useState(false);

  const [artistNameFilter, setArtistNameFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');


  const handleSearch = () => {
    const filteredArts = artData.filter((artInfo) => {
      const matchesArtist = artInfo.artistName.toLowerCase().includes(artistNameFilter.toLowerCase());
      const matchesPrice = priceFilter === '' || artInfo.price <= parseInt(priceFilter);
      return matchesArtist && matchesPrice;
    });

    setArts(filteredArts);
  };

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
        console.log(data);
        setArtData(data.list);
        if (data.status) {
          const artsWithLikes = data.list.map((art) => ({ ...art, likes: 0 }));
          setArts(artsWithLikes);
        } else {
          console.error('Failed to fetch arts:', data.statusMessage);
        }
      } catch (error) {
        console.error('Error fetching arts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArts();
  }, []);

  const totalPages = Math.ceil(arts.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleLike = async (artId) => {

    const response = await fetch(`http://localhost:8080/api/likes/toggle/${newid}/${artId}`, {
      method: 'POST',
    });
    console.log(response);


    setArts((prevArts) =>
      prevArts.map((art) =>
        art.id === artId ? { ...art, likes: art.likes + (likedArtIds.includes(artId) ? -1 : 1) } : art
      )
    );

    setLikedArtIds((prevLikedArtIds) =>
      likedArtIds.includes(artId)
        ? prevLikedArtIds.filter((id) => id !== artId)
        : [...prevLikedArtIds, artId]
    );

  };


  const handleShowDownloadConfirmation = (artId) => {
    setSelectedArtId(artId);
    setShowDownloadConfirmation(true);
  };

  const handleConfirmDownload = () => {
    handleDownload(selectedArtId);
    setShowDownloadConfirmation(false);
  };

  const handleCancelDownload = () => {
    setSelectedArtId(null);
    setShowDownloadConfirmation(false);
  };
  const [newArtId, setNewArtId] = useState(null);
  const handleOpenZoom = (artId) => {

    setNewArtId(artId);
    setZoomedImage(`http://localhost:8080/artist/fetch/pic/${artId}`);
    setShowZoom(true);
  };

  const handleZoomOut = () => {
    setNewArtId(null);
    setShowZoom(false);
  };

  const handleDownload = (artId) => {
    const contentType = 'image/png';

    fetch(`http://localhost:8080/artist/fetch/pic/${artId}`)
      .then((response) => response.blob())
      .then((blob) => {
        const file = new File([blob], `Art_${artId}.png`, { type: contentType });

        saveAs(file);
      })
      .catch((error) => {
        console.error('Error downloading image:', error);
      });
  };
  const handleContextMenu = (event) => {
    event.preventDefault();
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handleAddToCart = async (artId) => {
    sessionStorage.setItem('addressArtId',artId);
    try {
      const response = await fetch(`http://localhost:8080/api/shopping-cart/${newid}/add/${artId}`, {
        method: 'POST',
      });
  
      if (response.ok) {
        
        console.log('Item added to cart successfully.');
        navigate('/add-address-form');
      } else {
        // Handle error (optional)
        console.error('Failed to add item to cart.');
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };
  

  return (
    <>
      <Navigationbar />
      &nbsp;&nbsp;&nbsp;<Button variant='btn btn-outline-secondary' className='mt-3' onClick={() => navigate(-1)}>
        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Back
      </Button>

      <h1 className="mb-2 head text-center">Art By Our Artists</h1>
      <div className='xyz'>
        <div className="dfgh">
          <label>Search by Artist Name:</label>
          <input
            type="text"
            placeholder="Enter artist name"
            value={artistNameFilter}
            onChange={(e) => setArtistNameFilter(e.target.value)} className='mt-1 mb-1'
          />

          <label>Filter by Price (in ₹):</label>
          <input
            type="number"
            placeholder="Enter max price"
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
          /><br />

          <Button variant="btn btn-outline-secondary" onClick={handleSearch} className='mt-2'>
            Search
          </Button>
        </div>

        <Container className="asdf" style={{ height: '800px', overflowY: 'auto' }}>
          <Card className="card">
            <Card.Body className="card-body">
              <div className="text-center mb-4 imageList">
                {loading ? (
                  <p>Loading arts...</p>
                ) : (
                  <div className="div1">
                    {arts.filter((art) => art.biddingArtStatus !== 'BIDDING').slice(startIndex, endIndex).map((art) => (
                      <div key={art.id} className="artContainer">
                        <img
                          className="arts"
                          src={`http://localhost:8080/artist/fetch/pic/${art.id}`}
                          alt={`Art ${art.id}`}
                          onClick={() => handleOpenZoom(art.id)}
                          onContextMenu={handleContextMenu}
                        />

                        <div className="art-info mt-5">
                          <div className="art-details">
                            {artData.length > 0 ? (
                              <ul>
                                {artData
                                  .filter((artInfo) => artInfo.id === art.id)
                                  .map((artInfo, index) => (
                                    <ul key={index} className="art-detail-item">
                                      <div className="detail-pair">
                                        <p className="detail-label">Title:</p>
                                        <p className="detail-value">{artInfo.title}</p>
                                      </div>
                                      <div className="detail-pair">
                                        <p className="detail-label">Artist Name:</p>
                                        <p className="detail-value">{artInfo.artistName}</p>
                                      </div>
                                      <div className="detail-pair">
                                        <p className="detail-label">Size:</p>
                                        <p className="detail-value">{artInfo.size}</p>
                                      </div>
                                      <div className="detail-pair">
                                        <p className="detail-label">Price:</p>
                                        <p className="detail-value">₹{artInfo.price}/-</p>
                                      </div>
                                      <div className='desc'>
                                        <p>
                                          Discover the essence of this artwork. With {artInfo.artistName}'s unique touch, it becomes a visual delight. The size, {artInfo.size}, adds to its charm. Own this piece of creativity for ₹{artInfo.price}/-.
                                        </p>
                                      </div>
                                    </ul>
                                  ))}
                              </ul>
                            ) : (
                              <p>No art data available.</p>
                            )}
                          </div>
                          <div className="add-to-cart-button">
                            <Button variant="btn btn-outline-primary" onClick={() => handleAddToCart(art.id)}>
                              Add to Cart
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="text-center xyz">
                <Pagination>
                  {[...Array(totalPages)].map((_, index) => (
                    <Pagination.Item
                      key={index + 1}
                      active={index + 1 === currentPage}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </Pagination.Item>
                  ))}
                </Pagination>
              </div>
            </Card.Body>
          </Card>
        </Container>
      </div>

      <Modal show={showDownloadConfirmation} onHide={handleCancelDownload}>
        <Modal.Header closeButton>
          <Modal.Title>🎨 Confirm Download 🖼️</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>You're about to immortalize this artwork on your device! 🚀</p>
          <p>Remember, art thieves go to jail. Lucky for you, you're just downloading! 😅</p>
          <p>Hit the "Download" button and enjoy the beauty! 🎉</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelDownload}>
            Nah, I'll pass 😎
          </Button>
          <Button variant="primary" onClick={handleConfirmDownload}>
            Download Masterpiece 🌟
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showZoom} onHide={() => setShowZoom(false)}>
        <Modal.Body className="p-0">
          <img
            className="arts zoomed-image"
            src={zoomedImage}
            alt={`Zoomed Art`}
            onContextMenu={handleContextMenu}
          />

        </Modal.Body>
        <Modal.Footer>
          <div className="likeContainer">
            <Button
              variant={likedArtIds.includes(newArtId) ? 'danger' : 'light'}
              onClick={() => handleLike(newArtId)}
            >
              Like{' '}
              <span role="img" aria-label="heart">
                ❤️
              </span>{' '}
            </Button>{' '}
            <Button
              variant="btn btn-outline-warning"
              className="downloadButton"
              onClick={() => handleShowDownloadConfirmation(newArtId)}
            >
              <AiOutlineDownload size={20} />
            </Button>
          </div>
          <Button variant="btn btn-outline-dark" onClick={handleZoomOut}>
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
}

export default Collections;
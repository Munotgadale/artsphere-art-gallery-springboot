import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import './ArtistProfile.css';
import { Navigationbar } from './Navigationbar';
import { deactiveArtistEmailSend, deleteArtist, deleteArtistEmailSend } from '../Services/UserService';
import { useNavigate } from 'react-router-dom';
import { logout } from '../utils/TokenUtil';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import BackTop from 'antd/es/float-button/BackTop';

function ArtistProfile() {
  const name = sessionStorage.getItem('userName');
  const email = sessionStorage.getItem('userEmail');
  const newid = sessionStorage.getItem('userId');
  const [likeCount, setLikeCount] = useState(0);

  const [isBid, setIsBid] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);

  const [artistName, setArtistName] = useState('');
  const [medium, setMedium] = useState('');
  const [price, setPrice] = useState('');
  const [size, setSize] = useState('');
  const [title, setTitle] = useState('');

  const [showZoom, setShowZoom] = useState(false);

  const handleZoomIn = (imageId) => {
    setSelectedImage(imageId);
    setShowZoom(true);
  };

  const handleZoomOut = () => {
    setSelectedImage(null);
    setShowZoom(false);
  };

  const [showProfileZoom, setShowProfileZoom] = useState(false);

  const handleProfileZoomIn = () => {
    setShowProfileZoom(true);
  };

  const handleProfileZoomOut = () => {
    setShowProfileZoom(false);
  };

  const navigate = useNavigate();

  const [userImages, setUserImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [artImage, setArtImage] = useState(null);

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

  const handleLikes = async (imageId) => {
    const response = await fetch(`http://localhost:8080/api/likes/getLikesCount/${imageId}`, {
      method: 'GET',
    });

    const data = await response.json();
    setLikeCount(data);
  }



  const handleDelete = async (imageId) => {
    const confirmed = window.confirm('Are you sure you want to delete this image?');

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/art/delete/${imageId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.status) {
        alert('Art image deleted successfully');

        setSelectedImage(null);
        setShowZoom(false);

        fetchUserImages(newid);
      } else {
        console.error('Failed to delete art image:', data.statusMessage);
      }
    } catch (error) {
      console.error('Error deleting art image:', error);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/permanently-delete/${newid}`, {
        method: 'DELETE',
      });
      console.log(response);
      const deleteArtistEmail = await deleteArtistEmailSend(email);
      console.log(deleteArtistEmail);
      alert('Account deleted successfully');
      logout();
      sessionStorage.clear();
      navigate('/');
    } catch (error) {
      console.error('Failed to delete account');
    }
  };

  const handleDeactivateAccount = async () => {
    const confirmed = window.confirm('Are you sure you want to deactivate your account? This action can be undone by logging in again.');

    if (!confirmed) {
      return;
    }

    try {
      const response = await deleteArtist(newid);
      const deactiveArtistEmail = await deactiveArtistEmailSend(email);
      console.log(deactiveArtistEmail);

      if (response != null) {
        alert('Account deactivated successfully');

        logout();
        sessionStorage.clear();
        navigate('/');

      } else {
        console.error('Failed to deactivate account');
      }
    } catch (error) {
      console.error('Error deactivating account:', error);
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
              <div key={index} className="user-image-container">
                <img
                  src={`http://localhost:8080/artist/fetch/pic/${image.id}`}
                  alt={`Img`}
                  className="user-image"
                  onClick={() => handleZoomIn(image.id)}
                />
              </div>
            ))
          ) : (
            <p>No user images available.</p>
          )
        )}
      </div>
    );
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'isBid') {
      setIsBid(event.target.checked);
    }

    if (name === 'artistName') setArtistName(value);
    else if (name === 'medium') setMedium(value);
    else if (name === 'price') setPrice(value);
    else if (name === 'size') setSize(value);
    else if (name === 'title') setTitle(value);
    else if (name === 'photoUrl') setArtImage(event.target.files[0]);
  };


  const handleUpload = async () => {
    if (!artImage) {
      alert('Please select an art image before uploading.');
      return;
    }

    const formData = new FormData();
    formData.append('artist.artistId', newid);
    formData.append('photoUrl', artImage);
    formData.append('artistName', artistName);
    formData.append('medium', medium);
    formData.append('price', price);
    formData.append('size', size);
    formData.append('title', title);

    try {
      if(isBid){
      const response = await fetch('http://localhost:8080/api/bid/add-art', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.status) {
        alert('Art image uploaded successfully');
        setArtImage(null);
        setArtistName('');
        setMedium('');
        setPrice('');
        setSize('');
        setTitle('');
        fetchUserImages(newid);
      } else {
        console.error('Failed to upload art image:', data.statusMessage);
      }
    }else{
      const response = await fetch('http://localhost:8080/add-art', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.status) {
        alert('Art image uploaded successfully');
        setArtImage(null);
        setArtistName('');
        setMedium('');
        setPrice('');
        setSize('');
        setTitle('');
        fetchUserImages(newid);
      } else {
        console.error('Failed to upload art image:', data.statusMessage);
      }
    }
    } catch (error) {
      console.error('Error uploading art image:', error);
    }
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

  const [showForm, setShowForm] = useState(false);
  const handleCheckboxChange = () => {
    setShowForm((prevShowForm) => !prevShowForm);
  };

  return (
    <>
      <Navigationbar />
      &nbsp;&nbsp;&nbsp;<Button variant='btn btn-outline-secondary' className='mt-3' onClick={() => navigate(-1)}>
        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Back
      </Button>
      <Container className="mt-5">
        <h2 className="mb-4 head">Welcome {name}...</h2>
        <Card className="card">
          <Card.Header className="card-header">
            <h3>Artist Profile</h3>
          </Card.Header>
          <Card.Body className="card-body">
            <div className="text-center mb-4">
              <img
                className="newImage"
                src={`http://localhost:8080/artist/fetch/profilePic/${newid}`}
                alt="Profile Pic"
                onClick={() => handleProfileZoomIn()}
              />
            </div>
            <div style={{ marginTop: '30px', borderTop: '1px solid #ddd', paddingTop: '20px' }}>
              <div style={{ marginTop: '20px' }}>
                <div style={{ marginBottom: '20px' }}>
                  <h4 style={{ color: '#555' }}>Name</h4>
                  <p>{name}</p>
                </div>
                <div>
                  <h4 style={{ color: '#555' }}>Email</h4>
                  <p>{email}</p>
                </div>
              </div>
            </div>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <div className="social-links">
                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faInstagram} className="social-icon" />
                </a>
                <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faTwitter} className="social-icon" />
                </a>
              </div>
            </div>
            <div style={{ marginTop: '30px' }}>
              <h4 style={{ color: '#555' }}>Uploaded Arts</h4>
              {renderUserImages()}
            </div>
            <div style={{ marginTop: '30px' }}>
              <h4 style={{ color: '#555' }}>Upload Art Image</h4>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label="Show Upload Form"
                    checked={showForm}
                    onChange={handleCheckboxChange}
                  />
                </Form.Group>
              </Form>
              {showForm && (
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" name="title" value={title} onChange={handleChange} />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Artist Name</Form.Label>
                    <Form.Control type="text" name="artistName" value={artistName} onChange={handleChange} />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Medium</Form.Label>
                    <Form.Control type="text" name="medium" value={medium} onChange={handleChange} />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="text" name="price" value={price} onChange={handleChange} />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Size</Form.Label>
                    <Form.Control type="text" name="size" value={size} onChange={handleChange} />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Art Image</Form.Label>
                    <Form.Control type="file" name="photoUrl" onChange={handleChange} />
                  </Form.Group>
                  <Form.Check
                    type="checkbox"
                    label="Add Art For Bid"
                    name="isBid"
                    checked={isBid}
                    onChange={handleChange}
                  />
                  <Button variant="primary" className="mt-2" onClick={handleUpload}>
                    Upload
                  </Button>
                </Form>
              )}
            </div>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <Button variant="warning" onClick={handleDeactivateAccount}>
                Deactivate Account
              </Button>{'   '}
              <Button
                variant="secondary"
                onClick={() => navigate(`/edit-artist-details`)}
              >
                Edit Account Details
              </Button>{'  '}
              <Button variant="danger" onClick={handleDeleteAccount} className="ml-2">
                Delete Account
              </Button>
            </div>
          </Card.Body>
        </Card>

        <Modal show={showZoom} onHide={handleZoomOut} centered>
          <Modal.Body>
            {selectedImage && (
              <img
                className='zoomed-art-pic'
                src={`http://localhost:8080/artist/fetch/pic/${selectedImage}`}
                alt="Zoomed Profile Pic"
              />
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="light" onClick={() => handleLikes(selectedImage)}>
              Likes {likeCount}
            </Button>
            <Button variant="secondary" onClick={handleZoomOut}>
              Close
            </Button>
            <Button
              variant="danger"
              onClick={() => handleDelete(selectedImage)}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>


        <Modal show={showProfileZoom} onHide={handleProfileZoomOut} centered>
          <Modal.Body>
            <img
              className='zoomed-profile-pic'
              src={`http://localhost:8080/artist/fetch/profilePic/${newid}`}
              alt="Zoomed Profile Pic"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleProfileZoomOut}>
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
}

export default ArtistProfile;

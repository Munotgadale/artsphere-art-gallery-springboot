import React, { useState, useEffect } from 'react';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Navigationbar } from './Navigationbar';
import { getArtistDetails, updateArtist } from '../Services/UserService';
import { useNavigate, useParams } from 'react-router-dom';

const EditArtistDetails = () => {
  const newid = sessionStorage.getItem('userId');
  const navigate = useNavigate();
  const { artistId } = useParams();

  const [formData, setFormData] = useState({
    artistName: '',
    artistEmail: '',
    artistPhone: '',
    artistPassword: '',
    profilePic: '',
    artworksCreated: '',
    prizesWon: '',
    exhibitionsAttended: '',
    artStyle: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [signUpError, setSignUpError] = useState(false);

  useEffect(() => {
    const fetchArtistDetails = async () => {
      try {
        const artistDetails = await getArtistDetails(newid);
        setFormData(artistDetails);
      } catch (error) {
        console.log(error);
      }
    };

    fetchArtistDetails();
  }, [artistId]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === 'file') {
      setFormData({ ...formData, [name]: e.target.files[0] });
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(formErrors).some((error) => error !== '')) {
      return;
    }
    sessionStorage.setItem('userName', formData.artistName);
    sessionStorage.setItem('userEmail', formData.artistEmail);
    navigate('/artist-profile');
    try {
      const formDataForUpload = new FormData();

      Object.keys(formData).forEach((key) => {
        if (key !== 'profilePic') {
          formDataForUpload.append(key, formData[key]);
        }
      });

      if (formData.profilePic) {
        formDataForUpload.append('profilePic', formData.profilePic);
      }

      const result = await updateArtist(formDataForUpload);

      console.log('Response Data:', result);

      if (result.status === true) {
        alert(result.statusMessage || 'Artist details updated successfully.');
        navigate('/artist-profile');
      } else {
        alert(result.statusMessage || 'Failed to update artist details.');
      }
    } catch (error) {
      console.log(error);
      setSignUpError(true);
      setTimeout(() => {
        setSignUpError(false);
      }, 2000);
    }
  }; 

  return (
    <>
      <Navigationbar />
      <Container>
        <h2 className="mt-5 text-center">Edit Artist Details</h2>
        <Form onSubmit={handleSubmit}>
          <Row className="justify-content-center">
            <Col lg={6}>
              <Form.Group className="mb-3">
                <Form.Label>Artist Name</Form.Label>
                <Form.Control
                  type="text"
                  required
                  placeholder="Enter Artist Name"
                  name="artistName"
                  value={formData.artistName}
                  onChange={handleChange}
                />
                {formErrors.artistName && <Alert variant="danger" className="mt-2">{formErrors.artistName}</Alert>}
              </Form.Group>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col lg={6}>
              <Form.Group className="mb-3">
                <Form.Label>Artist Email</Form.Label>
                <Form.Control
                  type="email"
                  required
                  placeholder="Enter Artist Email"
                  name="artistEmail"
                  value={formData.artistEmail}
                  onChange={handleChange}
                />
                {formErrors.artistEmail && <Alert variant="danger" className="mt-2">{formErrors.artistEmail}</Alert>}
              </Form.Group>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col lg={6}>
              <Form.Group className="mb-3">
                <Form.Label>Artist Phone</Form.Label>
                <Form.Control
                  type="text"
                  required
                  placeholder="Enter Artist Phone"
                  name="artistPhone"
                  value={formData.artistPhone}
                  onChange={handleChange}
                />
                {formErrors.artistPhone && <Alert variant="danger" className="mt-2">{formErrors.artistPhone}</Alert>}
              </Form.Group>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col lg={6}>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  required
                  placeholder="Enter Password"
                  name="artistPassword"
                  value={formData.artistPassword}
                  onChange={handleChange}
                />
                {formErrors.artistPassword && <Alert variant="danger" className="mt-2">{formErrors.artistPassword}</Alert>}
              </Form.Group>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col lg={6}>
              <Form.Group className="mb-3">
                <Form.Label>Profile Picture</Form.Label>
                <Form.Control type="file" name="profilePic" onChange={handleChange} />
              </Form.Group>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col lg={6}>
              <Form.Group className="mb-3">
                <Form.Label>Artworks Created</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Number of Artworks Created"
                  name="artworksCreated"
                  value={formData.artworksCreated}
                  onChange={handleChange}
                />
                {formErrors.artworksCreated && <Alert variant="danger" className="mt-2">{formErrors.artworksCreated}</Alert>}
              </Form.Group>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col lg={6}>
              <Form.Group className="mb-3">
                <Form.Label>Prizes Won</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Number of Prizes Won"
                  name="prizesWon"
                  value={formData.prizesWon}
                  onChange={handleChange}
                />
                {formErrors.prizesWon && <Alert variant="danger" className="mt-2">{formErrors.prizesWon}</Alert>}
              </Form.Group>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col lg={6}>
              <Form.Group className="mb-3">
                <Form.Label>Exhibitions Attended</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Exhibitions Attended"
                  name="exhibitionsAttended"
                  value={formData.exhibitionsAttended}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col lg={6}>
              <Form.Group className="mb-3">
                <Form.Label>Art Style</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Art Style"
                  name="artStyle"
                  value={formData.artStyle}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="justify-content-center mt-3">
            <Col lg={2}>
              <Button variant="primary" type="submit">
                Update
              </Button>{' '}
              <Button variant="primary" onClick={() => navigate('/artist-profile')}>
                Back
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  );
};

export default EditArtistDetails;

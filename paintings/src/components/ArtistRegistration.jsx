import React, { useState } from 'react';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Navigationbar } from './Navigationbar';
import { register, sendArtistEmail } from '../Services/UserService';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const ArtistRegistration = () => {
  const navigate = useNavigate();

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
  const [currentStep, setCurrentStep] = useState(1);


  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === 'file') {
      setFormData({ ...formData, [name]: e.target.files[0] });
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
      validateField(name, value);
    }
  };

  const validateField = (name, value) => {
    const errors = { ...formErrors };

    switch (name) {
      case 'artistName':
        errors.artistName = /^[A-Za-z\s]+$/.test(value) ? '' : 'Name should contain only letters and spaces';
        break;
      case 'artistPhone':
        errors.artistPhone = /^[0-9]{10}$/.test(value) ? '' : 'Phone should contain exactly 10 numbers';
        break;
      case 'artistEmail':
        errors.artistEmail = /\S+@\S+\.\S+/.test(value) ? '' : 'Invalid email address';
        break;
      case 'artistPassword':
        errors.artistPassword =
          value.length >= 6 && /[A-Z]/.test(value) && /\d/.test(value) && /[!@#$%^&*(),.?":{}|<>]/.test(value)
            ? ''
            : 'Password must be at least 6 characters long, contain one uppercase letter, one number, and one special character';
        break;
      default:
        break;
    }

    setFormErrors(errors);
  };


  const handleNext = () => {

    const currentStepFields = getFieldsForStep(currentStep);
    const areFieldsValid = validateFields(currentStepFields);

    if (areFieldsValid) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {

    setCurrentStep(currentStep - 1);
  };


  const validateFields = (fields) => {
    const errors = {};

    fields.forEach((field) => {
      validateField(field, formData[field]);
      if (formErrors[field]) {
        errors[field] = formErrors[field];
      }
    });

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const getFieldsForStep = (step) => {

    switch (step) {
      case 1:
        return ['artistName', 'artistPhone', 'artistEmail', 'artistPassword'];
      case 2:
        return ['profilePic', 'artworksCreated', 'prizesWon', 'exhibitionsAttended'];
      case 3:
        return ['artStyle'];
      default:
        return [];
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(formErrors).some((error) => error !== '')) {
      return;
    }

    try {
      const formDataForUpload = new FormData();

      Object.keys(formData).forEach((key) => {
        if (key !== 'profilePic') {
          formDataForUpload.append(key, formData[key]);
        }
      });

      const newEmail = formData.artistEmail;

      formDataForUpload.append('profilePic', formData.profilePic);

      const result = await register(formDataForUpload);
      console.log(result);

      const emailResponse = await sendArtistEmail(newEmail);
      console.log(emailResponse);
      alert("Congratulations! You're officially a part of the club.")
      navigate('/log-in');

    } catch (error) {
      alert("Oops! It seems like you're already a member. Please Log In.");
      navigate('/log-in');
      setSignUpError(true);
      setTimeout(() => {
        setSignUpError(false);
      }, 2000);
    }
    clearForm();
  };
  console.log(signUpError);

  const clearForm = () => {
    setFormData({
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
  };

  return (
    <>
      <Navigationbar />
      &nbsp;&nbsp;&nbsp;
      <Button variant='btn btn-outline-secondary' className='mt-3' onClick={() => navigate(-1)}>
        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Back
      </Button>
      <Container>
        <h2 className="mt-5 text-center"><b>Artist Registration - Step {currentStep}</b></h2><br />
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              {currentStep === 1 && (
                <Col lg={10}>
                  <Form.Group className="mb-3">
                    <Form.Label>Your Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      placeholder="Enter Full Name"
                      name="artistName"
                      value={formData.artistName}
                      onChange={handleChange}
                    />
                    {formErrors.artistName && <Alert variant="danger" className="mt-2">{formErrors.artistName}</Alert>}
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Contact Number</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      placeholder="Enter Contact Number"
                      name="artistPhone"
                      value={formData.artistPhone}
                      onChange={handleChange}
                    />
                    {formErrors.artistPhone && <Alert variant="danger" className="mt-2">{formErrors.artistPhone}</Alert>}
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      required
                      placeholder="Enter Email Address"
                      name="artistEmail"
                      value={formData.artistEmail}
                      onChange={handleChange}
                    />
                    {formErrors.artistEmail && <Alert variant="danger" className="mt-2">{formErrors.artistEmail}</Alert>}
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Create a Password</Form.Label>
                    <Form.Control
                      type="password"
                      required
                      placeholder="Enter Strong Password"
                      name="artistPassword"
                      value={formData.artistPassword}
                      onChange={handleChange}
                    />
                    {formErrors.artistPassword && <Alert variant="danger" className="mt-2">{formErrors.artistPassword}</Alert>}
                  </Form.Group>
                </Col>
              )}

              {currentStep === 2 && (
                <Col lg={10}>
                  <Form.Group className="mb-3">
                    <Form.Label>Upload Your Profile Picture</Form.Label>
                    <Form.Control type="file" name="profilePic" onChange={handleChange} />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Number of Artworks You've Created</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter Number of Artworks Created"
                      name="artworksCreated"
                      value={formData.artworksCreated}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Number of Prizes You've Won</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter Number of Prizes Won"
                      name="prizesWon"
                      value={formData.prizesWon}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>List Exhibitions You've Attended</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Exhibitions Attended"
                      name="exhibitionsAttended"
                      value={formData.exhibitionsAttended}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              )}

              {currentStep === 3 && (
                <Col lg={10}>
                  <Form.Group className="mb-3">
                    <Form.Label>Your Artistic Style</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Art Style"
                      name="artStyle"
                      value={formData.artStyle}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              )}

              {Object.values(formErrors).some((error) => error !== '') && (
                <Row className="justify-content-center">
                  <Col lg={6}>
                    <Alert variant="danger" className="mt-2">Please fix the errors before proceeding.</Alert>
                  </Col>
                </Row>
              )}

              <Row className="justify-content-center mt-3">
                {currentStep > 1 && (
                  <Col lg={6}>
                    <Button variant="btn btn-outline-secondary" onClick={handleBack}>
                      Back
                    </Button>
                  </Col>
                )}

                {currentStep < 3 && (
                  <Col lg={6}>
                    <Button variant="btn btn-outline-secondary" onClick={handleNext}>
                      Next
                    </Button>
                  </Col>
                )}

                {currentStep === 3 && (
                  <Col lg={6}>
                    <Button variant="btn btn-outline-dark" type="submit">
                      Register
                    </Button>
                  </Col>
                )}
              </Row>
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
        </Form>
      </Container>
    </>
  );
};

export default ArtistRegistration;

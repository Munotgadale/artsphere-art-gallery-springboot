import React, { useState } from 'react';
import { Alert, Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import { Navigationbar } from './Navigationbar';
import { sendEmail, signup } from '../Services/UserService';
import { useNavigate } from 'react-router-dom';

export function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: '',
    userEmail: '',
    userPhone: '',
    userPassword: '',
    profilePic: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [signUpError, setSignUpError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

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
      case 'userName':
        errors.userName = /^[A-Za-z\s]+$/.test(value) ? '' : 'Name should contain only letters and spaces';
        break;
      case 'userPhone':
        errors.userPhone = /^[0-9]{10}$/.test(value) ? '' : 'Phone should contain exactly 10 numbers';
        break;
      case 'userEmail':
        errors.userEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value)
          ? ''
          : 'Invalid email address';
        break;
      case 'userPassword':
        errors.userPassword =
          value.length >= 6 && /[A-Z]/.test(value) && /\d/.test(value) && /[!@#$%^&*(),.?":{}|<>]/.test(value)
            ? ''
            : 'Password must be at least 6 characters long, contain one uppercase letter, one number, and one special character';
        break;
      default:
        break;
    }

    setFormErrors(errors);
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
      const newEmail = formData.userEmail;

      formDataForUpload.append('profilePic', formData.profilePic);

      const result = await signup(formDataForUpload);
      if (result.data.status === true) {
        const emailResponse = await sendEmail(newEmail);
        console.log(emailResponse);
      }
      setModalMessage(result.data.statusMessage || "Congratulations! You're officially a part of the club.");
      setShowModal(true);
      setTimeout(() => {
        navigate('/log-in');
      }, 2000);
    } catch (error) {
      setModalMessage("Oops! Looks like you've already claimed your spot in our exclusive club.");
      setShowModal(true);
      setSignUpError(true);
      setTimeout(() => {
        setSignUpError(false);
        setShowModal(false);
      }, 2000);
    }
    clearForm();
  };

  const clearForm = () => {
    setFormData({
      userName: '',
      userEmail: '',
      userPhone: '',
      userPassword: '',
      profilePic: '',
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  

  return (
    <>
      <Navigationbar />
      <Container className="py-5 h-100">
        <Row className="d-flex justify-content-center align-items-center h-100">
          <Col xl={10}>
            <div className="card rounded-3 text-black">
              <Row className="g-0">
                <Col lg={6}>
                  <div className="card-body p-md-5 mx-md-4">
                    <div className="text-center">

                      <h2 className="mt-1 mb-5 pb-1"><b>User Registration</b></h2>
                    </div>
                    <Form onSubmit={handleSubmit}>
                      <Row className="justify-content-center">
                        <Col lg={12}>
                          <Form.Group className="mb-3">
                            <Form.Label>Your Full Name</Form.Label>
                            <Form.Control
                              type="text"
                              required
                              placeholder="Enter Your Full Name"
                              name="userName"
                              value={formData.userName}
                              onChange={handleChange}
                            />
                            {formErrors.userName && <Alert variant="danger" className="mt-2">{formErrors.userName}</Alert>}
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row className="justify-content-center">
                        <Col lg={12}>
                          <Form.Group className="mb-3">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                              type="email"
                              required
                              placeholder="Enter Email Address"
                              name="userEmail"
                              value={formData.userEmail}
                              onChange={handleChange}
                            />
                            {formErrors.userEmail && <Alert variant="danger" className="mt-2">{formErrors.userEmail}</Alert>}
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row className="justify-content-center">
                        <Col lg={12}>
                          <Form.Group className="mb-3">
                            <Form.Label>Contact Number</Form.Label>
                            <Form.Control
                              type="text"
                              required
                              placeholder="Enter Contact Number"
                              name="userPhone"
                              value={formData.userPhone}
                              onChange={handleChange}
                            />
                            {formErrors.userPhone && <Alert variant="danger" className="mt-2">{formErrors.userPhone}</Alert>}
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row className="justify-content-center">
                        <Col lg={12}>
                          <Form.Group className="mb-3">
                            <Form.Label>Create Password</Form.Label>
                            <Form.Control
                              type="password"
                              required
                              placeholder="Enter Strong Password"
                              name="userPassword"
                              value={formData.userPassword}
                              onChange={handleChange}
                            />
                            {formErrors.userPassword && <Alert variant="danger" className="mt-2">{formErrors.userPassword}</Alert>}
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row className="justify-content-center">
                        <Col lg={12}>
                          <Form.Group className="mb-3">
                            <Form.Label>Upload Your Profile Picture</Form.Label>
                            <Form.Control type="file" name="profilePic" onChange={handleChange} />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row className="justify-content-center mt-3">
                        <Col lg={6}>
                          <Button variant="btn btn-outline-dark" type="submit">
                            Register
                          </Button>
                        </Col>
                      </Row>
                      <Row className="justify-content-center mt-3">
                        <Col lg={8}>
                          <a className="text-muted" onClick={() => navigate(`/artist-register`)}>
                            <b>Register as an Artist</b>
                          </a><br />
                        </Col>
                      </Row>
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

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Registration Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
      </Modal>
    </>
  );
};

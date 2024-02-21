import React, { useState, useEffect } from 'react';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Navigationbar } from './Navigationbar';
import { getUserDetails, updateUser } from '../Services/UserService';
import { useNavigate, useParams } from 'react-router-dom';

const EditUserDetails = () => {
  const newid = sessionStorage.getItem('userId');
  const navigate = useNavigate();
  const { userId } = useParams();

  const [formData, setFormData] = useState({
    userName: '',
    userEmail: '',
    userPhone: '',
    userPassword: '',
    profilePic: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [signUpError, setSignUpError] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userDetails = await getUserDetails(newid);
        setFormData(userDetails);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserDetails();
  }, [userId]);

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
        errors.user = /^[A-Za-z\s]+$/.test(value) ? '' : 'Name should contain only letters and spaces';
        break;
      case 'userPhone':
        errors.userPhone = /^[0-9]{10}$/.test(value) ? '' : 'Phone should contain exactly 10 numbers';
        break;
      case 'userEmail':
        errors.userEmail = /\S+@\S+\.\S+/.test(value) ? '' : 'Invalid email address';
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

      if (formData.profilePic) {
        formDataForUpload.append('profilePic', formData.profilePic);
      }

      const result = await updateUser(formDataForUpload);
      console.log('Response Data:', result);
      sessionStorage.setItem('userName', formData.userName);
      sessionStorage.setItem('userEmail', formData.userEmail);

      if (result.status === true) {
        alert(result.statusMessage || 'User details updated successfully.');
        navigate('/user-profile');
      } else {
        alert(result.statusMessage || 'Failed to update user details.');
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
        <h2 className="mt-5 text-center">User Registration</h2>
        <Form onSubmit={handleSubmit}>
          <Row className="justify-content-center">
            <Col lg={6}>
              <Form.Group className="mb-3">
                <Form.Label>User Name</Form.Label>
                <Form.Control
                  type="text"
                  required
                  placeholder="Enter user Name"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                />
                {formErrors.userName && <Alert variant="danger" className="mt-2">{formErrors.userName}</Alert>}
              </Form.Group>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col lg={6}>
              <Form.Group className="mb-3">
                <Form.Label>user Email</Form.Label>
                <Form.Control
                  type="email"
                  required
                  placeholder="Enter user Email"
                  name="userEmail"
                  value={formData.userEmail}
                  onChange={handleChange}
                />
                {formErrors.userEmail && <Alert variant="danger" className="mt-2">{formErrors.userEmail}</Alert>}
              </Form.Group>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col lg={6}>
              <Form.Group className="mb-3">
                <Form.Label>user Phone</Form.Label>
                <Form.Control
                  type="text"
                  required
                  placeholder="Enter user Phone"
                  name="userPhone"
                  value={formData.userPhone}
                  onChange={handleChange}
                />
                {formErrors.userPhone && <Alert variant="danger" className="mt-2">{formErrors.userPhone}</Alert>}
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
                  name="userPassword"
                  value={formData.userPassword}
                  onChange={handleChange}
                />
                {formErrors.userPassword && <Alert variant="danger" className="mt-2">{formErrors.userPassword}</Alert>}
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
          <Row className="justify-content-center mt-3">
            <Col lg={2}>
              <Button variant="primary" type="submit">
                Update
              </Button>{' '}
              <Button variant="primary" onClick={() => navigate('/user-profile')}>
                Back
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  );
};

export default EditUserDetails;

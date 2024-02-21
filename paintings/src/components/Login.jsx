import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import { useState } from 'react';
import { Navigationbar } from './Navigationbar';
import { artistlogin, login } from '../Services/UserService.js';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ userEmail: '', userPassword: '' });
  const [isArtist, setIsArtist] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'isArtist') {
      setIsArtist(e.target.checked);
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = (message) => {
    setModalMessage(message);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let result;

      if (isArtist) {
        result = await artistlogin({
          artistEmail: formData.userEmail,
          artistPassword: formData.userPassword,
        });
        if (result.status === true) {
          handleShowModal(`Welcome, ${result.name}! Get ready for a fun art journey!`);
          sessionStorage.setItem('userName', result.name);
          sessionStorage.setItem('userEmail', result.email);
          sessionStorage.setItem('userId', result.id);
          localStorage.setItem('token', result.token);

          localStorage.setItem('artist', 'true');

          setTimeout(() => {
            navigate('/');
          }, 2000);
        } else {
          handleShowModal(
            result.statusMessage || "Oops! It seems like you're already a member. Please Log In."
          );
        }
      } else {
        result = await login(formData);
        if (result.status === true) {
          handleShowModal(`Welcome, ${result.name}! Get ready for a fun art journey!`);
          sessionStorage.setItem('userName', result.name);
          sessionStorage.setItem('userEmail', result.email);
          sessionStorage.setItem('userId', result.id);
          localStorage.setItem('token', result.token);

          setTimeout(() => {
            navigate('/');
          }, 2000);
        } else {
          handleShowModal(
            result.statusMessage || "Oops! It seems like you're already a member. Please Log In."
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navigationbar />

      <section className="h-100 gradient-form">
        <Container className="py-5 h-100">
          <Row className="d-flex justify-content-center align-items-center h-100">
            <Col xl={10}>
              <div className="card rounded-3 text-black">
                <Row className="g-0">
                  <Col lg={6}>
                    <div className="card-body p-md-5 mx-md-4">
                      <div className="text-center">
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                          style={{ width: '185px' }}
                          alt="logo"
                        />
                        <h4 className="mt-1 mb-5 pb-1">We are The ArtSphere Team</h4>
                      </div>

                      <Form>
                        <p>Please login to your account</p>

                        <Form.Group className="mb-4">
                          <Form.Label className="form-label" htmlFor="form2Example11">
                            Email
                          </Form.Label>
                          <Form.Control
                            type="email"
                            id="form2Example11"
                            className="form-control"
                            placeholder="Email address"
                            name="userEmail"
                            onChange={handleChange}
                          />

                        </Form.Group>

                        <Form.Group className="mb-4">
                          <Form.Label className="form-label" htmlFor="form2Example22">
                            Password
                          </Form.Label>
                          <Form.Control
                            type="password"
                            id="form2Example22"
                            className="form-control"
                            placeholder="Password"
                            name="userPassword"
                            onChange={handleChange}
                          />

                        </Form.Group>
                        <Row className="justify-content-md-center">
                          <Col lg={12}>
                            <Form.Check
                              type="checkbox"
                              label="I am an artist"
                              name="isArtist"
                              checked={isArtist}
                              onChange={handleChange}
                            />
                          </Col>
                        </Row>


                        <div className="text-center pt-1 mb-5 pb-1">
                          <Button
                            id="loginButton"
                            className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                            type="button"
                            onClick={handleSubmit}
                          >
                            Log in
                          </Button><br />

                          <a id="forgotPasswordLink" className="text-muted" href="/forgot-password">
                            Forgot password?
                          </a><br />
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
          <Modal.Title>Login Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

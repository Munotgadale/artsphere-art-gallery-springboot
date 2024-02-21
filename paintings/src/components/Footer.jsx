import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons';

export const Footer = () => {

    return (
        <div className="footer-dark mt-5">
            <footer>
                <Container>
                    <Row>
                        <Col sm={6} md={3} className="item">
                            <h3>Art-Sphere Team</h3>
                            <p> - Munot Gadale< br />
                                - Bhavesh Dave< br />
                                - Ayush Sharma< br />
                                - Diksha Dhar< br />
                                - Runal Pawar</p>
                        </Col>
                        <Col sm={6} md={3} className="item">
                            <h3>Help</h3>
                            <ul>
                                <li>Contact Us</li>
                                <li>FAQ</li>
                            </ul>
                        </Col>
                        <Col md={6} className="item text">
                            <h3>ART-SPHERE</h3>
                            <p>
                                Immerse yourself in the world of artistic expression at our Art Gallery. We redefine elegance
                                with a curated collection that reflects timeless beauty, combining diverse artistic styles
                                from both local and global creators. Every visit to our gallery is an exploration of sophistication
                                and sentiment, where each piece is a celebration in itself. Join us in unveiling the art of
                                visual enchantment.
                            </p>
                        </Col>
                        <Col className="item-social">
                            <h3>Get In Touch</h3>
                            <a href="https://www.linkedin.com/in/munot-gadale-4a804722a/">
                                <FontAwesomeIcon icon={faLinkedin} />
                            </a>

                            <a href="https://www.linkedin.com/in/munot-gadale-4a804722a/">
                                <FontAwesomeIcon icon={faInstagram} />
                            </a>

                            <a href="https://www.linkedin.com/in/munot-gadale-4a804722a/">
                                <FontAwesomeIcon icon={faFacebook} />
                            </a>

                            <a href="https://www.linkedin.com/in/munot-gadale-4a804722a/">
                                <FontAwesomeIcon icon={faYoutube} />
                            </a>
                        </Col>
                    </Row>
                    <p className="copyright">ArtSphere © 2024</p>
                </Container>
            </footer>
        </div>
    );
};

import React, { useEffect, useState } from "react";
import { Navigationbar } from './Navigationbar';
import diksha from '../img_art/Founder/diksha.jpg';
import munot from '../img_art/Founder/munot.jpg';
import ayush from '../img_art/Founder/Ayush.jpg';
import bhavesh from '../img_art/Founder/bhavesh.png';
import runal from '../img_art/Founder/runal.png';
import video from "../img_art/video/1.mp4";
import { Button, Container } from "react-bootstrap";
import './AboutUs.css';
import { faFacebook, faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import BackTop from 'antd/es/float-button/BackTop';


export function AboutUs() {
    const navigate = useNavigate();

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
            <Navigationbar></Navigationbar>
            &nbsp;&nbsp;&nbsp;<Button variant='btn btn-outline-secondary' className='mt-3' onClick={() => navigate(-1)}>
                <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Back
            </Button>
            <section className="section-white mt-5">
                <div className="container text-center">
                    <h1>About Art-Sphere</h1>
                    <p>Discover the World of Art</p>
                    <Container className="abouttext">
                        <h5>
                            Art-Sphere is your gateway to a captivating world of artistic expression, where traditional and contemporary styles seamlessly converge.
                            Immerse yourself in an extensive collection featuring over a thousand carefully curated artworks, blending the essence of local talent
                            with globally acclaimed masterpieces. Our commitment is to provide you with a diverse selection that caters to a variety of artistic tastes.
                            If you have a specific vision in mind, our dedicated team is ready to source it for you.
                        </h5>
                        <h5>
                            With a heritage spanning three decades, we bring a wealth of credibility and expertise to fulfill your artistic desires. Whether you're
                            seeking a single piece to adorn your space, building a collection for a special event, or exploring corporate orders, Art-Sphere is your
                            comprehensive destination for all things art. Step into the enchanting world of Art-Sphere, where each piece is a timeless celebration of
                            elegance and grace.
                        </h5>
                    </Container>
                </div>
            </section>

            <video src={video} width="100%" height="80%" className="mt-4" autoPlay loop muted playsInline />
            <section className="section-white mt-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <h2 className="section-title">Meet the Founders</h2>
                            <p className="section-subtitle mt-3">
                                Embark on a journey with the visionaries behind our brand. Our founders are dedicated to enriching your experience with a curated selection of exceptional artworks.
                            </p>
                        </div>

                        <section id="about" className="about-section mt-5 mb-3">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-4 col-mf-12 col-12">
                                        <div className="about-img">
                                            <img src={diksha} alt="" className="img-fluid hover-effect" />
                                        </div>
                                    </div>
                                    <div className="col-lg-8 col-md-12 col-12 ps-lg-5 md-5">
                                        <div className="about-text">
                                            <h1>Diksha Dhar</h1>

                                            <h5>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus repellendus ipsam ipsa blanditiis sequi asperiores maxime voluptatibus totam nihil labore reprehenderit numquam nulla eveniet dicta in officia, itaque, minus qui.
                                            </h5>
                                            <div className="item-social mt-4">
                                                <a href="https://www.linkedin.com/in/munot-gadale-4a804722a/" style={{ textDecoration: 'none' }}>
                                                    <FontAwesomeIcon icon={faLinkedin} />
                                                </a>

                                                <a href="https://www.linkedin.com/in/munot-gadale-4a804722a/" style={{ textDecoration: 'none' }}>
                                                    <FontAwesomeIcon icon={faInstagram} />
                                                </a>

                                                <a href="https://www.linkedin.com/in/munot-gadale-4a804722a/" style={{ textDecoration: 'none' }}>
                                                    <FontAwesomeIcon icon={faFacebook} />
                                                </a>

                                                <a href="https://www.linkedin.com/in/munot-gadale-4a804722a/" style={{ textDecoration: 'none' }}>
                                                    <FontAwesomeIcon icon={faTwitter} />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section id="about" className="about-section mt-5 mb-3">
                            <div className="container">
                                <div className="row">

                                    <div className="col-lg-8 col-md-12 col-12 ps-lg-5 md-5">
                                        <div className="about-text">
                                            <h1>Munot Gadale</h1>

                                            <h5>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste sequi nemo incidunt quisquam quos, nam voluptate tempora suscipit odio a? Ex vel quisquam recusandae reiciendis asperiores minima, porro nisi consequatur.</h5>
                                            <div className="item-social mt-4">
                                                <a href="https://www.linkedin.com/in/munot-gadale-4a804722a/" style={{ textDecoration: 'none' }}>
                                                    <FontAwesomeIcon icon={faLinkedin} />
                                                </a>

                                                <a href="https://www.linkedin.com/in/munot-gadale-4a804722a/" style={{ textDecoration: 'none' }}>
                                                    <FontAwesomeIcon icon={faInstagram} />
                                                </a>

                                                <a href="https://www.linkedin.com/in/munot-gadale-4a804722a/" style={{ textDecoration: 'none' }}>
                                                    <FontAwesomeIcon icon={faFacebook} />
                                                </a>

                                                <a href="https://www.linkedin.com/in/munot-gadale-4a804722a/" style={{ textDecoration: 'none' }}>
                                                    <FontAwesomeIcon icon={faTwitter} />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-mf-12 col-12">
                                        <div className="about-img">
                                            <img src={munot} alt="" className="img-fluid hover-effect" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section id="about" className="about-section mt-5 mb-3">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-4 col-mf-12 col-12">
                                        <div className="about-img">
                                            <img src={bhavesh} alt="" className="img-fluid hover-effect" />
                                        </div>
                                    </div>
                                    <div className="col-lg-8 col-md-12 col-12 ps-lg-5 md-5">
                                        <div className="about-text">
                                            <h1>Bhavesh Dave</h1>

                                            <h5>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque, impedit nobis! Dolor omnis aperiam cumque deserunt et doloremque laboriosam ut, repellendus consequuntur dolore, nostrum minus esse illo suscipit dolorem quo.
                                            </h5>
                                            <div className="item-social mt-4">
                                                <a href="https://www.linkedin.com/in/munot-gadale-4a804722a/" style={{ textDecoration: 'none' }}>
                                                    <FontAwesomeIcon icon={faLinkedin} />
                                                </a>

                                                <a href="https://www.linkedin.com/in/munot-gadale-4a804722a/" style={{ textDecoration: 'none' }}>
                                                    <FontAwesomeIcon icon={faInstagram} />
                                                </a>

                                                <a href="https://www.linkedin.com/in/munot-gadale-4a804722a/" style={{ textDecoration: 'none' }}>
                                                    <FontAwesomeIcon icon={faFacebook} />
                                                </a>

                                                <a href="https://www.linkedin.com/in/munot-gadale-4a804722a/" style={{ textDecoration: 'none' }}>
                                                    <FontAwesomeIcon icon={faTwitter} />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section id="about" className="about-section mt-5 mb-3">
                            <div className="container">
                                <div className="row">

                                    <div className="col-lg-8 col-md-12 col-12 ps-lg-5 md-5">
                                        <div className="about-text">
                                            <h1>Ayush Sharma</h1>

                                            <h5>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem voluptate explicabo voluptatibus numquam qui sint facilis! Magnam assumenda odit nostrum labore at quisquam harum magni eaque eos. Repellendus, nam impedit?
                                            </h5>
                                            <div className="item-social mt-4">
                                                <a href="https://www.linkedin.com/in/munot-gadale-4a804722a/" style={{ textDecoration: 'none' }}>
                                                    <FontAwesomeIcon icon={faLinkedin} />
                                                </a>

                                                <a href="https://www.linkedin.com/in/munot-gadale-4a804722a/" style={{ textDecoration: 'none' }}>
                                                    <FontAwesomeIcon icon={faInstagram} />
                                                </a>

                                                <a href="https://www.linkedin.com/in/munot-gadale-4a804722a/" style={{ textDecoration: 'none' }}>
                                                    <FontAwesomeIcon icon={faFacebook} />
                                                </a>

                                                <a href="https://www.linkedin.com/in/munot-gadale-4a804722a/" style={{ textDecoration: 'none' }}>
                                                    <FontAwesomeIcon icon={faTwitter} />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-mf-12 col-12">
                                        <div className="about-img">
                                            <img src={ayush} alt="" className="img-fluid hover-effect" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>



                        <section id="about" className="about-section mt-5 mb-3">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-4 col-mf-12 col-12">
                                        <div className="about-img">
                                            <img src={runal} alt="" className="img-fluid hover-effect" />
                                        </div>
                                    </div>
                                    <div className="col-lg-8 col-md-12 col-12 ps-lg-5 md-5">
                                        <div className="about-text">
                                            <h1>Runal Pawar</h1>

                                            <h5>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa veniam consectetur cumque deserunt reiciendis, hic facere omnis? Non voluptate sapiente soluta exercitationem corrupti in dolores, harum et officia similique ea?
                                            </h5>
                                            <div className="item-social mt-4">
                                                <a href="https://www.linkedin.com/in/munot-gadale-4a804722a/" style={{ textDecoration: 'none' }}>
                                                    <FontAwesomeIcon icon={faLinkedin} />
                                                </a>

                                                <a href="https://www.linkedin.com/in/munot-gadale-4a804722a/" style={{ textDecoration: 'none' }}>
                                                    <FontAwesomeIcon icon={faInstagram} />
                                                </a>

                                                <a href="https://www.linkedin.com/in/munot-gadale-4a804722a/" style={{ textDecoration: 'none' }}>
                                                    <FontAwesomeIcon icon={faFacebook} />
                                                </a>

                                                <a href="https://www.linkedin.com/in/munot-gadale-4a804722a/" style={{ textDecoration: 'none' }}>
                                                    <FontAwesomeIcon icon={faTwitter} />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                    </div>
                </div>
            </section>

            {showBackToTop && (
                <BackTop>
                    <Button type="primary" shape="circle" icon={<i class="fa-solid fa-chevron-up"></i>} onClick={scrollToTop} />
                </BackTop>
            )}

        </>
    );
}
import React, { useEffect, useState } from 'react';
import { Navigationbar } from './Navigationbar';
import Slider from 'react-slick';
import './ContactUs.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { messagesend } from '../Services/MessageService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import BackTop from 'antd/es/float-button/BackTop';


export function ContactUs() {
    const navigate = useNavigate();

    const [formStatus, setFormStatus] = React.useState('Send');
    const [formValues, setFormValues] = React.useState({
        name: '',
        email: '',
        message: '',
    });

    const resetForm = () => {
        setFormValues({
            name: '',
            email: '',
            message: '',
        });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setFormStatus('Submitting...');

        try {
            const formData = new FormData(e.target);
            const jsonData = {};
            formData.forEach((value, key) => {
                jsonData[key] = value;
            });

            const response = await messagesend(jsonData);

            if (response.status === true) {
                setFormStatus('Sent');
                resetForm();

                setTimeout(() => {
                    setFormStatus('Send');
                }, 2000);
            } else {
                throw new Error('Failed to submit message');
            }
        } catch (error) {
            console.error('Error submitting message:', error);
            setFormStatus('Send');
        }
    };

    const contactInfoData = [
        {
            title: 'Get in Touch',
            content: (
                <>
                    <h3>Get in Touch</h3>
                    <p>Feel free to reach out to us anytime!</p>
                    <p>We are here to assist you with any inquiries or concerns you may have.</p>
                    <p>Your satisfaction is our priority.</p>
                </>
            ),
        },
        {
            title: 'Our Location',
            content: (
                <>
                    <h3>Our Location</h3>
                    <p>ArtSphere Art Gallery</p>
                    <p>456 Art Street, Artville, Pune, Maharashtra, 411001, India</p>
                    <p>Explore the vibrant artworks and experience our commitment to artistic excellence.</p>
                </>
            ),
        },
        {
            title: 'Customer Support',
            content: (
                <>
                    <h3>Customer Support</h3>
                    <p>Our dedicated customer support team is available 24/7 to assist you.</p>
                    <p>Contact us through email, phone, or live chat for prompt and friendly service.</p>
                    <p>Your satisfaction is our success!</p>
                </>
            ),
        },
    ];
    

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 1500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
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
     

    return (
        <>
            <Navigationbar />
             &nbsp;&nbsp;&nbsp;<Button variant='btn btn-outline-secondary' className='mt-3' onClick={() => navigate(-1)}>
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Back
      </Button>

            <div className="row justify-content-center mt-5 mb-5">
                <div className="col-md-8 contact-form">
                    <div className="text-center mb-4"></div>
                    <h2 className="mb-4 text-center">Get in Touch</h2>
                    <form onSubmit={onSubmit}>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="name">
                                Name
                            </label>
                            <input
                                className="form-control"
                                type="text"
                                id="name"
                                name="name"
                                value={formValues.name}
                                onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="email">
                                Email
                            </label>
                            <input
                                className="form-control"
                                type="email"
                                id="email"
                                name="email"
                                value={formValues.email}
                                onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="message">
                                Message
                            </label>
                            <textarea
                                className="form-control"
                                id="message"
                                name="message"
                                rows="4"
                                value={formValues.message}
                                onChange={(e) => setFormValues({ ...formValues, message: e.target.value })}
                                required
                            />
                        </div>
                        <div className="text-center">
                            <button className="btn btn-success" type="submit" disabled={formStatus === 'Sent'}>
                                {formStatus}
                            </button>
                        </div>
                        <br />
                    </form>
                    {formStatus === 'Sent' && (
                        <div className="alert alert-success mt-3" role="alert" style={{ fontSize: '18px' }}>
                            Thank you for reaching out! We will get back to you soon.
                        </div>
                    )}
                </div>
            </div>
            

            {showBackToTop && (
                <BackTop>
                    <Button type="primary" shape="circle" icon={<i class="fa-solid fa-chevron-up"></i>} onClick={scrollToTop} />
                </BackTop>
            )}

            <Slider {...sliderSettings}>
                {contactInfoData.map((item, index) => (
                    <div key={index} className="mt-5 additional-info">
                        {item.content}
                    </div>
                ))}
            </Slider>
        </>
    );
}

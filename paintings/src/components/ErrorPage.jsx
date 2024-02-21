import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ErrorPage.css';
import errorpage from "../img_art/ErrorPage.jpg";
import { Button } from 'react-bootstrap';
import { Navigationbar } from './Navigationbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import BackTop from 'antd/es/float-button/BackTop';

const ErrorPage = () => {
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
    &nbsp;&nbsp;&nbsp;
      <Button variant='btn btn-outline-secondary' className='mt-3' onClick={() => navigate(-1)}>
        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Back
      </Button>
    <div className="error-container">
      <h1 className="error-heading">Error</h1>
      <img src={errorpage}  alt="Error" className="error-image" />
      <p className="error-message">Oops! I guess You are Lost .</p>
    </div>
    {showBackToTop && (
        <BackTop>
          <Button type="primary" shape="circle" icon={<i class="fa-solid fa-chevron-up"></i>} onClick={scrollToTop} />
        </BackTop>
      )}
    </>
  );
};

export default ErrorPage;

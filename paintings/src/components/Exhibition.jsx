import React, { useEffect, useState } from 'react';
import './Exhibition.css';
import { Navigationbar } from './Navigationbar';
import { useNavigate } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import BackTop from 'antd/es/float-button/BackTop';

const Exhibition = () => {
  const navigate = useNavigate();
  const [exhibitionsData, setExhibitionsData] = useState([]);
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

  useEffect(() => {
    const fetchExhibitions = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/exhibitions/get/exhibitions');
        const data = await response.json();
        setExhibitionsData(data);
      } catch (error) {
        console.error('Error fetching exhibition data:', error);
      }
    };

    fetchExhibitions();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <>
      <Navigationbar />
      &nbsp;&nbsp;&nbsp;
      <Button variant='btn btn-outline-secondary' className='mt-3' onClick={() => navigate(-1)}>
        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Back
      </Button>
      <Container className="exhibition-container">
      <div>
      <h2 className="exhibition-title"><b>Art-Sphere Exhibitions</b></h2>
      </div>
      <div>
        <div className="exhibition-list">
          {exhibitionsData.map((exhibition) => (
            <div key={exhibition.id} className={`exhibition-card ${exhibition.status}`}>
              <div className="exhibition-image-container">
                <img src={exhibition.image} alt={exhibition.title} className="exhibition-image" />
              </div>
              <div className="exhibition-info-container">
                <h3 className="exhibition-name mt-3">{exhibition.title}</h3>
                <p className="exhibition-info">
                  <span className="exhibition-label">Date:</span> {formatDate(exhibition.date)}
                </p>
                <p className="exhibition-info">
                  <span className="exhibition-label">Venue:</span> {exhibition.venue}
                </p>
                <p className="exhibition-description">{exhibition.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      </Container>
      {showBackToTop && (
        <BackTop>
          <Button type="primary" shape="circle" icon={<i class="fa-solid fa-chevron-up"></i>} onClick={scrollToTop} />
        </BackTop>
      )}
    </>
  );
};

export default Exhibition;

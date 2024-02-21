import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import { FaStar, FaRegStar } from 'react-icons/fa';
import img1 from '../img_art/crausal/4.jpg';
import { useNavigate } from 'react-router-dom';
import './Reviews.css';

function Reviews() {
  const navigate = useNavigate();
  const [reviewsData, setReviewsData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/reviews/get-all-reviews')
      .then(response => response.json())
      .then(data => setReviewsData(data))
      .catch(error => console.error('Error fetching reviews:', error));
  }, []);

  const renderStars = (rating) => {
    const stars = Array.from({ length: 5 }, (_, index) => (
      <span key={index}>{index + 1 <= rating ? <FaStar /> : <FaRegStar />}</span>
    ));
    return <div className="star-rating">{stars}</div>;
  };

  

  return (
    <>
      <div className='section'>
        <h2>Art Gallery Reviews</h2>
      </div>
      <Card className="bg-dark text-white position-relative">
        <Card.Img
          src={img1}
          alt="Card background"
          className='bkg'
          style={{ width: '100%', height: '90vh', objectFit: 'cover' }}
        />
        <div className="overlay"></div>
        <Card.ImgOverlay
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
          <Carousel
            fade
            className="card-carousel"
            indicators={false}
            controls={false}
            interval={5000}
            pause={false}
          >
            {reviewsData.map((review, index) => (
              <Carousel.Item key={index}>
                <h4>{`"${review.comment}"`}</h4>
                <p>{`-- ${review.userName} --`}</p>
                {renderStars(review.rating)}
              </Carousel.Item>
            ))}
          </Carousel>
          <a className='reviews-class mt-5' onClick={() => navigate(`/review-form`)}>Add Reviews..</a>
        </Card.ImgOverlay>
      </Card>
    </>
  );
}

export default Reviews;

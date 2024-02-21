import React, { useEffect, useState } from 'react';
import { Navigationbar } from './Navigationbar';
import Carousel from 'react-bootstrap/Carousel';
import img1 from '../img_art/crausal/7.jpg';
import img2 from '../img_art/crausal/6.jpg';
import img3 from '../img_art/crausal/5.jpg';
import img4 from '../img_art/crausal/1.jpg';
import Reviews from './Reviews';
import './Home.css';
import { Button } from 'react-bootstrap';
import FeaturedProducts from './FeaturedProducts';
import Blogs from './Blogs';
import { useNavigate } from 'react-router-dom';
import BackTop from 'antd/es/float-button/BackTop';

export function Home() {
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
            <Navigationbar />
            <Carousel fade controls={false}>
                <Carousel.Item>
                    <img src={img1} alt="First slide" className="carousel-image" />
                    <Carousel.Caption className="text-container">
                        <h3 className="text-bold">Explore Captivating Art Exhibitions</h3>
                        <p>Immerse yourself in a world of artistic expression and discover unique masterpieces.</p>
                        <p><Button type='button' variant="outline-light" onClick={() => navigate('/collections')} >EXPLORE ART</Button></p>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <img src={img2} alt="Second slide" className="carousel-image" />
                    <Carousel.Caption className="text-container">
                        <h3 className="text-bold">Dive into Contemporary Art</h3>
                        <p>Experience the modern collection that pushes the boundaries of artistic innovation.</p>
                        <p><Button type='button' variant="outline-light" onClick={() => navigate('/collections')} >VIEW COLLECTIONS</Button></p>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <img src={img3} alt="Third slide" className="carousel-image" />
                    <Carousel.Caption className="text-container">
                        <h3 className="text-bold">Elevate Your Space with Timeless Art</h3>
                        <p>Transform your surroundings with the grand collection of timeless masterpieces.</p>
                        <p><Button type='button' variant="outline-light" onClick={() => navigate('/collections')}>EXPLORE ARTWORKS</Button></p>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <img src={img4} alt="Fourth slide" className="carousel-image" />
                    <Carousel.Caption className="text-container">
                        <h3 className="text-bold">Discover Art That Resonates</h3>
                        <p>Let your journey through the gallery be guided by pieces that resonate with your soul.</p>
                        <p><Button type='button' variant="outline-light" onClick={() => navigate('/collections')}>EXPLORE COLLECTION</Button></p>
                    </Carousel.Caption>
                </Carousel.Item>
                
            </Carousel>


            <FeaturedProducts />
           

            <Blogs />
             
            <div>
                <Reviews />
            </div>

            {showBackToTop && (
                <BackTop>
                    <Button type="primary" shape="circle" icon={<i class="fa-solid fa-chevron-up"></i>} onClick={scrollToTop} />
                </BackTop>
            )}

            
        </>
    );
}

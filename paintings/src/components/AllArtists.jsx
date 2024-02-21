import { Container, Card, Col, Row, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { getArtists } from "../Services/UserService";
import "./AllArtists.css"; 
import { Navigationbar } from "./Navigationbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import BackTop from 'antd/es/float-button/BackTop';

export function AllArtist() {
    const navigate = useNavigate();
  const [user, setUser] = useState([]);

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
  

  async function fetchUsersList() {
    try {
      const data = await getArtists();
      setUser(data.list);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchUsersList();
  }, []);

  const handleCardClick = (artistId) => {
    sessionStorage.setItem('artistNewId', artistId);
    navigate('/artist-user-profile');
  };

  return (
    <>
      <Navigationbar />
      &nbsp;&nbsp;&nbsp;<Button variant='btn btn-outline-secondary' className='mt-3' onClick={() => navigate(-1)}>
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Back
      </Button>
      <h1>ArtSphere Artists</h1>
      
      <Container className="artistContainer">
      <p className="gallery-description">
          Explore the world of creativity and imagination through the exceptional
          artworks created by our talented artists. ArtSphere Art Gallery is a place
          where passion meets expression, and each piece tells a unique story.
        </p>
        {user.length !== 0 ? (
          <Row xs={1} md={2} lg={3} xl={3} className="g-4">
            {user.map((s) => s.artistStatus !== "DELETED" && (
              <Col key={s.artistId}>
                
                <Card className="artist-card" >
                  <Card.Img
                    className="userImgNew"
                    src={`http://localhost:8080/artist/fetch/profilePic/${s.artistId}`}
                    alt="Profile Pic"
                  />
                  
                  <Card.Body>
                    <Card.Title className="artist-name">{s.artistName}</Card.Title>
                    <Card.Text className="artist-info">

                      <strong>Artworks Created:</strong> {s.artworksCreated}<br />
                      <strong>Prizes Won:</strong> {s.prizesWon}<br />
                      <strong>Exhibitions Attended:</strong> {s.exhibitionsAttended}<br />
                      <strong>Art Style:</strong> {s.artStyle}
                      
                    </Card.Text>
                    <Button variant="btn btn-outline-warning"  onClick={() => handleCardClick(s.artistId)}>
                            View Profile
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <h4>Currently, You Don't Have Any artists...</h4>
        )}
      </Container>
      {showBackToTop && (
                <BackTop>
                    <Button type="primary" shape="circle" icon={<i class="fa-solid fa-chevron-up"></i>} onClick={scrollToTop} />
                </BackTop>
            )}
    </>
  );
}

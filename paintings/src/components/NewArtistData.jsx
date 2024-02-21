// Collections.jsx

import React, { useState, useEffect } from 'react';
import { Container, Card } from 'react-bootstrap';
import './Collections.css';
import { Navigationbar } from './Navigationbar';

function Collections() {
  const name = sessionStorage.getItem('userName');
  const newid = sessionStorage.getItem('userId');

  const [arts, setArts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArts = async () => {
      try {
        const response = await fetch('http://localhost:8080/art/fetchAllArts');
        const data = await response.json();

        if (data.status) {
          setArts(data.list);
        } else {
          console.error('Failed to fetch arts:', data.statusMessage);
        }
      } catch (error) {
        console.error('Error fetching arts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArts();
  }, []); 

  return (
    <>
      <Navigationbar />
      <Container className="mt-5">
        <h2 className="mb-4 head">Welcome {name}...</h2>
        <Card className="card">
          <Card.Body className="card-body">
            <div className="text-center mb-4 imageList">
              {loading ? (
                <p>Loading arts...</p>
              ) : (
                <div>
                  {arts.map((art) => (
                    <div key={art.id} className="artContainer">
                      <img className="newImg" src={`http://localhost:8080/artist/fetch/pic/${art.id}`} alt={`Art ${art.id}`} />
                      <div className="artDetails">
                        <h3 className="artTitle">Art Title: </h3>
                        <p className="artDescription">Description: {`Dummy description for Art ${art.id}. Lorem ipsum dolor sit amet, consectetur adipiscing elit.`}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default Collections;

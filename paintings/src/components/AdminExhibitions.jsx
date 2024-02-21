import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button, Container } from 'react-bootstrap';
import './AdminExhibition.css';
import { AdminNavigationbar } from "../components/AdminNavigationBar";

const AdminExhibition = () => {
  const [exhibitionsData, setExhibitionsData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedExhibitionId, setSelectedExhibitionId] = useState(null);

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

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/exhibitions/delete/${selectedExhibitionId}`, {
        method: 'DELETE',
      });

      if (response != null) {
        setExhibitionsData((prevData) => prevData.filter((exhibition) => exhibition.id !== selectedExhibitionId));
        handleCloseModal();
      } else {
        console.error('Error deleting exhibition:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting exhibition:', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedExhibitionId(null);
  };

  const handleShowModal = (exhibitionId) => {
    setSelectedExhibitionId(exhibitionId);
    setShowModal(true);
  };

  return (
    <>
      <AdminNavigationbar />
      <Container className="exhibition-container">
        <div className="exhibition-header">
          <h2 className="exhibition-title"><b>Art-Sphere Exhibitions</b></h2>
          <Link to="/admin/add-exhibition">
            <Button className='mb-3' variant='btn btn-outline-secondary'>Add Exhibition</Button>
          </Link>
        </div>
        <div className="exhibition-list">
          {exhibitionsData.map((exhibition) => (
            <div key={exhibition.id} className={`exhibition-card exhibition-image-container ${exhibition.status}`}>
              <img src={exhibition.image} alt={exhibition.title} className="exhibition-admin-image" />
              <div className="exhibition-details">
                <div>
                  <h3 className="exhibition-name">{exhibition.title}</h3>
                  <p className="exhibition-info">
                    <span className="exhibition-label">Date:</span> {formatDate(exhibition.date)}
                  </p>
                  <p className="exhibition-info">
                    <span className="exhibition-label">Venue:</span> {exhibition.venue}
                  </p>
                  <p className="exhibition-description">{exhibition.description}</p>
                </div>

                <div className="button-row">
                  <Link to={`/admin/update-exhibition/${exhibition.id}`}>
                    <Button className='btn btn-secondary'>Edit</Button>
                  </Link>&nbsp;
                  <Button className='btn btn-danger' onClick={() => handleShowModal(exhibition.id)}>
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this exhibition?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AdminExhibition;
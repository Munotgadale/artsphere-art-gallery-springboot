import { useState, useEffect } from 'react';
import { Container, Table, Button, Modal } from 'react-bootstrap';
import { getArtists, deleteArtistPermanently, reactivateArtist } from '../Services/UserService';
import { AdminNavigationbar } from './AdminNavigationBar';

export function DeletedArtistList() {
  const [artists, setArtists] = useState([]);
  const [deleteArtistId, setDeleteArtistId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showReactivateModal, setShowReactivateModal] = useState(false);

  async function fetchArtistsList() {
    try {
      const data = await getArtists();
      setArtists(data.list);
    } catch (error) {
      console.log(error);
    }
  }

  const handleShowDeleteModal = (artistId) => {
    setDeleteArtistId(artistId);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteArtistId(null);
    setShowDeleteModal(false);
  };

  const handleShowReactivateModal = (artistId) => {
    setDeleteArtistId(artistId);
    setShowReactivateModal(true);
  };

  const handleCloseReactivateModal = () => {
    setDeleteArtistId(null);
    setShowReactivateModal(false);
  };

  const handlePermanentlyDelete = async () => {

    try {
      const response = await deleteArtistPermanently(deleteArtistId);

      if (response !== null) {

        fetchArtistsList();
        alert('Artist permanently deleted successfully');
      } else {
        console.error('Failed to permanently delete artist');
      }
    } catch (error) {
      console.error('Error permanently deleting artist:', error);
    }

    handleCloseDeleteModal();
  };

  const handleReactivateAccount = async () => {

    try {
      const response = await reactivateArtist(deleteArtistId);
      console.log(response);
      if (response !== null) {

        fetchArtistsList();
        alert('Artist account reactivated successfully');
      } else {
        console.error('Failed to reactivate artist account');
      }
    } catch (error) {
      console.error('Error reactivating artist account:', error);
    }

    handleCloseReactivateModal();
  };

  useEffect(() => {
    fetchArtistsList();
  }, []);

  return (
    <>
      <AdminNavigationbar />
      <h1>Deleted Artist List</h1>
      <Container>
        {artists.length !== 0 ? (
          <Table className="mt-5">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Status</th>
                <th>Action</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {artists.map((s) => (
                s.artistStatus === 'DELETED' && (
                  <tr key={s.artistId}>
                    <td>{s.artistName}</td>
                    <td>{s.artistPhone}</td>
                    <td>{s.artistEmail}</td>
                    <td>{s.artistStatus}</td>
                    <td>

                      <Button variant="danger" onClick={() => handleShowDeleteModal(s.artistId)}>
                        Permanently Delete
                      </Button>
                    </td>
                    <td>

                      <Button variant="secondary" onClick={() => handleShowReactivateModal(s.artistId)}>
                        Reactivate Account
                      </Button>
                    </td>
                  </tr>
                )
              ))}
            </tbody>
          </Table>
        ) : (
          <h4>Currently, You Don't Have Any artists...</h4>
        )}
      </Container>

      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to permanently delete this artist? This action cannot be undone.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handlePermanentlyDelete}>
            Permanently Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showReactivateModal} onHide={handleCloseReactivateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to reactivate this artist account?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseReactivateModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleReactivateAccount}>
            Reactivate Account
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

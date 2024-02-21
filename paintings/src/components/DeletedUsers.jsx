import { Container, Table, Button, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { getUsers, deleteUserPermanently, reactivateUser, deleteUserEmailSend, reactiveUserEmailSend } from "../Services/UserService";
import { AdminNavigationbar } from "./AdminNavigationBar";

export function DeletedUsersList() {
  const [user, setUser] = useState([]);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showReactivateModal, setShowReactivateModal] = useState(false);

  async function fetchUsersList() {
    try {
      const data = await getUsers();
      setUser(data.list);
    } catch (error) {
      console.log(error);
    }
  }

  const handleShowDeleteModal = (userId) => {
    setDeleteUserId(userId);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteUserId(null);
    setShowDeleteModal(false);
  };

  const handleShowReactivateModal = (userId) => {
    setDeleteUserId(userId);
    setShowReactivateModal(true);
  };

  const handleCloseReactivateModal = () => {
    setDeleteUserId(null);
    setShowReactivateModal(false);
  };

  const handlePermanentlyDelete = async () => {

    try {
      const response = await deleteUserPermanently(deleteUserId);
      const data = await response.json();
      console.log(data);

      fetchUsersList();
      alert('User permanently deleted successfully');
      
    } catch (error) {
      console.error('Error permanently deleting user:', error);
    }

    handleCloseDeleteModal();
  };

  const handleReactivateAccount = async () => {
    try {
      const response = await reactivateUser(deleteUserId);
      if (response !== null) {

        fetchUsersList();
        alert('User account reactivated successfully');
      } else {
        console.error('Failed to reactivate user account');
      }
    } catch (error) {
      console.error('Error reactivating user account:', error);
    }

    handleCloseReactivateModal();
  };

  useEffect(() => {
    fetchUsersList();
  }, []);

  return (
    <>
      <AdminNavigationbar />
      <h1>Deleted User List</h1>
      <Container>
        {user.length !== 0 ? (
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
              {user.map((s) => (
                s.userStatus === "DELETED" && (
                  <tr key={s.userId}>
                    <td>{s.userName}</td>
                    <td>{s.userPhone}</td>
                    <td>{s.userEmail}</td>
                    
                    <td>{s.userStatus}</td>
                    <td>
                      <Button variant="danger" onClick={() => handleShowDeleteModal(s.userId)}>
                        
                        Permanently Delete
                      </Button>
                    </td>
                    <td>
                      <Button variant="secondary" onClick={() => handleShowReactivateModal(s.userId)}>
                        Reactivate Account
                      </Button>
                    </td>
                  </tr>
                )
              ))}
            </tbody>
          </Table>
        ) : (
          <h4>Currently, You Don't Have Any Users...</h4>
        )}
      </Container>

      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to permanently delete this user? This action cannot be undone.</p>
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
          <p>Are you sure you want to reactivate this user account?</p>
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

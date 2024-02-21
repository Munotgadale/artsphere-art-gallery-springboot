import React, { useEffect, useState } from 'react';
import { deleteMessage, getMessages } from '../Services/MessageService';
import { AdminNavigationbar } from './AdminNavigationBar';
import './MessageList.css'; 
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export function MessageList() {
  const [messages, setMessages] = useState([]);
  const [deleteMessageId, setDeleteMessageId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await getMessages();
      if (response !== null) {
        setMessages(response);
      } else {
        console.error('Failed to fetch messages. Status:', response.status);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleDelete = async (messageId) => {
    setDeleteMessageId(messageId);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await deleteMessage(deleteMessageId);
      if (response !== null) {
        fetchMessages();
        setShowModal(false);
      } else {
        console.error('Failed to delete message. Status:', response.status);
      }
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <AdminNavigationbar />
      <div className="message-list-container">
        <h2 className="message-list-heading">Message List</h2>
        <ul className="list-group message-list">
          {messages.map((message) => (
            <li key={message.id} className="list-group-item message-item">
              <div className="message-details">
                <strong>Name:</strong> {message.name}
              </div>
              <div className="message-details">
                <strong>Email:</strong> {message.email}
              </div>
              <div className="message-content">
                <strong>Message:</strong> {message.message}
              </div>
              <div className="message-buttons">
                <button className='btn btn-outline-danger mt-2' onClick={() => handleDelete(message.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this message?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

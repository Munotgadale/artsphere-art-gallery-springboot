import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import { useState } from "react";
import { Navigationbar } from './Navigationbar';
import { adminlogin } from '../Services/AdminService';
import { useNavigate } from "react-router-dom";
import React from 'react';

export function AdminLogin() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ userEmail: "", userPassword: "" });
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleShowModal = (message) => {
        setModalMessage(message);
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await adminlogin(formData);
            if (result.status === true) {
                if (result.name === "secret") {
                    
                    handleShowModal("Admin, the Picasso of Pixels! Time to brush up on your masterpiece-making skills! 🎨😄");
                     
                    localStorage.setItem("token", result.statusMessage);
                    
                    sessionStorage.setItem("adminMessage", result.name);
                    
                    setTimeout(() => {
                        navigate("/admin-dashboard");
                    }, 2000); 
                }                
                else {
                    handleShowModal("Something Went Wrong!!!!!");
                }
            } else {
                handleShowModal(result.statusMessage);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Navigationbar />
            
            <section className="vh-100">
                <div className="container py-5 h-100">
                    <div className="row d-flex align-items-center justify-content-center h-100">
                        <div className="col-md-8 col-lg-7 col-xl-6">
                            <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                                className="img-fluid"
                                alt="Phone image"
                            />
                        </div>
                        <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                            <h1 className='mb-3'>Admin Login</h1>
                            <Form onSubmit={handleSubmit}>

                                <Form.Group className="mb-4">
                                    <Form.Control
                                        type="email"
                                        id="form1Example13"
                                        className="form-control form-control-lg"
                                        placeholder="Email address"
                                        name="userEmail"
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Control
                                        type="password"
                                        id="form1Example23"
                                        className="form-control form-control-lg"
                                        placeholder="Password"
                                        name="userPassword"
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Button type="submit" className="btn btn-dark mx-auto d-block">
                                    Sign in
                                </Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </section>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Login Status</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalMessage}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

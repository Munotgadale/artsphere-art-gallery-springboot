import { Modal, Button, Container, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { deleteUser, getUsers } from "../Services/UserService";
import { AdminNavigationbar } from "./AdminNavigationBar";

export function UsersList() {

    const [user, setUser] = useState([]);
    const [showDialog, setShowDialog] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState("");

    const openModalDialog = (userId) => {
        setSelectedUserId(userId);
        setShowDialog(true);
    }

    const closeModalDialog = () => {
        setShowDialog(false);
    }

    async function fetchUsersList() {
        try {
            const data = await getUsers();
            setUser(data.list);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchUsersList();
    }, []);

    const handleDeleteClick = async () => {
        try {
            await deleteUser(selectedUserId);
            fetchUsersList();
            closeModalDialog();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <AdminNavigationbar />
            <h1>User List</h1>
            <Container>
                {user.length !== 0 ? (
                    <Table className="mt-5">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Email</th>
                                {/* <th>Password</th> */}
                                <th>Profile Pic</th>
                                <th>Status</th>
                                <th>Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {user.map((s) => (
                                (s.userStatus !== "DELETED") && (
                                    <tr key={s.userId}>
                                        <td>{s.userName}</td>
                                        <td>{s.userPhone}</td>
                                        <td>{s.userEmail}</td>
                                        {/* <td>{s.userPassword}</td> */}
                                        <td>
                                            <img
                                                className="userImgNew"
                                                src={`http://localhost:8080/user/fetch/profilePic/${s.userId}`}
                                                alt="Profile Pic"
                                                style={{ maxWidth: '80px', maxHeight: '80px' }}
                                            />
                                        </td>
                                        <td>{s.userStatus}</td>
                                        <td>
                                            <Button variant="danger" onClick={() => openModalDialog(s.userId)}>
                                                Delete
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

                <Modal show={showDialog} onHide={closeModalDialog}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirmation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to delete {selectedUserId}?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={() => handleDeleteClick()}>
                            Yes
                        </Button>
                        <Button variant="danger" onClick={closeModalDialog}>
                            No
                        </Button>
                    </Modal.Footer>
                </Modal>

            </Container>

        </>
    );
}

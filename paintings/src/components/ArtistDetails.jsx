import { Modal, Button, Container, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { deleteArtist, deleteUser, getArtists } from "../Services/UserService";
import { AdminNavigationbar } from "./AdminNavigationBar";

export function ArtistList() {

    const [user, setUser] = useState([]);
    const [showDialog, setShowDialog] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState("");

    

    const openModalDialog = (artistId) => {
        setSelectedUserId(artistId);
        setShowDialog(true);
    }


    const closeModalDialog = () => {
        setShowDialog(false);
    }

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

    const handleDeleteClick = async () => {
        try {
            await deleteArtist(selectedUserId);
            fetchUsersList();
            closeModalDialog();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <AdminNavigationbar />
            <h1>Artist List</h1>
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
                                (s.artistStatus !== "DELETED") && (
                                    <tr key={s.artistId}>
                                        <td>{s.artistName}</td>
                                        <td>{s.artistPhone}</td>
                                        <td>{s.artistEmail}</td>
                                        {/* <td>{s.artistPassword}</td> */}
                                        <td>
                                            <img
                                                className="userImgNew"
                                                src={`http://localhost:8080/artist/fetch/profilePic/${s.artistId}`}
                                                alt="Profile Pic"
                                                style={{ maxWidth: '80px', maxHeight: '80px' }}
                                            />
                                        </td>
                                        <td>{s.artistStatus}</td>
                                        <td>
                                            <Button variant="danger" onClick={() => openModalDialog(s.artistId)}>
                                                Delete
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

                <Modal show={showDialog} onHide={closeModalDialog}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirmation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to delete {setSelectedUserId}?</Modal.Body>
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

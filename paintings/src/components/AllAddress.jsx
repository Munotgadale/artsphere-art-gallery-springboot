import { Container, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { AdminNavigationbar } from "./AdminNavigationBar";

export function AllAddress() {
  const [addresses, setAddresses] = useState([]);

  async function fetchAddressesList() {
    try {
      const response = await fetch('http://localhost:8080/api/address/list');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setAddresses(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchAddressesList();
  }, []);

  return (
    <>
      <AdminNavigationbar />
      <h1>Order List</h1>
      <Container>
        {addresses.length !== 0 ? (
          <Table className="mt-5">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Art Name</th>
                <th>User Name</th>
              </tr>
            </thead>
            <tbody>
              {addresses.map((address) => (
                <tr key={address.addressId}>
                  <td>{address.name}</td>
                  <td>{address.phoneNumber}</td>
                  <td>{address.email}</td>
                  <td>{address.art ? address.art.title : 'N/A'}</td>
                  <td>{address.user ? address.user.userName : 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <h4>Currently, You Don't Have Any Addresses...</h4>
        )}
      </Container>
    </>
  );
}

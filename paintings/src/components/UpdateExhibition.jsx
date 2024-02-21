import React, { useState, useEffect } from 'react';
import { AdminNavigationbar } from '../components/AdminNavigationBar';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './UpdateExhibition.css';

const UpdateExhibition = ({ history }) => {
    const navigate = useNavigate();
  const { id } = useParams();
  const [exhibitionData, setExhibitionData] = useState({
    title: '',
    date: '',
    venue: '',
    description: '',
    image: '',
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchExhibitionDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/exhibitions/get/${id}`);

        if (response.ok) {
          const data = await response.json();
          if (data != null) {
            setExhibitionData(data);
          } else {
            console.error('Failed to fetch exhibition details: Unexpected response format');
          }
        } else {
          console.error('Failed to fetch exhibition details:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error fetching exhibition details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExhibitionDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExhibitionData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8080/api/exhibitions/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(exhibitionData),
      });
      console.log(response);
      navigate('/admin-exhibitions');
    } catch (error) {
      console.error('Error updating exhibition:', error);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <AdminNavigationbar />
      <div className="update-exhibition-container">
        <h2 className="update-exhibition-title">Update Exhibition</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={exhibitionData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={exhibitionData.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="venue">Venue:</label>
            <input
              type="text"
              id="venue"
              name="venue"
              value={exhibitionData.venue}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={exhibitionData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">Image URL:</label>
            <input
              type="url"
              id="image"
              name="image"
              value={exhibitionData.image}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="update-exhibition-button">
            Update
          </button>{' '}
          <button onClick={() => navigate('/admin-exhibitions')} className="add-exhibition-button">
            Back
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateExhibition;

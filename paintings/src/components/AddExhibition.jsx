import React, { useState } from 'react';
import { AdminNavigationbar } from '../components/AdminNavigationBar';
import './AddExhibition.css';
import { useNavigate } from 'react-router-dom';

const AddExhibition = ({ history }) => {
    const navigate = useNavigate();
  const [exhibitionData, setExhibitionData] = useState({
    title: '',
    date: '',
    venue: '',
    description: '',
    image: '',
  });

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
      const response = await fetch('http://localhost:8080/api/exhibitions/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(exhibitionData),
      });
      console.log(response);
      navigate('/admin-exhibitions');
    } catch (error) {
      console.error('Error adding exhibition:', error);
    }
  };

  return (
    <>
      <AdminNavigationbar />
      <div className="add-exhibition-container">
        <h2 className="add-exhibition-title">Add Exhibition</h2>
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
          <button type="submit" className="add-exhibition-button">
            Submit
          </button>{' '}
          <button onClick={() => navigate('/admin-exhibitions')} className="add-exhibition-button">
            Back
          </button>

        </form>
      </div>
    </>
  );
};

export default AddExhibition;

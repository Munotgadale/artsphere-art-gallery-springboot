import React from 'react';
import aboutImage from '../img_art/FindArt/Hybrid-Homepage-RW-Prog-large.jpg';
import sign from '../img_art/w-sig-black.png';
import './Blogs.css';
const Blogs = () => {
  return (
    <>
      <section id="about" className="about-section mt-5 mb-3">
        <div className="container">
          <h2 className="section-heading text-center mb-5">Find Art You Love</h2>
          <div className="row">
            <div className="col-md-6">
              <div className="about-img">
                <img
                  src={aboutImage}
                  alt=""
                  className="hover-effect"
                  style={{ width: '100%', maxWidth: '600px', height: 'auto' }}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="about-text text-center mt-5">
                <p>
                  "At Art-Sphere, we make it our mission to help you discover and buy from the best emerging artists around the world. Whether you’re looking to discover a new artist, add a statement piece to your home, or commemorate an important life event, Saatchi Art is your portal to thousands of original works by today’s top artists.""
                </p>
                <img
                  src={sign}
                  alt=""
                  style={{ width: '100%', maxWidth: '600px', height: 'auto' }}
                  />
                  <p>Chief Curator & VP, Art Advisory</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Blogs;

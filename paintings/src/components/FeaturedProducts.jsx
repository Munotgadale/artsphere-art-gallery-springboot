import React from 'react';
import img1 from '../img_art/PopularArts/1.jpg';
import img2 from '../img_art/PopularArts/2.jpg';
import img3 from '../img_art/PopularArts/3.jpg';
import img4 from '../img_art/PopularArts/4.jpg';
import img5 from '../img_art/PopularArts/5.jpg';
import img6 from '../img_art/PopularArts/6.jpg';
import img7 from '../img_art/PopularArts/12.jpg';
import img8 from '../img_art/PopularArts/14.jpg';
import './FeaturedProducts.css';
import { Button } from 'react-bootstrap';

const FeaturedProducts = () => {
  const products = [
    { id: 1, name: 'Abstract Fusion', description: 'Abstract and contemporary artwork', extraFeature: 'Hand-painted with vibrant colors', image: img1 },
    { id: 2, name: 'Ethereal Portraits', description: 'Capturing the essence of individuals', extraFeature: 'Highly detailed and realistic', image: img2 },
    { id: 3, name: 'Expressive Emotions', description: 'Artistic expression and emotion', extraFeature: 'Bold brushstrokes and vivid colors', image: img3 },
    { id: 4, name: 'Intricate Miniatures', description: 'Intricate and detailed small-scale artwork', extraFeature: 'Exquisite craftsmanship', image: img4 },
    { id: 5, name: 'Innovative Explorations', description: 'Pushing the boundaries of traditional art', extraFeature: 'Innovative and unique techniques', image: img5 },
    { id: 6, name: 'Tempered Tones', description: 'Using pigments mixed with a water-soluble binder medium', extraFeature: 'Traditional technique with a modern twist', image: img6 },
    { id: 7, name: 'Watercolor Whimsy', description: 'Artwork using watercolor as the primary medium', extraFeature: 'Soft and ethereal color palette', image: img7 },
    { id: 8, name: 'Everyday Narratives', description: 'Depicting scenes from everyday life', extraFeature: 'Narrative storytelling through art', image: img8 },
  ];

  return (
    <>
      <div className="container text-center mt-5">
        <div className="row">
          <div className="col">
            <div className="title-wrapper-with-link title-wrapper--self-padded-mobile title-wrapper--no-top-margin content-align--center">
              <h2 className="title h0">Discover Masterpieces</h2>
              <p className="description">Welcome to the Art-Sphere. Enjoy this magical world of art, masterpieces, and amazing collections! We display, borrow, and collect artworks from around the world.</p>
            </div>
          </div>
        </div>

        <div className="row row-cols-1 row-cols-md-4 g-4 mt-3">
          {products.map((product) => (
            <div className="col" key={product.id}>
              <div className="card h-100 product-card">
                <img src={product.image} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h3 className="card__heading h5">{product.name}</h3>
                  <p className="card-text">{product.description}</p>
                  <div className="d-grid gap-1 col-4 mx-auto">
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </>
  );
};

export default FeaturedProducts;

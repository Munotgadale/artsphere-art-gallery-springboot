import React from 'react';
import styled from 'styled-components';
import { Navigationbar } from './Navigationbar';
import { Container, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

const artistsData = [
    {
        id: 2,
        name: 'Majnu Bhai',
        image: 'https://img.mensxp.com/media/photogallery/2023/Sep/Anil-Kapoor-Majnu-Bhai-iconic-welcome-painting-created-by-directed-by-Anees-Bazmee-9_6514879ead67e.jpeg',
        description: 'Anil Kapoor is a legendary Bollywood actor known for his versatile roles and timeless performances. With a career spanning several decades, Kapoor has become an icon in the Indian film industry. He has played memorable characters in movies like "Mr. India," "Tezaab," and "Ram Lakhan." Kapoor continues to charm audiences with his energy, charisma, and acting prowess.',
        socialMedia: {
            twitter: 'https://twitter.com/AnilKapoor',
            instagram: 'https://www.instagram.com/anilskapoor/',
        },
    },
  {
    id: 2,
    name: 'Leonardo da Vinci',
    image: 'https://www.leonardodavinci.net/images/leonardo-da-vinci.jpg',
    description: 'Leonardo da Vinci, an Italian polymath of the Renaissance, was a true genius whose interests spanned various fields. In addition to being a master painter (known for "Mona Lisa" and "The Last Supper"), Da Vinci excelled in anatomy, engineering, and scientific observation. His detailed sketches and inventions showcased his unparalleled curiosity and contributed significantly to advancements in multiple disciplines.',
    socialMedia: {
      twitter: 'https://twitter.com/LeonardoDaVinci',
      instagram: 'https://www.instagram.com/leonardodavinci/',
    },
  },
  {
    id: 3,
    name: 'Pablo Picasso',
    image: 'https://svetslik.si/wp-content/uploads/2021/09/Pablo-Picasso.jpg.webp',
    description: 'Pablo Picasso, a Spanish painter and sculptor, co-founded the Cubist movement and remains one of the most influential artists of the 20th century. Picasso\'s diverse body of work includes paintings, sculptures, ceramics, and more. Notable pieces like "Guernica" reflect his political engagement, while his ability to transition through various styles, from Blue Period to Rose Period, demonstrates his artistic versatility.',
    socialMedia: {
      twitter: 'https://twitter.com/PabloPicasso',
      instagram: 'https://www.instagram.com/pablopicasso/',
    },
  },
  {
    id: 4,
    name: 'Raja Ravi Varma',
    image: 'https://th-i.thgim.com/public/life-and-style/ajiuza/article66377473.ece/alternates/FREE_1200/Self%20portrait%20of%20Raja%20Ravi%20Varma.jpg',
    description: 'Raja Ravi Varma, an Indian painter, is often hailed as the father of the modern Indian art movement. His realistic depictions of scenes from the Mahabharata and Ramayana combined Indian traditions with European techniques, contributing to a cultural renaissance in 19th-century India. Varma\'s work laid the foundation for the fusion of traditional Indian art with Western realism.',
    socialMedia: {
      twitter: 'https://twitter.com/RajaRaviVarma',
      instagram: 'https://www.instagram.com/rajaravivarma/',
    },
  },
  {
    id: 5,
    name: 'M.F. Husain',
    image: 'https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcR3680TqbXE-wGAfFCTFU9hjBa4DK7ym-deI1gWiPTbnzngYcuA09XfN2dxY0Wz-LOSLjp6HLd3ye0yQRc',
    description: 'Maqbool Fida Husain, an iconic Indian painter, earned the title "Picasso of India" for his avant-garde style. A prominent figure in Indian modernism, Husain\'s modified Cubist approach and vibrant colors set his works apart. His prolific career covered diverse themes, from mythology to social issues, making him one of the most celebrated artists in the history of Indian contemporary art.',
    socialMedia: {
      twitter: 'https://twitter.com/MFHusain',
      instagram: 'https://www.instagram.com/mfhussainofficial/',
    },
  },
  {
    id: 6,
    name: 'Amrita Sher-Gil',
    image: 'https://www.culturalindia.net/iliimages/Amrita-Sher-Gil-ili-194-img-1.jpg',
    description: 'Amrita Sher-Gil, a Hungarian-Indian painter, is recognized for her significant contributions to modern Indian art. Combining Western and Eastern influences, Sher-Gil\'s works often portrayed the lives of rural Indians. Her ability to capture emotions and societal nuances in pieces like "The Village Scene" and "Bride\'s Toilet" established her as a pioneer of Indian avant-garde art.',
    socialMedia: {
      twitter: 'https://twitter.com/AmritaSherGil',
      instagram: 'https://www.instagram.com/amritashergil/',
    },
  },
];

const ArtistContainer = styled.div`
  display: flex;
  border: 2px solid #ddd;
  border-radius: 20px;
  overflow: hidden;
  margin: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
  background-color: rgba(248, 248, 248, 0.9);
  background-image: url('../img-art/Diwar.jpg'); /* Add your background image path here */
  background-size: cover;
   /* Adjust the opacity as needed */

  &:hover {
    background-color:#ffdb58;
    transform: scale(1.05);
  }
`;

const ArtistImage = styled.img`
  width: 200px;
  height: auto;
  border-radius: 20px 0 0 20px;
`;

const ArtistInfo = styled.div`
  
  flex: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ArtistName = styled.h2`
  margin-bottom: 8px;
  color: #333;
  font-size: 1.5em;
`;

const ArtistDescription = styled.p`
  color: #666;
  font-size: 1.2em;
`;

const SocialMediaContainer = styled.div`
  margin-top: 10px;
  display: flex;
  gap: 10px;
`;

const SocialMediaButton = styled(Button)`
  background-color: #55acee; /* Twitter Blue */
  border: none;
  &:hover {
    background-color: #007bb5; /* Darker Twitter Blue */
  }
`;

const Header = styled.h1`
  font-size: 3em;
  color: #333;
  text-align: center;
  margin-top: 30px;
  font-weight: bold;
`;


const Subtitle = styled.p`
  text-align: center;
  color: #666;
  font-size: 1.2em;
`;

const Artist = () => {
  return (
    <>
      <Navigationbar />
      <Container>
        <Header>Popular Artists</Header>
        <Subtitle>The most bright representatives of this authentic art style</Subtitle>
        <div className="artists-list">
          {artistsData.map(artist => (
            <ArtistContainer key={artist.id}>
              <ArtistImage src={artist.image} alt={artist.name} />
              <ArtistInfo>
                <ArtistName>{artist.name}</ArtistName>
                <ArtistDescription>{artist.description}</ArtistDescription>
                <SocialMediaContainer>
                  <SocialMediaButton href={artist.socialMedia.twitter} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faTwitter} /> Twitter
                  </SocialMediaButton>
                  <SocialMediaButton href={artist.socialMedia.instagram} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faInstagram} /> Instagram
                  </SocialMediaButton>
                </SocialMediaContainer>
              </ArtistInfo>
            </ArtistContainer>
          ))}
        </div>
      </Container>
    </>
  );
};

export default Artist;
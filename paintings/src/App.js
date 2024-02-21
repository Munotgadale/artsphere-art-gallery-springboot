import React, { useEffect, useState } from 'react';
import CookieConsent from "react-cookie-consent";
import { Home } from './components/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './components/Login';
import { SignUp } from './components/SignUp';
import { AdminPrivateRoute, PrivateRoute } from './components/PrivateRoute';
import { RedirectIfLoggedIn } from './components/RedirectIfLoggedIn'; 
import { AdminLogin } from './components/AdminLogin';
import { AdminRedirectIfLoggedIn } from './components/AdminRedirectIfLoggedIn';
import { UsersList } from './components/UserDetails';
import { Footer } from './components/Footer';
import { AboutUs } from './components/AboutUs';
import { ContactUs } from './components/ContactUs'
import Artist from './components/ArtistData';
import ArtistRegistration from './components/ArtistRegistration';
import ArtistProfile from './components/ArtistProfile';
import { ArtistList } from './components/ArtistDetails';
import Profile from './components/Profile';
import AdminDashboard from './admin/dashboard';
import Collections from './components/Collections';
import Exhibition from './components/Exhibition';
import { DeletedUsersList } from './components/DeletedUsers';
import { DeletedArtistList } from './components/DeletedArtistList';
import EditArtistDetails from './components/EditArtistDetails';
import EditUserDetails from './components/EditUserDetails';
import { MessageList } from './components/MessageList';
import AdminExhibition from './components/AdminExhibitions';
import AddExhibition from './components/AddExhibition';
import UpdateExhibition from './components/UpdateExhibition';
import ForgotPassword from './components/ForgotPassword';
import { AllArtist } from './components/AllArtists';
import ArtistUserProfile from './components/ArtistUserProfile';
import ReviewForm from './components/ReviewForm';
import BiddingCollections from './components/BiddingCollection';
import AuctionForm from './components/AuctionForm';
import Cart from './components/Cart';
import AddAddressForm from './components/AddAddressForm';
import { AllAddress } from './components/AllAddress';
import ErrorPage from './components/ErrorPage';


function App() {
  const [showCookieConsent, setShowCookieConsent] = useState(false);

  useEffect(() => {
    const hasConsentBeenGiven = localStorage.getItem('cookieConsentGiven');

    if (!hasConsentBeenGiven) {
      setShowCookieConsent(true);
    }
  }, []);

  const handleCookieConsentAccept = () => {
    setShowCookieConsent(false);
    localStorage.setItem('cookieConsentGiven', 'true');
  };


  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/log-in' element={<RedirectIfLoggedIn><Login /></RedirectIfLoggedIn>} />
        <Route path="/artist-register" element={<ArtistRegistration />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/contact-us' element={<ContactUs />} />
        <Route path='/admin-log-in' element={<AdminRedirectIfLoggedIn><AdminLogin /></AdminRedirectIfLoggedIn>} />
        
        <Route path='/admin-dashboard' element={<AdminPrivateRoute><AdminDashboard /></AdminPrivateRoute>} />
        <Route path='/user-details' element={<AdminPrivateRoute><UsersList /></AdminPrivateRoute>} />
        
        <Route path='/about-us' element={<AboutUs></AboutUs>} />

        <Route path='/artist-details' element={<Artist></Artist>} />

        <Route path='/edit-artist-details' element={<EditArtistDetails />} />

        <Route path='/edit-user-details' element={<EditUserDetails />} />

        <Route path='/user-profile' element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path='/artist-profile' element={<PrivateRoute><ArtistProfile /></PrivateRoute>} />
        
        <Route path='/exhibition' element={<PrivateRoute><Exhibition /></PrivateRoute>} />

        <Route path='/collections' element={<PrivateRoute><Collections /></PrivateRoute>} />

        <Route path='/artsphere-artist' element={<PrivateRoute><AllArtist></AllArtist></PrivateRoute>} />

        <Route path='/artist-user-profile' element={<PrivateRoute><ArtistUserProfile></ArtistUserProfile></PrivateRoute>} />
        
        <Route path='/artist-list' element={<AdminPrivateRoute><ArtistList /></AdminPrivateRoute>} />

        <Route path='/deleted-user-list' element={<AdminPrivateRoute><DeletedUsersList /></AdminPrivateRoute>} />

        <Route path='/deleted-artist-list' element={<AdminPrivateRoute><DeletedArtistList /> </AdminPrivateRoute>} />
         
        <Route path='/message-list' element={<AdminPrivateRoute><MessageList /> </AdminPrivateRoute>} />

        <Route path='/admin-exhibitions' element={<AdminPrivateRoute><AdminExhibition /> </AdminPrivateRoute>} />

        <Route path='/admin/add-exhibition' element={<AdminPrivateRoute><AddExhibition /> </AdminPrivateRoute>} />

        <Route path='/admin/update-exhibition/:id' element={<AdminPrivateRoute><UpdateExhibition /> </AdminPrivateRoute>} />

        <Route path='/forgot-password' element={<ForgotPassword></ForgotPassword>} />

        <Route path='/review-form' element={<PrivateRoute><ReviewForm></ReviewForm></PrivateRoute>} />

        <Route path='/bidding-collection' element={<PrivateRoute><BiddingCollections></BiddingCollections></PrivateRoute>} />

        <Route path='/auction-form' element={<AdminPrivateRoute><AuctionForm></AuctionForm></AdminPrivateRoute>} />

        <Route path='/add-to-cart' element={<Cart></Cart> } />

        <Route path='/add-address-form' element={<AddAddressForm></AddAddressForm>} />

        <Route path='/all-address' element={<AdminPrivateRoute><AllAddress></AllAddress></AdminPrivateRoute>} />

        <Route path='*' element={<ErrorPage></ErrorPage>} />

      </Routes>



      {showCookieConsent && (
        <CookieConsent
          debug={true}
          location='bottom'
          style={{ background: '#9E9E9E', color: '#000', textAlign: 'center' }}
          buttonStyle={{
            color: '#000',
            background: '#fff',
            fontSize: '14px',
            padding: '8px 16px',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
          onAccept={handleCookieConsentAccept}
        >
          <p style={{ fontSize: '18px' }}>
            This website uses cookies to enhance your experience. By continuing to use this site, you consent to our use of cookies.
            Cookies here are like sidekicks for your online adventures, helping your browser navigate the vast digital universe!
          </p>
        </CookieConsent>
      )}



      <Footer></Footer>
    </BrowserRouter>
  );
}

export default App;

import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import VerificationModal from './components/VerificationModal';

import Home from './pages/Home';
import Browse from './pages/Browse';
import ListingDetail from './pages/ListingDetail';
import ListRoom from './pages/ListRoom';
import About from './pages/About';
import Admin from './pages/Admin';

import { INITIAL_LISTINGS } from './data/mockListings';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [listings, setListings] = useState(INITIAL_LISTINGS);
  const [selectedListing, setSelectedListing] = useState(null);

  // Verification Modal State
  const [verificationModalOpen, setVerificationModalOpen] = useState(false);
  const [verificationModalTarget, setVerificationModalTarget] = useState(null);

  // Global Browse Filters State
  const [filterState, setFilterState] = useState({
    university: '',
    roomType: '',
    maxPrice: 500,
    verifiedOnly: false
  });

  // Handler: Open Verification Checklist Modal
  const handleOpenVerificationModal = (listing) => {
    setVerificationModalTarget(listing);
    setVerificationModalOpen(true);
  };

  // Handler: View Specific Listing
  const handleViewListing = (listing) => {
    setSelectedListing(listing);
    setActivePage('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handler: Toggle Verification Status (Admin)
  const handleToggleVerify = (id) => {
    setListings(prev => prev.map(item => {
      if (item.id === id) {
        const nextVerified = !item.isVerified;
        return {
          ...item,
          isVerified: nextVerified,
          verifiedDate: nextVerified ? new Date().toISOString().split('T')[0] : null
        };
      }
      return item;
    }));
  };

  // Handler: Toggle Filled Status (Admin)
  const handleToggleFill = (id) => {
    setListings(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, isFilled: !item.isFilled };
      }
      return item;
    }));
  };

  // Handler: Add New Listing (Landlord Form)
  const handleAddListing = (newListing) => {
    setListings(prev => [newListing, ...prev]);
  };

  // Handler: Delete Listing (Admin)
  const handleDeleteListing = (id) => {
    setListings(prev => prev.filter(item => item.id !== id));
  };

  const pendingCount = listings.filter(l => !l.isVerified && !l.isFilled).length;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header Navigation */}
      <Navbar 
        activePage={activePage} 
        setActivePage={(page) => {
          setActivePage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        pendingCount={pendingCount}
      />

      {/* Main View Router */}
      <main style={{ flexGrow: 1 }}>
        {activePage === 'home' && (
          <Home 
            listings={listings}
            onViewListing={handleViewListing}
            onOpenVerificationModal={handleOpenVerificationModal}
            setActivePage={setActivePage}
            setFilterState={setFilterState}
          />
        )}

        {activePage === 'browse' && (
          <Browse 
            listings={listings}
            onViewListing={handleViewListing}
            onOpenVerificationModal={handleOpenVerificationModal}
            filterState={filterState}
            setFilterState={setFilterState}
          />
        )}

        {activePage === 'detail' && selectedListing && (
          <ListingDetail 
            listing={selectedListing}
            onBack={() => setActivePage('browse')}
            onOpenVerificationModal={handleOpenVerificationModal}
          />
        )}

        {activePage === 'list-room' && (
          <ListRoom 
            onAddListing={handleAddListing}
            setActivePage={setActivePage}
          />
        )}

        {activePage === 'about' && (
          <About 
            onOpenVerificationModal={handleOpenVerificationModal}
            setActivePage={setActivePage}
          />
        )}

        {activePage === 'admin' && (
          <Admin 
            listings={listings}
            onToggleVerify={handleToggleVerify}
            onToggleFill={handleToggleFill}
            onDeleteListing={handleDeleteListing}
            onViewListing={handleViewListing}
            setActivePage={setActivePage}
          />
        )}
      </main>

      {/* Footer */}
      <Footer 
        setActivePage={(page) => {
          setActivePage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }} 
      />

      {/* Verification Checklist Modal Popup */}
      <VerificationModal 
        isOpen={verificationModalOpen}
        onClose={() => setVerificationModalOpen(false)}
        listingTitle={verificationModalTarget?.title}
        verifiedDate={verificationModalTarget?.verifiedDate}
      />
    </div>
  );
}

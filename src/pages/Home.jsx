import React, { useState } from 'react';
import { 
  Search, ShieldCheck, Footprints, ArrowRight, Building, PlusCircle, 
  CheckCircle, MessageSquare, Key, Shield, Droplet, UserCheck, Sparkles 
} from 'lucide-react';
import { UNIVERSITIES, ROOM_TYPES, VERIFICATION_CHECKLIST } from '../data/mockListings';
import ListingCard from '../components/ListingCard';

export default function Home({ 
  listings, 
  onViewListing, 
  onOpenVerificationModal, 
  setActivePage,
  setFilterState
}) {
  const [selectedUni, setSelectedUni] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [activeCategoryTab, setActiveCategoryTab] = useState('all');

  const handleHeroSearch = (e) => {
    e.preventDefault();
    setFilterState({
      university: selectedUni,
      roomType: selectedType,
      maxPrice: maxPrice ? Number(maxPrice) : 500,
      verifiedOnly: false
    });
    setActivePage('browse');
  };

  const filteredListings = listings.filter(item => {
    if (activeCategoryTab !== 'all' && item.roomType !== activeCategoryTab) return false;
    return true;
  });

  return (
    <div>
      {/* Hero Section */}
      <section style={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid var(--border-light)',
        paddingTop: '3.5rem',
        paddingBottom: '4rem',
        backgroundImage: 'radial-gradient(#f1f5f9 1.5px, transparent 1.5px)',
        backgroundSize: '24px 24px'
      }}>
        <div className="container" style={{ maxWidth: '960px', textAlign: 'center' }}>
          
          {/* Trust Pill */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            backgroundColor: 'var(--accent-emerald-light)',
            color: 'var(--accent-emerald)',
            border: '1px solid var(--accent-emerald-border)',
            padding: '0.35rem 0.85rem',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.85rem',
            fontWeight: '600',
            marginBottom: '1.25rem'
          }}>
            <ShieldCheck size={16} />
            <span>Zero Fake Listings • 100% Physically Verified on Site</span>
          </div>

          {/* Main Headline */}
          <h1 style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.2rem)',
            fontWeight: '800',
            letterSpacing: '-0.03em',
            lineHeight: 1.15,
            marginBottom: '1.25rem',
            color: 'var(--text-primary)'
          }}>
            Find Verified Vacant Rooms <br style={{ display: 'none' }} />
            <span style={{ color: 'var(--accent-emerald)' }}>Near Your Campus</span>
          </h1>

          <p style={{
            fontSize: '1.1rem',
            color: 'var(--text-secondary)',
            marginBottom: '2.5rem',
            maxWidth: '680px',
            margin: '0 auto 2.5rem auto',
            lineHeight: 1.6
          }}>
            Connect directly with verified room owners. Landlords list free and only pay when rooms are filled — no student scams, no middleman fees.
          </p>

          {/* Search Box Card */}
          <div className="card-flat" style={{
            padding: '1.25rem',
            boxShadow: 'var(--shadow-modal)',
            textAlign: 'left',
            maxWidth: '860px',
            margin: '0 auto'
          }}>
            <form onSubmit={handleHeroSearch} style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr)) 150px',
              gap: '1rem',
              alignItems: 'end'
            }} className="hero-search-grid">
              
              {/* University Field */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                  UNIVERSITY CAMPUS
                </label>
                <select
                  value={selectedUni}
                  onChange={(e) => setSelectedUni(e.target.value)}
                  style={inputSelectStyle}
                >
                  <option value="">All Campuses</option>
                  {UNIVERSITIES.map(u => (
                    <option key={u.id} value={u.id}>{u.name}</option>
                  ))}
                </select>
              </div>

              {/* Room Type Field */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                  ROOM TYPE
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  style={inputSelectStyle}
                >
                  <option value="">All Room Types</option>
                  {ROOM_TYPES.map(r => (
                    <option key={r.id} value={r.id}>{r.label}</option>
                  ))}
                </select>
              </div>

              {/* Max Rent Price */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                  MAX MONTHLY RENT
                </label>
                <select
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  style={inputSelectStyle}
                >
                  <option value="">Any Budget</option>
                  <option value="120">Under $120/mo</option>
                  <option value="160">Under $160/mo</option>
                  <option value="200">Under $200/mo</option>
                  <option value="300">Under $300/mo</option>
                </select>
              </div>

              {/* Search Button */}
              <div>
                <button type="submit" className="btn-primary" style={{ width: '100%', padding: '0.75rem 1rem' }}>
                  <Search size={18} />
                  Find Rooms
                </button>
              </div>
            </form>
          </div>

          {/* Quick Trust Badges */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '2rem',
            marginTop: '2.5rem',
            fontSize: '0.875rem',
            color: 'var(--text-secondary)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckCircle size={16} color="var(--accent-emerald)" />
              <strong>100% Physical Visit Verified</strong>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckCircle size={16} color="var(--accent-emerald)" />
              <strong>$0 Upfront Listing Fee</strong>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckCircle size={16} color="var(--accent-emerald)" />
              <strong>Direct WhatsApp Landlord Chat</strong>
            </div>
          </div>
        </div>
      </section>

      {/* Featured / Available Listings Section */}
      <section className="container" style={{ paddingTop: '3.5rem', paddingBottom: '3.5rem' }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <div>
            <h2 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
              Available Verified Vacancies
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Physically inspected rooms ready for immediate student move-in.
            </p>
          </div>

          {/* Filter Pills */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {[
              { id: 'all', label: 'All Rooms' },
              { id: 'bedsitter', label: 'Bedsitters' },
              { id: 'single', label: 'Single Rooms' },
              { id: 'shared', label: 'Shared' },
              { id: 'studio', label: 'Studios' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveCategoryTab(tab.id)}
                style={{
                  padding: '0.45rem 0.85rem',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--border-medium)',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  backgroundColor: activeCategoryTab === tab.id ? 'var(--text-primary)' : 'var(--bg-surface)',
                  color: activeCategoryTab === tab.id ? '#ffffff' : 'var(--text-secondary)',
                  transition: 'all 0.15s ease'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Listings Grid */}
        {filteredListings.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '3rem 1rem',
            backgroundColor: '#ffffff',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-light)'
          }}>
            <p style={{ color: 'var(--text-muted)' }}>No rooms found in this category right now.</p>
            <button onClick={() => setActiveCategoryTab('all')} className="btn-secondary" style={{ marginTop: '1rem' }}>
              Show All Rooms
            </button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.5rem'
          }}>
            {filteredListings.slice(0, 6).map(listing => (
              <ListingCard 
                key={listing.id}
                listing={listing}
                onViewDetails={onViewListing}
                onOpenVerificationModal={onOpenVerificationModal}
              />
            ))}
          </div>
        )}

        {/* View All Button */}
        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <button 
            onClick={() => setActivePage('browse')} 
            className="btn-secondary"
            style={{ padding: '0.75rem 2rem', fontSize: '1rem' }}
          >
            Explore All Campus Listings <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* 3-Step How It Works Section */}
      <section style={{
        backgroundColor: '#ffffff',
        borderTop: '1px solid var(--border-light)',
        borderBottom: '1px solid var(--border-light)',
        paddingTop: '4rem',
        paddingBottom: '4rem'
      }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
            <span style={{
              fontSize: '0.8rem',
              fontWeight: '700',
              color: 'var(--accent-emerald)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase'
            }}>
              Simple & Safe Process
            </span>
            <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginTop: '0.4rem', marginBottom: '0.75rem' }}>
              How CampusStay Works in 3 Steps
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              No middleman commission for students, no upfront advertising fees for landlords.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem'
          }}>
            {/* Step 1 */}
            <div className="card-flat" style={{ padding: '2rem', textAlign: 'center' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent-emerald-light)',
                color: 'var(--accent-emerald)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem auto',
                fontWeight: '800',
                fontSize: '1.25rem'
              }}>
                1
              </div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                Search Verified Rooms
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                Filter by your university campus gate, walking distance, price, and room type. Every "Verified" room was physically inspected on site.
              </p>
            </div>

            {/* Step 2 */}
            <div className="card-flat" style={{ padding: '2rem', textAlign: 'center' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent-emerald-light)',
                color: 'var(--accent-emerald)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem auto',
                fontWeight: '800',
                fontSize: '1.25rem'
              }}>
                2
              </div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                Chat via WhatsApp
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                Click one button to message the landlord directly on WhatsApp to ask questions and schedule your in-person room viewing.
              </p>
            </div>

            {/* Step 3 */}
            <div className="card-flat" style={{ padding: '2rem', textAlign: 'center' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent-emerald-light)',
                color: 'var(--accent-emerald)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem auto',
                fontWeight: '800',
                fontSize: '1.25rem'
              }}>
                3
              </div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                Inspect & Move In
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                Visit the property, verify the key in person, sign the written agreement, and move in safely with zero advance online risk.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Landlord Call to Action Banner */}
      <section className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
        <div style={{
          backgroundColor: '#0f172a',
          color: '#ffffff',
          borderRadius: 'var(--radius-lg)',
          padding: '3rem 2rem',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) auto',
          gap: '2rem',
          alignItems: 'center'
        }} className="landlord-banner-grid">
          <div>
            <span style={{
              backgroundColor: 'rgba(5, 150, 105, 0.2)',
              color: '#34d399',
              border: '1px solid #059669',
              padding: '0.3rem 0.75rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.8rem',
              fontWeight: '700'
            }}>
              FOR PROPERTY OWNERS & LANDLORDS
            </span>
            <h2 style={{ fontSize: '2rem', color: '#ffffff', marginTop: '0.75rem', marginBottom: '0.75rem' }}>
              Have a Vacant Student Room? List Free.
            </h2>
            <p style={{ color: '#cbd5e1', fontSize: '1rem', maxWidth: '580px', lineHeight: '1.6', margin: 0 }}>
              Stop wasting money on upfront Facebook ads. We take real photos, verify your listing, and connect you with qualified student tenants. <strong>You only pay a small commission once your room is successfully filled.</strong>
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <button
              onClick={() => setActivePage('list-room')}
              className="btn-primary"
              style={{ padding: '0.85rem 1.75rem', fontSize: '1rem' }}
            >
              <PlusCircle size={20} />
              List Vacant Room Free
            </button>
            <button
              onClick={() => setActivePage('about')}
              style={{
                background: 'none',
                border: 'none',
                color: '#94a3b8',
                fontSize: '0.85rem',
                cursor: 'pointer',
                textAlign: 'center',
                textDecoration: 'underline'
              }}
            >
              How commission model works →
            </button>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .hero-search-grid {
            grid-template-columns: 1fr !important;
          }
          .landlord-banner-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
}

const inputSelectStyle = {
  width: '100%',
  padding: '0.65rem 0.75rem',
  borderRadius: 'var(--radius-md)',
  border: '1px solid var(--border-medium)',
  backgroundColor: 'var(--bg-surface)',
  color: 'var(--text-primary)',
  fontSize: '0.9rem',
  outline: 'none'
};

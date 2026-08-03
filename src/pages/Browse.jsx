import React, { useState, useMemo } from 'react';
import { Search, Filter, SlidersHorizontal, ShieldCheck, X, Grid, List, Footprints } from 'lucide-react';
import { UNIVERSITIES, ROOM_TYPES } from '../data/mockListings';
import ListingCard from '../components/ListingCard';

export default function Browse({ 
  listings, 
  onViewListing, 
  onOpenVerificationModal,
  filterState,
  setFilterState 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('distance'); // 'distance', 'price-low', 'price-high'
  const [viewMode, setViewMode] = useState('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter application
  const filteredListings = useMemo(() => {
    return listings.filter(item => {
      // University Filter
      if (filterState.university && item.universityId !== filterState.university) {
        return false;
      }
      // Room Type Filter
      if (filterState.roomType && item.roomType !== filterState.roomType) {
        return false;
      }
      // Max Price Filter
      if (filterState.maxPrice && item.priceMonthly > filterState.maxPrice) {
        return false;
      }
      // Verified Only Filter
      if (filterState.verifiedOnly && !item.isVerified) {
        return false;
      }
      // Search Term Query
      if (searchTerm) {
        const query = searchTerm.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesUni = item.universityName.toLowerCase().includes(query);
        const matchesAddr = item.locationAddress.toLowerCase().includes(query);
        if (!matchesTitle && !matchesUni && !matchesAddr) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'distance') return a.distanceKm - b.distanceKm;
      if (sortBy === 'price-low') return a.priceMonthly - b.priceMonthly;
      if (sortBy === 'price-high') return b.priceMonthly - a.priceMonthly;
      return 0;
    });
  }, [listings, filterState, searchTerm, sortBy]);

  const handleResetFilters = () => {
    setFilterState({
      university: '',
      roomType: '',
      maxPrice: 500,
      verifiedOnly: false
    });
    setSearchTerm('');
  };

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
      
      {/* Top Header & Search Bar */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
          Browse Vacant Student Housing
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Filter through verified rooms near major university campuses.
        </p>

        {/* Global Search Box */}
        <div style={{
          marginTop: '1.25rem',
          display: 'flex',
          gap: '0.75rem',
          maxWidth: '640px'
        }}>
          <div style={{ position: 'relative', flexGrow: 1 }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search by keyword, street name, or campus..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem 0.75rem 2.75rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-medium)',
                fontSize: '0.95rem',
                outline: 'none',
                backgroundColor: 'var(--bg-surface)'
              }}
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
              >
                <X size={16} />
              </button>
            )}
          </div>

          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="btn-secondary mobile-filter-btn"
            style={{ display: 'none', padding: '0.75rem 1rem' }}
          >
            <SlidersHorizontal size={18} /> Filters
          </button>
        </div>
      </div>

      {/* Main Browse Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '260px minmax(0, 1fr)',
        gap: '2rem',
        alignItems: 'start'
      }} className="browse-layout-grid">
        
        {/* Left Desktop Sidebar Filter */}
        <aside className={`filter-sidebar ${mobileFilterOpen ? 'mobile-open' : ''}`} style={{
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-light)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.25rem',
          position: 'sticky',
          top: '90px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>
            <h3 style={{ fontSize: '1.05rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
              <Filter size={18} /> Filter Rooms
            </h3>
            <button 
              onClick={handleResetFilters}
              style={{ background: 'none', border: 'none', color: 'var(--accent-emerald-hover)', fontSize: '0.8rem', fontWeight: '600', cursor: 'pointer' }}
            >
              Reset
            </button>
          </div>

          {/* Filter 1: University */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
              UNIVERSITY CAMPUS
            </label>
            <select
              value={filterState.university}
              onChange={(e) => setFilterState({ ...filterState, university: e.target.value })}
              style={sidebarSelectStyle}
            >
              <option value="">All Campuses</option>
              {UNIVERSITIES.map(u => (
                <option key={u.id} value={u.id}>{u.name}</option>
              ))}
            </select>
          </div>

          {/* Filter 2: Room Type */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
              ROOM TYPE
            </label>
            <select
              value={filterState.roomType}
              onChange={(e) => setFilterState({ ...filterState, roomType: e.target.value })}
              style={sidebarSelectStyle}
            >
              <option value="">All Room Types</option>
              {ROOM_TYPES.map(r => (
                <option key={r.id} value={r.id}>{r.label}</option>
              ))}
            </select>
          </div>

          {/* Filter 3: Max Rent Price */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.825rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
              <span>MAX MONTHLY RENT</span>
              <span style={{ color: 'var(--accent-emerald)', fontWeight: '800' }}>${filterState.maxPrice}/mo</span>
            </div>
            <input
              type="range"
              min="80"
              max="400"
              step="10"
              value={filterState.maxPrice}
              onChange={(e) => setFilterState({ ...filterState, maxPrice: Number(e.target.value) })}
              style={{ width: '100%', accentColor: 'var(--accent-emerald)', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              <span>$80</span>
              <span>$400</span>
            </div>
          </div>

          {/* Filter 4: Verified Only Toggle */}
          <div style={{
            backgroundColor: 'var(--accent-emerald-light)',
            padding: '0.85rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--accent-emerald-border)'
          }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', cursor: 'pointer', fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-primary)' }}>
              <input
                type="checkbox"
                checked={filterState.verifiedOnly}
                onChange={(e) => setFilterState({ ...filterState, verifiedOnly: e.target.checked })}
                style={{ accentColor: 'var(--accent-emerald)', width: '16px', height: '16px' }}
              />
              <ShieldCheck size={18} color="var(--accent-emerald)" />
              Verified Only
            </label>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.35rem', margin: 0, paddingLeft: '1.75rem' }}>
              Hide unverified submissions
            </p>
          </div>
        </aside>

        {/* Right Content Column */}
        <div>
          {/* Results Bar */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            marginBottom: '1.25rem',
            backgroundColor: 'var(--bg-surface)',
            padding: '0.75rem 1rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-light)'
          }}>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              Showing <strong>{filteredListings.length}</strong> available room{filteredListings.length !== 1 ? 's' : ''}
            </div>

            {/* Sort Dropdown */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  padding: '0.35rem 0.65rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-medium)',
                  fontSize: '0.85rem',
                  backgroundColor: 'var(--bg-surface)'
                }}
              >
                <option value="distance">Nearest to Campus</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Listing Cards Grid */}
          {filteredListings.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '4rem 1.5rem',
              backgroundColor: 'var(--bg-surface)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-light)'
            }}>
              <Search size={48} color="var(--text-muted)" style={{ margin: '0 auto 1rem auto' }} />
              <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                No rooms match your filter criteria
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '420px', margin: '0 auto 1.5rem auto' }}>
                Try adjusting your price range, clearing the campus filter, or unchecking "Verified Only".
              </p>
              <button onClick={handleResetFilters} className="btn-primary">
                Clear All Filters
              </button>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
              gap: '1.5rem'
            }}>
              {filteredListings.map(listing => (
                <ListingCard 
                  key={listing.id}
                  listing={listing}
                  onViewDetails={onViewListing}
                  onOpenVerificationModal={onOpenVerificationModal}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .browse-layout-grid {
            grid-template-columns: 1fr !important;
          }
          .mobile-filter-btn {
            display: inline-flex !important;
          }
          .filter-sidebar {
            display: none;
          }
          .filter-sidebar.mobile-open {
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
}

const sidebarSelectStyle = {
  width: '100%',
  padding: '0.55rem 0.65rem',
  borderRadius: 'var(--radius-md)',
  border: '1px solid var(--border-medium)',
  backgroundColor: 'var(--bg-surface)',
  color: 'var(--text-primary)',
  fontSize: '0.875rem'
};

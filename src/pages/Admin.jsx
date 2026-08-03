import React, { useState } from 'react';
import { 
  ShieldCheck, AlertCircle, CheckCircle2, Trash2, Plus, 
  Eye, Check, X, Phone, MessageSquare, Building, Filter 
} from 'lucide-react';
import VerificationBadge from '../components/VerificationBadge';

export default function Admin({ 
  listings, 
  onToggleVerify, 
  onToggleFill, 
  onDeleteListing,
  onViewListing,
  setActivePage
}) {
  const [adminTab, setAdminTab] = useState('all'); // 'all', 'pending', 'verified', 'filled'

  const totalCount = listings.length;
  const pendingCount = listings.filter(l => !l.isVerified && !l.isFilled).length;
  const verifiedCount = listings.filter(l => l.isVerified && !l.isFilled).length;
  const filledCount = listings.filter(l => l.isFilled).length;

  const displayedListings = listings.filter(l => {
    if (adminTab === 'pending') return !l.isVerified && !l.isFilled;
    if (adminTab === 'verified') return l.isVerified && !l.isFilled;
    if (adminTab === 'filled') return l.isFilled;
    return true;
  });

  return (
    <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '5rem' }}>
      
      {/* Admin Header */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <div>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            backgroundColor: 'var(--accent-indigo-light)',
            color: 'var(--accent-indigo)',
            padding: '0.25rem 0.65rem',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.775rem',
            fontWeight: '700',
            marginBottom: '0.4rem'
          }}>
            SOLO FOUNDER DASHBOARD
          </div>
          <h1 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', margin: 0 }}>
            Listing Verification & Lead Management
          </h1>
        </div>

        <button onClick={() => setActivePage('list-room')} className="btn-primary" style={{ padding: '0.6rem 1rem', fontSize: '0.875rem' }}>
          <Plus size={16} /> Add Listing Manually
        </button>
      </div>

      {/* Stats Cards Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.25rem',
        marginBottom: '2.5rem'
      }}>
        <StatCard label="Total Submissions" count={totalCount} color="var(--text-primary)" bg="var(--bg-surface)" />
        <StatCard 
          label="Pending Verification" 
          count={pendingCount} 
          color="#d97706" 
          bg="#fffbeb" 
          border="#fef3c7"
          subtitle="Requires field inspection visit"
        />
        <StatCard label="Live Verified Rooms" count={verifiedCount} color="var(--accent-emerald)" bg="var(--accent-emerald-light)" />
        <StatCard label="Filled Rooms (Commission)" count={filledCount} color="#64748b" bg="#f1f5f9" />
      </div>

      {/* Tab Filter & Table Box */}
      <div className="card-flat" style={{ padding: '1.5rem' }}>
        
        {/* Sub-tabs */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          borderBottom: '1px solid var(--border-light)',
          paddingBottom: '1rem',
          marginBottom: '1.5rem',
          flexWrap: 'wrap'
        }}>
          {[
            { id: 'all', label: `All Listings (${totalCount})` },
            { id: 'pending', label: `Pending Visit (${pendingCount})` },
            { id: 'verified', label: `Verified Live (${verifiedCount})` },
            { id: 'filled', label: `Filled Rooms (${filledCount})` },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setAdminTab(tab.id)}
              style={{
                padding: '0.45rem 0.85rem',
                borderRadius: 'var(--radius-md)',
                border: adminTab === tab.id ? '1px solid var(--text-primary)' : '1px solid var(--border-light)',
                backgroundColor: adminTab === tab.id ? 'var(--text-primary)' : 'var(--bg-surface)',
                color: adminTab === tab.id ? '#ffffff' : 'var(--text-secondary)',
                fontSize: '0.85rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Listings Admin Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-light)', textAlign: 'left', color: 'var(--text-muted)' }}>
                <th style={thStyle}>Listing & Campus</th>
                <th style={thStyle}>Rent / Type</th>
                <th style={thStyle}>Landlord Contact</th>
                <th style={thStyle}>Status</th>
                <th style={{ ...thStyle, textAlign: 'right' }}>Admin Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedListings.map(listing => (
                <tr key={listing.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                  
                  {/* Title & Campus */}
                  <td style={tdStyle}>
                    <div style={{ fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
                      {listing.title}
                    </div>
                    <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
                      📍 {listing.universityName} ({listing.distanceKm} km)
                    </div>
                  </td>

                  {/* Rent & Type */}
                  <td style={tdStyle}>
                    <div style={{ fontWeight: '700', color: 'var(--text-primary)' }}>
                      ${listing.priceMonthly}/mo
                    </div>
                    <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
                      {listing.roomTypeLabel}
                    </div>
                  </td>

                  {/* Landlord Info */}
                  <td style={tdStyle}>
                    <div style={{ fontWeight: '600', color: 'var(--text-primary)' }}>
                      {listing.landlord?.name || 'Owner'}
                    </div>
                    <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
                      📱 {listing.landlord?.phone || '+123456789'}
                    </div>
                  </td>

                  {/* Status Badge */}
                  <td style={tdStyle}>
                    <VerificationBadge isVerified={listing.isVerified} isFilled={listing.isFilled} size="sm" />
                  </td>

                  {/* Admin Actions */}
                  <td style={{ ...tdStyle, textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'flex-end' }}>
                      
                      {/* View Listing */}
                      <button
                        onClick={() => onViewListing(listing)}
                        style={iconBtnStyle}
                        title="View Public Detail Page"
                      >
                        <Eye size={15} />
                      </button>

                      {/* Toggle Verified */}
                      <button
                        onClick={() => onToggleVerify(listing.id)}
                        style={{
                          ...iconBtnStyle,
                          backgroundColor: listing.isVerified ? '#dcfce7' : '#fef3c7',
                          color: listing.isVerified ? '#15803d' : '#b45309',
                          borderColor: listing.isVerified ? '#86efac' : '#fde68a'
                        }}
                        title={listing.isVerified ? "Mark as Unverified" : "Mark as Verified (Inspection Done)"}
                      >
                        <ShieldCheck size={15} />
                        {listing.isVerified ? 'Verified' : 'Verify'}
                      </button>

                      {/* Toggle Filled */}
                      <button
                        onClick={() => onToggleFill(listing.id)}
                        style={{
                          ...iconBtnStyle,
                          backgroundColor: listing.isFilled ? '#e2e8f0' : '#f1f5f9',
                          color: listing.isFilled ? '#475569' : '#0f172a'
                        }}
                        title={listing.isFilled ? "Re-open Room as Available" : "Mark Room as Filled"}
                      >
                        <CheckCircle2 size={15} />
                        {listing.isFilled ? 'Filled' : 'Mark Filled'}
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => onDeleteListing(listing.id)}
                        style={{ ...iconBtnStyle, color: '#dc2626', backgroundColor: '#fee2e2' }}
                        title="Delete Listing"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, count, color, bg, border, subtitle }) {
  return (
    <div className="card-flat" style={{ padding: '1.25rem', backgroundColor: bg, borderColor: border || 'var(--border-light)' }}>
      <div style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
        {label}
      </div>
      <div style={{ fontSize: '2rem', fontWeight: '800', color: color, lineHeight: 1.1 }}>
        {count}
      </div>
      {subtitle && (
        <div style={{ fontSize: '0.725rem', color: color, marginTop: '0.25rem', fontWeight: '500' }}>
          {subtitle}
        </div>
      )}
    </div>
  );
}

const thStyle = {
  padding: '0.75rem 0.5rem',
  fontWeight: '700',
  fontSize: '0.8rem'
};

const tdStyle = {
  padding: '0.85rem 0.5rem',
  verticalAlign: 'middle'
};

const iconBtnStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.25rem',
  padding: '0.35rem 0.6rem',
  borderRadius: 'var(--radius-sm)',
  border: '1px solid var(--border-medium)',
  backgroundColor: 'var(--bg-surface)',
  color: 'var(--text-secondary)',
  fontSize: '0.75rem',
  fontWeight: '600',
  cursor: 'pointer'
};

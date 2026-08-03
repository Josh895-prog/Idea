import React from 'react';
import { MapPin, Footprints, Wifi, Droplet, Shield, Zap, MessageSquare } from 'lucide-react';
import VerificationBadge from './VerificationBadge';

export default function ListingCard({ listing, onViewDetails, onOpenVerificationModal }) {
  const {
    title,
    universityName,
    distanceKm,
    walkTimeMinutes,
    roomTypeLabel,
    priceMonthly,
    isVerified,
    isFilled,
    photos,
    amenities
  } = listing;

  const mainPhoto = photos?.[0] || "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80";

  return (
    <div className="card-flat" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Image Header with Overlay Badge */}
      <div style={{ position: 'relative', width: '100%', height: '200px', backgroundColor: '#e2e8f0' }}>
        <img 
          src={mainPhoto} 
          alt={title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          loading="lazy"
        />

        <div style={{
          position: 'absolute',
          top: '0.75rem',
          left: '0.75rem',
          zIndex: 2
        }}>
          <VerificationBadge 
            isVerified={isVerified} 
            isFilled={isFilled}
            onClick={(e) => {
              e.stopPropagation();
              onOpenVerificationModal(listing);
            }} 
          />
        </div>

        <div style={{
          position: 'absolute',
          bottom: '0.75rem',
          right: '0.75rem',
          backgroundColor: 'rgba(15, 23, 42, 0.85)',
          color: '#ffffff',
          padding: '0.35rem 0.75rem',
          borderRadius: 'var(--radius-sm)',
          fontWeight: '700',
          fontSize: '1.05rem',
          backdropFilter: 'blur(4px)'
        }}>
          ${priceMonthly} <span style={{ fontSize: '0.75rem', fontWeight: '400', opacity: 0.85 }}>/ mo</span>
        </div>

        <div style={{
          position: 'absolute',
          top: '0.75rem',
          right: '0.75rem',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          color: 'var(--text-primary)',
          padding: '0.2rem 0.55rem',
          borderRadius: 'var(--radius-sm)',
          fontSize: '0.75rem',
          fontWeight: '600',
          border: '1px solid var(--border-light)'
        }}>
          {roomTypeLabel}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        {/* Distance and Location */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          fontSize: '0.8rem',
          color: 'var(--accent-emerald-hover)',
          fontWeight: '600',
          marginBottom: '0.4rem'
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <Footprints size={14} />
            {walkTimeMinutes} min walk ({distanceKm} km)
          </span>
          <span>•</span>
          <span style={{ color: 'var(--text-muted)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
            {universityName}
          </span>
        </div>

        {/* Title */}
        <h3 style={{
          fontSize: '1.05rem',
          lineHeight: '1.35',
          marginBottom: '0.75rem',
          color: 'var(--text-primary)',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {title}
        </h3>

        {/* Quick Amenities Pill List */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.4rem',
          marginBottom: '1.25rem',
          marginTop: 'auto'
        }}>
          {amenities.wifi && (
            <span style={amenityStyle}>
              <Wifi size={12} /> WiFi
            </span>
          )}
          {amenities.water && (
            <span style={amenityStyle}>
              <Droplet size={12} /> 24/7 Water
            </span>
          )}
          {amenities.security && (
            <span style={amenityStyle}>
              <Shield size={12} /> Gated Security
            </span>
          )}
          {amenities.power && (
            <span style={amenityStyle}>
              <Zap size={12} /> Power Backup
            </span>
          )}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '0.5rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-light)' }}>
          <button 
            type="button" 
            onClick={() => onViewDetails(listing)} 
            className="btn-secondary" 
            style={{ flex: 1, padding: '0.6rem 0.8rem', fontSize: '0.875rem' }}
          >
            View Details
          </button>
          
          <a
            href={`https://wa.me/${listing.landlord?.whatsappNumber || '12345678901'}?text=${encodeURIComponent(`Hi, I saw your room listing "${title}" on CampusStay ($${priceMonthly}/mo). Is it still available for viewing?`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp"
            style={{ padding: '0.6rem 0.85rem', width: 'auto', fontSize: '0.875rem' }}
            title="Chat directly with Landlord via WhatsApp"
          >
            <MessageSquare size={16} />
            Chat
          </a>
        </div>
      </div>
    </div>
  );
}

const amenityStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.25rem',
  backgroundColor: 'var(--bg-subtle)',
  color: 'var(--text-secondary)',
  padding: '0.2rem 0.5rem',
  borderRadius: '4px',
  fontSize: '0.75rem',
  fontWeight: '500'
};

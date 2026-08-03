import React, { useState } from 'react';
import { 
  ArrowLeft, MapPin, Footprints, ShieldCheck, Wifi, Droplet, 
  Shield, Zap, Utensils, Bath, CheckCircle2, MessageSquare, Phone, 
  AlertTriangle, Calendar, User, Share2, Award
} from 'lucide-react';
import VerificationBadge from '../components/VerificationBadge';

export default function ListingDetail({ listing, onBack, onOpenVerificationModal }) {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [reportSent, setReportSent] = useState(false);

  if (!listing) return null;

  const {
    title,
    universityName,
    distanceKm,
    walkTimeMinutes,
    roomTypeLabel,
    priceMonthly,
    deposit,
    isVerified,
    isFilled,
    verifiedDate,
    locationAddress,
    photos,
    amenities,
    landlord,
    description,
    verificationNotes
  } = listing;

  const whatsappMsg = encodeURIComponent(
    `Hi ${landlord?.name || 'Landlord'}, I am interested in viewing your verified room "${title}" ($${priceMonthly}/mo) near ${universityName}. Is it available for an in-person tour?`
  );

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
      {/* Back button */}
      <button 
        onClick={onBack}
        className="btn-secondary"
        style={{ marginBottom: '1.5rem', padding: '0.5rem 1rem', fontSize: '0.875rem' }}
      >
        <ArrowLeft size={16} /> Back to Search Results
      </button>

      {/* Main Grid: Left Details & Right Contact Sticky Box */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) 360px',
        gap: '2rem',
        alignItems: 'start'
      }} className="detail-layout-grid">
        
        {/* Left Main Content */}
        <div>
          {/* Title and Top Header Info */}
          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <VerificationBadge 
                isVerified={isVerified} 
                isFilled={isFilled} 
                onClick={() => onOpenVerificationModal(listing)}
              />
              <span style={{
                backgroundColor: 'var(--bg-subtle)',
                color: 'var(--text-secondary)',
                padding: '0.2rem 0.6rem',
                borderRadius: '4px',
                fontSize: '0.8rem',
                fontWeight: '600'
              }}>
                {roomTypeLabel}
              </span>
            </div>

            <h1 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              {title}
            </h1>

            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', color: 'var(--accent-emerald-hover)', fontWeight: '600' }}>
                <Footprints size={16} />
                {walkTimeMinutes} min walk ({distanceKm} km) to {universityName}
              </span>
              <span>•</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                <MapPin size={16} />
                {locationAddress}
              </span>
            </div>
          </div>

          {/* Photo Gallery Carousel */}
          <div style={{ marginBottom: '2rem' }}>
            <div style={{
              width: '100%',
              height: '420px',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              backgroundColor: '#e2e8f0',
              marginBottom: '0.75rem',
              position: 'relative'
            }}>
              <img 
                src={photos?.[selectedPhotoIndex] || photos?.[0]} 
                alt={title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />

              {isVerified && (
                <div style={{
                  position: 'absolute',
                  bottom: '1rem',
                  left: '1rem',
                  backgroundColor: 'rgba(5, 150, 105, 0.95)',
                  color: '#ffffff',
                  padding: '0.5rem 0.9rem',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  boxShadow: 'var(--shadow-card)'
                }}>
                  <ShieldCheck size={18} />
                  Physically Photographed by CampusStay Team
                </div>
              )}
            </div>

            {/* Thumbnail Row */}
            {photos && photos.length > 1 && (
              <div style={{ display: 'flex', gap: '0.75rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                {photos.map((photoUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedPhotoIndex(idx)}
                    style={{
                      width: '100px',
                      height: '70px',
                      borderRadius: 'var(--radius-md)',
                      overflow: 'hidden',
                      border: selectedPhotoIndex === idx ? '3px solid var(--accent-emerald)' : '2px solid transparent',
                      padding: 0,
                      cursor: 'pointer',
                      flexShrink: 0
                    }}
                  >
                    <img src={photoUrl} alt={`Thumbnail ${idx+1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Verification Protocol Spotlight Banner */}
          {isVerified ? (
            <div style={{
              backgroundColor: 'var(--accent-emerald-light)',
              border: '1px solid var(--accent-emerald-border)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.25rem',
              marginBottom: '2rem',
              display: 'flex',
              gap: '1rem',
              alignItems: 'flex-start'
            }}>
              <div style={{
                backgroundColor: 'var(--accent-emerald)',
                color: '#fff',
                padding: '0.6rem',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <ShieldCheck size={26} />
              </div>
              <div style={{ flexGrow: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <h3 style={{ fontSize: '1.05rem', color: 'var(--text-primary)', margin: 0 }}>
                    CampusStay Physical Verification Completed
                  </h3>
                  <button 
                    onClick={() => onOpenVerificationModal(listing)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--accent-emerald-hover)',
                      fontWeight: '700',
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      textDecoration: 'underline'
                    }}
                  >
                    View 6-Point Checklist
                  </button>
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.35rem', marginBottom: 0 }}>
                  {verificationNotes || `Inspected on ${verifiedDate || 'Recently'}. Water flow tested, gated locks checked, landlord identity verified.`}
                </p>
              </div>
            </div>
          ) : (
            <div style={{
              backgroundColor: 'var(--status-pending-bg)',
              border: '1px solid #fde68a',
              borderRadius: 'var(--radius-lg)',
              padding: '1.25rem',
              marginBottom: '2rem'
            }}>
              <h3 style={{ fontSize: '1rem', color: '#b45309', margin: 0 }}>
                ⚠️ Pending Physical Inspection
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#92400e', marginTop: '0.25rem', margin: 0 }}>
                This room was recently submitted by the landlord. Our field team is scheduled to visit soon. Please do not send any advance money before viewing!
              </p>
            </div>
          )}

          {/* Description Section */}
          <div className="card-flat" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
              About this Housing
            </h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6', whiteSpace: 'pre-line' }}>
              {description}
            </p>
          </div>

          {/* Verified Amenities Checklist */}
          <div className="card-flat" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '1.25rem', color: 'var(--text-primary)' }}>
              Amenities & Utilities Checklist
            </h3>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: '1.25rem'
            }}>
              <AmenityDetailItem icon={Wifi} label="Internet / WiFi" value={amenities?.wifi || "Not specified"} />
              <AmenityDetailItem icon={Droplet} label="Water Supply" value={amenities?.water || "Borehole / City"} />
              <AmenityDetailItem icon={Shield} label="Security" value={amenities?.security || "Gated compound"} />
              <AmenityDetailItem icon={Zap} label="Power System" value={amenities?.power || "Prepaid meter"} />
              <AmenityDetailItem icon={Utensils} label="Kitchen Setup" value={amenities?.kitchen || "Standard area"} />
              <AmenityDetailItem icon={Bath} label="Bathroom Setup" value={amenities?.bathroom || "Standard bath"} />
              <AmenityDetailItem icon={CheckCircle2} label="Furnishing" value={amenities?.furnishing || "Unfurnished"} />
            </div>
          </div>

          {/* Location / Campus Proximity Map Placeholder */}
          <div className="card-flat" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              Location & Campus Proximity
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Located in <strong>{locationAddress}</strong> — Approximately <strong>{walkTimeMinutes} minutes walk ({distanceKm} km)</strong> from {universityName}.
            </p>

            {/* Map Placeholder Graphic */}
            <div style={{
              width: '100%',
              height: '220px',
              backgroundColor: '#e2e8f0',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundImage: 'radial-gradient(#cbd5e1 1.5px, transparent 1.5px)',
              backgroundSize: '20px 20px',
              border: '1px solid var(--border-medium)',
              position: 'relative'
            }}>
              <div style={{
                backgroundColor: 'var(--accent-emerald)',
                color: '#fff',
                padding: '0.6rem 1rem',
                borderRadius: 'var(--radius-full)',
                fontWeight: '700',
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                boxShadow: 'var(--shadow-card)'
              }}>
                <MapPin size={18} />
                {roomTypeLabel} Pin ({distanceKm} km to Gate)
              </div>

              <div style={{
                marginTop: '1rem',
                backgroundColor: 'rgba(255,255,255,0.9)',
                padding: '0.4rem 0.8rem',
                borderRadius: '6px',
                fontSize: '0.75rem',
                color: 'var(--text-secondary)'
              }}>
                📍 Exact building pin shared by Landlord upon WhatsApp contact
              </div>
            </div>
          </div>

          {/* Report or Flag button */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <span>Listing ID: {listing.id}</span>
            <button 
              type="button"
              onClick={() => setReportSent(true)}
              style={{ background: 'none', border: 'none', color: '#dc2626', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
            >
              <AlertTriangle size={14} />
              {reportSent ? "Report submitted to Admin" : "Report inaccurate price or info"}
            </button>
          </div>
        </div>

        {/* Right Column: Sticky Rent & Landlord WhatsApp Box */}
        <div style={{ position: 'sticky', top: '90px' }}>
          <div className="card-flat" style={{ padding: '1.5rem', boxShadow: 'var(--shadow-card)' }}>
            {/* Rent Header */}
            <div style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '1.25rem', marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Monthly Rent</div>
              <div style={{ fontSize: '2.25rem', fontWeight: '800', color: 'var(--text-primary)', lineHeight: 1.1 }}>
                ${priceMonthly} <span style={{ fontSize: '1rem', fontWeight: '500', color: 'var(--text-muted)' }}>/ month</span>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <div><strong>Deposit:</strong> ${deposit || priceMonthly}</div>
                <div><strong>Term:</strong> Month-to-Month</div>
              </div>
            </div>

            {/* Landlord Profile */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '1.25rem',
              backgroundColor: 'var(--bg-subtle)',
              padding: '0.75rem',
              borderRadius: 'var(--radius-md)'
            }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: '#cbd5e1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-primary)',
                fontWeight: '700'
              }}>
                <User size={20} />
              </div>
              <div>
                <div style={{ fontWeight: '700', fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                  {landlord?.name || "Verified Landlord"}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--accent-emerald-hover)', fontWeight: '600' }}>
                  ✓ {landlord?.trustScore || "Identity Verified"}
                </div>
              </div>
            </div>

            {/* WhatsApp Direct CTA */}
            <a
              href={`https://wa.me/${landlord?.whatsappNumber || '12345678901'}?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
              style={{ marginBottom: '0.75rem' }}
            >
              <MessageSquare size={20} />
              Contact Landlord via WhatsApp
            </a>

            {/* Direct Call Button */}
            <a
              href={`tel:${landlord?.phone || '+12345678901'}`}
              className="btn-secondary"
              style={{ width: '100%', marginBottom: '1.25rem' }}
            >
              <Phone size={16} />
              Call Landlord Directly
            </a>

            {/* No Payment Platform Notice */}
            <div style={{
              backgroundColor: '#f8fafc',
              border: '1px dashed var(--border-medium)',
              borderRadius: 'var(--radius-md)',
              padding: '0.85rem',
              fontSize: '0.775rem',
              color: 'var(--text-muted)',
              lineHeight: 1.45
            }}>
              🔒 <strong>Zero Platform Fee for Students:</strong> Contacting landlords is 100% free. No online payments are handled on this site. You only pay rent directly to the landlord after visiting in person.
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .detail-layout-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

function AmenityDetailItem({ icon: Icon, label, value }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
      <div style={{
        backgroundColor: 'var(--accent-emerald-light)',
        color: 'var(--accent-emerald)',
        padding: '0.4rem',
        borderRadius: '6px',
        display: 'flex',
        flexShrink: 0
      }}>
        <Icon size={16} />
      </div>
      <div>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '500' }}>{label}</div>
        <div style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-primary)' }}>{value}</div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { 
  Building, CheckCircle2, ShieldCheck, UploadCloud, DollarSign, 
  MapPin, Phone, MessageSquare, Info, Sparkles, ArrowRight 
} from 'lucide-react';
import { UNIVERSITIES, ROOM_TYPES } from '../data/mockListings';

export default function ListRoom({ onAddListing, setActivePage }) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    universityId: 'metro-state',
    roomType: 'bedsitter',
    priceMonthly: '',
    deposit: '',
    distanceKm: '0.5',
    locationAddress: '',
    landlordName: '',
    phone: '',
    whatsappNumber: '',
    description: '',
    amenities: {
      wifi: true,
      water: true,
      security: true,
      power: true,
      kitchen: true,
      bathroom: true
    },
    samplePhoto: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1000&q=80'
  });

  const samplePhotos = [
    { id: 'p1', label: 'Bedsitter Studio', url: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80' },
    { id: 'p2', label: 'Single Room', url: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80' },
    { id: 'p3', label: 'Shared Apartment', url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80' },
    { id: 'p4', label: 'Modern Studio', url: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=800&q=80' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedUni = UNIVERSITIES.find(u => u.id === formData.universityId) || UNIVERSITIES[0];
    const selectedType = ROOM_TYPES.find(r => r.id === formData.roomType) || ROOM_TYPES[0];

    const newListing = {
      id: `lst-${Date.now()}`,
      title: formData.title || `${selectedType.label} near ${selectedUni.name}`,
      universityId: selectedUni.id,
      universityName: selectedUni.name,
      distanceKm: parseFloat(formData.distanceKm) || 0.5,
      walkTimeMinutes: Math.round((parseFloat(formData.distanceKm) || 0.5) * 12),
      roomType: selectedType.id,
      roomTypeLabel: selectedType.label,
      priceMonthly: Number(formData.priceMonthly) || 150,
      deposit: Number(formData.deposit) || Number(formData.priceMonthly) || 150,
      isVerified: false, // Default false until admin inspects!
      isFilled: false,
      verifiedDate: null,
      locationAddress: formData.locationAddress || "Near Main Campus Gate",
      photos: [formData.samplePhoto],
      amenities: {
        wifi: formData.amenities.wifi ? "WiFi Available" : "Not included",
        water: formData.amenities.water ? "Continuous Water Flow" : "Shared tap",
        security: formData.amenities.security ? "Gated Security & Lockable compound" : "Standard fence",
        power: formData.amenities.power ? "Prepaid Token Meter" : "Shared power",
        kitchen: formData.amenities.kitchen ? "Kitchen counter/sink" : "Shared kitchen",
        bathroom: formData.amenities.bathroom ? "Private En-Suite" : "Shared bath",
        furnishing: "Unfurnished"
      },
      landlord: {
        name: formData.landlordName || "Landlord",
        phone: formData.phone || "+12345678901",
        whatsappNumber: formData.whatsappNumber.replace(/[^0-9]/g, '') || "12345678901",
        joinedYear: "2026",
        trustScore: "Pending Physical Inspection"
      },
      description: formData.description || "Vacant room ready for immediate student occupancy.",
      verificationNotes: "Pending physical visit by CampusStay admin team."
    };

    onAddListing(newListing);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="container" style={{ paddingTop: '3rem', paddingBottom: '5rem', maxWidth: '680px' }}>
        <div className="card-flat" style={{ padding: '2.5rem', textAlign: 'center' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: 'var(--accent-emerald-light)',
            color: 'var(--accent-emerald)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.25rem auto'
          }}>
            <CheckCircle2 size={36} />
          </div>

          <h2 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
            Room Submission Received!
          </h2>

          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.6', marginBottom: '2rem' }}>
            Thank you! Your room has been added to our pending queue. Remember: <strong>Listing is 100% free</strong>. You only pay a small commission after a student signs and moves in.
          </p>

          <div style={{
            backgroundColor: 'var(--accent-emerald-light)',
            border: '1px solid var(--accent-emerald-border)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.25rem',
            textAlign: 'left',
            marginBottom: '2rem',
            fontSize: '0.9rem',
            color: 'var(--text-primary)'
          }}>
            <h4 style={{ color: 'var(--accent-emerald-hover)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <ShieldCheck size={18} /> What Happens Next?
            </h4>
            <ol style={{ paddingLeft: '1.2rem', margin: 0, lineHeight: '1.7', color: 'var(--text-secondary)' }}>
              <li>Our campus admin will call you on <strong>{formData.phone || 'your phone'}</strong> within 24 hours.</li>
              <li>We perform a quick 10-minute in-person inspection to verify water, security, and take high quality photos.</li>
              <li>Your room gets tagged with the <strong>"Verified Room"</strong> trust badge and goes live to thousands of browsing students.</li>
            </ol>
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button onClick={() => setActivePage('admin')} className="btn-secondary">
              View in Admin Queue
            </button>
            <button onClick={() => setActivePage('browse')} className="btn-primary">
              Browse All Rooms
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '5rem', maxWidth: '800px' }}>
      
      {/* Page Header */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <span style={{
          backgroundColor: 'var(--accent-emerald-light)',
          color: 'var(--accent-emerald)',
          border: '1px solid var(--accent-emerald-border)',
          padding: '0.3rem 0.75rem',
          borderRadius: 'var(--radius-full)',
          fontSize: '0.8rem',
          fontWeight: '700'
        }}>
          FOR LANDLORDS & PROPERTY OWNERS
        </span>
        <h1 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginTop: '0.5rem', marginBottom: '0.5rem' }}>
          List Your Vacant Room — Pay Only When Filled
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '600px', margin: '0 auto' }}>
          No upfront listing fees. We take photos, physically verify your compound, and match you with reliable student tenants.
        </p>
      </div>

      {/* Transparent Model Banner */}
      <div style={{
        backgroundColor: '#0f172a',
        color: '#ffffff',
        padding: '1.25rem 1.5rem',
        borderRadius: 'var(--radius-lg)',
        marginBottom: '2rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
      }}>
        <div style={{
          backgroundColor: 'var(--accent-emerald)',
          color: '#fff',
          padding: '0.5rem',
          borderRadius: '10px',
          display: 'flex',
          flexShrink: 0
        }}>
          <DollarSign size={24} />
        </div>
        <div style={{ fontSize: '0.9rem', lineHeight: '1.45' }}>
          <strong style={{ color: '#34d399' }}>Commission Model:</strong> Free to post. CampusStay collects a 5-10% finder's fee ONLY after a student inspects the room, agrees to rent, and moves in. Zero risk for landlords!
        </div>
      </div>

      {/* Form Container */}
      <form onSubmit={handleSubmit} className="card-flat" style={{ padding: '2rem' }}>
        
        {/* Section 1: Property Info */}
        <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '1.25rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Building size={20} color="var(--accent-emerald)" />
          1. Basic Room Details
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
          <div>
            <label style={labelStyle}>ROOM TITLE / HEADLINE *</label>
            <input
              type="text"
              required
              placeholder="e.g. Spacious Bedsitter 5 min from Gate B"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>NEAREST UNIVERSITY CAMPUS *</label>
            <select
              value={formData.universityId}
              onChange={(e) => setFormData({ ...formData, universityId: e.target.value })}
              style={inputStyle}
            >
              {UNIVERSITIES.map(u => (
                <option key={u.id} value={u.id}>{u.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
          <div>
            <label style={labelStyle}>ROOM TYPE *</label>
            <select
              value={formData.roomType}
              onChange={(e) => setFormData({ ...formData, roomType: e.target.value })}
              style={inputStyle}
            >
              {ROOM_TYPES.map(r => (
                <option key={r.id} value={r.id}>{r.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={labelStyle}>DISTANCE TO MAIN GATE (KM) *</label>
            <select
              value={formData.distanceKm}
              onChange={(e) => setFormData({ ...formData, distanceKm: e.target.value })}
              style={inputStyle}
            >
              <option value="0.3">0.3 km (~4 min walk)</option>
              <option value="0.5">0.5 km (~6 min walk)</option>
              <option value="1.0">1.0 km (~12 min walk)</option>
              <option value="1.5">1.5 km (~18 min walk)</option>
              <option value="2.5">2.5 km (Short bus ride)</option>
            </select>
          </div>
        </div>

        <div style={{ marginBottom: '1.75rem' }}>
          <label style={labelStyle}>EXACT STREET ADDRESS / BUILDING NAME *</label>
          <input
            type="text"
            required
            placeholder="e.g. 14 University Way, Gate B, Green Building 2nd Floor"
            value={formData.locationAddress}
            onChange={(e) => setFormData({ ...formData, locationAddress: e.target.value })}
            style={inputStyle}
          />
        </div>

        {/* Section 2: Pricing & Rent */}
        <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '1.25rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <DollarSign size={20} color="var(--accent-emerald)" />
          2. Rent & Security Deposit
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '1.75rem' }}>
          <div>
            <label style={labelStyle}>MONTHLY RENT ($ USD) *</label>
            <input
              type="number"
              required
              min="50"
              max="1000"
              placeholder="e.g. 150"
              value={formData.priceMonthly}
              onChange={(e) => setFormData({ ...formData, priceMonthly: e.target.value })}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>REFUNDABLE DEPOSIT ($ USD)</label>
            <input
              type="number"
              placeholder="e.g. 150 (Same as rent)"
              value={formData.deposit}
              onChange={(e) => setFormData({ ...formData, deposit: e.target.value })}
              style={inputStyle}
            />
          </div>
        </div>

        {/* Section 3: Amenities Checklist */}
        <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '1.25rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ShieldCheck size={20} color="var(--accent-emerald)" />
          3. Included Amenities
        </h3>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '1.75rem'
        }}>
          {[
            { key: 'wifi', label: 'WiFi Available' },
            { key: 'water', label: '24/7 Water Supply' },
            { key: 'security', label: 'Gated Security Fence' },
            { key: 'power', label: 'Backup Power / Meter' },
            { key: 'kitchen', label: 'Kitchen Space' },
            { key: 'bathroom', label: 'Private Bathroom' },
          ].map(item => (
            <label key={item.key} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.9rem',
              backgroundColor: 'var(--bg-subtle)',
              padding: '0.65rem 0.85rem',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer'
            }}>
              <input
                type="checkbox"
                checked={formData.amenities[item.key]}
                onChange={(e) => setFormData({
                  ...formData,
                  amenities: { ...formData.amenities, [item.key]: e.target.checked }
                })}
                style={{ accentColor: 'var(--accent-emerald)', width: '16px', height: '16px' }}
              />
              {item.label}
            </label>
          ))}
        </div>

        {/* Section 4: Room Photo Preview Selection */}
        <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '1.25rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <UploadCloud size={20} color="var(--accent-emerald)" />
          4. Room Photo
        </h3>

        <div style={{ marginBottom: '1.75rem' }}>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
            Select a representative preview photo below (Note: Our admin field team will take professional, unedited photos during the physical visit).
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
            {samplePhotos.map(p => (
              <div 
                key={p.id}
                onClick={() => setFormData({ ...formData, samplePhoto: p.url })}
                style={{
                  height: '100px',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  border: formData.samplePhoto === p.url ? '3px solid var(--accent-emerald)' : '2px solid var(--border-light)',
                  cursor: 'pointer',
                  position: 'relative'
                }}
              >
                <img src={p.url} alt={p.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <span style={{
                  position: 'absolute',
                  bottom: 0,
                  insetX: 0,
                  backgroundColor: 'rgba(0,0,0,0.7)',
                  color: '#fff',
                  fontSize: '0.7rem',
                  padding: '0.2rem 0.4rem',
                  textAlign: 'center'
                }}>
                  {p.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 5: Landlord Contact Info */}
        <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '1.25rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Phone size={20} color="var(--accent-emerald)" />
          5. Your Contact Information
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
          <div>
            <label style={labelStyle}>FULL NAME / PROPERTY NAME *</label>
            <input
              type="text"
              required
              placeholder="e.g. Mr. David Miller"
              value={formData.landlordName}
              onChange={(e) => setFormData({ ...formData, landlordName: e.target.value })}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>WHATSAPP PHONE NUMBER *</label>
            <input
              type="tel"
              required
              placeholder="e.g. +12345678901"
              value={formData.whatsappNumber}
              onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
              style={inputStyle}
            />
          </div>
        </div>

        {/* Submit CTA Button */}
        <button type="submit" className="btn-primary" style={{ width: '100%', padding: '0.9rem', fontSize: '1.05rem' }}>
          Submit Free Room Listing →
        </button>

        <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.75rem' }}>
          By submitting, you agree to allow CampusStay team to schedule a 10-min in-person verification visit. Zero upfront fee.
        </p>
      </form>
    </div>
  );
}

const labelStyle = {
  display: 'block',
  fontSize: '0.8rem',
  fontWeight: '700',
  color: 'var(--text-muted)',
  marginBottom: '0.4rem'
};

const inputStyle = {
  width: '100%',
  padding: '0.7rem 0.85rem',
  borderRadius: 'var(--radius-md)',
  border: '1px solid var(--border-medium)',
  backgroundColor: 'var(--bg-surface)',
  color: 'var(--text-primary)',
  fontSize: '0.9rem',
  outline: 'none'
};

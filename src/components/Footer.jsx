import React from 'react';
import { ShieldCheck, MessageSquare, Heart, Mail } from 'lucide-react';

export default function Footer({ setActivePage }) {
  return (
    <footer style={{
      backgroundColor: '#0f172a',
      color: '#94a3b8',
      paddingTop: '3.5rem',
      paddingBottom: '2.5rem',
      marginTop: '4rem',
      borderTop: '1px solid #1e293b'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '2.5rem',
          marginBottom: '3rem'
        }}>
          {/* Column 1: Brand & Purpose */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem', color: '#ffffff' }}>
              <div style={{
                backgroundColor: 'var(--accent-emerald)',
                padding: '0.35rem',
                borderRadius: '8px',
                display: 'flex'
              }}>
                <ShieldCheck size={22} />
              </div>
              <span style={{ fontSize: '1.25rem', fontWeight: '800', fontFamily: 'var(--font-heading)' }}>
                Campus<span style={{ color: '#34d399' }}>Stay</span>
              </span>
            </div>
            <p style={{ fontSize: '0.875rem', lineHeight: '1.6', marginBottom: '1rem' }}>
              Connecting university students to physically verified vacant rooms near campus. Eliminating rental deposit scams with in-person field inspections.
            </p>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: '#1e293b',
              padding: '0.4rem 0.75rem',
              borderRadius: '6px',
              fontSize: '0.8rem',
              color: '#34d399'
            }}>
              ✓ 100% In-Person Verification Protocol
            </div>
          </div>

          {/* Column 2: Commission Model Transparent Guarantee */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1rem', marginBottom: '1rem' }}>
              Landlord Guarantee & Model
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.875rem', lineHeight: '1.8' }}>
              <li>• <strong>Zero upfront listing fee</strong> for room owners.</li>
              <li>• Free physical inspection & professional photos.</li>
              <li>• Platform commission is earned only when a verified student moves in.</li>
              <li>• Direct student contact via WhatsApp & phone.</li>
            </ul>
          </div>

          {/* Column 3: Quick Navigation */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1rem', marginBottom: '1rem' }}>
              Quick Navigation
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem' }}>
              <button 
                onClick={() => setActivePage('home')} 
                style={footerLinkBtnStyle}
              >
                Featured Campus Rooms
              </button>
              <button 
                onClick={() => setActivePage('browse')} 
                style={footerLinkBtnStyle}
              >
                Search by University & Price
              </button>
              <button 
                onClick={() => setActivePage('about')} 
                style={footerLinkBtnStyle}
              >
                The 6-Step Physical Inspection Protocol
              </button>
              <button 
                onClick={() => setActivePage('list-room')} 
                style={footerLinkBtnStyle}
              >
                List Your Vacant Room Free
              </button>
            </div>
          </div>

          {/* Column 4: Contact & Help */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1rem', marginBottom: '1rem' }}>
              Need Help or Have a Vacancy?
            </h4>
            <p style={{ fontSize: '0.85rem', marginBottom: '1rem' }}>
              Have questions about a room or want our team to inspect your building?
            </p>

            <a
              href="https://wa.me/12345678901?text=Hi%20CampusStay%20Admin,%20I%20have%20a%20question%20about%20a%20listing."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
              style={{ padding: '0.65rem 1rem', fontSize: '0.875rem', marginBottom: '0.75rem' }}
            >
              <MessageSquare size={16} />
              Chat Admin on WhatsApp
            </a>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: '#64748b' }}>
              <Mail size={14} /> support@campusstay.org
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid #1e293b',
          paddingTop: '1.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          fontSize: '0.8rem'
        }}>
          <div>
            © {new Date().getFullYear()} CampusStay Housing Platform. Built for safe student living.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            Made with <Heart size={14} color="#ef4444" /> for university students & trusted landlords.
          </div>
        </div>
      </div>
    </footer>
  );
}

const footerLinkBtnStyle = {
  background: 'none',
  border: 'none',
  color: '#cbd5e1',
  textAlign: 'left',
  padding: 0,
  fontFamily: 'inherit',
  cursor: 'pointer',
  transition: 'color 0.15s ease'
};

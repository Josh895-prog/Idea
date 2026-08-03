import React from 'react';
import { ShieldCheck, X, Check, Building, Key, Droplet, Zap, FileText, UserCheck } from 'lucide-react';
import { VERIFICATION_CHECKLIST } from '../data/mockListings';

export default function VerificationModal({ isOpen, onClose, listingTitle, verifiedDate }) {
  if (!isOpen) return null;

  const icons = [UserCheck, Building, Key, Droplet, FileText, UserCheck];

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.65)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1rem'
    }} onClick={onClose}>
      <div 
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          maxWidth: '560px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: 'var(--shadow-modal)',
          border: '1px solid var(--border-light)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--border-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'var(--accent-emerald-light)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              backgroundColor: 'var(--accent-emerald)',
              color: '#fff',
              borderRadius: '10px',
              padding: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ShieldCheck size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', margin: 0 }}>
                CampusStay 6-Point Guarantee
              </h3>
              <p style={{ fontSize: '0.825rem', color: 'var(--accent-emerald-hover)', margin: 0, fontWeight: 500 }}>
                {verifiedDate ? `Physically inspected on ${verifiedDate}` : '100% In-Person Verified'}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-muted)',
              padding: '0.25rem',
              borderRadius: '6px'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '1.5rem' }}>
          {listingTitle && (
            <div style={{
              backgroundColor: 'var(--bg-subtle)',
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              marginBottom: '1.25rem',
              fontSize: '0.875rem',
              color: 'var(--text-secondary)'
            }}>
              <strong>Room:</strong> {listingTitle}
            </div>
          )}

          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
            Unlike informal social media listings, every <strong>Verified</strong> room on CampusStay undergoes our strict 6-step in-person physical inspection process before student matching:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {VERIFICATION_CHECKLIST.map((item, idx) => {
              const IconComp = icons[idx] || Check;
              return (
                <div key={item.step} style={{
                  display: 'flex',
                  gap: '1rem',
                  alignItems: 'flex-start',
                  padding: '0.75rem',
                  borderRadius: '10px',
                  backgroundColor: '#fafafa',
                  border: '1px solid var(--border-light)'
                }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--accent-emerald-light)',
                    color: 'var(--accent-emerald)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    fontWeight: '700',
                    fontSize: '0.85rem'
                  }}>
                    {item.step}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', margin: '0 0 0.2rem 0', color: 'var(--text-primary)' }}>
                      {item.title}
                    </h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.4 }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{
            marginTop: '1.5rem',
            padding: '1rem',
            backgroundColor: '#eff6ff',
            border: '1px solid #bfdbfe',
            borderRadius: '10px',
            fontSize: '0.85rem',
            color: '#1e40af'
          }}>
            💡 <strong>Zero Scams Guarantee:</strong> Landlords do not pay any upfront listing fee, and you do not transfer money until you visit and inspect the key in person!
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: '1rem 1.5rem',
          borderTop: '1px solid var(--border-light)',
          display: 'flex',
          justifyContent: 'flex-end'
        }}>
          <button onClick={onClose} className="btn-primary">
            Understood, back to rooms
          </button>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { ShieldCheck, Home, Search, PlusCircle, Info, Menu, X, UserCog } from 'lucide-react';

export default function Navbar({ activePage, setActivePage, pendingCount }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'browse', label: 'Browse Rooms', icon: Search },
    { id: 'about', label: 'How Verification Works', icon: Info },
  ];

  return (
    <>
      <header style={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid var(--border-light)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: 'var(--shadow-subtle)'
      }}>
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '72px'
        }}>
          {/* Logo */}
          <div 
            onClick={() => setActivePage('home')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', cursor: 'pointer' }}
          >
            <div style={{
              backgroundColor: 'var(--accent-emerald)',
              color: '#ffffff',
              padding: '0.45rem',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ShieldCheck size={26} />
            </div>
            <div>
              <span style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.35rem',
                fontWeight: '800',
                letterSpacing: '-0.02em',
                color: 'var(--text-primary)',
                lineHeight: 1
              }}>
                Campus<span style={{ color: 'var(--accent-emerald)' }}>Stay</span>
              </span>
              <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', margin: 0, fontWeight: 500 }}>
                100% In-Person Verified Rooms
              </p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '1.75rem' }} className="desktop-nav">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActivePage(item.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontFamily: 'inherit',
                    fontSize: '0.95rem',
                    fontWeight: isActive ? '700' : '500',
                    color: isActive ? 'var(--accent-emerald-hover)' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    padding: '0.4rem 0',
                    borderBottom: isActive ? '2px solid var(--accent-emerald)' : '2px solid transparent',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }} className="desktop-actions">
            <button
              onClick={() => setActivePage('admin')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                backgroundColor: activePage === 'admin' ? 'var(--accent-indigo)' : 'var(--bg-subtle)',
                color: activePage === 'admin' ? '#fff' : 'var(--text-secondary)',
                border: '1px solid var(--border-medium)',
                padding: '0.5rem 0.85rem',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.85rem',
                fontWeight: '600',
                cursor: 'pointer',
                position: 'relative'
              }}
              title="Solo Founder Admin Portal"
            >
              <UserCog size={16} />
              Admin
              {pendingCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  backgroundColor: '#ef4444',
                  color: '#fff',
                  fontSize: '0.65rem',
                  fontWeight: '700',
                  borderRadius: '50%',
                  width: '16px',
                  height: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {pendingCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActivePage('list-room')}
              className="btn-primary"
              style={{ fontSize: '0.875rem', padding: '0.55rem 1rem' }}
            >
              <PlusCircle size={18} />
              List Room Free
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="mobile-toggle" style={{ display: 'none' }}>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-primary)',
                padding: '0.5rem',
                cursor: 'pointer'
              }}
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div style={{
            backgroundColor: '#ffffff',
            borderBottom: '1px solid var(--border-light)',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem'
          }}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActivePage(item.id);
                  setMobileMenuOpen(false);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem',
                  borderRadius: 'var(--radius-md)',
                  background: activePage === item.id ? 'var(--accent-emerald-light)' : 'none',
                  color: activePage === item.id ? 'var(--accent-emerald)' : 'var(--text-primary)',
                  border: 'none',
                  fontWeight: '600',
                  textAlign: 'left'
                }}
              >
                <item.icon size={20} />
                {item.label}
              </button>
            ))}

            <button
              onClick={() => {
                setActivePage('list-room');
                setMobileMenuOpen(false);
              }}
              className="btn-primary"
              style={{ width: '100%', marginTop: '0.5rem' }}
            >
              <PlusCircle size={18} />
              List Your Room Free
            </button>

            <button
              onClick={() => {
                setActivePage('admin');
                setMobileMenuOpen(false);
              }}
              className="btn-secondary"
              style={{ width: '100%' }}
            >
              <UserCog size={18} />
              Admin Management Portal ({pendingCount} pending)
            </button>
          </div>
        )}
      </header>

      {/* Inline styles for responsive menu visibility */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav, .desktop-actions {
            display: none !important;
          }
          .mobile-toggle {
            display: block !important;
          }
        }
      `}</style>
    </>
  );
}

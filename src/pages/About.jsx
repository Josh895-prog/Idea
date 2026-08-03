import React from 'react';
import { 
  ShieldCheck, CheckCircle2, DollarSign, Building, AlertTriangle, 
  HelpCircle, UserCheck, Lock, Droplet, FileText, ChevronDown 
} from 'lucide-react';
import { VERIFICATION_CHECKLIST } from '../data/mockListings';

export default function About({ onOpenVerificationModal, setActivePage }) {
  return (
    <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '5rem', maxWidth: '900px' }}>
      
      {/* Hero Header */}
      <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          backgroundColor: 'var(--accent-emerald-light)',
          color: 'var(--accent-emerald)',
          border: '1px solid var(--accent-emerald-border)',
          padding: '0.35rem 0.85rem',
          borderRadius: 'var(--radius-full)',
          fontSize: '0.85rem',
          fontWeight: '700',
          marginBottom: '1rem'
        }}>
          <ShieldCheck size={16} />
          <span>Building Trust in Student Housing</span>
        </div>

        <h1 style={{ fontSize: '2.25rem', color: 'var(--text-primary)', marginBottom: '1rem', lineHeight: '1.2' }}>
          Safe Campus Housing With Zero Deposit Scams
        </h1>

        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.6', maxWidth: '720px', margin: '0 auto' }}>
          CampusStay is an in-person verified student housing platform connecting university students to checked vacant rooms near campus, while helping landlords fill vacancies fast with zero upfront advertising cost.
        </p>
      </div>

      {/* The Problem & Our Solution Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
        gap: '2rem',
        marginBottom: '4rem'
      }}>
        {/* The Problem */}
        <div className="card-flat" style={{ padding: '2rem', borderColor: '#fca5a5', backgroundColor: '#fff5f5' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#dc2626', marginBottom: '1rem' }}>
            <AlertTriangle size={24} />
            <h3 style={{ fontSize: '1.2rem', margin: 0, color: '#991b1b' }}>The Problem with Informal Listings</h3>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.9rem', color: '#7f1d1d', lineHeight: '1.8' }}>
            <li>❌ Fake photos posted on Facebook/Instagram groups</li>
            <li>❌ Demanding advance deposit payments before viewing</li>
            <li>❌ Landlords overcharging with hidden utility maintenance fees</li>
            <li>❌ Misleading walking distance claims to campus gates</li>
          </ul>
        </div>

        {/* The Solution */}
        <div className="card-flat" style={{ padding: '2rem', borderColor: 'var(--accent-emerald-border)', backgroundColor: 'var(--accent-emerald-light)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-emerald)', marginBottom: '1rem' }}>
            <ShieldCheck size={24} />
            <h3 style={{ fontSize: '1.2rem', margin: 0, color: 'var(--accent-emerald-hover)' }}>The CampusStay Verification Standard</h3>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: '1.8' }}>
            <li>✓ 100% in-person physical inspection by our field team</li>
            <li>✓ Unedited real photos taken on site</li>
            <li>✓ Water reliability and security gate locks tested</li>
            <li>✓ Zero upfront fees for students — chat directly on WhatsApp</li>
          </ul>
        </div>
      </div>

      {/* 6-Point Verification Checklist Detail Section */}
      <div className="card-flat" style={{ padding: '2.5rem', marginBottom: '4rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--accent-emerald)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Our Signature Trust Badge
          </span>
          <h2 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '0.4rem' }}>
            The 6-Point Physical Verification Protocol
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '600px', margin: '0.5rem auto 0 auto' }}>
            Every room tagged with the green <strong>"Verified Room"</strong> badge must pass all 6 physical verification checks:
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem'
        }}>
          {VERIFICATION_CHECKLIST.map((item) => (
            <div key={item.step} style={{
              backgroundColor: 'var(--bg-subtle)',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem'
            }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent-emerald)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '800',
                fontSize: '0.95rem',
                marginBottom: '0.75rem'
              }}>
                {item.step}
              </div>
              <h4 style={{ fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                {item.title}
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5', margin: 0 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Business & Commission Model Breakdown */}
      <div style={{
        backgroundColor: '#0f172a',
        color: '#ffffff',
        borderRadius: 'var(--radius-lg)',
        padding: '3rem 2rem',
        marginBottom: '4rem'
      }}>
        <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            backgroundColor: 'rgba(5, 150, 105, 0.2)',
            color: '#34d399',
            border: '1px solid #059669',
            padding: '0.3rem 0.75rem',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.8rem',
            fontWeight: '700',
            marginBottom: '1rem'
          }}>
            <DollarSign size={16} />
            Transparent Commission Business Model
          </div>

          <h2 style={{ fontSize: '1.75rem', color: '#ffffff', marginBottom: '1rem' }}>
            Free for Landlords to List — Pay Only When Filled
          </h2>

          <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '2rem' }}>
            We align our incentives with landlords. Posting a room on CampusStay is completely free. We send our admin to photograph and verify your room at zero upfront cost. CampusStay earns a small success commission (5-10%) only after a student inspects the room, signs the lease, and moves in.
          </p>

          <button onClick={() => setActivePage('list-room')} className="btn-primary" style={{ padding: '0.75rem 1.75rem' }}>
            List Your Room Free Now
          </button>
        </div>
      </div>

      {/* Student & Landlord FAQ Accordion */}
      <div>
        <h2 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', textAlign: 'center', marginBottom: '2rem' }}>
          Frequently Asked Questions
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <FaqItem 
            question="Do students pay any platform fees to search or contact landlords?"
            answer="No! Students browse and contact landlords completely free. Contact happens directly via WhatsApp or phone. No online payments are processed on the site."
          />
          <FaqItem 
            question="How do I know a room is really verified?"
            answer="Look for the green 'Verified Room' badge on the room card. You can click on the badge anytime to see the date our admin physically visited the property and inspected the locks, water, and landlord identity."
          />
          <FaqItem 
            question="How does CampusStay collect its commission from landlords?"
            answer="Landlords list for free. Once a student introduced through CampusStay agrees to move in and pays rent to the landlord, the landlord pays our agreed finder's fee."
          />
          <FaqItem 
            question="What if a landlord asks for money before an in-person viewing?"
            answer="Never send advance money before viewing! Every verified room on CampusStay is available for in-person tours. Please report any suspicious landlord using the Report link on the room detail page."
          />
        </div>
      </div>
    </div>
  );
}

function FaqItem({ question, answer }) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="card-flat" style={{ overflow: 'hidden' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          padding: '1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          fontWeight: '700',
          fontSize: '1rem',
          color: 'var(--text-primary)'
        }}
      >
        <span>{question}</span>
        <ChevronDown size={18} style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }} />
      </button>
      {open && (
        <div style={{
          padding: '0 1.25rem 1.25rem 1.25rem',
          fontSize: '0.9rem',
          color: 'var(--text-secondary)',
          lineHeight: '1.6',
          borderTop: '1px solid var(--border-light)',
          paddingTop: '1rem'
        }}>
          {answer}
        </div>
      )}
    </div>
  );
}

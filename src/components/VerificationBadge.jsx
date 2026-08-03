import React from 'react';
import { ShieldCheck, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function VerificationBadge({ isVerified, isFilled, onClick, size = "md" }) {
  if (isFilled) {
    return (
      <span className="badge-filled">
        <CheckCircle2 size={size === "sm" ? 12 : 14} />
        Filled / Occupied
      </span>
    );
  }

  if (isVerified) {
    return (
      <button 
        type="button" 
        onClick={onClick}
        className="badge-verified"
        title="Click to view 6-Point Physical Verification Details"
      >
        <ShieldCheck size={size === "sm" ? 14 : 16} />
        <span>Verified Room</span>
      </button>
    );
  }

  return (
    <span className="badge-unverified" title="Physical inspection scheduled by CampusStay team">
      <AlertCircle size={size === "sm" ? 12 : 14} />
      Pending Inspection
    </span>
  );
}

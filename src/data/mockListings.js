export const UNIVERSITIES = [
  { id: "metro-state", name: "Metro State University", city: "Main Campus" },
  { id: "tech-inst", name: "State Institute of Technology", city: "North Campus" },
  { id: "city-college", name: "City College & Medical School", city: "Downtown" },
  { id: "westside-uni", name: "Westside University", city: "South Campus" },
];

export const ROOM_TYPES = [
  { id: "single", label: "Single Room", desc: "Private room, shared bathroom/kitchen" },
  { id: "bedsitter", label: "Bedsitter / Self-Contained", desc: "Self-contained room with kitchen net & private bath" },
  { id: "shared", label: "Shared Apartment", desc: "Private bedroom in a 2-3 bed apartment" },
  { id: "studio", label: "Studio / 1-Bedroom", desc: "Full private studio or 1-bedroom flat" },
];

export const VERIFICATION_CHECKLIST = [
  {
    step: 1,
    title: "Landlord Identity Confirmed",
    desc: "National ID and property ownership documents verified directly by admin."
  },
  {
    step: 2,
    title: "Physical Site Visit & Real Photos",
    desc: "Our field team physically walked the property and captured exact, unedited photos."
  },
  {
    step: 3,
    title: "Security & Gated Compound Checked",
    desc: "Perimeter fencing, working main gate locks, and window security bars inspected."
  },
  {
    step: 4,
    title: "Water & Power Reliability Tested",
    desc: "Tap water pressure, backup storage tanks, and grid stability confirmed."
  },
  {
    step: 5,
    title: "Price & Terms Confirmed in Writing",
    desc: "Rent, deposit, and utility terms locked in writing with zero hidden fees."
  },
  {
    step: 6,
    title: "Tenant Reference Check",
    desc: "Spoken to existing or previous student tenants to verify landlord fairness."
  }
];

export const INITIAL_LISTINGS = [
  {
    id: "lst-101",
    title: "Modern En-Suite Bedsitter with Balcony",
    universityId: "metro-state",
    universityName: "Metro State University",
    distanceKm: 0.4,
    walkTimeMinutes: 5,
    roomType: "bedsitter",
    roomTypeLabel: "Bedsitter",
    priceMonthly: 180,
    deposit: 180,
    isVerified: true,
    isFilled: false,
    verifiedDate: "2026-07-28",
    locationAddress: "14 University Way, Gate B, Metro City",
    photos: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1000&q=80"
    ],
    amenities: {
      wifi: "High-Speed Fiber (Free)",
      water: "24/7 Running Water + Storage Tank",
      security: "Gated Compound with Perimeter Wall & CCTV",
      power: "Prepaid Token Meter + Solar Backup Lights",
      kitchen: "Private Kitchenette with Sink",
      bathroom: "Private En-Suite Hot Shower",
      furnishing: "Unfurnished (Bed frame included upon request)"
    },
    landlord: {
      name: "Mr. David Miller",
      phone: "+12345678901",
      whatsappNumber: "12345678901",
      joinedYear: "2024",
      trustScore: "Verified Host"
    },
    description: "Bright and clean bedsitter located just 5 minutes walk from Metro State University Gate B. Quiet compound ideal for focused studying. Features private kitchenette, hot shower, and free high-speed WiFi.",
    verificationNotes: "Physically visited on July 28, 2026. Water tank tested. Gated lock active. Landlord ID verified."
  },
  {
    id: "lst-102",
    title: "Affordable Single Student Room Near Library Gate",
    universityId: "metro-state",
    universityName: "Metro State University",
    distanceKm: 0.8,
    walkTimeMinutes: 10,
    roomType: "single",
    roomTypeLabel: "Single Room",
    priceMonthly: 110,
    deposit: 110,
    isVerified: true,
    isFilled: false,
    verifiedDate: "2026-07-30",
    locationAddress: "88 College Road, Eastside",
    photos: [
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80"
    ],
    amenities: {
      wifi: "Shared 100Mbps WiFi",
      water: "Borehole + City Supply (Reliable)",
      security: "Night Guard & Locked Gate at 10 PM",
      power: "Shared Prepaid Meter",
      kitchen: "Shared Kitchen Floor Space",
      bathroom: "Shared Clean Tiled Bathrooms (Cleaned daily)",
      furnishing: "Study Desk & Chair Included"
    },
    landlord: {
      name: "Mama Sarah Estate",
      phone: "+12345678902",
      whatsappNumber: "12345678902",
      joinedYear: "2025",
      trustScore: "Verified Landlord"
    },
    description: "Budget-friendly single room in a secure, student-only hostel block. Very close to the campus library gate. Clean shared facilities managed daily.",
    verificationNotes: "Visited on July 30, 2026. Verified current student tenant feedback — quiet environment."
  },
  {
    id: "lst-103",
    title: "Spacious Private Bedroom in 2-Bed Shared Apartment",
    universityId: "tech-inst",
    universityName: "State Institute of Technology",
    distanceKm: 0.3,
    walkTimeMinutes: 4,
    roomType: "shared",
    roomTypeLabel: "Shared Apartment",
    priceMonthly: 150,
    deposit: 150,
    isVerified: true,
    isFilled: false,
    verifiedDate: "2026-08-01",
    locationAddress: "32 Tech Avenue, North Block",
    photos: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1000&q=80"
    ],
    amenities: {
      wifi: "High-Speed Unlimited Fiber",
      water: "24/7 Pressurized Water System",
      security: "Biometric Gate & Caretaker on-site",
      power: "Solar Backup Power for Lights & Router",
      kitchen: "Fully Shared Kitchen with Gas & Fridge",
      bathroom: "Shared with 1 roommate",
      furnishing: "Semi-Furnished (Wardrobe & Curtain Rods)"
    },
    landlord: {
      name: "Eng. Joseph K.",
      phone: "+12345678903",
      whatsappNumber: "12345678903",
      joinedYear: "2024",
      trustScore: "Verified Host"
    },
    description: "Private room in a modern 2-bedroom student apartment right opposite the Engineering Complex. Shared living room and kitchen with a 3rd-year CS student.",
    verificationNotes: "Inspected Aug 1, 2026. Biometric lock and solar inverter tested and verified working."
  },
  {
    id: "lst-104",
    title: "Executive 1-Bedroom Studio with Parking",
    universityId: "city-college",
    universityName: "City College & Medical School",
    distanceKm: 1.2,
    walkTimeMinutes: 14,
    roomType: "studio",
    roomTypeLabel: "Studio / 1-Bed",
    priceMonthly: 260,
    deposit: 260,
    isVerified: true,
    isFilled: false,
    verifiedDate: "2026-07-25",
    locationAddress: "7 Urban Heights, Medical District",
    photos: [
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=1000&q=80"
    ],
    amenities: {
      wifi: "Dedicated 200Mbps Fiber",
      water: "City Water + Overhead 10,000L Reserve",
      security: "24/7 Security Guard + Electric Fencing",
      power: "Inverter Backup (No Blackouts during exams)",
      kitchen: "Modern Granite Kitchenette",
      bathroom: "Private Glass Shower Stall",
      furnishing: "Built-in Wardrobes & Kitchen Cabinets"
    },
    landlord: {
      name: "Urban Nest Properties",
      phone: "+12345678904",
      whatsappNumber: "12345678904",
      joinedYear: "2023",
      trustScore: "Verified Managed Building"
    },
    description: "Premium self-contained studio tailored for postgraduate and medical students who need total peace and reliable power for night studies.",
    verificationNotes: "Physically verified July 25, 2026. Ownership documents and written agreement checked."
  },
  {
    id: "lst-105",
    title: "Cozy Garden Bedsitter near Westside South Gate",
    universityId: "westside-uni",
    universityName: "Westside University",
    distanceKm: 0.6,
    walkTimeMinutes: 7,
    roomType: "bedsitter",
    roomTypeLabel: "Bedsitter",
    priceMonthly: 140,
    deposit: 140,
    isVerified: true,
    isFilled: false,
    verifiedDate: "2026-08-02",
    locationAddress: "19 Westside Crescent",
    photos: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1000&q=80"
    ],
    amenities: {
      wifi: "High-Speed WiFi Included",
      water: "Continuous Water Flow",
      security: "Secure Gated Compound & CCTV",
      power: "Prepaid Meter",
      kitchen: "En-suite Sink & Counter",
      bathroom: "Private Bathroom",
      furnishing: "Unfurnished"
    },
    landlord: {
      name: "Mrs. Grace W.",
      phone: "+12345678905",
      whatsappNumber: "12345678905",
      joinedYear: "2025",
      trustScore: "Verified Host"
    },
    description: "Ground floor bedsitter in a quiet residential home compound. Peaceful green surroundings, paved walkways, and very close to Westside University main gate.",
    verificationNotes: "Verified Aug 2, 2026. Water reliability and compound fence confirmed."
  },
  {
    id: "lst-106",
    title: "Budget Student Single Room with Water Included",
    universityId: "tech-inst",
    universityName: "State Institute of Technology",
    distanceKm: 1.5,
    walkTimeMinutes: 18,
    roomType: "single",
    roomTypeLabel: "Single Room",
    priceMonthly: 95,
    deposit: 95,
    isVerified: false,
    isFilled: false,
    verifiedDate: null,
    locationAddress: "45 Innovation Road, Outer Campus",
    photos: [
      "https://images.unsplash.com/photo-1540518614846-7ede433c5173?auto=format&fit=crop&w=1000&q=80"
    ],
    amenities: {
      wifi: "Pay-as-you-go WiFi option",
      water: "Included in rent",
      security: "Perimeter Fence",
      power: "Sub-meter billing",
      kitchen: "Shared cook area",
      bathroom: "Shared",
      furnishing: "Basic Desk"
    },
    landlord: {
      name: "Peter M.",
      phone: "+12345678906",
      whatsappNumber: "12345678906",
      joinedYear: "2026",
      trustScore: "Pending Physical Inspection"
    },
    description: "Low cost single room for budget-conscious students. Free water included in rent. Pending our team's physical inspection visit.",
    verificationNotes: "Pending physical admin visit. Listing posted by landlord."
  }
];

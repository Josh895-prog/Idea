// UniVerse Mock Data & Configuration

window.UNIVERSITIES = [
  { id: "kenyatta university", name: "Kenyatta University", city: "Main Campus", icon: "school" },
  { id: "jomo kenyatta university of agriculture and technology", name: "Jomo Kenyatta University of Agriculture and Technology", city: "Juja Campus", icon: "cpu" },
  { id: "mount kenya university", name: "Mount Kenya University", city: "Main Campus Thika", icon: "activity" },
  { id: "strathmore university", name: "Strathmore University", city: "Madaraka Campus", icon: "book-open" },
];

window.ROOM_TYPES = [
  { id: "single", label: "Single Room", desc: "Private room, shared bathroom & kitchen" },
  { id: "bedsitter", label: "Bedsitter / Self-Contained", desc: "Self-contained room with kitchenette & private bath" },
  { id: "shared", label: "Shared Apartment", desc: "Private bedroom in a 2-3 bed student apartment" },
  { id: "studio", label: "Studio / 1-Bedroom", desc: "Full private studio or 1-bedroom flat" },
];

window.VERIFICATION_CHECKLIST = [
  {
    step: 1,
    title: "Landlord Identity & Ownership Confirmed",
    desc: "National ID and property title or deed verified directly by our admin team."
  },
  {
    step: 2,
    title: "Physical Site Visit & Unedited Photos",
    desc: "Our field team physically walked the property and captured high-resolution, unedited photos."
  },
  {
    step: 3,
    title: "Gated Perimeter & Locks Inspected",
    desc: "Compound fencing, main gate entry locks, and window security bars audited."
  },
  {
    step: 4,
    title: "Water & Power Reliability Tested",
    desc: "Tap pressure, backup water storage tanks, and prepaid/grid power stability tested."
  },
  {
    step: 5,
    title: "Rent & Deposit Locked in Writing",
    desc: "Monthly rent, security deposit, and utility terms signed with zero hidden fees."
  },
  {
    step: 6,
    title: "Student Tenant Reference Audit",
    desc: "Interviewed current or recent student tenants to confirm quiet environment and fair landlord."
  }
];

window.INITIAL_LISTINGS = [
  {
    id: "lst-101",
    title: "Modern En-Suite Bedsitter with Balcony",
    universityId: "kenyatta university",
    universityName: "Kenyatta University",
    distanceKm: 0.4,
    walkTimeMinutes: 5,
    roomType: "bedsitter",
    roomTypeLabel: "Bedsitter",
    priceMonthly: 180,
    deposit: 180,
    isVerified: true,
    isFilled: false,
    verifiedDate: "2026-07-28",
    locationAddress: "14 University Way, Gate B, Kahawa Sukari",
    photos: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1000&q=80"
    ],
    amenities: {
      wifi: "High-Speed Fiber (Free)",
      water: "24/7 Running Water + Backup Storage Tank",
      security: "Gated Compound with Perimeter Wall & CCTV",
      power: "Prepaid Token Meter + Solar Backup Lights",
      kitchen: "Private Kitchenette with Sink & Counter",
      bathroom: "Private En-Suite Hot Shower",
      furnishing: "Bed Frame & Closet Included"
    },
    landlord: {
      name: "Mr. David Miller",
      phone: "+254115693447",
      whatsappNumber: "254115693447",
      joinedYear: "2024",
      trustScore: "Verified Host"
    },
    description: "Bright and clean bedsitter located just 5 minutes walk from Kenyatta University Gate B. Quiet compound ideal for focused studying. Features private kitchenette, hot shower, and free high-speed WiFi.",
    verificationNotes: "Physically visited on July 28, 2026. Backup water tank tested. Gated lock active. Landlord ID verified."
  },
  {
    id: "lst-102",
    title: "Affordable Single Student Room Near Library Gate",
    universityId: "kenyatta university",
    universityName: "Kenyatta University",
    distanceKm: 0.8,
    walkTimeMinutes: 10,
    roomType: "single",
    roomTypeLabel: "Single Room",
    priceMonthly: 110,
    deposit: 110,
    isVerified: true,
    isFilled: false,
    verifiedDate: "2026-07-30",
    locationAddress: "88 College Road, Kahawa Wendani",
    photos: [
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80"
    ],
    amenities: {
      wifi: "Shared 100Mbps Fiber WiFi",
      water: "Borehole + City Water Supply",
      security: "Night Security Guard & Nightly Locked Gate",
      power: "Shared Prepaid Sub-meter",
      kitchen: "Shared Kitchen Area",
      bathroom: "Shared Tiled Bathrooms (Cleaned Daily)",
      furnishing: "Study Desk & Ergonomic Chair Included"
    },
    landlord: {
      name: "Mama Sarah Estate",
      phone: "+254115693447",
      whatsappNumber: "254115693447",
      joinedYear: "2025",
      trustScore: "Verified Landlord"
    },
    description: "Budget-friendly single room in a secure, student-only hostel block. Very close to the campus library gate. Clean shared facilities managed daily by on-site caretaker.",
    verificationNotes: "Visited on July 30, 2026. Verified current student tenant feedback — peaceful study atmosphere."
  },
  {
    id: "lst-103",
    title: "Spacious Bedroom in 2-Bed Shared Apartment",
    universityId: "jomo kenyatta university of agriculture and technology",
    universityName: "Jomo Kenyatta University of Agriculture and Technology",
    distanceKm: 0.3,
    walkTimeMinutes: 4,
    roomType: "shared",
    roomTypeLabel: "Shared Apartment",
    priceMonthly: 150,
    deposit: 150,
    isVerified: true,
    isFilled: false,
    verifiedDate: "2026-08-01",
    locationAddress: "32 Tech Avenue, Juja Main Gate",
    photos: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1000&q=80"
    ],
    amenities: {
      wifi: "High-Speed Unlimited Fiber",
      water: "24/7 Pressurized Water System",
      security: "Biometric Keypad Gate & Resident Caretaker",
      power: "Solar Backup Power for Lights & Internet Router",
      kitchen: "Fully Shared Kitchen with Gas Stove & Refrigerator",
      bathroom: "Clean Bathroom Shared with 1 Roommate",
      furnishing: "Wardrobe & Built-in Shelving"
    },
    landlord: {
      name: "Eng. Joseph K.",
      phone: "+254115693447",
      whatsappNumber: "254115693447",
      joinedYear: "2024",
      trustScore: "Verified Host"
    },
    description: "Private bedroom in a modern 2-bedroom student apartment right opposite the Engineering Complex. Shared living room and kitchen with a 3rd-year CS student.",
    verificationNotes: "Inspected Aug 1, 2026. Biometric lock and solar inverter tested and verified operational."
  },
  {
    id: "lst-104",
    title: "Executive Studio Flat with Inverter Backup",
    universityId: "mount kenya university",
    universityName: "Mount Kenya University",
    distanceKm: 1.2,
    walkTimeMinutes: 14,
    roomType: "studio",
    roomTypeLabel: "Studio / 1-Bed",
    priceMonthly: 260,
    deposit: 260,
    isVerified: true,
    isFilled: false,
    verifiedDate: "2026-07-25",
    locationAddress: "7 Urban Heights, Thika Town",
    photos: [
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=1000&q=80"
    ],
    amenities: {
      wifi: "Dedicated 200Mbps Fiber Connection",
      water: "City Supply + 10,000L Overhead Tank Reserve",
      security: "24/7 Guards & Perimeter Electric Fencing",
      power: "Full Inverter Battery Backup (Zero Blackouts)",
      kitchen: "Granite Top Kitchenette with Cabinets",
      bathroom: "Private En-Suite Glass Shower",
      furnishing: "Built-in Closet, Desk, and Kitchen Fittings"
    },
    landlord: {
      name: "Urban Nest Properties",
      phone: "+254115693447",
      whatsappNumber: "254115693447",
      joinedYear: "2023",
      trustScore: "Verified Managed Property"
    },
    description: "Premium self-contained studio tailored for postgraduate and medical students who require absolute quiet, top-tier security, and uninterrupted power for late night studies.",
    verificationNotes: "Physically verified July 25, 2026. Ownership documents, battery inverter, and written lease terms confirmed."
  },
  {
    id: "lst-105",
    title: "Cozy Garden Bedsitter near Strathmore Gate",
    universityId: "strathmore university",
    universityName: "Strathmore University",
    distanceKm: 0.6,
    walkTimeMinutes: 7,
    roomType: "bedsitter",
    roomTypeLabel: "Bedsitter",
    priceMonthly: 140,
    deposit: 140,
    isVerified: true,
    isFilled: false,
    verifiedDate: "2026-08-02",
    locationAddress: "19 Madaraka Crescent",
    photos: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1000&q=80"
    ],
    amenities: {
      wifi: "High-Speed WiFi Included in Rent",
      water: "Continuous Water Supply + Tank",
      security: "Gated Compound with Evening Guard",
      power: "Individual Token Meter",
      kitchen: "Private Kitchen Counter & Sink",
      bathroom: "Private Tiled Hot Water Bath",
      furnishing: "Unfurnished"
    },
    landlord: {
      name: "Mrs. Grace W.",
      phone: "+254115693447",
      whatsappNumber: "254115693447",
      joinedYear: "2025",
      trustScore: "Verified Host"
    },
    description: "Ground floor bedsitter in a serene residential home compound. Beautiful green surroundings, paved walkways, and very close to Strathmore University main gate.",
    verificationNotes: "Verified Aug 2, 2026. Water reliability and compound fence confirmed."
  },
  {
    id: "lst-106",
    title: "Budget Student Single Room with Water Included",
    universityId: "jomo kenyatta university of agriculture and technology",
    universityName: "Jomo Kenyatta University of Agriculture and Technology",
    distanceKm: 1.5,
    walkTimeMinutes: 18,
    roomType: "single",
    roomTypeLabel: "Single Room",
    priceMonthly: 95,
    deposit: 95,
    isVerified: false,
    isFilled: false,
    verifiedDate: null,
    locationAddress: "45 Innovation Road, Juja",
    photos: [
      "https://images.unsplash.com/photo-1540518614846-7ede433c5173?auto=format&fit=crop&w=1000&q=80"
    ],
    amenities: {
      wifi: "Pay-as-you-go WiFi option",
      water: "Water Included in Monthly Rent",
      security: "Perimeter Wall & Gate Lock",
      power: "Sub-meter Billing",
      kitchen: "Shared Cooking Space",
      bathroom: "Shared Clean Bathrooms",
      furnishing: "Basic Desk Included"
    },
    landlord: {
      name: "Peter M.",
      phone: "+254115693447",
      whatsappNumber: "254115693447",
      joinedYear: "2026",
      trustScore: "Pending Field Inspection"
    },
    description: "Low cost single room for budget-conscious students. Free water included in rent. Pending our admin team's physical inspection visit.",
    verificationNotes: "Pending physical verification visit scheduled by admin team."
  }
];

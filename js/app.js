// UniHaven Application Engine & State Controller

class UniHavenApp {
  constructor() {
    this.activePage = 'home';
    this.selectedListingId = null;
    
    // Load persisted listings from localStorage if present
    const saved = localStorage.getItem('unihaven_listings');
    if (saved) {
      try {
        this.listings = JSON.parse(saved);
      } catch(e) {
        this.listings = window.INITIAL_LISTINGS;
      }
    } else {
      this.listings = window.INITIAL_LISTINGS;
    }

    // Default Filters
    this.filterState = {
      query: '',
      university: '',
      roomType: '',
      maxPrice: 350,
      verifiedOnly: false,
      sortBy: 'default'
    };

    // Live preview state for List Room form
    this.livePreviewListing = {
      id: 'preview',
      title: 'Your Room Title Preview',
      universityId: 'metro-state',
      universityName: 'Metro State University',
      distanceKm: 0.5,
      walkTimeMinutes: 6,
      roomType: 'single',
      roomTypeLabel: 'Single Room',
      priceMonthly: 150,
      deposit: 150,
      isVerified: false,
      isFilled: false,
      photos: ['https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1000&q=80'],
      locationAddress: '123 Campus Street',
      landlord: { name: 'Landlord Name', phone: '+123456789', trustScore: 'Pending Inspection' }
    };
  }

  init() {
    this.renderNavbarBadge();
    this.navigate('home');
  }

  saveListings() {
    localStorage.setItem('unihaven_listings', JSON.stringify(this.listings));
    this.renderNavbarBadge();
  }

  renderNavbarBadge() {
    const pendingCount = this.listings.filter(l => !l.isVerified && !l.isFilled).length;
    const badgeEl = document.getElementById('pending-badge-count');
    if (badgeEl) {
      badgeEl.textContent = pendingCount;
      badgeEl.style.display = pendingCount > 0 ? 'inline-block' : 'none';
    }
  }

  navigate(page, params = {}) {
    this.activePage = page;
    if (params.listingId) {
      this.selectedListingId = params.listingId;
    }

    // Update active nav button styling
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    const activeNavBtn = document.getElementById(`nav-${page}`);
    if (activeNavBtn) activeNavBtn.classList.add('active');

    window.scrollTo({ top: 0, behavior: 'smooth' });
    const viewContainer = document.getElementById('app-view');

    switch (page) {
      case 'home':
        viewContainer.innerHTML = this.renderHomeView();
        break;
      case 'browse':
        viewContainer.innerHTML = this.renderBrowseView();
        break;
      case 'detail':
        viewContainer.innerHTML = this.renderDetailView();
        break;
      case 'list-room':
        viewContainer.innerHTML = this.renderListRoomView();
        this.attachListRoomListeners();
        break;
      case 'about':
        viewContainer.innerHTML = this.renderAboutView();
        break;
      case 'admin':
        viewContainer.innerHTML = this.renderAdminView();
        break;
      default:
        viewContainer.innerHTML = this.renderHomeView();
    }
  }

  setFilterAndBrowse(partialFilter) {
    this.filterState = { ...this.filterState, ...partialFilter };
    this.navigate('browse');
  }

  // --- HOME VIEW RENDERER ---
  renderHomeView() {
    const verifiedListings = this.listings.filter(l => l.isVerified && !l.isFilled).slice(0, 3);

    return `
      <section class="hero-section">
        <div class="container">
          <div class="hero-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            100% Physically Inspected & Verified
          </div>
          
          <h1 class="hero-title">
            Scam-Free Student Rooms<br/>
            <span>Verified Right Near Campus</span>
          </h1>
          
          <p class="hero-subtitle">
            Every room listed on UniHaven has undergone our mandatory 6-point physical audit: identity check, actual photos, water pressure, power reliability, and lock security.
          </p>

          <!-- Search Bar Box -->
          <div class="search-box">
            <form onsubmit="app.handleHomeSearch(event);" class="search-form-grid">
              <div class="form-group">
                <label class="form-label">Target University</label>
                <select id="home-uni-select" class="form-select">
                  <option value="">All Universities & Campuses</option>
                  ${window.UNIVERSITIES.map(u => `<option value="${u.id}">${u.name}</option>`).join('')}
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">Room Category</label>
                <select id="home-type-select" class="form-select">
                  <option value="">Any Room Type</option>
                  ${window.ROOM_TYPES.map(rt => `<option value="${rt.id}">${rt.label}</option>`).join('')}
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">Max Budget ($/mo)</label>
                <input type="number" id="home-price-input" class="form-input" placeholder="e.g. $200" min="50" max="1000" />
              </div>

              <button type="submit" class="btn-primary search-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                Find Rooms
              </button>
            </form>
          </div>

          <!-- Quick Stats Bar -->
          <div class="stats-bar">
            <div class="stat-item">
              <div class="stat-number">100%</div>
              <div class="stat-label">Verified Listings</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">0</div>
              <div class="stat-label">Scam Incidents Reported</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">&lt; 10 min</div>
              <div class="stat-label">Average Walk to Campus</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">2,400+</div>
              <div class="stat-label">Students Housed</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Featured Verified Rooms -->
      <section style="padding: 60px 0;">
        <div class="container">
          <div class="section-header">
            <div>
              <h2 class="section-title">Featured Verified Accommodations</h2>
              <p class="section-desc">Handpicked student rooms with 100% verified amenities and direct landlord contact.</p>
            </div>
            <button class="btn-secondary" onclick="app.navigate('browse')">View All Rooms &rarr;</button>
          </div>

          <div class="listings-grid">
            ${verifiedListings.map(l => this.renderListingCardHTML(l)).join('')}
          </div>
        </div>
      </section>

      <!-- Verification Process Banner -->
      <section style="background: var(--surface-dark); border-y: 1px solid var(--border-color); padding: 70px 0;">
        <div class="container">
          <div style="text-align: center; max-width: 640px; margin: 0 auto 40px;">
            <h2 class="section-title">How UniHaven Protects You</h2>
            <p class="section-desc">Unlike unverified social media groups, we physically audit every room before allowing it online.</p>
          </div>

          <div class="features-grid">
            <div class="feature-card">
              <div class="feature-icon">🛡️</div>
              <h3 class="feature-title">1. Landlord ID Audit</h3>
              <p class="feature-desc">National ID, land title ownership, or lease agreements are verified prior to listing.</p>
            </div>

            <div class="feature-card">
              <div class="feature-icon">📸</div>
              <h3 class="feature-title">2. Physical Site Visit</h3>
              <p class="feature-desc">Our field agents visit the property to take unedited, realistic photos & measure walk times.</p>
            </div>

            <div class="feature-card">
              <div class="feature-icon">💧</div>
              <h3 class="feature-title">3. Water & Power Test</h3>
              <p class="feature-desc">We test tap pressure, backup storage tanks, inverter reliability, and prepaid electricity meters.</p>
            </div>

            <div class="feature-card">
              <div class="feature-icon">📝</div>
              <h3 class="feature-title">4. Zero Hidden Fees</h3>
              <p class="feature-desc">Rent amount, deposit refund rules, and utility charges are explicitly locked in writing.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Banner -->
      <section style="padding: 80px 0; text-align: center;">
        <div class="container">
          <div style="background: linear-gradient(135deg, rgba(79, 70, 229, 0.2), rgba(6, 182, 212, 0.2)); border: 1px solid rgba(79, 70, 229, 0.4); border-radius: var(--radius-xl); padding: 50px 30px;">
            <h2 style="font-size: 2.2rem; font-weight: 800; margin-bottom: 16px;">Are You a Verified Property Owner?</h2>
            <p style="color: var(--text-muted); max-width: 580px; margin: 0 auto 28px; font-size: 1.05rem;">
              List your student room for free. Get verified student tenants fast with our official badge of trust.
            </p>
            <button class="btn-primary" style="font-size: 1.05rem; padding: 14px 32px;" onclick="app.navigate('list-room')">
              List Your Property Now
            </button>
          </div>
        </div>
      </section>
    `;
  }

  handleHomeSearch(e) {
    e.preventDefault();
    const uni = document.getElementById('home-uni-select').value;
    const type = document.getElementById('home-type-select').value;
    const price = document.getElementById('home-price-input').value;

    this.filterState = {
      ...this.filterState,
      university: uni,
      roomType: type,
      maxPrice: price ? parseInt(price) : 500
    };

    this.navigate('browse');
  }

  // --- BROWSE VIEW RENDERER ---
  renderBrowseView() {
    let filtered = [...this.listings];

    // Apply Filter: Query
    if (this.filterState.query) {
      const q = this.filterState.query.toLowerCase();
      filtered = filtered.filter(l => 
        l.title.toLowerCase().includes(q) || 
        l.universityName.toLowerCase().includes(q) || 
        l.locationAddress.toLowerCase().includes(q)
      );
    }

    // Apply Filter: University
    if (this.filterState.university) {
      filtered = filtered.filter(l => l.universityId === this.filterState.university);
    }

    // Apply Filter: Room Type
    if (this.filterState.roomType) {
      filtered = filtered.filter(l => l.roomType === this.filterState.roomType);
    }

    // Apply Filter: Max Price
    if (this.filterState.maxPrice) {
      filtered = filtered.filter(l => l.priceMonthly <= this.filterState.maxPrice);
    }

    // Apply Filter: Verified Only
    if (this.filterState.verifiedOnly) {
      filtered = filtered.filter(l => l.isVerified);
    }

    // Apply Sorting
    if (this.filterState.sortBy === 'price-asc') {
      filtered.sort((a, b) => a.priceMonthly - b.priceMonthly);
    } else if (this.filterState.sortBy === 'price-desc') {
      filtered.sort((a, b) => b.priceMonthly - a.priceMonthly);
    } else if (this.filterState.sortBy === 'distance') {
      filtered.sort((a, b) => a.distanceKm - b.distanceKm);
    }

    return `
      <div class="container">
        <div class="browse-layout">
          <!-- Filter Sidebar -->
          <aside class="filter-sidebar">
            <div class="filter-title">
              <span>Filter Rooms</span>
              <button class="reset-filter-btn" onclick="app.resetFilters()">Reset All</button>
            </div>

            <!-- Search Query Input -->
            <div class="filter-group">
              <label class="filter-group-title">Keywords / Location</label>
              <input type="text" class="form-input" placeholder="e.g. Balcony, Gate B..." 
                     value="${this.filterState.query}"
                     oninput="app.updateFilter('query', this.value)" />
            </div>

            <!-- University Filter -->
            <div class="filter-group">
              <label class="filter-group-title">University / Campus</label>
              <select class="form-select" onchange="app.updateFilter('university', this.value)">
                <option value="">All Campuses</option>
                ${window.UNIVERSITIES.map(u => `
                  <option value="${u.id}" ${this.filterState.university === u.id ? 'selected' : ''}>
                    ${u.name}
                  </option>
                `).join('')}
              </select>
            </div>

            <!-- Room Type Filter -->
            <div class="filter-group">
              <label class="filter-group-title">Room Type</label>
              <select class="form-select" onchange="app.updateFilter('roomType', this.value)">
                <option value="">All Categories</option>
                ${window.ROOM_TYPES.map(rt => `
                  <option value="${rt.id}" ${this.filterState.roomType === rt.id ? 'selected' : ''}>
                    ${rt.label}
                  </option>
                `).join('')}
              </select>
            </div>

            <!-- Max Price Slider -->
            <div class="filter-group">
              <label class="filter-group-title">
                Max Monthly Rent: 
                <span class="price-range-val">$${this.filterState.maxPrice}</span>
              </label>
              <input type="range" min="80" max="400" step="10" 
                     value="${this.filterState.maxPrice}" 
                     style="width: 100%; accent-color: var(--primary);" 
                     oninput="app.updateFilter('maxPrice', parseInt(this.value))" />
            </div>

            <!-- Verified Only Toggle -->
            <div class="filter-group" style="display: flex; align-items: center; justify-content: space-between; padding-top: 10px;">
              <span class="filter-group-title" style="margin: 0;">Verified Only</span>
              <input type="checkbox" ${this.filterState.verifiedOnly ? 'checked' : ''} 
                     style="width: 18px; height: 18px; cursor: pointer;" 
                     onchange="app.updateFilter('verifiedOnly', this.checked)" />
            </div>
          </aside>

          <!-- Main Listing Results -->
          <div>
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px;">
              <div>
                <h2 style="font-size: 1.5rem; font-weight: 700;">Available Student Housing</h2>
                <p style="font-size: 0.85rem; color: var(--text-muted);">Showing ${filtered.length} verified & pending accommodations</p>
              </div>

              <!-- Sorting Dropdown -->
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="font-size: 0.85rem; color: var(--text-muted);">Sort By:</span>
                <select class="form-select" style="width: auto; padding: 6px 12px; font-size: 0.85rem;" onchange="app.updateFilter('sortBy', this.value)">
                  <option value="default" ${this.filterState.sortBy === 'default' ? 'selected' : ''}>Recommended</option>
                  <option value="price-asc" ${this.filterState.sortBy === 'price-asc' ? 'selected' : ''}>Price: Low to High</option>
                  <option value="price-desc" ${this.filterState.sortBy === 'price-desc' ? 'selected' : ''}>Price: High to Low</option>
                  <option value="distance" ${this.filterState.sortBy === 'distance' ? 'selected' : ''}>Closest to Campus</option>
                </select>
              </div>
            </div>

            ${filtered.length > 0 ? `
              <div class="listings-grid">
                ${filtered.map(l => this.renderListingCardHTML(l)).join('')}
              </div>
            ` : `
              <div style="text-align: center; padding: 60px 20px; background: var(--surface-dark); border-radius: var(--radius-lg); border: 1px solid var(--border-color);">
                <div style="font-size: 3rem; margin-bottom: 12px;">🔍</div>
                <h3 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 8px;">No Rooms Found</h3>
                <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 20px;">Try adjusting your filters or price slider to see more listings.</p>
                <button class="btn-secondary" onclick="app.resetFilters()">Reset Filters</button>
              </div>
            `}
          </div>
        </div>
      </div>
    `;
  }

  updateFilter(key, val) {
    this.filterState[key] = val;
    document.getElementById('app-view').innerHTML = this.renderBrowseView();
  }

  resetFilters() {
    this.filterState = {
      query: '',
      university: '',
      roomType: '',
      maxPrice: 350,
      verifiedOnly: false,
      sortBy: 'default'
    };
    document.getElementById('app-view').innerHTML = this.renderBrowseView();
  }

  // --- REUSABLE LISTING CARD HTML GENERATOR ---
  renderListingCardHTML(listing) {
    return `
      <div class="listing-card">
        <div class="card-media">
          <img src="${listing.photos[0] || 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1000&q=80'}" alt="${listing.title}" class="card-img" />
          
          ${listing.isVerified ? `
            <div class="badge-verified-float">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
              Verified
            </div>
          ` : `
            <div class="badge-pending-float">
              ⚠️ Inspection Pending
            </div>
          `}

          ${listing.isFilled ? `
            <div class="badge-filled-float">Filled</div>
          ` : ''}

          <div class="card-price-tag">
            $${listing.priceMonthly} <span>/ mo</span>
          </div>
        </div>

        <div class="card-body">
          <div class="card-type">${listing.roomTypeLabel || listing.roomType}</div>
          <h3 class="card-title">${listing.title}</h3>
          
          <div class="card-uni">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/></svg>
            ${listing.universityName}
          </div>

          <div class="card-meta">
            <div class="card-meta-item">
              📍 ${listing.distanceKm} km
            </div>
            <div class="card-meta-item">
              🚶 ${listing.walkTimeMinutes} min walk
            </div>
          </div>

          <div class="card-actions">
            ${listing.isVerified ? `
              <button class="btn-outline-verified" onclick="app.openVerificationModal('${listing.id}')">
                Checklist Audit
              </button>
            ` : `
              <span style="font-size: 0.75rem; color: var(--warning);">Pending Audit</span>
            `}

            <button class="btn-primary" style="padding: 8px 14px; font-size: 0.85rem;" onclick="app.navigate('detail', {listingId: '${listing.id}'})">
              View Details &rarr;
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // --- LISTING DETAIL VIEW RENDERER ---
  renderDetailView() {
    const listing = this.listings.find(l => l.id === this.selectedListingId) || this.listings[0];
    if (!listing) return '<div class="container" style="padding: 80px 0; text-align: center;">Listing not found</div>';

    return `
      <div class="container detail-layout">
        <div style="margin-bottom: 20px;">
          <button class="btn-secondary" onclick="app.navigate('browse')" style="padding: 6px 14px; font-size: 0.85rem;">
            &larr; Back to Browse
          </button>
        </div>

        <div class="detail-header">
          <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
            ${listing.isVerified ? `
              <span class="btn-outline-verified" style="pointer-events: none;">
                ✓ 100% Physically Verified (${listing.verifiedDate})
              </span>
            ` : `
              <span style="background: var(--warning-light); color: var(--warning); padding: 4px 12px; border-radius: 20px; font-size: 0.85rem; font-weight: 600;">
                ⚠️ Field Inspection Pending
              </span>
            `}
            <span style="color: var(--accent); font-weight: 700; text-transform: uppercase; font-size: 0.85rem;">
              ${listing.roomTypeLabel}
            </span>
          </div>

          <h1 class="detail-title">${listing.title}</h1>

          <div class="detail-sub-bar">
            <span>📍 ${listing.locationAddress}</span>
            <span>🎓 ${listing.universityName} (${listing.distanceKm} km / ${listing.walkTimeMinutes} min walk)</span>
          </div>
        </div>

        <!-- Photo Gallery Grid -->
        <div class="gallery-grid">
          <img src="${listing.photos[0] || ''}" class="main-gallery-img" alt="Room photo" />
          <div class="sub-gallery-column">
            <img src="${listing.photos[1] || listing.photos[0]}" class="sub-gallery-img" alt="Room photo 2" />
            <img src="${listing.photos[2] || listing.photos[0]}" class="sub-gallery-img" alt="Room photo 3" />
          </div>
        </div>

        <!-- Body Specifications & Landlord Card -->
        <div class="detail-body-grid">
          <div>
            <h3 style="font-size: 1.4rem; font-weight: 700; margin-bottom: 12px;">About This Property</h3>
            <p style="color: var(--text-muted); line-height: 1.7; margin-bottom: 30px;">
              ${listing.description}
            </p>

            <h3 style="font-size: 1.3rem; font-weight: 700; margin-bottom: 16px;">Verified Amenities & Services</h3>
            <div class="amenities-grid">
              ${Object.entries(listing.amenities || {}).map(([key, val]) => `
                <div class="amenity-card">
                  <div class="amenity-icon">✓</div>
                  <div>
                    <div style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted);">${key}</div>
                    <div style="font-size: 0.9rem; font-weight: 600; color: #fff;">${val}</div>
                  </div>
                </div>
              `).join('')}
            </div>

            <!-- Verification Inspector Notes -->
            <div style="background: var(--surface-dark); border: 1px solid var(--border-color); padding: 24px; border-radius: var(--radius-lg); margin-top: 40px;">
              <h4 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 10px; display: flex; align-items: center; gap: 8px;">
                🔍 Inspector Field Notes
              </h4>
              <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.6;">
                "${listing.verificationNotes || 'Physically visited by field team. Utility connections and gated security confirmed.'}"
              </p>
              
              ${listing.isVerified ? `
                <div style="margin-top: 16px;">
                  <button class="btn-outline-verified" onclick="app.openVerificationModal('${listing.id}')">
                    Inspect 6-Step Audit Report &rarr;
                  </button>
                </div>
              ` : ''}
            </div>
          </div>

          <!-- Landlord Action Card -->
          <div>
            <div class="landlord-card">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid var(--border-color);">
                <div>
                  <div style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600;">Monthly Rent</div>
                  <div style="font-size: 2rem; font-weight: 800; color: #fff;">$${listing.priceMonthly}</div>
                </div>
                <div style="text-align: right;">
                  <div style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600;">Refundable Deposit</div>
                  <div style="font-size: 1.2rem; font-weight: 700; color: var(--accent);">$${listing.deposit}</div>
                </div>
              </div>

              <div style="margin-bottom: 24px;">
                <div style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600; margin-bottom: 6px;">Property Manager / Landlord</div>
                <div style="font-size: 1.1rem; font-weight: 700;">${listing.landlord?.name || 'Property Host'}</div>
                <div style="font-size: 0.85rem; color: var(--success); font-weight: 600;">✓ ${listing.landlord?.trustScore || 'Verified Host'}</div>
              </div>

              <div style="display: flex; flex-direction: column; gap: 12px;">
                <a href="https://wa.me/${listing.landlord?.whatsappNumber || '1234567890'}" target="_blank" class="btn-success" style="justify-content: center; padding: 12px; font-size: 0.95rem;">
                  💬 WhatsApp Host Directly
                </a>

                <a href="tel:${listing.landlord?.phone || '+1234567890'}" class="btn-secondary" style="justify-content: center; padding: 12px; font-size: 0.95rem;">
                  📞 Call Landlord Phone
                </a>
              </div>

              <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid var(--border-color); font-size: 0.8rem; color: var(--text-muted); text-align: center;">
                🔒 Zero scam guarantee. Never pay deposit money before viewing or verifying written agreement terms.
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // --- LIST ROOM VIEW RENDERER WITH LIVE CARD PREVIEW ---
  renderListRoomView() {
    return `
      <div class="container list-room-layout">
        <div>
          <div class="section-header" style="margin-bottom: 20px;">
            <div>
              <h1 class="section-title">List Your Student Accommodation</h1>
              <p class="section-desc">Fill out your property details. Our field agent will schedule a quick physical verification visit.</p>
            </div>
          </div>

          <form onsubmit="app.handleListRoomSubmit(event)" class="form-section">
            <h3 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 20px;">1. Property Overview</h3>

            <div class="form-group" style="margin-bottom: 16px;">
              <label class="form-label">Listing Title</label>
              <input type="text" id="lr-title" class="form-input" placeholder="e.g. Modern En-suite Bedsitter near Gate B" required />
            </div>

            <div class="form-grid-2" style="margin-bottom: 16px;">
              <div class="form-group">
                <label class="form-label">Target University</label>
                <select id="lr-uni" class="form-select" required>
                  ${window.UNIVERSITIES.map(u => `<option value="${u.id}">${u.name}</option>`).join('')}
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">Room Category</label>
                <select id="lr-type" class="form-select" required>
                  ${window.ROOM_TYPES.map(rt => `<option value="${rt.id}">${rt.label}</option>`).join('')}
                </select>
              </div>
            </div>

            <div class="form-grid-2" style="margin-bottom: 24px;">
              <div class="form-group">
                <label class="form-label">Monthly Rent ($)</label>
                <input type="number" id="lr-price" class="form-input" placeholder="180" min="40" max="2000" required />
              </div>

              <div class="form-group">
                <label class="form-label">Security Deposit ($)</label>
                <input type="number" id="lr-deposit" class="form-input" placeholder="180" min="0" max="2000" required />
              </div>
            </div>

            <h3 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 20px; padding-top: 16px; border-top: 1px solid var(--border-color);">2. Location & Campus Proximity</h3>

            <div class="form-group" style="margin-bottom: 16px;">
              <label class="form-label">Physical Address</label>
              <input type="text" id="lr-address" class="form-input" placeholder="e.g. 14 University Way, Gate B" required />
            </div>

            <div class="form-grid-2" style="margin-bottom: 24px;">
              <div class="form-group">
                <label class="form-label">Distance to Campus (km)</label>
                <input type="number" step="0.1" id="lr-distance" class="form-input" placeholder="0.5" required />
              </div>

              <div class="form-group">
                <label class="form-label">Walking Time (minutes)</label>
                <input type="number" id="lr-walk" class="form-input" placeholder="6" required />
              </div>
            </div>

            <h3 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 20px; padding-top: 16px; border-top: 1px solid var(--border-color);">3. Media & Host Contact</h3>

            <div class="form-group" style="margin-bottom: 16px;">
              <label class="form-label">Photo Image URL</label>
              <input type="url" id="lr-photo" class="form-input" placeholder="https://images.unsplash.com/photo-..." required />
            </div>

            <div class="form-grid-2" style="margin-bottom: 24px;">
              <div class="form-group">
                <label class="form-label">Landlord Full Name</label>
                <input type="text" id="lr-landlord-name" class="form-input" placeholder="Mr. David Miller" required />
              </div>

              <div class="form-group">
                <label class="form-label">WhatsApp Contact Number</label>
                <input type="text" id="lr-landlord-phone" class="form-input" placeholder="+1234567890" required />
              </div>
            </div>

            <button type="submit" class="btn-primary" style="width: 100%; justify-content: center; padding: 14px; font-size: 1rem;">
              Submit Listing for Verification
            </button>
          </form>
        </div>

        <!-- Live Real-Time Card Preview Sticky Panel -->
        <div>
          <div style="position: sticky; top: 96px;">
            <h3 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 14px;">Live Listing Card Preview</h3>
            <div id="live-card-preview-mount">
              ${this.renderListingCardHTML(this.livePreviewListing)}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  attachListRoomListeners() {
    const updatePreview = () => {
      const title = document.getElementById('lr-title')?.value || 'Your Room Title Preview';
      const uniId = document.getElementById('lr-uni')?.value || 'metro-state';
      const uniObj = window.UNIVERSITIES.find(u => u.id === uniId);
      const roomTypeId = document.getElementById('lr-type')?.value || 'single';
      const roomTypeObj = window.ROOM_TYPES.find(r => r.id === roomTypeId);
      const price = document.getElementById('lr-price')?.value || 150;
      const dist = document.getElementById('lr-distance')?.value || 0.5;
      const walk = document.getElementById('lr-walk')?.value || 6;
      const photo = document.getElementById('lr-photo')?.value || 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1000&q=80';

      this.livePreviewListing = {
        ...this.livePreviewListing,
        title,
        universityId: uniId,
        universityName: uniObj ? uniObj.name : 'Metro State University',
        roomType: roomTypeId,
        roomTypeLabel: roomTypeObj ? roomTypeObj.label : 'Single Room',
        priceMonthly: parseInt(price),
        distanceKm: parseFloat(dist),
        walkTimeMinutes: parseInt(walk),
        photos: [photo]
      };

      const mount = document.getElementById('live-card-preview-mount');
      if (mount) mount.innerHTML = this.renderListingCardHTML(this.livePreviewListing);
    };

    ['lr-title', 'lr-uni', 'lr-type', 'lr-price', 'lr-distance', 'lr-walk', 'lr-photo'].forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('input', updatePreview);
        el.addEventListener('change', updatePreview);
      }
    });
  }

  handleListRoomSubmit(e) {
    e.preventDefault();
    const title = document.getElementById('lr-title').value;
    const uniId = document.getElementById('lr-uni').value;
    const uniObj = window.UNIVERSITIES.find(u => u.id === uniId);
    const roomTypeId = document.getElementById('lr-type').value;
    const roomTypeObj = window.ROOM_TYPES.find(r => r.id === roomTypeId);
    const price = parseInt(document.getElementById('lr-price').value);
    const deposit = parseInt(document.getElementById('lr-deposit').value);
    const address = document.getElementById('lr-address').value;
    const dist = parseFloat(document.getElementById('lr-distance').value);
    const walk = parseInt(document.getElementById('lr-walk').value);
    const photo = document.getElementById('lr-photo').value;
    const landlordName = document.getElementById('lr-landlord-name').value;
    const landlordPhone = document.getElementById('lr-landlord-phone').value;

    const newListing = {
      id: 'lst-' + Date.now(),
      title,
      universityId: uniId,
      universityName: uniObj ? uniObj.name : 'Metro State University',
      distanceKm: dist,
      walkTimeMinutes: walk,
      roomType: roomTypeId,
      roomTypeLabel: roomTypeObj ? roomTypeObj.label : 'Single Room',
      priceMonthly: price,
      deposit: deposit,
      isVerified: false,
      isFilled: false,
      verifiedDate: null,
      locationAddress: address,
      photos: [photo],
      amenities: {
        wifi: "High-Speed Internet",
        water: "Water Supply Available",
        security: "Gated Entrance",
        power: "Prepaid Meter",
        bathroom: "Clean Facilities"
      },
      landlord: {
        name: landlordName,
        phone: landlordPhone,
        whatsappNumber: landlordPhone.replace(/[^0-9]/g, ''),
        trustScore: 'Pending Field Inspection'
      },
      description: `Newly submitted room listing located at ${address}. Pending admin verification visit.`,
      verificationNotes: 'Submitted by landlord. Field inspection visit pending.'
    };

    this.listings.unshift(newListing);
    this.saveListings();
    this.showToast('Listing submitted! Pending physical admin verification.');
    this.navigate('admin');
  }

  // --- ABOUT / SCAM PROTECTION VIEW RENDERER ---
  renderAboutView() {
    return `
      <div class="container" style="padding: 60px 0 80px;">
        <div style="text-align: center; max-width: 720px; margin: 0 auto 50px;">
          <div class="hero-badge" style="margin-bottom: 16px;">
            🛡️ Zero-Scam Student Guarantee
          </div>
          <h1 class="hero-title" style="font-size: 2.5rem;">How We Verify Student Rooms</h1>
          <p class="hero-subtitle" style="font-size: 1.05rem;">
            Student housing scams are common in online groups. UniHaven replaces fake online listings with a rigorous 6-step physical verification system.
          </p>
        </div>

        <!-- 6 Step Verification Breakdown -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px; margin-bottom: 60px;">
          ${window.VERIFICATION_CHECKLIST.map(step => `
            <div style="background: var(--surface-dark); border: 1px solid var(--border-color); padding: 28px; border-radius: var(--radius-lg);">
              <div style="display: flex; align-items: center; gap: 14px; margin-bottom: 14px;">
                <div class="step-num">${step.step}</div>
                <h3 style="font-size: 1.15rem; font-weight: 700; color: #fff;">${step.title}</h3>
              </div>
              <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.6;">${step.desc}</p>
            </div>
          `).join('')}
        </div>

        <!-- Scam Red Flags Checklist -->
        <div style="background: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: var(--radius-xl); padding: 40px;">
          <h2 style="font-size: 1.6rem; font-weight: 800; color: var(--danger); margin-bottom: 16px; display: flex; align-items: center; gap: 10px;">
            ⚠️ Student Housing Scam Red Flags
          </h2>
          <p style="color: var(--text-muted); margin-bottom: 20px;">If you search outside UniHaven, watch out for these warning signs:</p>

          <ul style="list-style: none; font-size: 0.95rem; line-height: 2; color: #fca5a5;">
            <li>❌ Landlord demands deposit upfront before you physically view the room.</li>
            <li>❌ Photos look artificially clean or copied from luxury hotels.</li>
            <li>❌ Landlord claims to be out of the country and asks for wire transfer.</li>
            <li>❌ Refusal to sign a written lease agreement with clear utility breakdown.</li>
          </ul>
        </div>
      </div>
    `;
  }

  // --- ADMIN VIEW RENDERER ---
  renderAdminView() {
    const total = this.listings.length;
    const verified = this.listings.filter(l => l.isVerified).length;
    const pending = this.listings.filter(l => !l.isVerified && !l.isFilled).length;
    const filled = this.listings.filter(l => l.isFilled).length;

    return `
      <div class="container" style="padding: 40px 0 80px;">
        <div class="section-header" style="margin-bottom: 28px;">
          <div>
            <h1 class="section-title">Admin & Verification Dashboard</h1>
            <p class="section-desc">Manage physical inspection approvals, room filled statuses, and listing removals.</p>
          </div>
          <button class="btn-primary" onclick="app.navigate('list-room')">+ Add New Listing</button>
        </div>

        <!-- Metrics Grid -->
        <div class="admin-stats-grid">
          <div class="admin-stat-card">
            <div>
              <div style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600;">Total Listings</div>
              <div style="font-size: 1.8rem; font-weight: 800; color: #fff;">${total}</div>
            </div>
            <div style="font-size: 1.5rem;">🏠</div>
          </div>

          <div class="admin-stat-card">
            <div>
              <div style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600;">Verified Active</div>
              <div style="font-size: 1.8rem; font-weight: 800; color: var(--success);">${verified}</div>
            </div>
            <div style="font-size: 1.5rem;">🛡️</div>
          </div>

          <div class="admin-stat-card">
            <div>
              <div style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600;">Pending Inspections</div>
              <div style="font-size: 1.8rem; font-weight: 800; color: var(--warning);">${pending}</div>
            </div>
            <div style="font-size: 1.5rem;">⏳</div>
          </div>

          <div class="admin-stat-card">
            <div>
              <div style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600;">Filled Units</div>
              <div style="font-size: 1.8rem; font-weight: 800; color: var(--danger);">${filled}</div>
            </div>
            <div style="font-size: 1.5rem;">🔑</div>
          </div>
        </div>

        <!-- Table Container -->
        <div class="admin-table-container">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Property Title</th>
                <th>University</th>
                <th>Rent ($/mo)</th>
                <th>Status</th>
                <th>Verification</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${this.listings.map(l => `
                <tr>
                  <td>
                    <div style="font-weight: 700; color: #fff;">${l.title}</div>
                    <div style="font-size: 0.75rem; color: var(--text-muted);">${l.locationAddress}</div>
                  </td>
                  <td>${l.universityName}</td>
                  <td style="font-weight: 700;">$${l.priceMonthly}</td>
                  <td>
                    ${l.isFilled ? `
                      <span style="background: var(--danger-light); color: var(--danger); padding: 4px 10px; border-radius: 12px; font-size: 0.75rem; font-weight: 700;">Filled</span>
                    ` : `
                      <span style="background: var(--success-light); color: var(--success); padding: 4px 10px; border-radius: 12px; font-size: 0.75rem; font-weight: 700;">Available</span>
                    `}
                  </td>
                  <td>
                    ${l.isVerified ? `
                      <span style="color: var(--success); font-weight: 700; font-size: 0.85rem;">✓ Verified</span>
                    ` : `
                      <span style="color: var(--warning); font-weight: 700; font-size: 0.85rem;">⏳ Pending</span>
                    `}
                  </td>
                  <td>
                    <div style="display: flex; align-items: center; gap: 8px;">
                      <button class="btn-secondary" style="padding: 4px 10px; font-size: 0.8rem;" 
                              onclick="app.toggleVerify('${l.id}')">
                        ${l.isVerified ? 'Unverify' : 'Approve & Verify'}
                      </button>
                      
                      <button class="btn-secondary" style="padding: 4px 10px; font-size: 0.8rem;" 
                              onclick="app.toggleFill('${l.id}')">
                        ${l.isFilled ? 'Mark Available' : 'Mark Filled'}
                      </button>

                      <button style="color: var(--danger); font-size: 0.8rem; font-weight: 600; padding: 4px 8px;" 
                              onclick="app.deleteListing('${l.id}')">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // --- ACTIONS ---
  toggleVerify(id) {
    this.listings = this.listings.map(l => {
      if (l.id === id) {
        const nextVerified = !l.isVerified;
        return {
          ...l,
          isVerified: nextVerified,
          verifiedDate: nextVerified ? new Date().toISOString().split('T')[0] : null
        };
      }
      return l;
    });
    this.saveListings();
    this.showToast('Verification status updated!');
    document.getElementById('app-view').innerHTML = this.renderAdminView();
  }

  toggleFill(id) {
    this.listings = this.listings.map(l => {
      if (l.id === id) {
        return { ...l, isFilled: !l.isFilled };
      }
      return l;
    });
    this.saveListings();
    this.showToast('Availability status updated!');
    document.getElementById('app-view').innerHTML = this.renderAdminView();
  }

  deleteListing(id) {
    if (confirm('Are you sure you want to delete this listing?')) {
      this.listings = this.listings.filter(l => l.id !== id);
      this.saveListings();
      this.showToast('Listing removed.');
      document.getElementById('app-view').innerHTML = this.renderAdminView();
    }
  }

  openVerificationModal(id) {
    const listing = this.listings.find(l => l.id === id);
    if (!listing) return;

    document.getElementById('modal-listing-title').textContent = `${listing.title} — Verified on ${listing.verifiedDate || 'Recent Audit'}`;
    
    const container = document.getElementById('modal-checklist-container');
    container.innerHTML = window.VERIFICATION_CHECKLIST.map(step => `
      <div class="checklist-step">
        <div class="step-num">✓</div>
        <div>
          <div style="font-weight: 700; font-size: 0.95rem; color: #fff; margin-bottom: 2px;">Step ${step.step}: ${step.title}</div>
          <div style="font-size: 0.85rem; color: var(--text-muted);">${step.desc}</div>
        </div>
      </div>
    `).join('');

    document.getElementById('verification-modal').classList.add('open');
  }

  closeVerificationModal() {
    document.getElementById('verification-modal').classList.remove('open');
  }

  showToast(message) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>🛡️</span> <span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, 3500);
  }
}

// Global App Instance & Initialization
window.app = new UniHavenApp();
document.addEventListener('DOMContentLoaded', () => {
  window.app.init();
});

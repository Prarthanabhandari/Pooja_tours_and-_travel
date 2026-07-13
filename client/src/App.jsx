import React, { useState, useEffect } from 'react';

// Import Modular Components
import Header from './components/Header';
import PoojaLanding from './components/PoojaLanding';
import WhyChooseUs from './components/WhyChooseUs';
import PopularPackages from './components/PopularPackages';
import HowItWorks from './components/HowItWorks';
import FleetSection from './components/FleetSection';
import Footer from './components/Footer';
import Reviews from './components/Reviews';
import FAQs from './components/FAQs';

// API Base URL - points to our Express server
const API_URL = 'http://localhost:5000/api';

// --- MOCK DATA FOR FRONTEND OFFLINE FALLBACK ---
const MOCK_CABS = [
  { id: 1, type: 'Hatchback', name: 'Maruti Suzuki WagonR', price_per_km: 11, seating_capacity: 4, image: '🚗' },
  { id: 2, type: 'SUV', name: 'Maruti Suzuki Brezza', price_per_km: 14, seating_capacity: 4, image: '🚘' },
  { id: 3, type: 'Bus', name: 'Pooja Luxury Traveler (17-seater)', price_per_km: 22, seating_capacity: 17, image: '🚌' }
];

const MOCK_BUSES = [
  { id: 1, name: 'Pooja Travels Luxury Coach 1', type: '17-Seater AC Luxury', total_seats: 17, price_per_seat: 750, departure_time: '06:00 AM', arrival_time: '10:00 AM', route_from: 'Pune, Maharashtra, India', route_to: 'Mumbai, Maharashtra, India' },
  { id: 2, name: 'Pooja Travels Luxury Coach 2', type: '17-Seater AC Luxury', total_seats: 17, price_per_seat: 600, departure_time: '07:30 AM', arrival_time: '11:30 AM', route_from: 'Pune, Maharashtra, India', route_to: 'Mahabaleshwar, Maharashtra, India' },
  { id: 3, name: 'Pooja Travels Luxury Coach 3', type: '17-Seater AC Luxury', total_seats: 17, price_per_seat: 700, departure_time: '08:00 AM', arrival_time: '01:30 PM', route_from: 'Pune, Maharashtra, India', route_to: 'Shirdi, Maharashtra, India' }
];

const POPULAR_PACKAGES = [
  { id: 1, title: 'Pune to Shirdi Darshan', type: 'Bus & Cab options', desc: 'Complete round trip package for Sai Baba Darshan, includes flexible timing.', price: '₹2,400 onwards', image: '🕌' },
  { id: 2, title: 'Pune to Mahabaleshwar Scenic Tour', type: 'Weekend Getaway', desc: 'Enjoy scenic viewpoints, strawberry farms, and Mapro garden trip.', price: '₹3,500 onwards', image: '🍓' },
  { id: 3, title: 'Mumbai Airport Drops', type: 'Assured Cab Drops', desc: 'Punctual, clean sedan or SUV drops direct to T2 airport terminal.', price: '₹2,200 fixed', image: '✈️' },
  { id: 4, title: 'Ashtavinayak Yatra Package', type: '8 Ganesha Temples', desc: '2-day custom bus/cab spiritual package covering all 8 holy sites.', price: '₹8,500 total', image: '🪔' }
];

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [theme, setTheme] = useState('dark');
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
  
  // Auth & Booking States
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('pooja_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('pooja_token') || '');
  const [bookings, setBookings] = useState([]);
  
  // Search States
  const [searchParams, setSearchParams] = useState({
    bookingType: 'cab', // 'cab' or 'bus'
    tripType: 'oneway', // 'oneway', 'roundtrip', 'multicity', 'local'
    fromCity: '',
    toCity: '',
    date: '',
    returnDate: '',
    pickupTime: '',
    durationHours: '8' // for local
  });

  const [searchResults, setSearchResults] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null); // Selected Bus or Cab type for booking
  const [bookingStep, setBookingStep] = useState(1); // 1: Search, 2: Vehicle Select, 3: Details & Seats, 4: Payment, 5: Ticket
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [passengerDetails, setPassengerDetails] = useState([{ name: '', age: '', gender: 'Male' }]);
  const [paymentData, setPaymentData] = useState({ number: '', name: '', expiry: '', cvc: '', focus: 'front' });
  const [activeTicket, setActiveTicket] = useState(null);
  
  // Contact & general state
  const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [contactSuccess, setContactSuccess] = useState(false);
  
  // Sync page theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Handle PWA installation trigger
  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the PWA install prompt');
        }
        setDeferredPrompt(null);
      });
    }
  };

  // Fetch bookings whenever user logs in
  useEffect(() => {
    if (currentUser) {
      fetchUserBookings();
    } else {
      // Offline fallback: load guest bookings from localStorage
      const guestBookings = JSON.parse(localStorage.getItem('guest_bookings') || '[]');
      setBookings(guestBookings);
    }
  }, [currentUser]);

  const fetchUserBookings = async () => {
    try {
      const res = await fetch(`${API_URL}/bookings/user/${currentUser.id}`);
      if (res.ok) {
        const data = await res.json();
        setBookings(data);
      }
    } catch (err) {
      console.warn('API error fetching user bookings, loading from local storage mock');
      const localData = JSON.parse(localStorage.getItem(`user_bookings_${currentUser?.id}`) || '[]');
      setBookings(localData);
    }
  };

  // Search Action
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (!searchParams.fromCity || !searchParams.toCity) {
      alert('Please fill out From and To cities.');
      return;
    }
    
    if (searchParams.bookingType === 'bus') {
      try {
        const res = await fetch(`${API_URL}/buses/search?from=${encodeURIComponent(searchParams.fromCity)}&to=${encodeURIComponent(searchParams.toCity)}`);
        if (res.ok) {
          const data = await res.json();
          setSearchResults(data.length > 0 ? data : MOCK_BUSES);
        } else {
          setSearchResults(MOCK_BUSES);
        }
      } catch (err) {
        setSearchResults(MOCK_BUSES);
      }
    } else {
      // Cab booking searches cabs and requests estimates
      try {
        const res = await fetch(`${API_URL}/cabs`);
        if (res.ok) {
          const cabs = await res.json();
          setSearchResults(cabs.length > 0 ? cabs : MOCK_CABS);
        } else {
          setSearchResults(MOCK_CABS);
        }
      } catch (err) {
        setSearchResults(MOCK_CABS);
      }
    }
    setBookingStep(2);
    setCurrentPage('booking-flow');
  };

  // Book Item
  const handleSelectItem = (item) => {
    setSelectedItem(item);
    setBookingStep(3);
  };

  // Add Passenger
  const addPassenger = () => {
    setPassengerDetails([...passengerDetails, { name: '', age: '', gender: 'Male' }]);
  };

  // Remove Passenger
  const removePassenger = (index) => {
    if (passengerDetails.length === 1) return;
    setPassengerDetails(passengerDetails.filter((_, i) => i !== index));
  };

  // Payment flip logic
  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData({ ...paymentData, [name]: value });
  };

  // Submit Booking
  const handleCompleteBooking = async (e) => {
    e.preventDefault();
    
    let totalAmount = 0;
    if (searchParams.bookingType === 'bus') {
      totalAmount = selectedItem.price_per_seat * selectedSeats.length;
    } else {
      // Estimate cab fare
      const basePrice = selectedItem.price_per_km || 13;
      const distance = 150; // Pune-Mumbai approximation
      totalAmount = (distance * basePrice) + 250; // + 250 driver allowance
    }

    const bookingPayload = {
      user_id: currentUser ? currentUser.id : null,
      booking_type: searchParams.bookingType,
      cab_id: searchParams.bookingType === 'cab' ? selectedItem.id : null,
      bus_id: searchParams.bookingType === 'bus' ? selectedItem.id : null,
      route_from: searchParams.fromCity,
      route_to: searchParams.toCity,
      travel_date: searchParams.date || new Date().toISOString().split('T')[0],
      departure_time: searchParams.bookingType === 'bus' ? selectedItem.departure_time : '09:00:00',
      amount: totalAmount,
      seats_selected: searchParams.bookingType === 'bus' ? selectedSeats : null,
      passenger_details: passengerDetails
    };

    try {
      const res = await fetch(`${API_URL}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingPayload)
      });

      if (res.ok) {
        const data = await res.json();
        setActiveTicket(data);
        fetchUserBookings();
      } else {
        throw new Error('Booking failed');
      }
    } catch (err) {
      console.warn('Backend server unreachable, creating booking in localStorage');
      // Create local mock booking
      const newLocalBooking = {
        id: Math.floor(Math.random() * 10000) + 1,
        ...bookingPayload,
        status: 'confirmed',
        created_at: new Date().toISOString(),
        vehicle_name: searchParams.bookingType === 'bus' ? selectedItem.name : `${selectedItem.name} (${selectedItem.type})`
      };
      
      setActiveTicket(newLocalBooking);
      
      // Save
      if (currentUser) {
        const currentLocal = JSON.parse(localStorage.getItem(`user_bookings_${currentUser.id}`) || '[]');
        currentLocal.unshift(newLocalBooking);
        localStorage.setItem(`user_bookings_${currentUser.id}`, JSON.stringify(currentLocal));
        setBookings(currentLocal);
      } else {
        const guestBookings = JSON.parse(localStorage.getItem('guest_bookings') || '[]');
        guestBookings.unshift(newLocalBooking);
        localStorage.setItem('guest_bookings', JSON.stringify(guestBookings));
        setBookings(guestBookings);
      }
    }
    
    setBookingStep(5);
  };

  // Cancel Booking
  const handleCancelBooking = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;
    try {
      const res = await fetch(`${API_URL}/bookings/cancel/${id}`, { method: 'PUT' });
      if (res.ok) {
        alert('Booking cancelled successfully.');
        fetchUserBookings();
      }
    } catch (err) {
      console.warn('API error cancelling booking, performing locally');
      // Update local storage
      const updateList = (list) => list.map(b => b.id === id ? { ...b, status: 'cancelled' } : b);
      if (currentUser) {
        const currentLocal = JSON.parse(localStorage.getItem(`user_bookings_${currentUser.id}`) || '[]');
        const updated = updateList(currentLocal);
        localStorage.setItem(`user_bookings_${currentUser.id}`, JSON.stringify(updated));
      } else {
        const guestBookings = JSON.parse(localStorage.getItem('guest_bookings') || '[]');
        const updated = updateList(guestBookings);
        localStorage.setItem('guest_bookings', JSON.stringify(updated));
      }
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'cancelled' } : b));
      alert('Booking cancelled successfully.');
    }
  };

  // Auth triggers
  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    const endpoint = authMode === 'login' ? 'login' : 'register';
    const email = e.target.email.value;
    const password = e.target.password.value;
    const name = authMode === 'register' ? e.target.name.value : '';
    const phone = authMode === 'register' ? e.target.phone.value : '';

    try {
      const res = await fetch(`${API_URL}/auth/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, phone })
      });
      const data = await res.json();
      if (res.ok) {
        setCurrentUser(data.user);
        setToken(data.token);
        localStorage.setItem('pooja_user', JSON.stringify(data.user));
        localStorage.setItem('pooja_token', data.token);
        setShowAuthModal(false);
      } else {
        alert(data.message || 'Authentication failed');
      }
    } catch (err) {
      console.warn('Authentication server down, using simulated credentials');
      // Simulate registration/login
      const mockUser = { id: 99, name: name || 'Demo Traveler', email, phone: phone || '9999999999', role: 'user' };
      setCurrentUser(mockUser);
      setToken('mock_local_jwt');
      localStorage.setItem('pooja_user', JSON.stringify(mockUser));
      localStorage.setItem('pooja_token', 'mock_local_jwt');
      setShowAuthModal(false);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setToken('');
    localStorage.removeItem('pooja_user');
    localStorage.removeItem('pooja_token');
    setCurrentPage('home');
  };

  // Contact inquiry
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm)
      });
      if (res.ok) {
        setContactSuccess(true);
        setContactForm({ name: '', email: '', phone: '', message: '' });
      }
    } catch (err) {
      console.warn('Server offline, saving inquiry locally');
      setContactSuccess(true);
      setContactForm({ name: '', email: '', phone: '', message: '' });
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* HEADER SECTION */}
      {currentPage !== 'home' && currentPage !== 'admin' && (
        <Header 
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          currentUser={currentUser}
          handleLogout={handleLogout}
          setShowAuthModal={setShowAuthModal}
          setAuthMode={setAuthMode}
        />
      )}

      {/* DYNAMIC PAGES CONTAINER */}
      <main style={{ flex: 1, paddingBottom: '60px' }}>
        
        {/* PAGE: HOME */}
        {currentPage === 'home' && (
          <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', width: '100%' }}>
            <PoojaLanding 
              currentPage={currentPage}
              searchParams={searchParams}
              setSearchParams={setSearchParams}
              handleSearchSubmit={handleSearchSubmit}
              setCurrentPage={setCurrentPage}
              setShowAuthModal={setShowAuthModal}
              setAuthMode={setAuthMode}
              currentUser={currentUser}
              handleLogout={handleLogout}
            />
            <FleetSection 
              searchParams={searchParams}
              setSearchParams={setSearchParams}
            />
            <WhyChooseUs />
            <PopularPackages 
              searchParams={searchParams}
              setSearchParams={setSearchParams}
            />
            <HowItWorks />
            <Reviews />
            <FAQs />
          </div>
        )}

        {/* PAGE: ABOUT US */}
        {currentPage === 'about' && (
          <div className="container animate-fade" style={{ paddingTop: '50px' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '20px', textAlign: 'center' }}>About <span style={{ color: 'var(--primary)' }}>Pooja Tours & Travels</span></h2>
            <p style={{ color: 'var(--text-muted)', textAlign: 'center', maxWidth: '700px', margin: '0 auto 40px auto', lineHeight: '1.6' }}>
              Established with a goal to offer the safest, most reliable outstation taxi and bus rentals in Maharashtra. Our clients love our clean cars and professional driver standards.
            </p>
            <div className="grid-cols-2">
              <div className="glass-panel">
                <h3 style={{ color: 'var(--primary)', marginBottom: '15px' }}>Our Mission</h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '20px' }}>
                  We aim to redefine travel comfort. Whether you are traveling for a spiritual visit to Shirdi, catching a flight at Mumbai Airport, or organizing a family group tour in our traveler buses, we guarantee a punctual, stress-free trip.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div style={{ borderLeft: '3px solid var(--primary)', paddingLeft: '12px' }}>
                    <h4 style={{ fontSize: '1.8rem', color: 'var(--text-main)' }}>12+</h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Years Experience</p>
                  </div>
                  <div style={{ borderLeft: '3px solid var(--primary)', paddingLeft: '12px' }}>
                    <h4 style={{ fontSize: '1.8rem', color: 'var(--text-main)' }}>15,000+</h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Happy Clients</p>
                  </div>
                </div>
              </div>
              <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'linear-gradient(135deg, rgba(0, 242, 254, 0.05), rgba(79, 172, 254, 0.05))' }}>
                <h3 style={{ marginBottom: '12px' }}>Our Core Standards</h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--text-muted)' }}>
                  <li>✅ Vetted Drivers with excellent route knowledge</li>
                  <li>✅ Regularly sanitized, fully air-conditioned vehicles</li>
                  <li>✅ Instant booking confirmations & digital receipts</li>
                  <li>✅ 24/7 client helpline for emergency support</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* PAGE: PACKAGES */}
        {currentPage === 'packages' && (
          <div className="container animate-fade" style={{ paddingTop: '50px' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '20px', textAlign: 'center' }}>Popular Outstation <span style={{ color: 'var(--primary)' }}>Tour Packages</span></h2>
            <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginBottom: '40px' }}>Select from our highly requested fixed packages with special discounts.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' }}>
              {POPULAR_PACKAGES.map(p => (
                <div key={p.id} className="glass-panel" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ fontSize: '3rem', display: 'block', marginBottom: '12px' }}>{p.image}</span>
                    <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--primary)', fontWeight: 700 }}>{p.type}</span>
                    <h3 style={{ fontSize: '1.25rem', marginTop: '6px', marginBottom: '10px' }}>{p.title}</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.5', marginBottom: '20px' }}>{p.desc}</p>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-light)', paddingTop: '15px' }}>
                    <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary)' }}>{p.price}</span>
                    <button 
                      onClick={() => {
                        setSearchParams({
                          ...searchParams,
                          fromCity: 'Pune, Maharashtra, India',
                          toCity: p.title.includes('Shirdi') ? 'Shirdi, Maharashtra, India' : p.title.includes('Mahabaleshwar') ? 'Mahabaleshwar, Maharashtra, India' : 'Mumbai Airport, Maharashtra, India'
                        });
                        setCurrentPage('home');
                        setTimeout(() => document.getElementById('search-panel')?.scrollIntoView({ behavior: 'smooth' }), 100);
                      }} 
                      className="btn-primary" 
                      style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PAGE: GALLERY */}
        {currentPage === 'gallery' && (
          <div className="container animate-fade" style={{ paddingTop: '50px' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '15px', textAlign: 'center' }}>Explore <span style={{ color: 'var(--primary)' }}>Our Actual Fleet</span></h2>
            <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginBottom: '45px' }}>Photos of our premium Force Traveller coaches and cabs, ready for your next journey.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px' }}>
              {[
                { id: 1, name: 'Pooja Luxury Force Traveller (17-Seater)', type: '17-Seater AC Luxury Coach', image_url: '/bus_fleet.jpg', desc: 'Our complete fleet of three matching luxury coaches, fully equipped with individual AC vents and reclining seats.' },
                { id: 2, name: 'Krishiv Travels Coach (Side Profile)', type: '17-Seater AC Luxury Coach', image_url: '/bus_side.jpg', desc: 'Comfortable outstation drops and airport runs. Regular sanitization and luggage carrier attached.' },
                { id: 3, name: 'Krishiv Travels Coach (Front Angle)', type: '17-Seater AC Luxury Coach', image_url: '/bus_front.jpg', desc: 'Premium LED headlamps and absolute safety tracking systems installed for family tours.' },
                { id: 4, name: 'Krishiv Travels Coach (Scenic Tour)', type: '17-Seater AC Luxury Coach', image_url: '/bus_tree.jpg', desc: 'Ready for spiritual yatras to Shirdi or weekend excursions in Mahabaleshwar.' }
              ].map(fleetItem => (
                <div key={fleetItem.id} className="glass-panel" style={{ display: 'flex', flexDirection: 'column', padding: '16px', overflow: 'hidden' }}>
                  <img 
                    src={fleetItem.image_url} 
                    alt={fleetItem.name} 
                    style={{ 
                      width: '100%', 
                      height: '200px', 
                      objectFit: 'cover', 
                      borderRadius: '8px', 
                      marginBottom: '16px',
                      border: '1px solid var(--border-light)'
                    }} 
                  />
                  <span style={{
                    alignSelf: 'flex-start',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    background: 'rgba(37, 99, 235, 0.08)',
                    fontSize: '0.75rem',
                    color: 'var(--primary)',
                    fontWeight: 700,
                    marginBottom: '10px'
                  }}>{fleetItem.type}</span>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>{fleetItem.name}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: '1.5', flex: 1, marginBottom: '16px' }}>{fleetItem.desc}</p>
                  
                  <button 
                    onClick={() => {
                      setSearchParams({
                        ...searchParams,
                        bookingType: 'bus'
                      });
                      setCurrentPage('home');
                      setTimeout(() => document.getElementById('search-panel')?.scrollIntoView({ behavior: 'smooth' }), 100);
                    }}
                    className="btn-primary" 
                    style={{ width: '100%', justifyContent: 'center', padding: '10px 0', fontSize: '0.85rem' }}
                  >
                    Request Booking Enquiry
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PAGE: TESTIMONIALS */}
        {currentPage === 'testimonials' && (
          <div className="container animate-fade" style={{ paddingTop: '50px', maxWidth: '800px' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '40px', textAlign: 'center' }}>Reviews from <span style={{ color: 'var(--primary)' }}>Our Travelers</span></h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
              {[
                { name: 'Amit Sharma', role: 'Outstation Traveler', text: 'We booked the Toyota Innova for our Shirdi family trip. The driver was extremely professional and polite, and the car was clean. Highly recommended service!' },
                { name: 'Priya Patel', role: 'Regular Airport Dropper', text: 'Pooja Travels is my go-to for Mumbai airport drop-offs. Always on time, clean sedans, and peaceful driving. A+' },
                { name: 'Rajesh Shinde', role: 'Group Tour Organizer', text: 'Rented their 17-seater traveler bus for a corporate trip to Mahabaleshwar. Extremely smooth booking process and comfortable seating.' }
              ].map((t, idx) => (
                <div key={idx} className="glass-panel" style={{ position: 'relative' }}>
                  <span style={{ fontSize: '4rem', color: 'rgba(0, 242, 254, 0.1)', position: 'absolute', top: '10px', left: '20px', pointerEvents: 'none' }}>“</span>
                  <p style={{ fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '15px', position: 'relative', zIndex: 1, paddingLeft: '20px' }}>{t.text}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingLeft: '20px' }}>
                    <div>
                      <h4 style={{ fontSize: '1rem', color: 'var(--primary)' }}>{t.name}</h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t.role}</p>
                    </div>
                    <span style={{ color: 'var(--warning)' }}>⭐⭐⭐⭐⭐</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PAGE: CONTACT US */}
        {currentPage === 'contact' && (
          <div className="container animate-fade" style={{ paddingTop: '50px' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '40px', textAlign: 'center' }}>Get In <span style={{ color: 'var(--primary)' }}>Touch</span></h2>
            <div className="grid-cols-2">
              <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div>
                  <h3 style={{ color: 'var(--primary)', marginBottom: '10px' }}>Our Office</h3>
                  <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
                    Pooja Tours and Travels<br />
                    Tingre Nagar, Vishrantwadi,<br />
                    Pune, Maharashtra - 411015
                  </p>
                </div>
                <div>
                  <h3 style={{ color: 'var(--primary)', marginBottom: '10px' }}>Direct Hotlines</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', fontWeight: 600 }}>📞 +91 73871 29287 / +91 96233 24139</p>
                  <p style={{ color: 'var(--text-muted)' }}>✉️ booking@poojatravels.com</p>
                </div>
                <div>
                  <h3 style={{ color: 'var(--primary)', marginBottom: '10px' }}>Office Hours</h3>
                  <p style={{ color: 'var(--text-muted)' }}>Monday - Sunday: 08:00 AM - 09:00 PM</p>
                </div>
              </div>

              <div className="glass-panel">
                {contactSuccess ? (
                  <div style={{ textAlign: 'center', padding: '30px' }}>
                    <span style={{ fontSize: '3.5rem', display: 'block', marginBottom: '16px' }}>✅</span>
                    <h3 style={{ color: 'var(--primary)', marginBottom: '10px' }}>Thank You!</h3>
                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.5' }}>Your booking inquiry has been recorded. Our team will verify rates and call you shortly.</p>
                    <button onClick={() => setContactSuccess(false)} className="btn-secondary" style={{ marginTop: '20px' }}>Send Another Inquiry</button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit}>
                    <h3 style={{ marginBottom: '20px' }}>Send Booking Inquiry</h3>
                    <div className="form-group">
                      <label className="form-label">Full Name</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        value={contactForm.name} 
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })} 
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email Address</label>
                      <input 
                        type="email" 
                        className="form-input" 
                        value={contactForm.email} 
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })} 
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Mobile Number</label>
                      <input 
                        type="tel" 
                        className="form-input" 
                        value={contactForm.phone} 
                        onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })} 
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Message / Details</label>
                      <textarea 
                        rows="3" 
                        className="form-input" 
                        style={{ resize: 'none' }}
                        value={contactForm.message} 
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })} 
                        required
                        placeholder="Mention route details, dates, and number of passengers..."
                      />
                    </div>
                    <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                      📨 Submit Message
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}

        {/* PAGE: BOOKINGS DASHBOARD */}
        {currentPage === 'dashboard' && (
          <div className="container animate-fade" style={{ paddingTop: '50px' }}>
            <h2 style={{ fontSize: '2.2rem', marginBottom: '10px' }}>Travel <span style={{ color: 'var(--primary)' }}>Dashboard</span></h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>Welcome back, {currentUser?.name}. Manage your trips here.</p>
            
            <div className="glass-panel" style={{ overflowX: 'auto' }}>
              <h3 style={{ marginBottom: '20px' }}>Your Travel History</h3>
              {bookings.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                  <p>You don't have any bookings yet.</p>
                  <button onClick={() => setCurrentPage('home')} className="btn-primary" style={{ marginTop: '16px' }}>Book a Ride</button>
                </div>
              ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border-light)', color: 'var(--text-muted)' }}>
                      <th style={{ padding: '12px' }}>Route</th>
                      <th style={{ padding: '12px' }}>Travel Date</th>
                      <th style={{ padding: '12px' }}>Type</th>
                      <th style={{ padding: '12px' }}>Vehicle/Bus</th>
                      <th style={{ padding: '12px' }}>Amount</th>
                      <th style={{ padding: '12px' }}>Status</th>
                      <th style={{ padding: '12px' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map(b => (
                      <tr key={b.id} style={{ borderBottom: '1px solid var(--border-light)', verticalAlign: 'middle' }}>
                        <td style={{ padding: '16px 12px', fontWeight: 600 }}>{b.route_from.split(',')[0]} ➡️ {b.route_to.split(',')[0]}</td>
                        <td style={{ padding: '12px' }}>{b.travel_date.split('T')[0]}</td>
                        <td style={{ padding: '12px' }}><span style={{ textTransform: 'uppercase', fontSize: '0.8rem' }}>{b.booking_type}</span></td>
                        <td style={{ padding: '12px', color: 'var(--text-muted)' }}>{b.vehicle_name || 'Assigned Ride'}</td>
                        <td style={{ padding: '12px', fontWeight: 700, color: 'var(--primary)' }}>₹{b.amount}</td>
                        <td style={{ padding: '12px' }}>
                          <span style={{
                            padding: '4px 10px',
                            borderRadius: '12px',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            background: b.status === 'confirmed' ? 'rgba(0, 230, 118, 0.15)' : 'rgba(255, 23, 68, 0.15)',
                            color: b.status === 'confirmed' ? 'var(--success)' : 'var(--error)'
                          }}>{b.status}</span>
                        </td>
                        <td style={{ padding: '12px', display: 'flex', gap: '10px' }}>
                          <button 
                            onClick={() => {
                              setActiveTicket(b);
                              setBookingStep(5);
                              setCurrentPage('booking-flow');
                            }} 
                            style={{ color: 'var(--primary)', cursor: 'pointer', fontSize: '0.85rem' }}
                          >
                            👁️ View Ticket
                          </button>
                          {b.status === 'confirmed' && (
                            <button 
                              onClick={() => handleCancelBooking(b.id)} 
                              style={{ color: 'var(--accent)', cursor: 'pointer', fontSize: '0.85rem' }}
                            >
                              Cancel
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* BOOKING FLOW PAGES */}
        {currentPage === 'booking-flow' && (
          <div className="container animate-fade" style={{ paddingTop: '40px', maxWidth: '700px' }}>
            
            {/* Step indicators */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '15px', left: 0, width: '100%', height: '2px', background: 'var(--border-light)', zIndex: 1 }}></div>
              {[1, 2, 3, 4, 5].map(step => (
                <div 
                  key={step} 
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: bookingStep >= step ? 'var(--primary)' : 'var(--bg-dark)',
                    border: '2px solid',
                    borderColor: bookingStep >= step ? 'var(--primary)' : 'var(--border-light)',
                    color: bookingStep >= step ? '#000' : 'var(--text-muted)',
                    zIndex: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.85rem'
                  }}
                >
                  {step}
                </div>
              ))}
            </div>

            {/* STEP 2: RIDE SELECTION */}
            {bookingStep === 2 && (
              <div className="glass-panel">
                <h3 style={{ marginBottom: '20px' }}>Select Your Ride</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {searchResults && searchResults.map((item) => {
                    let priceText = '';
                    let detailsText = '';
                    if (searchParams.bookingType === 'bus') {
                      priceText = `₹${item.price_per_seat} / seat`;
                      detailsText = `Departure: ${item.departure_time} | Type: ${item.type}`;
                    } else {
                      // Cab estimate calculation
                      const basePrice = item.price_per_km || 13;
                      const distance = 150; // Pune-Mumbai approximation
                      const estFare = (distance * basePrice) + 250;
                      priceText = `₹${estFare} estimated`;
                      detailsText = `₹${basePrice}/km + ₹250 Driver allowance`;
                    }

                    return (
                      <div 
                        key={item.id} 
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '20px',
                          background: 'rgba(255,255,255,0.02)',
                          border: '1px solid var(--border-light)',
                          borderRadius: '8px'
                        }}
                      >
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{ fontSize: '2rem' }}>{item.image || (searchParams.bookingType === 'bus' ? '🚌' : '🚗')}</span>
                            <h4 style={{ margin: 0 }}>{item.name}</h4>
                          </div>
                          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '6px' }}>{detailsText}</p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <span style={{ display: 'block', fontSize: '1.25rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '8px' }}>{priceText}</span>
                          <button onClick={() => handleSelectItem(item)} className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>Select</button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 3: DETAILS & SEAT MAP */}
            {bookingStep === 3 && (
              <div className="glass-panel">
                <h3 style={{ marginBottom: '20px' }}>Traveler Details</h3>
                
                {/* Seat Map for Bus Bookings */}
                {searchParams.bookingType === 'bus' && (
                  <div style={{ marginBottom: '30px', textAlign: 'center' }}>
                    <h4 style={{ marginBottom: '16px' }}>Select Seats</h4>
                    <div className="seat-grid" style={{ marginBottom: '15px' }}>
                      {Array.from({ length: 20 }, (_, i) => {
                        const seatId = `S${i + 1}`;
                        const isBooked = i === 3 || i === 8 || i === 14; // Mock bookings
                        const isSelected = selectedSeats.includes(seatId);
                        return (
                          <button
                            key={seatId}
                            type="button"
                            className={`seat ${isBooked ? 'booked' : ''} ${isSelected ? 'selected' : ''}`}
                            onClick={() => {
                              if (isBooked) return;
                              setSelectedSeats(prev => 
                                prev.includes(seatId) ? prev.filter(s => s !== seatId) : [...prev, seatId]
                              );
                            }}
                            disabled={isBooked}
                          >
                            {seatId}
                          </button>
                        );
                      })}
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Selected Seats: <strong style={{ color: 'var(--primary)' }}>{selectedSeats.join(', ') || 'None'}</strong></p>
                  </div>
                )}

                {/* Passenger Form */}
                <form onSubmit={(e) => {
                  e.preventDefault();
                  if (searchParams.bookingType === 'bus' && selectedSeats.length === 0) {
                    alert('Please select at least one seat.');
                    return;
                  }
                  setBookingStep(4);
                }}>
                  {passengerDetails.map((passenger, idx) => (
                    <div key={idx} style={{
                      padding: '16px',
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid var(--border-light)',
                      borderRadius: '8px',
                      marginBottom: '16px'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                        <span style={{ fontWeight: 600, color: 'var(--primary)' }}>Passenger #{idx + 1}</span>
                        {passengerDetails.length > 1 && (
                          <button type="button" onClick={() => removePassenger(idx)} style={{ color: 'var(--accent)', cursor: 'pointer', fontSize: '0.85rem' }}>Remove</button>
                        )}
                      </div>
                      
                      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '10px' }}>
                        <input 
                          type="text" 
                          placeholder="Name" 
                          className="form-input" 
                          value={passenger.name}
                          onChange={(e) => {
                            const newDetails = [...passengerDetails];
                            newDetails[idx].name = e.target.value;
                            setPassengerDetails(newDetails);
                          }}
                          required
                        />
                        <input 
                          type="number" 
                          placeholder="Age" 
                          className="form-input" 
                          value={passenger.age}
                          onChange={(e) => {
                            const newDetails = [...passengerDetails];
                            newDetails[idx].age = e.target.value;
                            setPassengerDetails(newDetails);
                          }}
                          required
                        />
                        <select 
                          className="form-input" 
                          value={passenger.gender}
                          onChange={(e) => {
                            const newDetails = [...passengerDetails];
                            newDetails[idx].gender = e.target.value;
                            setPassengerDetails(newDetails);
                          }}
                        >
                          <option>Male</option>
                          <option>Female</option>
                          <option>Other</option>
                        </select>
                      </div>
                    </div>
                  ))}

                  <button type="button" onClick={addPassenger} className="btn-secondary" style={{ width: '100%', marginBottom: '20px' }}>
                    ➕ Add Passenger
                  </button>

                  <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                    Proceed to Payment
                  </button>
                </form>
              </div>
            )}

            {/* STEP 4: MOCK PAYMENT & CARD FLIP */}
            {bookingStep === 4 && (
              <div className="glass-panel">
                <h3 style={{ marginBottom: '20px', textAlign: 'center' }}>Secure Checkout</h3>

                {/* Animated credit card */}
                <div className="card-wrapper">
                  <div className={`payment-card ${paymentData.focus === 'back' ? 'flipped' : ''}`}>
                    <div className="card-front">
                      <span style={{ fontSize: '1.5rem', fontWeight: 800, fontStyle: 'italic' }}>POOJA TRAVELS</span>
                      <span style={{ fontSize: '1.25rem', letterSpacing: '3px', margin: '20px 0', fontFamily: 'monospace' }}>
                        {paymentData.number || '•••• •••• •••• ••••'}
                      </span>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                          <p style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Card Holder</p>
                          <p style={{ fontSize: '0.85rem' }}>{paymentData.name || 'FULL NAME'}</p>
                        </div>
                        <div>
                          <p style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Expires</p>
                          <p style={{ fontSize: '0.85rem' }}>{paymentData.expiry || 'MM/YY'}</p>
                        </div>
                      </div>
                    </div>
                    <div className="card-back">
                      <div className="card-strip"></div>
                      <div className="card-signature">
                        {paymentData.cvc || 'CVC'}
                      </div>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleCompleteBooking}>
                  <div className="form-group">
                    <label className="form-label">Card Number</label>
                    <input 
                      type="text" 
                      name="number"
                      maxLength="19"
                      placeholder="4111 2222 3333 4444"
                      className="form-input" 
                      value={paymentData.number}
                      onChange={handleCardInputChange}
                      onFocus={() => setPaymentData({ ...paymentData, focus: 'front' })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Card Holder Name</label>
                    <input 
                      type="text" 
                      name="name"
                      placeholder="John Doe"
                      className="form-input" 
                      value={paymentData.name}
                      onChange={handleCardInputChange}
                      onFocus={() => setPaymentData({ ...paymentData, focus: 'front' })}
                      required
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                    <div className="form-group">
                      <label className="form-label">Expiry Date</label>
                      <input 
                        type="text" 
                        name="expiry"
                        placeholder="MM/YY"
                        maxLength="5"
                        className="form-input" 
                        value={paymentData.expiry}
                        onChange={handleCardInputChange}
                        onFocus={() => setPaymentData({ ...paymentData, focus: 'front' })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">CVC / CVV</label>
                      <input 
                        type="password" 
                        name="cvc"
                        placeholder="•••"
                        maxLength="3"
                        className="form-input" 
                        value={paymentData.cvc}
                        onChange={handleCardInputChange}
                        onFocus={() => setPaymentData({ ...paymentData, focus: 'back' })}
                        required
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}>
                    💳 Pay & Confirm Booking
                  </button>
                </form>
              </div>
            )}

            {/* STEP 5: TICKET SUMMARY & MOCK QR */}
            {bookingStep === 5 && activeTicket && (
              <div className="glass-panel" style={{ border: '2px dashed var(--primary)', padding: '30px' }}>
                <div style={{ textAlign: 'center', borderBottom: '1px dashed var(--border-light)', paddingBottom: '20px', marginBottom: '20px' }}>
                  <span style={{ fontSize: '2.5rem' }}>🎟️</span>
                  <h3 style={{ color: 'var(--primary)', marginTop: '8px' }}>Booking Confirmed</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Thank you for choosing Pooja Tours & Travels!</p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', color: 'var(--text-muted)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Ticket ID:</span>
                    <strong style={{ color: '#fff' }}>#PJ-{activeTicket.id}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Route:</span>
                    <strong style={{ color: '#fff' }}>{activeTicket.route_from.split(',')[0]} ➡️ {activeTicket.route_to.split(',')[0]}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Vehicle:</span>
                    <strong style={{ color: '#fff' }}>{activeTicket.vehicle_name || 'Assigned Cab'}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Travel Date:</span>
                    <strong style={{ color: '#fff' }}>{activeTicket.travel_date.split('T')[0]}</strong>
                  </div>
                  {activeTicket.seats_selected && (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Seats:</span>
                      <strong style={{ color: 'var(--primary)' }}>{activeTicket.seats_selected.join(', ')}</strong>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Total Amount:</span>
                    <strong style={{ color: 'var(--primary)', fontSize: '1.2rem' }}>₹{activeTicket.amount}</strong>
                  </div>
                </div>

                {/* Mock QR Code SVG */}
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px', marginBottom: '20px' }}>
                  <svg width="120" height="120" viewBox="0 0 100 100" style={{ background: '#fff', padding: '10px', borderRadius: '8px' }}>
                    <rect x="0" y="0" width="20" height="20" fill="#000" />
                    <rect x="5" y="5" width="10" height="10" fill="#fff" />
                    <rect x="80" y="0" width="20" height="20" fill="#000" />
                    <rect x="85" y="5" width="10" height="10" fill="#fff" />
                    <rect x="0" y="80" width="20" height="20" fill="#000" />
                    <rect x="5" y="85" width="10" height="10" fill="#fff" />
                    <rect x="30" y="30" width="40" height="40" fill="#000" />
                    <rect x="35" y="35" width="10" height="10" fill="#fff" />
                    <rect x="55" y="55" width="10" height="10" fill="#fff" />
                    <rect x="50" y="30" width="10" height="20" fill="#fff" />
                    <rect x="40" y="50" width="15" height="5" fill="#000" />
                  </svg>
                </div>

                <div style={{ display: 'flex', gap: '15px' }}>
                  <button onClick={() => window.print()} className="btn-secondary" style={{ flex: 1, padding: '10px' }}>
                    🖨️ Print Ticket
                  </button>
                  <button onClick={() => { setCurrentPage('dashboard'); }} className="btn-primary" style={{ flex: 1, padding: '10px', justifyContent: 'center' }}>
                    Go to Dashboard
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

      </main>

      {/* FOOTER */}
      <Footer setCurrentPage={setCurrentPage} />

      {/* FLOAT CALL & WHATSAPP WIDGETS */}
      <a 
        href="tel:+917387129287" 
        style={{
          position: 'fixed',
          bottom: '24px',
          left: '24px',
          background: '#ff5a00',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          boxShadow: '0 4px 15px rgba(255, 90, 0, 0.4)',
          cursor: 'pointer',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'var(--transition)'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff">
          <path d="M6.62 10.79a15.149 15.149 0 0 0 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
        </svg>
      </a>

      <a 
        href="https://wa.me/919623324139?text=Hi%20Pooja%20Travels,%20I%20would%20like%20to%20inquire%20about%20booking%20a%20ride." 
        target="_blank" 
        rel="noopener noreferrer" 
        className="whatsapp-widget flex-center"
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="#fff">
          <path d="M12.012 2c-5.506 0-9.988 4.492-9.988 10.004 0 1.76.457 3.475 1.332 5.003L2 22l5.132-1.348a9.923 9.923 0 0 0 4.88 1.282c5.506 0 9.988-4.492 9.988-10.004C22 6.492 17.518 2 12.012 2zm4.7 13.916c-.223.633-1.29 1.233-1.783 1.31-.444.07-.99.1-3.036-.75-2.613-1.083-4.3-3.75-4.433-3.933-.133-.183-1.09-1.45-1.09-2.767 0-1.317.69-1.966.938-2.217.25-.25.5-.316.666-.316.167 0 .334.008.484.017.15.008.35-.033.55.45.2.5.683 1.666.75 1.8.067.133.11.3.017.483-.09.183-.15.3-.3.467-.15.166-.312.35-.446.466-.15.134-.308.284-.133.584.175.3.775 1.275 1.663 2.066.887.792 1.637 1.042 1.937 1.192.3.15.475.125.65-.075.175-.2.75-.875.95-1.175.2-.3.4-.25.667-.15.267.1.1.7 1.683 1.492.267.133.44.2.5.3.067.1.067.583-.156 1.216z" />
        </svg>
      </a>

      {/* AUTH MODAL */}
      {showAuthModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }} className="animate-fade">
          <div className="glass-panel" style={{ width: '100%', maxWidth: '400px', position: 'relative' }}>
            <button 
              onClick={() => setShowAuthModal(false)}
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                cursor: 'pointer',
                fontSize: '1.25rem',
                color: 'var(--text-muted)'
              }}
            >
              ✕
            </button>
            <h3 style={{ marginBottom: '20px', textAlign: 'center' }}>
              {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
            </h3>
            <form onSubmit={handleAuthSubmit}>
              {authMode === 'register' && (
                <>
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input type="text" name="name" className="form-input" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input type="tel" name="phone" className="form-input" />
                  </div>
                </>
              )}
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input type="email" name="email" className="form-input" required />
              </div>
              <div className="form-group">
                <label className="form-label">Password</label>
                <input type="password" name="password" className="form-input" required />
              </div>
              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}>
                {authMode === 'login' ? 'Login' : 'Sign Up'}
              </button>
            </form>
            <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              {authMode === 'login' ? "Don't have an account? " : "Already have an account? "}
              <button 
                onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: 600 }}
              >
                {authMode === 'login' ? 'Sign Up' : 'Login'}
              </button>
            </p>
          </div>
        </div>
      )}

    </div>
  );
}


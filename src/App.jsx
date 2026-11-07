import { useEffect, useState } from 'react'
import { ArrowDown, ArrowRight, ArrowUpRight, Coffee, MapPin, Menu as MenuIcon, Phone, X, Instagram, Facebook, Clock3, Heart, Sparkles, ChevronLeft, ChevronRight, Navigation, Leaf } from 'lucide-react'

const PHONE = '+911234567890'
const MAP_URL = 'https://www.google.com/maps/dir/?api=1&destination=Rajiv+Chowk%2C+Delhi%2C+India'
const photos = {
  hero: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=2200&q=88',
  about: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1200&q=85',
  coffee: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=85',
  latte: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&w=900&q=85',
  dessert: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=85',
  beans: 'https://images.unsplash.com/photo-1559496417-e7f25cb247f3?auto=format&fit=crop&w=900&q=85',
  interior: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=85',
  friends: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=900&q=85',
}
const menuItems = [
  { name: 'Classic Cappuccino', category: 'Hot Coffee', note: 'Espresso, steamed milk & soft foam', price: '₹149', image: photos.latte, tag: 'A café classic' },
  { name: 'Velvet Latte', category: 'Hot Coffee', note: 'Smooth espresso with silky milk', price: '₹169', image: photos.coffee, tag: 'Smooth & mellow' },
  { name: 'Iced Coffee', category: 'Cold Coffee', note: 'Chilled coffee over ice', price: '₹129', image: photos.beans, tag: 'Cool favourite' },
  { name: 'Mocha Cloud', category: 'Signature Beverages', note: 'Coffee with a rich chocolate twist', price: '₹189', image: photos.latte, tag: 'Something special' },
  { name: 'Masala Chai', category: 'Tea & Refreshments', note: 'A comforting spiced tea', price: '₹49', image: photos.coffee, tag: 'Comfort in a cup' },
  { name: 'Garden Sandwich', category: 'Snacks & Quick Bites', note: 'A light, satisfying café bite', price: '₹149', image: photos.dessert, tag: 'Easy favourite' },
  { name: 'Chocolate Brownie', category: 'Desserts', note: 'A little something sweet', price: '₹99', image: photos.dessert, tag: 'Sweet moment' },
  { name: 'Seasonal Cooler', category: 'Signature Beverages', note: 'A refreshing seasonal sip', price: '₹119', image: photos.beans, tag: 'Fresh pick' },
]
const categories = ['All', 'Hot Coffee', 'Cold Coffee', 'Signature Beverages', 'Tea & Refreshments', 'Snacks & Quick Bites', 'Desserts']
const gallery = [
  { src: photos.coffee, alt: 'Freshly brewed coffee in a ceramic cup', caption: 'The perfect pour' },
  { src: photos.interior, alt: 'Warm and inviting independent cafe interior', caption: 'A cosy corner' },
  { src: photos.latte, alt: 'Creamy cappuccino with delicate latte art', caption: 'A little latte love' },
  { src: photos.dessert, alt: 'Sweet dessert ready to enjoy with coffee', caption: 'Something sweet' },
  { src: photos.friends, alt: 'Friends spending time together at a cafe', caption: 'Moments together' },
]
function Brand({ light = false }) {
  return <a href="#home" className={`brand ${light ? 'brand-light' : ''}`} aria-label="Cabin Cafe home"><span className="brand-mark"><Coffee size={20} strokeWidth={1.6} /></span><span><strong>CABIN</strong><small>COFFEE • COMFORT • CONNECTION</small></span></a>
}
function SectionEyebrow({ children }) { return <div className="eyebrow"><span />{children}</div> }

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState('All')
  const [menuOpen, setMenuOpen] = useState(false)
  const [lightbox, setLightbox] = useState(-1)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll()
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target) } }), { threshold: 0.12 })
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => { window.removeEventListener('scroll', onScroll); observer.disconnect() }
  }, [])
  useEffect(() => {
    document.body.style.overflow = menuOpen || lightbox >= 0 ? 'hidden' : ''
    const onKey = e => {
      if (e.key === 'Escape') { setMenuOpen(false); setLightbox(-1) }
      if (lightbox >= 0 && e.key === 'ArrowRight') setLightbox(v => (v + 1) % gallery.length)
      if (lightbox >= 0 && e.key === 'ArrowLeft') setLightbox(v => (v - 1 + gallery.length) % gallery.length)
    }
    window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey) }
  }, [menuOpen, lightbox])
  const filtered = activeCategory === 'All' ? menuItems : menuItems.filter(item => item.category === activeCategory)
  const closeMobile = () => setMobileOpen(false)
  return <>
    <header className={`site-header ${scrolled ? 'header-scrolled' : ''}`}><div className="nav-wrap">
      <Brand />
      <nav className={`nav-links ${mobileOpen ? 'nav-open' : ''}`} aria-label="Main navigation">
        {['Home', 'Our Story', 'Menu', 'Experience', 'Gallery', 'Contact'].map((item, i) => <a key={item} href={['#home','#about','#menu','#experience','#gallery','#contact'][i]} onClick={closeMobile}>{item}</a>)}
        <a className="nav-visit" href="#contact" onClick={closeMobile}>Find us <ArrowUpRight size={15}/></a>
      </nav>
      <button className="mobile-toggle" aria-label={mobileOpen ? 'Close menu' : 'Open menu'} onClick={() => setMobileOpen(v => !v)}>{mobileOpen ? <X/> : <MenuIcon/>}</button>
    </div></header>
    <main>
      <section className="hero" id="home"><div className="hero-image"/><div className="hero-shade"/><div className="hero-content page-width">
        <div className="hero-kicker"><span className="kicker-line"/> A LITTLE PAUSE IN THE CITY <span className="kicker-line"/></div>
        <h1>Your Cozy Escape,<br/><em>One Cup</em> at a Time.</h1><p>Discover the perfect blend of great coffee, delicious bites, and unforgettable moments at Cabin Cafe.</p>
        <div className="hero-actions"><a href="#menu" className="button button-light">Explore our menu <ArrowRight size={17}/></a><a href="#contact" className="button button-outline">Visit our cafe <MapPin size={16}/></a></div>
        <div className="hero-note"><span className="note-dot"/> YOUR SLOW MOMENT STARTS HERE</div>
      </div><a href="#about" className="scroll-cue" aria-label="Scroll to about"><span>SCROLL TO EXPLORE</span><ArrowDown size={15}/></a><div className="hero-index">01 <span>/</span> 08</div></section>
      <section className="intro-section section-pad" id="about"><div className="page-width intro-grid">
        <div className="intro-photo-wrap reveal"><img src={photos.about} alt="Freshly brewed coffee being prepared in a warm cafe" className="intro-photo"/><div className="photo-stamp"><span>MADE FOR</span><strong>slow<br/>moments.</strong><Coffee size={21}/></div></div>
        <div className="intro-copy reveal"><SectionEyebrow>THE CABIN STORY</SectionEyebrow><h2>More Than<br/>Just <em>Coffee.</em></h2><p className="lead">A familiar corner. A favourite cup. A moment that belongs only to you.</p><p>At Cabin Cafe, we believe every cup tells a story. Whether you're catching up with friends, enjoying a peaceful moment, or taking a break from your busy day, our cafe is the perfect place to relax, recharge, and enjoy life's little moments.</p><a href="#experience" className="text-link">Get to know us <ArrowUpRight size={16}/></a><div className="intro-signature">A warm welcome, always. <span>— Cabin Cafe</span></div></div>
      </div></section>
      <section className="menu-section section-pad" id="menu"><div className="page-width">
        <div className="section-heading reveal"><div><SectionEyebrow>MADE TO BE SAVOURED</SectionEyebrow><h2>A Menu for<br/><em>Every Mood.</em></h2></div><div className="heading-side"><p>From your first morning sip to that one-more-treat moment, find a little something to love.</p><span className="menu-note">MENU PRICES RANGE FROM ₹30 TO ₹500 · ITEMS & PRICES TO BE CONFIRMED</span></div></div>
        <div className="category-row" role="group" aria-label="Filter menu by category">{categories.map(cat => <button key={cat} className={`category-pill ${activeCategory === cat ? 'active' : ''}`} onClick={() => setActiveCategory(cat)}>{cat}</button>)}</div>
        <div className="menu-grid">{filtered.slice(0, 4).map(item => <article className="menu-card reveal" key={item.name}><div className="menu-image"><img src={item.image} alt={item.name} loading="lazy"/><span className="menu-tag">{item.tag}</span></div><div className="menu-info"><div><span className="menu-category">{item.category}</span><h3>{item.name}</h3><p>{item.note}</p></div><strong className="menu-price">{item.price}</strong></div></article>)}</div>
        <div className="menu-bottom"><span>Menu prices range from ₹30 to ₹500. Individual item prices and availability can be updated by the café team.</span><button className="button button-dark" onClick={() => setMenuOpen(true)}>View full menu <ArrowRight size={17}/></button></div>
      </div></section>
      <section className="experience-section section-pad" id="experience"><div className="page-width">
        <div className="center-heading reveal"><SectionEyebrow>THE LITTLE THINGS MATTER</SectionEyebrow><h2>Come for the coffee.<br/><em>Stay for the feeling.</em></h2><p>Some places just make it easier to slow down. We hope Cabin feels like one of them.</p></div>
        <div className="feature-grid">
          <article className="feature-card reveal"><div className="feature-icon"><Coffee size={24}/></div><span className="feature-number">01 / SIP</span><h3>Premium<br/>Coffee</h3><p>Enjoy delicious coffee crafted for every coffee lover, from familiar favourites to new discoveries.</p><a href="#menu" aria-label="Explore coffee menu"><ArrowUpRight size={18}/></a></article>
          <article className="feature-card feature-card-featured reveal"><div className="feature-icon"><Leaf size={24}/></div><span className="feature-number">02 / SETTLE IN</span><h3>Cozy<br/>Ambience</h3><p>Relax in a warm and welcoming café environment that gives the everyday a softer edge.</p><a href="#gallery" aria-label="See cafe gallery"><ArrowUpRight size={18}/></a></article>
          <article className="feature-card reveal"><div className="feature-icon"><Heart size={24}/></div><span className="feature-number">03 / CONNECT</span><h3>Perfect<br/>Moments</h3><p>A lovely place for friends, conversations, solo breaks, and memorable little moments.</p><a href="#contact" aria-label="Plan your visit"><ArrowUpRight size={18}/></a></article>
        </div>
      </div></section>
      <section className="gallery-section section-pad" id="gallery"><div className="page-width">
        <div className="section-heading gallery-heading reveal"><div><SectionEyebrow>A FEAST FOR THE EYES</SectionEyebrow><h2>A Peek Inside<br/><em>Our Little World.</em></h2></div><p>Good coffee deserves a beautiful setting. Take a look around.</p></div>
        <div className="gallery-grid">{gallery.map((item, i) => <button key={item.src} className={`gallery-item gallery-${i+1} reveal`} onClick={() => setLightbox(i)} aria-label={`View photo: ${item.alt}`}><img src={item.src} alt={item.alt} loading="lazy"/><span className="gallery-caption">{item.caption}<ArrowUpRight size={17}/></span></button>)}</div>
      </div></section>
      <section className="why-section"><div className="why-image"/><div className="why-overlay"/><div className="page-width why-content reveal">
        <SectionEyebrow>YOUR CITY, YOUR LITTLE HIDEAWAY</SectionEyebrow><h2>Your Happy Place<br/>in the <em>Heart of Delhi.</em></h2><p>In the middle of all the movement, find a moment to make your own. Drop in, take a breath, and let the coffee do the talking.</p>
        <div className="why-points"><span><Sparkles size={16}/> Relaxing café atmosphere</span><span><Coffee size={16}/> A coffee-first experience</span><span><Heart size={16}/> Made for good company</span><span><MapPin size={16}/> Rajiv Chowk, Delhi</span></div>
        <a href={MAP_URL} target="_blank" rel="noreferrer" className="button button-light">Find your way here <ArrowUpRight size={17}/></a>
      </div></section>
      <section className="contact-section section-pad" id="contact"><div className="page-width contact-grid">
        <div className="contact-copy reveal"><SectionEyebrow>COME ON OVER</SectionEyebrow><h2>Find Your<br/><em>Cabin Cafe.</em></h2><p>Whether it's a quick coffee stop or a long catch-up, we'd love to welcome you.</p>
          <div className="contact-detail"><span className="detail-icon"><MapPin size={19}/></span><div><small>COME FIND US</small><strong>Rajiv Chowk, Delhi, India</strong><a href={MAP_URL} target="_blank" rel="noreferrer">Get directions <ArrowUpRight size={14}/></a></div></div>
          <div className="contact-detail"><span className="detail-icon"><Phone size={19}/></span><div><small>GIVE US A CALL</small><strong>+91 1234567890</strong><a href={`tel:${PHONE}`}>Call Cabin Cafe <ArrowUpRight size={14}/></a></div></div>
          <div className="contact-detail"><span className="detail-icon"><Clock3 size={19}/></span><div><small>WHEN TO VISIT</small><strong>Opening hours to be announced</strong><span className="detail-muted">Check back soon for timings.</span></div></div>
        </div>
        <div className="map-card reveal"><iframe title="Map showing Rajiv Chowk, Delhi" src="https://www.google.com/maps?q=Rajiv+Chowk,+Delhi,+India&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade"/><div className="map-caption"><div><span className="map-pin"><MapPin size={17}/></span><div><strong>Cabin Cafe</strong><small>Rajiv Chowk · New Delhi</small></div></div><a href={MAP_URL} target="_blank" rel="noreferrer" aria-label="Open directions"><Navigation size={18}/></a></div></div>
      </div></section>
      <section className="final-cta"><div className="cta-bg"/><div className="cta-overlay"/><div className="cta-content reveal"><span className="cta-kicker">MAKE ROOM FOR A LITTLE JOY</span><h2>Good Coffee. Great Conversations.<br/><em>Better Memories.</em></h2><p>Your next favourite coffee moment is waiting at Cabin Cafe.</p><a className="button button-light" href={MAP_URL} target="_blank" rel="noreferrer">Visit us today <ArrowUpRight size={17}/></a></div></section>
    </main>
    <footer className="footer"><div className="page-width"><div className="footer-main">
      <div className="footer-brand-col"><Brand light/><p>A cozy escape in the heart of Delhi. Come for a cup, stay for the moment.</p><div className="socials"><a href="#contact" aria-label="Instagram profile coming soon" title="Instagram profile coming soon"><Instagram size={17}/></a><a href="#contact" aria-label="Facebook profile coming soon" title="Facebook profile coming soon"><Facebook size={17}/></a></div></div>
      <div className="footer-links"><strong>EXPLORE</strong><a href="#about">Our story</a><a href="#menu">The menu</a><a href="#experience">The experience</a><a href="#gallery">Gallery</a></div>
      <div className="footer-links"><strong>COME SAY HELLO</strong><span>Rajiv Chowk, Delhi, India</span><a href={`tel:${PHONE}`}>+91 1234567890</a><a href={MAP_URL} target="_blank" rel="noreferrer">Get directions <ArrowUpRight size={13}/></a></div>
      <div className="footer-note"><span>TAKE A BREATH.</span><strong>You're always<br/><em>welcome here.</em></strong><Coffee size={25}/></div>
    </div><div className="footer-bottom"><span>© {new Date().getFullYear()} Cabin Cafe. All rights reserved.</span><span>BREWED WITH A LITTLE EXTRA LOVE <Heart size={12} fill="currentColor"/></span></div></div></footer>
    {menuOpen && <div className="modal-backdrop" role="presentation" onMouseDown={e => e.target === e.currentTarget && setMenuOpen(false)}><div className="menu-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <button className="modal-close" onClick={() => setMenuOpen(false)} aria-label="Close menu"><X/></button><SectionEyebrow>TAKE YOUR TIME</SectionEyebrow><h2 id="modal-title">The Cabin <em>Menu.</em></h2><p className="modal-intro">Menu prices range from ₹30 to ₹500. Final items, descriptions and individual prices should be confirmed by the café.</p>
      <div className="modal-list">{menuItems.map(item => <div className="modal-menu-row" key={item.name}><div><span>{item.category}</span><strong>{item.name}</strong><small>{item.note}</small></div><b>{item.price}</b></div>)}</div><a className="button button-dark modal-call" href={`tel:${PHONE}`}><Phone size={16}/> Call for menu details</a>
    </div></div>}
    {lightbox >= 0 && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Gallery image viewer" onMouseDown={e => e.target === e.currentTarget && setLightbox(-1)}>
      <button className="lightbox-close" onClick={() => setLightbox(-1)} aria-label="Close gallery"><X/></button><button className="lightbox-arrow prev" onClick={() => setLightbox(v => (v - 1 + gallery.length) % gallery.length)} aria-label="Previous image"><ChevronLeft/></button>
      <img src={gallery[lightbox].src} alt={gallery[lightbox].alt}/><button className="lightbox-arrow next" onClick={() => setLightbox(v => (v + 1) % gallery.length)} aria-label="Next image"><ChevronRight/></button><span className="lightbox-label">{gallery[lightbox].caption} · {lightbox + 1}/{gallery.length}</span>
    </div>}
  </>
}
'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

const NAV_ITEMS = [
  { href: '/',                          icon: '🏠', label: 'මුල් පිටුව' },
  { href: '/movies',                    icon: '🎬', label: 'සියලු Films' },
  { href: '/movies?category=Series',   icon: '📺', label: 'Series' },
  { href: '/movies?category=Cartoon',  icon: '🎨', label: 'Cartoons' },
  { href: '/movies?category=Anime',    icon: '⚡', label: 'Anime' },
  { href: '/movies?rating=18+',        icon: '🔞', label: '18+ Movies' },
  { href: '/movies?lang=dubbed',       icon: '🎙️', label: 'සිංහල Dub' },
  { href: '/movies?lang=sub',          icon: '📝', label: 'සිංහල Sub' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchRef = useRef(null);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchResults([]);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Search
  useEffect(() => {
    if (searchQuery.length < 2) { setSearchResults([]); return; }
    const timer = setTimeout(async () => {
      setSearching(true);
      try {
        const res = await fetch(`/api/movies?search=${encodeURIComponent(searchQuery)}`);
        const data = await res.json();
        setSearchResults(Array.isArray(data) ? data.slice(0, 6) : []);
      } catch { setSearchResults([]); }
      finally { setSearching(false); }
    }, 400);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleMovieClick = (id) => {
    setSearchResults([]);
    setSearchQuery('');
    setMobileOpen(false);
    router.push(`/movie/${id}`);
  };

  const isActive = (href) => {
    if (href === '/') return pathname === '/';
    return pathname + (typeof window !== 'undefined' ? window.location.search : '') === href ||
           pathname === href.split('?')[0] && href.includes('?') && 
           (typeof window !== 'undefined' ? window.location.search : '').includes(href.split('?')[1]);
  };

  return (
    <>
      {/* ── Mobile Top Bar ── */}
      <div className={styles.mobileTopBar}>
        <button
          className={styles.hamburger}
          onClick={() => setMobileOpen(v => !v)}
          aria-label="Menu"
        >
          {mobileOpen ? '✕' : '☰'}
        </button>
        <Link href="/" className={styles.mobileLogoLink}>
          <span className={styles.mobileLogoMain}>SIRIES HUB</span>
          <span className={styles.mobileLogoSub}>LK</span>
        </Link>
        {/* Mobile search icon */}
        <button className={styles.mobileSearchBtn} onClick={() => { setMobileOpen(true); }}>
          🔍
        </button>
      </div>

      {/* ── Backdrop overlay ── */}
      {mobileOpen && (
        <div className={styles.backdrop} onClick={() => setMobileOpen(false)} />
      )}

      {/* ── Sidebar ── */}
      <aside className={`${styles.sidebar} ${mobileOpen ? styles.sidebarOpen : ''}`}>

        {/* Logo */}
        <Link href="/" className={styles.logo} onClick={() => setMobileOpen(false)}>
          <span className={styles.logoIcon}>🎬</span>
          <div className={styles.logoText}>
            <span className={styles.logoMain}>SIRIES HUB</span>
            <span className={styles.logoSub}>LK</span>
          </div>
        </Link>

        {/* Search */}
        <div className={styles.searchWrap} ref={searchRef}>
          <div className={styles.searchInputWrap}>
            <span className={styles.searchIcon}>🔍</span>
            <input
              type="text"
              placeholder="හොයන්න..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
            {searchQuery && (
              <button className={styles.searchClear} onClick={() => { setSearchQuery(''); setSearchResults([]); }}>✕</button>
            )}
          </div>
          {/* Results */}
          {(searching || searchResults.length > 0 || (searchQuery.length >= 2 && !searching && searchResults.length === 0)) && (
            <div className={styles.searchDropdown}>
              {searching && <div className={styles.searchMsg}>🔍 හොයනවා...</div>}
              {!searching && searchResults.length === 0 && searchQuery.length >= 2 && (
                <div className={styles.searchMsg}>හමු නොවිණි 😔</div>
              )}
              {searchResults.map(movie => (
                <div key={movie._id} className={styles.searchItem} onClick={() => handleMovieClick(movie._id)}>
                  <img src={movie.imageUrl} alt="" className={styles.searchThumb} />
                  <div className={styles.searchInfo}>
                    <span className={styles.searchTitle}>{movie.sinhalaTitle || movie.title}</span>
                    <span className={styles.searchMeta}>{movie.year} · {movie.language}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className={styles.nav}>
          {NAV_ITEMS.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navItem} ${pathname === item.href.split('?')[0] && !item.href.includes('?') ? styles.navActive : ''}`}
              onClick={() => setMobileOpen(false)}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <p>© 2026 SIRIES HUB LK</p>
        </div>
      </aside>
    </>
  );
}

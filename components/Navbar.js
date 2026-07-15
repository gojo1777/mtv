'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
      } catch (e) { setSearchResults([]); }
      finally { setSearching(false); }
    }, 400);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleMovieClick = (id) => {
    setSearchResults([]);
    setSearchQuery('');
    setMobileMenuOpen(false);
    router.push(`/movie/${id}`);
  };

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcon}>🎬</span>
          <span className={styles.logoText}>
            <span className={styles.logoMain}>SIRIES HUB</span>
            <span className={styles.logoSub}>LK</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <ul className={styles.navLinks}>
          <li><Link href="/" className={styles.navLink}><span className={styles.linkIcon}>🏠</span>මුල් පිටුව</Link></li>
          <li><Link href="/movies" className={styles.navLink}><span className={styles.linkIcon}>🎬</span>සියලු චිත්‍රපට</Link></li>
          <li className={styles.dropdown}>
            <button className={styles.navLink}><span className={styles.linkIcon}>📂</span>Categories<span className={styles.dropIcon}>▼</span></button>
            <ul className={styles.dropdownMenu}>
              <li><Link href="/movies?category=Cartoon" className={styles.dropLink}>🎨 Cartoons</Link></li>
              <li><Link href="/movies?category=Anime" className={styles.dropLink}>⚡ Anime</Link></li>
              <li><Link href="/movies?category=Series" className={styles.dropLink}>📺 Series</Link></li>
              <li><Link href="/movies?rating=18+" className={styles.dropLink}>🔞 18+ Movies</Link></li>
            </ul>
          </li>
          <li className={styles.dropdown}>
            <button className={styles.navLink}><span className={styles.linkIcon}>🎙️</span>Audio<span className={styles.dropIcon}>▼</span></button>
            <ul className={styles.dropdownMenu}>
              <li><Link href="/movies?lang=dubbed" className={styles.dropLink}>🎙️ සින්හල හඬ කැවූ</Link></li>
              <li><Link href="/movies?lang=sub" className={styles.dropLink}>📝 සින්හල උපසිරැසි</Link></li>
            </ul>
          </li>
        </ul>

        {/* Mobile Toggle - search icon නැහැ navbar එකේ */}
        <button
          className={styles.mobileToggle}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span>{mobileMenuOpen ? '✕' : '☰'}</span>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className={styles.mobileMenu}>

          {/* 🔍 Search - Mobile Menu එකේ විතරක් */}
          <div className={styles.mobileSearch}>
            <input
              type="text"
              placeholder="🔍 චිත්‍රපටයක් හොයන්න..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.mobileSearchInput}
              autoFocus
            />
            {searching && <div className={styles.searchLoading}>🔍 හොයනවා...</div>}
            {searchResults.length > 0 && (
              <div className={styles.mobileSearchResults}>
                {searchResults.map(movie => (
                  <div key={movie._id} className={styles.searchResultItem} onClick={() => handleMovieClick(movie._id)}>
                    <img src={movie.imageUrl} alt="" className={styles.searchThumb} />
                    <div className={styles.searchInfo}>
                      <span className={styles.searchTitle}>{movie.sinhalaTitle || movie.title}</span>
                      <span className={styles.searchMeta}>{movie.year} • {movie.language}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {searchQuery.length >= 2 && !searching && searchResults.length === 0 && (
              <div className={styles.searchLoading}>හමු නොවිණි 😔</div>
            )}
          </div>

          <Link href="/" className={styles.mobileLink} onClick={() => setMobileMenuOpen(false)}>🏠 මුල් පිටුව</Link>
          <Link href="/movies" className={styles.mobileLink} onClick={() => setMobileMenuOpen(false)}>🎬 සියලු චිත්‍රපට</Link>
          <div className={styles.mobileDivider}>Categories</div>
          <Link href="/movies?category=Cartoon" className={styles.mobileLink} onClick={() => setMobileMenuOpen(false)}>🎨 Cartoons</Link>
          <Link href="/movies?category=Anime" className={styles.mobileLink} onClick={() => setMobileMenuOpen(false)}>⚡ Anime</Link>
          <Link href="/movies?category=Series" className={styles.mobileLink} onClick={() => setMobileMenuOpen(false)}>📺 Series</Link>
          <Link href="/movies?rating=18+" className={styles.mobileLink} onClick={() => setMobileMenuOpen(false)}>🔞 18+ Movies</Link>
          <div className={styles.mobileDivider}>Audio</div>
          <Link href="/movies?lang=dubbed" className={styles.mobileLink} onClick={() => setMobileMenuOpen(false)}>🎙️ සින්හල හඬ කැවූ</Link>
          <Link href="/movies?lang=sub" className={styles.mobileLink} onClick={() => setMobileMenuOpen(false)}>📝 සින්හල උපසිරැසි</Link>
        </div>
      )}
    </nav>
  );
}

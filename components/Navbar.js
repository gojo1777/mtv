'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

const NAV = [
  { href: '/',                         label: 'Home',          icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg> },
  { href: '/movies',                   label: 'Movies',         icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/></svg> },
  { href: '/movies?category=Series',   label: 'TV Shows',       icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"/><polyline points="17,2 12,7 7,2"/></svg> },
  { href: '/movies?category=Cartoon',  label: 'Cartoons',       icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg> },
  { href: '/movies?category=Anime',    label: 'Anime',          icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2"/></svg> },
  { href: '/movies?lang=dubbed',       label: 'Sinhala Dub',    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/><path d="M19 10v2a7 7 0 01-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg> },
  { href: '/movies?lang=sub',          label: 'Sinhala Sub',    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg> },
  { href: '/movies?rating=18+',        label: '18+ Movies',     icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg> },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => { setOpen(false); }, [pathname]);

  const active = (href) => {
    if (href === '/') return pathname === '/';
    const [path, qs] = href.split('?');
    if (!qs) return pathname === path;
    const params = new URLSearchParams(qs);
    if (typeof window === 'undefined') return false;
    const cur = new URLSearchParams(window.location.search);
    for (const [k, v] of params) { if (cur.get(k) !== v) return false; }
    return pathname === path;
  };

  return (
    <>
      {/* Mobile Top Bar */}
      <div className={styles.mobileBar}>
        <button className={styles.hamburger} onClick={() => setOpen(v => !v)} aria-label="Menu">
          {open
            ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            : <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          }
        </button>
        <Link href="/" className={styles.mobileLogo}>
          <span className={styles.mobileLogoMain}>SIRIES HUB</span>
          <span className={styles.mobileLogoBadge}>LK</span>
        </Link>
        <div style={{width:36}}/>
      </div>

      {/* Backdrop */}
      {open && <div className={styles.backdrop} onClick={() => setOpen(false)} />}

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${open ? styles.open : ''}`}>
        <Link href="/" className={styles.logo} onClick={() => setOpen(false)}>
          <span className={styles.logoMain}>SIRIES HUB</span>
          <span className={styles.logoBadge}>LK</span>
        </Link>

        <nav className={styles.nav}>
          {NAV.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navItem} ${active(item.href) ? styles.navActive : ''}`}
              onClick={() => setOpen(false)}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              <span className={styles.navLabel}>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}

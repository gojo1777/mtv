'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import styles from './SearchHeader.module.css';

export default function SearchHeader() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const wrapRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const handler = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setResults([]);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    if (query.length < 2) { setResults([]); return; }
    const t = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/movies?search=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(Array.isArray(data) ? data.slice(0, 7) : []);
      } catch { setResults([]); }
      finally { setLoading(false); }
    }, 350);
    return () => clearTimeout(t);
  }, [query]);

  const go = (id) => {
    setQuery(''); setResults([]);
    router.push(`/movie/${id}`);
  };

  return (
    <div className={styles.header}>
      <div className={styles.inner} ref={wrapRef}>
        <div className={styles.inputWrap}>
          <svg className={styles.searchIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            type="text"
            className={styles.input}
            placeholder="Films, Series, Cartoons හොයන්න..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          {query && (
            <button className={styles.clear} onClick={() => { setQuery(''); setResults([]); }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          )}
        </div>

        {/* Dropdown */}
        {(loading || results.length > 0 || (query.length >= 2 && !loading && results.length === 0)) && (
          <div className={styles.dropdown}>
            {loading && <div className={styles.msg}>හොයනවා...</div>}
            {!loading && results.length === 0 && query.length >= 2 && (
              <div className={styles.msg}>හමු නොවිණි</div>
            )}
            {results.map(m => (
              <div key={m._id} className={styles.item} onClick={() => go(m._id)}>
                <img src={m.imageUrl} alt="" className={styles.thumb} />
                <div className={styles.info}>
                  <span className={styles.title}>{m.sinhalaTitle || m.title}</span>
                  <span className={styles.meta}>{m.year} · {m.language}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

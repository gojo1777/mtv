'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import MovieCard from '../../components/MovieCard';
import styles from './movies.module.css';

function MoviesContent() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const rating = searchParams.get('rating');
  const lang = searchParams.get('lang');

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [movies, category, rating, lang, activeFilter]);

  const fetchMovies = async () => {
    try {
      const res = await fetch('/api/movies', { cache: 'no-store' });
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setMovies(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching movies:', error);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...movies];

    if (category) {
      filtered = filtered.filter(m => m.category === category);
    }
    if (rating) {
      filtered = filtered.filter(m => m.ageRating === rating);
    }
    if (lang === 'dubbed') {
      filtered = filtered.filter(m => m.language === 'Sinhala Dub' || m.language === 'Both');
    } else if (lang === 'sub') {
      filtered = filtered.filter(m => 
        m.language === 'Sinhala Sub' || m.language === 'Sinhala Sub Anime'
      );
    }

    if (activeFilter !== 'all') {
      if (activeFilter === 'cartoons') {
        filtered = filtered.filter(m => m.category === 'Cartoon');
      } else if (activeFilter === 'anime') {
        filtered = filtered.filter(m => 
          m.category === 'Anime' || m.language === 'Sinhala Sub Anime'
        );
      } else if (activeFilter === 'series') {
        filtered = filtered.filter(m => m.category === 'Series');
      } else if (activeFilter === 'movies') {
        filtered = filtered.filter(m => 
          m.category === 'Movie' || 
          (!m.category && m.language !== 'Sinhala Sub Anime')
        );
      }
    }

    setFilteredMovies(filtered);
  };

  const getPageTitle = () => {
    if (category) return `${category} Collection`;
    if (rating) return `${rating} චිත්‍රපට`;
    if (lang === 'dubbed') return 'සින්හල හඬ කැවූ';
    if (lang === 'sub') return 'සින්හල උපසිරැසි';
    return 'සියලු චිත්‍රපට';
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Loading movies...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{getPageTitle()}</h1>
        <p className={styles.count}>{filteredMovies.length} චිත්‍රපට</p>
      </div>

      <div className={styles.filterBar}>
        <button 
          className={`${styles.filterBtn} ${activeFilter === 'all' ? styles.active : ''}`}
          onClick={() => setActiveFilter('all')}
        >
          🎬 සියල්ල
        </button>
        <button 
          className={`${styles.filterBtn} ${activeFilter === 'movies' ? styles.active : ''}`}
          onClick={() => setActiveFilter('movies')}
        >
          🎥 චිත්‍රපට
        </button>
        <button 
          className={`${styles.filterBtn} ${activeFilter === 'cartoons' ? styles.active : ''}`}
          onClick={() => setActiveFilter('cartoons')}
        >
          🎨 Cartoons
        </button>
        <button 
          className={`${styles.filterBtn} ${activeFilter === 'anime' ? styles.active : ''}`}
          onClick={() => setActiveFilter('anime')}
        >
          ⚡ Anime
        </button>
        <button 
          className={`${styles.filterBtn} ${activeFilter === 'series' ? styles.active : ''}`}
          onClick={() => setActiveFilter('series')}
        >
          📺 Series
        </button>
      </div>

      {filteredMovies.length > 0 ? (
        <div className={styles.movieGrid}>
          {filteredMovies.map(movie => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>🎬</div>
          <h2>චිත්‍රපට හමු නොවිණි</h2>
          <p>මෙම කාණ්ඩයේ චිත්‍රපට කිසිවක් නැත.</p>
        </div>
      )}
    </div>
  );
}

export default function MoviesPage() {
  return (
    <Suspense fallback={
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh', flexDirection: 'column', gap: '1rem' }}>
        <p style={{ color: '#aaa' }}>Loading movies...</p>
      </div>
    }>
      <MoviesContent />
    </Suspense>
  );
}

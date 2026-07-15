import Link from 'next/link';
import MovieCard from '../components/MovieCard';
import styles from './page.module.css';
export const dynamic = 'force-dynamic';

async function getMovies() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://movie-web-rust-eight.vercel.app';
    const res = await fetch(`${baseUrl}/api/movies`, { 
      cache: 'no-store'
    });
    
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) { 
    console.error("Fetch error:", error);
    return []; 
  }
}

export default async function Home() {
  const movies = await getMovies();
  
  if (!movies || movies.length === 0) {
    return (
      <div style={{ padding: '100px', textAlign: 'center' }}>
        <h2>දැනට චිත්‍රපට කිසිවක් නොමැත.</h2>
        <p>ඩේටාබේස් එකට ෆිල්ම් එකතු කරලාද බලන්න.</p>
      </div>
    );
  }

  // Categories වලට වෙන් කරන්නේ මෙතනින්
  const cartoons = movies.filter(m => m.category === 'Cartoon');
  const anime = movies.filter(m => m.category === 'Anime');
  const adultMovies = movies.filter(m => m.ageRating === '18+');
  const sinhalaDubbed = movies.filter(m => m.language === 'Sinhala Dub' || m.language === 'Both');
  const sinhalaSub = movies.filter(m => m.language === 'Sinhala Sub' || m.language === 'Sinhala Sub Anime');
  
  const featured = movies.find(m => m.featured && m.imageUrl) || movies[0];
  const latest = movies.slice(0, 18);

  return (
    <div className={styles.homeContainer}>
      
      {/* Hero Banner */}
      {featured && (
        <section 
          className={styles.heroBanner} 
          style={{ 
            backgroundImage: `linear-gradient(to top, #0f0f0f 10%, rgba(15, 15, 15, 0.7) 50%, rgba(15, 15, 15, 0.4) 100%), url(${featured.imageUrl})` 
          }}
        >
          <div className={styles.heroContent}>
            <div className={styles.badgeGroup}>
              <span className={styles.trendingTag}>🔥 Trending</span>
              <span className={styles.yearTag}>{featured.year}</span>
              {featured.ageRating && featured.ageRating !== 'All' && (
                <span className={styles.ageTag}>{featured.ageRating}</span>
              )}
            </div>
            <h1 className={styles.heroTitle}>{featured.sinhalaTitle || featured.title}</h1>
            <p className={styles.heroDesc}>
              {featured.description ? featured.description.slice(0, 160) + "..." : "විස්තරයක් ඇතුළත් කර නොමැත."}
            </p>
            <div className={styles.heroActions}>
              <Link href={`/movie/${featured._id}`} className={styles.btnPrimary}>
                <span>▶</span> දැන් නරඹන්න
              </Link>
              {featured.trailerUrl && (
                <Link href={featured.trailerUrl} className={styles.btnSecondary} target="_blank">
                  <span>🎬</span> Trailer
                </Link>
              )}
            </div>
          </div>
        </section>
      )}

      <div className="container">
        
        {/* නවතම එක්කිරීම් */}
        <div className={styles.sectionHeader}>
          <h2 className={styles.rowTitle}>🎬 නවතම එක්කිරීම්</h2>
          <Link href="/movies" className={styles.viewAll}>සියල්ල බලන්න ➔</Link>
        </div>

        <div className={styles.movieGrid}>
          {latest.map(movie => (
            movie && movie._id ? <MovieCard key={movie._id} movie={movie} /> : null
          ))}
        </div>

        {/* සින්හල හඬ කැවූ Cartoons */}
        {sinhalaDubbed.length > 0 && (
          <>
            <div className={styles.sectionHeader}>
              <h2 className={styles.rowTitle}>🎨 සින්හල හඬ කැවූ Cartoons</h2>
              <Link href="/movies?category=Cartoon&lang=dubbed" className={styles.viewAll}>තව බලන්න ➔</Link>
            </div>
            <div className={styles.movieGrid}>
              {sinhalaDubbed.filter(m => m.category === 'Cartoon').slice(0, 6).map(movie => (
                <MovieCard key={movie._id} movie={movie} />
              ))}
            </div>
          </>
        )}

        {/* Sinhala Sub Anime */}
        {anime.length > 0 && (
          <>
            <div className={styles.sectionHeader}>
              <h2 className={styles.rowTitle}>⚡ Sinhala Sub Anime</h2>
              <Link href="/movies?category=Anime" className={styles.viewAll}>තව බලන්න ➔</Link>
            </div>
            <div className={styles.movieGrid}>
              {anime.slice(0, 6).map(movie => (
                <MovieCard key={movie._id} movie={movie} />
              ))}
            </div>
          </>
        )}

        {/* 18+ Movies */}
        {adultMovies.length > 0 && (
          <>
            <div className={styles.sectionHeader}>
              <h2 className={styles.rowTitle}>🔞 18+ චිත්‍රපට</h2>
              <Link href="/movies?rating=18+" className={styles.viewAll}>තව බලන්න ➔</Link>
            </div>
            <div className={styles.movieGrid}>
              {adultMovies.slice(0, 6).map(movie => (
                <MovieCard key={movie._id} movie={movie} />
              ))}
            </div>
          </>
        )}

      </div>
    </div>
  );
}

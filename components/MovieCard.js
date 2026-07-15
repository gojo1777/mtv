import Link from 'next/link';
import styles from './MovieCard.module.css';

export default function MovieCard({ movie }) {
  if (!movie) return null;

  const getLangLabel = (lang) => {
    if (lang === 'Sinhala Dub' || lang === 'Both') return 'DUB';
    if (lang === 'Sinhala Sub') return 'SUB';
    if (lang === 'Sinhala Sub Anime') return 'ANIME';
    return lang?.slice(0, 4) || '';
  };

  const getLangClass = (lang) => {
    if (lang === 'Sinhala Dub' || lang === 'Both') return styles.langDub;
    if (lang?.includes('Sub')) return styles.langSub;
    return styles.langOther;
  };

  return (
    <Link href={`/movie/${movie._id}`} className={styles.card}>
      <div className={styles.poster}>
        <img
          src={movie.imageUrl || '/placeholder.jpg'}
          alt={movie.sinhalaTitle || movie.title}
          className={styles.img}
          loading="lazy"
        />
        {/* Age badge */}
        {movie.ageRating && movie.ageRating !== 'All' && (
          <span className={`${styles.ageBadge} ${movie.ageRating === '18+' ? styles.age18 : ''}`}>
            {movie.ageRating}
          </span>
        )}
        {/* Lang badge */}
        {movie.language && (
          <span className={`${styles.langBadge} ${getLangClass(movie.language)}`}>
            {getLangLabel(movie.language)}
          </span>
        )}
        {/* Hover overlay */}
        <div className={styles.hoverOverlay}>
          <div className={styles.playBtn}>▶</div>
          {movie.rating > 0 && (
            <div className={styles.ratingBadge}>⭐ {Number(movie.rating).toFixed(1)}</div>
          )}
        </div>
      </div>
      <div className={styles.info}>
        <h3 className={styles.title}>{movie.sinhalaTitle || movie.title}</h3>
        <div className={styles.meta}>
          {movie.year && <span className={styles.year}>{movie.year}</span>}
          {movie.category && movie.category !== 'Movie' && (
            <span className={styles.cat}>{movie.category}</span>
          )}
        </div>
      </div>
    </Link>
  );
}

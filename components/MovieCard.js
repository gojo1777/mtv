import Link from 'next/link';
import styles from './MovieCard.module.css';

const LANG_MAP = {
  'Sinhala Dub':       { label: 'DUB', cls: 'dub' },
  'Both':              { label: 'DUB', cls: 'dub' },
  'Sinhala Sub':       { label: 'SUB', cls: 'sub' },
  'Sinhala Sub Anime': { label: 'ANI', cls: 'ani' },
};

export default function MovieCard({ movie }) {
  if (!movie) return null;
  const lang = LANG_MAP[movie.language] || { label: movie.language?.slice(0,3) || '', cls: 'other' };

  return (
    <Link href={`/movie/${movie._id}`} className={styles.card}>
      <div className={styles.poster}>
        <img
          src={movie.imageUrl || '/placeholder.jpg'}
          alt={movie.sinhalaTitle || movie.title}
          className={styles.img}
          loading="lazy"
        />
        {/* Age badge top-left */}
        {movie.ageRating && movie.ageRating !== 'All' && (
          <span className={`${styles.ageBadge} ${movie.ageRating === '18+' ? styles.age18 : ''}`}>
            {movie.ageRating}
          </span>
        )}
        {/* Hover overlay */}
        <div className={styles.overlay}>
          <div className={styles.playBtn}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><polygon points="5,3 19,12 5,21"/></svg>
          </div>
        </div>
      </div>
      <div className={styles.info}>
        <p className={styles.title}>{movie.sinhalaTitle || movie.title}</p>
        <div className={styles.meta}>
          <span className={styles.year}>{movie.year}</span>
          {lang.label && (
            <span className={`${styles.langBadge} ${styles[lang.cls]}`}>{lang.label}</span>
          )}
        </div>
      </div>
    </Link>
  );
}

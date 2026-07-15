import Link from 'next/link';
import Image from 'next/image';
import styles from './MovieCard.module.css';

export default function MovieCard({ movie }) {
  if (!movie) return null;

  const getBadgeColor = (rating) => {
    if (rating === '18+') return styles.badge18;
    if (rating === '16+') return styles.badge16;
    if (rating === '13+') return styles.badge13;
    return styles.badgeAll;
  };

  const getLanguageBadge = (lang) => {
    if (lang === 'Sinhala Dub' || lang === 'Both') return '🎙️ සිංහල';
    if (lang === 'Sinhala Sub') return '📝 උපසිරැසි';
    if (lang === 'Sinhala Sub Anime') return '⚡ Anime';
    return lang;
  };

  const getCategoryIcon = (category) => {
    if (category === 'Cartoon') return '🎨';
    if (category === 'Anime') return '⚡';
    if (category === 'Series') return '📺';
    return '🎬';
  };

  return (
    <Link href={`/movie/${movie._id}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={movie.imageUrl || '/placeholder.jpg'}
          alt={movie.sinhalaTitle || movie.title}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          className={styles.image}
          priority={false}
        />
        
        {/* Overlay with info */}
        <div className={styles.overlay}>
          <div className={styles.overlayContent}>
            <h3 className={styles.overlayTitle}>
              {movie.sinhalaTitle || movie.title}
            </h3>
            {movie.rating > 0 && (
              <div className={styles.rating}>
                <span className={styles.star}>⭐</span>
                <span>{movie.rating.toFixed(1)}</span>
              </div>
            )}
            <div className={styles.quickInfo}>
              {movie.year && <span>{movie.year}</span>}
              {movie.genre && movie.genre.length > 0 && (
                <span>{movie.genre[0]}</span>
              )}
            </div>
          </div>
          <div className={styles.playButton}>
            <span>▶</span>
          </div>
        </div>

        {/* Top badges */}
        <div className={styles.badgesTop}>
          {movie.ageRating && movie.ageRating !== 'All' && (
            <span className={`${styles.badge} ${getBadgeColor(movie.ageRating)}`}>
              {movie.ageRating}
            </span>
          )}
          {movie.category && (
            <span className={`${styles.badge} ${styles.badgeCategory}`}>
              {getCategoryIcon(movie.category)}
            </span>
          )}
        </div>

        {/* Language badge */}
        {movie.language && (
          <div className={styles.badgeBottom}>
            <span className={styles.langBadge}>
              {getLanguageBadge(movie.language)}
            </span>
          </div>
        )}
      </div>

      <div className={styles.info}>
        <h3 className={styles.title}>
          {movie.sinhalaTitle || movie.title}
        </h3>
        <div className={styles.meta}>
          {movie.year && <span className={styles.year}>{movie.year}</span>}
          {movie.views > 0 && (
            <span className={styles.views}>
              👁️ {movie.views.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

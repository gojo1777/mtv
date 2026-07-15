import Link from 'next/link';
import MovieCard from '../components/MovieCard';
import styles from './page.module.css';
import dbConnect from '../lib/mongodb';
import Movie from '../models/Movie';
export const dynamic = 'force-dynamic';

async function getMovies() {
  try {
    await dbConnect();
    const movies = await Movie.find({}).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(movies));
  } catch {
    return [];
  }
}

function Row({ title, movies, href }) {
  if (!movies?.length) return null;
  return (
    <section className={styles.section}>
      <div className={styles.rowHead}>
        <h2 className={styles.rowTitle}>{title}</h2>
        {href && <Link href={href} className={styles.viewAll}>View all</Link>}
      </div>
      <div className={styles.row}>
        {movies.map(m => m?._id ? <MovieCard key={m._id} movie={m} /> : null)}
      </div>
    </section>
  );
}

export default async function Home() {
  const all = await getMovies();

  if (!all.length) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyIcon}>🎬</div>
        <h2>දැනට Films කිසිවක් නොමැත</h2>
        <p>Admin panel එකෙන් movies add කරන්න.</p>
        <Link href="/admin" className={styles.adminLink}>Admin Panel →</Link>
      </div>
    );
  }

  const featured  = all.find(m => m.featured && m.imageUrl) || all[0];
  const latest    = all.slice(0, 20);
  const cartoons  = all.filter(m => m.category === 'Cartoon').slice(0, 16);
  const anime     = all.filter(m => m.category === 'Anime').slice(0, 16);
  const series    = all.filter(m => m.category === 'Series').slice(0, 16);
  const dubbed    = all.filter(m => m.language === 'Sinhala Dub' || m.language === 'Both').slice(0, 16);
  const sub       = all.filter(m => m.language === 'Sinhala Sub').slice(0, 16);
  const adult     = all.filter(m => m.ageRating === '18+').slice(0, 16);

  return (
    <div className={styles.page}>

      {/* ── Hero ── */}
      {featured && (
        <section className={styles.hero} style={{ backgroundImage: `url(${featured.imageUrl})` }}>
          <div className={styles.heroGrad} />

          <div className={styles.heroBody}>
            <h1 className={styles.heroTitle}>{featured.sinhalaTitle || featured.title}</h1>

            <div className={styles.heroMeta}>
              {featured.rating > 0 && (
                <div className={styles.ratingCircle}>
                  <span>{Number(featured.rating).toFixed(1)}</span>
                </div>
              )}
              {featured.language && (
                <span className={styles.metaTag}>{featured.language}</span>
              )}
              {featured.year && (
                <span className={styles.metaTag}>{featured.year}</span>
              )}
              {featured.ageRating && featured.ageRating !== 'All' && (
                <span className={`${styles.metaTag} ${styles.ageTag}`}>{featured.ageRating}</span>
              )}
            </div>

            {featured.description && (
              <p className={styles.heroDesc}>
                {featured.description.slice(0, 200)}{featured.description.length > 200 ? '…' : ''}
              </p>
            )}

            <Link href={`/movie/${featured._id}`} className={styles.watchBtn}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><polygon points="5,3 19,12 5,21"/></svg>
              Watch now
            </Link>
          </div>

          {/* Pagination dots */}
          <div className={styles.heroDots}>
            <span className={styles.dotActive} />
            <span className={styles.dot} />
            <span className={styles.dot} />
          </div>
        </section>
      )}

      {/* ── Rows ── */}
      <div className={styles.content}>
        <Row title="Latest Movies"       movies={latest}   href="/movies" />
        <Row title="Sinhala Cartoons"    movies={cartoons} href="/movies?category=Cartoon" />
        <Row title="Anime"               movies={anime}    href="/movies?category=Anime" />
        <Row title="TV Series"           movies={series}   href="/movies?category=Series" />
        <Row title="Sinhala Dub Movies"  movies={dubbed}   href="/movies?lang=dubbed" />
        <Row title="Sinhala Sub Movies"  movies={sub}      href="/movies?lang=sub" />
        {adult.length > 0 && (
          <Row title="18+ Movies"        movies={adult}    href="/movies?rating=18+" />
        )}
      </div>
    </div>
  );
}

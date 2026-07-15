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

function SectionRow({ title, movies, href }) {
  if (!movies || movies.length === 0) return null;
  return (
    <section className={styles.section}>
      <div className={styles.sectionHead}>
        <h2 className={styles.sectionTitle}>{title}</h2>
        {href && <Link href={href} className={styles.viewAll}>සියල්ල ➔</Link>}
      </div>
      <div className={styles.row}>
        {movies.map(movie =>
          movie && movie._id ? <MovieCard key={movie._id} movie={movie} /> : null
        )}
      </div>
    </section>
  );
}

export default async function Home() {
  const movies = await getMovies();

  const featured   = movies.find(m => m.featured && m.imageUrl) || movies[0];
  const latest     = movies.slice(0, 18);
  const cartoons   = movies.filter(m => m.category === 'Cartoon').slice(0, 12);
  const anime      = movies.filter(m => m.category === 'Anime').slice(0, 12);
  const series     = movies.filter(m => m.category === 'Series').slice(0, 12);
  const dubbed     = movies.filter(m => m.language === 'Sinhala Dub' || m.language === 'Both').slice(0, 12);
  const subMovies  = movies.filter(m => m.language === 'Sinhala Sub').slice(0, 12);
  const adult      = movies.filter(m => m.ageRating === '18+').slice(0, 12);

  if (!movies || movies.length === 0) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyIcon}>🎬</div>
        <h2>දැනට Films කිසිවක් නොමැත</h2>
        <p>Admin panel එකෙන් movies add කරන්න.</p>
        <Link href="/admin" className={styles.adminLink}>Admin Panel →</Link>
      </div>
    );
  }

  return (
    <div className={styles.page}>

      {/* ── Hero Banner ── */}
      {featured && (
        <section
          className={styles.hero}
          style={{ backgroundImage: `url(${featured.imageUrl})` }}
        >
          <div className={styles.heroGrad} />
          <div className={styles.heroContent}>
            <div className={styles.heroBadges}>
              <span className={styles.badgeTrending}>🔥 Trending</span>
              {featured.year && <span className={styles.badgeYear}>{featured.year}</span>}
              {featured.ageRating && featured.ageRating !== 'All' && (
                <span className={styles.badgeAge}>{featured.ageRating}</span>
              )}
              {featured.language && (
                <span className={styles.badgeLang}>{featured.language}</span>
              )}
            </div>
            <h1 className={styles.heroTitle}>{featured.sinhalaTitle || featured.title}</h1>
            {featured.description && (
              <p className={styles.heroDesc}>
                {featured.description.slice(0, 180)}{featured.description.length > 180 ? '…' : ''}
              </p>
            )}
            <div className={styles.heroActions}>
              <Link href={`/movie/${featured._id}`} className={styles.btnWatch}>
                ▶ දැන් නරඹන්න
              </Link>
              {featured.rating > 0 && (
                <span className={styles.heroRating}>⭐ {Number(featured.rating).toFixed(1)}</span>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── Content Rows ── */}
      <div className={styles.content}>
        <SectionRow title="🎬 නවතම එක්කිරීම්"     movies={latest}    href="/movies" />
        <SectionRow title="🎨 Sinhala Cartoons"     movies={cartoons}  href="/movies?category=Cartoon" />
        <SectionRow title="⚡ Sinhala Sub Anime"    movies={anime}     href="/movies?category=Anime" />
        <SectionRow title="📺 Series"               movies={series}    href="/movies?category=Series" />
        <SectionRow title="🎙️ සිංහල Dub Movies"    movies={dubbed}    href="/movies?lang=dubbed" />
        <SectionRow title="📝 සිංහල Sub Movies"     movies={subMovies} href="/movies?lang=sub" />
        {adult.length > 0 && (
          <SectionRow title="🔞 18+ Movies"         movies={adult}     href="/movies?rating=18+" />
        )}
      </div>
    </div>
  );
}

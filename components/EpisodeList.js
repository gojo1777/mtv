'use client';
import styles from '../app/movie/[id]/movie.module.css';

export default function EpisodeList({ episodes, poster }) {
  
  // Episode එකක් ක්ලික් කළාම Download Link එකට යවන Function එක
  const handleDownload = (url) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      alert("සමාවන්න, මෙම එපිසෝඩ් එකේ ලින්ක් එකෙහි දෝෂයක් පවතී.");
    }
  };

  return (
    <div className={styles.animeContainer}>
      <div className={styles.epGrid}>
        {episodes.map((ep, i) => (
          <div 
            key={i} 
            className={styles.epCard}
            onClick={() => handleDownload(ep.url)}
            title="Click to Download"
          >
            <div className={styles.epThumb}>
              <img 
                src={poster} 
                alt={`Episode ${ep.number}`} 
                className={styles.epPoster}
              />
              <div className={styles.epOverlay}>
                <span className={styles.dlIconMini}>⬇️</span>
              </div>
              <span className={styles.epTag}>EP {ep.number}</span>
            </div>
            
            <div className={styles.epInfo}>
               <span className={styles.epTitleText}>
                 {ep.title || `Episode ${ep.number}`}
               </span>
               {ep.quality && (
                 <span className={styles.epQualityTag}>{ep.quality}</span>
               )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

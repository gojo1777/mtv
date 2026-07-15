import styles from './movie.module.css';
import EpisodeList from '../../../components/EpisodeList';
import Comments from '../../../components/Comments';
import dbConnect from '../../../lib/mongodb';
import Movie from '../../../models/Movie';

// --- 🔍 1. Metadata ---
export async function generateMetadata({ params }) {
  const { id } = await params;
  try {
    await dbConnect();
    const movie = await Movie.findById(id).lean();
    if (!movie) return { title: 'Movie Not Found | SIRIES HUB LK' };
    const tags = [
      movie.title, movie.sinhalaTitle,
      'Sinhala Dubbed', 'Sinhala Subtitles',
      'Sinhala Movie Download', 'SIRIES HUB LK',
      ...(movie.genre || [])
    ].join(', ');
    return {
      title: `${movie.sinhalaTitle || movie.title} Sinhala Download | SIRIES HUB LK`,
      description: `${movie.sinhalaTitle || movie.title} සම්පූර්ණ චිත්‍රපටිය සිංහල හඬකැවීම් සමඟ දැන්ම නරඹන්න.`,
      keywords: tags,
      openGraph: {
        title: movie.sinhalaTitle || movie.title,
        description: movie.description,
        images: [{ url: movie.imageUrl }],
      },
    };
  } catch {
    return { title: 'SIRIES HUB LK | සිංහල චිත්‍රපට' };
  }
}

// --- 🎬 2. Data Fetching (direct DB) ---
async function getMovie(id) {
  try {
    await dbConnect();
    const movie = await Movie.findById(id).lean();
    if (!movie) return null;
    // Increment views (fire-and-forget)
    Movie.findByIdAndUpdate(id, { $inc: { views: 1 } }).catch(() => {});
    // Serialize mongoose document
    return JSON.parse(JSON.stringify(movie));
  } catch {
    return null;
  }
}

// --- 📱 3. Page Component ---
export default async function MoviePage({ params }) {
  const { id } = await params;
  const movie = await getMovie(id);

  if (!movie) {
    return (
      <div className="container" style={{ color: 'white', padding: '100px', textAlign: 'center' }}>
        <h2>සමාවන්න, මෙම චිත්‍රපටය සොයාගත නොහැක.</h2>
      </div>
    );
  }

  const isAnime = movie.language?.trim() === 'Sinhala Sub Anime';
  const isSeries = movie.category === 'Series';
  const hasEpisodes = movie.episodes && movie.episodes.length > 0;
  const hasSub = movie.language === 'Sinhala Sub' ||
                 movie.language === 'Sinhala Sub Anime' ||
                 movie.language === 'Both';

  return (
    <div className={styles.detailsPage}>
      {/* Backdrop */}
      <div className={styles.backdrop}>
        <div
          className={styles.backdropImage}
          style={{ backgroundImage: `url(${movie.imageUrl})` }}
        ></div>
        <div className={styles.backdropOverlay}></div>
      </div>

      <div className={`container ${styles.mainContent}`}>
        <div className={styles.posterSide}>
          <img
            src={movie.imageUrl}
            alt={movie.sinhalaTitle || movie.title}
            className={styles.mainPoster}
            style={{ width: '300px', height: 'auto', borderRadius: '10px' }}
          />
        </div>

        <div className={styles.infoSide}>
          <h1 className={styles.mTitle}>{movie.sinhalaTitle || movie.title}</h1>

          <div className={styles.mMeta}>
            <span className={styles.ratingBadge}>⭐ {movie.rating}/10</span>
            <span className={styles.metaItem}>📅 {movie.year}</span>
            <span className={styles.metaItem}>🎙️ {movie.language}</span>
          </div>

          <div className={styles.genreTags}>
            {Array.isArray(movie.genre) ? movie.genre.map((g, i) => (
              <span key={i} className={styles.genreTag}>{g}</span>
            )) : <span className={styles.genreTag}>{movie.genre}</span>}
          </div>

          <p className={styles.mDesc}>{movie.description}</p>

          <div className={styles.actionSection}>

            {/* 📺 Anime Episodes */}
            {isAnime && hasEpisodes && (
              <div className={styles.episodeContainer}>
                <h3 className={styles.sectionTitle}>📺 සියලුම එපිසෝඩ්ස් ({movie.episodes.length})</h3>
                <EpisodeList episodes={movie.episodes} poster={movie.imageUrl} />
              </div>
            )}

            {/* 📺 Series Episodes */}
            {isSeries && hasEpisodes && (
              <div className={styles.episodeContainer}>
                <h3 className={styles.sectionTitle}>📺 Episodes ({movie.episodes.length})</h3>
                <div className={styles.seriesEpList}>
                  {movie.episodes
                    .sort((a, b) => parseInt(a.number) - parseInt(b.number))
                    .map((ep, i) => {
                      const p = new URLSearchParams();
                      p.set('title', `${movie.sinhalaTitle || movie.title} - EP ${ep.number}`);
                      p.set('quality', ep.quality || '720p');
                      p.set('size', '');
                      if (ep.gdrive) p.set('gdrive', ep.gdrive);
                      if (ep.telegram) p.set('telegram', ep.telegram);
                      if (ep.direct) p.set('direct', ep.direct);
                      if (ep.pixeldrain) p.set('pixeldrain', ep.pixeldrain);
                      if (ep.other) p.set('other', ep.other);
                      if (!ep.gdrive && !ep.telegram && !ep.direct && !ep.pixeldrain && !ep.other && ep.url) {
                        p.set('direct', ep.url);
                      }
                      return (
                        <a key={i} href={`/go?${p.toString()}`} className={styles.seriesEpCard}>
                          <div className={styles.seriesEpNum}>EP {ep.number}</div>
                          <div className={styles.seriesEpInfo}>
                            <span className={styles.seriesEpTitle}>{ep.title || `Episode ${ep.number}`}</span>
                            <span className={styles.seriesEpMeta}>
                              {ep.quality || '720p'}
                              {ep.gdrive && ' · 📁'}{ep.telegram && ' · ✈️'}{ep.direct && ' · ⬇️'}{ep.pixeldrain && ' · 🌊'}
                            </span>
                          </div>
                          <span className={styles.dlIcon}>⬇</span>
                        </a>
                      );
                    })}
                </div>
              </div>
            )}

            {/* 🎬 GDrive Streaming Player */}
            {!isAnime && !isSeries && movie.streamingUrl && (
              <div style={{ marginBottom: '30px' }}>
                <h3 className={styles.sectionTitle}>▶️ Online Stream කරන්න</h3>
                {(() => {
                  const url = movie.streamingUrl;
                  const fileIdMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/) || url.match(/id=([a-zA-Z0-9_-]+)/);
                  const fileId = fileIdMatch ? fileIdMatch[1] : null;
                  const embedSrc = fileId ? `https://drive.google.com/file/d/${fileId}/preview` : url;
                  return (
                    <>
                      <div id="gdrive-player-wrap" style={{
                        position: 'relative', width: '100%', paddingBottom: '56.25%',
                        borderRadius: '12px', overflow: 'hidden', background: '#000',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.1)'
                      }}>
                        <iframe id="gdrive-iframe" src={embedSrc}
                          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                          allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
                        <div id="sub-overlay" style={{
                          position: 'absolute', bottom: '60px', left: '50%', transform: 'translateX(-50%)',
                          width: '90%', textAlign: 'center', pointerEvents: 'none', zIndex: 10, display: 'none'
                        }}>
                          <span id="sub-text" style={{
                            background: 'rgba(0,0,0,0.82)', color: '#fff', fontSize: '16px', fontWeight: '500',
                            padding: '6px 14px', borderRadius: '6px', lineHeight: '1.6',
                            whiteSpace: 'pre-wrap', display: 'inline-block', maxWidth: '100%', textShadow: '1px 1px 2px #000'
                          }}></span>
                        </div>
                      </div>
                      <div style={{
                        marginTop: '10px', padding: '10px 14px', background: 'rgba(255,255,255,0.05)',
                        borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)',
                        display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap'
                      }}>
                        <label htmlFor="srt-local-input" style={{
                          cursor: 'pointer', padding: '7px 16px',
                          background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', borderRadius: '8px',
                          color: '#fff', fontSize: '13px', fontWeight: '600', whiteSpace: 'nowrap'
                        }}>📂 SRT දාන්න</label>
                        <input id="srt-local-input" type="file" accept=".srt,.vtt" style={{ display: 'none' }} />
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px' }}>⏱ වේලාව:</span>
                          <input id="sub-time-input" type="number" defaultValue="0" min="0" step="1"
                            style={{ width: '70px', padding: '5px 8px', borderRadius: '6px',
                              background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
                              color: '#fff', fontSize: '13px', textAlign: 'center' }} />
                          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>වි.</span>
                        </div>
                        <button id="sub-toggle-btn" style={{
                          padding: '7px 14px', background: 'rgba(255,255,255,0.1)',
                          border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px',
                          color: '#fff', fontSize: '13px', cursor: 'pointer'
                        }}>CC ✅</button>
                        <span id="srt-loaded-name" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px' }}>file නෑ</span>
                      </div>
                      <input type="hidden" id="online-sub-url" value={movie.subtitleUrl || ''} />
                      <script dangerouslySetInnerHTML={{ __html: `
                        (function(){var cues=[],subOn=true,elapsedOffset=0,startWallTime=null,timerInterval=null;
                        function parseSrt(t){var r=[],blocks=t.replace(/\\r\\n/g,'\\n').replace(/\\r/g,'\\n').trim().split(/\\n\\n+/);
                        blocks.forEach(function(b){var ls=b.split('\\n'),tl=ls.find(function(l){return l.includes('-->');});
                        if(!tl)return;var ts=tl.match(/(\\d{2}):(\\d{2}):(\\d{2})[,\\.](\\d{3})\\s*-->\\s*(\\d{2}):(\\d{2}):(\\d{2})[,\\.](\\d{3})/);
                        if(!ts)return;var toS=function(h,m,s,ms){return+h*3600+ +m*60+ +s+ +ms/1000;};
                        var st=toS(ts[1],ts[2],ts[3],ts[4]),en=toS(ts[5],ts[6],ts[7],ts[8]);
                        var ti=ls.indexOf(tl),tx=ls.slice(ti+1).join('\\n').trim();if(tx)r.push({start:st,end:en,text:tx});});return r;}
                        function getSub(t){for(var i=0;i<cues.length;i++){if(t>=cues[i].start&&t<=cues[i].end)return cues[i].text;}return'';}
                        function tick(){if(!subOn||!startWallTime)return;var el=elapsedOffset+(Date.now()-startWallTime)/1000,tx=getSub(el);
                        var ov=document.getElementById('sub-overlay'),se=document.getElementById('sub-text');if(!ov||!se)return;
                        if(tx){se.textContent=tx;ov.style.display='block';}else{ov.style.display='none';}}
                        function startT(f){elapsedOffset=f||0;startWallTime=Date.now();if(timerInterval)clearInterval(timerInterval);timerInterval=setInterval(tick,200);}
                        function loadC(t,fn){cues=parseSrt(t);document.getElementById('srt-loaded-name').textContent='✅ '+(fn||'');
                        document.getElementById('srt-loaded-name').style.color='#a3e635';startT(parseFloat(document.getElementById('sub-time-input').value)||0);}
                        function init(){var inp=document.getElementById('srt-local-input');
                        if(inp){inp.addEventListener('change',function(e){var f=e.target.files[0];if(!f)return;
                        var r=new FileReader();r.onload=function(ev){loadC(ev.target.result,f.name);};r.readAsText(f,'UTF-8');this.value='';});}
                        var ti=document.getElementById('sub-time-input');if(ti){ti.addEventListener('change',function(){if(cues.length>0)startT(parseFloat(this.value)||0);});}
                        var tb=document.getElementById('sub-toggle-btn');if(tb){tb.addEventListener('click',function(){subOn=!subOn;this.textContent=subOn?'CC ✅':'CC ❌';if(!subOn)document.getElementById('sub-overlay').style.display='none';});}
                        var ou=document.getElementById('online-sub-url');if(ou&&ou.value){fetch(ou.value).then(function(r){return r.text();}).then(function(t){loadC(t,'Online Sub');}).catch(function(){});}}
                        if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',init);}else{init();}}
                        )();
                      `}} />
                    </>
                  );
                })()}
              </div>
            )}

            {/* 📥 Download Links */}
            {movie.downloadLinks && movie.downloadLinks.length > 0 && (
              <div className={styles.downloadSection}>
                <h3 className={styles.sectionTitle}>📥 චිත්‍රපටය බාගත කරගන්න</h3>
                <div className={styles.dlGrid}>
                  {movie.downloadLinks.map((link, i) => {
                    const p = new URLSearchParams();
                    p.set('title', movie.sinhalaTitle || movie.title);
                    p.set('quality', link.quality || '');
                    p.set('size', link.size || '');
                    if (link.gdrive) p.set('gdrive', link.gdrive);
                    if (link.telegram) p.set('telegram', link.telegram);
                    if (link.direct) p.set('direct', link.direct);
                    if (link.pixeldrain) p.set('pixeldrain', link.pixeldrain);
                    if (link.other) p.set('other', link.other);
                    if (!link.gdrive && !link.telegram && !link.direct && !link.pixeldrain && !link.other && link.url) {
                      const u = link.url;
                      if (u.includes('drive.google')) p.set('gdrive', u);
                      else if (u.includes('t.me') || u.includes('telegram')) p.set('telegram', u);
                      else if (u.includes('pixeldrain')) p.set('pixeldrain', u);
                      else p.set('direct', u);
                    }
                    return (
                      <a key={i} href={`/go?${p.toString()}`} className={styles.dlButton}>
                        <div className={styles.dlInfo}>
                          <span className={styles.dlQuality}>{link.quality}</span>
                          <span className={styles.dlSize}>{link.size}</span>
                        </div>
                        <span className={styles.dlIcon}>⬇</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 📝 SRT Subtitle */}
            {hasSub && movie.subtitleUrl && (
              <div className={styles.downloadSection} style={{ marginTop: '20px' }}>
                <h3 className={styles.sectionTitle}>📝 සිංහල උපසිරැසි බාගත කරගන්න (SRT)</h3>
                <a href={movie.subtitleUrl} className={styles.srtButton}
                  target="_blank" rel="noopener noreferrer" download>
                  <span>📄</span>
                  <div>
                    <span className={styles.dlQuality}>SRT File</span>
                    <span className={styles.dlSize}>සිංහල උපසිරැසි</span>
                  </div>
                  <span className={styles.dlIcon}>⬇</span>
                </a>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* 💬 Comments */}
      <div className="container" style={{ paddingBottom: '60px' }}>
        <Comments movieId={id} movieTitle={movie.sinhalaTitle || movie.title} />
      </div>
    </div>
  );
}

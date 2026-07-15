'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../../lib/firebase';
import styles from './dashboard.module.css';

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchingImdb, setFetchingImdb] = useState(false);
  const [movies, setMovies] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [stats, setStats] = useState({ daily: [], totalViews: 0 });

  // --- 🎥 Form State ---
  const [formData, setFormData] = useState({
    title: '',
    sinhalaTitle: '',
    description: '',
    year: new Date().getFullYear(),
    genre: [],
    language: 'Sinhala Dub',
    category: 'Movie',
    ageRating: 'All',
    rating: 0,
    imageUrl: '',
    trailerUrl: '',
    subtitleUrl: '',
    streamingUrl: '',
    downloadLinks: [], 
    episodes: [], 
    featured: false,
  });

  // --- 📺 Episode Input States (Anime) ---
  const [epNum, setEpNum] = useState('');
  const [epTitle, setEpTitle] = useState('');
  const [epDlUrl, setEpDlUrl] = useState(''); 
  const [epQuality, setEpQuality] = useState('720p'); 

  // --- 📺 Series Episode States ---
  const [sEpNum, setSEpNum] = useState('');
  const [sEpTitle, setSEpTitle] = useState('');
  const [sEpQuality, setSEpQuality] = useState('720p');
  const [sEpGdrive, setSEpGdrive] = useState('');
  const [sEpTelegram, setSEpTelegram] = useState('');
  const [sEpDirect, setSEpDirect] = useState('');
  const [sEpPixeldrain, setSEpPixeldrain] = useState('');
  const [sEpOther, setSEpOther] = useState('');

  // --- 📥 Movie Download States ---
  const [dlQuality, setDlQuality] = useState('720p');
  const [dlSize, setDlSize] = useState('');
  const [dlGdrive, setDlGdrive] = useState('');
  const [dlTelegram, setDlTelegram] = useState('');
  const [dlDirect, setDlDirect] = useState('');
  const [dlPixeldrain, setDlPixeldrain] = useState('');
  const [dlOther, setDlOther] = useState('');

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) { 
        setUser(user); 
        fetchMovies(); 
        fetchStats(); 
      } else { 
        router.push('/admin'); 
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  const fetchMovies = async () => {
    try {
      const res = await fetch('/api/movies');
      const data = await res.json();
      setMovies(data);
    } catch (error) { console.error(error); }
  };

  const fetchStats = async () => {
    try {
      const res = await fetch('/admin/stats');
      if (res.ok) setStats(await res.json());
    } catch (error) { console.error(error); }
  };

  const handleImdbFetch = async (url) => {
    const match = url.match(/tt\d+/);
    const imdbId = match ? match[0] : null;
    if (!imdbId) return;
    setFetchingImdb(true);
    try {
      const res = await fetch(`https://www.omdbapi.com/?i=${imdbId}&apikey=f27956ef`);
      const data = await res.json();
      if (data.Response === "True") {
        setFormData(prev => ({
          ...prev,
          title: data.Title,
          year: parseInt(data.Year) || prev.year,
          rating: parseFloat(data.imdbRating) || 0,
          description: data.Plot,
          imageUrl: data.Poster !== "N/A" ? data.Poster : '',
          genre: data.Genre.split(',').map(g => g.trim()),
        }));
      }
    } finally { setFetchingImdb(false); }
  };

  // --- ➕ Anime Episode එකතු කිරීම ---
  const addEpisode = () => {
    if (epNum && epDlUrl) {
      const isExist = formData.episodes.find(e => e.number === epNum);
      if(isExist) { alert("මෙම Episode අංකය දැනටමත් ඇත!"); return; }
      const newEpisode = { 
        number: epNum, 
        title: epTitle || `Episode ${epNum}`, 
        url: epDlUrl, 
        quality: epQuality || '720p' 
      };
      setFormData({ ...formData, episodes: [...formData.episodes, newEpisode] });
      setEpNum(''); setEpTitle(''); setEpDlUrl('');
    } else { alert("Episode අංකය සහ ලින්ක් එක අනිවාර්යයි!"); }
  };

  // --- 📥 Movie ලින්ක් එකතු කිරීම ---
  const addDownloadLink = () => {
    if (!dlGdrive && !dlTelegram && !dlDirect && !dlPixeldrain && !dlOther) {
      alert("අවම වශයෙන් link එකක් අනිවාර්යයි!"); return;
    }
    const newLink = {
      quality: dlQuality,
      size: dlSize || 'Unknown',
      gdrive: dlGdrive,
      telegram: dlTelegram,
      direct: dlDirect,
      pixeldrain: dlPixeldrain,
      other: dlOther,
      // backward compat - url field
      url: dlDirect || dlGdrive || dlTelegram || dlPixeldrain || dlOther,
    };
    setFormData({ ...formData, downloadLinks: [...formData.downloadLinks, newLink] });
    setDlSize(''); setDlGdrive(''); setDlTelegram(''); setDlDirect(''); setDlPixeldrain(''); setDlOther('');
  };

  // --- ➕ Series Episode එකතු කිරීම ---
  const addSeriesEpisode = () => {
    if (!sEpNum) { alert("Episode අංකය අනිවාර්යයි!"); return; }
    if (!sEpGdrive && !sEpTelegram && !sEpDirect && !sEpPixeldrain && !sEpOther) {
      alert("අවම වශයෙන් link එකක් අනිවාර්යයි!"); return;
    }
    const isExist = formData.episodes.find(e => e.number === sEpNum);
    if (isExist) { alert("මෙම Episode අංකය දැනටමත් ඇත!"); return; }
    const newEp = {
      number: sEpNum,
      title: sEpTitle || `Episode ${sEpNum}`,
      quality: sEpQuality,
      gdrive: sEpGdrive,
      telegram: sEpTelegram,
      direct: sEpDirect,
      pixeldrain: sEpPixeldrain,
      other: sEpOther,
      url: sEpDirect || sEpGdrive || sEpTelegram || sEpPixeldrain || sEpOther,
    };
    setFormData({ ...formData, episodes: [...formData.episodes, newEp] });
    setSEpNum(''); setSEpTitle(''); setSEpGdrive(''); setSEpTelegram('');
    setSEpDirect(''); setSEpPixeldrain(''); setSEpOther('');
  };

  const removeEpisode = (index) => {
    const updatedEps = formData.episodes.filter((_, i) => i !== index);
    setFormData({ ...formData, episodes: updatedEps });
  };

  const removeDownloadLink = (index) => {
    const updatedLinks = formData.downloadLinks.filter((_, i) => i !== index);
    setFormData({ ...formData, downloadLinks: updatedLinks });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `/api/movies/${editingId}` : '/api/movies';
    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        alert(editingId ? 'සාර්ථකව යාවත්කාලීන කළා!' : 'සාර්ථකව ප්‍රකාශයට පත් කළා!');
        resetForm();
        fetchMovies();
      }
    } catch (error) { alert('දෝෂයකි!'); }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      title: '', sinhalaTitle: '', description: '', year: new Date().getFullYear(),
      genre: [], language: 'Sinhala Dub', category: 'Movie', ageRating: 'All',
      rating: 0, imageUrl: '', trailerUrl: '',
    subtitleUrl: '', streamingUrl: '', downloadLinks: [], episodes: [], featured: false,
    });
  };

  const startEdit = (movie) => {
    setEditingId(movie._id);
    setFormData({ 
      ...movie, 
      episodes: movie.episodes || [],
      downloadLinks: movie.downloadLinks || [] 
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!confirm('මෙය ස්ථිරවම මකා දමන්නද?')) return;
    const res = await fetch(`/api/movies/${id}`, { method: 'DELETE' });
    if (res.ok) fetchMovies();
  };

  if (loading) return <div className={styles.loading}>SIRIES HUB LK Loading...</div>;

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h1>🎬 Admin Dashboard</h1>
        <button onClick={() => signOut(auth)} className={styles.logoutBtn}>Logout</button>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}><h3>මුළු බැලීම්</h3><p>{stats.totalViews.toLocaleString()}</p></div>
        <div className={styles.statCard}><h3>මුළු නිර්මාණ</h3><p>{movies.length}</p></div>
      </div>

      <button onClick={editingId ? resetForm : () => setShowForm(!showForm)} className={styles.addBtn}>
        {showForm ? '✕ අවලංගු කරන්න' : '+ අලුත් නිර්මාණයක් එක් කරන්න'}
      </button>

      {showForm && (
        <div className={styles.formCard}>
          <h2>{editingId ? '📝 Edit Content' : '🎥 Add New'}</h2>
          <input type="text" placeholder="IMDb Link (Auto-fetch)" onChange={(e) => handleImdbFetch(e.target.value)} className={styles.imdbInput}/>
          
          <form onSubmit={handleSubmit} className={styles.movieForm}>
            <div className={styles.formRow}>
              <input type="text" placeholder="English Title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required />
              <input type="text" placeholder="සිංහල නම" value={formData.sinhalaTitle} onChange={(e) => setFormData({...formData, sinhalaTitle: e.target.value})} required />
            </div>

            <textarea placeholder="Description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} rows="3" required />

            <div className={styles.formRow}>
              <input type="number" placeholder="Year" value={formData.year} onChange={(e) => setFormData({...formData, year: parseInt(e.target.value)})} required />
              <select value={formData.language} onChange={(e) => setFormData({...formData, language: e.target.value})} required>
                <option value="Sinhala Dub">Sinhala Dub</option>
                <option value="Sinhala Sub">Sinhala Sub</option>
                <option value="Sinhala Sub Anime">Sinhala Sub Anime</option>
              </select>
            </div>

            <div className={styles.formRow}>
              <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} required>
                <option value="Movie">🎬 Movie</option>
                <option value="Cartoon">🎨 Cartoon</option>
                <option value="Anime">⚡ Anime</option>
                <option value="Series">📺 Series</option>
              </select>
              <select value={formData.ageRating} onChange={(e) => setFormData({...formData, ageRating: e.target.value})}>
                <option value="All">✅ All Ages</option>
                <option value="13+">🔶 13+</option>
                <option value="16+">🔷 16+</option>
                <option value="18+">🔞 18+</option>
              </select>
            </div>

            {/* --- 📺 Anime Section --- */}
            {formData.language === "Sinhala Sub Anime" && (
              <div className={styles.episodeSection}>
                <h3>📺 Anime එපිසෝඩ් එකතු කරන්න</h3>
                <div className={styles.epInputs}>
                  <input type="number" placeholder="Ep No" value={epNum} onChange={(e) => setEpNum(e.target.value)} style={{width: '60px'}} />
                  <input type="text" placeholder="Quality" value={epQuality} onChange={(e) => setEpQuality(e.target.value)} style={{width: '100px'}} />
                  <input type="text" placeholder="Download Link" value={epDlUrl} onChange={(e) => setEpDlUrl(e.target.value)} />
                  <button type="button" onClick={addEpisode} className={styles.addEpBtn}>එක් කරන්න</button>
                </div>
                <div className={styles.epListPreview}>
                  {formData.episodes.map((ep, i) => (
                    <div key={i} className={styles.epItem}>
                      <span>EP {ep.number} - <b>{ep.quality}</b></span>
                      <button type="button" onClick={() => removeEpisode(i)}>✕</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* --- 📺 Series Episode Section --- */}
            {formData.category === "Series" && (
              <div className={styles.episodeSection}>
                <h3>📺 Series Episode එකතු කරන්න</h3>

                <div className={styles.formRow}>
                  <input type="number" placeholder="EP No" value={sEpNum} onChange={(e) => setSEpNum(e.target.value)} style={{width:'80px'}} />
                  <input type="text" placeholder="Episode නම (optional)" value={sEpTitle} onChange={(e) => setSEpTitle(e.target.value)} />
                  <select value={sEpQuality} onChange={(e) => setSEpQuality(e.target.value)} style={{width:'100px'}}>
                    <option value="480p">480p</option>
                    <option value="720p">720p</option>
                    <option value="1080p">1080p</option>
                    <option value="4K">4K</option>
                  </select>
                </div>

                <input type="text" placeholder="📁 Google Drive" value={sEpGdrive} onChange={(e) => setSEpGdrive(e.target.value)} style={{borderColor:'rgba(66,133,244,0.4)'}} />
                <input type="text" placeholder="✈️ Telegram" value={sEpTelegram} onChange={(e) => setSEpTelegram(e.target.value)} style={{borderColor:'rgba(0,136,204,0.4)'}} />
                <input type="text" placeholder="⬇️ Direct Download" value={sEpDirect} onChange={(e) => setSEpDirect(e.target.value)} style={{borderColor:'rgba(229,9,20,0.4)'}} />
                <input type="text" placeholder="🌊 Pixel Drain" value={sEpPixeldrain} onChange={(e) => setSEpPixeldrain(e.target.value)} style={{borderColor:'rgba(255,165,0,0.4)'}} />
                <input type="text" placeholder="🔗 Other Link" value={sEpOther} onChange={(e) => setSEpOther(e.target.value)} style={{borderColor:'rgba(255,255,255,0.2)'}} />

                <button type="button" onClick={addSeriesEpisode} className={styles.addEpBtn} style={{width:'100%', padding:'10px', marginTop:'5px'}}>
                  ➕ Episode එකතු කරන්න
                </button>

                <div className={styles.epListPreview}>
                  {formData.episodes.map((ep, i) => (
                    <div key={i} className={styles.epItem}>
                      <span>
                        EP {ep.number} - <b>{ep.quality || '720p'}</b>
                        {ep.gdrive && ' 📁'}{ep.telegram && ' ✈️'}{ep.direct && ' ⬇️'}{ep.pixeldrain && ' 🌊'}{ep.other && ' 🔗'}
                      </span>
                      <button type="button" onClick={() => removeEpisode(i)}>✕</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* --- 📥 Movie Download Section --- */}
            {(formData.language === "Sinhala Dub" || formData.language === "Sinhala Sub") && (
              <div className={styles.episodeSection}>
                <h3>📥 Download ලින්ක් සෙට් එකතු කරන්න</h3>
                
                <div className={styles.formRow}>
                  <select value={dlQuality} onChange={(e) => setDlQuality(e.target.value)}>
                    <option value="480p">480p</option>
                    <option value="720p">720p</option>
                    <option value="1080p">1080p</option>
                    <option value="4K">4K</option>
                  </select>
                  <input type="text" placeholder="Size (e.g. 1.5GB)" value={dlSize} onChange={(e) => setDlSize(e.target.value)} />
                </div>

                <input type="text" placeholder="📁 Google Drive Link" value={dlGdrive} onChange={(e) => setDlGdrive(e.target.value)} style={{borderColor:'rgba(66,133,244,0.4)'}} />
                <input type="text" placeholder="✈️ Telegram Link" value={dlTelegram} onChange={(e) => setDlTelegram(e.target.value)} style={{borderColor:'rgba(0,136,204,0.4)'}} />
                <input type="text" placeholder="⬇️ Direct Download Link" value={dlDirect} onChange={(e) => setDlDirect(e.target.value)} style={{borderColor:'rgba(229,9,20,0.4)'}} />
                <input type="text" placeholder="🌊 Pixel Drain Link" value={dlPixeldrain} onChange={(e) => setDlPixeldrain(e.target.value)} style={{borderColor:'rgba(255,165,0,0.4)'}} />
                <input type="text" placeholder="🔗 Other Link" value={dlOther} onChange={(e) => setDlOther(e.target.value)} style={{borderColor:'rgba(255,255,255,0.2)'}} />

                <button type="button" onClick={addDownloadLink} className={styles.addEpBtn} style={{width:'100%', padding:'10px', marginTop:'5px'}}>
                  ➕ මේ Link සෙට් එකතු කරන්න
                </button>

                <div className={styles.epListPreview}>
                  {formData.downloadLinks.map((dl, i) => (
                    <div key={i} className={styles.epItem}>
                      <span>
                        <b>{dl.quality}</b> - {dl.size}
                        {dl.gdrive && ' 📁'}{dl.telegram && ' ✈️'}{dl.direct && ' ⬇️'}{dl.pixeldrain && ' 🌊'}{dl.other && ' 🔗'}
                      </span>
                      <button type="button" onClick={() => removeDownloadLink(i)}>✕</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <input type="text" placeholder="Poster Image URL" value={formData.imageUrl} onChange={(e) => setFormData({...formData, imageUrl: e.target.value})} required />

            {/* 🎬 Streaming URL (Google Drive embed) */}
            <input 
              type="text" 
              placeholder="▶️ Streaming URL (Google Drive file ID හෝ embed link)" 
              value={formData.streamingUrl || ''} 
              onChange={(e) => setFormData({...formData, streamingUrl: e.target.value})} 
              style={{borderColor: 'rgba(16, 185, 129, 0.5)'}}
            />

            {/* 📝 SRT Subtitle URL - Sinhala Sub movies සඳහා */}
            {(formData.language === 'Sinhala Sub' || formData.language === 'Sinhala Sub Anime' || formData.language === 'Both') && (
              <input 
                type="text" 
                placeholder="📝 SRT Subtitle File URL (optional)" 
                value={formData.subtitleUrl || ''} 
                onChange={(e) => setFormData({...formData, subtitleUrl: e.target.value})} 
                style={{borderColor: 'rgba(37, 99, 235, 0.5)'}}
              />
            )}
            
            <button type="submit" className={styles.submitBtn}>
              {editingId ? '💾 Update කරන්න' : '🚀 Publish කරන්න'}
            </button>
          </form>
        </div>
      )}

      {/* --- List Section --- */}
      <div className={styles.moviesList}>
        {movies.map(movie => (
          <div key={movie._id} className={styles.movieRow}>
            <img src={movie.imageUrl} alt="" width="50" height="70" style={{objectFit:'cover', borderRadius:'4px'}} />
            <div className={styles.movieInfo}>
              <h4>{movie.sinhalaTitle || movie.title}</h4>
              <p>{movie.language} • {movie.year}</p>
            </div>
            <div className={styles.movieActions}>
              <button onClick={() => startEdit(movie)} className={styles.editBtn}>Edit</button>
              <button onClick={() => handleDelete(movie._id)} className={styles.deleteBtn}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

'use client';
import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, addDoc, query, where, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import styles from './Comments.module.css';

export default function Comments({ movieId, movieTitle }) {
  const [comments, setComments] = useState([]);
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!movieId) return;
    setLoading(true);
    const q = query(
      collection(db, 'comments'),
      where('movieId', '==', movieId),
      orderBy('createdAt', 'desc')
    );
    const unsub = onSnapshot(q, (snap) => {
      setComments(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });
    return () => unsub();
  }, [movieId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim() || !name.trim()) return;
    setSubmitting(true);
    try {
      await addDoc(collection(db, 'comments'), {
        movieId,
        movieTitle,
        name: name.trim(),
        text: text.trim(),
        createdAt: serverTimestamp(),
      });
      setText('');
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const timeAgo = (ts) => {
    if (!ts) return '';
    const now = Date.now();
    const sec = Math.floor((now - ts.toMillis()) / 1000);
    if (sec < 60) return 'දැන්';
    if (sec < 3600) return `${Math.floor(sec/60)}m`;
    if (sec < 86400) return `${Math.floor(sec/3600)}h`;
    return `${Math.floor(sec/86400)}d`;
  };

  return (
    <div className={styles.commentsSection}>
      <h3 className={styles.commentsTitle}>
        💬 Comments <span className={styles.count}>({comments.length})</span>
      </h3>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className={styles.commentForm}>
        <input
          type="text"
          placeholder="ඔබේ නම"
          value={name}
          onChange={e => setName(e.target.value)}
          className={styles.nameInput}
          maxLength={30}
          required
        />
        <textarea
          placeholder="ඔබේ comment එක ලියන්න..."
          value={text}
          onChange={e => setText(e.target.value)}
          className={styles.textInput}
          rows={3}
          maxLength={500}
          required
        />
        <button type="submit" className={styles.submitBtn} disabled={submitting}>
          {submitting ? 'යවනවා...' : '📨 Comment කරන්න'}
        </button>
      </form>

      {/* Comments List */}
      <div className={styles.commentsList}>
        {loading && <p className={styles.loadingText}>Loading...</p>}
        {!loading && comments.length === 0 && (
          <p className={styles.emptyText}>තවමත් comments නැහැ. පළමුවෙන්ම comment කරන්න! 🎬</p>
        )}
        {comments.map(c => (
          <div key={c.id} className={styles.commentCard}>
            <div className={styles.commentHeader}>
              <div className={styles.avatar}>{c.name?.[0]?.toUpperCase() || '?'}</div>
              <div className={styles.commentMeta}>
                <span className={styles.commentName}>{c.name}</span>
                <span className={styles.commentTime}>{timeAgo(c.createdAt)}</span>
              </div>
            </div>
            <p className={styles.commentText}>{c.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

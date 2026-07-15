'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import styles from './admin.module.css';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/admin/dashboard');
    } catch (err) {
      setError('Invalid email or password / වැරදි විද්‍යුත් තැපෑල හෝ මුරපදය');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.adminLogin}>
      <div className={styles.loginCard}>
        <div className={styles.loginHeader}>
          <h1>🎬 Admin Panel</h1>
          <p>පරිපාලක පිවිසුම</p>
        </div>

        <form onSubmit={handleLogin} className={styles.loginForm}>
          {error && <div className={styles.error}>{error}</div>}
          
          <div className={styles.formGroup}>
            <label>Email / විද්‍යුත් තැපෑල</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Password / මුරපදය</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button 
            type="submit" 
            className={styles.loginBtn}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login / පිවිසෙන්න'}
          </button>
        </form>

        <div className={styles.loginFooter}>
          <p>⚠️ Authorized access only</p>
          <p>අවසර ලත් ප්‍රවේශය පමණි</p>
        </div>
      </div>
    </div>
  );
}

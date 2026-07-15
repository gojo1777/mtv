// components/Analytics.js
"use client";
import { useEffect } from 'react';

export default function Analytics() {
  useEffect(() => {
    // සයිට් එක ලෝඩ් වෙද්දී View එකක් Record කරනවා
    fetch('/api/analytics', { method: 'POST' }).catch(err => console.error(err));
  }, []);

  return null; // මේකෙන් මුකුත් පේන්නේ නැහැ, background එකේ වැඩ කරන්නේ
}

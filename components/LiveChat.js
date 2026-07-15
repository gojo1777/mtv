'use client';
import { useState, useEffect, useRef } from 'react';
import { db } from '../lib/firebase';
import { collection, addDoc, query, orderBy, limit, onSnapshot, serverTimestamp } from 'firebase/firestore';
import styles from './LiveChat.module.css';

export default function LiveChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState('');
  const [nameSet, setNameSet] = useState(false);
  const [text, setText] = useState('');
  const [unread, setUnread] = useState(0);
  const bottomRef = useRef(null);
  const prevLen = useRef(0);

  useEffect(() => {
    const saved = localStorage.getItem('chat_name');
    if (saved) { setName(saved); setNameSet(true); }
  }, []);

  useEffect(() => {
    const q = query(collection(db, 'livechat'), orderBy('createdAt', 'asc'), limit(100));
    const unsub = onSnapshot(q, (snap) => {
      const msgs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setMessages(msgs);
      if (!open && msgs.length > prevLen.current) {
        setUnread(u => u + (msgs.length - prevLen.current));
      }
      prevLen.current = msgs.length;
    });
    return () => unsub();
  }, [open]);

  useEffect(() => {
    if (open) {
      setUnread(0);
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  }, [open, messages]);

  const handleSetName = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    localStorage.setItem('chat_name', name.trim());
    setNameSet(true);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    const msg = text.trim();
    setText('');
    try {
      await addDoc(collection(db, 'livechat'), {
        name: name.trim(),
        text: msg,
        createdAt: serverTimestamp(),
      });
    } catch (err) { console.error(err); }
  };

  const timeStr = (ts) => {
    if (!ts) return '';
    const d = ts.toDate();
    return d.toLocaleTimeString('si-LK', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Floating Button */}
      <button className={styles.floatBtn} onClick={() => setOpen(!open)}>
        {open ? '✕' : '💬'}
        {!open && unread > 0 && <span className={styles.badge}>{unread}</span>}
      </button>

      {/* Chat Window */}
      {open && (
        <div className={styles.chatWindow}>
          <div className={styles.chatHeader}>
            <div className={styles.headerInfo}>
              <span className={styles.liveDot}></span>
              <span>Live Chat</span>
            </div>
            <button onClick={() => setOpen(false)} className={styles.closeBtn}>✕</button>
          </div>

          {!nameSet ? (
            <div className={styles.nameSetup}>
              <p>Chat කිරීමට ඔබේ නම ඇතුළත් කරන්න</p>
              <form onSubmit={handleSetName}>
                <input
                  type="text"
                  placeholder="ඔබේ නම"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className={styles.nameInput}
                  maxLength={20}
                  autoFocus
                />
                <button type="submit" className={styles.nameBtn}>ඇතුල් වන්න →</button>
              </form>
            </div>
          ) : (
            <>
              <div className={styles.messages}>
                {messages.length === 0 && (
                  <p className={styles.emptyMsg}>Chat ආරම්භ කරන්න! 👋</p>
                )}
                {messages.map(m => (
                  <div key={m.id} className={`${styles.msg} ${m.name === name ? styles.own : ''}`}>
                    {m.name !== name && <span className={styles.msgName}>{m.name}</span>}
                    <div className={styles.msgBubble}>
                      <span className={styles.msgText}>{m.text}</span>
                      <span className={styles.msgTime}>{timeStr(m.createdAt)}</span>
                    </div>
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>

              <form onSubmit={handleSend} className={styles.inputRow}>
                <input
                  type="text"
                  placeholder="Message..."
                  value={text}
                  onChange={e => setText(e.target.value)}
                  className={styles.msgInput}
                  maxLength={300}
                />
                <button type="submit" className={styles.sendBtn}>➤</button>
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
}

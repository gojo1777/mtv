export async function generateMetadata({ searchParams }) {
  const p = await searchParams;
  return { title: `Downloading... | SIRIES HUB LK` };
}

export default async function GoPage({ searchParams }) {
  const p = await searchParams;
  const links = {
    gdrive: p.gdrive || '',
    telegram: p.telegram || '',
    direct: p.direct || '',
    pixeldrain: p.pixeldrain || '',
    other: p.other || '',
    quality: p.quality || '',
    size: p.size || '',
    title: p.title || 'Download',
  };
  const linksJson = JSON.stringify(links);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;700&family=Noto+Sans+Sinhala:wght@400;600&display=swap');
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
          background: #080810;
          min-height: 100vh;
          font-family: 'Rajdhani', sans-serif;
          color: white;
          overflow-x: hidden;
        }

        .bg-grid {
          position: fixed;
          inset: 0;
          background-image: 
            linear-gradient(rgba(229,9,20,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(229,9,20,0.03) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
        }

        .bg-glow {
          position: fixed;
          top: -200px;
          left: 50%;
          transform: translateX(-50%);
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(229,9,20,0.12) 0%, transparent 70%);
          pointer-events: none;
        }

        .container {
          position: relative;
          z-index: 1;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
        }

        .logo {
          font-size: 1.4rem;
          font-weight: 700;
          color: #e50914;
          letter-spacing: 2px;
          margin-bottom: 40px;
          text-transform: uppercase;
        }

        .card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 40px 35px;
          width: 100%;
          max-width: 480px;
          backdrop-filter: blur(20px);
          box-shadow: 0 25px 80px rgba(0,0,0,0.6);
        }

        .movie-title {
          font-size: 1.3rem;
          font-weight: 700;
          color: white;
          text-align: center;
          margin-bottom: 6px;
          letter-spacing: 1px;
        }

        .quality-badge {
          display: flex;
          gap: 8px;
          justify-content: center;
          margin-bottom: 30px;
        }

        .badge {
          background: rgba(229,9,20,0.15);
          border: 1px solid rgba(229,9,20,0.3);
          color: #ff6b6b;
          padding: 3px 12px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 1px;
        }

        /* Countdown */
        .countdown-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 30px;
        }

        .countdown-ring {
          position: relative;
          width: 100px;
          height: 100px;
          margin-bottom: 12px;
        }

        .countdown-ring svg {
          transform: rotate(-90deg);
          position: absolute;
          top: 0; left: 0;
        }

        .countdown-ring circle {
          fill: none;
          stroke-width: 4;
        }

        .ring-bg { stroke: rgba(255,255,255,0.06); }
        .ring-fill { 
          stroke: #e50914;
          stroke-linecap: round;
          stroke-dasharray: 283;
          transition: stroke-dashoffset 1s linear;
          filter: drop-shadow(0 0 6px rgba(229,9,20,0.6));
        }

        .countdown-num {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.8rem;
          font-weight: 700;
          color: white;
        }

        .countdown-text {
          color: #888;
          font-size: 0.85rem;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        /* Buttons */
        .buttons {
          display: flex;
          flex-direction: column;
          gap: 12px;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.5s ease, transform 0.5s ease;
          pointer-events: none;
        }

        .buttons.visible {
          opacity: 1;
          transform: translateY(0);
          pointer-events: all;
        }

        .dl-btn {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 20px;
          border-radius: 12px;
          text-decoration: none;
          font-family: 'Rajdhani', sans-serif;
          font-size: 1rem;
          font-weight: 600;
          letter-spacing: 1px;
          transition: all 0.25s ease;
          border: 1px solid transparent;
          cursor: pointer;
        }

        .dl-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.4);
        }

        .btn-gdrive {
          background: rgba(66, 133, 244, 0.12);
          border-color: rgba(66, 133, 244, 0.35);
          color: #7eb3ff;
        }
        .btn-gdrive:hover { background: rgba(66, 133, 244, 0.22); border-color: rgba(66, 133, 244, 0.6); }

        .btn-telegram {
          background: rgba(0, 136, 204, 0.12);
          border-color: rgba(0, 136, 204, 0.35);
          color: #5bc8f5;
        }
        .btn-telegram:hover { background: rgba(0, 136, 204, 0.22); border-color: rgba(0, 136, 204, 0.6); }

        .btn-direct {
          background: rgba(229, 9, 20, 0.15);
          border-color: rgba(229, 9, 20, 0.4);
          color: #ff6b6b;
        }
        .btn-direct:hover { background: rgba(229, 9, 20, 0.25); border-color: rgba(229, 9, 20, 0.7); }

        .btn-pixeldrain {
          background: rgba(255, 165, 0, 0.1);
          border-color: rgba(255, 165, 0, 0.3);
          color: #ffc966;
        }
        .btn-pixeldrain:hover { background: rgba(255, 165, 0, 0.2); border-color: rgba(255, 165, 0, 0.6); }

        .btn-other {
          background: rgba(255,255,255,0.05);
          border-color: rgba(255,255,255,0.15);
          color: #aaa;
        }
        .btn-other:hover { background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.3); color: white; }

        .btn-icon {
          font-size: 1.3rem;
          flex-shrink: 0;
        }

        .btn-label { flex: 1; }
        .btn-arrow { opacity: 0.5; font-size: 0.9rem; }

        .divider {
          border: none;
          border-top: 1px solid rgba(255,255,255,0.06);
          margin: 8px 0;
        }

        .footer-note {
          text-align: center;
          color: #444;
          font-size: 0.78rem;
          margin-top: 25px;
          letter-spacing: 1px;
        }

        @media (max-width: 480px) {
          .card { padding: 30px 20px; }
        }
      `}</style>

      <div className="bg-grid"></div>
      <div className="bg-glow"></div>

      <div className="container">
        <div className="logo">SIRIES HUB LK</div>

        <div className="card">
          <div className="movie-title" id="mov-title">{links.title}</div>
          <div className="quality-badge">
            {links.quality && <span className="badge">{links.quality}</span>}
            {links.size && <span className="badge">{links.size}</span>}
          </div>

          {/* Countdown */}
          <div className="countdown-wrap" id="countdown-wrap">
            <div className="countdown-ring">
              <svg width="100" height="100" viewBox="0 0 100 100">
                <circle className="ring-bg" cx="50" cy="50" r="45"/>
                <circle className="ring-fill" cx="50" cy="50" r="45" id="ring" style={{strokeDashoffset: '0'}}/>
              </svg>
              <div className="countdown-num" id="count-num">5</div>
            </div>
            <div className="countdown-text">සූදානම් වෙනවා...</div>
          </div>

          {/* Download Buttons */}
          <div className="buttons" id="dl-buttons">
            <div id="btn-gdrive" style={{display:'none'}}>
              <a href="" className="dl-btn btn-gdrive" target="_blank" rel="noopener noreferrer">
                <span className="btn-icon">📁</span>
                <span className="btn-label">Google Drive</span>
                <span className="btn-arrow">↗</span>
              </a>
            </div>
            <div id="btn-telegram" style={{display:'none'}}>
              <a href="" className="dl-btn btn-telegram" target="_blank" rel="noopener noreferrer">
                <span className="btn-icon">✈️</span>
                <span className="btn-label">Telegram</span>
                <span className="btn-arrow">↗</span>
              </a>
            </div>
            <div id="btn-direct" style={{display:'none'}}>
              <a href="" className="dl-btn btn-direct" target="_blank" rel="noopener noreferrer">
                <span className="btn-icon">⬇️</span>
                <span className="btn-label">Direct Download</span>
                <span className="btn-arrow">↗</span>
              </a>
            </div>
            <div id="btn-pixeldrain" style={{display:'none'}}>
              <a href="" className="dl-btn btn-pixeldrain" target="_blank" rel="noopener noreferrer">
                <span className="btn-icon">🌊</span>
                <span className="btn-label">Pixel Drain</span>
                <span className="btn-arrow">↗</span>
              </a>
            </div>
            <div id="btn-other" style={{display:'none'}}>
              <a href="" className="dl-btn btn-other" target="_blank" rel="noopener noreferrer">
                <span className="btn-icon">🔗</span>
                <span className="btn-label">Other Link</span>
                <span className="btn-arrow">↗</span>
              </a>
            </div>
          </div>

          <div className="footer-note">© 2026 SAYURA SUB · ALL RIGHTS RESERVED</div>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{ __html: `
        (function() {
          var links = ${linksJson};
          
          // Set links
          if (links.gdrive) {
            document.getElementById('btn-gdrive').style.display = 'block';
            document.querySelector('#btn-gdrive a').href = links.gdrive;
          }
          if (links.telegram) {
            document.getElementById('btn-telegram').style.display = 'block';
            document.querySelector('#btn-telegram a').href = links.telegram;
          }
          if (links.direct) {
            document.getElementById('btn-direct').style.display = 'block';
            document.querySelector('#btn-direct a').href = links.direct;
          }
          if (links.pixeldrain) {
            document.getElementById('btn-pixeldrain').style.display = 'block';
            document.querySelector('#btn-pixeldrain a').href = links.pixeldrain;
          }
          if (links.other) {
            document.getElementById('btn-other').style.display = 'block';
            document.querySelector('#btn-other a').href = links.other;
          }

          // Countdown
          var count = 5;
          var ring = document.getElementById('ring');
          var numEl = document.getElementById('count-num');
          var btnsEl = document.getElementById('dl-buttons');
          var circumference = 2 * Math.PI * 45;

          ring.style.strokeDasharray = circumference;
          ring.style.strokeDashoffset = 0;

          var timer = setInterval(function() {
            count--;
            numEl.textContent = count;
            var offset = circumference * (1 - count / 5);
            ring.style.strokeDashoffset = offset;

            if (count <= 0) {
              clearInterval(timer);
              document.getElementById('countdown-wrap').style.display = 'none';
              btnsEl.classList.add('visible');
            }
          }, 1000);
        })();
      `}} />
    </>
  );
}

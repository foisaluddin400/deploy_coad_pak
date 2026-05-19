// components/NoDataFound.jsx
import React from "react";

export default function NoDatafound() {
  return (
    <div className="no-data-wrapper">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .no-data-wrapper {
          font-family: 'DM Sans', sans-serif;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 420px;
          padding: 48px 24px;
          width: 100%;
        }

        .no-data-canvas {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 28px;
          max-width: 440px;
          text-align: center;
        }

        .no-data-illustration {
          position: relative;
          width: 180px;
          height: 180px;
        }

        .nd-circle-bg {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: linear-gradient(135deg, #f0f4ff 0%, #e8f0fe 100%);
          border: 2px dashed #c7d7fc;
          animation: nd-spin 18s linear infinite;
        }

        @keyframes nd-spin {
          to { transform: rotate(360deg); }
        }

        .nd-inner {
          position: absolute;
          inset: 24px;
          border-radius: 50%;
          background: #fff;
          box-shadow: 0 8px 32px rgba(99, 120, 255, 0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 4px;
        }

        .nd-icon-grid {
          display: grid;
          grid-template-columns: repeat(3, 12px);
          gap: 5px;
        }

        .nd-dot {
          width: 12px;
          height: 12px;
          border-radius: 3px;
          background: #e2e8f0;
          animation: nd-pulse 2.4s ease-in-out infinite;
        }

        .nd-dot:nth-child(1) { animation-delay: 0s; }
        .nd-dot:nth-child(2) { animation-delay: 0.2s; }
        .nd-dot:nth-child(3) { animation-delay: 0.4s; }
        .nd-dot:nth-child(4) { animation-delay: 0.3s; }
        .nd-dot:nth-child(5) { background: #6378ff; animation-delay: 0.5s; }
        .nd-dot:nth-child(6) { animation-delay: 0.7s; }
        .nd-dot:nth-child(7) { animation-delay: 0.6s; }
        .nd-dot:nth-child(8) { animation-delay: 0.8s; }
        .nd-dot:nth-child(9) { animation-delay: 1s; }

        @keyframes nd-pulse {
          0%, 100% { opacity: 0.3; transform: scale(0.9); }
          50% { opacity: 1; transform: scale(1); }
        }

        .nd-badge {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ff6b6b, #ff4757);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(255, 71, 87, 0.35);
          animation: nd-bounce 2s ease-in-out infinite;
        }

        @keyframes nd-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        .nd-badge svg {
          width: 18px;
          height: 18px;
          fill: none;
          stroke: white;
          stroke-width: 2.5;
          stroke-linecap: round;
        }

        .nd-title {
          font-family: 'Syne', sans-serif;
          font-size: 26px;
          font-weight: 800;
          color: #1a2040;
          letter-spacing: -0.5px;
          margin: 0;
          line-height: 1.2;
        }

        .nd-title span {
          background: linear-gradient(135deg, #6378ff, #a78bfa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .nd-subtitle {
          font-size: 15px;
          color: #64748b;
          margin: 0;
          line-height: 1.65;
          font-weight: 400;
          max-width: 340px;
        }

        .nd-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          justify-content: center;
        }

        .nd-tag {
          padding: 5px 14px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 500;
          border: 1.5px solid;
          letter-spacing: 0.2px;
          cursor: default;
          transition: all 0.2s ease;
        }

        .nd-tag:hover {
          transform: translateY(-2px);
        }

        .nd-tag-1 { color: #6378ff; border-color: #c7d0ff; background: #f5f7ff; }
        .nd-tag-2 { color: #0ea5e9; border-color: #bae6fd; background: #f0f9ff; }
        .nd-tag-3 { color: #10b981; border-color: #a7f3d0; background: #f0fdf4; }
        .nd-tag-4 { color: #f59e0b; border-color: #fde68a; background: #fffbeb; }

        .nd-divider {
          width: 40px;
          height: 3px;
          border-radius: 2px;
          background: linear-gradient(90deg, #6378ff, #a78bfa);
          margin: 0 auto;
        }
      `}</style>

      <div className="no-data-canvas">
        <div className="no-data-illustration">
          <div className="nd-circle-bg" />
          <div className="nd-inner">
            <div className="nd-icon-grid">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="nd-dot" />
              ))}
            </div>
          </div>
          <div className="nd-badge">
            <svg viewBox="0 0 24 24">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </div>
        </div>

        <div className="nd-divider" />

        <h3 className="nd-title">
          No Listings <span>Found</span>
        </h3>

        <p className="nd-subtitle">
          We couldn&apos;t find any businesses matching your current filters.
          Try adjusting your search or clearing some filters to explore more opportunities.
        </p>

        <div className="nd-tags">
          <span className="nd-tag nd-tag-1">Try broader filters</span>
          <span className="nd-tag nd-tag-2">Change location</span>
          <span className="nd-tag nd-tag-3">Different category</span>
          <span className="nd-tag nd-tag-4">Adjust price range</span>
        </div>
      </div>
    </div>
  );
}
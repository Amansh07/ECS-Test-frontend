import React from 'react';
import './StateGovtBadge.css';

export default function StateGovtBadge({ text = 'STATE GOVT. OF INDIA INITIATIVE', className = '' }) {
  return (
    <div
      className={`state-govt-badge bg-grad-12-bg ${className}`}
      style={{ borderLeft: '4px solid #E76F51' }}
      role="status"
      aria-label={text}
    >
      <div className="state-govt-icon">
        <div className="state-govt-icon-inner">
          {/* <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <path d="M12 2C8.13 2 5 5.13 5 9c0 4.97 7 11 7 11s7-6.03 7-11c0-3.87-3.13-7-7-7z" fill="#4B7A00"/>
            <path d="M8.5 9.5C10 11 12 11 12 11s-1-2-3.5-1.5z" fill="#FFFFFF" opacity="0.3"/>
          </svg> */}
            <img
                src="/src/assets/StateIconHomepage.svg"
                alt="State Govt"
                className="w-4 h-4"
            />
        </div>
      </div>

      <div className="state-govt-text">{text}</div>
    </div>
  );
}

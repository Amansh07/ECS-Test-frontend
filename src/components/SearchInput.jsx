// src/components/SearchInput.jsx
export default function SearchInput({ value, onChange, placeholder }) {
  return (
    <div className="search-input-wrapper">
      <svg className="search-icon" viewBox="0 0 24 24" fill="none" width="18" height="18">
        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="search-input"
      />
    </div>
  );
}

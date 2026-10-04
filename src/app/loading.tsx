import React from 'react';

export default function Loading() {
  return (
    <div className="container" style={{ paddingTop: '3rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto 3rem', textAlign: 'center' }}>
        <div style={{ width: '180px', height: '28px', background: 'rgba(255,255,255,0.06)', borderRadius: '999px', margin: '0 auto 1.5rem', animation: 'pulse 1.5s infinite' }} />
        <div style={{ width: '70%', height: '48px', background: 'rgba(255,255,255,0.08)', borderRadius: '12px', margin: '0 auto 1rem', animation: 'pulse 1.5s infinite' }} />
        <div style={{ width: '50%', height: '24px', background: 'rgba(255,255,255,0.04)', borderRadius: '8px', margin: '0 auto', animation: 'pulse 1.5s infinite' }} />
      </div>

      <div className="posts-grid">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="card" style={{ height: '380px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ height: '200px', background: 'rgba(255,255,255,0.05)', animation: 'pulse 1.5s infinite' }} />
            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ width: '80px', height: '20px', background: 'rgba(255,255,255,0.06)', borderRadius: '999px' }} />
              <div style={{ width: '90%', height: '24px', background: 'rgba(255,255,255,0.08)', borderRadius: '6px' }} />
              <div style={{ width: '100%', height: '16px', background: 'rgba(255,255,255,0.04)', borderRadius: '4px' }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

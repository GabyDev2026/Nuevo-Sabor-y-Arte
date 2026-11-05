import React from 'react';

export default function ImagenFondo({ url, alto = '380px' }) {
  return (
    <div
      className="rounded shadow-sm"
      style={{
        height: alto,
        backgroundColor: '#e9ecef',
        backgroundImage: `url("${url}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    ></div>
  );
}
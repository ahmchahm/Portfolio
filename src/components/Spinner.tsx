"use client";
import React from 'react';

export default function Spinner({ size = 6 }: { size?: number }) {
  const s = `${size}rem`;
  return (
    <div className="flex items-center justify-center">
      <svg className="animate-spin" width="24" height="24" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.15)" strokeWidth="4" fill="none" />
        <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" />
      </svg>
    </div>
  );
}

'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import '../styles/home.css';

export default function HomePage() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cryptorank.io/widget/market-state.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); 
    };
  }, []);

  return (
    <main>
      <h1>Welcome to the Crypto Portfolio Tracker</h1>
      <p>Track your investments in real time.</p>

      <div>
        <h2>Your Dashboard</h2>
        <Link href="/dashboard">
          <button>Go to Dashboard</button>
        </Link>
      </div>
    </main>
  );
}

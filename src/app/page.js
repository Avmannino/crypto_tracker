'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import '../styles/home.css';
import TradingViewList from '../components/TradingViewList'; 

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
    // 1) Add the "background-homepage" class here
    <main className="background-homepage">
      <h1 className='coinsight-header'>CoinSight</h1>

      <div>
        <Link href="/dashboard">
          <button>Go to Dashboard</button>
        </Link>
      </div>

      <div>
        {/* Render the TradingViewList Component */}
        <TradingViewList />
      </div>
    </main>
  );
}

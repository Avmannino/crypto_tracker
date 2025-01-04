'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import '../styles/home.css';
// import TradingViewList from '../components/TradingViewList'; 
import TradingViewTicker from '@/components/TradingViewTicker';
import 'animate.css';


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
    <main className="background-homepage">
      <div className='background-screen'>
        <div className="landing-logo-container animate__animated animate__flipInX">
          <img
            src="/images/landing_logo.png"
            alt="Landing Logo"
            className="landing-logo"
          />
        </div>

        <div className="home-ticker">
          <TradingViewTicker />
        </div>

        <div className='landing-buttons'>
          <Link href="/dashboard">
            <button className='dash-btn animate__animated animate__flipInX'>Dashboard</button>
          </Link>
          <Link href="/">
            <button className='learn-btn animate__animated animate__flipInX'>Learn More</button>
          </Link>
        </div>

        <div className="home-list">
          {/* Render the TradingViewList Component */}
          {/* <TradingViewList /> */}
        </div>
      </div>
    </main>
  );
}

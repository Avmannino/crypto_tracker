'use client'; 

import React, { useEffect } from "react";
import '../styles/heatmaps.css';


export default function Heatmaps() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cryptorank.io/widget/market-state.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  

  return (
    <main className="heatmap-page">
      <h1 className="heatmap-header">Live Market State</h1>
      <h3 className="heatmap-time">Period: 24h</h3>
      <div
        className="cr-heatmap-widget"
        data-top="100"
        data-site-url="https://cryptorank.io"
        data-api-url="https://api.cryptorank.io/v0"
        data-range="24H"
        data-order="category"
        style={{
          width: '50%',
          height: '70%',
          position: 'relative',
          top: '5vh',
          right: '4%'
        }}
      >
        <a target="_blank" rel="noopener" href="https://cryptorank.io/heatmaps">
        </a>
      
      </div>
    </main>
  );
}

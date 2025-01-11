import React, { useEffect, useRef } from 'react';
import './styles/charts.css';

const MiniChartWidget = ({ symbol = "BINANCE:BTCUSDT" }) => {
  const container = useRef(null);

  useEffect(() => {
    const originalOnError = window.onerror;


    window.onerror = (message, source, lineno, colno, error) => {
      if (source && source.includes('www.tradingview-widget.com/support')) {
        console.warn('Suppressed TradingView support error:', message);
        return true;
      }
      if (originalOnError) {
        return originalOnError(message, source, lineno, colno, error);
      }
      return false;
    };


    if (container.current) {
      container.current.innerHTML = '';
      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js';
      script.async = true;


      script.textContent = JSON.stringify({
        symbol: symbol,
        width: '100%',
        height: '100%',
        locale: 'en',
        dateRange: '3M',
        colorTheme: 'dark',
        isTransparent: true,
        autosize: true,
        largeChartUrl: '',
        chartOnly: false,
        noTimeScale: false,
      });

      container.current.appendChild(script);
    }


    return () => {
      window.onerror = originalOnError; 
      if (container.current) {
        container.current.innerHTML = ''; 
      }
    };
  }, [symbol]); 

  return (
    <div className="tradingview-minichart-container">
      <div className="tradingview-minichart__widget" ref={container}></div>
    </div>
  );
};

export default MiniChartWidget;

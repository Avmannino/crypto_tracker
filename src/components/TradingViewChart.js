import React, { useEffect, useRef, memo } from 'react';
import './styles/charts.css';

function TradingViewWidget({ symbol = "BINANCE:BTCUSDT" }) {
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
    }

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.type = 'text/javascript';
    script.async = true;

    // Widget configuration
    script.innerHTML = JSON.stringify({
      width: "29%",
      height: "630",
      symbol: symbol,
      interval: "3",
      timezone: "America/New_York",
      theme: "dark",
      style: "1",
      locale: "en",
      backgroundColor: "rgba(0, 0, 0, 1)",
      withdateranges: true,
      allow_symbol_change: true,
      details: false,
      hotlist: false,
      calendar: false,
      hide_volume: true,
      show_popup_button: false,
    });

    if (container.current) {
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
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
}

export default memo(TradingViewWidget);

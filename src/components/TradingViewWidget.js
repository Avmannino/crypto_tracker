import React, { useEffect, useRef, memo } from 'react';

function TradingViewWidget({ symbol = "BINANCE:BTCUSDT" }) {
  const container = useRef(null);

  useEffect(() => {
    // Save the original error handler
    const originalOnError = window.onerror;

    // Suppress errors from TradingView widget
    window.onerror = (message, source, lineno, colno, error) => {
      if (source && source.includes('www.tradingview-widget.com/support')) {
        console.warn('Suppressed TradingView support error:', message);
        return true; // Suppress the error
      }

      // Call the original error handler if it exists
      if (originalOnError) {
        return originalOnError(message, source, lineno, colno, error);
      }
      return false; // Let other errors propagate
    };

    // Clear the container before adding the script
    if (container.current) {
      container.current.innerHTML = '';
    }

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.type = 'text/javascript';
    script.async = true;

    // Widget configuration
    script.innerHTML = JSON.stringify({
      width: "50%",
      height: "510",
      symbol: symbol,
      interval: "1",
      timezone: "America/New_York",
      theme: "dark",
      style: "1",
      locale: "en",
      backgroundColor: "rgba(0, 0, 0, 1)",
      gridColor: "rgba(255, 255, 255, 0.06)",
      withdateranges: true,
      allow_symbol_change: true,
      details: true,
      hotlist: true,
      calendar: false,
      show_popup_button: true,
      popup_width: "1000",
      popup_height: "650",
    });

    if (container.current) {
      container.current.appendChild(script);
    }

    return () => {
      // Restore the original error handler
      window.onerror = originalOnError;

      // Cleanup the container
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

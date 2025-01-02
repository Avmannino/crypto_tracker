import React, { useEffect } from 'react';
import './styles/charts.css';

const TradingViewTicker = () => {
  useEffect(() => {
    // Append the TradingView script dynamically to ensure compatibility
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
    script.innerHTML = JSON.stringify({
      symbols: [
        { proName: "FOREXCOM:SPXUSD", title: "S&P 500 Index" },
        { proName: "FOREXCOM:NSXUSD", title: "US 100 Cash CFD" },
        { proName: "FX_IDC:EURUSD", title: "EUR to USD" },
        { proName: "BITSTAMP:BTCUSD", title: "Bitcoin" },
        { proName: "BITSTAMP:ETHUSD", title: "Ethereum" },
        { description: "MATIC", proName: "BINANCEUS:MATICUSDT" },
        { description: "Solana", proName: "BINANCEUS:SOLUSDT" },
        { description: "DOGE", proName: "BINANCEUS:DOGEUSDT" },
        { description: "XRP", proName: "BINANCEUS:XRPUSDT" },
        { description: "Cardano", proName: "BINANCEUS:ADAUSDT" },
        { description: "Shiba Inu", proName: "BINANCEUS:SHIBUSDT" },
        { description: "Fantom", proName: "BINANCEUS:FTMUSDT" },
        { description: "Chainlink", proName: "BINANCEUS:LINKUSDT" },
        { description: "Stellar Lumens", proName: "BINANCEUS:XLMUSDT" },
        { description: "PEPE", proName: "BINANCEUS:PEPEUSDT" },
        { description: "Litecoin", proName: "BINANCEUS:LTCBTC" },
        { description: "SUI", proName: "BINANCEUS:SUIUSDT" },
        { description: "Hedera", proName: "BINANCEUS:HBARUSDT" },
        { description: "DOT", proName: "BINANCEUS:DOTUSDT" },
        { description: "Uniswap", proName: "BINANCEUS:UNIUSDT" },
        { description: "BONK", proName: "BINANCEUS:BONKUSDT" },
        { description: "IOTA", proName: "BINANCEUS:IOTAUSDT" },
        { description: "Bitcoin Cash", proName: "BINANCEUS:BCHUSDT" },
        { description: "Ethereum Classic", proName: "BINANCEUS:ETCUSDT" },
        { description: "Avalanche", proName: "BINANCEUS:AVAXBTC" },
        { description: "Compound", proName: "BINANCEUS:COMPUSDT" },
        { description: "AAVE", proName: "BINANCEUS:AAVEUSDT" },
        { description: "Algorand", proName: "BINANCEUS:ALGOUSDT" },
      ],
      showSymbolLogo: true,
      isTransparent: false,
      displayMode: "compact",
      colorTheme: "dark",
      locale: "en",
    });
    document.querySelector('.tradingview-widget-container').appendChild(script);
  }, []);

  return (
    <div className="tradingview-ticker-container">
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright">
        <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
        </a>
      </div>
    </div>
  );
};

export default TradingViewTicker;

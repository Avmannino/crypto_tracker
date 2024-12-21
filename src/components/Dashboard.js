'use client';

import { useState, useEffect } from 'react';
import './styles/dashboard.css';
import { ColorType, createChart } from 'lightweight-charts';
import Navbar from './Navbar';
import VerticalButtonStack from './Navbar';

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [cryptoData, setCryptoData] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);
  const [candlestickData, setCandlestickData] = useState([]);
  const items = ['BTC', 'ETH', 'SOL', 'XRP', 'AAVE', 'DOGE', 'SHIB', 'ADA', 'AVAX', 'LINK', 'BCH', 'UNI', 'XLM', 'LTC', 'ETC', 'NEAR', 'HBAR', 'FTM', 'ALGO', 'THETA', 'RUNE', 'INJ', 'MATIC', 'DOT', 'COMP'];

  const coinIdMapping = {
    BTC: 'bitcoin',
    ETH: 'ethereum',
    SOL: 'solana',
    XRP: 'ripple',
    AAVE: 'aave',
    DOGE: 'dogecoin',
    SHIB: 'shiba-inu',
    ADA: 'cardano',
    AVAX: 'avalanche-2',
    LINK: 'chainlink',
    BCH: 'bitcoin-cash',
    UNI: 'uniswap',
    XLM: 'stellar',
    LTC: 'litecoin',
    ETC: 'ethereum-classic',
    NEAR: 'near',
    HBAR: 'hedera',
    FTM: 'fantom',
    ALGO: 'algorand',
    THETA: 'theta',
    RUNE: 'thorchain',
    INJ: 'injective',
    MATIC: 'polygon',
    DOT: 'polkadot',
    COMP: 'compound',
  };

  const fetchCryptoPrices = async () => {
    try {
      const response = await fetch('https://api.coincap.io/v2/assets');
      const data = await response.json();
      const prices = data.data.reduce((acc, coin) => {
        if (items.includes(coin.symbol)) {
          acc[coin.symbol] = {
            price: coin.priceUsd,
            changePercent24Hr: coin.changePercent24Hr,
            volumeUsd24Hr: coin.volumeUsd24Hr,
          };
        }
        return acc;
      }, {});
      setCryptoData(prevData => ({ ...prevData, ...prices }));
    } catch (error) {
      console.error('Error fetching crypto data:', error);
    }
  };

  const fetchCandlestickData = async (symbol) => {
    try {
      const coinId = coinIdMapping[symbol];
      if (!coinId) return;

      const url = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7&interval=daily`;
      const response = await fetch(url);

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();

      if (data && data.prices) {
        const formattedData = data.prices.map((priceData) => ({
          time: new Date(priceData[0]).toISOString().split('T')[0],
          open: priceData[1],
          high: priceData[1],
          low: priceData[1],
          close: priceData[1],
        }));
        setCandlestickData(formattedData);
      }
    } catch (error) {
      console.error('Error fetching candlestick data:', error);
      setCandlestickData([]);
    }
  };

  useEffect(() => {
    fetchCryptoPrices();
    const interval = setInterval(fetchCryptoPrices, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (selectedItem) {
      fetchCandlestickData(selectedItem);
    }
  }, [selectedItem]);

  const filteredItems = items.filter(item =>
    item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatPrice = (price) => price ? '$' + parseFloat(price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 3 }) : '$0.00';
  const formatChange = (change) => `${parseFloat(change).toFixed(2)}%`;
  const formatVolume = (volume) => {
    if (!volume) return '0';
    const value = parseFloat(volume);
    if (value >= 1e9) return `${(value / 1e9).toFixed(1)}B`;
    if (value >= 1e6) return `${(value / 1e6).toFixed(1)}M`;
    if (value >= 1e3) return `${(value / 1e3).toFixed(1)}K`;
    return `${value.toFixed(1)}`;
  };

  const renderCryptoData = (item) => {
    const data = cryptoData[item] || {};
    const price = data.price ? formatPrice(data.price) : '$0.00';
    const change = data.changePercent24Hr ? formatChange(data.changePercent24Hr) : '0.00%';
    const volume = data.volumeUsd24Hr ? formatVolume(data.volumeUsd24Hr) : '0.00';
    const changeColor = parseFloat(data.changePercent24Hr) > 0 ? 'green' : 'red';

    return (
      <div key={item} className="list-item" onClick={() => setSelectedItem(item)}>
        <span>{item}</span>
        <span className="crypto-price">
          {price}
          <span style={{ color: changeColor, marginLeft: '20px', fontSize: '13.5px' }}>
            {change}
          </span>
        </span>
        <span className="crypto-volume">
          Vol: {volume}
        </span>
      </div>
    );
  };

  return (
    <main className="dashboard-page">
      <div className="side-navbar">
        <VerticalButtonStack />
      </div>

      <div className="dashboard-layout">
        <aside className="scrollable-list">
          <input
            type="text"
            placeholder="🔍 Search for a market"
            className="search-bar"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          {filteredItems.length > 0 ? (
            filteredItems.map(renderCryptoData)
          ) : (
            <p className="no-results">No results found</p>
          )}
        </aside>

        <div className="monthly-recap">
          <p className="today">Today</p>
          <p className="week">7 Days</p>
          <p className="month">30 Days</p>
        </div>

        <section className="dashboard-content">
          <h1 className="current-balance">Current Balance: </h1>
          <div className="holdings-summary">
            <h2>Holdings Summary</h2>
            {selectedItem && candlestickData.length > 0 ? (
              <Candlestick data={candlestickData} />
            ) : (
              <p>Select a cryptocurrency to view the chart.</p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

'use client'; 

import { useState, useEffect } from 'react';
import './styles/dashboard.css'; 

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [cryptoData, setCryptoData] = useState({});
  const items = ['BTC', 'ETH', 'SOL', 'XRP', 'AAVE', 'DOGE', 'SHIB', 'ADA', 'AVAX', 'LINK', 'BCH', 'UNI', 'XLM', 'LTC', 'ETC', 'NEAR', 'HBAR', 'FTM', 'ALGO', 'THETA', 'RUNE', 'INJ', 'MATIC', 'DOT', 'COMP'];


  const fetchCryptoPrices = async () => {
    try {
      const response = await fetch('https://api.coincap.io/v2/assets');
      const data = await response.json();
      console.log('Fetched Data:', data);

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

      console.log('Filtered Prices:', prices);

      setCryptoData(prevData => ({ ...prevData, ...prices }));
    } catch (error) {
      console.error('Error fetching crypto data:', error);
    }
  };


  useEffect(() => {
    fetchCryptoPrices();
    const interval = setInterval(fetchCryptoPrices, 2500); // Update every 3 seconds
    return () => clearInterval(interval);
  }, []);


  const filteredItems = items.filter(item =>
    item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatPrice = (price) => {
    if (price) {
      return '$' + parseFloat(price).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 3
      });
    }
    return '$0.00';
  };

  const formatChange = (change) => {
    const parsedChange = parseFloat(change);
    return parsedChange.toFixed(2) + '%';
  };

  const formatVolume = (volume) => {
    if (!volume) return '0';

    const value = parseFloat(volume);
    if (value >= 1e9) {
      return `${(value / 1e9).toFixed(1)}B`;
    } else if (value >= 1e6) {
      return `${(value / 1e6).toFixed(1)}M`;
    } else if (value >= 1e3) {
      return `${(value / 1e3).toFixed(1)}K`;
    } else {
      return `${value.toFixed(1)}`;
    }
  };


  return (
    <main className="dashboard">
      <header className="dashboard-header">
        <h1>Crypto Portfolio Dashboard</h1>
        <p>View your holdings, track performance, and manage transactions.</p>
      </header>

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
            filteredItems.map((item, index) => {
              const data = cryptoData[item] || {};
              const price = data.price ? formatPrice(data.price) : '$0.00';
              const change = data.changePercent24Hr ? formatChange(data.changePercent24Hr) : '0.00%';
              const volume = data.volumeUsd24Hr ? formatVolume(data.volumeUsd24Hr) : '0.00';
              const changeColor = parseFloat(data.changePercent24Hr) > 0 ? 'green' : 'red';

              return (
                <div key={index} className="list-item">
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
            })
          ) : (
            <p className="no-results">No results found</p>
          )}
        </aside>

        <div className="transaction-history">
          <h2>Recent Transactions</h2>
          <button className='transaction-btn'>Add Transaction</button>
          <ul>
            <li className='transactions-list'>No transactions yet.</li>
          </ul>
        </div>

   
        <section className="dashboard-content">
          <div className="holdings-summary">
            <h2>Holdings Summary</h2>
            <p>Total Value: $0.00</p>
            <p>24h Change: 0%</p>
          </div>
        </section>
      </div>
    </main>
  );
}

'use client'; // Mark this file as a client-side component

import { useState, useEffect } from 'react';
import './styles/dashboard.css'; // Import the dashboard styles

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [cryptoPrices, setCryptoPrices] = useState({});
  const items = ['BTC', 'ETH', 'SOL', 'XRP', 'AAVE', 'DOGE', 'SHB', 'ADA', 'AVAX', 'LINK', 'BCH', 'UNI', 'XLM', 'LTC', 'PEPE', 'ETC', 'WIF', 'COMP'];

  // Function to fetch real-time data from CoinCap API
  const fetchCryptoPrices = async () => {
    try {
      const response = await fetch('https://api.coincap.io/v2/assets');
      const data = await response.json();
      console.log('Fetched Data:', data); // Debugging: Log the fetched data

      const prices = data.data.reduce((acc, coin) => {
        if (items.includes(coin.symbol)) {
          acc[coin.symbol] = coin.priceUsd;
        }
        return acc;
      }, {});

      console.log('Filtered Prices:', prices); // Debugging: Log the filtered prices

      setCryptoPrices(prevPrices => ({ ...prevPrices, ...prices }));
    } catch (error) {
      console.error('Error fetching crypto data:', error);
    }
  };

  // Fetch data on component mount and every 5 seconds
  useEffect(() => {
    fetchCryptoPrices(); // Initial fetch
    const interval = setInterval(fetchCryptoPrices, 5000); // Update every 5 seconds
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  // Filter the list based on the search query
  const filteredItems = items.filter(item =>
    item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to format the price as $xxx,xxx.xx
  const formatPrice = (price) => {
    if (price) {
      return '$' + parseFloat(price).toLocaleString('en-US', { 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2 
      });
    }
    return '$0.00';
  };

  return (
    <main className="dashboard">
      <header className="dashboard-header">
        <h1>Crypto Portfolio Dashboard</h1>
        <p>View your holdings, track performance, and manage transactions.</p>
      </header>

      <div className="dashboard-layout">
        {/* Scrollable list with search functionality */}
        <aside className="scrollable-list">
          <input
            type="text"
            placeholder="Search for a market"
            className="search-bar"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <div key={index} className="list-item">
                <span>{item}</span>
                <span className="crypto-price">
                  {formatPrice(cryptoPrices[item])}
                </span>
              </div>
            ))
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

        {/* Main dashboard content */}
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

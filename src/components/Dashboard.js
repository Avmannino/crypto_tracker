'use client'; // Mark this file as a client-side component

import { useState } from 'react';
import './styles/dashboard.css'; // Import the dashboard styles

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const items = ['BTC', 'ETH', 'SOL', 'XRP', 'AAVE'];

  // Filter the list based on the search query
  const filteredItems = items.filter(item =>
    item.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                {item}
              </div>
            ))
          ) : (
            <p className="no-results">No results found</p>
          )}
        </aside>

        {/* Main dashboard content */}
        <section className="dashboard-content">
          <div className="holdings-summary">
            <h2>Holdings Summary</h2>
            <p>Total Value: $0.00</p>
            <p>24h Change: 0%</p>
          </div>

          <div className="transaction-history">
            <h2>Recent Transactions</h2>
            <ul>
              <li>No transactions yet.</li>
            </ul>
          </div>

          <div className="add-transaction">
            <h2>Add a New Transaction</h2>
            <button>Add Transaction</button>
          </div>
        </section>
      </div>
    </main>
  );
}

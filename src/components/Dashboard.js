'use client';

import { useState, useEffect } from 'react';
import './styles/dashboard.css';
import Navbar from './Navbar';
import VerticalButtonStack from './Navbar';

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [cryptoData, setCryptoData] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);
  const [candlestickData, setCandlestickData] = useState([]);
  const [isListOpen, setIsListOpen] = useState(true);
  const [holdings, setHoldings] = useState([]); 

  const items = ['BTC', 'ETH', 'SOL', 'XRP', 'AAVE', 'DOGE', 'SHIB', 'ADA', 'AVAX', 'LINK', 'BCH', 'UNI', 'XLM', 'LTC', 'ETC', 'NEAR', 'HBAR', 'FTM', 'ALGO', 'THETA', 'RUNE', 'INJ', 'MATIC', 'DOT', 'COMP', 'TRX', 'XMR', 'OKB', 'RAY', 'EOS', 'HNT', 'FLOW', 'GALA', 'QNT', 'IOTA', 'BSV', 'AR', 'MKR'];

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
    TRX: 'tron',
    XMR: 'monero',
    OKB: 'okb',
    RAY: 'raydium',
    EOS: 'eos',
    HNT: 'helium',
    FLOW: 'flow',
    GALA: 'gala',
    QNT: 'quant',
    IOTA: 'iota',
    BSV: 'bitcoin sv',
    AR: 'arweave',
    MKR: 'maker',
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
          };
        }
        return acc;
      }, {});
      setCryptoData((prevData) => ({ ...prevData, ...prices }));
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

  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatPrice = (price) =>
    price
      ? '$' +
        parseFloat(price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
      : '$0.00';

  const formatChange = (change) => `${parseFloat(change).toFixed(2)}%`;

  const renderCryptoData = (item) => {
    const data = cryptoData[item] || {};
    const price = data.price ? formatPrice(data.price) : '$0.00';
    const change = data.changePercent24Hr ? formatChange(data.changePercent24Hr) : '0.00%';
    const changeColor = parseFloat(data.changePercent24Hr) > 0 ? '#189f00d6' : '#d30000b7';

    return (
      <div key={item} style={{ minWidth: '110px' }} className="price-box" onClick={() => setSelectedItem(item)}>
        <span className="coin-label" style={{ marginBottom: '5px', marginTop: '-5px' }}>{item}</span>
        <span style={{ color: '#ffffffe6', marginTop: '-1px', marginBottom: '0px' }} className="crypto-price">
          {price}
          <span style={{ color: changeColor, fontSize: '90%', fontWeight: 'normal', marginTop: '-4px', marginBottom: '-3px' }}>{change}</span>
        </span>
      </div>
    );
  };

  const toggleList = () => setIsListOpen(!isListOpen);

  return (
    <main className="dashboard-page">
      <img src="/images/cryptbulllogo.png" alt="Dashboard Logo" className="dashboard-logo" />
      <input
        type="text"
        placeholder="  🔍 Search for an asset"
        className="search-bar"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <aside className={`scrollable-list ${isListOpen ? 'open' : 'closed'}`}>
        <button onClick={toggleList} className="toggle-button">
          {isListOpen ? '➖' : '➕'}
        </button>
        {isListOpen && (
          <div className="horizontal-scroll">
            {filteredItems.length > 0 ? filteredItems.map(renderCryptoData) : null}
            {filteredItems.length > 0 ? filteredItems.map(renderCryptoData) : null}
          </div>
        )}
      </aside>

      <div className="side-navbar">
        <VerticalButtonStack />
      </div>

      <div className="dashboard-layout">
        <section className="dashboard-content">
          <div className="holdings-summary">
            <h2>Holdings Summary</h2>
            <div className='balance-info'>
              <p className="current-balance">Balance: </p>
              <hr className="styled-line-break" />
                <div className="monthly-recap">
                  <p className="today">24h</p>
                  <p className="week">7d</p>
                  <p className="month">30d</p>
                </div>
            </div>
            <table className="crypto-table">
              <thead>
                <tr>
                  <th>Coin</th>
                  <th>Average Cost Basis</th>
                  <th>Holdings</th>
                  <th>PNL</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
              </tbody>
            </table>
            {selectedItem && candlestickData.length > 0 ? (
              <div className="chart-container">{/* Chart Component */}</div>
            ) : (
              <p className="chart-placeholder">Select an asset to view the chart.</p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

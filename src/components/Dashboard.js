'use client';

import { useState, useEffect } from 'react';
import './styles/dashboard.css';
import Navbar from './Navbar';
import VerticalButtonStack from './Navbar';
import TradingViewWidget from './TradingViewWidget';


export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [cryptoData, setCryptoData] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);
  const [isListOpen, setIsListOpen] = useState(true);

  const items = [
    'BTC', 'ETH', 'SOL', 'XRP', 'AAVE', 'DOGE', 'SHIB', 'ADA', 'AVAX',
    'LINK', 'BCH', 'UNI', 'XLM', 'LTC', 'ETC', 'NEAR', 'HBAR', 'FTM',
    'ALGO', 'THETA', 'RUNE', 'INJ', 'MATIC', 'DOT', 'COMP', 'TRX',
    'XMR', 'OKB', 'EOS', 'FLOW', 'GALA', 'QNT', 'IOTA', 'BSV', 'AR', 'MKR',
  ];

  const coinIdMapping = {
    BTC: 'BINANCE:BTCUSDT',
    ETH: 'BINANCE:ETHUSDT',
    SOL: 'BINANCE:SOLUSDT',
    XRP: 'BINANCE:XRPUSDT',
    AAVE: 'BINANCE:AAVEUSDT',
    DOGE: 'BINANCE:DOGEUSDT',
    SHIB: 'BINANCE:SHIBUSDT',
    ADA: 'BINANCE:ADAUSDT',
    AVAX: 'BINANCE:AVAXUSDT',
    LINK: 'BINANCE:LINKUSDT',
    BCH: 'BINANCE:BCHUSDT',
    UNI: 'BINANCE:UNIUSDT',
    XLM: 'BINANCE:XLMUSDT',
    LTC: 'BINANCE:LTCUSDT',
    ETC: 'BINANCE:ETCUSDT',
    NEAR: 'BINANCE:NEARUSDT',
    HBAR: 'BINANCE:HBARUSDT',
    FTM: 'BINANCE:FTMUSDT',
    ALGO: 'BINANCE:ALGOUSDT',
    THETA: 'BINANCE:THETAUSDT',
    RUNE: 'BINANCE:RUNEUSDT',
    INJ: 'BINANCE:INJUSDT',
    MATIC: 'BINANCE:MATICUSDT',
    DOT: 'BINANCE:DOTUSDT',
    COMP: 'BINANCE:COMPUSDT',
    TRX: 'BINANCE:TRXUSDT',
    XMR: 'BINANCE:XMRUSDT',
    OKB: 'BINANCE:OKBUSDT',
    EOS: 'BINANCE:EOSUSDT',
    FLOW: 'BINANCE:FLOWUSDT',
    GALA: 'BINANCE:GALAUSDT',
    QNT: 'BINANCE:QNTUSDT',
    IOTA: 'BINANCE:IOTAUSDT',
    BSV: 'BINANCE:BSVUSDT',
    AR: 'BINANCE:ARUSDT',
    MKR: 'BINANCE:MKRUSDT',
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

  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    fetchCryptoPrices();
    const interval = setInterval(fetchCryptoPrices, 2500);
    return () => clearInterval(interval);
  }, []);

  const renderCryptoData = (item) => {
    const data = cryptoData[item] || {};
    const price = data.price ? `$${parseFloat(data.price).toFixed(2)}` : '$0.00';
    const change = data.changePercent24Hr
      ? `${parseFloat(data.changePercent24Hr).toFixed(2)}%`
      : '0.00%';
    const changeColor = parseFloat(data.changePercent24Hr) > 0 ? '#33ca5b' : '#ff302a';

    return (
      <div
        key={item}
        style={{ minWidth: '110px' }}
        className="price-box"
        onClick={() => setSelectedItem(item)}
      >
        <span className="coin-label" style={{ marginBottom: '5px', marginTop: '-5px' }}>
          {item}
        </span>
        <span
          style={{ color: '#ffffffe6', marginTop: '-1px', marginBottom: '0px' }}
          className="crypto-price"
        >
          {price}
          <span
            style={{
              color: changeColor,
              fontSize: '90%',
              fontWeight: 'normal',
              marginTop: '-4px',
              marginBottom: '-3px',
            }}
          >
            {change}
          </span>
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
        placeholder="🔍 Search for an asset"
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
          </div>
        )}
      </aside>

      <div className="side-navbar">
        <VerticalButtonStack />
      </div>

      <div className="dashboard-layout">
        <section className="dashboard-content">
          <div className="balance-info">
            <p className="current-balance">Balance: $</p>
            <hr className="styled-line-break" />
          </div>
          <div className="holdings-summary">
            <h2>Holdings Summary</h2>
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
                <tr>
                  <td>BTC</td>
                  <td>$20,000</td>
                  <td>0.5</td>
                  <td>$2,500</td>
                  <td>Edit</td>
                </tr>
              </tbody>
            </table>
            {selectedItem ? (
                <TradingViewWidget symbol={coinIdMapping[selectedItem]} />
            ) : (
              <p className="chart-placeholder">Select an asset to view the chart.</p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

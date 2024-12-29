'use client';

import { useState, useEffect } from 'react';
import './styles/dashboard.css';
import Navbar from './Navbar';
import VerticalButtonStack from './Navbar';
import ApexChart from './ApexChart'; // Import the new component

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [cryptoData, setCryptoData] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);
  const [isListOpen, setIsListOpen] = useState(true);
  const [holdings, setHoldings] = useState([]);

  const items = [
    'BTC', 'ETH', 'SOL', 'XRP', 'AAVE', 'DOGE', 'SHIB', 'ADA', 'AVAX',
    'LINK', 'BCH', 'UNI', 'XLM', 'LTC', 'ETC', 'NEAR', 'HBAR', 'FTM',
    'ALGO', 'THETA', 'RUNE', 'INJ', 'MATIC', 'DOT', 'COMP', 'TRX',
    'XMR', 'OKB', 'RAY', 'EOS', 'HNT', 'FLOW', 'GALA', 'QNT', 'IOTA',
    'BSV', 'AR', 'MKR',
  ];

  const coinIdMapping = {
    BTC: 'btc',
    ETH: 'eth',
    SOL: 'sol',
    XRP: 'xrp',
    AAVE: 'aave',
    DOGE: 'doge',
    SHIB: 'shib',
    ADA: 'ada',
    AVAX: 'avax',
    LINK: 'link',
    BCH: 'bch',
    UNI: 'uni',
    XLM: 'xlm',
    LTC: 'ltc',
    ETC: 'etc',
    NEAR: 'near',
    HBAR: 'hbar',
    FTM: 'ftm',
    ALGO: 'algo',
    THETA: 'theta',
    RUNE: 'rune',
    INJ: 'inj',
    MATIC: 'matic',
    DOT: 'dot',
    COMP: 'comp',
    TRX: 'trx',
    XMR: 'xmr',
    OKB: 'okb',
    RAY: 'ray',
    EOS: 'eos',
    HNT: 'hnt',
    FLOW: 'flow',
    GALA: 'gala',
    QNT: 'qnt',
    IOTA: 'iota',
    BSV: 'bsv',
    AR: 'ar',
    MKR: 'mkr',
  };

  useEffect(() => {
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

    fetchCryptoPrices();
    const interval = setInterval(fetchCryptoPrices, 2500);
    return () => clearInterval(interval);
  }, []);

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
    const changeColor = parseFloat(data.changePercent24Hr) > 0 ? '#33ca5b' : '#ff302a';

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
            {selectedItem ? (
              <>
                {console.log('Selected Item:', selectedItem, 'Mapped to:', coinIdMapping[selectedItem])}
                <ApexChart symbol={coinIdMapping[selectedItem]} /> {/* Map symbol to CoinCap baseId */}
              </>
            ) : (
              <p className="chart-placeholder">Select an asset to view the chart.</p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

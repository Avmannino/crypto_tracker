// import React, { useEffect, useRef } from 'react';
// import './styles/charts.css';

// function TradingViewList() {
//   const containerRef = useRef(null);

//   useEffect(() => {
//     if (containerRef.current) {
//       containerRef.current.innerHTML = ''; // Clear existing widget content

//       const script = document.createElement('script');
//       script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js';
//       script.async = true;
//       script.type = 'text/javascript';
//       script.innerHTML = JSON.stringify({
//         width: 460,
//         height: 600,
//         symbolsGroups: [
//           {
//             name: 'Indices',
//             originalName: 'Indices',
//             symbols: [
//               { name: 'BINANCEUS:BTCUSDT' },
//               { name: 'BINANCEUS:ETHUSDT' },
//               { name: 'BINANCEUS:SOLUSDT' },
//               { name: 'BINANCEUS:DOGEUSDT' },
//               { name: 'BINANCEUS:HBARUSDT' },
//               { name: 'BINANCEUS:ADAUSDT' },
//               { name: 'BINANCEUS:LINKUSDT' },
//               { name: 'BINANCEUS:SHIBUSDT' },
//               { name: 'BINANCEUS:LTCUSDT' },
//               { name: 'BINANCEUS:DOTUSDT' },
//               { name: 'BINANCEUS:GALAUSDT' },
//               { name: 'BINANCEUS:AVAXUSDT' },
//               { name: 'BINANCEUS:FTMUSDT' },
//               { name: 'BINANCEUS:PEPEUSDT' },
//               { name: 'BINANCEUS:QNTUSDT' },
//               { name: 'BINANCEUS:MKRUSDT' },
//               { name: 'BINANCEUS:BCHUSDT' },
//               { name: 'BINANCEUS:THETAUSDT' },
//               { name: 'BINANCEUS:UNIUSDT' },
//               { name: 'BINANCEUS:XLMUSDT' },
//               { name: 'BINANCEUS:ETCUSDT' },
//               { name: 'BINANCEUS:NEARUSDT' },
//               { name: 'BINANCEUS:ALGOUSDT' },
//               { name: 'BINANCEUS:COMPUSDT' },
//               { name: 'BINANCEUS:EOSUSDT' },
//               { name: 'BINANCEUS:FLOWUSDT' },
//               { name: 'BINANCEUS:IOTAUSDT' },
//             ],
//           },
//         ],
//         showSymbolLogo: true,
//         isTransparent: false,
//         colorTheme: 'dark',
//         locale: 'en',
//         backgroundColor: '#131722',
//       });

//       containerRef.current.appendChild(script);
//     }
//   }, []);

//   return (
//     <div className="tradingview-list-container" ref={containerRef}>
//       <div className="tradingview-list-container"></div>
//       <div className="tradingview-list-copyright">
//         <a
//           href="https://www.tradingview.com/"
//           rel="noopener nofollow"
//           target="_blank"
//         >
//           <span className="blue-text">Track all markets on TradingView</span>
//         </a>
//       </div>
//     </div>
//   );
// }

// export default TradingViewList;

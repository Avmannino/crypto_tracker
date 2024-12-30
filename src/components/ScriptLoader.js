// 'use client';

// import Script from 'next/script';
// import { useEffect } from 'react';

// export default function ScriptLoader() {
//   useEffect(() => {
//     const initializeHeatmaps = () => {
//       console.log("Initializing heatmaps");
//       setTimeout(() => {
//         const event = new Event('load');
//         window.dispatchEvent(event);
//       }, 500); // Adjust delay if needed
//     };

//     initializeHeatmaps();
//   }, []);

//   return (
//     <Script
//       src="https://cryptorank.io/widget/market-state.js"
//       strategy="lazyOnload"
//       onLoad={() => console.log('Cryptorank script loaded successfully')}
//       onError={() => console.error('Failed to load Cryptorank script')}
//     />
//   );
// }

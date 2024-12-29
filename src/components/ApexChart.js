import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import './styles/charts.css';


export default function ApexChart({ symbol, height = 355, width = 505 }) {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCryptoCompareCandlestickData = async (symbol, interval = 'histoday') => {
    try {
      console.log('Fetching candlestick data for symbol:', symbol);

      const response = await fetch(
        `https://min-api.cryptocompare.com/data/v2/${interval}?fsym=${symbol}&tsym=USD&limit=30`
      );
      const { Data } = await response.json();

      console.log('API Response:', Data);

      if (!Data || !Data.Data || Data.Data.length === 0) {
        console.warn('No data returned from API for', symbol);
        setChartData([]);
        setLoading(false);
        return;
      }

      const formattedData = Data.Data.map((entry) => ({
        x: entry.time * 1000, // Convert UNIX timestamp to milliseconds
        y: [entry.open, entry.high, entry.low, entry.close], // OHLC values
      }));

      console.log('Formatted Chart Data:', formattedData);

      setChartData(formattedData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching CryptoCompare candlestick data:', error);
      setChartData([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (symbol) {
      setLoading(true);
      fetchCryptoCompareCandlestickData(symbol);
    }
  }, [symbol]);

  const options = {
    chart: {
      type: 'candlestick',
    },
    title: {
      text: `${symbol} Chart`,
      align: 'left',
    },
    xaxis: {
      type: 'datetime',
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  };

  const series = [
    {
      data: chartData,
    },
  ];

  return (
    <div className="chart-container">
      {loading ? (
        <p>Loading chart...</p>
      ) : chartData.length > 0 ? (
        <Chart options={options} series={series} type="candlestick" height={height} width={width} />
      ) : (
        <p>No candlestick data available for {symbol}.</p>
      )}
    </div>
  );
}

import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';

const Candlestick = ({ data }) => {
  const chartContainerRef = useRef();

  useEffect(() => {
    // Log the data for debugging
    console.log("Original Data:", data);

    // Sort data by time (ascending order) and check for duplicate time entries
    const sortedData = [...data].sort((a, b) => a.time - b.time);

    // Handle duplicate time entries
    const uniqueSortedData = [];
    let lastTime = null;

    sortedData.forEach((item) => {
      if (item.time !== lastTime) {
        uniqueSortedData.push(item);
        lastTime = item.time;
      } else {
        // Log duplicate time entries for debugging
        console.warn(`Duplicate time found and removed: ${item.time}`);
      }
    });

    // Log the cleaned data
    console.log("Processed (Unique) Data:", uniqueSortedData);

    // Initialize the chart
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 500, // Adjusted for proper visibility
      layout: {
        backgroundColor: '#ffffff',
        textColor: '#000',
        borderRadius: '20'
      },
      grid: {
        vertLines: { color: '#f0f3fa' },
        horzLines: { color: '#f0f3fa' },
      },
    });

    const candlestickSeries = chart.addCandlestickSeries();
    candlestickSeries.setData(uniqueSortedData);

    // Resize handler to adjust chart size
    const resizeHandler = () => {
      chart.resize(chartContainerRef.current.clientWidth, 300); // Keep resizing based on container
    };

    window.addEventListener('resize', resizeHandler);
    return () => {
      window.removeEventListener('resize', resizeHandler);
      chart.remove();
    };
  }, [data]);

  return <div ref={chartContainerRef} style={{ position: 'relative', width: '40%', height: '500px' }} />;
};

export default Candlestick;

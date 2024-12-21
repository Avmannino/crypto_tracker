import React from "react";
import './styles/dashboard.css';

const VerticalButtonStack = () => {
  return (
    <div className="button-stack">
      <a href="/" className="stacked-button home-button">Home</a>
      <a href="/holdings" className="stacked-button holdings-button">Holdings</a>
      <a href="/analytics" className="stacked-button analytics-button">Analytics</a>
      <a href="/charts" className="stacked-button charts-button">Charts</a>
      <a href="/settings" className="stacked-button settings-button">Settings</a>
    </div>
  );
};

export default VerticalButtonStack;


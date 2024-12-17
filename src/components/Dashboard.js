import './styles/dashboard.css'; // Import the dashboard styles

export default function Dashboard() {
  return (
    <main className="dashboard">
      <header className="dashboard-header">
        <h1>Crypto Portfolio Dashboard</h1>
        <p>View your holdings, track performance, and manage transactions.</p>
      </header>

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
    </main>
  );
}

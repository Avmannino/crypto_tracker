import Link from 'next/link';
import '../styles/home.css';  // Import the home.css for styling

export default function HomePage() {
  return (
    <main>
      <h1>Welcome to the Crypto Portfolio Tracker</h1>
      <p>Track your investments in real time.</p>

      {/* Link to /dashboard */}
      <div>
        <h2>Your Dashboard</h2>
        <Link href="/dashboard">
          <button>Go to Dashboard</button> {/* Clicking this button will navigate to /dashboard */}
        </Link>
      </div>
    </main>
  );
}

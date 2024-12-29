import ScriptLoader from '../components/ScriptLoader';

export const metadata = {
  title: 'Crypto Portfolio Tracker',
  description: 'Track your cryptocurrency holdings and transactions in real time.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Additional metadata */}
      </head>
      <body>
        {children}
        <ScriptLoader /> {/* Load the script using a client component */}
      </body>
    </html>
  );
}

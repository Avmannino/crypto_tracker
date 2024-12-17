export const metadata = {
  title: 'Crypto Portfolio Tracker',
  description: 'Track your cryptocurrency holdings and transactions in real time.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

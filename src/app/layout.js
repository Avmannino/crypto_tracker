export const metadata = {
  title: 'Crypto Portfolio Tracker',
  description: 'Track your cryptocurrency holdings and transactions in real time.',
};

const noOverlayWorkaroundScript = `
  window.addEventListener('error', event => {
    event.stopImmediatePropagation()
  })

  window.addEventListener('unhandledrejection', event => {
    event.stopImmediatePropagation()
  })
`;

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {process.env.NODE_ENV !== 'production' && (
          <script dangerouslySetInnerHTML={{ __html: noOverlayWorkaroundScript }} />
        )}
      </head>
      <body>
        {children} {/* Render route-specific content here */}
      </body>
    </html>
  );
}

import Dashboard from "@/components/Dashboard";
import React from "react";

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
`

export default function RootLayout() {
  return (
    <html lang="en">
      <head>
      {process.env.NODE_ENV !== 'production' && <script dangerouslySetInnerHTML={{ __html: noOverlayWorkaroundScript }} />}
      </head>
      <body>
      <Dashboard />
      </body>
    </html>
  );
}

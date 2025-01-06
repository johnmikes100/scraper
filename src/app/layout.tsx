import styles from './layout.module.css';
import React from 'react';
import Header from '@/components/Header/Header';
import '@/styles/globals.css';

export const metadata = {
  title: 'Happy Hour Scraper',
  description: 'Find the best happy hours in San Francisco',
}
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet"/>

      </head>
      <body className={styles.body}>
        <header className={styles.header}>
          <Header />
        </header>
        <div className={styles.bodyhold}>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
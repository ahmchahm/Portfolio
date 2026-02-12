import './globals.css';
import AnimatedCursor from '@/components/AnimatedCursor';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: '3D Developer Portfolio - Abdullah Al Mamun',
  description: 'Interactive 3D developer portfolio showcasing projects and skills with cutting-edge web technologies.',
  keywords: ['portfolio', '3D', 'developer', 'next.js', 'react', 'three.js'],
  authors: [{ name: 'Abdullah Al Mamun' }],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-dark-900 text-white overflow-x-hidden">
        <AnimatedCursor />
        <Navbar />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}



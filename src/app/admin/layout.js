export const metadata = {
  title: 'Admin Panel - Portfolio',
};

export default function AdminLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 min-h-screen">
        <main className="w-full">
          {children}
        </main>
      </body>
    </html>
  );
}

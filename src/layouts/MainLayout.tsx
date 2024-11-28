import React from 'react';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <nav>
            {/* Add navigation items here */}
          </nav>
        </div>
      </header>
      <main>
        {children}
      </main>
      <footer className="bg-white mt-8 border-t">
        <div className="container mx-auto px-4 py-6 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} AI Prompt Generator. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

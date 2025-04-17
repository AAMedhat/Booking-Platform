'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Navbar } from '@/components/common/Navbar';

// Import all page components
import { HomePage } from '@/pages/home/HomePage';
import EgybookPage from '@/pages/egybook/EgybookPage';
import EgyexplorePage from '@/pages/egyexplore/EgyexplorePage';
import EgytalesPage from '@/pages/egytales/EgytalesPage';
import EgytreasurePage from '@/pages/egytreasure/EgytreasurePage';
import AdminPage from '@/pages/admin/AdminPage';


export default function MainApp() {
  const pathname = usePathname() || '/';
  const router = useRouter();
  
  // Extract page name from pathname
  const getPageFromPath = (path: string): string => {
    if (path === '/') return 'home';
    const pageName = path.substring(1).split('/')[0];
    return pageName;
  };
  
  const currentPage = getPageFromPath(pathname);
  
  // Redirect from root to home
  useEffect(() => {
    if (pathname === '/') {
      router.push('/home');
    }
  }, [pathname, router]);
  
  // Map route names to page components
  const pageComponents: { [key: string]: React.ReactNode } = {
    'home': <HomePage />,
    'egybook': <EgybookPage />,
    'egyexplore': <EgyexplorePage />,
    'egytales': <EgytalesPage />,
    'egytreasure': <EgytreasurePage />,
    'admin': <AdminPage />,
  };
  
  // Show loading when redirecting from root
  if (pathname === '/') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-#121212"></div>
      </div>
    );
  }
  
  const validPages = ['home', 'egybook', 'egyexplore', 'egytales', 'egytreasure', 'admin', 'login', 'signup'];
  
  // Show 404 for non-existent pages
  if (!validPages.includes(currentPage)) {
    return (
      <div className="bg-black min-h-screen">
        <Navbar />
        <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center text-white">
          <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
          <p className="text-gray-400 mb-6">The page you're looking for doesn't exist.</p>
          <button 
            onClick={() => router.push('/home')}
            className="px-6 py-3 bg-black rounded-md hover:bg-black transition-colors"
          >
            Go to Homepage
          </button>
        </div>
      </div>
    );
  }
  
  // Render the appropriate page component
  return (
    <div className="bg-black min-h-screen">
      {pageComponents[currentPage]}
    </div>
  );
} 
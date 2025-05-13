// src/App.tsx
import { useState, useEffect, useRef } from 'react';
import { createBrowserRouter, RouterProvider, Outlet, useNavigate, Link, useLocation} from 'react-router-dom';
import NotesPage from './pages/NotesPage';
import TriadsPage from './pages/TriadsPage';

// Title with dropdown navigation
const TitleWithNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle clicks outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

 
  // Get current page type based on URL
  const getCurrentPage = () => {
    if (location.pathname === '/triads') return 'Triads';
    if (location.pathname === '/scales') return 'Scales';
    return 'Notes';
  };
  
  const handleNavigate = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };
  
   return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xl font-medium text-indigo-700 hover:text-indigo-800 transition-colors"
      >
        Learn the {getCurrentPage()}
        <span className={`transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}>
          ▼
        </span>
      </button>
      
      {isOpen && (
        <div className="absolute left-0 z-10 mt-2 w-48 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <button 
              className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                location.pathname === '/' ? 'text-indigo-600 font-medium' : 'text-gray-700'
              }`}
              onClick={() => handleNavigate('/')}
            >
              Learn the Notes
            </button>
            <button 
              className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                location.pathname === '/triads' ? 'text-indigo-600 font-medium' : 'text-gray-700'
              }`}
              onClick={() => handleNavigate('/triads')}
            >
              Learn the Triads
            </button>
            <button 
              className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                location.pathname === '/scales' ? 'text-indigo-600 font-medium' : 'text-gray-700'
              }`}
              onClick={() => handleNavigate('/scales')}
            >
              Learn the Scales
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Root layout component
const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen w-full bg-gray-100">
      <header className="py-4 border-b border-gray-200 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          <TitleWithNavigation />
        </div>
      </header>
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
      
      <footer className="py-3 text-center text-sm text-gray-500 border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          © {new Date().getFullYear()} Learn the Notes
        </div>
      </footer>
    </div>
  );
};

// Error page
const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Page Not Found</h1>
      <p className="text-gray-600 mb-6">The page you're looking for doesn't exist.</p>
      <Link 
        to="/" 
        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
      >
        Go Home
      </Link>
    </div>
  );
};

// Coming Soon page placeholder
const ComingSoonPage = () => (
  <div className="flex flex-col items-center justify-center h-64">
    <h2 className="text-2xl font-bold text-gray-800 mb-4">Coming Soon</h2>
    <p className="text-lg text-gray-600">This feature is under development and will be available soon!</p>
  </div>
);

// Create the router with routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <NotesPage />
      },
      {
        path: 'triads',
        element: <TriadsPage />
      },
      {
        path: 'scales',
        element: <ComingSoonPage />
      }
    ]
  }
]);

// Main App component
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
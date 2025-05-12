// src/App.tsx
import { useState } from 'react';
import { createBrowserRouter, RouterProvider, Outlet, useNavigate, Link, useLocation} from 'react-router-dom';
import NotesPage from './pages/NotesPage';
import TriadsPage from './pages/TriadsPage';

// Title with dropdown navigation
const TitleWithNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
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
    <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-6 relative">
      <span className="flex items-center justify-center gap-2 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        Learn the {getCurrentPage()}
        <span className="text-sm">▼</span>
      </span>
      
      {isOpen && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-white shadow-lg rounded-md py-2 z-10 w-48">
          <button 
            className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
              location.pathname === '/' ? 'font-medium text-indigo-600' : ''
            }`}
            onClick={() => handleNavigate('/')}
          >
            Learn the Notes
          </button>
          <button 
            className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
              location.pathname === '/triads' ? 'font-medium text-indigo-600' : ''
            }`}
            onClick={() => handleNavigate('/triads')}
          >
            Learn the Triads
          </button>
          <button 
            className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
              location.pathname === '/scales' ? 'font-medium text-indigo-600' : ''
            }`}
            onClick={() => handleNavigate('/scales')}
          >
            Learn the Scales
          </button>
        </div>
      )}
    </h1>
  );
};

// Root layout component
const RootLayout = () => {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <div className="flex flex-col w-full h-screen gap-8 p-4 bg-gray-100">
        {/* Heading with dropdown navigation */}
        <TitleWithNavigation />
        
        {/* Page Content */}
        <div className="flex-grow">
          <Outlet />
        </div>
      </div>
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
/**
 * Main layout component that wraps all pages
 * Handles authentication state, theme, and overall page structure
 * Includes Header, Sidebar (for authenticated users), Mobile Navigation, and Footer
 */
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import MobileNavigation from './MobileNavigation';
import LoadingSpinner from '../ui/LoadingSpinner';
import './Layout.scss';

const Layout = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const { theme } = useTheme();

  // Show loading spinner while checking auth state
  if (isLoading) {
    return <LoadingSpinner fullPage />;
  }

  return (
    <div className={`app-container ${theme}-theme`}>
      {/* Main header with navigation and dark mode toggle */}
      <Header />
      
      {/* Main content area with conditional sidebar */}
      <div className="main-wrapper">
        {/* Show sidebar only for authenticated users */}
        {isAuthenticated && (
          <>
            <Sidebar />
            <MobileNavigation />
          </>
        )}
        
        {/* Page content */}
        <main className="content">
          {children}
        </main>
      </div>
      
      {/* Global footer */}
      <Footer />
    </div>
  );
};

export default Layout;
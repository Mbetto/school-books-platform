import React, { Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/layout/Layout';
import LoadingSpinner from './components/ui/LoadingSpinner';
import ErrorBoundary from './components/error/ErrorBoundary';
import { RequireAuth, RequireNoAuth, RequireTutor } from './components/auth';
import ScrollToTop from './components/utils/ScrollToTop';
import RouteTransition from './components/animation/RouteTransition';

// Lazy-loaded pages with proper chunk names
const HomePage = lazy(() => import(/* webpackChunkName: "home" */ './pages/Home/Home'));
const BooksPage = lazy(() => import(/* webpackChunkName: "books" */ './pages/Books/BooksList'));
const BookDetailPage = lazy(() => import(/* webpackChunkName: "books" */ './pages/Books/BookDetail'));
// ... other lazy imports

const AppRoutes = () => {
  const location = useLocation();
  
  return (
    <ErrorBoundary key={location.pathname}>
      <ScrollToTop />
      <Suspense fallback={<LoadingSpinner fullPage />}>
        <Routes location={location}>
          <Route element={<Layout />}>
            {/* Public Routes */}
            <Route index element={
              <RouteTransition>
                <HomePage />
              </RouteTransition>
            } />
            
            {/* Auth Routes */}
            <Route element={<RequireNoAuth />}>
              <Route path="login" element={<LoginPage />} />
              {/* ... other auth routes */}
            </Route>

            {/* Protected Routes */}
            <Route element={<RequireAuth />}>
              <Route path="student-dashboard" element={<StudentDashboard />} />
              {/* ... other protected routes */}
            </Route>

            {/* Tutor Routes */}
            <Route element={<RequireTutor />}>
              <Route path="tutor-dashboard" element={<TutorDashboard />} />
            </Route>

            {/* 404 Route */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
};

export default AppRoutes;
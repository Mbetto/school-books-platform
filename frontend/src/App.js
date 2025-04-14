import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { 
  ThemeProvider,
  AuthProvider,
  TutorProvider,
  GamificationProvider 
} from './context';
import { Layout } from './components';
import {
  HomePage,
  BooksPage,
  BookDetailPage,
  LoginPage,
  RegisterPage,
  TutorDashboard,
  StudentDashboard,
  LiveSessionsPage,
  PaymentPage,
  PaymentSuccessPage,
  PaymentFailedPage,
  ProfilePage,
  OrderHistoryPage,
  SettingsPage,
  CartPage,
  NotFoundPage
} from './pages';
import ProtectedRoute from './components/auth/ProtectedRoute';
import TutorRoute from './components/auth/TutorRoute';
import './styles/main.scss';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <TutorProvider>
            <GamificationProvider>
              <Layout>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/books" element={<BooksPage />} />
                  <Route path="/books/:id" element={<BookDetailPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/live-sessions" element={<LiveSessionsPage />} />

                  {/* Protected Student Routes */}
                  <Route element={<ProtectedRoute />}>
                    <Route path="/student-dashboard" element={<StudentDashboard />} />
                    <Route path="/payment" element={<PaymentPage />} />
                    <Route path="/payment/success" element={<PaymentSuccessPage />} />
                    <Route path="/payment/failed" element={<PaymentFailedPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/profile/orders" element={<OrderHistoryPage />} />
                    <Route path="/profile/settings" element={<SettingsPage />} />
                    <Route path="/cart" element={<CartPage />} />
                  </Route>

                  {/* Tutor-only Routes */}
                  <Route element={<TutorRoute />}>
                    <Route path="/tutor-dashboard" element={<TutorDashboard />} />
                  </Route>

                  {/* 404 Page */}
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Layout>
            </GamificationProvider>
          </TutorProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
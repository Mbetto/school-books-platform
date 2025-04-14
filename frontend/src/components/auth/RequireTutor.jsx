import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function RequireTutor({ children }) {
  const { currentUser, userRole } = useAuth();
  const location = useLocation();

  if (!currentUser || userRole !== 'tutor') {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
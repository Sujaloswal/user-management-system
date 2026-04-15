import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={styles.loading}>
        <div style={styles.loadingBox}>
          <h2>LOADING...</h2>
        </div>
      </div>
    );
  }

  // Get user from state or localStorage
  let currentUser = user;
  if (!currentUser) {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        currentUser = JSON.parse(storedUser);
      }
    } catch (e) {
      console.error('Error parsing stored user:', e);
    }
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

const styles = {
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: '#ffffff'
  },
  loadingBox: {
    padding: '2rem 3rem',
    border: '4px solid #000000',
    background: '#ffffff',
    textAlign: 'center'
  }
};

export default ProtectedRoute;

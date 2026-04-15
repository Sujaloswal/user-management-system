import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, ArrowRight, ArrowLeft, UserPlus } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    setError('');
    setLoading(true);
    
    try {
      const user = await login(email, password);
      
      if (user && user._id) {
        navigate('/dashboard', { replace: true });
      } else {
        throw new Error('Invalid user data received');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Login failed. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2 style={styles.title}>USER MANAGEMENT</h2>
          <div style={styles.divider}></div>
          <h3 style={styles.subtitle}>SIGN IN</h3>
        </div>
        
        {error && (
          <div style={styles.error}>
            <strong>ERROR:</strong> {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div style={styles.field}>
            <label style={styles.label}>
              <Mail size={14} style={{ display: 'inline-block', marginRight: '8px' }} />
              EMAIL ADDRESS
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
              placeholder="your.email@example.com"
            />
          </div>
          
          <div style={styles.field}>
            <label style={styles.label}>
              <Lock size={14} style={{ display: 'inline-block', marginRight: '8px' }} />
              PASSWORD
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
              placeholder="Enter your password"
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading} 
            style={loading ? {...styles.button, ...styles.buttonDisabled} : styles.button}
          >
            {loading ? 'SIGNING IN...' : (
              <>
                SIGN IN <ArrowRight size={18} style={{ display: 'inline-block', marginLeft: '8px', verticalAlign: 'middle' }} />
              </>
            )}
          </button>
        </form>
        
        <div style={styles.demo}>
          <div style={styles.demoTitle}>DEMO CREDENTIALS:</div>
          <div style={styles.demoItem}>
            <strong>Admin:</strong> admin@example.com / Admin@123
          </div>
          <div style={styles.demoItem}>
            <strong>Manager:</strong> manager@example.com / Manager@123
          </div>
          <div style={styles.demoItem}>
            <strong>User:</strong> user@example.com / User@123
          </div>
        </div>

        <div style={styles.links}>
          <button 
            type="button"
            onClick={() => navigate('/register')} 
            style={styles.registerButton}
          >
            <UserPlus size={16} style={{ display: 'inline-block', marginRight: '8px', verticalAlign: 'middle' }} />
            Don't have an account? REGISTER
          </button>

          <button 
            type="button"
            onClick={() => navigate('/')} 
            style={styles.backButton}
          >
            <ArrowLeft size={16} style={{ display: 'inline-block', marginRight: '8px', verticalAlign: 'middle' }} />
            BACK TO HOME
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: '#f5f5f5',
    padding: '2rem',
  },
  card: {
    background: '#ffffff',
    padding: '3rem',
    border: '4px solid #000000',
    boxShadow: '12px 12px 0 #000000',
    width: '100%',
    maxWidth: '500px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    letterSpacing: '0.05em',
  },
  divider: {
    width: '80px',
    height: '4px',
    background: '#000000',
    margin: '0 auto 1rem',
  },
  subtitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#666666',
    letterSpacing: '0.05em',
  },
  error: {
    color: '#ff0000',
    background: '#fff0f0',
    padding: '1rem',
    border: '3px solid #ff0000',
    marginBottom: '1.5rem',
    fontWeight: 'bold',
    letterSpacing: '0.05em',
  },
  field: {
    marginBottom: '1.5rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: 'bold',
    fontSize: '0.9rem',
    letterSpacing: '0.05em',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    border: '3px solid #000000',
    background: '#ffffff',
    fontSize: '1rem',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '1rem',
    background: '#6B21A8',
    color: '#ffffff',
    border: '4px solid #000000',
    fontWeight: 'bold',
    fontSize: '1rem',
    letterSpacing: '0.05em',
    boxShadow: '6px 6px 0 #000000',
    transition: 'all 0.2s',
    marginBottom: '1.5rem',
    cursor: 'pointer',
  },
  buttonDisabled: {
    opacity: 0.6,
    cursor: 'not-allowed',
  },
  demo: {
    background: '#f5f5f5',
    padding: '1.5rem',
    border: '3px solid #000000',
    marginBottom: '1.5rem',
  },
  demoTitle: {
    fontWeight: 'bold',
    marginBottom: '0.75rem',
    fontSize: '0.9rem',
    letterSpacing: '0.05em',
  },
  demoItem: {
    fontSize: '0.85rem',
    marginBottom: '0.5rem',
    lineHeight: '1.6',
  },
  links: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  registerButton: {
    width: '100%',
    padding: '0.75rem',
    background: '#ffffff',
    color: '#6B21A8',
    border: '3px solid #6B21A8',
    fontWeight: 'bold',
    fontSize: '0.9rem',
    letterSpacing: '0.05em',
    cursor: 'pointer',
  },
  backButton: {
    width: '100%',
    padding: '0.75rem',
    background: '#ffffff',
    color: '#000000',
    border: '3px solid #000000',
    fontWeight: 'bold',
    fontSize: '0.9rem',
    letterSpacing: '0.05em',
    cursor: 'pointer',
  },
};

export default LoginPage;

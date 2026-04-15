import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';
import { User, Mail, Lock, ArrowRight, ArrowLeft, LogIn } from 'lucide-react';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    
    try {
      await API.post('/auth/register', { name, email, password });
      
      // Auto login after registration
      const user = await login(email, password);
      
      if (user && user._id) {
        navigate('/dashboard', { replace: true });
      }
    } catch (err) {
      console.error('Registration failed:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Registration failed. Please try again.';
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
          <h3 style={styles.subtitle}>CREATE ACCOUNT</h3>
        </div>
        
        {error && (
          <div style={styles.error}>
            <strong>ERROR:</strong> {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div style={styles.field}>
            <label style={styles.label}>
              <User size={14} style={{ display: 'inline-block', marginRight: '8px' }} />
              FULL NAME
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={styles.input}
              placeholder="John Doe"
            />
          </div>

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
              minLength={6}
              style={styles.input}
              placeholder="At least 6 characters"
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>
              <Lock size={14} style={{ display: 'inline-block', marginRight: '8px' }} />
              CONFIRM PASSWORD
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
              style={styles.input}
              placeholder="Re-enter your password"
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading} 
            style={loading ? {...styles.button, ...styles.buttonDisabled} : styles.button}
          >
            {loading ? 'CREATING ACCOUNT...' : (
              <>
                CREATE ACCOUNT <ArrowRight size={18} style={{ display: 'inline-block', marginLeft: '8px', verticalAlign: 'middle' }} />
              </>
            )}
          </button>
        </form>
        
        <div style={styles.info}>
          <p style={styles.infoText}>
            New users will be registered with "User" role by default.
          </p>
        </div>

        <div style={styles.links}>
          <button 
            type="button"
            onClick={() => navigate('/login')} 
            style={styles.linkButton}
          >
            <LogIn size={16} style={{ display: 'inline-block', marginRight: '8px', verticalAlign: 'middle' }} />
            Already have an account? SIGN IN
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
  info: {
    background: '#f5f5f5',
    padding: '1rem',
    border: '3px solid #000000',
    marginBottom: '1.5rem',
  },
  infoText: {
    fontSize: '0.85rem',
    margin: 0,
    lineHeight: '1.6',
  },
  links: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  linkButton: {
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

export default RegisterPage;

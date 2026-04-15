import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { Users, Lock, Search, BarChart, Shield, Zap } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.logo}>USER MANAGEMENT SYSTEM</h1>
          <button onClick={() => navigate('/login')} style={styles.headerBtn}>
            SIGN IN
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section style={styles.hero}>
        {/* 3D Background Elements */}
        <div style={styles.backgroundShapes}>
          <div style={styles.shape1}></div>
          <div style={styles.shape2}></div>
          <div style={styles.shape3}></div>
          <div style={styles.shape4}></div>
          <div style={styles.shape5}></div>
          <div style={styles.shape6}></div>
        </div>
        
        <div style={styles.heroContent}>
          <div style={styles.heroBox}>
            <h2 style={styles.heroTitle}>
              MANAGE USERS.
              <br />
              CONTROL ACCESS.
              <br />
              STAY SECURE.
            </h2>
            <div style={styles.divider}></div>
            <p style={styles.heroSubtitle}>
              A BRUTALLY SIMPLE USER MANAGEMENT SYSTEM
              <br />
              WITH ROLE-BASED ACCESS CONTROL
            </p>
            <button onClick={() => navigate('/login')} style={styles.ctaButton}>
              GET STARTED →
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={styles.features}>
        <div style={styles.featuresContent}>
          <h3 style={styles.sectionTitle}>FEATURES</h3>
          <div style={styles.divider}></div>
          
          <div style={styles.featureGrid}>
            <div style={styles.featureCard}>
              <div style={styles.featureIcon}><Users size={48} strokeWidth={3} /></div>
              <h4 style={styles.featureTitle}>USER MANAGEMENT</h4>
              <p style={styles.featureText}>
                Create, update, and manage user accounts with comprehensive profile information
              </p>
            </div>

            <div style={styles.featureCard}>
              <div style={styles.featureIcon}><Shield size={48} strokeWidth={3} /></div>
              <h4 style={styles.featureTitle}>ROLE-BASED ACCESS</h4>
              <p style={styles.featureText}>
                Three-tier role system: Admin, Manager, and User with granular permissions
              </p>
            </div>

            <div style={styles.featureCard}>
              <div style={styles.featureIcon}><Search size={48} strokeWidth={3} /></div>
              <h4 style={styles.featureTitle}>ADVANCED SEARCH</h4>
              <p style={styles.featureText}>
                Search and filter users by name, email, role, and status with pagination
              </p>
            </div>

            <div style={styles.featureCard}>
              <div style={styles.featureIcon}><BarChart size={48} strokeWidth={3} /></div>
              <h4 style={styles.featureTitle}>AUDIT TRAIL</h4>
              <p style={styles.featureText}>
                Track who created and modified user records with complete audit history
              </p>
            </div>

            <div style={styles.featureCard}>
              <div style={styles.featureIcon}><Lock size={48} strokeWidth={3} /></div>
              <h4 style={styles.featureTitle}>SECURE AUTH</h4>
              <p style={styles.featureText}>
                JWT-based authentication with refresh tokens and automatic session management
              </p>
            </div>

            <div style={styles.featureCard}>
              <div style={styles.featureIcon}><Zap size={48} strokeWidth={3} /></div>
              <h4 style={styles.featureTitle}>FAST & SIMPLE</h4>
              <p style={styles.featureText}>
                Clean, brutalist interface that focuses on functionality over decoration
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Roles Section */}
      <section style={styles.roles}>
        <div style={styles.rolesContent}>
          <h3 style={styles.sectionTitle}>USER ROLES</h3>
          <div style={styles.divider}></div>
          
          <div style={styles.roleGrid}>
            <div style={styles.roleCard}>
              <div style={styles.roleBadge}>ADMIN</div>
              <ul style={styles.roleList}>
                <li>Full system access</li>
                <li>Create and manage all users</li>
                <li>Modify any user role</li>
                <li>Deactivate user accounts</li>
                <li>View complete audit trails</li>
              </ul>
            </div>

            <div style={styles.roleCard}>
              <div style={styles.roleBadge}>MANAGER</div>
              <ul style={styles.roleList}>
                <li>Manage regular users</li>
                <li>View user information</li>
                <li>Update user profiles</li>
                <li>Cannot modify admins</li>
                <li>Limited audit access</li>
              </ul>
            </div>

            <div style={styles.roleCard}>
              <div style={styles.roleBadge}>USER</div>
              <ul style={styles.roleList}>
                <li>View own profile</li>
                <li>Update own information</li>
                <li>Change password</li>
                <li>No access to other users</li>
                <li>Basic dashboard access</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={styles.cta}>
        <div style={styles.ctaContent}>
          <h3 style={styles.ctaTitle}>READY TO GET STARTED?</h3>
          <p style={styles.ctaText}>
            Sign in with demo credentials or contact your administrator
          </p>
          <button onClick={() => navigate('/login')} style={styles.ctaButton}>
            SIGN IN NOW →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <p style={styles.footerText}>
            USER MANAGEMENT SYSTEM © 2026
          </p>
          <p style={styles.footerText}>
            BUILT WITH REACT + NODE.JS + MONGODB
          </p>
        </div>
      </footer>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    background: '#ffffff',
  },
  header: {
    borderBottom: '4px solid #000000',
    background: '#ffffff',
  },
  headerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '1.5rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    letterSpacing: '0.05em',
  },
  headerBtn: {
    padding: '0.75rem 1.5rem',
    background: '#000000',
    color: '#ffffff',
    border: '3px solid #000000',
    fontWeight: 'bold',
    fontSize: '0.9rem',
    letterSpacing: '0.05em',
  },
  hero: {
    borderBottom: '4px solid #000000',
    background: '#ffffff',
    padding: '6rem 2rem',
    position: 'relative',
    overflow: 'hidden',
  },
  backgroundShapes: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
    zIndex: 0,
  },
  shape1: {
    position: 'absolute',
    width: '300px',
    height: '300px',
    border: '3px solid rgba(107, 33, 168, 0.25)',
    top: '10%',
    left: '5%',
    transform: 'rotate(45deg)',
    animation: 'float1 20s ease-in-out infinite',
  },
  shape2: {
    position: 'absolute',
    width: '200px',
    height: '200px',
    border: '3px solid rgba(107, 33, 168, 0.20)',
    top: '60%',
    right: '10%',
    transform: 'rotate(30deg)',
    animation: 'float2 25s ease-in-out infinite',
  },
  shape3: {
    position: 'absolute',
    width: '150px',
    height: '150px',
    border: '3px solid rgba(0, 0, 0, 0.15)',
    top: '20%',
    right: '20%',
    transform: 'rotate(60deg)',
    animation: 'float3 18s ease-in-out infinite',
  },
  shape4: {
    position: 'absolute',
    width: '250px',
    height: '250px',
    border: '3px solid rgba(107, 33, 168, 0.18)',
    bottom: '15%',
    left: '15%',
    borderRadius: '50%',
    animation: 'float4 22s ease-in-out infinite',
  },
  shape5: {
    position: 'absolute',
    width: '180px',
    height: '180px',
    border: '3px solid rgba(0, 0, 0, 0.12)',
    top: '40%',
    left: '40%',
    transform: 'rotate(15deg)',
    animation: 'float5 28s ease-in-out infinite',
  },
  shape6: {
    position: 'absolute',
    width: '120px',
    height: '120px',
    border: '3px solid rgba(107, 33, 168, 0.22)',
    bottom: '25%',
    right: '30%',
    borderRadius: '50%',
    animation: 'float6 24s ease-in-out infinite',
  },
  heroContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    position: 'relative',
    zIndex: 1,
  },
  heroBox: {
    maxWidth: '800px',
    margin: '0 auto',
    textAlign: 'center',
  },
  heroTitle: {
    fontSize: '4rem',
    fontWeight: 'bold',
    lineHeight: '1.1',
    marginBottom: '2rem',
    letterSpacing: '0.02em',
  },
  divider: {
    width: '120px',
    height: '4px',
    background: '#000000',
    margin: '0 auto 2rem',
  },
  heroSubtitle: {
    fontSize: '1.25rem',
    lineHeight: '1.8',
    marginBottom: '3rem',
    letterSpacing: '0.05em',
  },
  ctaButton: {
    padding: '1rem 2.5rem',
    background: '#6B21A8',
    color: '#ffffff',
    border: '4px solid #000000',
    fontWeight: 'bold',
    fontSize: '1.1rem',
    letterSpacing: '0.05em',
    boxShadow: '6px 6px 0 #000000',
    transition: 'all 0.2s',
  },
  features: {
    borderBottom: '4px solid #000000',
    background: '#f5f5f5',
    padding: '6rem 2rem',
  },
  featuresContent: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  sectionTitle: {
    fontSize: '3rem',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '2rem',
    letterSpacing: '0.05em',
  },
  featureGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    marginTop: '3rem',
  },
  featureCard: {
    padding: '2rem',
    background: '#ffffff',
    border: '4px solid #000000',
    boxShadow: '6px 6px 0 #000000',
  },
  featureIcon: {
    fontSize: '3rem',
    marginBottom: '1rem',
  },
  featureTitle: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    letterSpacing: '0.05em',
  },
  featureText: {
    fontSize: '1rem',
    lineHeight: '1.6',
    color: '#666666',
  },
  roles: {
    borderBottom: '4px solid #000000',
    background: '#ffffff',
    padding: '6rem 2rem',
  },
  rolesContent: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  roleGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    marginTop: '3rem',
  },
  roleCard: {
    padding: '2rem',
    background: '#f5f5f5',
    border: '4px solid #000000',
  },
  roleBadge: {
    display: 'inline-block',
    padding: '0.5rem 1rem',
    background: '#000000',
    color: '#ffffff',
    fontWeight: 'bold',
    marginBottom: '1.5rem',
    letterSpacing: '0.05em',
  },
  roleList: {
    listStyle: 'none',
    padding: 0,
  },
  cta: {
    borderBottom: '4px solid #000000',
    background: '#000000',
    color: '#ffffff',
    padding: '6rem 2rem',
  },
  ctaContent: {
    maxWidth: '800px',
    margin: '0 auto',
    textAlign: 'center',
  },
  ctaTitle: {
    fontSize: '3rem',
    fontWeight: 'bold',
    marginBottom: '1.5rem',
    letterSpacing: '0.05em',
  },
  ctaText: {
    fontSize: '1.25rem',
    marginBottom: '2.5rem',
    letterSpacing: '0.05em',
  },
  footer: {
    background: '#ffffff',
    padding: '3rem 2rem',
  },
  footerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    textAlign: 'center',
  },
  footerText: {
    fontSize: '0.9rem',
    marginBottom: '0.5rem',
    letterSpacing: '0.05em',
    color: '#666666',
  },
};

// Add hover effects and animations
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    button:hover {
      transform: translate(2px, 2px);
      box-shadow: 4px 4px 0 #000000 !important;
    }
    button:active {
      transform: translate(6px, 6px);
      box-shadow: 0 0 0 #000000 !important;
    }
    
    @keyframes float1 {
      0%, 100% { transform: rotate(45deg) translate(0, 0); }
      25% { transform: rotate(50deg) translate(20px, -20px); }
      50% { transform: rotate(40deg) translate(-15px, 15px); }
      75% { transform: rotate(55deg) translate(10px, -10px); }
    }
    
    @keyframes float2 {
      0%, 100% { transform: rotate(30deg) translate(0, 0); }
      33% { transform: rotate(35deg) translate(-25px, 20px); }
      66% { transform: rotate(25deg) translate(15px, -15px); }
    }
    
    @keyframes float3 {
      0%, 100% { transform: rotate(60deg) translate(0, 0); }
      50% { transform: rotate(65deg) translate(-20px, -20px); }
    }
    
    @keyframes float4 {
      0%, 100% { transform: translate(0, 0) scale(1); }
      25% { transform: translate(15px, -15px) scale(1.05); }
      50% { transform: translate(-10px, 10px) scale(0.95); }
      75% { transform: translate(20px, 5px) scale(1.02); }
    }
    
    @keyframes float5 {
      0%, 100% { transform: rotate(15deg) translate(0, 0); }
      40% { transform: rotate(20deg) translate(25px, 15px); }
      80% { transform: rotate(10deg) translate(-20px, -10px); }
    }
    
    @keyframes float6 {
      0%, 100% { transform: translate(0, 0) scale(1); }
      30% { transform: translate(-20px, 20px) scale(1.08); }
      60% { transform: translate(15px, -15px) scale(0.92); }
    }
  `;
  document.head.appendChild(style);
}

export default LandingPage;

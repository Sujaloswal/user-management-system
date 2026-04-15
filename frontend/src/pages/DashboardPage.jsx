import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Users, User, BarChart, Shield, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';
import axios from '../api/axios';

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      if (user?.role === 'admin' || user?.role === 'manager') {
        try {
          const response = await axios.get('/users/stats');
          setStats(response.data);
        } catch (error) {
          console.error('Failed to fetch stats:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      {/* Navigation */}
      <nav style={styles.nav}>
        <div style={styles.navContent}>
          <span style={styles.logo}>USER MANAGEMENT SYSTEM</span>
          <div style={styles.navLinks}>
            <button onClick={() => navigate('/dashboard')} style={{...styles.navBtn, ...styles.navBtnActive}}>
              DASHBOARD
            </button>
            {(user?.role === 'admin' || user?.role === 'manager') && (
              <button onClick={() => navigate('/users')} style={styles.navBtn}>
                MANAGE USERS
              </button>
            )}
            <button onClick={() => navigate('/profile')} style={styles.navBtn}>
              MY PROFILE
            </button>
            <button onClick={handleLogout} style={styles.logoutBtn}>
              LOGOUT
            </button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div style={styles.content}>
        <div style={styles.welcomeBox}>
          <h2 style={styles.welcomeTitle}>WELCOME, {user?.name?.toUpperCase()}!</h2>
          <div style={styles.roleBadge}>
            ROLE: {user?.role?.toUpperCase()}
          </div>
        </div>

        <div style={styles.cards}>
          {(user?.role === 'admin' || user?.role === 'manager') && (
            <div style={styles.card} onClick={() => navigate('/users')}>
              <div style={styles.cardIcon}><Users size={36} strokeWidth={3} /></div>
              <h3 style={styles.cardTitle}>MANAGE USERS</h3>
              <p style={styles.cardText}>
                View, create, and manage user accounts
              </p>
            </div>
          )}
          
          <div style={styles.card} onClick={() => navigate('/profile')}>
            <div style={styles.cardIcon}><User size={36} strokeWidth={3} /></div>
            <h3 style={styles.cardTitle}>MY PROFILE</h3>
            <p style={styles.cardText}>
              View and update your profile information
            </p>
          </div>
        </div>

        {/* Statistics Section - Admin/Manager Only */}
        {(user?.role === 'admin' || user?.role === 'manager') && (
          <div style={styles.statsSection}>
            <div style={styles.statsTitleBox}>
              <BarChart size={28} strokeWidth={3} style={{ display: 'inline-block', marginRight: '0.75rem', verticalAlign: 'middle' }} />
              <h3 style={styles.statsTitle}>SYSTEM STATISTICS</h3>
            </div>
            {loading ? (
              <div style={styles.loadingBox}>
                <div style={styles.loadingSpinner}></div>
                <div style={styles.loadingText}>LOADING...</div>
              </div>
            ) : stats ? (
              <>
                {/* Primary Stats */}
                <div style={styles.primaryStatsGrid}>
                  <div style={styles.primaryStatCard}>
                    <div style={styles.primaryStatIcon}>
                      <Users size={32} strokeWidth={3} />
                    </div>
                    <div style={styles.primaryStatContent}>
                      <div style={styles.primaryStatValue}>{stats.totalUsers}</div>
                      <div style={styles.primaryStatLabel}>TOTAL USERS</div>
                    </div>
                  </div>

                  <div style={styles.primaryStatCard}>
                    <div style={{...styles.primaryStatIcon, background: '#10b981'}}>
                      <User size={32} strokeWidth={3} />
                    </div>
                    <div style={styles.primaryStatContent}>
                      <div style={styles.primaryStatValue}>{stats.activeUsers}</div>
                      <div style={styles.primaryStatLabel}>ACTIVE</div>
                    </div>
                  </div>

                  <div style={styles.primaryStatCard}>
                    <div style={{...styles.primaryStatIcon, background: '#ef4444'}}>
                      <User size={32} strokeWidth={3} />
                    </div>
                    <div style={styles.primaryStatContent}>
                      <div style={styles.primaryStatValue}>{stats.inactiveUsers}</div>
                      <div style={styles.primaryStatLabel}>INACTIVE</div>
                    </div>
                  </div>
                </div>

                {/* Role Distribution with Bar Chart */}
                <div style={styles.roleSection}>
                  <h4 style={styles.roleSectionTitle}>
                    <Shield size={20} strokeWidth={3} style={{ display: 'inline-block', marginRight: '0.5rem', verticalAlign: 'middle' }} />
                    ROLE DISTRIBUTION
                  </h4>
                  
                  {/* Bar Chart Only */}
                  <div style={styles.barChartWrapper}>
                    <div style={styles.barChartItem}>
                      <div style={styles.barChartLabel}>ADMIN</div>
                      <div style={styles.barChartBarContainer}>
                        <div style={{
                          ...styles.barChartBar,
                          width: `${(stats.adminCount / stats.totalUsers) * 100}%`,
                          background: '#6B21A8',
                        }}>
                          <span style={styles.barChartValue}>{stats.adminCount}</span>
                        </div>
                      </div>
                      <div style={styles.barChartPercent}>
                        {((stats.adminCount / stats.totalUsers) * 100).toFixed(0)}%
                      </div>
                    </div>
                    
                    <div style={styles.barChartItem}>
                      <div style={styles.barChartLabel}>MANAGER</div>
                      <div style={styles.barChartBarContainer}>
                        <div style={{
                          ...styles.barChartBar,
                          width: `${(stats.managerCount / stats.totalUsers) * 100}%`,
                          background: '#2563eb',
                        }}>
                          <span style={styles.barChartValue}>{stats.managerCount}</span>
                        </div>
                      </div>
                      <div style={styles.barChartPercent}>
                        {((stats.managerCount / stats.totalUsers) * 100).toFixed(0)}%
                      </div>
                    </div>
                    
                    <div style={styles.barChartItem}>
                      <div style={styles.barChartLabel}>USER</div>
                      <div style={styles.barChartBarContainer}>
                        <div style={{
                          ...styles.barChartBar,
                          width: `${(stats.userCount / stats.totalUsers) * 100}%`,
                          background: '#059669',
                        }}>
                          <span style={styles.barChartValue}>{stats.userCount}</span>
                        </div>
                      </div>
                      <div style={styles.barChartPercent}>
                        {((stats.userCount / stats.totalUsers) * 100).toFixed(0)}%
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div style={styles.errorBox}>
                <div style={styles.errorIcon}>✗</div>
                <div style={styles.errorText}>FAILED TO LOAD</div>
              </div>
            )}
          </div>
        )}

        {/* Info Section */}
        <div style={styles.infoSection}>
          <h3 style={styles.infoTitle}>SYSTEM INFORMATION</h3>
          <div style={styles.infoGrid}>
            <div style={styles.infoItem}>
              <div style={styles.infoLabel}>YOUR EMAIL</div>
              <div style={styles.infoValue}>{user?.email}</div>
            </div>
            <div style={styles.infoItem}>
              <div style={styles.infoLabel}>YOUR ROLE</div>
              <div style={styles.infoValue}>{user?.role?.toUpperCase()}</div>
            </div>
            <div style={styles.infoItem}>
              <div style={styles.infoLabel}>ACCOUNT STATUS</div>
              <div style={styles.infoValue}>{user?.status?.toUpperCase()}</div>
            </div>
            <div style={styles.infoItem}>
              <div style={styles.infoLabel}>MEMBER SINCE</div>
              <div style={styles.infoValue}>
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    background: '#f5f5f5',
  },
  nav: {
    background: '#000000',
    borderBottom: '4px solid #000000',
  },
  navContent: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '1.5rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: '1.25rem',
    color: '#ffffff',
    letterSpacing: '0.05em',
  },
  navLinks: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  navBtn: {
    background: 'transparent',
    color: '#ffffff',
    border: '2px solid #ffffff',
    padding: '0.5rem 1rem',
    fontWeight: 'bold',
    fontSize: '0.85rem',
    letterSpacing: '0.05em',
    transition: 'all 0.2s',
  },
  navBtnActive: {
    background: '#ffffff',
    color: '#000000',
  },
  logoutBtn: {
    background: '#ff0000',
    color: '#ffffff',
    border: '2px solid #ffffff',
    padding: '0.5rem 1rem',
    fontWeight: 'bold',
    fontSize: '0.85rem',
    letterSpacing: '0.05em',
  },
  content: {
    padding: '2rem 1.5rem',
    maxWidth: '1400px',
    margin: '0 auto',
  },
  welcomeBox: {
    background: '#ffffff',
    padding: '1rem',
    border: '4px solid #000000',
    boxShadow: '6px 6px 0 #000000',
    marginBottom: '1.5rem',
    textAlign: 'center',
  },
  welcomeTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
    letterSpacing: '0.05em',
  },
  roleBadge: {
    display: 'inline-block',
    background: '#6B21A8',
    color: '#ffffff',
    padding: '0.3rem 1rem',
    border: '3px solid #000000',
    fontWeight: 'bold',
    fontSize: '0.85rem',
    letterSpacing: '0.05em',
  },
  cards: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1rem',
    marginBottom: '1.5rem',
  },
  card: {
    background: '#ffffff',
    padding: '1rem',
    border: '4px solid #000000',
    boxShadow: '4px 4px 0 #000000',
    cursor: 'pointer',
    transition: 'all 0.2s',
    position: 'relative',
  },
  cardIcon: {
    fontSize: '2rem',
    marginBottom: '0.5rem',
  },
  cardTitle: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    marginBottom: '0.4rem',
    letterSpacing: '0.05em',
  },
  cardText: {
    fontSize: '0.85rem',
    color: '#666666',
    lineHeight: '1.4',
  },
  infoSection: {
    background: '#ffffff',
    padding: '1.5rem',
    border: '4px solid #000000',
    boxShadow: '8px 8px 0 #000000',
  },
  infoTitle: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    marginBottom: '1.25rem',
    letterSpacing: '0.05em',
    textAlign: 'center',
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
  },
  infoItem: {
    padding: '1rem',
    background: '#f5f5f5',
    border: '3px solid #000000',
  },
  infoLabel: {
    fontSize: '0.75rem',
    fontWeight: 'bold',
    marginBottom: '0.4rem',
    letterSpacing: '0.05em',
    color: '#666666',
  },
  infoValue: {
    fontSize: '1rem',
    fontWeight: 'bold',
    letterSpacing: '0.05em',
  },
  statsSection: {
    background: '#ffffff',
    padding: '1.5rem',
    border: '4px solid #000000',
    boxShadow: '8px 8px 0 #000000',
    marginBottom: '1.5rem',
  },
  statsTitleBox: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    paddingBottom: '1rem',
    borderBottom: '4px solid #000000',
  },
  statsTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    letterSpacing: '0.05em',
    display: 'inline-block',
    verticalAlign: 'middle',
  },
  primaryStatsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '1rem',
    marginBottom: '1.5rem',
  },
  primaryStatCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1rem',
    background: '#f5f5f5',
    border: '4px solid #000000',
    boxShadow: '4px 4px 0 #000000',
  },
  primaryStatIcon: {
    width: '60px',
    height: '60px',
    background: '#6B21A8',
    border: '3px solid #000000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
    flexShrink: 0,
  },
  primaryStatContent: {
    flex: 1,
  },
  primaryStatValue: {
    fontSize: '2rem',
    fontWeight: 'bold',
    lineHeight: 1,
    marginBottom: '0.3rem',
  },
  primaryStatLabel: {
    fontSize: '0.8rem',
    fontWeight: 'bold',
    letterSpacing: '0.05em',
    marginBottom: '0.2rem',
  },
  primaryStatSubtext: {
    fontSize: '0.85rem',
    color: '#666666',
  },
  roleSection: {
    padding: '1.25rem',
    background: '#f5f5f5',
    border: '3px solid #000000',
  },
  roleSectionTitle: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    letterSpacing: '0.05em',
    marginBottom: '1.25rem',
    textAlign: 'center',
  },
  chartsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
    gap: '2rem',
    marginBottom: '3rem',
  },
  chartContainer: {
    background: '#ffffff',
    padding: '2rem',
    border: '3px solid #000000',
  },
  chartTitle: {
    fontSize: '1rem',
    fontWeight: 'bold',
    letterSpacing: '0.05em',
    marginBottom: '1.5rem',
    textAlign: 'center',
    color: '#666666',
  },
  barChartWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  barChartItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  barChartLabel: {
    fontSize: '0.8rem',
    fontWeight: 'bold',
    letterSpacing: '0.05em',
    minWidth: '70px',
  },
  barChartBarContainer: {
    flex: 1,
    height: '40px',
    background: '#ffffff',
    border: '3px solid #000000',
    position: 'relative',
    overflow: 'hidden',
  },
  barChartBar: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: '0.75rem',
    transition: 'width 1s ease',
    border: 'none',
  },
  barChartValue: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: '1.1rem',
    textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
  },
  barChartPercent: {
    fontSize: '0.8rem',
    fontWeight: 'bold',
    minWidth: '45px',
    textAlign: 'right',
  },
  pieChartWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2rem',
  },
  pieChart: {
    width: '250px',
    height: '250px',
    position: 'relative',
    border: '3px solid #000000',
  },
  pieSlice: {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
  },
  pieCenter: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '140px',
    height: '140px',
    background: '#ffffff',
    borderRadius: '50%',
    border: '3px solid #000000',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pieCenterValue: {
    fontSize: '3rem',
    fontWeight: 'bold',
    lineHeight: 1,
  },
  pieCenterLabel: {
    fontSize: '0.85rem',
    fontWeight: 'bold',
    letterSpacing: '0.05em',
    color: '#666666',
  },
  pieLegend: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    width: '100%',
  },
  pieLegendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '0.75rem',
    background: '#f5f5f5',
    border: '2px solid #000000',
  },
  pieLegendColor: {
    width: '30px',
    height: '30px',
    border: '2px solid #000000',
    flexShrink: 0,
  },
  pieLegendText: {
    fontSize: '0.9rem',
    lineHeight: '1.4',
  },
  roleStatsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
  },
  roleStatCard: {
    padding: '1.5rem',
    background: '#ffffff',
    border: '3px solid #000000',
  },
  roleStatBadge: {
    display: 'inline-block',
    padding: '0.5rem 1rem',
    background: '#6B21A8',
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: '0.85rem',
    letterSpacing: '0.05em',
    marginBottom: '1rem',
  },
  roleStatValue: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
  },
  roleStatBar: {
    width: '100%',
    height: '12px',
    background: '#e5e5e5',
    border: '2px solid #000000',
    marginBottom: '0.75rem',
    overflow: 'hidden',
  },
  roleStatBarFill: {
    height: '100%',
    transition: 'width 0.5s ease',
  },
  roleStatPercent: {
    fontSize: '0.85rem',
    fontWeight: 'bold',
    color: '#666666',
  },
  insightsSection: {
    padding: '2rem',
    background: '#000000',
    color: '#ffffff',
    border: '3px solid #000000',
  },
  insightsSectionTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    letterSpacing: '0.05em',
    marginBottom: '2rem',
    textAlign: 'center',
  },
  insightsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
  },
  insightCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1.5rem',
    background: '#ffffff',
    color: '#000000',
    border: '3px solid #ffffff',
  },
  insightIcon: {
    fontSize: '2rem',
    fontWeight: 'bold',
    width: '50px',
    height: '50px',
    background: '#6B21A8',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px solid #000000',
    flexShrink: 0,
  },
  insightText: {
    fontSize: '0.95rem',
    lineHeight: '1.5',
  },
  loadingBox: {
    textAlign: 'center',
    padding: '3rem 1.5rem',
  },
  loadingSpinner: {
    width: '50px',
    height: '50px',
    border: '5px solid #f5f5f5',
    borderTop: '5px solid #6B21A8',
    borderRadius: '50%',
    margin: '0 auto 1.5rem',
    animation: 'spin 1s linear infinite',
  },
  loadingText: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    letterSpacing: '0.05em',
    color: '#666666',
  },
  errorBox: {
    textAlign: 'center',
    padding: '3rem 1.5rem',
    background: '#fee',
    border: '3px solid #ff0000',
  },
  errorIcon: {
    fontSize: '3rem',
    fontWeight: 'bold',
    color: '#ff0000',
    marginBottom: '0.75rem',
  },
  errorText: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    letterSpacing: '0.05em',
    color: '#ff0000',
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
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
}

export default DashboardPage;

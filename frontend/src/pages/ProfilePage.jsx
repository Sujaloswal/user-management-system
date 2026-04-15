import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';

const ProfilePage = () => {
  const { user, logout, updateUserInContext } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState(user?.name || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [pwError, setPwError] = useState('');
  const [pwSuccess, setPwSuccess] = useState('');

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setError(''); setSuccess('');
    try {
      const res = await API.put(`/users/${user._id}`, { name });
      updateUserInContext({ ...user, name: res.data.user.name });
      setSuccess('PROFILE UPDATED SUCCESSFULLY!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setPwError(''); setPwSuccess('');
    try {
      await API.put(`/users/${user._id}/password`, { currentPassword, newPassword });
      setPwSuccess('PASSWORD UPDATED SUCCESSFULLY!');
      setCurrentPassword(''); setNewPassword('');
      setTimeout(() => setPwSuccess(''), 3000);
    } catch (err) {
      setPwError(err.response?.data?.message || 'Password update failed');
    }
  };

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <div style={styles.container}>
      {/* Navigation */}
      <nav style={styles.nav}>
        <div style={styles.navContent}>
          <span style={styles.logo}>USER MANAGEMENT SYSTEM</span>
          <div style={styles.navLinks}>
            <button onClick={() => navigate('/dashboard')} style={styles.navBtn}>DASHBOARD</button>
            {(user?.role === 'admin' || user?.role === 'manager') && (
              <button onClick={() => navigate('/users')} style={styles.navBtn}>MANAGE USERS</button>
            )}
            <button onClick={() => navigate('/profile')} style={{...styles.navBtn, ...styles.navBtnActive}}>MY PROFILE</button>
            <button onClick={handleLogout} style={styles.logoutBtn}>LOGOUT</button>
          </div>
        </div>
      </nav>

      <div style={styles.content}>
        <h2 style={styles.pageTitle}>MY PROFILE</h2>

        {/* Profile Information Card */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>PROFILE INFORMATION</h3>
          
          <div style={styles.infoSection}>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>EMAIL:</span>
              <span style={styles.infoValue}>{user?.email}</span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>ROLE:</span>
              <span style={{
                ...styles.roleBadge,
                background: user?.role === 'admin' ? '#6B21A8' : user?.role === 'manager' ? '#1d4ed8' : '#16a34a'
              }}>
                {user?.role?.toUpperCase()}
              </span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>STATUS:</span>
              <span style={{ 
                color: user?.status === 'active' ? '#16a34a' : '#ff0000',
                fontWeight: 'bold'
              }}>
                {user?.status?.toUpperCase()}
              </span>
            </div>
          </div>

          <div style={styles.divider}></div>

          {error && <div style={styles.errorBox}>{error}</div>}
          {success && <div style={styles.successBox}>{success}</div>}
          
          <form onSubmit={handleProfileUpdate}>
            <div style={styles.field}>
              <label style={styles.label}>NAME</label>
              <input 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                style={styles.input} 
                required 
              />
            </div>
            <button type="submit" style={styles.saveBtn}>UPDATE PROFILE</button>
          </form>
        </div>

        {/* Change Password Card */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>CHANGE PASSWORD</h3>
          
          {pwError && <div style={styles.errorBox}>{pwError}</div>}
          {pwSuccess && <div style={styles.successBox}>{pwSuccess}</div>}
          
          <form onSubmit={handlePasswordUpdate}>
            <div style={styles.field}>
              <label style={styles.label}>CURRENT PASSWORD</label>
              <input 
                type="password" 
                value={currentPassword} 
                onChange={(e) => setCurrentPassword(e.target.value)} 
                style={styles.input} 
                required 
                placeholder="Enter current password"
              />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>NEW PASSWORD</label>
              <input 
                type="password" 
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)} 
                style={styles.input} 
                required 
                minLength={6}
                placeholder="Enter new password (min 6 characters)"
              />
            </div>
            <button type="submit" style={styles.saveBtn}>CHANGE PASSWORD</button>
          </form>
        </div>

        {/* Account Information Card */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>ACCOUNT INFORMATION</h3>
          
          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>MEMBER SINCE:</span>
            <span style={styles.infoValue}>
              {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
            </span>
          </div>
          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>LAST UPDATED:</span>
            <span style={styles.infoValue}>
              {user?.updatedAt ? new Date(user.updatedAt).toLocaleDateString() : 'N/A'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { minHeight: '100vh', background: '#f5f5f5' },
  nav: { background: '#000000', borderBottom: '4px solid #000000' },
  navContent: { maxWidth: '1400px', margin: '0 auto', padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' },
  logo: { fontWeight: 'bold', fontSize: '1.25rem', color: '#ffffff', letterSpacing: '0.05em' },
  navLinks: { display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' },
  navBtn: { background: 'transparent', color: '#ffffff', border: '2px solid #ffffff', padding: '0.5rem 1rem', fontWeight: 'bold', fontSize: '0.85rem', letterSpacing: '0.05em' },
  navBtnActive: { background: '#ffffff', color: '#000000' },
  logoutBtn: { background: '#ff0000', color: '#ffffff', border: '2px solid #ffffff', padding: '0.5rem 1rem', fontWeight: 'bold', fontSize: '0.85rem', letterSpacing: '0.05em' },
  content: { padding: '3rem 2rem', maxWidth: '800px', margin: '0 auto' },
  pageTitle: { fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '2rem', letterSpacing: '0.05em', textAlign: 'center' },
  card: { background: '#ffffff', padding: '2.5rem', border: '4px solid #000000', boxShadow: '8px 8px 0 #000000', marginBottom: '2rem' },
  cardTitle: { fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', letterSpacing: '0.05em' },
  infoSection: { marginBottom: '1.5rem' },
  infoRow: { display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' },
  infoLabel: { fontWeight: 'bold', minWidth: '150px', fontSize: '0.9rem', letterSpacing: '0.05em' },
  infoValue: { flex: 1, fontSize: '1rem' },
  roleBadge: { padding: '0.25rem 0.75rem', color: '#ffffff', fontSize: '0.85rem', fontWeight: 'bold', letterSpacing: '0.05em', border: '2px solid #000000' },
  divider: { height: '3px', background: '#000000', margin: '1.5rem 0' },
  errorBox: { color: '#ff0000', background: '#fff0f0', padding: '1rem', border: '3px solid #ff0000', marginBottom: '1.5rem', fontWeight: 'bold' },
  successBox: { color: '#16a34a', background: '#f0fff0', padding: '1rem', border: '3px solid #16a34a', marginBottom: '1.5rem', fontWeight: 'bold' },
  field: { marginBottom: '1.5rem' },
  label: { display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem', letterSpacing: '0.05em' },
  input: { width: '100%', padding: '0.75rem', border: '3px solid #000000', background: '#ffffff', fontFamily: 'inherit', boxSizing: 'border-box' },
  saveBtn: { width: '100%', padding: '1rem', background: '#6B21A8', color: '#ffffff', border: '4px solid #000000', fontWeight: 'bold', fontSize: '1rem', letterSpacing: '0.05em', boxShadow: '6px 6px 0 #000000' },
};

export default ProfilePage;

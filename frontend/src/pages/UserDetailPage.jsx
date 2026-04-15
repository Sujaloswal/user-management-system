import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';

const UserDetailPage = () => {
  const { id } = useParams();
  const { user: currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get(`/users/${id}`);
        setUserData(res.data.user);
        setFormData({
          name: res.data.user.name,
          email: res.data.user.email,
          role: res.data.user.role,
          status: res.data.user.status,
        });
      } catch (err) {
        setError(err.response?.data?.message || 'Error loading user');
      }
    };
    fetchUser();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError(''); setSuccess('');
    try {
      const res = await API.put(`/users/${id}`, formData);
      setUserData(res.data.user);
      setEditing(false);
      setSuccess('USER UPDATED SUCCESSFULLY!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
    }
  };

  const handleLogout = () => { logout(); navigate('/login'); };

  if (!userData) {
    return (
      <div style={styles.loading}>
        {error || 'LOADING USER DATA...'}
      </div>
    );
  }

  const canEdit =
    currentUser?.role === 'admin' ||
    (currentUser?.role === 'manager' && userData.role !== 'admin') ||
    currentUser?._id === id;

  return (
    <div style={styles.container}>
      {/* Navigation */}
      <nav style={styles.nav}>
        <div style={styles.navContent}>
          <span style={styles.logo}>USER MANAGEMENT SYSTEM</span>
          <div style={styles.navLinks}>
            <button onClick={() => navigate('/dashboard')} style={styles.navBtn}>DASHBOARD</button>
            {(currentUser?.role === 'admin' || currentUser?.role === 'manager') && (
              <button onClick={() => navigate('/users')} style={styles.navBtn}>MANAGE USERS</button>
            )}
            <button onClick={() => navigate('/profile')} style={styles.navBtn}>MY PROFILE</button>
            <button onClick={handleLogout} style={styles.logoutBtn}>LOGOUT</button>
          </div>
        </div>
      </nav>

      <div style={styles.content}>
        <button onClick={() => navigate(-1)} style={styles.backBtn}>
          ← BACK
        </button>

        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h2 style={styles.cardTitle}>{userData.name.toUpperCase()}</h2>
            {canEdit && !editing && (
              <button onClick={() => setEditing(true)} style={styles.editBtn}>EDIT</button>
            )}
          </div>

          {error && <div style={styles.errorBox}>{error}</div>}
          {success && <div style={styles.successBox}>{success}</div>}

          {editing ? (
            <form onSubmit={handleUpdate}>
              <div style={styles.field}>
                <label style={styles.label}>NAME</label>
                <input 
                  value={formData.name} 
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                  style={styles.input} 
                  required 
                />
              </div>
              <div style={styles.field}>
                <label style={styles.label}>EMAIL</label>
                <input 
                  type="email" 
                  value={formData.email} 
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                  style={styles.input} 
                  required 
                />
              </div>
              {currentUser?.role === 'admin' && (
                <>
                  <div style={styles.field}>
                    <label style={styles.label}>ROLE</label>
                    <select 
                      value={formData.role} 
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })} 
                      style={styles.input}
                    >
                      <option value="user">USER</option>
                      <option value="manager">MANAGER</option>
                      <option value="admin">ADMIN</option>
                    </select>
                  </div>
                  <div style={styles.field}>
                    <label style={styles.label}>STATUS</label>
                    <select 
                      value={formData.status} 
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })} 
                      style={styles.input}
                    >
                      <option value="active">ACTIVE</option>
                      <option value="inactive">INACTIVE</option>
                    </select>
                  </div>
                </>
              )}
              <div style={styles.actions}>
                <button type="submit" style={styles.saveBtn}>SAVE CHANGES</button>
                <button type="button" onClick={() => setEditing(false)} style={styles.cancelBtn}>CANCEL</button>
              </div>
            </form>
          ) : (
            <div style={styles.details}>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>EMAIL:</span>
                <span style={styles.detailValue}>{userData.email}</span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>ROLE:</span>
                <span style={{
                  ...styles.roleBadge,
                  background: userData.role === 'admin' ? '#6B21A8' : userData.role === 'manager' ? '#1d4ed8' : '#16a34a'
                }}>
                  {userData.role.toUpperCase()}
                </span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>STATUS:</span>
                <span style={{ 
                  color: userData.status === 'active' ? '#16a34a' : '#ff0000',
                  fontWeight: 'bold'
                }}>
                  {userData.status.toUpperCase()}
                </span>
              </div>
              
              <div style={styles.divider}></div>
              
              <h4 style={styles.sectionTitle}>AUDIT INFORMATION</h4>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>CREATED AT:</span>
                <span style={styles.detailValue}>{new Date(userData.createdAt).toLocaleString()}</span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>LAST UPDATED:</span>
                <span style={styles.detailValue}>{new Date(userData.updatedAt).toLocaleString()}</span>
              </div>
              {userData.createdBy && (
                <div style={styles.detailRow}>
                  <span style={styles.detailLabel}>CREATED BY:</span>
                  <span style={styles.detailValue}>{userData.createdBy.name} ({userData.createdBy.email})</span>
                </div>
              )}
              {userData.updatedBy && (
                <div style={styles.detailRow}>
                  <span style={styles.detailLabel}>UPDATED BY:</span>
                  <span style={styles.detailValue}>{userData.updatedBy.name} ({userData.updatedBy.email})</span>
                </div>
              )}
            </div>
          )}
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
  logoutBtn: { background: '#ff0000', color: '#ffffff', border: '2px solid #ffffff', padding: '0.5rem 1rem', fontWeight: 'bold', fontSize: '0.85rem', letterSpacing: '0.05em' },
  content: { padding: '3rem 2rem', maxWidth: '900px', margin: '0 auto' },
  loading: { textAlign: 'center', padding: '3rem', fontSize: '1.5rem', fontWeight: 'bold', letterSpacing: '0.05em' },
  backBtn: { background: 'transparent', border: 'none', color: '#000000', marginBottom: '2rem', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', letterSpacing: '0.05em' },
  card: { background: '#ffffff', padding: '2.5rem', border: '4px solid #000000', boxShadow: '8px 8px 0 #000000' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' },
  cardTitle: { fontSize: '2rem', fontWeight: 'bold', letterSpacing: '0.05em' },
  editBtn: { padding: '0.75rem 1.5rem', background: '#6B21A8', color: '#ffffff', border: '3px solid #000000', fontWeight: 'bold', letterSpacing: '0.05em', boxShadow: '4px 4px 0 #000000' },
  saveBtn: { flex: 1, padding: '0.75rem', background: '#16a34a', color: '#ffffff', border: '3px solid #000000', fontWeight: 'bold', letterSpacing: '0.05em', boxShadow: '4px 4px 0 #000000' },
  cancelBtn: { flex: 1, padding: '0.75rem', background: '#666666', color: '#ffffff', border: '3px solid #000000', fontWeight: 'bold', letterSpacing: '0.05em', boxShadow: '4px 4px 0 #000000' },
  errorBox: { color: '#ff0000', background: '#fff0f0', padding: '1rem', border: '3px solid #ff0000', marginBottom: '1.5rem', fontWeight: 'bold' },
  successBox: { color: '#16a34a', background: '#f0fff0', padding: '1rem', border: '3px solid #16a34a', marginBottom: '1.5rem', fontWeight: 'bold' },
  details: {},
  detailRow: { display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' },
  detailLabel: { fontWeight: 'bold', minWidth: '150px', fontSize: '0.9rem', letterSpacing: '0.05em' },
  detailValue: { flex: 1, fontSize: '1rem' },
  roleBadge: { padding: '0.25rem 0.75rem', color: '#ffffff', fontSize: '0.85rem', fontWeight: 'bold', letterSpacing: '0.05em', border: '2px solid #000000' },
  divider: { height: '3px', background: '#000000', margin: '2rem 0' },
  sectionTitle: { fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', letterSpacing: '0.05em' },
  field: { marginBottom: '1.5rem' },
  label: { display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem', letterSpacing: '0.05em' },
  input: { width: '100%', padding: '0.75rem', border: '3px solid #000000', background: '#ffffff', fontFamily: 'inherit', boxSizing: 'border-box' },
  actions: { display: 'flex', gap: '1rem' },
};

export default UserDetailPage;

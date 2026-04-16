import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';

const UsersPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'user', status: 'active' });
  const [createError, setCreateError] = useState('');

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page, limit: 8 });
      if (search) params.append('search', search);
      if (roleFilter) params.append('role', roleFilter);
      if (statusFilter) params.append('status', statusFilter);
      const res = await API.get(`/users?${params.toString()}`);
      setUsers(res.data.users);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, [page, roleFilter, statusFilter]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchUsers();
  };

  const handleDeactivate = async (id) => {
    if (!window.confirm('DEACTIVATE THIS USER?')) return;
    try {
      await API.delete(`/users/${id}`);
      alert('User deactivated successfully!');
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || 'ERROR DEACTIVATING USER');
    }
  };

  const handleActivate = async (id) => {
    if (!window.confirm('ACTIVATE THIS USER?')) return;
    try {
      await API.put(`/users/${id}/activate`);
      alert('User activated successfully!');
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || 'ERROR ACTIVATING USER');
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setCreateError('');
    try {
      await API.post('/users', newUser);
      setShowCreateModal(false);
      setNewUser({ name: '', email: '', password: '', role: 'user', status: 'active' });
      fetchUsers();
    } catch (err) {
      setCreateError(err.response?.data?.message || 'Error creating user');
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
            <button onClick={() => navigate('/users')} style={{...styles.navBtn, ...styles.navBtnActive}}>MANAGE USERS</button>
            <button onClick={() => navigate('/profile')} style={styles.navBtn}>MY PROFILE</button>
            <button onClick={handleLogout} style={styles.logoutBtn}>LOGOUT</button>
          </div>
        </div>
      </nav>

      <div style={styles.content}>
        <div style={styles.header}>
          <h2 style={styles.pageTitle}>USER MANAGEMENT</h2>
          {user?.role === 'admin' && (
            <button onClick={() => setShowCreateModal(true)} style={styles.createBtn}>
              + CREATE USER
            </button>
          )}
        </div>

        {/* Filters */}
        <div style={styles.filters}>
          <form onSubmit={handleSearch} style={styles.searchForm}>
            <input
              type="text"
              placeholder="SEARCH BY NAME OR EMAIL..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={styles.input}
            />
            <button type="submit" style={styles.searchBtn}>SEARCH</button>
          </form>
          <select value={roleFilter} onChange={(e) => { setRoleFilter(e.target.value); setPage(1); }} style={styles.select}>
            <option value="">ALL ROLES</option>
            <option value="admin">ADMIN</option>
            <option value="manager">MANAGER</option>
            <option value="user">USER</option>
          </select>
          <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }} style={styles.select}>
            <option value="">ALL STATUS</option>
            <option value="active">ACTIVE</option>
            <option value="inactive">INACTIVE</option>
          </select>
        </div>

        {/* Table */}
        {loading ? (
          <div style={styles.loading}>LOADING USERS...</div>
        ) : (
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th>NAME</th><th>EMAIL</th><th>ROLE</th><th>STATUS</th><th>CREATED</th><th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id}>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>
                      <span style={{
                        ...styles.roleBadge,
                        background: u.role === 'admin' ? '#6B21A8' : u.role === 'manager' ? '#1d4ed8' : '#16a34a'
                      }}>
                        {u.role.toUpperCase()}
                      </span>
                    </td>
                    <td style={{ color: u.status === 'active' ? '#16a34a' : '#ff0000', fontWeight: 'bold' }}>
                      {u.status.toUpperCase()}
                    </td>
                    <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                    <td>
                      <button onClick={() => navigate(`/users/${u._id}`)} style={styles.viewBtn}>VIEW</button>
                      {(user?.role === 'admin' || user?.role === 'manager') && u._id !== user?._id && (
                        <>
                          {/* Show activate/deactivate buttons unless manager trying to modify admin */}
                          {!(user?.role === 'manager' && u.role === 'admin') && (
                            <>
                              {u.status === 'active' ? (
                                <button onClick={() => handleDeactivate(u._id)} style={styles.deleteBtn}>DEACTIVATE</button>
                              ) : (
                                <button onClick={() => handleActivate(u._id)} style={styles.activateBtn}>ACTIVATE</button>
                              )}
                            </>
                          )}
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        <div style={styles.pagination}>
          <button disabled={page === 1} onClick={() => setPage(p => p - 1)} style={styles.pageBtn}>
            ← PREV
          </button>
          <span style={styles.pageInfo}>PAGE {page} OF {totalPages}</span>
          <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} style={styles.pageBtn}>
            NEXT →
          </button>
        </div>

        {/* Create User Modal */}
        {showCreateModal && (
          <div style={styles.overlay}>
            <div style={styles.modal}>
              <h3 style={styles.modalTitle}>CREATE NEW USER</h3>
              {createError && <div style={styles.error}>{createError}</div>}
              <form onSubmit={handleCreate}>
                <div style={styles.field}>
                  <label style={styles.label}>NAME</label>
                  <input
                    type="text"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    required
                    style={styles.modalInput}
                  />
                </div>
                <div style={styles.field}>
                  <label style={styles.label}>EMAIL</label>
                  <input
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    required
                    style={styles.modalInput}
                  />
                </div>
                <div style={styles.field}>
                  <label style={styles.label}>PASSWORD</label>
                  <input
                    type="password"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    required
                    style={styles.modalInput}
                  />
                </div>
                <div style={styles.field}>
                  <label style={styles.label}>ROLE</label>
                  <select value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })} style={styles.modalInput}>
                    <option value="user">USER</option>
                    <option value="manager">MANAGER</option>
                    <option value="admin">ADMIN</option>
                  </select>
                </div>
                <div style={styles.field}>
                  <label style={styles.label}>STATUS</label>
                  <select value={newUser.status} onChange={(e) => setNewUser({ ...newUser, status: e.target.value })} style={styles.modalInput}>
                    <option value="active">ACTIVE</option>
                    <option value="inactive">INACTIVE</option>
                  </select>
                </div>
                <div style={styles.modalActions}>
                  <button type="submit" style={styles.createBtn}>CREATE</button>
                  <button type="button" onClick={() => setShowCreateModal(false)} style={styles.cancelBtn}>CANCEL</button>
                </div>
              </form>
            </div>
          </div>
        )}
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
  content: { padding: '3rem 2rem', maxWidth: '1400px', margin: '0 auto' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' },
  pageTitle: { fontSize: '2.5rem', fontWeight: 'bold', letterSpacing: '0.05em' },
  createBtn: { padding: '0.75rem 1.5rem', background: '#16a34a', color: '#ffffff', border: '3px solid #000000', fontWeight: 'bold', letterSpacing: '0.05em', boxShadow: '4px 4px 0 #000000' },
  filters: { display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' },
  searchForm: { display: 'flex', gap: '0.5rem', flex: 1, minWidth: '300px' },
  input: { flex: 1, padding: '0.75rem', border: '3px solid #000000', background: '#ffffff', fontFamily: 'inherit', fontSize: '0.9rem' },
  searchBtn: { padding: '0.75rem 1.5rem', background: '#6B21A8', color: '#ffffff', border: '3px solid #000000', fontWeight: 'bold', letterSpacing: '0.05em' },
  select: { padding: '0.75rem', border: '3px solid #000000', background: '#ffffff', fontFamily: 'inherit', fontWeight: 'bold', fontSize: '0.9rem' },
  loading: { textAlign: 'center', padding: '3rem', fontSize: '1.5rem', fontWeight: 'bold', letterSpacing: '0.05em' },
  tableContainer: { background: '#ffffff', border: '4px solid #000000', boxShadow: '8px 8px 0 #000000', overflow: 'auto', marginBottom: '2rem' },
  table: { width: '100%', borderCollapse: 'collapse' },
  roleBadge: { padding: '0.25rem 0.75rem', color: '#ffffff', fontSize: '0.75rem', fontWeight: 'bold', letterSpacing: '0.05em', display: 'inline-block', border: '2px solid #000000' },
  viewBtn: { marginRight: '0.5rem', padding: '0.4rem 0.75rem', background: '#1d4ed8', color: '#ffffff', border: '2px solid #000000', fontWeight: 'bold', fontSize: '0.75rem', letterSpacing: '0.05em' },
  deleteBtn: { padding: '0.4rem 0.75rem', background: '#ff0000', color: '#ffffff', border: '2px solid #000000', fontWeight: 'bold', fontSize: '0.75rem', letterSpacing: '0.05em' },
  activateBtn: { padding: '0.4rem 0.75rem', background: '#16a34a', color: '#ffffff', border: '2px solid #000000', fontWeight: 'bold', fontSize: '0.75rem', letterSpacing: '0.05em' },
  pagination: { display: 'flex', justifyContent: 'center', gap: '2rem', alignItems: 'center' },
  pageBtn: { padding: '0.75rem 1.5rem', background: '#000000', color: '#ffffff', border: '3px solid #000000', fontWeight: 'bold', letterSpacing: '0.05em', boxShadow: '4px 4px 0 #000000' },
  pageInfo: { fontWeight: 'bold', fontSize: '1.1rem', letterSpacing: '0.05em' },
  overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '2rem' },
  modal: { background: '#ffffff', padding: '2rem', border: '4px solid #000000', boxShadow: '12px 12px 0 #000000', width: '100%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto' },
  modalTitle: { fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1.5rem', letterSpacing: '0.05em', textAlign: 'center' },
  error: { color: '#ff0000', background: '#fff0f0', padding: '1rem', border: '3px solid #ff0000', marginBottom: '1rem', fontWeight: 'bold' },
  field: { marginBottom: '1.5rem' },
  label: { display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem', letterSpacing: '0.05em' },
  modalInput: { width: '100%', padding: '0.75rem', border: '3px solid #000000', background: '#ffffff', fontFamily: 'inherit', boxSizing: 'border-box' },
  modalActions: { display: 'flex', gap: '1rem' },
  cancelBtn: { flex: 1, padding: '0.75rem', background: '#666666', color: '#ffffff', border: '3px solid #000000', fontWeight: 'bold', letterSpacing: '0.05em' },
};

export default UsersPage;

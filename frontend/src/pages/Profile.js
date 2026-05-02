import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Badge } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { FaUser, FaEnvelope, FaLock, FaCalendarAlt, FaUserGraduate, FaChalkboardTeacher, FaShieldAlt, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, login } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        ...formData,
        name: user.name,
        email: user.email
      });
    }
  }, [user]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.put('/auth/updateprofile', {
        name: formData.name,
        email: formData.email
      });
      
      toast.success('Profile updated successfully!');
      setEditMode(false);
      
      // Refresh user data
      const meResponse = await api.get('/auth/me');
      // Update user in context
      window.location.reload();
      
    } catch (error) {
      toast.error(error.response?.data?.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('New passwords do not match!');
      return;
    }
    
    if (formData.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters!');
      return;
    }

    setLoading(true);

    try {
      await api.put('/auth/changepassword', {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword
      });
      
      toast.success('Password changed successfully!');
      setFormData({
        ...formData,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
    } catch (error) {
      toast.error(error.response?.data?.message || 'Password change failed');
    } finally {
      setLoading(false);
    }
  };

  const getRoleDetails = () => {
    switch(user?.role) {
      case 'admin':
        return { 
          badge: <Badge bg="danger" className="px-3 py-2">👑 Administrator</Badge>,
          icon: <FaShieldAlt size={24} />,
          color: '#dc3545',
          description: 'Full platform access and management'
        };
      case 'instructor':
        return { 
          badge: <Badge bg="info" className="px-3 py-2">👨‍🏫 Instructor</Badge>,
          icon: <FaChalkboardTeacher size={24} />,
          color: '#0dcaf0',
          description: 'Create and manage courses'
        };
      case 'student':
        return { 
          badge: <Badge bg="success" className="px-3 py-2">🎓 Student</Badge>,
          icon: <FaUserGraduate size={24} />,
          color: '#198754',
          description: 'Enroll and learn from courses'
        };
      default:
        return { 
          badge: <Badge bg="secondary">User</Badge>,
          icon: <FaUser size={24} />,
          color: '#6c757d',
          description: 'Platform user'
        };
    }
  };

  const roleDetails = getRoleDetails();

  if (!user) return null;

  return (
    <div className="bg-light min-vh-100 py-4">
      <Container>
        {/* Profile Header */}
        <div className="text-white rounded-4 p-4 mb-4" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
          <Row className="align-items-center">
            <Col>
              <div className="d-flex align-items-center gap-3">
                <div style={{
                  width: '70px',
                  height: '70px',
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px'
                }}>
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="mb-0">{user.name}</h2>
                  <p className="mb-0 opacity-75">{user.email}</p>
                </div>
              </div>
            </Col>
            <Col xs="auto">
              {roleDetails.icon}
            </Col>
          </Row>
        </div>
        
        <Row>
          {/* Profile Information */}
          <Col lg={6} className="mb-4">
            <Card className="border-0 shadow-sm rounded-4 h-100">
              <Card.Header className="bg-white border-0 pt-4 pb-0">
                <div className="d-flex justify-content-between align-items-center">
                  <h4 className="mb-0">
                    <FaUser className="me-2 text-primary" /> Personal Information
                  </h4>
                  <Button 
                    variant={editMode ? "secondary" : "primary"} 
                    size="sm"
                    onClick={() => setEditMode(!editMode)}
                    className="rounded-pill"
                  >
                    {editMode ? <><FaTimes className="me-1" /> Cancel</> : <><FaEdit className="me-1" /> Edit Profile</>}
                  </Button>
                </div>
              </Card.Header>
              <Card.Body className="p-4">
                {editMode ? (
                  <Form onSubmit={handleUpdateProfile}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">Full Name</Form.Label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-end-0">
                          <FaUser className="text-muted" />
                        </span>
                        <Form.Control
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="border-start-0"
                          required
                        />
                      </div>
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">Email Address</Form.Label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-end-0">
                          <FaEnvelope className="text-muted" />
                        </span>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="border-start-0"
                          required
                        />
                      </div>
                    </Form.Group>
                    
                    <Button 
                      variant="primary" 
                      type="submit" 
                      disabled={loading} 
                      className="w-100 py-2 rounded-pill"
                      style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', border: 'none' }}
                    >
                      <FaSave className="me-2" /> {loading ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </Form>
                ) : (
                  <>
                    <div className="mb-3 pb-3 border-bottom">
                      <small className="text-muted d-block mb-1">Full Name</small>
                      <h5 className="mb-0">{user.name}</h5>
                    </div>
                    <div className="mb-3 pb-3 border-bottom">
                      <small className="text-muted d-block mb-1">Email Address</small>
                      <h5 className="mb-0">{user.email}</h5>
                    </div>
                    <div className="mb-3 pb-3 border-bottom">
                      <small className="text-muted d-block mb-1">Role</small>
                      <div className="mt-1">{roleDetails.badge}</div>
                      <small className="text-muted d-block mt-2">{roleDetails.description}</small>
                    </div>
                    <div className="mb-3 pb-3 border-bottom">
                      <small className="text-muted d-block mb-1">
                        <FaCalendarAlt className="me-1" /> Member Since
                      </small>
                      <h5 className="mb-0">{new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</h5>
                    </div>
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
          
          {/* Change Password */}
          <Col lg={6} className="mb-4">
            <Card className="border-0 shadow-sm rounded-4 h-100">
              <Card.Header className="bg-white border-0 pt-4 pb-0">
                <h4 className="mb-0">
                  <FaLock className="me-2 text-warning" /> Security Settings
                </h4>
              </Card.Header>
              <Card.Body className="p-4">
                <Form onSubmit={handleChangePassword}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Current Password</Form.Label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <FaLock className="text-muted" />
                      </span>
                      <Form.Control
                        type="password"
                        placeholder="Enter your current password"
                        value={formData.currentPassword}
                        onChange={(e) => setFormData({...formData, currentPassword: e.target.value})}
                        className="border-start-0"
                        required
                      />
                    </div>
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">New Password</Form.Label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <FaLock className="text-muted" />
                      </span>
                      <Form.Control
                        type="password"
                        placeholder="Min 6 characters"
                        value={formData.newPassword}
                        onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
                        className="border-start-0"
                        required
                      />
                    </div>
                    <Form.Text className="text-muted">Password must be at least 6 characters</Form.Text>
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Confirm New Password</Form.Label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <FaLock className="text-muted" />
                      </span>
                      <Form.Control
                        type="password"
                        placeholder="Confirm your new password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                        className="border-start-0"
                        required
                      />
                    </div>
                  </Form.Group>
                  
                  <Button 
                    variant="warning" 
                    type="submit" 
                    disabled={loading} 
                    className="w-100 py-2 rounded-pill"
                  >
                    <FaLock className="me-2" /> {loading ? 'Changing...' : 'Change Password'}
                  </Button>
                </Form>
                
                <Alert variant="info" className="mt-4 mb-0 small">
                  <strong>💡 Security Tip:</strong> Use a strong password with at least 8 characters, including numbers and special characters.
                </Alert>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
        {/* Account Stats Card */}
        <Row>
          <Col lg={12}>
            <Card className="border-0 shadow-sm rounded-4">
              <Card.Body className="p-4">
                <h5 className="mb-3">📊 Account Overview</h5>
                <Row>
                  <Col md={3} className="text-center mb-3 mb-md-0">
                    <div className="p-3 rounded-3" style={{ backgroundColor: '#f8f9fa' }}>
                      <h6 className="text-muted mb-1">Account Status</h6>
                      <Badge bg="success" className="px-3 py-2">Active</Badge>
                    </div>
                  </Col>
                  <Col md={3} className="text-center mb-3 mb-md-0">
                    <div className="p-3 rounded-3" style={{ backgroundColor: '#f8f9fa' }}>
                      <h6 className="text-muted mb-1">Account ID</h6>
                      <code className="small">{user._id?.slice(-8)}</code>
                    </div>
                  </Col>
                  <Col md={3} className="text-center mb-3 mb-md-0">
                    <div className="p-3 rounded-3" style={{ backgroundColor: '#f8f9fa' }}>
                      <h6 className="text-muted mb-1">Email Verified</h6>
                      <Badge bg="success">Yes</Badge>
                    </div>
                  </Col>
                  <Col md={3} className="text-center">
                    <div className="p-3 rounded-3" style={{ backgroundColor: '#f8f9fa' }}>
                      <h6 className="text-muted mb-1">2-Factor Auth</h6>
                      <Badge bg="secondary">Not Enabled</Badge>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Profile;
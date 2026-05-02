import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaEnvelope, FaLock, FaChalkboardTeacher, FaUserGraduate } from 'react-icons/fa';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student'
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setLoading(true);
    
    const result = await register(
      formData.name,
      formData.email,
      formData.password,
      formData.role
    );
    
    if (result.success) {
      navigate('/login');
    }
    
    setLoading(false);
  };

  return (
    <div className="d-flex align-items-center" style={{ minHeight: 'calc(100vh - 72px)', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '40px 0' }}>
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <Card className="shadow-lg border-0 rounded-4" style={{
              animation: 'slideUp 0.6s ease-out',
              overflow: 'hidden'
            }}>
              <Card.Body className="p-4 p-md-5">
                <div className="text-center mb-4">
                  <div style={{
                    width: '70px',
                    height: '70px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 15px',
                    animation: 'bounce 2s ease-in-out infinite'
                  }}>
                    {formData.role === 'student' ? (
                      <FaUserGraduate size={35} style={{ color: 'white' }} />
                    ) : (
                      <FaChalkboardTeacher size={35} style={{ color: 'white' }} />
                    )}
                  </div>
                  <h2 className="fw-bold" style={{ color: '#2c3e50' }}>Create Account 🚀</h2>
                  <p className="text-muted">Join our learning community</p>
                </div>
                
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Full Name</Form.Label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <FaUser className="text-muted" />
                      </span>
                      <Form.Control
                        type="text"
                        name="name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleChange}
                        className="border-start-0"
                        style={{ padding: '12px' }}
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
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        className="border-start-0"
                        style={{ padding: '12px' }}
                        required
                      />
                    </div>
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Password</Form.Label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <FaLock className="text-muted" />
                      </span>
                      <Form.Control
                        type="password"
                        name="password"
                        placeholder="Min 6 characters"
                        value={formData.password}
                        onChange={handleChange}
                        className="border-start-0"
                        style={{ padding: '12px' }}
                        required
                      />
                    </div>
                    {errors.password && <small className="text-danger">{errors.password}</small>}
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Confirm Password</Form.Label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <FaLock className="text-muted" />
                      </span>
                      <Form.Control
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="border-start-0"
                        style={{ padding: '12px' }}
                        required
                      />
                    </div>
                    {errors.confirmPassword && <small className="text-danger">{errors.confirmPassword}</small>}
                  </Form.Group>
                  
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-semibold">Register as</Form.Label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        {formData.role === 'student' ? (
                          <FaUserGraduate className="text-muted" />
                        ) : (
                          <FaChalkboardTeacher className="text-muted" />
                        )}
                      </span>
                      <Form.Select 
                        name="role" 
                        value={formData.role} 
                        onChange={handleChange}
                        className="border-start-0"
                        style={{ padding: '12px' }}
                      >
                        <option value="student">🎓 Student - Learn from courses</option>
                        <option value="instructor">👨‍🏫 Instructor - Create and teach courses</option>
                      </Form.Select>
                    </div>
                  </Form.Group>
                  
                  <Button 
                    variant="primary" 
                    type="submit" 
                    className="w-100 py-3 fw-bold"
                    disabled={loading}
                    style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      border: 'none',
                      transition: 'transform 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'}
                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                  >
                    {loading ? 'Creating Account...' : 'Register'}
                  </Button>
                </Form>
                
                <div className="text-center mt-4">
                  <p className="text-muted">
                    Already have an account?{' '}
                    <Link to="/login" className="text-decoration-none fw-bold" style={{ color: '#667eea' }}>
                      Login here
                    </Link>
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
};

export default Register;
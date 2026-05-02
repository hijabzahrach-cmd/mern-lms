import React, { useState } from 'react';
import { Navbar, Nav, Container, Button, Dropdown, Modal, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUserCircle, FaTachometerAlt, FaSignOutAlt, FaTrashAlt } from 'react-icons/fa';

const NavigationBar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showClearModal, setShowClearModal] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleClearSession = () => {
    sessionStorage.clear();
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
      setShowClearModal(false);
      window.location.reload();
    }, 1500);
  };

  const getDashboardLink = () => {
    if (!user) return '/login';
    switch(user.role) {
      case 'admin': return '/dashboard/admin';
      case 'instructor': return '/dashboard/instructor';
      case 'student': return '/dashboard/student';
      default: return '/login';
    }
  };

  return (
    <>
      {/* Session Clear Message */}
      {showMessage && (
        <Alert variant="info" className="text-center mb-0" onClose={() => setShowMessage(false)} dismissible>
          🗑️ Session cleared! Page will reload...
        </Alert>
      )}

      {/* Clear Session Confirmation Modal */}
      <Modal show={showClearModal} onHide={() => setShowClearModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Clear Session</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to clear your session?</p>
          <p className="text-muted small">This will log you out and clear all saved data.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowClearModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleClearSession}>
            Clear Session
          </Button>
        </Modal.Footer>
      </Modal>

      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand as={Link} to="/" className="fw-bold">
            📚 LMS Platform
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">🏠 Home</Nav.Link>
              <Nav.Link as={Link} to="/about">ℹ️ About</Nav.Link>
              <Nav.Link as={Link} to="/courses">📖 Courses</Nav.Link>
            </Nav>
            
            <Nav>
              {isAuthenticated ? (
                <>
                  <Nav.Link as={Link} to={getDashboardLink()}>
                    <FaTachometerAlt className="me-1" /> Dashboard
                  </Nav.Link>
                  
                  <Dropdown align="end">
                    <Dropdown.Toggle as={Nav.Link} className="p-0">
                      <FaUserCircle size={28} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item as={Link} to="/profile">
                        👤 My Profile
                      </Dropdown.Item>
                      <Dropdown.Item as={Link} to={getDashboardLink()}>
                        📊 Dashboard
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item onClick={handleLogout}>
                        <FaSignOutAlt className="me-2" /> Logout
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item 
                        onClick={() => setShowClearModal(true)}
                        className="text-warning"
                      >
                        <FaTrashAlt className="me-2" /> Clear Session
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  
                  <Navbar.Text className="ms-2">
                    Welcome, <strong>{user?.name}</strong>
                    <span className="text-muted ms-1">({user?.role})</span>
                  </Navbar.Text>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/login">🔐 Login</Nav.Link>
                  <Nav.Link as={Link} to="/register">📝 Register</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavigationBar;
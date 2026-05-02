import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Modal, Spinner, Badge, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { FaUsers, FaBook, FaChalkboardTeacher, FaUserGraduate, FaTrash, FaChartLine, FaEdit, FaEye, FaSave, FaTimes } from 'react-icons/fa';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editingCourse, setEditingCourse] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: ''
  });
  const { user } = useAuth();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [usersRes, coursesRes, statsRes] = await Promise.all([
        api.get('/users'),
        api.get('/courses'),
        api.get('/users/stats')
      ]);
      setUsers(usersRes.data.users);
      setCourses(coursesRes.data.courses);
      setStats(statsRes.data.stats);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    try {
      await api.delete(`/users/${selectedUser._id}`);
      toast.success('User deleted successfully!');
      fetchData();
      setShowDeleteModal(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Delete failed');
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await api.delete(`/courses/${courseId}`);
        toast.success('Course deleted successfully!');
        fetchData();
      } catch (error) {
        toast.error(error.response?.data?.message || 'Delete failed');
      }
    }
  };

  const handleEditCourse = (course) => {
    setEditingCourse(course);
    setEditFormData({
      title: course.title,
      description: course.description,
      category: course.category,
      price: course.price
    });
    setShowEditModal(true);
  };

  const handleUpdateCourse = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/courses/${editingCourse._id}`, editFormData);
      toast.success('Course updated successfully!');
      setShowEditModal(false);
      setEditingCourse(null);
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Update failed');
    }
  };

  // Helper function to get instructor name properly
  const getInstructorName = (course) => {
    if (course.instructor?.name) {
      return course.instructor.name;
    }
    return 'Unknown Instructor';
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
        <Spinner animation="border" variant="primary" size="lg" />
      </div>
    );
  }

  // Separate users by role
  const instructors = users.filter(u => u.role === 'instructor');
  const students = users.filter(u => u.role === 'student');

  return (
    <div className="bg-light min-vh-100 py-4">
      <Container>
        {/* Welcome Section */}
        <div className="text-white rounded-4 p-4 mb-4" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
          <Row className="align-items-center">
            <Col>
              <div className="d-flex align-items-center gap-3 mb-2">
                <div style={{
                  width: '60px',
                  height: '60px',
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px'
                }}>
                  👑
                </div>
                <div>
                  <h2 className="mb-0">Admin Dashboard, {user?.name}!</h2>
                  <p className="mb-0 opacity-75">Manage users, courses, and platform analytics</p>
                </div>
              </div>
            </Col>
            <Col xs="auto">
              <FaChartLine size={50} className="opacity-50" />
            </Col>
          </Row>
        </div>
        
        {/* Statistics Cards */}
        <Row className="mb-4 g-4">
          <Col md={3}>
            <Card className="border-0 shadow-sm rounded-4 h-100">
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="text-muted mb-1">Total Users</h6>
                    <h2 className="mb-0 fw-bold">{stats.totalUsers || 0}</h2>
                  </div>
                  <div className="rounded-circle p-3" style={{ backgroundColor: 'rgba(102,126,234,0.1)' }}>
                    <FaUsers size={30} className="text-primary" />
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="border-0 shadow-sm rounded-4 h-100">
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="text-muted mb-1">Students</h6>
                    <h2 className="mb-0 fw-bold">{students.length}</h2>
                  </div>
                  <div className="rounded-circle p-3" style={{ backgroundColor: 'rgba(40,167,69,0.1)' }}>
                    <FaUserGraduate size={30} className="text-success" />
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="border-0 shadow-sm rounded-4 h-100">
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="text-muted mb-1">Instructors</h6>
                    <h2 className="mb-0 fw-bold">{instructors.length}</h2>
                  </div>
                  <div className="rounded-circle p-3" style={{ backgroundColor: 'rgba(23,162,184,0.1)' }}>
                    <FaChalkboardTeacher size={30} className="text-info" />
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="border-0 shadow-sm rounded-4 h-100">
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="text-muted mb-1">Total Courses</h6>
                    <h2 className="mb-0 fw-bold">{courses.length}</h2>
                  </div>
                  <div className="rounded-circle p-3" style={{ backgroundColor: 'rgba(255,193,7,0.1)' }}>
                    <FaBook size={30} className="text-warning" />
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Instructors Section */}
        <Card className="border-0 shadow-sm rounded-4 mb-4">
          <Card.Header className="bg-white border-0 pt-4 pb-0">
            <h4 className="mb-0 fw-bold">
              <FaChalkboardTeacher className="me-2 text-info" /> Instructors
            </h4>
          </Card.Header>
          <Card.Body className="p-0">
            <div className="table-responsive">
              <Table hover className="align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th style={{ padding: '15px' }}>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Courses</th>
                    <th>Joined</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {instructors.map((inst, idx) => {
                    const instructorCourses = courses.filter(c => c.instructor?._id === inst._id);
                    return (
                      <tr key={inst._id}>
                        <td style={{ padding: '15px' }}>{idx + 1}</td>
                        <td className="fw-semibold">{inst.name}</td>
                        <td>{inst.email}</td>
                        <td>
                          <Badge bg="info" style={{ borderRadius: '20px' }}>
                            {instructorCourses.length} Courses
                          </Badge>
                        </td>
                        <td>{new Date(inst.createdAt).toLocaleDateString()}</td>
                        <td>
                          <Button 
                            variant="outline-danger" 
                            size="sm"
                            onClick={() => {
                              setSelectedUser(inst);
                              setShowDeleteModal(true);
                            }}
                          >
                            <FaTrash /> Delete
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                  {instructors.length === 0 && (
                    <tr>
                      <td colSpan="6" className="text-center text-muted py-4">
                        No instructors found
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>

        {/* Students Section */}
        <Card className="border-0 shadow-sm rounded-4 mb-4">
          <Card.Header className="bg-white border-0 pt-4 pb-0">
            <h4 className="mb-0 fw-bold">
              <FaUserGraduate className="me-2 text-success" /> Students
            </h4>
          </Card.Header>
          <Card.Body className="p-0">
            <div className="table-responsive">
              <Table hover className="align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th style={{ padding: '15px' }}>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Enrolled Courses</th>
                    <th>Joined</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, idx) => {
                    const studentCourses = courses.filter(c => c.enrolledStudents?.includes(student._id));
                    return (
                      <tr key={student._id}>
                        <td style={{ padding: '15px' }}>{idx + 1}</td>
                        <td className="fw-semibold">{student.name}</td>
                        <td>{student.email}</td>
                        <td>
                          <Badge bg="success" style={{ borderRadius: '20px' }}>
                            {studentCourses.length} Courses
                          </Badge>
                        </td>
                        <td>{new Date(student.createdAt).toLocaleDateString()}</td>
                        <td>
                          <Button 
                            variant="outline-danger" 
                            size="sm"
                            onClick={() => {
                              setSelectedUser(student);
                              setShowDeleteModal(true);
                            }}
                          >
                            <FaTrash /> Delete
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                  {students.length === 0 && (
                    <tr>
                      <td colSpan="6" className="text-center text-muted py-4">
                        No students found
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>

        {/* Courses Management - With Edit Button */}
        <Card className="border-0 shadow-sm rounded-4">
          <Card.Header className="bg-white border-0 pt-4 pb-0">
            <h4 className="mb-0 fw-bold">
              <FaBook className="me-2 text-warning" /> All Courses
            </h4>
          </Card.Header>
          <Card.Body className="p-0">
            <div className="table-responsive">
              <Table hover className="align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th style={{ padding: '15px' }}>#</th>
                    <th>Course Title</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Students</th>
                    <th>👨‍🏫 Instructor</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course, idx) => (
                    <tr key={course._id}>
                      <td style={{ padding: '15px' }}>{idx + 1}</td>
                      <td className="fw-semibold">{course.title}</td>
                      <td>
                        <Badge bg="secondary" style={{ borderRadius: '20px' }}>
                          {course.category}
                        </Badge>
                      </td>
                      <td>
                        {course.price === 0 ? (
                          <Badge bg="success">Free</Badge>
                        ) : (
                          <span className="fw-bold text-primary">${course.price}</span>
                        )}
                      </td>
                      <td>
                        <Badge bg="info" style={{ borderRadius: '20px' }}>
                          {course.enrolledStudents?.length || 0}
                        </Badge>
                      </td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <div style={{
                            width: '30px',
                            height: '30px',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '12px',
                            fontWeight: 'bold'
                          }}>
                            {getInstructorName(course).charAt(0).toUpperCase()}
                          </div>
                          <span className="fw-semibold">{getInstructorName(course)}</span>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex gap-2">
                          <Button 
                            variant="outline-warning" 
                            size="sm"
                            onClick={() => handleEditCourse(course)}
                          >
                            <FaEdit className="me-1" /> Edit
                          </Button>
                          <Button 
                            variant="outline-danger" 
                            size="sm"
                            onClick={() => handleDeleteCourse(course._id)}
                          >
                            <FaTrash className="me-1" /> Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {courses.length === 0 && (
                    <tr>
                      <td colSpan="7" className="text-center text-muted py-4">
                        No courses found
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>
      </Container>

      {/* Delete User Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete <strong>{selectedUser?.name}</strong>?
          <br />
          <small className="text-muted">This action cannot be undone.</small>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteUser}>
            Delete User
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Course Modal */}
      <Modal show={showEditModal} onHide={() => { setShowEditModal(false); setEditingCourse(null); }} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <FaEdit className="me-2 text-warning" /> Edit Course
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleUpdateCourse}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Course Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter course title"
                value={editFormData.title}
                onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Enter course description"
                value={editFormData.description}
                onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Category</Form.Label>
              <Form.Select
                value={editFormData.category}
                onChange={(e) => setEditFormData({ ...editFormData, category: e.target.value })}
              >
                <option value="Programming">💻 Programming</option>
                <option value="Design">🎨 Design</option>
                <option value="Business">📊 Business</option>
                <option value="Marketing">📢 Marketing</option>
                <option value="Data Science">📈 Data Science</option>
                <option value="Other">📚 Other</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Price ($)</Form.Label>
              <Form.Control
                type="number"
                placeholder="0 for free"
                value={editFormData.price}
                onChange={(e) => setEditFormData({ ...editFormData, price: e.target.value })}
                required
              />
              <Form.Text className="text-muted">Leave 0 for free courses</Form.Text>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => { setShowEditModal(false); setEditingCourse(null); }}>
              <FaTimes className="me-1" /> Cancel
            </Button>
            <Button variant="primary" type="submit" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', border: 'none' }}>
              <FaSave className="me-1" /> Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminDashboard;
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Modal, Spinner, ProgressBar, Badge } from 'react-bootstrap';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { FaPlus, FaEdit, FaTrash, FaBook, FaUsers, FaDollarSign, FaChalkboardTeacher, FaClock, FaPlayCircle } from 'react-icons/fa';
import toast from 'react-hot-toast';

const InstructorDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showLessonModal, setShowLessonModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Programming',
    price: ''
  });
  
  const [lessonData, setLessonData] = useState({
    title: '',
    description: '',
    videoUrl: '',
    duration: ''
  });

  useEffect(() => {
    fetchMyCourses();
  }, []);

  const fetchMyCourses = async () => {
    try {
      const response = await api.get('/courses');
      const myCourses = response.data.courses.filter(c => c.instructor?._id === user?.id);
      setCourses(myCourses);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCourse) {
        await api.put(`/courses/${editingCourse._id}`, formData);
        toast.success('Course updated successfully!');
      } else {
        await api.post('/courses', formData);
        toast.success('Course created successfully!');
      }
      setShowModal(false);
      resetForm();
      fetchMyCourses();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleDelete = async (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await api.delete(`/courses/${courseId}`);
        toast.success('Course deleted successfully!');
        fetchMyCourses();
      } catch (error) {
        toast.error(error.response?.data?.message || 'Delete failed');
      }
    }
  };

  const handleAddLesson = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/courses/${selectedCourse._id}/lessons`, lessonData);
      toast.success('Lesson added successfully!');
      setShowLessonModal(false);
      resetLessonForm();
      fetchMyCourses();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add lesson');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: 'Programming',
      price: ''
    });
    setEditingCourse(null);
  };

  const resetLessonForm = () => {
    setLessonData({
      title: '',
      description: '',
      videoUrl: '',
      duration: ''
    });
    setSelectedCourse(null);
  };

  const editCourse = (course) => {
    setEditingCourse(course);
    setFormData({
      title: course.title,
      description: course.description,
      category: course.category,
      price: course.price
    });
    setShowModal(true);
  };

  // Calculate totals
  const totalStudents = courses.reduce((sum, course) => sum + (course.enrolledStudents?.length || 0), 0);
  const totalRevenue = courses.reduce((sum, course) => sum + (course.price * (course.enrolledStudents?.length || 0)), 0);
  const totalLessons = courses.reduce((sum, course) => sum + (course.lessons?.length || 0), 0);

  // Get instructor name properly
  const instructorName = user?.name || 'Instructor';

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
        <Spinner animation="border" variant="primary" size="lg" />
      </div>
    );
  }

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
                  👨‍🏫
                </div>
                <div>
                  <h2 className="mb-0">Welcome back, {instructorName}!</h2>
                  <p className="mb-0 opacity-75">Here's what's happening with your courses</p>
                </div>
              </div>
            </Col>
            <Col xs="auto">
              <Button variant="light" onClick={() => setShowModal(true)} className="rounded-3 px-4 py-2">
                <FaPlus className="me-2" /> Create New Course
              </Button>
            </Col>
          </Row>
        </div>
        
        {/* Stats Cards */}
        <Row className="mb-4 g-4">
          <Col md={3}>
            <Card className="border-0 shadow-sm rounded-4 h-100">
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="text-muted mb-1">Total Courses</h6>
                    <h2 className="mb-0 fw-bold">{courses.length}</h2>
                  </div>
                  <div className="rounded-circle p-3" style={{ backgroundColor: 'rgba(102,126,234,0.1)' }}>
                    <FaBook size={28} className="text-primary" />
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
                    <h6 className="text-muted mb-1">Total Lessons</h6>
                    <h2 className="mb-0 fw-bold">{totalLessons}</h2>
                  </div>
                  <div className="rounded-circle p-3" style={{ backgroundColor: 'rgba(23,162,184,0.1)' }}>
                    <FaPlayCircle size={28} className="text-info" />
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
                    <h6 className="text-muted mb-1">Total Students</h6>
                    <h2 className="mb-0 fw-bold">{totalStudents}</h2>
                  </div>
                  <div className="rounded-circle p-3" style={{ backgroundColor: 'rgba(40,167,69,0.1)' }}>
                    <FaUsers size={28} className="text-success" />
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
                    <h6 className="text-muted mb-1">Total Revenue</h6>
                    <h2 className="mb-0 fw-bold">${totalRevenue}</h2>
                  </div>
                  <div className="rounded-circle p-3" style={{ backgroundColor: 'rgba(255,193,7,0.1)' }}>
                    <FaDollarSign size={28} className="text-warning" />
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* My Courses Section */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="fw-bold mb-0">📚 My Courses</h3>
          <Badge bg="primary" className="px-3 py-2 rounded-pill">
            {courses.length} Total
          </Badge>
        </div>

        {courses.length === 0 ? (
          <Card className="border-0 shadow-sm rounded-4 text-center p-5">
            <Card.Body>
              <div style={{ fontSize: '60px' }}>📖</div>
              <h4 className="text-muted mb-3 mt-3">No courses created yet</h4>
              <p className="text-muted mb-4">Start your teaching journey by creating your first course</p>
              <Button variant="primary" onClick={() => setShowModal(true)} size="lg" className="rounded-3 px-4">
                <FaPlus className="me-2" /> Create Your First Course
              </Button>
            </Card.Body>
          </Card>
        ) : (
          <Row>
            {courses.map((course) => (
              <Col md={6} lg={4} key={course._id} className="mb-4 d-flex">
                <Card className="w-100 border-0 shadow-sm rounded-4 overflow-hidden" style={{ transition: 'transform 0.2s ease' }}>
                  {/* Course Header */}
                  <div style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    padding: '20px',
                    color: 'white'
                  }}>
                    <div className="d-flex justify-content-between align-items-center">
                      <Badge bg="light" text="dark" style={{ borderRadius: '20px' }}>
                        {course.category}
                      </Badge>
                      <small><FaClock className="me-1" /> {course.lessons?.length || 0} Lessons</small>
                    </div>
                    <h5 className="mt-3 mb-0">{course.title}</h5>
                  </div>
                  
                  <Card.Body className="p-4">
                    <Card.Text className="text-muted small mb-3">
                      {course.description.substring(0, 100)}...
                    </Card.Text>
                    
                    <div className="mb-3">
                      <div className="d-flex justify-content-between mb-1">
                        <small className="text-muted">👥 Students Enrolled</small>
                        <small className="fw-bold">{course.enrolledStudents?.length || 0}</small>
                      </div>
                      <ProgressBar 
                        now={Math.min((course.enrolledStudents?.length || 0) * 2, 100)} 
                        variant="info" 
                        className="rounded-3"
                        style={{ height: '8px' }}
                      />
                    </div>
                    
                    <div className="mb-3">
                      <div className="d-flex justify-content-between">
                        <small className="text-muted">💰 Price</small>
                        <strong className={course.price === 0 ? 'text-success' : 'text-primary'}>
                          {course.price === 0 ? 'Free' : `$${course.price}`}
                        </strong>
                      </div>
                    </div>
                  </Card.Body>
                  
                  <Card.Footer className="bg-transparent border-0 pb-4 pt-0">
                    <div className="d-flex gap-2">
                      <Button variant="outline-primary" size="sm" onClick={() => editCourse(course)} className="flex-grow-1">
                        <FaEdit className="me-1" /> Edit
                      </Button>
                      <Button variant="outline-success" size="sm" onClick={() => {
                        setSelectedCourse(course);
                        setShowLessonModal(true);
                      }} className="flex-grow-1">
                        <FaPlus className="me-1" /> Lesson
                      </Button>
                      <Button variant="outline-danger" size="sm" onClick={() => handleDelete(course._id)}>
                        <FaTrash />
                      </Button>
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>

      {/* Create/Edit Course Modal */}
      <Modal show={showModal} onHide={() => { setShowModal(false); resetForm(); }} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingCourse ? 
              <><FaEdit className="me-2" /> Edit Course</> : 
              <><FaPlus className="me-2" /> Create New Course</>
            }
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Course Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter course title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Enter course description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Category</Form.Label>
              <Form.Select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
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
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
              />
              <Form.Text className="text-muted">Leave 0 for free courses</Form.Text>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => { setShowModal(false); resetForm(); }}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', border: 'none' }}>
              {editingCourse ? 'Update Course' : 'Create Course'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Add Lesson Modal */}
      <Modal show={showLessonModal} onHide={() => { setShowLessonModal(false); resetLessonForm(); }} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <FaPlayCircle className="me-2 text-primary" /> Add Lesson to "{selectedCourse?.title}"
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleAddLesson}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Lesson Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter lesson title"
                value={lessonData.title}
                onChange={(e) => setLessonData({ ...lessonData, title: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Description (Optional)</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="What will students learn in this lesson?"
                value={lessonData.description}
                onChange={(e) => setLessonData({ ...lessonData, description: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Video URL (Optional)</Form.Label>
              <Form.Control
                type="text"
                placeholder="https://youtube.com/..."
                value={lessonData.videoUrl}
                onChange={(e) => setLessonData({ ...lessonData, videoUrl: e.target.value })}
              />
              <Form.Text className="text-muted">YouTube or Vimeo link</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Duration (minutes)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Lesson duration in minutes"
                value={lessonData.duration}
                onChange={(e) => setLessonData({ ...lessonData, duration: e.target.value })}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => { setShowLessonModal(false); resetLessonForm(); }}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Add Lesson
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default InstructorDashboard;
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner, ProgressBar, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { FaBookOpen, FaGraduationCap, FaChartLine, FaPlayCircle, FaCheckCircle, FaUserTie, FaClock } from 'react-icons/fa';
import toast from 'react-hot-toast';

const StudentDashboard = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchEnrolledCourses();
  }, []);

  const fetchEnrolledCourses = async () => {
    try {
      const response = await api.get('/enrollments/my-courses');
      setEnrolledCourses(response.data.enrollments);
    } catch (error) {
      console.error('Error fetching enrolled courses:', error);
      toast.error('Failed to load your courses');
    } finally {
      setLoading(false);
    }
  };

  // Calculate stats
  const totalCourses = enrolledCourses.length;
  const completedCourses = enrolledCourses.filter(c => c.progress === 100).length;
  const averageProgress = totalCourses > 0 
    ? Math.round(enrolledCourses.reduce((acc, c) => acc + c.progress, 0) / totalCourses) 
    : 0;

  // Get instructor name
  const getInstructorName = (course) => {
    return course?.instructor?.name || 'Kissa LMS Instructor';
  };

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
                  🎓
                </div>
                <div>
                  <h2 className="mb-0">Welcome back, {user?.name}!</h2>
                  <p className="mb-0 opacity-75">Continue your learning journey</p>
                </div>
              </div>
            </Col>
            <Col xs="auto">
              <Button as={Link} to="/courses" variant="light" className="rounded-3 px-4">
                Browse More Courses →
              </Button>
            </Col>
          </Row>
        </div>
        
        {/* Stats Cards */}
        <Row className="mb-4 g-4">
          <Col md={4}>
            <Card className="border-0 shadow-sm rounded-4 h-100">
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="text-muted mb-1">Enrolled Courses</h6>
                    <h2 className="mb-0 fw-bold">{totalCourses}</h2>
                  </div>
                  <div className="rounded-circle p-3" style={{ backgroundColor: 'rgba(102,126,234,0.1)' }}>
                    <FaBookOpen size={28} className="text-primary" />
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="border-0 shadow-sm rounded-4 h-100">
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="text-muted mb-1">Completed Courses</h6>
                    <h2 className="mb-0 fw-bold">{completedCourses}</h2>
                  </div>
                  <div className="rounded-circle p-3" style={{ backgroundColor: 'rgba(40,167,69,0.1)' }}>
                    <FaGraduationCap size={28} className="text-success" />
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="border-0 shadow-sm rounded-4 h-100">
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="text-muted mb-1">Average Progress</h6>
                    <h2 className="mb-0 fw-bold">{averageProgress}%</h2>
                  </div>
                  <div className="rounded-circle p-3" style={{ backgroundColor: 'rgba(23,162,184,0.1)' }}>
                    <FaChartLine size={28} className="text-info" />
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* My Courses Section */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="fw-bold mb-0">📚 My Learning Journey</h3>
          <Badge bg="primary" className="px-3 py-2 rounded-pill">
            {totalCourses} Courses
          </Badge>
        </div>

        {enrolledCourses.length === 0 ? (
          <Card className="border-0 shadow-sm rounded-4 text-center p-5">
            <Card.Body>
              <div style={{ fontSize: '60px' }}>📖</div>
              <h4 className="text-muted mb-3 mt-3">No courses enrolled yet</h4>
              <p className="text-muted mb-4">Start your learning journey by enrolling in your first course</p>
              <Button as={Link} to="/courses" variant="primary" size="lg" className="rounded-3 px-4">
                Browse Courses →
              </Button>
            </Card.Body>
          </Card>
        ) : (
          <Row>
            {enrolledCourses.map((enrollment) => {
              const course = enrollment.course;
              const isCompleted = enrollment.progress === 100;
              
              return (
                <Col md={6} lg={4} key={enrollment._id} className="mb-4 d-flex">
                  <Card className="w-100 border-0 shadow-sm rounded-4 overflow-hidden" style={{ transition: 'transform 0.2s ease' }}>
                    {/* Course Header */}
                    <div style={{
                      background: isCompleted 
                        ? 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)'
                        : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      padding: '20px',
                      color: 'white'
                    }}>
                      <div className="d-flex justify-content-between align-items-center">
                        <Badge bg="light" text="dark" style={{ borderRadius: '20px' }}>
                          {course?.category || 'Course'}
                        </Badge>
                        {isCompleted ? (
                          <FaCheckCircle size={24} />
                        ) : (
                          <FaPlayCircle size={24} />
                        )}
                      </div>
                      <h5 className="mt-3 mb-0">{course?.title}</h5>
                    </div>
                    
                    <Card.Body className="p-4">
                      <Card.Text className="text-muted small mb-3">
                        {course?.description?.substring(0, 100)}...
                      </Card.Text>
                      
                      {/* Instructor Info */}
                      <div className="d-flex align-items-center gap-2 mb-3 pb-2 border-bottom">
                        <div style={{
                          width: '32px',
                          height: '32px',
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontSize: '14px',
                          fontWeight: 'bold'
                        }}>
                          {getInstructorName(course).charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div style={{ fontSize: '12px', color: '#6c757d' }}>Instructor</div>
                          <div style={{ fontSize: '13px', fontWeight: '500' }}>{getInstructorName(course)}</div>
                        </div>
                      </div>
                      
                      {/* Progress */}
                      <div className="mb-3">
                        <div className="d-flex justify-content-between mb-1">
                          <small className="text-muted">Your Progress</small>
                          <small className="fw-bold">{enrollment.progress}%</small>
                        </div>
                        <ProgressBar 
                          now={enrollment.progress} 
                          variant={isCompleted ? "success" : "primary"}
                          className="rounded-3"
                          style={{ height: '8px' }}
                        />
                      </div>
                      
                      {/* Lessons Info */}
                      <div className="d-flex align-items-center gap-3 mb-3">
                        <small className="text-muted">
                          <FaClock className="me-1" /> {course?.lessons?.length || 0} Lessons
                        </small>
                      </div>
                    </Card.Body>
                    
                    <Card.Footer className="bg-transparent border-0 pb-4 pt-0">
                      <Button 
                        as={Link} 
                        to={`/courses/${course?._id}`} 
                        variant={isCompleted ? "success" : "primary"}
                        className="w-100 rounded-3 py-2"
                        style={{
                          background: isCompleted ? '#28a745' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          border: 'none'
                        }}
                      >
                        {isCompleted ? '🎉 Review Course' : '📖 Continue Learning'}
                      </Button>
                    </Card.Footer>
                  </Card>
                </Col>
              );
            })}
          </Row>
        )}
      </Container>
    </div>
  );
};

export default StudentDashboard;
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Alert, Spinner, Badge } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { FaDollarSign, FaUserGraduate, FaClock, FaPlayCircle, FaCheckCircle, FaStar, FaUserTie } from 'react-icons/fa';
import toast from 'react-hot-toast';

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourse();
    checkEnrollment();
  }, [id]);

  const fetchCourse = async () => {
    try {
      const response = await api.get(`/courses/${id}`);
      setCourse(response.data.course);
    } catch (error) {
      console.error('Error fetching course:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkEnrollment = async () => {
    if (isAuthenticated && user?.role === 'student') {
      try {
        const response = await api.get('/enrollments/my-courses');
        const enrolled = response.data.enrollments.some(e => e.course?._id === id);
        setIsEnrolled(enrolled);
      } catch (error) {
        console.error('Error checking enrollment:', error);
      }
    }
  };

  const handleEnroll = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    setEnrolling(true);
    try {
      await api.post('/enrollments', { courseId: id });
      toast.success('Successfully enrolled in the course!');
      setIsEnrolled(true);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Enrollment failed');
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
        <Spinner animation="border" variant="primary" size="lg" />
      </div>
    );
  }

  if (!course) {
    return (
      <Container className="my-5">
        <Alert variant="danger">Course not found</Alert>
      </Container>
    );
  }

  // Get instructor name properly
  const instructorName = course.instructor?.name || 'Kissa LMS Team';
  const instructorInitial = instructorName.charAt(0).toUpperCase();

  return (
    <Container className="my-5">
      <Row>
        <Col lg={8}>
          {/* Course Header */}
          <div className="mb-4">
            <Badge bg="primary" className="mb-3 px-3 py-2 rounded-pill" style={{ fontSize: '14px' }}>
              {course.category}
            </Badge>
            <h1 className="display-5 fw-bold mb-3" style={{ color: '#2c3e50' }}>{course.title}</h1>
            
            {/* Instructor Info - Fixed */}
            <div className="d-flex align-items-center gap-4 mb-4 flex-wrap">
              <div className="d-flex align-items-center gap-2">
                <div style={{
                  width: '45px',
                  height: '45px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '18px'
                }}>
                  {instructorInitial}
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: '#6c757d' }}>Course Instructor</div>
                  <div style={{ fontWeight: '600', color: '#2c3e50', fontSize: '16px' }}>{instructorName}</div>
                </div>
              </div>
              <div className="d-flex align-items-center gap-2">
                <FaStar className="text-warning" />
                <span className="fw-bold">4.9</span>
                <span className="text-muted">(128 ratings)</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <FaUserGraduate className="text-primary" />
                <span className="text-muted">{course.enrolledStudents?.length || 0} students</span>
              </div>
            </div>
          </div>
          
          {/* Description */}
          <div className="mb-4 p-4" style={{ backgroundColor: '#f8f9fa', borderRadius: '16px' }}>
            <h4 className="mb-3" style={{ color: '#2c3e50' }}>📖 About This Course</h4>
            <p className="text-muted" style={{ fontSize: '1rem', lineHeight: '1.6' }}>{course.description}</p>
          </div>
          
          {/* Course Content */}
          <div className="mb-4">
            <h4 className="mb-3" style={{ color: '#2c3e50' }}>📚 Course Content ({course.lessons?.length || 0} lessons)</h4>
            {course.lessons && course.lessons.length > 0 ? (
              <div className="border rounded-3 overflow-hidden">
                {course.lessons.map((lesson, index) => (
                  <div key={index} className="d-flex align-items-center p-3 border-bottom" style={{ backgroundColor: index % 2 === 0 ? '#fff' : '#fafafa' }}>
                    <div className="me-3">
                      {isEnrolled ? 
                        <FaCheckCircle className="text-success" size={20} /> : 
                        <FaPlayCircle className="text-primary" size={20} />
                      }
                    </div>
                    <div className="flex-grow-1">
                      <h6 className="mb-0 fw-semibold">Lesson {index + 1}: {lesson.title}</h6>
                      {lesson.description && <small className="text-muted d-block">{lesson.description}</small>}
                    </div>
                    {lesson.duration && (
                      <div className="text-muted small">
                        <FaClock className="me-1" size={12} /> {lesson.duration} min
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <Alert variant="info" className="rounded-3">📝 No lessons added yet. Check back soon!</Alert>
            )}
          </div>
        </Col>
        
        {/* Sidebar - Course Card */}
        <Col lg={4}>
          <Card className="shadow-lg border-0 rounded-4 sticky-top" style={{ top: '100px', backgroundColor: '#fff' }}>
            {/* Course Preview Image */}
            <div style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              padding: '30px',
              textAlign: 'center',
              borderTopLeftRadius: '16px',
              borderTopRightRadius: '16px'
            }}>
              <div style={{ fontSize: '60px' }}>🎓</div>
              <h4 className="text-white mt-2 mb-0">Premium Course</h4>
              <p className="text-white-50 small mb-0">by {instructorName}</p>
            </div>
            
            <Card.Body className="p-4">
              {/* Price */}
              <div className="text-center mb-4">
                <h2 className="text-primary mb-0" style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
                  {course.price === 0 ? 'Free' : `$${course.price}`}
                </h2>
                {course.price !== 0 && <small className="text-muted">One-time payment • Lifetime access</small>}
              </div>
              
              {/* Course Stats */}
              <div className="mb-4">
                <div className="d-flex justify-content-between mb-2 pb-2 border-bottom">
                  <span className="text-muted">👥 Total Students</span>
                  <span className="fw-semibold">{course.enrolledStudents?.length || 0}</span>
                </div>
                <div className="d-flex justify-content-between mb-2 pb-2 border-bottom">
                  <span className="text-muted">📚 Total Lessons</span>
                  <span className="fw-semibold">{course.lessons?.length || 0}</span>
                </div>
                <div className="d-flex justify-content-between mb-2 pb-2 border-bottom">
                  <span className="text-muted">👨‍🏫 Instructor</span>
                  <span className="fw-semibold">{instructorName}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-muted">⭐ Course Rating</span>
                  <span className="fw-semibold text-warning">★★★★★ 4.9</span>
                </div>
              </div>
              
              <hr />
              
              {/* Enrollment Button */}
              {user?.role === 'instructor' && course.instructor?._id === user?.id && (
                <Alert variant="info" className="text-center mb-0">
                  You are the instructor of this course
                </Alert>
              )}
              
              {user?.role === 'student' && (
                <Button 
                  variant={isEnrolled ? "success" : "primary"} 
                  className="w-100 py-3 fw-bold rounded-3"
                  onClick={handleEnroll}
                  disabled={enrolling || isEnrolled}
                  style={{
                    background: isEnrolled ? '#28a745' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    border: 'none'
                  }}
                >
                  {enrolling ? 'Enrolling...' : isEnrolled ? '✓ Enrolled Successfully' : 'Enroll Now'}
                </Button>
              )}
              
              {!isAuthenticated && (
                <Button 
                  variant="primary" 
                  className="w-100 py-3 fw-bold rounded-3"
                  onClick={() => navigate('/login')}
                  style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', border: 'none' }}
                >
                  Login to Enroll
                </Button>
              )}
              
              {/* Guarantee */}
              <div className="text-center mt-4">
                <small className="text-muted">
                  🔒 30-day money-back guarantee<br />
                  ✅ Full lifetime access<br />
                  📱 Access on mobile and TV
                </small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CourseDetail;
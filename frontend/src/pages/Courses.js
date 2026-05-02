import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Spinner, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { FaUserGraduate, FaDollarSign } from 'react-icons/fa';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');

  useEffect(() => {
    fetchCourses();
  }, [category]);

  const fetchCourses = async () => {
    try {
      const url = category ? `/courses?category=${category}` : '/courses';
      const response = await api.get(url);
      setCourses(response.data.courses);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  // Category Images and Colors
  const getCategoryStyle = (category) => {
    switch(category) {
      case 'Programming':
        return {
          image: 'https://cdn-icons-png.flaticon.com/512/1005/1005141.png',
          bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          emoji: '💻',
          title: 'Code Your Future'
        };
      case 'Design':
        return {
          image: 'https://cdn-icons-png.flaticon.com/512/1159/1159638.png',
          bg: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          emoji: '🎨',
          title: 'Unleash Creativity'
        };
      case 'Data Science':
        return {
          image: 'https://cdn-icons-png.flaticon.com/512/2103/2103638.png',
          bg: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
          emoji: '📊',
          title: 'Data Driven Future'
        };
      case 'Marketing':
        return {
          image: 'https://cdn-icons-png.flaticon.com/512/3095/3095426.png',
          bg: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
          emoji: '📢',
          title: 'Grow Your Brand'
        };
      case 'Business':
        return {
          image: 'https://cdn-icons-png.flaticon.com/512/3063/3063298.png',
          bg: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
          emoji: '📈',
          title: 'Lead with Confidence'
        };
      default:
        return {
          image: 'https://cdn-icons-png.flaticon.com/512/2838/2838912.png',
          bg: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
          emoji: '📚',
          title: 'Start Learning'
        };
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
        <Spinner animation="border" variant="primary" size="lg" />
      </div>
    );
  }

  return (
    <Container className="my-5">
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold" style={{ color: '#2c3e50' }}>
          <span style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Explore Our Courses
          </span>
        </h1>
        <p className="lead text-muted">Discover the best courses from expert instructors</p>
      </div>
      
      {/* Filter Section */}
      <Row className="mb-4">
        <Col md={5} lg={4} className="mx-auto">
          <Form.Group>
            <div className="d-flex gap-2 flex-wrap justify-content-center">
              <Button 
                variant={category === '' ? 'primary' : 'outline-secondary'}
                onClick={() => setCategory('')}
                style={{ borderRadius: '30px', padding: '8px 20px' }}
              >
                All
              </Button>
              <Button 
                variant={category === 'Programming' ? 'primary' : 'outline-secondary'}
                onClick={() => setCategory('Programming')}
                style={{ borderRadius: '30px', padding: '8px 20px' }}
              >
                💻 Programming
              </Button>
              <Button 
                variant={category === 'Design' ? 'primary' : 'outline-secondary'}
                onClick={() => setCategory('Design')}
                style={{ borderRadius: '30px', padding: '8px 20px' }}
              >
                🎨 Design
              </Button>
              <Button 
                variant={category === 'Business' ? 'primary' : 'outline-secondary'}
                onClick={() => setCategory('Business')}
                style={{ borderRadius: '30px', padding: '8px 20px' }}
              >
                📊 Business
              </Button>
              <Button 
                variant={category === 'Marketing' ? 'primary' : 'outline-secondary'}
                onClick={() => setCategory('Marketing')}
                style={{ borderRadius: '30px', padding: '8px 20px' }}
              >
                📢 Marketing
              </Button>
              <Button 
                variant={category === 'Data Science' ? 'primary' : 'outline-secondary'}
                onClick={() => setCategory('Data Science')}
                style={{ borderRadius: '30px', padding: '8px 20px' }}
              >
                📈 Data Science
              </Button>
            </div>
          </Form.Group>
        </Col>
      </Row>

      {/* Courses Grid */}
      {courses.length === 0 ? (
        <div className="text-center py-5">
          <h3 className="text-muted">No courses found</h3>
          <p>Check back later for new courses</p>
        </div>
      ) : (
        <Row>
          {courses.map((course) => {
            const style = getCategoryStyle(course.category);
            return (
              <Col md={6} lg={4} key={course._id} className="mb-4 d-flex">
                <Card className="w-100 border-0 shadow-lg" style={{
                  borderRadius: '20px',
                  overflow: 'hidden',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  backgroundColor: '#fff'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                }}>
                  
                  {/* Beautiful Banner with Image */}
                  <div style={{
                    background: style.bg,
                    padding: '25px 20px',
                    textAlign: 'center',
                    position: 'relative'
                  }}>
                    <div className="d-flex justify-content-between align-items-center">
                      <img 
                        src={style.image} 
                        alt={course.category}
                        style={{ width: '60px', height: '60px', filter: 'drop-shadow(2px 4px 6px rgba(0,0,0,0.2))' }}
                      />
                      <Badge style={{ 
                        backgroundColor: 'rgba(255,255,255,0.3)', 
                        color: '#fff', 
                        padding: '6px 15px', 
                        borderRadius: '30px',
                        fontSize: '13px'
                      }}>
                        {style.emoji} {course.category}
                      </Badge>
                    </div>
                    <h5 style={{ 
                      color: '#fff', 
                      marginTop: '15px', 
                      marginBottom: '0',
                      fontSize: '18px',
                      fontWeight: '500',
                      textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
                    }}>
                      {style.title}
                    </h5>
                  </div>
                  
                  <Card.Body className="p-4" style={{ flex: 1 }}>
                    <Card.Title className="fw-bold mb-3" style={{ fontSize: '1.2rem', lineHeight: '1.3', color: '#2c3e50' }}>
                      {course.title}
                    </Card.Title>
                    <Card.Text className="text-muted" style={{ fontSize: '13px', lineHeight: '1.5', minHeight: '65px' }}>
                      {course.description.substring(0, 90)}...
                    </Card.Text>
                    
                    <div className="mb-3 d-flex justify-content-between align-items-center">
                      <span style={{ fontSize: '13px', color: '#6c757d' }}>
                        <FaUserGraduate className="me-1" /> {course.enrolledStudents?.length || 0} students
                      </span>
                      <span className="fw-bold" style={{ fontSize: '18px', color: '#007bff' }}>
                        {course.price === 0 ? 'Free' : `$${course.price}`}
                      </span>
                    </div>
                    
                    {/* Instructor with icon */}
                    <div className="d-flex align-items-center gap-2 mb-3 pt-2 border-top" style={{ borderTopColor: '#eee' }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        backgroundColor: '#e9ecef',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '16px'
                      }}>
                        👨‍🏫
                      </div>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: '500', color: '#2c3e50' }}>
                          {course.instructor?.name || 'Unknown'}
                        </div>
                        <div style={{ fontSize: '11px', color: '#6c757d' }}>Course Instructor</div>
                      </div>
                    </div>
                  </Card.Body>
                  
                  <Card.Footer className="bg-transparent border-0 pb-4 pt-0">
                    <Button 
                      as={Link} 
                      to={`/courses/${course._id}`} 
                      variant="primary" 
                      className="w-100 rounded-pill py-2"
                      style={{ 
                        fontWeight: '600', 
                        fontSize: '14px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        border: 'none'
                      }}
                    >
                      Enroll Now →
                    </Button>
                  </Card.Footer>
                </Card>
              </Col>
            );
          })}
        </Row>
      )}
    </Container>
  );
};

export default Courses;
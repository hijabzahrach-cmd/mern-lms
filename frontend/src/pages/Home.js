import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaChalkboardTeacher, FaLaptopCode, FaCertificate, FaArrowRight, FaGraduationCap, FaUsers, FaBookOpen, FaStar, FaQuoteLeft, FaBook, FaFeather } from 'react-icons/fa';

const Home = () => {
  // Typewriter effect without cursor
  const words = ['Learn Without Limits', 'Dream Without Fear', 'Grow Without Stop', 'Succeed Beyond Bounds'];
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      if (charIndex > 0) {
        const timer = setTimeout(() => {
          setText(currentWord.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        }, 40);
        return () => clearTimeout(timer);
      } else {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }
    } else {
      if (charIndex < currentWord.length) {
        const timer = setTimeout(() => {
          setText(currentWord.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        }, 80);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => setIsDeleting(true), 2000);
        return () => clearTimeout(timer);
      }
    }
  }, [charIndex, isDeleting, wordIndex]);

  return (
    <>
      {/* Hero Section */}
      <div style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '60px 0',
        minHeight: '500px',
        display: 'flex',
        alignItems: 'center'
      }}>
        <Container>
          <Row className="align-items-center">
            <Col lg={7} className="text-white">
              {/* Kissa LMS Brand Name */}
              <div className="mb-3">
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'rgba(255,255,255,0.15)',
                  padding: '6px 20px',
                  borderRadius: '50px',
                }}>
                  <FaBook size={16} />
                  <span style={{ fontSize: '14px', fontWeight: '600', letterSpacing: '2px' }}>
                    KISSA LMS
                  </span>
                  <FaFeather size={14} />
                </div>
              </div>
              
              {/* Typewriter Heading - No cursor */}
              <h1 style={{
                fontSize: '3rem',
                fontWeight: 'bold',
                marginBottom: '15px',
                textShadow: '2px 2px 0px rgba(0,0,0,0.2)'
              }}>
                {text}
              </h1>
              
              <p style={{ fontSize: '1rem', opacity: 0.9, marginBottom: '20px' }}>
                Write your success story with us
              </p>
              
              {/* Quote */}
              <div style={{
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '16px',
                padding: '12px 20px',
                display: 'inline-block',
                marginBottom: '20px'
              }}>
                <FaQuoteLeft size={14} style={{ opacity: 0.6, marginRight: '8px' }} />
                <span style={{ fontSize: '0.9rem', fontStyle: 'italic' }}>
                  "No one can take away your learning"
                </span>
              </div>
              
              <div className="d-flex gap-3 flex-wrap">
                <Button as={Link} to="/courses" variant="light" size="md" className="px-4 py-2 rounded-pill fw-bold">
                  Start Learning <FaArrowRight className="ms-2" />
                </Button>
                <Button as={Link} to="/register" variant="outline-light" size="md" className="px-4 py-2 rounded-pill">
                  Join Free
                </Button>
              </div>
              
              {/* Quick Stats */}
              <div className="mt-4 d-flex gap-4 flex-wrap">
                <div>
                  <h4 className="text-white mb-0 fw-bold">10K+</h4>
                  <small style={{ fontSize: '11px', opacity: 0.7 }}>Students</small>
                </div>
                <div>
                  <h4 className="text-white mb-0 fw-bold">50+</h4>
                  <small style={{ fontSize: '11px', opacity: 0.7 }}>Instructors</small>
                </div>
                <div>
                  <h4 className="text-white mb-0 fw-bold">100+</h4>
                  <small style={{ fontSize: '11px', opacity: 0.7 }}>Courses</small>
                </div>
              </div>
            </Col>
            
            <Col lg={5} className="text-center mt-4 mt-lg-0">
              {/* 3D Effect Box */}
              <div style={{
                background: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(15px)',
                borderRadius: '24px',
                padding: '30px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.2), 0 10px 20px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.2)',
                transform: 'translateY(-5px)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 30px 50px rgba(0,0,0,0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
              }}>
                <FaGraduationCap size={60} className="text-white mb-3" style={{
                  filter: 'drop-shadow(2px 4px 6px rgba(0,0,0,0.2))'
                }} />
                <h4 className="text-white mb-1" style={{
                  textShadow: '1px 1px 0px rgba(0,0,0,0.2)'
                }}>Begin Your Story</h4>
                <p className="text-white-50 small">Join 10,000+ learners</p>
                <div className="d-flex justify-content-center gap-1 mt-2">
                  <FaStar className="text-warning" size={16} />
                  <FaStar className="text-warning" size={16} />
                  <FaStar className="text-warning" size={16} />
                  <FaStar className="text-warning" size={16} />
                  <FaStar className="text-warning" size={16} />
                </div>
                <small className="text-white-50 mt-2 d-block">4.9 ★ from 5000+ reviews</small>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      
      {/* Features Section */}
      <Container className="my-5">
        <div className="text-center mb-4">
          <h2 style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>Why Choose Kissa LMS?</h2>
          <p className="text-muted">Your journey to success starts here</p>
        </div>
        <Row className="g-3">
          <Col md={4}>
            <Card className="h-100 text-center border-0 shadow-sm">
              <Card.Body className="p-4">
                <div className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  margin: '0 auto'
                }}>
                  <FaChalkboardTeacher size={28} className="text-white" />
                </div>
                <h5 className="mb-2">Expert Mentors</h5>
                <p className="text-muted small">Learn from industry leaders</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 text-center border-0 shadow-sm">
              <Card.Body className="p-4">
                <div className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
                  margin: '0 auto'
                }}>
                  <FaLaptopCode size={28} className="text-white" />
                </div>
                <h5 className="mb-2">Hands-on Learning</h5>
                <p className="text-muted small">Real projects & practice</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 text-center border-0 shadow-sm">
              <Card.Body className="p-4">
                <div className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                  margin: '0 auto'
                }}>
                  <FaCertificate size={28} className="text-white" />
                </div>
                <h5 className="mb-2">Get Certified</h5>
                <p className="text-muted small">Earn recognized certificates</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      
      {/* Stats Section */}
      <div className="py-4" style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <Container>
          <Row className="text-center">
            <Col md={3} sm={6} className="mb-3">
              <div className="text-white">
                <FaUsers size={32} className="mb-2 opacity-75" />
                <h3 className="fw-bold mb-0">10K+</h3>
                <p className="small mb-0 opacity-75">Students</p>
              </div>
            </Col>
            <Col md={3} sm={6} className="mb-3">
              <div className="text-white">
                <FaChalkboardTeacher size={32} className="mb-2 opacity-75" />
                <h3 className="fw-bold mb-0">50+</h3>
                <p className="small mb-0 opacity-75">Instructors</p>
              </div>
            </Col>
            <Col md={3} sm={6} className="mb-3">
              <div className="text-white">
                <FaBookOpen size={32} className="mb-2 opacity-75" />
                <h3 className="fw-bold mb-0">100+</h3>
                <p className="small mb-0 opacity-75">Courses</p>
              </div>
            </Col>
            <Col md={3} sm="auto" className="mb-3">
              <div className="text-white">
                <FaStar size={32} className="mb-2 opacity-75" />
                <h3 className="fw-bold mb-0">98%</h3>
                <p className="small mb-0 opacity-75">Satisfaction</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Home;
import React from 'react';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import { FaGlobe, FaUsers, FaBullhorn, FaHeart, FaLinkedin, FaTwitter, FaEnvelope, FaQuoteLeft } from 'react-icons/fa';

const About = () => {
  return (
    <Container className="my-5">
      {/* Hero Section */}
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold mb-3" style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          About Our LMS Platform
        </h1>
        <p className="lead text-muted mx-auto" style={{ maxWidth: '700px' }}>
          We are dedicated to providing high-quality online education to learners worldwide,
          empowering them to achieve their goals and transform their lives.
        </p>
      </div>
      
      {/* Founder Section - New Addition */}
      <Row className="mb-5 justify-content-center">
        <Col lg={10}>
          <Card className="border-0 shadow-lg overflow-hidden" style={{ borderRadius: '20px' }}>
            <Row className="g-0">
              <Col md={5} className="bg-gradient-primary" style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '40px'
              }}>
                <div className="text-center text-white">
                  {/* Founder Avatar */}
                  <div style={{
                    width: '180px',
                    height: '180px',
                    background: 'rgba(255,255,255,0.2)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px',
                    border: '4px solid rgba(255,255,255,0.3)'
                  }}>
                    <div style={{ fontSize: '80px' }}>👩‍💼</div>
                  </div>
                  <h2 className="mb-2">Hijab Mazhar</h2>
                  <p className="mb-3 opacity-75">Founder & CEO</p>
                  <div className="d-flex justify-content-center gap-3">
                    <a href="#" style={{ color: 'white', opacity: 0.8 }}><FaLinkedin size={22} /></a>
                    <a href="#" style={{ color: 'white', opacity: 0.8 }}><FaTwitter size={22} /></a>
                    <a href="#" style={{ color: 'white', opacity: 0.8 }}><FaEnvelope size={22} /></a>
                  </div>
                </div>
              </Col>
              <Col md={7}>
                <Card.Body className="p-4 p-lg-5">
                  <FaQuoteLeft size={40} className="text-primary mb-3" style={{ opacity: 0.3 }} />
                  <h3 className="mb-3">Meet Our Founder</h3>
                  <p className="text-muted mb-3" style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
                    Hijab Mazhar is a passionate educator and tech entrepreneur with over 8 years of experience 
                    in online education. She founded this platform with a vision to make quality learning 
                    accessible to everyone, regardless of their location or background.
                  </p>
                  <p className="text-muted mb-4">
                    Under her leadership, our platform has grown to serve thousands of students worldwide, 
                    partnering with top industry experts to deliver cutting-edge courses.
                  </p>
                  <div className="d-flex gap-4">
                    <div>
                      <h4 className="text-primary mb-0">8+</h4>
                      <small className="text-muted">Years Experience</small>
                    </div>
                    <div>
                      <h4 className="text-primary mb-0">10K+</h4>
                      <small className="text-muted">Students Impacted</small>
                    </div>
                    <div>
                      <h4 className="text-primary mb-0">50+</h4>
                      <small className="text-muted">Expert Instructors</small>
                    </div>
                  </div>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      
      {/* Values Section */}
      <h2 className="text-center mb-4" style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
      }}>Our Core Values</h2>
      <p className="text-center text-muted mb-5">What makes us different</p>
      
      <Row className="mb-5 g-4">
        <Col md={6} lg={3}>
          <Card className="h-100 text-center border-0 shadow-sm hover-card" style={{
            borderRadius: '16px',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            cursor: 'pointer'
          }}>
            <Card.Body className="p-4">
              <div className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{
                width: '70px',
                height: '70px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                margin: '0 auto'
              }}>
                <FaGlobe size={30} className="text-white" />
              </div>
              <h4 className="mb-3">Global Access</h4>
              <p className="text-muted">Learn from anywhere in the world</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={3}>
          <Card className="h-100 text-center border-0 shadow-sm hover-card" style={{
            borderRadius: '16px',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            cursor: 'pointer'
          }}>
            <Card.Body className="p-4">
              <div className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{
                width: '70px',
                height: '70px',
                background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
                margin: '0 auto'
              }}>
                <FaUsers size={30} className="text-white" />
              </div>
              <h4 className="mb-3">Community</h4>
              <p className="text-muted">Join a thriving learning community</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={3}>
          <Card className="h-100 text-center border-0 shadow-sm hover-card" style={{
            borderRadius: '16px',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            cursor: 'pointer'
          }}>
            <Card.Body className="p-4">
              <div className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{
                width: '70px',
                height: '70px',
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                margin: '0 auto'
              }}>
                <FaBullhorn size={30} className="text-white" />
              </div>
              <h4 className="mb-3">Expert Support</h4>
              <p className="text-muted">24/7 expert assistance</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={3}>
          <Card className="h-100 text-center border-0 shadow-sm hover-card" style={{
            borderRadius: '16px',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            cursor: 'pointer'
          }}>
            <Card.Body className="p-4">
              <div className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{
                width: '70px',
                height: '70px',
                background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                margin: '0 auto'
              }}>
                <FaHeart size={30} className="text-white" />
              </div>
              <h4 className="mb-3">Passion for Learning</h4>
              <p className="text-muted">Making learning enjoyable</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      {/* Mission & Vision Section */}
      <Row className="mt-5 mb-5">
        <Col lg={6} className="mb-4">
          <Card className="border-0 shadow-sm h-100" style={{ borderRadius: '16px' }}>
            <Card.Body className="p-4">
              <div className="text-center mb-3">
                <span style={{ fontSize: '48px' }}>📖</span>
              </div>
              <h3 className="text-center mb-3">Our Mission</h3>
              <p className="text-muted text-center">
                To empower individuals through accessible, affordable, and high-quality 
                online education that transforms careers and lives.
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={6} className="mb-4">
          <Card className="border-0 shadow-sm h-100" style={{ borderRadius: '16px' }}>
            <Card.Body className="p-4">
              <div className="text-center mb-3">
                <span style={{ fontSize: '48px' }}>👁️</span>
              </div>
              <h3 className="text-center mb-3">Our Vision</h3>
              <p className="text-muted text-center">
                To become the leading global platform for online learning, connecting 
                passionate learners with expert instructors from around the world.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      {/* What We Offer Section */}
      <div className="rounded-4 p-5 mt-3" style={{
        background: 'linear-gradient(135deg, rgba(102,126,234,0.1) 0%, rgba(118,75,162,0.1) 100%)',
        borderRadius: '20px'
      }}>
        <h2 className="text-center mb-4" style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>What We Offer</h2>
        <Row>
          <Col md={6}>
            <ul className="list-unstyled">
              <li className="mb-3">✓ Diverse course catalog across multiple disciplines</li>
              <li className="mb-3">✓ Learn at your own pace with lifetime access</li>
              <li className="mb-3">✓ Expert instructors with real-world experience</li>
            </ul>
          </Col>
          <Col md={6}>
            <ul className="list-unstyled">
              <li className="mb-3">✓ Interactive learning with projects and quizzes</li>
              <li className="mb-3">✓ Recognized certificates of completion</li>
              <li className="mb-3">✓ Community support and networking opportunities</li>
            </ul>
          </Col>
        </Row>
      </div>

      {/* CSS for hover effects */}
      <style>{`
        .hover-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 35px rgba(0,0,0,0.15) !important;
        }
      `}</style>
    </Container>
  );
};

export default About;
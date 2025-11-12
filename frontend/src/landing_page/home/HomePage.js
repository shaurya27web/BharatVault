import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {useClerk, UserButton, useUser} from "@clerk/clerk-react";
import ChatBot from "../../chatbot/chatbot";

function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const { user } = useUser();
  const { openSignIn } = useClerk();
  
  // Color Scheme
  const colors = {
    primary: "#2563eb",
    primaryDark: "#1d4ed8",
    secondary: "#f59e0b",
    accent: "#10b981",
    dark: "#1e293b",
    light: "#f8fafc",
    gray: "#64748b",
    white: "#ffffff"
  };

  // Handle dashboard redirect
  const handleDashboardClick = () => {
    if (user) {
      // Store user data for dashboard to use
      const userData = {
        clerkId: user.id,
        email: user.primaryEmailAddress?.emailAddress,
        firstName: user.firstName,
        lastName: user.lastName
      };
      localStorage.setItem('clerkUser', JSON.stringify(userData));
      
      // Redirect to the actual dashboard application
      window.location.href = 'http://localhost:3001';
    }
  };

  // Initialize AOS animations
  useEffect(() => {
    AOS.init({ 
      duration: 1000, 
      once: true,
      offset: 100
    });
  }, []);

  // Navbar scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Testimonial rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Software Engineer",
      content: "BharatVault made investing so simple! The educational content helped me start my journey confidently.",
      avatar: "👩‍💼"
    },
    {
      name: "Rahul Mehta",
      role: "Small Business Owner",
      content: "Zero commission and transparent pricing - exactly what Indian investors need. Highly recommended!",
      avatar: "👨‍💼"
    },
    {
      name: "Anita Reddy",
      role: "College Student",
      content: "The mobile app is fantastic! I can manage my investments while attending classes.",
      avatar: "👩‍🎓"
    }
  ];

  return (
    <div style={{ 
      background: colors.light, 
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      overflowX: "hidden"
    }}>
      
      {/* ===== NAVBAR ===== */}
      <nav className={`navbar navbar-expand-lg fixed-top py-3 ${isScrolled ? 'navbar-scrolled' : ''}`} 
           style={{
             transition: "all 0.3s ease",
             background: isScrolled ? colors.white : "transparent",
             backdropFilter: isScrolled ? "blur(15px)" : "none",
             boxShadow: isScrolled ? "0 4px 30px rgba(0,0,0,0.1)" : "none",
             borderBottom: isScrolled ? `1px solid ${colors.light}` : "none",
             padding: "1rem 0"
           }}>
        <div className="container">
          <a className="navbar-brand fw-bold fs-3 d-flex align-items-center" href="#" style={{ color: colors.primary }}>
            <div className="rounded-circle d-flex align-items-center justify-content-center me-2" 
                 style={{ 
                   width: "42px", 
                   height: "42px", 
                   background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)` 
                 }}>
              <span className="text-white fw-bold" style={{ fontSize: "1.1rem" }}>BV</span>
            </div>
            BharatVault
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item mx-2">
                <a className="nav-link fw-medium" href="#features" style={{ color: colors.dark }}>Features</a>
              </li>
              <li className="nav-item mx-2">
                <a className="nav-link fw-medium" href="#products" style={{ color: colors.dark }}>Products</a>
              </li>
              <li className="nav-item mx-2">
                <a className="nav-link fw-medium" href="#pricing" style={{ color: colors.dark }}>Pricing</a>
              </li>
              <li className="nav-item mx-2">
                <a className="nav-link fw-medium" href="#education" style={{ color: colors.dark }}>Education</a>
              </li>
              <li className="nav-item mx-2">
                <a className="nav-link fw-medium" href="#testimonials" style={{ color: colors.dark }}>Reviews</a>
              </li>
            </ul>
            <div className="d-flex gap-3 align-items-center">
              {!user ? (
                <button onClick={openSignIn} className="btn btn-outline-primary px-4 fw-semibold" style={{ 
                  borderColor: colors.primary, 
                  color: colors.primary,
                  borderRadius: "8px",
                  borderWidth: "2px"
                }}>Login</button>
              ) : (
                <div className="d-flex align-items-center gap-3">
                  {/* Dashboard Button for logged-in users */}
                  <button 
                    onClick={handleDashboardClick}
                    className="btn px-3 fw-semibold" 
                    style={{ 
                      background: `linear-gradient(135deg, ${colors.accent} 0%, #0ca678 100%)`, 
                      border: "none",
                      color: colors.white,
                      borderRadius: "8px",
                      fontSize: '0.9rem'
                    }}
                  >
                    🚀 Dashboard
                  </button>
                  <UserButton />
                </div>
              )}
              
              <button className="btn px-4 fw-semibold" style={{ 
                background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`, 
                border: "none",
                color: colors.white,
                borderRadius: "8px"
              }}>Sign Up</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Add spacer to prevent navbar overlap */}
      <div style={{ height: "80px" }}></div>

      {/* ===== HERO SECTION ===== */}
      <section style={{ 
        background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
        color: colors.white,
        position: "relative",
        overflow: "hidden"
      }}>
        <div className="container py-5">
          <div className="row align-items-center min-vh-100 py-5">
            <div className="col-lg-6" data-aos="fade-right">
              <div className="badge bg-white bg-opacity-20 text-white px-3 py-2 rounded-pill mb-3">
                India's Fastest Growing Investment Platform
              </div>
              <h1 className="display-4 fw-bold mb-4">
                Smart Investing <span style={{ color: colors.secondary }}>Made Simple</span>
              </h1>
              <p className="lead mb-4 opacity-90 fs-5">
                Trade stocks, derivatives, mutual funds, and more with India's most trusted platform. 
                Start your financial journey with complete transparency and security.
              </p>
              <div className="d-flex flex-wrap gap-3 mb-4">
                <button className="btn btn-light btn-lg px-4 py-3 fw-semibold shadow-sm d-flex align-items-center gap-2"
                        style={{ borderRadius: "10px", color: colors.primary }}>
                  <i className="fas fa-rocket"></i>
                  Get Started Free
                </button>
                <button className="btn btn-outline-light btn-lg px-4 py-3 fw-semibold d-flex align-items-center gap-2"
                        style={{ borderRadius: "10px" }}>
                  <i className="fas fa-play-circle"></i>
                  Watch Demo
                </button>
              </div>
              <div className="d-flex gap-4 text-center">
                <div>
                  <h4 className="fw-bold mb-1">1.6Cr+</h4>
                  <small className="opacity-80">Happy Investors</small>
                </div>
                <div>
                  <h4 className="fw-bold mb-1">₹6L Cr+</h4>
                  <small className="opacity-80">Assets Managed</small>
                </div>
                <div>
                  <h4 className="fw-bold mb-1">4.8★</h4>
                  <small className="opacity-80">Play Store Rating</small>
                </div>
              </div>
            </div>
            <div className="col-lg-6 text-center" data-aos="fade-left" data-aos-delay="200">
              <div className="position-relative">
                <img
                  src="media/images/homeHero.png"
                  alt="Investment Dashboard"
                  className="img-fluid rounded-3 shadow-lg"
                  style={{ 
                    maxWidth: "100%",
                    transform: "perspective(1000px) rotateY(-5deg) rotateX(5deg)",
                    border: `2px solid rgba(255,255,255,0.1)`
                  }}
                />
                {/* Floating elements */}
                <div className="position-absolute top-0 start-0 bg-white rounded-3 p-3 shadow-lg" 
                     style={{ transform: "translate(-30%, -30%)", width: "120px" }}>
                  <div className="text-success fw-bold" style={{ color: colors.accent }}>+12.5%</div>
                  <small className="text-muted">Today's Gain</small>
                </div>
                <div className="position-absolute bottom-0 end-0 bg-white rounded-3 p-3 shadow-lg" 
                     style={{ transform: "translate(30%, 30%)", width: "120px" }}>
                  <div className="fw-bold" style={{ color: colors.primary }}>₹2.5L</div>
                  <small className="text-muted">Portfolio Value</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="wave-divider">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="currentColor"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="currentColor"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="currentColor"></path>
          </svg>
        </div>
      </section>

      {/* ===== ALL OTHER SECTIONS REMAIN EXACTLY THE SAME ===== */}
      {/* Products, Features, Testimonials, Mobile App, Pricing, Education sections */}
      {/* ... your existing code for these sections ... */}

      {/* ===== CTA SECTION ===== */}
      <section className="py-5" style={{ 
        background: `linear-gradient(135deg, ${colors.dark} 0%, #334155 100%)`,
        color: colors.white
      }}>
        <div className="container py-5">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8" data-aos="zoom-in">
              <h2 className="display-5 fw-bold mb-4">Ready to Start Your Investment Journey?</h2>
              <p className="lead mb-5 opacity-90">
                Join millions of investors who trust BharatVault for their financial growth. 
                Start with zero commission and experience the future of investing.
              </p>
              <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
                {user ? (
                  // Dashboard button that opens the actual dashboard app
                  <button 
                    onClick={handleDashboardClick}
                    className="btn btn-light btn-lg px-5 py-3 fw-semibold d-flex align-items-center justify-content-center gap-2"
                    style={{ borderRadius: "10px", color: colors.primary }}
                  >
                    <i className="fas fa-rocket"></i>
                    Go to Dashboard
                  </button>
                ) : (
                  // Show signup button if not logged in
                  <button className="btn btn-light btn-lg px-5 py-3 fw-semibold d-flex align-items-center justify-content-center gap-2"
                          style={{ borderRadius: "10px", color: colors.primary }}>
                    <i className="fas fa-user-plus"></i>
                    Create Free Account
                  </button>
                )}
                <button className="btn btn-outline-light btn-lg px-5 py-3 fw-semibold d-flex align-items-center justify-content-center gap-2"
                        style={{ borderRadius: "10px" }}>
                  <i className="fas fa-mobile-alt"></i>
                  Download App
                </button>
              </div>
              <div className="mt-4">
                <small className="opacity-75">No hidden charges • 2-minute signup • 24/7 Support</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer style={{ background: colors.dark, color: colors.white }}>
        <div className="container pt-5 pb-4">
          {/* Your existing footer code */}
          <div className="row align-items-center">
            <div className="col-md-6 mb-3 mb-md-0">
              <p className="mb-0 opacity-75">
                © {new Date().getFullYear()} <strong>BharatVault Technologies Pvt. Ltd.</strong> All rights reserved.
              </p>
            </div>
            <div className="col-md-6 text-md-end">
              <div className="d-flex flex-wrap justify-content-md-end gap-3 opacity-75">
                <small>SEBI Registered: INZ000200331</small>
                <small>CDSL: IN-DP-CDSL-490-2008</small>
                <small>Made with ❤️ for Indian Investors</small>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Custom Styles */}
      <style jsx>{`
        .feature-card, .product-card, .testimonial-card, .education-item {
          transition: all 0.3s ease;
        }
        .feature-card:hover, .product-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
        .popular-card {
          transform: scale(1.02);
        }
        .hover-lift {
          transition: all 0.3s ease;
        }
        .hover-lift:hover {
          transform: translateY(-2px);
          opacity: 1 !important;
        }
        .wave-divider {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          overflow: hidden;
          line-height: 0;
          transform: rotate(180deg);
          color: #f8fafc;
        }
        .wave-divider svg {
          position: relative;
          display: block;
          width: calc(100% + 1.3px);
          height: 80px;
        }
        .navbar-nav .nav-link {
          position: relative;
          transition: all 0.3s ease;
        }
        .navbar-nav .nav-link:hover {
          color: ${colors.primary} !important;
        }
        .navbar-nav .nav-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: 0;
          left: 50%;
          background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%);
          transition: all 0.3s ease;
        }
        .navbar-nav .nav-link:hover::after {
          width: 100%;
          left: 0;
        }
      `}</style>
      
    </div>
  );
}

export default HomePage;
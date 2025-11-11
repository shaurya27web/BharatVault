import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {useClerk, UserButton, useUser} from "@clerk/clerk-react";
import ChatBot from "../../chatbot/chatbot";
function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const{user}=useUser();
  const {openSignIn}=useClerk();
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
            <div className="d-flex gap-3">
              {
                !user ?(<button onClick={openSignIn} className="btn btn-outline-primary px-4 fw-semibold" style={{ 
                borderColor: colors.primary, 
                color: colors.primary,
                borderRadius: "8px",
                borderWidth: "2px"
              }}>Login</button>):(
                <UserButton></UserButton>
              )
              }
              


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

      {/* ===== PRODUCTS SECTION ===== */}
      <section id="products" className="py-5" style={{ background: colors.white }}>
        <div className="container py-5">
          <div className="text-center mb-5" data-aos="fade-up">
            <h2 className="fw-bold mb-3" style={{ color: colors.dark }}>Diverse Investment Products</h2>
            <p className="lead" style={{ color: colors.gray }}>Everything you need to build a strong investment portfolio</p>
          </div>
          <div className="row g-4">
            {[
              { 
                icon: "chart-line",
                title: "Stocks & ETFs", 
                desc: "Invest in Indian and US stocks with zero commission",
                features: ["Zero Brokerage", "Real-time Data", "SIP in Stocks"]
              },
              { 
                icon: "chart-bar",
                title: "Mutual Funds", 
                desc: "Direct mutual funds with no hidden charges",
                features: ["Direct Plans", "Zero Commission", "Auto Investment"]
              },
              { 
                icon: "bolt",
                title: "Futures & Options", 
                desc: "Advanced derivatives trading with powerful tools",
                features: ["Advanced Charts", "Risk Management", "Strategy Builder"]
              },
              { 
                icon: "building",
                title: "IPOs", 
                desc: "Apply for IPOs with seamless UPI integration",
                features: ["Easy Application", "Status Tracking", "Allotment Updates"]
              },
              { 
                icon: "file-invoice-dollar",
                title: "Bonds & NCDs", 
                desc: "Fixed income instruments for stable returns",
                features: ["Government Bonds", "Corporate NCDs", "Tax-free Bonds"]
              },
              { 
                icon: "globe-americas",
                title: "Global Investing", 
                desc: "Diversify globally with international stocks",
                features: ["US Stocks", "ETFs", "Fractional Shares"]
              }
            ].map((product, index) => (
              <div key={index} className="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay={index * 100}>
                <div className="product-card p-4 rounded-4 h-100 border-0 shadow-sm">
                  <div className="product-icon mb-3">
                    <i className={`fas fa-${product.icon} text-primary`} style={{ fontSize: "2.5rem", color: colors.primary }}></i>
                  </div>
                  <h5 className="fw-bold mb-3" style={{ color: colors.dark }}>{product.title}</h5>
                  <p className="mb-3" style={{ color: colors.gray }}>{product.desc}</p>
                  <ul className="list-unstyled">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="mb-2 d-flex align-items-center">
                        <i className="fas fa-check me-2 small" style={{ color: colors.accent }}></i>
                        <small style={{ color: colors.gray }}>{feature}</small>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES GRID ===== */}
      <section id="features" className="py-5" style={{ background: `linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)` }}>
        <div className="container py-5">
          <div className="text-center mb-5" data-aos="fade-up">
            <h2 className="fw-bold mb-3" style={{ color: colors.primary }}>Why Choose BharatVault?</h2>
            <p className="lead" style={{ color: colors.gray }}>Experience the future of investing with our powerful features</p>
          </div>
          <div className="row g-4">
            {[
              { 
                icon: "shield-alt",
                title: "Bank-Grade Security", 
                desc: "Your investments are protected with advanced encryption and 2FA"
              },
              { 
                icon: "money-bill-wave",
                title: "Zero Commission", 
                desc: "Free equity delivery and direct mutual funds forever"
              },
              { 
                icon: "bolt",
                title: "Lightning Fast", 
                desc: "Execute trades in milliseconds with our advanced platform"
              },
              { 
                icon: "chart-line",
                title: "Smart Analytics", 
                desc: "AI-powered insights and real-time market intelligence"
              },
              { 
                icon: "robot",
                title: "AI Assistant", 
                desc: "Get personalized investment recommendations 24/7"
              },
              { 
                icon: "user-shield",
                title: "Portfolio Insurance", 
                desc: "Optional insurance coverage for your investments"
              }
            ].map((feature, index) => (
              <div key={index} className="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay={index * 100}>
                <div className="feature-card p-4 rounded-4 h-100 text-center bg-white shadow-sm border-0">
                  <div className="feature-icon mb-3" style={{ 
                    background: `linear-gradient(135deg, ${colors.primary}15 0%, ${colors.primary}05 100%)`,
                    width: "80px",
                    height: "80px",
                    borderRadius: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto"
                  }}>
                    <i className={`fas fa-${feature.icon}`} style={{ fontSize: "2rem", color: colors.primary }}></i>
                  </div>
                  <h5 className="fw-bold mb-3" style={{ color: colors.dark }}>{feature.title}</h5>
                  <p style={{ color: colors.gray }}>{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS SECTION ===== */}
      <section id="testimonials" className="py-5" style={{ background: colors.white }}>
        <div className="container py-5">
          <div className="text-center mb-5" data-aos="fade-up">
            <h2 className="fw-bold mb-3" style={{ color: colors.dark }}>What Our Investors Say</h2>
            <p className="lead" style={{ color: colors.gray }}>Join millions of satisfied investors across India</p>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-8" data-aos="zoom-in">
              <div className="testimonial-card p-5 rounded-4 text-center position-relative border-0 shadow-sm">
                <div className="testimonial-avatar mb-4">
                  <div style={{ 
                    width: "80px", 
                    height: "80px", 
                    borderRadius: "50%", 
                    background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto",
                    color: colors.white,
                    fontSize: "1.5rem"
                  }}>
                    {testimonials[activeTestimonial].avatar}
                  </div>
                </div>
                <p className="lead mb-4 fs-5" style={{ color: colors.gray, fontStyle: "italic" }}>
                  "{testimonials[activeTestimonial].content}"
                </p>
                <h6 className="fw-bold mb-1" style={{ color: colors.dark }}>{testimonials[activeTestimonial].name}</h6>
                <small style={{ color: colors.gray }}>{testimonials[activeTestimonial].role}</small>
                
                {/* Testimonial indicators */}
                <div className="d-flex justify-content-center gap-2 mt-4">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      className={`btn p-1 rounded-circle ${index === activeTestimonial ? 'bg-primary' : 'bg-light'}`}
                      style={{ 
                        width: "12px", 
                        height: "12px",
                        border: "none",
                        backgroundColor: index === activeTestimonial ? colors.primary : colors.light
                      }}
                      onClick={() => setActiveTestimonial(index)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== MOBILE APP SECTION ===== */}
      <section className="py-5" style={{ background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`, color: colors.white }}>
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-6 text-center mb-5 mb-lg-0" data-aos="fade-right">
              <img
                src="media/images/mobile-app.png"
                alt="Mobile App"
                className="img-fluid rounded-4 shadow-lg"
                style={{ maxWidth: "300px" }}
              />
            </div>
            <div className="col-lg-6" data-aos="fade-left">
              <h2 className="fw-bold mb-4 display-6">Trade On The Go</h2>
              <p className="lead mb-4 opacity-90">
                Download our award-winning mobile app and manage your investments from anywhere, anytime.
              </p>
              
              <div className="row mb-4">
                <div className="col-6">
                  <ul className="list-unstyled">
                    <li className="mb-3 d-flex align-items-center">
                      <i className="fas fa-bolt me-3" style={{ color: colors.secondary }}></i>
                      <span>Instant Orders</span>
                    </li>
                    <li className="mb-3 d-flex align-items-center">
                      <i className="fas fa-chart-line me-3" style={{ color: colors.accent }}></i>
                      <span>Live Charts</span>
                    </li>
                    <li className="mb-3 d-flex align-items-center">
                      <i className="fas fa-bell me-3" style={{ color: colors.primary }}></i>
                      <span>Smart Alerts</span>
                    </li>
                  </ul>
                </div>
                <div className="col-6">
                  <ul className="list-unstyled">
                    <li className="mb-3 d-flex align-items-center">
                      <i className="fas fa-shield-alt me-3" style={{ color: colors.accent }}></i>
                      <span>Biometric Login</span>
                    </li>
                    <li className="mb-3 d-flex align-items-center">
                      <i className="fas fa-comments me-3" style={{ color: colors.secondary }}></i>
                      <span>24/7 Support</span>
                    </li>
                    <li className="mb-3 d-flex align-items-center">
                      <i className="fas fa-sync me-3" style={{ color: colors.primary }}></i>
                      <span>Auto Sync</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="d-flex flex-wrap gap-3">
                <button className="btn btn-light btn-lg px-4 py-3 fw-semibold d-flex align-items-center gap-2"
                        style={{ borderRadius: "10px", color: colors.primary }}>
                  <i className="fab fa-google-play"></i>
                  <div className="text-start">
                    <small className="d-block">Get it on</small>
                    <strong>Google Play</strong>
                  </div>
                </button>
                <button className="btn btn-outline-light btn-lg px-4 py-3 fw-semibold d-flex align-items-center gap-2"
                        style={{ borderRadius: "10px" }}>
                  <i className="fab fa-apple"></i>
                  <div className="text-start">
                    <small className="d-block">Download on</small>
                    <strong>App Store</strong>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PRICING SECTION ===== */}
      <section id="pricing" className="py-5" style={{ background: colors.white }}>
        <div className="container py-5">
          <div className="text-center mb-5" data-aos="fade-up">
            <div className="badge bg-success bg-opacity-10 text-success px-3 py-2 rounded-pill mb-3">
              Transparent Pricing
            </div>
            <h2 className="fw-bold mb-3" style={{ color: colors.dark }}>Unbeatable Pricing</h2>
            <p className="lead" style={{ color: colors.gray }}>Simple, transparent, and designed for your success</p>
          </div>
          
          <div className="row justify-content-center g-4">
            {[
              { 
                title: "Starter Plan", 
                price: "₹0", 
                period: "Forever Free",
                features: ["Free Equity Delivery", "Direct Mutual Funds", "Basic Analytics", "Email Support"],
                popular: false,
                cta: "Get Started"
              },
              { 
                title: "Pro Trader", 
                price: "₹20", 
                period: "Per Trade",
                features: ["All Starter Features", "F&O Trading", "Advanced Charts", "Priority Support", "Risk Management"],
                popular: true,
                cta: "Go Pro"
              },
              { 
                title: "Institutional", 
                price: "Custom", 
                period: "Tailored Solution",
                features: ["All Pro Features", "API Access", "Dedicated Manager", "Custom Reports", "White Label"],
                popular: false,
                cta: "Contact Sales"
              }
            ].map((plan, index) => (
              <div key={index} className="col-md-4" data-aos="zoom-in" data-aos-delay={index * 100}>
                <div className={`card border-0 h-100 shadow-sm ${plan.popular ? 'popular-card border-primary' : ''}`}
                     style={{ 
                       transition: "all 0.3s ease", 
                       borderRadius: "15px",
                       border: plan.popular ? `2px solid ${colors.primary}` : "1px solid #e2e8f0"
                     }}>
                  {plan.popular && (
                    <div className="position-absolute top-0 start-50 translate-middle px-3 py-1 text-white rounded-pill small fw-semibold"
                         style={{ 
                           background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
                           whiteSpace: "nowrap"
                         }}>
                      Most Popular
                    </div>
                  )}
                  <div className="card-body p-4 d-flex flex-column" style={{ paddingTop: plan.popular ? "3rem" : "1.5rem" }}>
                    <h5 className="card-title fw-bold" style={{ color: colors.dark }}>{plan.title}</h5>
                    <div className="my-3">
                      <span className="h1 fw-bold" style={{ color: colors.primary }}>{plan.price}</span>
                      {plan.period && <small style={{ color: colors.gray }}>/{plan.period}</small>}
                    </div>
                    <ul className="list-unstyled mb-4 flex-grow-1">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="mb-2 d-flex align-items-center">
                          <i className="fas fa-check me-2" style={{ color: colors.accent }}></i>
                          <span style={{ color: colors.gray }}>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <button className={`btn ${plan.popular ? 'btn-primary' : 'btn-outline-primary'} w-100 py-2 fw-semibold`}
                            style={plan.popular ? { 
                              background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`, 
                              border: "none",
                              borderRadius: "8px"
                            } : { 
                              borderRadius: "8px",
                              borderColor: colors.primary,
                              color: colors.primary
                            }}>
                      {plan.cta}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== EDUCATION SECTION ===== */}
      <section id="education" className="py-5" style={{ background: `linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)` }}>
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-6 text-center mb-5 mb-lg-0" data-aos="fade-right">
              <img
                src="media/images/education.svg"
                alt="Financial Education"
                className="img-fluid rounded-4 shadow"
                style={{ maxWidth: "500px" }}
              />
            </div>
            <div className="col-lg-6" data-aos="fade-left">
              <h2 className="fw-bold mb-4 display-6" style={{ color: colors.primary }}>
                Learn & Grow with Free Education
              </h2>
              
              <div className="education-item mb-4 p-4 bg-white rounded-4 shadow-sm border-0">
                <div className="d-flex align-items-start">
                  <div className="flex-shrink-0 me-3">
                    <div className="rounded-3 p-3" style={{ background: `${colors.primary}15` }}>
                      <i className="fas fa-graduation-cap fs-4" style={{ color: colors.primary }}></i>
                    </div>
                  </div>
                  <div>
                    <h5 className="fw-bold mb-2" style={{ color: colors.dark }}>Varsity</h5>
                    <p className="mb-3" style={{ color: colors.gray }}>
                      The largest free stock market education platform, covering everything from basics to advanced trading strategies.
                    </p>
                    <a href="#" className="btn btn-outline-primary btn-sm" style={{ borderColor: colors.primary, color: colors.primary }}>
                      Explore Varsity <i className="fas fa-arrow-right ms-1"></i>
                    </a>
                  </div>
                </div>
              </div>

              <div className="education-item p-4 bg-white rounded-4 shadow-sm border-0">
                <div className="d-flex align-items-start">
                  <div className="flex-shrink-0 me-3">
                    <div className="rounded-3 p-3" style={{ background: `${colors.secondary}15` }}>
                      <i className="fas fa-users fs-4" style={{ color: colors.secondary }}></i>
                    </div>
                  </div>
                  <div>
                    <h5 className="fw-bold mb-2" style={{ color: colors.dark }}>TradingQ&A</h5>
                    <p className="mb-3" style={{ color: colors.gray }}>
                      India's most active trading and investing community. Learn from experts and share your knowledge.
                    </p>
                    <a href="#" className="btn btn-outline-primary btn-sm" style={{ borderColor: colors.primary, color: colors.primary }}>
                      Join Community <i className="fas fa-arrow-right ms-1"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
                <button className="btn btn-light btn-lg px-5 py-3 fw-semibold d-flex align-items-center justify-content-center gap-2"
                        style={{ borderRadius: "10px", color: colors.primary }}>
                  <i className="fas fa-user-plus"></i>
                  Create Free Account
                </button>
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

      {/* ===== ENHANCED FOOTER ===== */}
      <footer style={{ background: colors.dark, color: colors.white }}>
        <div className="container pt-5 pb-4">
          <div className="row g-4">
            <div className="col-lg-4 mb-4">
              <div className="d-flex align-items-center mb-3">
                <div className="rounded-circle d-flex align-items-center justify-content-center me-2" 
                     style={{ 
                       width: "42px", 
                       height: "42px", 
                       background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)` 
                     }}>
                  <span className="text-white fw-bold">BV</span>
                </div>
                <h5 className="fw-bold mb-0" style={{ color: colors.secondary }}>BharatVault</h5>
              </div>
              <p className="mb-4 opacity-75">
                Making investing simple, transparent, and accessible for every Indian.
              </p>
              <div className="d-flex gap-3">
                {['twitter', 'linkedin', 'facebook', 'instagram'].map((platform) => (
                  <a key={platform} href="#" className="opacity-75 hover-lift" 
                     style={{ color: colors.white, fontSize: "1.2rem" }}>
                    <i className={`fab fa-${platform}`}></i>
                  </a>
                ))}
              </div>
            </div>
            
            {[
              {
                title: "Products",
                links: ["Stocks", "Mutual Funds", "F&O", "IPO", "Bonds", "Global Investing"]
              },
              {
                title: "Company",
                links: ["About Us", "Pricing", "Careers", "Press", "Blog", "Partners"]
              },
              {
                title: "Support",
                links: ["Help Center", "Contact Us", "Downloads", "System Status", "API Docs", "Community"]
              },
              {
                title: "Legal",
                links: ["Privacy Policy", "Terms of Service", "Security", "Disclosures", "Compliance", "RBI Guidelines"]
              }
            ].map((column, colIndex) => (
              <div key={colIndex} className="col-lg-2 col-md-3 col-sm-6 mb-4">
                <h6 className="fw-semibold mb-3" style={{ color: colors.secondary }}>{column.title}</h6>
                <ul className="list-unstyled">
                  {column.links.map((link, linkIndex) => (
                    <li key={linkIndex} className="mb-2">
                      <a href="#" className="opacity-75 text-decoration-none hover-lift" 
                         style={{ color: colors.white, fontSize: "0.9rem" }}>
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <hr className="my-4 opacity-25" />
          
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
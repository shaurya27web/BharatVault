import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import ChatBot from "../../chatbot/chatbot";

function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [showChatBot, setShowChatBot] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showLearningPath, setShowLearningPath] = useState(false);
  const [activeLearningModule, setActiveLearningModule] = useState(0);
  const { user } = useUser();
  const { openSignIn } = useClerk();

  // Professional Blue-White Color Scheme
  const colors = {
    primary: "#2563eb",
    primaryLight: "#3b82f6",
    primaryDark: "#1d4ed8",
    secondary: "#0369a1",
    accent: "#0ea5e9",
    dark: "#0f172a",
    light: "#f8fafc",
    lighter: "#f1f5f9",
    gray: "#64748b",
    white: "#ffffff",
    gradient: "linear-gradient(135deg, #2563eb 0%, #1e40af 100%)",
    gradientLight: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
  };

  // Handle dashboard redirect
  const handleDashboardClick = () => {
    if (user) {
      const userData = {
        clerkId: user.id,
        email: user.primaryEmailAddress?.emailAddress,
        firstName: user.firstName,
        lastName: user.lastName,
      };
      localStorage.setItem("clerkUser", JSON.stringify(userData));
      window.location.href = "http://localhost:3001";
    }
  };

  // Initialize AOS animations
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
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

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const handleStartLearning = () => {
    setShowLearningPath(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // USPs Data
  const societalSolutions = [
    {
      problem: "Lack of financial literacy",
      solution: "AI-powered guidance + gamified micro-goals",
      outcome: "Learning through doing",
      icon: "graduation-cap",
      color: "#3b82f6"
    },
    {
      problem: "Low savings discipline",
      solution: "UPI Auto-Save + CashFlow adjustments",
      outcome: "Consistent, automatic saving",
      icon: "piggy-bank",
      color: "#06b6d4"
    },
    {
      problem: "Unequal access to investment tools",
      solution: "Stock lending & micro-investments",
      outcome: "Democratized wealth creation",
      icon: "scale-balanced",
      color: "#10b981"
    },
    {
      problem: "High youth debt & overspending",
      solution: "CashFlow Manager + spending prediction",
      outcome: "Debt prevention & control",
      icon: "chart-line",
      color: "#f59e0b"
    },
    {
      problem: "Financial anxiety & burnout",
      solution: "Gamified progress tracking",
      outcome: "Motivation & mental ease",
      icon: "gamepad",
      color: "#8b5cf6"
    },
    {
      problem: "Exclusion of rural/low-income earners",
      solution: "Simple UI + micro-savings rules",
      outcome: "Inclusive financial participation",
      icon: "users",
      color: "#ec4899"
    }
  ];

  // Learning Path Structure
  const learningPath = [
    {
      module: 1,
      title: "Financial Foundations",
      duration: "2 weeks",
      level: "Beginner",
      topics: [
        "Understanding Basic Financial Terms",
        "Budgeting Fundamentals",
        "Importance of Emergency Funds",
        "Introduction to Saving vs Investing"
      ],
      outcomes: [
        "Create your first budget",
        "Set up emergency fund goals",
        "Understand financial terminology",
        "Establish basic financial goals"
      ],
      resources: [
        "Interactive Budget Planner",
        "Financial Terms Dictionary",
        "Goal Setting Worksheet"
      ]
    },
    {
      module: 2,
      title: "Smart Saving Strategies",
      duration: "3 weeks",
      level: "Intermediate",
      topics: [
        "Automated Saving Systems",
        "Micro-Saving Techniques",
        "UPI Auto-Save Implementation",
        "CashFlow Optimization",
        "Behavioral Finance Principles"
      ],
      outcomes: [
        "Implement automatic savings",
        "Master micro-saving habits",
        "Optimize cash flow management",
        "Develop financial discipline"
      ],
      resources: [
        "Savings Automation Guide",
        "CashFlow Analysis Tool",
        "Behavioral Finance Workbook"
      ]
    },
    {
      module: 3,
      title: "Investment Fundamentals",
      duration: "4 weeks",
      level: "Intermediate",
      topics: [
        "Stock Market Basics",
        "Mutual Funds & ETFs",
        "Risk Management",
        "Portfolio Diversification",
        "Market Analysis Techniques"
      ],
      outcomes: [
        "Make first investment decision",
        "Understand risk profiles",
        "Build diversified portfolio",
        "Analyze market trends"
      ],
      resources: [
        "Investment Simulator",
        "Risk Assessment Tool",
        "Portfolio Builder",
        "Market Analysis Templates"
      ]
    },
    {
      module: 4,
      title: "Advanced Wealth Building",
      duration: "3 weeks",
      level: "Advanced",
      topics: [
        "Advanced Investment Strategies",
        "Tax Optimization",
        "Retirement Planning",
        "Wealth Preservation",
        "Estate Planning Basics"
      ],
      outcomes: [
        "Create long-term wealth plan",
        "Understand tax implications",
        "Plan for retirement goals",
        "Implement wealth preservation strategies"
      ],
      resources: [
        "Wealth Planning Calculator",
        "Tax Optimization Guide",
        "Retirement Planner",
        "Estate Planning Checklist"
      ]
    }
  ];

  const features = [
    {
      icon: "bolt",
      title: "Zero Commission",
      description: "Trade stocks and ETFs with absolutely zero brokerage fees",
      details: ["Equity Delivery", "Mutual Funds", "IPOs", "Gold Investments"]
    },
    {
      icon: "shield",
      title: "Advanced Security",
      description: "Bank-level security with 2FA and military-grade encryption",
      details: ["2-Factor Authentication", "SSL Encryption", "Secure Servers"]
    },
    {
      icon: "chart-bar",
      title: "Smart Analytics",
      description: "AI-powered tools for portfolio analysis and market insights",
      details: ["Portfolio Tracking", "Tax Reports", "Performance Analytics"]
    },
    {
      icon: "rocket",
      title: "Lightning Fast",
      description: "Execute trades in milliseconds with our advanced technology",
      details: ["High Speed Order", "Real-time Data", "Instant Notifications"]
    }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Software Engineer, Bangalore",
      content: "BharatVault transformed how I manage investments. The zero commission model and educational content helped me start confidently.",
      avatar: "PS",
      rating: 5
    },
    {
      name: "Rahul Mehta",
      role: "Business Owner, Mumbai",
      content: "Transparent pricing and excellent customer support. Exactly what Indian investors have been waiting for. Highly recommended!",
      avatar: "RM",
      rating: 5
    },
    {
      name: "Anita Reddy",
      role: "College Student, Delhi",
      content: "The mobile app is incredibly intuitive. I can manage my investments seamlessly while focusing on my studies.",
      avatar: "AR",
      rating: 5
    }
  ];

  // Learning Path Modal Component
  const LearningPathModal = () => (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
      <div className="modal-dialog modal-xl modal-dialog-centered">
        <div className="modal-content rounded-4 border-0 shadow-lg">
          <div className="modal-header border-0 pb-0">
            <div className="w-100">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="modal-title fw-bold" style={{ color: colors.dark }}>
                  Financial Learning Path
                </h2>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowLearningPath(false)}
                ></button>
              </div>
              <p className="lead mb-4" style={{ color: colors.gray }}>
                Follow this structured learning path to master personal finance and investing
              </p>
            </div>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-lg-4">
                <div className="sticky-top" style={{ top: '20px' }}>
                  <div className="list-group">
                    {learningPath.map((module, index) => (
                      <button
                        key={module.module}
                        className={`list-group-item list-group-item-action border-0 rounded-3 mb-2 ${
                          activeLearningModule === index ? 'active' : ''
                        }`}
                        onClick={() => setActiveLearningModule(index)}
                        style={{
                          background: activeLearningModule === index ? colors.gradient : colors.light,
                          color: activeLearningModule === index ? colors.white : colors.dark,
                          border: `1px solid ${colors.lighter}`,
                          transition: 'all 0.3s ease'
                        }}
                      >
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h6 className="mb-1">Module {module.module}</h6>
                            <small>{module.title}</small>
                          </div>
                          <span 
                            className="badge rounded-pill"
                            style={{
                              background: activeLearningModule === index ? colors.white : colors.primary,
                              color: activeLearningModule === index ? colors.primary : colors.white
                            }}
                          >
                            {module.duration}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="col-lg-8">
                {learningPath[activeLearningModule] && (
                  <div className="learning-module-content">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h3 style={{ color: colors.dark }}>
                        Module {learningPath[activeLearningModule].module}: {learningPath[activeLearningModule].title}
                      </h3>
                      <div className="d-flex gap-2">
                        <span 
                          className="badge px-3 py-2 rounded-pill"
                          style={{ background: colors.gradientLight, color: colors.white }}
                        >
                          {learningPath[activeLearningModule].level}
                        </span>
                        <span 
                          className="badge px-3 py-2 rounded-pill"
                          style={{ background: colors.lighter, color: colors.dark }}
                        >
                          {learningPath[activeLearningModule].duration}
                        </span>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="card border-0 shadow-sm h-100">
                          <div className="card-header border-0 bg-transparent">
                            <h5 className="fw-bold mb-0" style={{ color: colors.dark }}>Learning Topics</h5>
                          </div>
                          <div className="card-body">
                            <ul className="list-unstyled">
                              {learningPath[activeLearningModule].topics.map((topic, index) => (
                                <li key={index} className="mb-2 d-flex align-items-start">
                                  <div 
                                    className="rounded-circle d-flex align-items-center justify-content-center me-3 mt-1"
                                    style={{
                                      width: '20px',
                                      height: '20px',
                                      background: colors.primary,
                                      color: colors.white,
                                      fontSize: '10px',
                                      flexShrink: 0
                                    }}
                                  >
                                    ✓
                                  </div>
                                  <span style={{ color: colors.gray }}>{topic}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6 mb-4">
                        <div className="card border-0 shadow-sm h-100">
                          <div className="card-header border-0 bg-transparent">
                            <h5 className="fw-bold mb-0" style={{ color: colors.dark }}>Learning Outcomes</h5>
                          </div>
                          <div className="card-body">
                            <ul className="list-unstyled">
                              {learningPath[activeLearningModule].outcomes.map((outcome, index) => (
                                <li key={index} className="mb-2 d-flex align-items-start">
                                  <div 
                                    className="rounded-circle d-flex align-items-center justify-content-center me-3 mt-1"
                                    style={{
                                      width: '20px',
                                      height: '20px',
                                      background: colors.accent,
                                      color: colors.white,
                                      fontSize: '10px',
                                      flexShrink: 0
                                    }}
                                  >
                                    →
                                  </div>
                                  <span style={{ color: colors.gray }}>{outcome}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card border-0 shadow-sm">
                      <div className="card-header border-0 bg-transparent">
                        <h5 className="fw-bold mb-0" style={{ color: colors.dark }}>Learning Resources</h5>
                      </div>
                      <div className="card-body">
                        <div className="row">
                          {learningPath[activeLearningModule].resources.map((resource, index) => (
                            <div key={index} className="col-md-4 mb-2">
                              <div 
                                className="p-3 rounded-3 text-center hover-lift"
                                style={{
                                  background: colors.lighter,
                                  border: `1px solid ${colors.lighter}`,
                                  transition: 'all 0.3s ease'
                                }}
                              >
                                <small style={{ color: colors.dark }}>{resource}</small>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="text-center mt-4">
                      <button
                        className="btn btn-lg px-5 fw-semibold me-3"
                        style={{
                          background: colors.gradient,
                          color: colors.white,
                          border: 'none',
                          borderRadius: '8px'
                        }}
                      >
                        Start This Module
                      </button>
                      <button
                        className="btn btn-outline-primary btn-lg px-5 fw-semibold"
                        style={{ borderRadius: '8px' }}
                      >
                        Save Progress
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div
      style={{
        background: colors.light,
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        overflowX: "hidden",
      }}
    >
      {/* Learning Path Modal */}
      {showLearningPath && <LearningPathModal />}

      {/* Enhanced Navbar */}
      <nav
        className={`navbar navbar-expand-lg fixed-top py-3 ${
          isScrolled ? "navbar-scrolled" : ""
        }`}
        style={{
          transition: "all 0.3s ease",
          background: isScrolled ? `${colors.white}EE` : "transparent",
          backdropFilter: isScrolled ? "blur(20px)" : "none",
          boxShadow: isScrolled ? "0 8px 32px rgba(0,0,0,0.1)" : "none",
          borderBottom: isScrolled ? `1px solid ${colors.lighter}` : "none",
          padding: "1rem 0",
        }}
      >
        <div className="container">
          <a
            className="navbar-brand fw-bold fs-3 d-flex align-items-center"
            href="#"
            style={{ color: colors.primary }}
          >
            <div
              className="rounded-circle d-flex align-items-center justify-content-center me-2 shadow-sm"
              style={{
                width: "42px",
                height: "42px",
                background: colors.gradient,
              }}
            >
              <span
                className="text-white fw-bold"
                style={{ fontSize: "1.1rem" }}
              >
                BV
              </span>
            </div>
            BharatVault
          </a>
          
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto">
              {["Home", "Mission", "Features", "Learning", "Reviews"].map((item) => (
                <li key={item} className="nav-item mx-2">
                  <a
                    className="nav-link fw-medium position-relative"
                    href={`#${item.toLowerCase()}`}
                    style={{ color: colors.dark }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
            <div className="d-flex gap-3 align-items-center">
              {!user ? (
                <button
                  onClick={openSignIn}
                  className="btn btn-outline-primary px-4 fw-semibold"
                  style={{
                    borderColor: colors.primary,
                    color: colors.primary,
                    borderRadius: "8px",
                    borderWidth: "2px",
                  }}
                >
                  Sign In
                </button>
              ) : (
                <div className="d-flex align-items-center gap-3">
                  <button
                    onClick={handleDashboardClick}
                    className="btn px-4 fw-semibold shadow-sm"
                    style={{
                      background: colors.gradient,
                      border: "none",
                      color: colors.white,
                      borderRadius: "8px",
                    }}
                  >
                    Go to Dashboard
                  </button>
                  <UserButton />
                </div>
              )}
              {!user && (
                <button
                  className="btn px-4 fw-semibold shadow-sm"
                  style={{
                    background: colors.gradient,
                    border: "none",
                    color: colors.white,
                    borderRadius: "8px",
                  }}
                >
                  Get Started
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div style={{ height: "80px" }}></div>

      {/* ===== HERO SECTION ===== */}
      <section
        id="home"
        style={{
          background: colors.gradient,
          color: colors.white,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="container py-5">
          <div className="row align-items-center min-vh-100 py-5">
            <div className="col-lg-6" data-aos="fade-right">
              <div className="badge bg-white bg-opacity-20 text-white px-4 py-2 rounded-pill mb-4 shadow-sm">
                India's Most Trusted Investment Platform
              </div>
              <h1 className="display-4 fw-bold mb-4">
                Smart Investing Made Simple
              </h1>
              <p className="lead mb-5 opacity-90 fs-5">
                Trade stocks, derivatives, mutual funds, and more with India's most trusted platform. 
                Start your financial journey with complete transparency and security.
              </p>
              <div className="d-flex flex-wrap gap-3 mb-5">
                <button
                  className="btn btn-light btn-lg px-5 py-3 fw-semibold shadow d-flex align-items-center gap-2"
                  style={{ borderRadius: "10px", color: colors.primary }}
                >
                  Start Investing Free
                </button>
                <button
                  className="btn btn-outline-light btn-lg px-5 py-3 fw-semibold d-flex align-items-center gap-2"
                  style={{ borderRadius: "10px" }}
                >
                  Watch Demo
                </button>
              </div>
            </div>
            <div
              className="col-lg-6 text-center"
              data-aos="fade-left"
              data-aos-delay="200"
            >
              <div className="position-relative">
                <div
                  className="bg-white rounded-4 shadow-xl p-2"
                  style={{
                    transform: "perspective(1000px) rotateY(-5deg) rotateX(5deg)",
                    border: `1px solid ${colors.lighter}`
                  }}
                >
                  <div 
                    className="rounded-3 p-4 text-white text-center"
                    style={{ background: colors.gradient }}
                  >
                    <h5 className="fw-bold">Portfolio Overview</h5>
                    <div className="display-6 fw-bold my-3">₹2,45,670</div>
                    <div className="text-success fw-semibold">+12.5% Today</div>
                  </div>
                  <div className="p-3">
                    <div className="row text-center">
                      <div className="col-4">
                        <div className="text-sm text-muted">Stocks</div>
                        <div className="fw-bold">₹1,82,450</div>
                      </div>
                      <div className="col-4">
                        <div className="text-sm text-muted">Mutual Funds</div>
                        <div className="fw-bold">₹48,220</div>
                      </div>
                      <div className="col-4">
                        <div className="text-sm text-muted">Cash</div>
                        <div className="fw-bold">₹15,000</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="wave-divider">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
              fill="currentColor"
            ></path>
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
              fill="currentColor"
            ></path>
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </section>

      {/* ===== MISSION SECTION ===== */}
      <section id="mission" className="py-5" style={{ background: colors.white }}>
        <div className="container py-5">
          <div className="row justify-content-center text-center mb-5">
            <div className="col-lg-10">
              <h2 className="display-5 fw-bold mb-4" style={{ color: colors.dark }}>
                Solving India's Financial Challenges
              </h2>
              <p className="lead mb-5" style={{ color: colors.gray }}>
                We're addressing core financial problems faced by millions of Indians through innovative technology solutions
              </p>
            </div>
          </div>
          
          <div className="row">
            {societalSolutions.map((solution, index) => (
              <div key={index} className="col-lg-4 col-md-6 mb-4">
                <div
                  className="solution-card h-100 p-4 rounded-4 shadow-sm border-0"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  style={{
                    background: colors.white,
                    transition: "all 0.3s ease",
                    border: `1px solid ${colors.lighter}`,
                    borderTop: `4px solid ${solution.color}`
                  }}
                >
                  <div className="d-flex align-items-center mb-3">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center me-3"
                      style={{
                        width: "50px",
                        height: "50px",
                        background: `${solution.color}20`,
                        color: solution.color,
                        fontSize: "1.2rem"
                      }}
                    >
                      <i className={`fas fa-${solution.icon}`}></i>
                    </div>
                    <h5 className="fw-bold mb-0" style={{ color: colors.dark }}>
                      {solution.problem}
                    </h5>
                  </div>
                  
                  <div className="mb-3">
                    <small className="text-uppercase fw-semibold" style={{ color: colors.primary }}>
                      Our Solution
                    </small>
                    <p className="mb-2" style={{ color: colors.dark, fontSize: "0.95rem" }}>
                      {solution.solution}
                    </p>
                  </div>
                  
                  <div>
                    <small className="text-uppercase fw-semibold" style={{ color: colors.accent }}>
                      Outcome
                    </small>
                    <p className="mb-0 fw-semibold" style={{ color: solution.color, fontSize: "0.95rem" }}>
                      {solution.outcome}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section id="features" className="py-5" style={{ background: colors.lighter }}>
        <div className="container py-5">
          <div className="row justify-content-center text-center mb-5">
            <div className="col-lg-8">
              <h2 className="display-5 fw-bold mb-3" style={{ color: colors.dark }}>
                Platform Features
              </h2>
              <p className="lead" style={{ color: colors.gray }}>
                Everything you need for successful investing
              </p>
            </div>
          </div>
          
          <div className="row">
            {features.map((feature, index) => (
              <div key={index} className="col-lg-3 col-md-6 mb-4">
                <div
                  className="feature-card h-100 p-4 rounded-4 shadow-sm border-0"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  style={{
                    background: colors.white,
                    transition: "all 0.3s ease",
                    border: `1px solid ${colors.lighter}`
                  }}
                >
                  <div
                    className="feature-icon mb-4 rounded-3 d-flex align-items-center justify-content-center"
                    style={{
                      width: "60px",
                      height: "60px",
                      background: colors.gradientLight,
                      color: colors.white,
                      fontSize: "1.5rem"
                    }}
                  >
                    <i className={`fas fa-${feature.icon}`}></i>
                  </div>
                  <h5 className="fw-bold mb-3" style={{ color: colors.dark }}>
                    {feature.title}
                  </h5>
                  <p style={{ color: colors.gray, fontSize: "0.9rem" }}>{feature.description}</p>
                  <ul className="list-unstyled mt-3">
                    {feature.details.map((detail, i) => (
                      <li key={i} className="mb-2">
                        <small style={{ color: colors.gray }}>
                          • {detail}
                        </small>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== LEARNING SECTION ===== */}
      <section id="learning" className="py-5" style={{ background: colors.white }}>
        <div className="container py-5">
          <div className="row justify-content-center text-center mb-5">
            <div className="col-lg-8">
              <h2 className="display-5 fw-bold mb-3" style={{ color: colors.dark }}>
                Learn & Grow Your Wealth
              </h2>
              <p className="lead" style={{ color: colors.gray }}>
                Master personal finance and investing with our structured learning path
              </p>
            </div>
          </div>
          
          <div className="row">
            {learningPath.slice(0, 3).map((module, index) => (
              <div key={index} className="col-lg-4 col-md-6 mb-4">
                <div
                  className="education-card h-100 p-4 rounded-4 shadow-sm border-0"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  style={{
                    background: colors.white,
                    transition: "all 0.3s ease",
                    border: `1px solid ${colors.lighter}`
                  }}
                >
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span
                      className="badge px-3 py-2 rounded-pill"
                      style={{
                        background: colors.gradientLight,
                        color: colors.white,
                        fontSize: "0.7rem"
                      }}
                    >
                      Module {module.module}
                    </span>
                    <small style={{ color: colors.gray }}>{module.duration}</small>
                  </div>
                  <h5 className="fw-bold mb-3" style={{ color: colors.dark }}>
                    {module.title}
                  </h5>
                  <p style={{ color: colors.gray, fontSize: "0.9rem" }}>
                    {module.topics.slice(0, 2).join(', ')}...
                  </p>
                  <div className="mt-auto">
                    <button
                      onClick={handleStartLearning}
                      className="btn btn-outline-primary btn-sm w-100"
                      style={{ borderRadius: "6px" }}
                    >
                      Start Learning
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-4">
            <button
              onClick={handleStartLearning}
              className="btn btn-primary btn-lg px-5 fw-semibold"
              style={{ borderRadius: "8px" }}
            >
              View Complete Learning Path
            </button>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS SECTION ===== */}
      <section id="reviews" className="py-5" style={{ background: colors.lighter }}>
        <div className="container py-5">
          <div className="row justify-content-center text-center mb-5">
            <div className="col-lg-8">
              <h2 className="display-5 fw-bold mb-3" style={{ color: colors.dark }}>
                Trusted by Investors
              </h2>
              <p className="lead" style={{ color: colors.gray }}>
                See what our community has to say about their experience
              </p>
            </div>
          </div>
          
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div
                className="testimonial-card p-5 rounded-4 shadow-sm border-0 position-relative"
                style={{
                  background: colors.white,
                  minHeight: "300px"
                }}
                data-aos="fade-up"
              >
                <div className="text-center mb-4">
                  <div
                    className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                    style={{
                      width: "60px",
                      height: "60px",
                      background: colors.gradient,
                      color: colors.white,
                      fontSize: "1.2rem",
                      fontWeight: "bold"
                    }}
                  >
                    {testimonials[activeTestimonial].avatar}
                  </div>
                  <h5 className="fw-bold mb-1" style={{ color: colors.dark }}>
                    {testimonials[activeTestimonial].name}
                  </h5>
                  <small style={{ color: colors.gray }}>
                    {testimonials[activeTestimonial].role}
                  </small>
                  <div className="mt-2" style={{ color: colors.secondary }}>
                    {"★".repeat(testimonials[activeTestimonial].rating)}
                  </div>
                </div>
                <p className="text-center lead" style={{ color: colors.dark, fontStyle: "italic" }}>
                  "{testimonials[activeTestimonial].content}"
                </p>
                
                <div className="text-center mt-4">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      className={`btn btn-sm mx-1 rounded-circle ${
                        index === activeTestimonial ? "bg-primary" : "bg-light"
                      }`}
                      style={{
                        width: "10px",
                        height: "10px",
                        border: "none",
                        transition: "all 0.3s ease"
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

      {/* ===== CTA SECTION ===== */}
      <section
        className="py-5"
        style={{
          background: colors.gradient,
          color: colors.white,
        }}
      >
        <div className="container py-5">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8" data-aos="zoom-in">
              <h2 className="display-5 fw-bold mb-4">
                Ready to Transform Your Financial Future?
              </h2>
              <p className="lead mb-5 opacity-90">
                Join millions of investors who trust BharatVault for their financial growth. 
                Start with zero commission and experience the future of investing.
              </p>
              <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
                {user ? (
                  <button
                    onClick={handleDashboardClick}
                    className="btn btn-light btn-lg px-5 py-3 fw-semibold d-flex align-items-center justify-content-center gap-2 shadow"
                    style={{ borderRadius: "10px", color: colors.primary }}
                  >
                    Go to Dashboard
                  </button>
                ) : (
                  <button
                    className="btn btn-light btn-lg px-5 py-3 fw-semibold d-flex align-items-center justify-content-center gap-2 shadow"
                    style={{ borderRadius: "10px", color: colors.primary }}
                  >
                    Create Free Account
                  </button>
                )}
                <button
                  className="btn btn-outline-light btn-lg px-5 py-3 fw-semibold d-flex align-items-center justify-content-center gap-2"
                  style={{ borderRadius: "10px" }}
                >
                  Download Mobile App
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer style={{ background: colors.dark, color: colors.white }}>
        <div className="container pt-5 pb-4">
          <div className="row align-items-center">
            <div className="col-md-6 mb-3 mb-md-0">
              <p className="mb-0 opacity-75">
                © {new Date().getFullYear()} BharatVault Technologies Pvt. Ltd. All rights reserved.
              </p>
            </div>
            <div className="col-md-6 text-md-end">
              <div className="d-flex flex-wrap justify-content-md-end gap-3 opacity-75">
                <small>SEBI Registered: INZ000200331</small>
                <small>CDSL: IN-DP-CDSL-490-2008</small>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Chat Bot Toggle
      <button
        onClick={() => setShowChatBot(!showChatBot)}
        className="btn btn-primary rounded-circle shadow-lg position-fixed d-flex align-items-center justify-content-center"
        style={{
          width: "60px",
          height: "60px",
          bottom: "30px",
          right: "30px",
          zIndex: 1000,
          background: colors.gradient,
          border: "none",
          fontSize: "1.2rem"
        }}
      >
        <i className="fas fa-comment"></i>
      </button>

      {/* Chat Bot */}
      {/* {showChatBot && (
        <div className="position-fixed" style={{ bottom: "100px", right: "30px", zIndex: 1000 }}>
          <ChatBot />
        </div>
      // )} */} 

      {/* Custom Styles */}
      <style jsx>{`
        .feature-card:hover,
        .solution-card:hover,
        .education-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(37, 99, 235, 0.1);
        }
        
        .wave-divider {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          overflow: hidden;
          line-height: 0;
          transform: rotate(180deg);
          color: ${colors.white};
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
          content: "";
          position: absolute;
          width: 0;
          height: 2px;
          bottom: 0;
          left: 50%;
          background: ${colors.gradient};
          transition: all 0.3s ease;
        }
        
        .navbar-nav .nav-link:hover::after {
          width: 100%;
          left: 0;
        }
        
        .hover-lift {
          transition: all 0.3s ease;
        }
        
        .hover-lift:hover {
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
}

export default HomePage;
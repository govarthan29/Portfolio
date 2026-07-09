import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import emailjs from '@emailjs/browser';

// Icons represented as inline SVG components for crisp display and no extra package dependencies
const Icons = {
  Sun: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4"></circle>
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path>
    </svg>
  ),
  Moon: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
    </svg>
  ),
  Download: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"></path>
    </svg>
  ),
  Github: ({ size = 20 } = {}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
      <path d="M9 18c-4.51 2-5-2-7-2"></path>
    </svg>
  ),
  Linkedin: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"></path>
      <circle cx="4" cy="4" r="2"></circle>
    </svg>
  ),
  Mail: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
    </svg>
  ),
  Phone: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
    </svg>
  ),
  MapPin: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
      <circle cx="12" cy="10" r="3"></circle>
    </svg>
  ),
  Code: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"></polyline>
      <polyline points="8 6 2 12 8 18"></polyline>
    </svg>
  ),
  Cpu: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2"></rect>
      <rect x="9" y="9" width="6" height="6"></rect>
      <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3"></path>
    </svg>
  ),
  Database: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
      <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"></path>
    </svg>
  ),
  Terminal: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 17 10 11 4 5"></polyline>
      <line x1="12" y1="19" x2="20" y2="19"></line>
    </svg>
  ),
  Palette: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 14.7255 3.09032 17.1962 4.85857 19C5.03509 19.1765 5.09249 19.4398 5.00287 19.6738C4.84759 20.0789 4.79336 20.4859 4.85857 20.8586C4.94551 21.3556 5.35564 21.8586 5.85857 21.9455C6.23126 22.0107 6.63821 21.9565 7.04334 21.8012C7.27734 21.7116 7.54067 21.769 7.71719 21.9455C9.52097 22.9097 10.7255 22 12 22Z"></path>
      <circle cx="7.5" cy="10.5" r="1.5"></circle>
      <circle cx="11.5" cy="7.5" r="1.5"></circle>
      <circle cx="16.5" cy="9.5" r="1.5"></circle>
      <circle cx="15.5" cy="14.5" r="1.5"></circle>
    </svg>
  ),
  Layers: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
      <polygon points="2 17 12 22 22 17"></polygon>
      <polygon points="2 12 12 17 22 12"></polygon>
    </svg>
  ),
  ExternalLink: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3"></path>
    </svg>
  ),
  Send: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13"></line>
      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
    </svg>
  ),
  Award: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="7"></circle>
      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
    </svg>
  ),
  BookOpen: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
    </svg>
  ),
  Menu: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="12" x2="20" y2="12"></line>
      <line x1="4" y1="6" x2="20" y2="6"></line>
      <line x1="4" y1="18" x2="20" y2="18"></line>
    </svg>
  ),
  Close: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  )
};

function App() {
  // Theme management: Default to dark mode for a sleeker tech look
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Typing effect simulation / role rotator
  const roles = [
    "Computer Science Graduate",
    "Full-Stack Developer",
    "Software Engineer",
    "Quality Assurance Engineer"
  ];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentRoleText, setCurrentRoleText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    let timer;
    const fullText = roles[currentRoleIndex];

    const handleTyping = () => {
      if (!isDeleting) {
        // Typing text
        setCurrentRoleText(fullText.substring(0, currentRoleText.length + 1));
        setTypingSpeed(100);

        if (currentRoleText === fullText) {
          // Pause at full text
          timer = setTimeout(() => setIsDeleting(true), 1500);
          return;
        }
      } else {
        // Deleting text
        setCurrentRoleText(fullText.substring(0, currentRoleText.length - 1));
        setTypingSpeed(50);

        if (currentRoleText === "") {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
          return;
        }
      }

      timer = setTimeout(handleTyping, typingSpeed);
    };

    timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentRoleText, isDeleting, currentRoleIndex, typingSpeed]);

  // Mobile menu visibility
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Active navigation highlight based on scroll position
  const [activeSection, setActiveSection] = useState('home');
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const scrollPos = window.scrollY + 100;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Skill category management
  const [activeSkillCategory, setActiveSkillCategory] = useState('All');
  const skillCategories = [
    { id: 'All', label: 'All Skills' },
    { id: 'Languages', label: 'Languages' },
    { id: 'Full-Stack', label: 'Full-Stack' },
    { id: 'AI & ML', label: 'AI & ML' },
    { id: 'Databases', label: 'Databases' },
    { id: 'Tools', label: 'Tools' },
    { id: 'Soft Skills', label: 'Soft Skills' }
  ];

  const skillsData = [
    { name: 'C++', category: 'Languages', icon: <Icons.Code /> },
    { name: 'Java', category: 'Languages', icon: <Icons.Code /> },
    { name: 'Python', category: 'Languages', icon: <Icons.Code /> },
    { name: 'JavaScript', category: 'Languages', icon: <Icons.Code /> },
    { name: 'PHP', category: 'Languages', icon: <Icons.Code /> },
    
    { name: 'React', category: 'Full-Stack', icon: <Icons.Layers /> },
    { name: 'Node.js', category: 'Full-Stack', icon: <Icons.Layers /> },
    { name: 'Express.js', category: 'Full-Stack', icon: <Icons.Layers /> },
    { name: 'Spring Boot', category: 'Full-Stack', icon: <Icons.Layers /> },
    { name: 'HTML', category: 'Full-Stack', icon: <Icons.Layers /> },
    { name: 'CSS', category: 'Full-Stack', icon: <Icons.Layers /> },
    { name: 'TailwindCSS', category: 'Full-Stack', icon: <Icons.Layers /> },
    { name: 'Bootstrap', category: 'Full-Stack', icon: <Icons.Layers /> },
    
    { name: 'TensorFlow', category: 'AI & ML', icon: <Icons.Cpu /> },
    { name: 'Computer Vision (OpenCV)', category: 'AI & ML', icon: <Icons.Cpu /> },
    { name: 'NLP', category: 'AI & ML', icon: <Icons.Cpu /> },
    
    { name: 'MongoDB', category: 'Databases', icon: <Icons.Database /> },
    { name: 'MySQL', category: 'Databases', icon: <Icons.Database /> },
    { name: 'SQLite', category: 'Databases', icon: <Icons.Database /> },
    { name: 'Firebase', category: 'Databases', icon: <Icons.Database /> },
    
    { name: 'Git', category: 'Tools', icon: <Icons.Terminal /> },
    { name: 'GitHub', category: 'Tools', icon: <Icons.Terminal /> },
    { name: 'Power BI', category: 'Tools', icon: <Icons.Terminal /> },
    { name: 'Figma', category: 'Tools', icon: <Icons.Terminal /> },
    { name: 'Adobe XD', category: 'Tools', icon: <Icons.Terminal /> },
    { name: 'Canva', category: 'Tools', icon: <Icons.Terminal /> },

    { name: 'Problem Solving', category: 'Soft Skills', icon: <Icons.Palette /> },
    { name: 'Communication', category: 'Soft Skills', icon: <Icons.Palette /> },
    { name: 'Teamwork', category: 'Soft Skills', icon: <Icons.Palette /> },
    { name: 'Critical Thinking', category: 'Soft Skills', icon: <Icons.Palette /> },
    { name: 'Adaptability', category: 'Soft Skills', icon: <Icons.Palette /> }    
  ];

  const filteredSkills = activeSkillCategory === 'All'
    ? skillsData
    : skillsData.filter(skill => skill.category === activeSkillCategory);

  // Group skills by category for a cleaner grid presentation when "All" is active
  const categoriesList = ['Languages', 'Full-Stack', 'AI & ML', 'Databases', 'Tools','Soft Skills'];
  const getCategoryIcon = (cat) => {
    switch(cat) {
      case 'Languages': return <Icons.Code />;
      case 'Full-Stack': return <Icons.Layers />;
      case 'AI & ML': return <Icons.Cpu />;
      case 'Databases': return <Icons.Database />;
      case 'Soft Skills': return <Icons.Palette />;
      default: return <Icons.Terminal />;
    }
  };

  // Projects filter management
  const [activeProjectFilter, setActiveProjectFilter] = useState('All');
  const projectFilters = ['All', 'MERN Stack', 'AI & ML', 'PHP & MySQL'];

  const projectsData = [
    {
      title: 'ReUseIt',
      subtitle: 'AI-Powered Waste Classification Platform',
      category: 'AI & ML',
      tech: ['MongoDB', 'Express', 'React', 'Node.js', 'TensorFlow', 'Python'],
      date: 'Oct 2025 – Apr 2026',
      description: 'An AI-powered waste classification and craft recommendation platform that uses TensorFlow to identify waste materials from user-uploaded images and recommend creative DIY craft ideas, encouraging sustainable waste management through intelligent image recognition.',
      link: 'https://youtu.be/1IHSbIvhWls',
      github: 'https://github.com/govarthan29/ReUseIt',
      color: '#10b981',
      gfx: (
        <img 
          src={`${import.meta.env.BASE_URL}assets/ReUseIt_Home_Page.png`} 
          alt="ReUseIt Homepage" 
          className="project-screenshot-img"
        />
      )
    },
    {
      title: 'Rolex Cakes and Bakery',
      subtitle: 'Bakery Management System',
      category: 'MERN Stack',
      tech: ['React', 'Node.js', 'Express', 'MongoDB'],
      date: 'Jan 2026 – Mar 2026',
      description: 'A full-stack bakery management system built using the MERN stack to streamline bakery operations. The system enables product management, real-time customer order tracking, inventory management, and sales analytics through an intuitive administrative dashboard.',
      link: 'https://youtu.be/H1U83EdLU_I',
      github: 'https://github.com/govarthan29/Rolex_Bakery_Website',
      color: '#f59e0b',
      gfx: (
        <img 
          src={`${import.meta.env.BASE_URL}assets/Rolex_Home_Page.png`} 
          alt="Rolex Cakes and Bakery Homepage" 
          className="project-screenshot-img"
        />
      )
    },
    {
      title: 'Heart Pulse',
      subtitle: 'Heart-API Integrated Game',
      category: 'MERN Stack',
      tech: ['MongoDB', 'Express', 'React', 'Node.js', 'Heart API'],
      date: 'Sep 2025 – Dec 2025',
      description: 'An interactive MERN stack web game featuring Heart API integration, secure JWT-based authentication, personalized user profiles, and real-time leaderboard rankings to deliver an engaging and competitive gaming experience.',
      link: 'https://youtu.be/xZc1MdcXD60',
      github: 'https://github.com/govarthan29/Heart-Pulse-Game',
      color: '#ef4444',
      gfx: (
        <img 
          src={`${import.meta.env.BASE_URL}assets/Heart_Game_Home_Page.png`} 
          alt="Heart Pulse Homepage" 
          className="project-screenshot-img"
        />
      )
    },
    // {
    //   title: 'Online Mobile Shop',
    //   subtitle: 'Android Shopping App',
    //   category: 'Java & PHP',
    //   tech: ['Java', 'Android SDK', 'MySQL', 'PHP API'],
    //   date: 'May 2023 – Sep 2023',
    //   description: 'A native Android e-commerce application focusing on mobile phone sales. Designed an intuitive product viewing interface, shopping cart functionality, user login protocols, and connected to a remote MySQL database via a custom PHP REST API layer.',
    //   link: '#',
    //   color: '#3b82f6',
    //   gfx: (
    //     <div className="shop-gfx">
    //       <div style={{ height: '8px', background: '#334155', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    //         <div style={{ width: '10px', height: '2px', background: '#475569', borderRadius: '1px' }}></div>
    //       </div>
    //       <div className="shop-screen">
    //         <span style={{ fontSize: '0.8rem' }}>📱</span>
    //         <span style={{ fontSize: '0.5rem', color: '#94a3b8' }}>MobiShop v1.0</span>
    //       </div>
    //       <div style={{ height: '10px', background: '#334155' }}></div>
    //     </div>
    //   )
    // },
    {
      title: 'TUVOKA',
      subtitle: 'Musical Instruments E-Commerce Platform',
      category: 'PHP & MySQL',
      tech: ['PHP', 'MySQL', 'JavaScript', 'AJAX', 'HTML', 'CSS'],
      date: 'Apr 2025 – Sep 2025',
      description: 'A premium musical instruments e-commerce platform built with PHP, MySQL, JavaScript (AJAX), HTML, and CSS, enabling users to browse products, manage shopping carts, place orders, and allowing administrators to manage products, customers, orders, and sales through a secure admin dashboard.',
      link: 'https://youtu.be/1D1NLJSvtOE',
      github: 'https://github.com/govarthan29/TUVOKA',
      color: '#8b5cf6',
      gfx: (
        <img 
          src={`${import.meta.env.BASE_URL}assets/TUVOKA_Home_Page.png`} 
          alt="TUVOKA Homepage" 
          className="project-screenshot-img"
        />
      )
    },
    {
      title: 'Motor Parts Platform',
      subtitle: 'Motor Parts E-Commerce Website',
      category: 'PHP & MySQL',
      tech: ['HTML', 'CSS', 'JavaScript', 'PHP', 'SQL'],
      date: 'Apr 2023 – Jul 2023',
      description: 'A responsive web-based platform for browsing and booking motor vehicle spare parts. Features dynamic product search, shopping cart management, invoice generation, user profile management, and a well-structured database for efficient inventory management.',
      link: 'https://youtu.be/jViqB3_81ZE',
      github: 'https://github.com/govarthan29/Motor-Parts-E-Commerce-Website',
      color: '#6366f1',
      gfx: (
        <img 
          src={`${import.meta.env.BASE_URL}assets/Motor_Parts_Home_Page.png`} 
          alt="Motor Parts Platform Homepage" 
          className="project-screenshot-img"
        />
      )
    }
  ];

  const filteredProjects = activeProjectFilter === 'All'
    ? projectsData
    : projectsData.filter(project => project.category === activeProjectFilter);



  // Contact form submission logic
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      setSubmitStatus('success');
      setFormData({ name:'', email:'', message:''});
    } catch(error){
      console.error('EmailJS Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(()=>setSubmitStatus(null),6000);
    }
  };

  // Trigger automatic download of the resume PDF
  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = `${import.meta.env.BASE_URL}Govarthan_Subaharan_Resume.pdf`;
    link.download = 'Govarthan_Subaharan_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  // Framer Motion animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 45 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.75, ease: "easeOut" }
    }
  };

  const staggerContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15
      }
    }
  };

  const staggerItemVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const heroVisualVariants = {
    hidden: { opacity: 0, scale: 0.92, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.85, ease: "easeOut", delay: 0.25 }
    }
  };

  return (
    <>
      {/* Printable Resume Content (hidden on screen, visible on print) */}
      <div className="print-resume-only" style={{ display: 'none' }}>
        <style dangerouslySetInnerHTML={{__html: `
          @media print {
            body {
              background: white !important;
              color: black !important;
              font-family: Arial, sans-serif !important;
              font-size: 11pt !important;
              line-height: 1.4 !important;
              margin: 1.5cm !important;
            }
            .print-resume-only {
              display: block !important;
            }
            #root, .navbar, .theme-toggle, section, footer, .ambient-glow, .ambient-glow-right {
              display: none !important;
            }
            .print-header {
              border-bottom: 2px solid #333;
              padding-bottom: 15px;
              margin-bottom: 20px;
            }
            .print-name {
              font-size: 26pt;
              font-weight: bold;
              margin: 0;
              text-transform: uppercase;
              letter-spacing: 1px;
            }
            .print-role {
              font-size: 14pt;
              color: #555;
              margin: 5px 0 10px 0;
            }
            .print-contacts {
              display: flex;
              flex-wrap: wrap;
              gap: 15px;
              font-size: 9.5pt;
              color: #444;
            }
            .print-section {
              margin-bottom: 20px;
              page-break-inside: avoid;
            }
            .print-section-title {
              font-size: 14pt;
              font-weight: bold;
              text-transform: uppercase;
              border-bottom: 1px solid #ddd;
              padding-bottom: 3px;
              margin-bottom: 10px;
              color: #222;
            }
            .print-item {
              margin-bottom: 12px;
            }
            .print-item-header {
              display: flex;
              justify-content: space-between;
              font-weight: bold;
            }
            .print-item-sub {
              font-style: italic;
              color: #444;
              margin-bottom: 5px;
            }
            .print-item-desc {
              font-size: 10pt;
              margin-left: 10px;
            }
            .print-skills-grid {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 10px;
              font-size: 10pt;
            }
            .print-skills-cat {
              font-weight: bold;
            }
            .print-bullet {
              margin-left: 15px;
              list-style-type: square;
            }
          }
        `}} />
        <div className="print-header">
          <h1 className="print-name">Govarthan Subaharan</h1>
          <div className="print-role">Computer Science Graduate & Full-Stack Developer</div>
          <div className="print-contacts">
            <span>📧 subakarankovarthan29@gmail.com</span>
            <span>📞 (+94) 742815024</span>
            <span>📍 Jaffna, Sri Lanka</span>
            <span>🔗 linkedin.com/in/govarthan29</span>
            <span>🐙 github.com/govarthan29</span>
          </div>
        </div>

        <div className="print-section">
          <h2 className="print-section-title">Career Objective</h2>
          <p style={{ fontSize: '10.5pt' }}>
            I am a graduate in BSc Computer Science from the University of Bedfordshire, with a strong academic background and passion for exploring emerging technologies. I am particularly interested in Software Engineering, full-stack development, Quality Assurance, and creating efficient, user-friendly web applications. Driven by adaptability, creativity, and continuous learning, I aspire to become a skilled Software Engineer.
          </p>
        </div>

        <div className="print-section">
          <h2 className="print-section-title">Education</h2>
          <div className="print-item">
            <div className="print-item-header">
              <span>University of Bedfordshire</span>
              <span>2025 - 2026</span>
            </div>
            <div className="print-item-sub">BSc (Hons) in Computer Science - Colombo</div>
          </div>
          <div className="print-item">
            <div className="print-item-header">
              <span>SLIIT City Uni</span>
              <span>2022 - 2025</span>
            </div>
            <div className="print-item-sub">Higher National Diploma in Information Technology - Colombo</div>
            <div className="print-item-desc">CGPA: 3.0 / 4.0</div>
          </div>
        </div>

        <div className="print-section">
          <h2 className="print-section-title">Project Experience</h2>
          <div className="print-item">
            <div className="print-item-header">
              <span>ReUseIt - AI-Powered Waste Recycler</span>
              <span>Oct 2025 - Apr 2026</span>
            </div>
            <div className="print-item-sub">MERN Stack (MongoDB, Express, React, Node.js), TensorFlow, Python</div>
            <ul className="print-bullet">
              <li className="print-item-desc">Developed an AI-powered reusing platform using MERN stack and TensorFlow for waste classification and DIY craft recommendations.</li>
            </ul>
          </div>
          <div className="print-item">
            <div className="print-item-header">
              <span>Rolex Cakes and Bakery</span>
              <span>Jan 2026 - Mar 2026</span>
            </div>
            <div className="print-item-sub">MERN Stack (MongoDB, Express, React, Node.js)</div>
            <ul className="print-bullet">
              <li className="print-item-desc">Developed a bakery management system using React, Node.js, and MongoDB to manage products, customer orders, inventory, and sales operations.</li>
            </ul>
          </div>
          <div className="print-item">
            <div className="print-item-header">
              <span>Heart Pulse Game</span>
              <span>Sep 2025 - Dec 2025</span>
            </div>
            <div className="print-item-sub">MERN Stack, Heart API</div>
            <ul className="print-bullet">
              <li className="print-item-desc">Developed a heart counting game using MERN stack with a game page, scoreboards, and user authentication.</li>
            </ul>
          </div>
        </div>

        <div className="print-section">
          <h2 className="print-section-title">Technical Skills</h2>
          <div className="print-skills-grid">
            <div><span className="print-skills-cat">Languages:</span> C++, Java, Python, SQL, JavaScript, PHP</div>
            <div><span className="print-skills-cat">Web Development:</span> React, Node.js, Spring Boot, HTML, CSS, Bootstrap, Tailwind</div>
            <div><span className="print-skills-cat">Databases:</span> MySQL, SQLite, MongoDB, Firebase, Power BI</div>
            <div><span className="print-skills-cat">Machine Learning:</span> TensorFlow, NLP, Computer Vision (OpenCV)</div>
            <div><span className="print-skills-cat">Tools & Controls:</span> Git, GitHub, Figma, Adobe XD, Canva</div>
            <div><span className="print-skills-cat">Soft Skills:</span> Problem-Solving, Teamwork, Adaptability, Critical Thinking</div>
          </div>
        </div>

        <div className="print-section">
          <h2 className="print-section-title">Academic Highlights</h2>
          <div style={{ fontSize: '10pt' }}>
            Introduction to Programming: A | Mathematics for IT: A | Web Application Development: A | Data Structures & Algorithms: A | OOP (Java): A | Database Systems: A
          </div>
        </div>
      </div>

      {/* --- Main Web Portfolio App --- */}
      <nav className="navbar">
        <div className="container navbar-container">
          <a href="#home" className="logo-link">
            GOVARTHAN
            <span className="logo-dot"></span>
          </a>

          <ul className={`nav-links ${mobileMenuOpen ? 'mobile-visible' : ''}`}>
            <li><a href="#home" className={`nav-link ${activeSection === 'home' ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>Home</a></li>
            <li><a href="#about" className={`nav-link ${activeSection === 'about' ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>About</a></li>
            <li><a href="#skills" className={`nav-link ${activeSection === 'skills' ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>Skills</a></li>
            <li><a href="#projects" className={`nav-link ${activeSection === 'projects' ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>Projects</a></li>
            <li><a href="#contact" className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>Contact</a></li>
          </ul>

          <div className="nav-right">
            <button 
              className="theme-toggle" 
              onClick={toggleTheme} 
              aria-label="Toggle light and dark mode"
              title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
            >
              {theme === 'light' ? <Icons.Moon /> : <Icons.Sun />}
            </button>

            <button 
              className="resume-btn" 
              onClick={handleDownloadResume}
              title="Download Resume PDF"
            >
              <Icons.Download />
              <span>Resume</span>
            </button>

            <button 
              className="mobile-menu-btn" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile navigation menu"
            >
              {mobileMenuOpen ? <Icons.Close /> : <Icons.Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <motion.section
        id="home"
        className="hero-section"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="ambient-glow"></div>
        <div className="container hero-grid">
          <motion.div className="hero-content" variants={staggerContainerVariants}>
            <motion.div className="hero-tagline" variants={staggerItemVariants}>
              <span className="hero-tagline-dot"></span>
              Open to Opportunities
            </motion.div>
            
            <motion.h1 className="hero-title" variants={staggerItemVariants}>
              Hi, I'm <span className="text-gradient">Govarthan</span>
            </motion.h1>

            <motion.div className="hero-role-container" variants={staggerItemVariants}>
              <span className="hero-role">
                {currentRoleText}
                <span style={{ color: 'var(--accent-primary)', animation: 'pulse-glow 1s infinite' }}>|</span>
              </span>
            </motion.div>

            <motion.p className="hero-description" variants={staggerItemVariants}>
              A computer science graduate passionate about Software Engineering, Full-Stack development, Quality Assurance, and AI. I build responsive web systems and clean mobile applications to solve real-world problems.
            </motion.p>

            <motion.div className="hero-actions" variants={staggerItemVariants}>
              <a href="#contact" className="btn-primary">Get In Touch</a>
              <a href="#projects" className="btn-secondary">View My Work</a>
            </motion.div>

            <motion.div className="hero-stats" variants={staggerItemVariants}>
              <div className="stat-item">
                <span className="stat-value">7+</span>
                <span className="stat-label">Projects</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">15+</span>
                <span className="stat-label">Technologies</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">4</span>
                <span className="stat-label">Years Learning</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div className="hero-visual" variants={heroVisualVariants}>
            <div className="visual-backdrop-circle"></div>
            
            <div className="visual-floating-badge badge-1">
              <div className="badge-icon"><Icons.BookOpen /></div>
              <div className="badge-text">
                <div className="badge-title">BSc Computer Science</div>
                <div className="badge-subtitle">Univ. of Bedfordshire</div>
              </div>
            </div>

            <div className="visual-floating-badge badge-2">
              <div className="badge-icon"><Icons.Award /></div>
              <div className="badge-text">
                <div className="badge-title">HND in IT</div>
                <div className="badge-subtitle">SLIIT City Uni</div>
              </div>
            </div>

            <div className="avatar-wrapper">
              <div className="avatar-inner">
                <img 
                  src={`${import.meta.env.BASE_URL}developer_avatar.png`}
                  alt="Govarthan Subaharan Portrait Illustration" 
                  className="avatar-image"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* --- About Me Section --- */}
      <motion.section
        id="about"
        style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.14 }}
      >
        <div className="ambient-glow-right"></div>
        <div className="container">
          <div className="section-title-wrapper">
            {/* <span className="section-subtitle">Biography</span> */}
            <h2 className="section-title">About Me</h2>
          </div>

          <div className="about-grid">
            <div className="about-info">
              <h3>Who I Am</h3>
              <p className="about-text">
                I am a graduate in <strong>BSc (Hons) in Computer Science</strong> from the <strong>University of Bedfordshire</strong>, with a strong academic background and a deep-seated passion for exploring emerging technologies.
              </p>
              <p className="about-text">
                My professional goal is to contribute to impactful software solutions while constantly expanding my skillset in a collaborative, forward-thinking environment. I specialize in building responsive web applications, building mobile applications, applying software testing and quality assurance practices, and exploring Artificial Intelligence and Machine Learning to deliver reliable, high-quality solutions.
              </p>
              
              <h3 style={{ marginTop: '2.5rem', marginBottom: '1.25rem' }}>Education Journey</h3>
              <div className="education-timeline">
                <div className="education-item">
                  <div className="timeline-dot"></div>
                  <h4 className="edu-school">University of Bedfordshire</h4>
                  <div className="edu-degree">BSc (Hons) in Computer Science</div>
                  <div className="edu-meta">
                    <span>📅 2025 - 2026</span>
                    <span>📍 Colombo, Sri Lanka</span>
                  </div>
                </div>

                <div className="education-item">
                  <div className="timeline-dot"></div>
                  <h4 className="edu-school">SLIIT City Uni</h4>
                  <div className="edu-degree">Higher National Diploma in Information Technology</div>
                  <div className="edu-meta">
                    <span>📅 2022 - 2025</span>
                    <span>📍 Colombo, Sri Lanka</span>
                  </div>
                </div>
              </div>
            </div>

            <motion.div className="values-grid" variants={staggerContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.14 }}>
              <motion.div className="value-card" variants={staggerItemVariants}>
                <div className="value-icon">
                  <Icons.Code />
                </div>
                <h4 className="value-title">Full-Stack Development</h4>
                <p className="value-description">Experienced in building responsive frontend interfaces and scalable backend solutions using React, Node.js, Express.js, PHP, and Spring Boot.</p>
              </motion.div>

              <motion.div className="value-card" variants={staggerItemVariants}>
                <div className="value-icon">
                  <Icons.Cpu />
                </div>
                <h4 className="value-title">AI & Data Science</h4>
                <p className="value-description">Experienced in waste classification and NLP models using TensorFlow, Computer Vision, and Python.</p>
              </motion.div>

              <motion.div className="value-card" variants={staggerItemVariants}>
                <div className="value-icon">
                  <Icons.Terminal />
                </div>
                <h4 className="value-title">Quality Assurance</h4>
                <p className="value-description">Passionate about checking requirements, code testability, and delivering bug-free client experiences.</p>
              </motion.div>

              <motion.div className="value-card" variants={staggerItemVariants}>
                <div className="value-icon">
                  <Icons.Layers />
                </div>
                <h4 className="value-title">Adaptable & Driven</h4>
                <p className="value-description">Able to quickly pick up new language stacks, collaborate in team environments, and problem solve.</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* --- Skills Section --- */}
      <motion.section
        id="skills"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.14 }}
      >
        <div className="container">
          <div className="section-title-wrapper">
            {/* <span className="section-subtitle">Proficiencies</span> */}
            <h2 className="section-title">My Skills & Stack</h2>
          </div>

          <div className="skills-container">
            <div className="skills-tabs">
              {skillCategories.map(cat => (
                <button 
                  key={cat.id} 
                  className={`skills-tab-btn ${activeSkillCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setActiveSkillCategory(cat.id)}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {activeSkillCategory === 'All' ? (
              // Structured categorized display for "All Skills"
              <motion.div className="skills-grid" variants={staggerContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.14 }}>
                {categoriesList.map(category => (
                  <motion.div className="skill-category-card" key={category} variants={staggerItemVariants}>
                    <h3 className="skill-category-title">
                      <span style={{ color: 'var(--accent-primary)', display: 'inline-flex' }}>
                        {getCategoryIcon(category)}
                      </span>
                      {category === 'Tools' ? 'Tools' : category}
                    </h3>
                    <div className="skill-list">
                      {skillsData
                        .filter(skill => skill.category === category)
                        .map(skill => (
                          <span className="skill-tag" key={skill.name}>{skill.name}</span>
                        ))
                      }
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              // Filtered list display for active category tabs
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', maxWidth: '800px', margin: '0 auto' }}>
                {filteredSkills.map(skill => (
                  <div key={skill.name} className="contact-card" style={{ padding: '0.75rem 1.5rem', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <div style={{ color: 'var(--accent-primary)', display: 'flex' }}>{skill.icon}</div>
                    <span style={{ fontWeight: 600, fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>{skill.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.section>

      {/* --- Projects Section --- */}
      <motion.section
        id="projects"
        style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.12 }}
      >
        <div className="container">
          <div className="section-title-wrapper">
            {/* <span className="section-subtitle">Portfolio Showcase</span> */}
            <h2 className="section-title">Recent Projects</h2>
          </div>

          <div className="projects-filters">
            {projectFilters.map(filter => (
              <button
                key={filter}
                className={`filter-btn ${activeProjectFilter === filter ? 'active' : ''}`}
                onClick={() => setActiveProjectFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          <motion.div className="projects-grid" variants={staggerContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
            {filteredProjects.map((project, index) => (
              <motion.article className="project-card" key={index} variants={staggerItemVariants}>
                <div className="project-visual">
                  <span className="project-badge-top">{project.category}</span>
                  <div className="project-visual-pattern">
                    {project.gfx}
                  </div>
                </div>

                <div className="project-details">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.25rem' }}>
                    <h3 className="project-title">{project.title}</h3>
                    <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)' }}>{project.date}</span>
                  </div>
                  <h4 style={{ fontSize: '0.9rem', color: 'var(--accent-primary)', fontWeight: 500, marginBottom: '1rem', fontFamily: 'var(--font-mono)' }}>
                    {project.subtitle}
                  </h4>
                  <p className="project-desc">{project.description}</p>
                  
                  <div className="project-tech">
                    {project.tech.map((t, idx) => (
                      <span className="tech-tag" key={idx}>{t}</span>
                    ))}
                  </div>

                  <div className="project-links">
                    <a href={project.link} className="project-link" target="_blank" rel="noopener noreferrer">
                      <span>View Project Demo</span>
                      <Icons.ExternalLink />
                    </a>
                    {project.github && (
                      <a href={project.github} className="project-link" target="_blank" rel="noopener noreferrer">
                        <Icons.Github size={14} />
                        <span>View Source Code</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* --- Contact Section --- */}
      <motion.section
        id="contact"
        style={{ background: 'var(--bg-primary)', borderTop: '1px solid var(--border-color)' }}
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.14 }}
      >
        <div className="ambient-glow"></div>
        <div className="container contact-grid">
          <div className="contact-info">
            <div className="contact-header">
              <span className="section-subtitle">Get In Touch</span>
              <h3>Let's Build Something Great Together</h3>
              <p className="contact-intro">
                Whether you have a Software Engineering, Full-Stack, or QA opportunity, a software project, or simply want to connect, feel free to send me a message.
              </p>
            </div>

            <div className="contact-methods">
              <div className="contact-card">
                <div className="contact-card-icon"><Icons.Mail /></div>
                <div className="contact-card-details">
                  <span className="contact-label">Email Me</span>
                  <a href="mailto:subakarankovarthan29@gmail.com" className="contact-value">subakarankovarthan29@gmail.com</a>
                </div>
              </div>

              <div className="contact-card">
                <div className="contact-card-icon"><Icons.Phone /></div>
                <div className="contact-card-details">
                  <span className="contact-label">Call / WhatsApp</span>
                  <a href="tel:+94742815024" className="contact-value">(+94) 742815024</a>
                </div>
              </div>

              <div className="contact-card">
                <div className="contact-card-icon"><Icons.MapPin /></div>
                <div className="contact-card-details">
                  <span className="contact-label">Location</span>
                  <span className="contact-value">Jaffna, Sri Lanka</span>
                </div>
              </div>
            </div>

            <div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Follow Me</p>
              <div className="social-links">
                <a href="https://github.com/govarthan29" target="_blank" rel="noopener noreferrer" className="social-btn" title="GitHub Profile" aria-label="GitHub Profile">
                  <Icons.Github />
                </a>
                <a href="https://linkedin.com/in/govarthan29" target="_blank" rel="noopener noreferrer" className="social-btn" title="LinkedIn Profile" aria-label="LinkedIn Profile">
                  <Icons.Linkedin />
                </a>
              </div>
            </div>
          </div>

          <div className="contact-form-wrapper">
            <h4 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Send Me A Message</h4>
            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="name" className="form-label">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  className="form-control" 
                  placeholder="Your Name" 
                  value={formData.name}
                  onChange={handleInputChange}
                  required 
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  className="form-control" 
                  placeholder="name@example.com" 
                  value={formData.email}
                  onChange={handleInputChange}
                  required 
                />
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  className="form-control" 
                  placeholder="Hi Govarthan, I'd like to discuss a job opportunity..." 
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>

              <style>{`
                @keyframes spin-loader {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
                .spinner-loader {
                  width: 16px;
                  height: 16px;
                  border: 2px solid rgba(255,255,255,0.3);
                  border-top: 2px solid currentColor;
                  border-radius: 50%;
                  animation: spin-loader 0.8s linear infinite;
                }
              `}</style>

              <button type="submit" className="btn-primary form-submit-btn" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <span className="spinner-loader"></span>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Icons.Send />
                    <span>Send Message</span>
                  </>
                )}
              </button>

              {submitStatus === "success" && (
                <div className="success-message">
                  Thank you! Your message has been sent successfully. I will get back to you shortly!
                </div>
              )}

              {submitStatus === "error" && (
                <div className="success-message" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>
                  Oops! Something went wrong. Please try again or email directly to subakarankovarthan29@gmail.com
                </div>
              )}
            </form>
          </div>
        </div>
      </motion.section>

      {/* --- Footer --- */}
      <footer className="footer">
        <div className="container footer-container">
          
          <p>© {new Date().getFullYear()} Govarthan Subaharan. All rights reserved. Designed & Developed by Govarthan Subaharan.</p>
          
          <button 
            className="back-to-top-btn" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
            title="Back to top"
          >
            ↑
          </button>
        </div>
      </footer>
    </>
  );
}

export default App;

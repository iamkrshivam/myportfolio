import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, FileText, X, Menu, Sun, Moon, Maximize2, Minimize2, ExternalLink, Award, Briefcase, GraduationCap, Code, Server, Shield, BrainCircuit, Rss } from 'lucide-react';

// --- EMBEDDED DATA (Normally in JSON files) ---

const skillsData = {
  "Operating Systems": [
    { name: "Linux (Debian/Arch)", proficiency: 95 },
    { name: "Windows Server", proficiency: 85 },
    { name: "macOS", proficiency: 80 },
  ],
  "Networking": [
    { name: "TCP/IP Suite", proficiency: 90 },
    { name: "Wireshark", proficiency: 88 },
    { name: "Firewalls (pfSense)", proficiency: 82 },
  ],
  "Security Tools": [
    { name: "Nmap", proficiency: 95 },
    { name: "Metasploit", proficiency: 85 },
    { name: "Burp Suite", proficiency: 90 },
    { name: "John the Ripper", proficiency: 80 },
  ],
  "Languages & Web Security": [
    { name: "Python", proficiency: 90 },
    { name: "Bash", proficiency: 85 },
    { name: "JavaScript", proficiency: 75 },
    { name: "OWASP Top 10", proficiency: 88 },
  ]
};

const projectsData = [
  {
    id: 1,
    title: "Vulnerability Scanner",
    summary: "A Python-based network vulnerability scanner that identifies open ports and common misconfigurations.",
    tags: ["Python", "Nmap", "Socket"],
    github: "https://github.com/shivam-kumar/vuln-scanner",
    demo: null,
    badge: null,
    details: {
      problem: "Manually scanning for vulnerabilities across a network is time-consuming. An automated tool was needed to quickly identify low-hanging fruit and potential entry points.",
      tools: ["Python", "python-nmap library", "argparse"],
      steps: [
        "Developed a CLI for specifying target hosts and port ranges.",
        "Integrated the python-nmap library to perform various scan types (SYN, UDP, TCP).",
        "Parsed scan results to identify open ports and services.",
        "Cross-referenced service versions with a basic vulnerability database (mocked).",
        "Generated a color-coded report in the terminal highlighting critical, high, and medium risks."
      ],
      results: "The tool successfully identified open ports, outdated service versions, and default credentials on test lab machines, reducing initial reconnaissance time by 70%.",
      learnings: "Gained a deeper understanding of network scanning techniques and the complexities of parsing and interpreting Nmap output programmatically. Learned the importance of robust error handling for network timeouts and permission issues.",
      image: "https://placehold.co/1200x600/0a0a0a/00ff7f?text=Vuln+Scanner+CLI"
    }
  },
  {
    id: 2,
    title: "Phishing Email Analyzer",
    summary: "A tool to analyze email headers and content to detect potential phishing attempts.",
    tags: ["Python", "RegEx", "Email Security"],
    github: "https://github.com/shivam-kumar/phishing-analyzer",
    demo: null,
    badge: null,
    details: {
      problem: "Phishing remains a major threat. This project aimed to create a tool that could automatically analyze suspicious emails to identify red flags without needing to open potentially malicious links.",
      tools: ["Python 3", "email library", "regular expressions", "requests"],
      steps: [
        "Parsed raw email files (.eml) to extract headers, body, and attachments.",
        "Analyzed 'Received' headers to trace the email's path and identify forged sender information.",
        "Used regular expressions to scan the email body for suspicious patterns (e.g., urgency, mismatched links).",
        "Extracted all URLs and checked them against a mock phishing domain blacklist.",
        "Calculated a risk score based on the number and severity of red flags found."
      ],
      results: "Successfully identified 9 out of 10 sample phishing emails in a test set, flagging suspicious headers, link shorteners, and keyword triggers.",
      learnings: "Learned the intricacies of the SMTP protocol and email header structure. This project emphasized the power of RegEx in text analysis and the challenges of creating a detection logic that minimizes false positives.",
      image: "https://placehold.co/1200x600/0a0a0a/00ff7f?text=Email+Analyzer+Output"
    }
  },
  {
    id: 3,
    title: "CTF Write-up Blog",
    summary: "A personal blog built with Astro and MDX to document solutions for CTF challenges.",
    tags: ["Astro", "MDX", "Tailwind CSS", "Vercel"],
    github: "https://github.com/shivam-kumar/ctf-blog",
    demo: "https://example-blog.vercel.app/",
    badge: "TryHackMe",
    details: {
        problem: "Keeping track of learnings from various CTF challenges is difficult. A centralized, well-documented blog is needed to solidify knowledge and share insights with the community.",
        tools: ["Astro Framework", "React", "MDX", "Tailwind CSS", "Vercel"],
        steps: [
            "Set up a new Astro project for its content-focused architecture and performance benefits.",
            "Designed a clean, markdown-centric layout for write-ups.",
            "Configured MDX to allow for interactive components within blog posts (e.g., custom code blocks).",
            "Implemented tagging and categorization for easy navigation of challenges.",
            "Automated deployment to Vercel via Git push."
        ],
        results: "A live, performant blog with several detailed write-ups from TryHackMe and HackTheBox challenges. The site serves as both a personal knowledge base and a portfolio piece.",
        learnings: "Mastered the Astro framework and the benefits of a static-first approach. Learned how to effectively use MDX to blend prose with interactive code examples, improving the quality of technical documentation.",
        image: "https://placehold.co/1200x600/0a0a0a/00ff7f?text=CTF+Blog+Homepage"
    }
  },
  {
      id: 4,
      title: "Secure Auth API",
      summary: "A Node.js REST API with JWT-based authentication and role-based access control.",
      tags: ["Node.js", "Express", "JWT", "MongoDB", "RBAC"],
      github: "https://github.com/shivam-kumar/secure-api",
      demo: null,
      badge: null,
      details: {
          problem: "Many web applications lack proper authentication and authorization mechanisms. This project aimed to build a reusable, secure API boilerplate implementing modern security best practices.",
          tools: ["Node.js", "Express.js", "MongoDB", "Mongoose", "JSON Web Tokens (JWT)", "bcrypt.js"],
          steps: [
              "Designed a user schema with secure password hashing using bcrypt.",
              "Implemented registration and login endpoints that issue signed JWTs upon successful authentication.",
              "Created middleware to protect routes by verifying JWTs from the Authorization header.",
              "Implemented a basic Role-Based Access Control (RBAC) system (e.g., 'user' vs 'admin' roles).",
              "Added rate limiting and input validation to prevent common API abuses."
          ],
          results: "A robust API foundation with secure user management. The system correctly issues and validates tokens, protects routes, and enforces role-based permissions.",
          learnings: "Gained hands-on experience with the entire authentication/authorization lifecycle, from password hashing to token management. Understood the stateless nature of JWTs and the importance of security headers and middleware in an Express application.",
          image: "https://placehold.co/1200x600/0a0a0a/00ff7f?text=API+Endpoint+Security"
      }
  }
];


// --- COMPONENTS ---

const MatrixCanvas = React.memo(({ isPaused, opacity, speed = 4 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const characters = katakana + latin + nums;

    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    const draw = () => {
      // Adjusted opacity for a more subtle fade
      ctx.fillStyle = `rgba(0, 0, 0, ${opacity || 0.15})`; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#00ff7f';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };
    
    let frameCount = 0;
    const animate = () => {
      if (!isPaused) {
        if (frameCount % speed === 0) {
          draw();
        }
        frameCount++;
      }
      animationFrameId = window.requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isPaused, opacity, speed]);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />;
});


const Header = ({ activeSection, setActiveSection, theme, toggleTheme, isMatrixPaused, toggleMatrix }) => {
  const [isOpen, setIsOpen] = useState(false);
  const sections = ['home', 'about', 'skills', 'projects', 'contact'];

  const NavLink = ({ section }) => (
    <a
      href={`#${section}`}
      onClick={(e) => {
        e.preventDefault();
        document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(section);
        setIsOpen(false);
      }}
      className={`capitalize relative px-3 py-2 text-sm transition-colors duration-300 ${activeSection === section ? 'text-neon-green' : 'text-gray-300 hover:text-neon-green'}`}
    >
      {section}
      {activeSection === section && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-neon-green"
          layoutId="underline"
        />
      )}
    </a>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-4 px-4 md:px-8 bg-black/30 backdrop-blur-md border-b border-gray-800">
      <div className="container mx-auto flex justify-between items-center">
        <a href="#home" onClick={() => setActiveSection('home')} className="text-xl font-bold text-neon-green font-mono tracking-tighter">
          &lt;SK /&gt;
        </a>
        <nav className="hidden md:flex items-center space-x-2 border border-gray-700 bg-gray-900/50 rounded-full px-2">
          {sections.map((s) => <NavLink key={s} section={s} />)}
        </nav>
        <div className="flex items-center space-x-2">
           <button onClick={toggleMatrix} className="p-2 rounded-full hover:bg-gray-800 transition-colors" aria-label="Toggle Matrix Animation">
            {isMatrixPaused ? <Maximize2 className="w-5 h-5 text-gray-400" /> : <Minimize2 className="w-5 h-5 text-neon-green" />}
          </button>
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-800 transition-colors" aria-label="Toggle Theme">
            {theme === 'dark' ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-300" />}
          </button>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-neon-green">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden mt-4 bg-gray-900/80 backdrop-blur-sm rounded-lg p-4"
          >
            <nav className="flex flex-col space-y-4">
              {sections.map((s) => <NavLink key={s} section={s} />)}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};


const Hero = () => {
    const BlinkingCursor = () => (
      <motion.span
        className="ml-1 text-neon-green"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
      >
        _
      </motion.span>
    );
  
    return (
      <section id="home" className="min-h-screen flex items-center justify-center container mx-auto px-4">
        <div className="text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4"
          >
            Shivam Kumar
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg md:text-2xl text-neon-green font-mono mb-6"
          >
            Cybersecurity Student & Aspiring Ethical Hacker<BlinkingCursor />
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="max-w-2xl mx-auto text-gray-300 mb-8"
          >
            Building secure systems and exploring digital defenses. Passionate about ethical hacking, digital forensics, and network security.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-primary">
              <FileText className="mr-2" size={20} /> Download Resume
            </a>
            <a href="#contact" className="btn-secondary">
              <Mail className="mr-2" size={20} /> Contact Me
            </a>
            <a href="https://github.com/shivam-kumar" target="_blank" rel="noopener noreferrer" className="btn-icon" aria-label="GitHub">
              <Github size={22}/>
            </a>
            <a href="https://linkedin.com/in/shivam-kumar" target="_blank" rel="noopener noreferrer" className="btn-icon" aria-label="LinkedIn">
              <Linkedin size={22}/>
            </a>
          </motion.div>
        </div>
      </section>
    );
  };
  

  const SectionTitle = ({ icon: Icon, children }) => (
    <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-white mb-8 flex items-center gap-3 justify-center">
        <Icon className="text-neon-green" size={32} />
        {children}
    </motion.h2>
  );

  
const About = () => (
    <section id="about" className="py-20 container mx-auto px-4">
        <SectionTitle icon={BrainCircuit}>About Me</SectionTitle>
        <div className="grid md:grid-cols-3 gap-12 items-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="col-span-1 flex justify-center"
            >
                <div className="relative w-64 h-64">
                    <div className="absolute inset-0 bg-neon-green rounded-2xl transform -rotate-6"></div>
                    <img 
                        src="https://placehold.co/400x400/0a0a0a/ffffff?text=SK" 
                        alt="Shivam Kumar" 
                        className="relative w-full h-full object-cover rounded-2xl border-4 border-gray-800"
                    />
                </div>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="md:col-span-2 text-gray-300 space-y-4"
            >
                <p>
                    I am a dedicated cybersecurity student with a strong fascination for the intricacies of digital security. My journey began with a simple curiosity about how computer networks function, which quickly evolved into a passion for understanding and mitigating the threats that exist within them.
                </p>
                <p>
                    I thrive on the challenge of problem-solving, whether it's dissecting malware, finding vulnerabilities in a web application, or architecting a secure network. I am constantly learning and honing my skills through hands-on projects, Capture The Flag (CTF) competitions, and online labs.
                </p>
                <p className="font-semibold text-white">My core focus areas are:</p>
                <ul className="list-none space-y-2">
                    <li className="flex items-start"><Shield className="text-neon-green w-5 h-5 mr-3 mt-1 flex-shrink-0" /><span><strong className="text-white">Ethical Hacking & Penetration Testing:</strong> Proactively identifying and exploiting vulnerabilities to strengthen security.</span></li>
                    <li className="flex items-start"><Server className="text-neon-green w-5 h-5 mr-3 mt-1 flex-shrink-0" /><span><strong className="text-white">Network Security:</strong> Designing and defending networks against unauthorized access and attacks.</span></li>
                    <li className="flex items-start"><Code className="text-neon-green w-5 h-5 mr-3 mt-1 flex-shrink-0" /><span><strong className="text-white">Secure Software Development:</strong> Writing secure code and understanding the developer's perspective in cybersecurity.</span></li>
                </ul>
            </motion.div>
        </div>
    </section>
);


const Skills = () => (
    <section id="skills" className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-4">
            <SectionTitle icon={Code}>Technical Skills</SectionTitle>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {Object.entries(skillsData).map(([category, skills], i) => (
                    <motion.div 
                        key={category}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="glassmorphism-card p-6"
                    >
                        <h3 className="text-xl font-bold text-neon-green mb-4">{category}</h3>
                        <ul className="space-y-4">
                            {skills.map(skill => (
                                <li key={skill.name}>
                                    <p className="text-white mb-1">{skill.name}</p>
                                    <div className="w-full bg-gray-700 rounded-full h-2.5">
                                        <div 
                                            className="bg-neon-green h-2.5 rounded-full" 
                                            style={{ width: `${skill.proficiency}%` }}
                                        ></div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);


const Projects = ({ onProjectSelect }) => {
    const getBadge = (badgeName) => {
      if (badgeName === 'TryHackMe') {
        return <span className="absolute top-3 right-3 bg-red-800 text-white text-xs font-bold px-2 py-1 rounded-full">TryHackMe</span>;
      }
      return null;
    };
  
    return (
      <section id="projects" className="py-20">
        <div className="container mx-auto px-4">
          <SectionTitle icon={Shield}>Projects & Labs</SectionTitle>
          <div className="grid md:grid-cols-2 gap-8">
            {projectsData.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glassmorphism-card overflow-hidden group"
              >
                <div className="p-6">
                    <div className="relative">
                        <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                        {getBadge(project.badge)}
                    </div>
                  <p className="text-gray-400 mb-4">{project.summary}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map(tag => (
                      <span key={tag} className="bg-gray-800 text-neon-green text-xs font-mono px-2 py-1 rounded-full">{tag}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-4">
                    <button onClick={() => onProjectSelect(project)} className="btn-primary flex-1">
                      Case Study
                    </button>
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-icon" aria-label="GitHub Repository">
                        <Github size={20} />
                      </a>
                    )}
                    {project.demo && (
                      <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn-icon" aria-label="Live Demo">
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  

  const ProjectModal = ({ project, onClose }) => {
    if (!project) return null;
  
    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);


    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors" aria-label="Close modal">
              <X size={24} />
            </button>
            <h2 className="text-3xl font-bold text-neon-green mb-4">{project.title}</h2>
            <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map(tag => (
                    <span key={tag} className="bg-gray-800 text-neon-green text-xs font-mono px-2 py-1 rounded-full">{tag}</span>
                ))}
            </div>
            
            <img src={project.details.image} alt={project.title} className="rounded-lg mb-6 w-full object-cover aspect-video" />

            <div className="text-gray-300 space-y-6">
                <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Problem Statement</h3>
                    <p>{project.details.problem}</p>
                </div>
                 <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Tools & Technologies</h3>
                    <p>{project.details.tools.join(', ')}</p>
                </div>
                <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Process</h3>
                    <ul className="list-disc list-inside space-y-2 pl-2">
                        {project.details.steps.map((step, i) => <li key={i}>{step}</li>)}
                    </ul>
                </div>
                 <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Results</h3>
                    <p>{project.details.results}</p>
                </div>
                 <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Lessons Learned</h3>
                    <p>{project.details.learnings}</p>
                </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  };


  const MiscSections = () => {
    const certifications = [
        { name: "CompTIA Security+", issuer: "CompTIA", date: "2024", link: "#" },
        { name: "eLearnSecurity Junior Penetration Tester (eJPT)", issuer: "INE", date: "2023", link: "#" }
    ];
    const experiences = [
        { role: "Cybersecurity Intern", org: "Secure Solutions Inc.", duration: "Summer 2024", tasks: ["Assisted with vulnerability assessments and phishing simulations.", "Monitored network traffic using SIEM tools.", "Contributed to security documentation and policy updates."] }
    ];
    const education = {
        degree: "Bachelor of Science in Cybersecurity",
        college: "University of Technology",
        courses: ["Network Security", "Ethical Hacking", "Cryptography", "Digital Forensics"]
    };

    return (
        <section id="experience-education" className="py-20 bg-gray-900/50">
            <div className="container mx-auto px-4 grid md:grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Experience */}
                <div className="lg:col-span-1">
                    <SectionTitle icon={Briefcase}>Experience</SectionTitle>
                    {experiences.map((exp, i) => (
                        <motion.div key={i} className="glassmorphism-card p-6" initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
                            <h3 className="font-bold text-white text-lg">{exp.role}</h3>
                            <p className="text-neon-green font-mono">{exp.org}</p>
                            <p className="text-sm text-gray-400 mb-3">{exp.duration}</p>
                            <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                                {exp.tasks.map((task, ti) => <li key={ti}>{task}</li>)}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                {/* Education */}
                <div className="lg:col-span-1">
                     <SectionTitle icon={GraduationCap}>Education</SectionTitle>
                     <motion.div className="glassmorphism-card p-6" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
                        <h3 className="font-bold text-white text-lg">{education.degree}</h3>
                        <p className="text-neon-green font-mono">{education.college}</p>
                        <p className="text-sm text-gray-400 mt-3 mb-2">Key Courses:</p>
                        <div className="flex flex-wrap gap-2">
                           {education.courses.map(course => <span key={course} className="bg-gray-800 text-neon-green text-xs font-mono px-2 py-1 rounded-full">{course}</span>)}
                        </div>
                     </motion.div>
                </div>

                {/* Certifications */}
                <div className="lg:col-span-1">
                    <SectionTitle icon={Award}>Certifications</SectionTitle>
                    <motion.div className="glassmorphism-card p-6" initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
                        <ul className="space-y-4">
                            {certifications.map((cert, i) => (
                                <li key={i}>
                                    <a href={cert.link} target="_blank" rel="noopener noreferrer" className="flex items-center group">
                                        <Award className="text-neon-green w-6 h-6 mr-4"/>
                                        <div>
                                            <p className="text-white font-semibold group-hover:text-neon-green transition-colors">{cert.name}</p>
                                            <p className="text-sm text-gray-400">{cert.issuer} - {cert.date}</p>
                                        </div>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </div>
        </section>
    )
  }

  const Contact = () => {
    return (
        <section id="contact" className="py-20">
            <div className="container mx-auto px-4 text-center">
                <SectionTitle icon={Mail}>Get In Touch</SectionTitle>
                <motion.p 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-gray-300 max-w-2xl mx-auto mb-8">
                    I'm always open to discussing new opportunities, projects, or just chatting about cybersecurity. Feel free to reach out.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <a href="mailto:shivam.kumar.dev@example.com" className="btn-primary text-lg inline-block">
                        shivam.kumar.dev@example.com
                    </a>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="flex justify-center gap-6 mt-8"
                >
                    <a href="https://github.com/shivam-kumar" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-neon-green transition-colors" aria-label="GitHub"><Github size={28} /></a>
                    <a href="https://linkedin.com/in/shivam-kumar" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-neon-green transition-colors" aria-label="LinkedIn"><Linkedin size={28} /></a>
                    <a href="https://tryhackme.com/p/shivam" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-neon-green transition-colors" aria-label="TryHackMe"><Rss size={28} /></a>
                </motion.div>
            </div>
        </section>
    );
};

const Footer = () => (
    <footer className="py-6 border-t border-gray-800 bg-black">
        <div className="container mx-auto px-4 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} Shivam Kumar. All Rights Reserved.</p>
            <p className="text-xs mt-1">Built with React & Tailwind CSS. Inspired by the matrix.</p>
        </div>
    </footer>
);

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [isMatrixPaused, setIsMatrixPaused] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    // For this single-file app, we'll default to dark.
    // In a real app, you'd check localStorage.
    document.documentElement.classList.add('dark');
    setTheme('dark');
  }, []);
  
  const toggleTheme = () => {
      // Theme toggling is disabled in this simplified dark-mode-first version.
      // In a real app, you'd implement the logic here.
  };

  const toggleMatrix = () => setIsMatrixPaused(p => !p);

  const handleScroll = useCallback(() => {
    const sections = ['home', 'about', 'skills', 'projects', 'contact'];
    let current = 'home';
    for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.getBoundingClientRect().top < window.innerHeight / 2) {
            current = section;
        }
    }
    setActiveSection(current);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div className={`text-gray-100 font-sans`}>
      <MatrixCanvas isPaused={isMatrixPaused} opacity={0.15} speed={8} />
      
      {/* Content wrapper with a semi-transparent black background */}
      <div className="relative z-10 bg-black/70 min-h-screen"> 
        <Header 
          activeSection={activeSection} 
          setActiveSection={setActiveSection}
          theme={theme}
          toggleTheme={toggleTheme}
          isMatrixPaused={isMatrixPaused}
          toggleMatrix={toggleMatrix}
        />
        
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects onProjectSelect={setSelectedProject} />
          <MiscSections />
          <Contact />
        </main>

        <Footer />
        
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      </div>
    </div>
  );
}


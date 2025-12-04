import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  Shield, 
  Code, 
  Globe, 
  Cpu, 
  ExternalLink, 
  Mail, 
  Linkedin, 
  Github, 
  FileText, 
  Server,
  Lock,
  Menu,
  X,
  ChevronRight,
  Download
} from 'lucide-react';

const Portfolio = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation Links
  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Contact', href: '#contact' },
  ];

  // Resume Data - Extracted from old_app.jsx
  const personalInfo = {
    name: "Shivam Kumar",
    title: "B.Tech CSE (Cybersecurity) Student",
    tagline: "I explore cybersecurity, ethical hacking, and pentesting, turning complex challenges into practical solutions while constantly learning and innovating in the digital world.",
    location: "Gaya, Bihar, India",
    email: "skgp11808@gmail.com",
    linkedin: "https://www.linkedin.com/in/shivamkumar-dce-cybersecurity/",
    github: "https://github.com/iamkrshivam",
    resume: "/resume.pdf"
  };

  // Skills - Mapped from old_app.jsx
  const skills = [
    {
      category: "Languages & Scripting",
      icon: <Code className="w-6 h-6 text-emerald-400" />,
      items: ["Python", "Bash", "Linux", "HTML", "CSS", "JavaScript", "C"]
    },
    {
      category: "Security Tools",
      icon: <Shield className="w-6 h-6 text-emerald-400" />,
      items: ["Wireshark", "Nmap", "Metasploit", "Ettercap", "Burp Suite", "Ghidra"]
    },
    {
      category: "Networking & Protocols",
      icon: <Globe className="w-6 h-6 text-emerald-400" />,
      items: ["TCP/IP", "OSI Model", "IPv4/IPv6", "Network Troubleshooting", "CCNA Concepts"]
    },
    {
      category: "Operating Systems",
      icon: <Terminal className="w-6 h-6 text-emerald-400" />,
      items: ["Windows", "Linux (Debian/Parrot/Kali)", "macOS", "Android", "Termux"]
    },
    {
      category: "Soft Skills",
      icon: <Cpu className="w-6 h-6 text-emerald-400" />,
      items: ["Problem Solving", "Analytical Thinking", "Attention to Detail", "Self-Learning", "Curiosity"]
    }
  ];

  // Experience - Extracted from old_app.jsx
  const experiences = [
    {
      company: "Tata (via Forage)",
      role: "Cybersecurity Analyst Intern",
      period: "2025",
      type: "Virtual Job Sim",
      description: "Performed vulnerability assessment and incident response exercises. Practiced identity and access management (IAM) and network monitoring tasks, gaining insight into real-world cybersecurity operations."
    },
    {
      company: "Mastercard (via Forage)",
      role: "Cybersecurity Analyst Intern",
      period: "2025",
      type: "Virtual Job Sim",
      description: "Simulated SOC operations and cyber incident handling. Conducted vulnerability management and access control analysis, working on digital risk assessment and mitigation strategies."
    },
    {
      company: "AIG (via Forage)",
      role: "Cybersecurity Intern",
      period: "2025",
      type: "Virtual Job Sim",
      description: "Supported digital security operations and cyber risk management activities. Applied practical cybersecurity concepts to simulated environments to enhance system resilience."
    }
  ];

  // Projects - Extracted from old_app.jsx
  const projects = [
    {
      title: "Network Port Scanner",
      tech: ["Python", "Networking", "Scapy", "Port Scanning"],
      description: "Fast interactive port scanner supporting TCP/UDP scanning, auto timeouts, and banner grabbing/SYN scanning. Features JSON/CSV export capabilities for reporting.",
      link: "https://github.com/iamkrshivam/Port_scanner"
    },
    {
      title: "Network Monitor Tool",
      tech: ["Python", "Networking", "Cybersecurity"],
      description: "Created a lightweight Python tool to monitor network traffic and log unusual activity. Designed for practice in analyzing packet flow and identifying anomalies.",
      link: "https://github.com/iamkrshivam/network-monitor-tool"
    },
    {
      title: "Password Manager",
      tech: ["Python", "Encryption", "Security"],
      description: "Built a secure password manager to store and retrieve credentials using Python and file encryption techniques, ensuring data confidentiality and integrity.",
      link: "https://github.com/iamkrshivam/my-password-manager"
    },
    {
      title: "Linux Security Script",
      tech: ["Bash", "Linux", "Automation"],
      description: "Developed a Bash script to automate critical system updates and perform routine basic security checks on Linux environments, streamlining maintenance tasks.",
      link: "https://github.com/iamkrshivam/Linux-Security-Script"
    }
  ];

  // Certifications - Extracted from old_app.jsx
  const certifications = [
    { 
      name: "Ethical Hacker", 
      issuer: "Cisco Networking Academy",
      link: "/Ethical Hacker.pdf"
    },
    { 
      name: "Fortinet Certified Associate", 
      issuer: "Fortinet",
      link: "/Fortinet Certified Associate in Cybersecurity.pdf"
    },
    { 
      name: "Junior Cybersecurity Analyst", 
      issuer: "Cisco Networking Academy",
      link: "/Junior Cybersecurity Analyst Career Path Exam.pdf"
    },
    { 
      name: "Introduction to Cybersecurity", 
      issuer: "Cisco Networking Academy",
      link: "/introtocybersecurity.pdf"
    },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-300 font-sans selection:bg-emerald-500/30">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-900/90 backdrop-blur-md border-b border-slate-800 shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl text-emerald-400 tracking-tighter">
            <Terminal className="w-6 h-6" />
            <span>SHIVAM</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-sm font-medium hover:text-emerald-400 transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-slate-300 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-slate-800 border-b border-slate-700 px-6 py-4 space-y-4">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-slate-300 hover:text-emerald-400 font-medium"
              >
                {link.name}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="about" className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium border border-emerald-500/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Open to Opportunities
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              Hello, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">{personalInfo.name}</span>
            </h1>
            
            <h2 className="text-xl md:text-2xl text-slate-400 font-light">
              {personalInfo.title}
            </h2>
            
            <p className="text-lg text-slate-400 max-w-lg leading-relaxed">
              {personalInfo.tagline}
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <a href="#contact" className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2">
                <Mail className="w-4 h-4" /> Contact Me
              </a>
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg border border-slate-700 transition-all flex items-center gap-2">
                <Github className="w-4 h-4" /> GitHub
              </a>
              <a href={personalInfo.resume} download className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg border border-slate-700 transition-all flex items-center gap-2">
                <Download className="w-4 h-4" /> Resume
              </a>
            </div>
          </div>
          
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative p-8 bg-slate-900 rounded-2xl border border-slate-800 flex flex-col items-center text-center">
              <div className="mb-6 relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full blur opacity-50 animate-pulse"></div>
                <img 
                  src="/Shivam.png" 
                  alt={personalInfo.name} 
                  className="relative w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-2 border-emerald-400"
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = 'https://via.placeholder.com/150?text=SK'; // Fallback image
                  }}
                />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2 justify-center">
                <Terminal className="w-5 h-5 text-emerald-400" />
                Terminal Access
              </h3>
              <div className="font-mono text-sm space-y-2 text-slate-400 text-left">
                <p><span className="text-emerald-400">user@shivam:~$</span> cat about_me.txt</p>
                <p className="pl-4 border-l-2 border-slate-700 italic">
                  "I’m Shivam Kumar, a B.Tech CSE (Cybersecurity) student with a strong interest in ethical hacking, 
                  network security, and digital forensics. Proficient in C, Python, Linux, and penetration testing."
                </p>
                <p><span className="text-emerald-400">user@shivam:~$</span> ./show_status.sh</p>
                <p className="text-emerald-400">&gt;&gt; STATUS: ACTIVE</p>
                <p className="text-emerald-400">&gt;&gt; LOCATION: {personalInfo.location}</p>
                <p className="text-emerald-400">&gt;&gt; FOCUS: VAPT, Blue Teaming, Ethical Hacking</p>
                <span className="inline-block w-2 h-4 bg-emerald-400 animate-pulse"></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-slate-800/50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-2 mb-12">
            <Cpu className="w-6 h-6 text-emerald-400" />
            <h2 className="text-3xl font-bold text-white">Technical Arsenal</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {skills.map((skillGroup, index) => (
              <div key={index} className="bg-slate-900 p-6 rounded-xl border border-slate-800 hover:border-emerald-500/30 transition-colors shadow-sm hover:shadow-md">
                <div className="mb-4 bg-slate-800 w-12 h-12 rounded-lg flex items-center justify-center">
                  {skillGroup.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-4">{skillGroup.category}</h3>
                <ul className="space-y-2">
                  {skillGroup.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-slate-400 text-sm">
                      <ChevronRight className="w-3 h-3 text-emerald-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-12">
            <Server className="w-6 h-6 text-emerald-400" />
            <h2 className="text-3xl font-bold text-white">Professional Experience</h2>
          </div>

          <div className="relative border-l-2 border-slate-800 ml-3 space-y-12">
            {experiences.map((exp, index) => (
              <div key={index} className="relative pl-8">
                {/* Timeline Dot */}
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-900 border-2 border-emerald-500"></div>
                
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                  <span className="text-sm font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20 w-fit mt-1 sm:mt-0">
                    {exp.period}
                  </span>
                </div>
                
                <div className="text-slate-300 font-medium mb-2 flex items-center gap-2">
                  {exp.company} <span className="text-slate-600">•</span> <span className="text-sm text-slate-500">{exp.type}</span>
                </div>
                
                <p className="text-slate-400 leading-relaxed">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-slate-800/50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-2 mb-12">
            <Lock className="w-6 h-6 text-emerald-400" />
            <h2 className="text-3xl font-bold text-white">Security Projects</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="group bg-slate-900 rounded-xl overflow-hidden border border-slate-800 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10">
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 bg-slate-800 rounded-lg group-hover:bg-emerald-500/10 transition-colors">
                      <Code className="w-6 h-6 text-emerald-400" />
                    </div>
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition-colors">
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-slate-400 mb-6 leading-relaxed text-sm">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t, i) => (
                      <span key={i} className="px-3 py-1 text-xs font-medium text-slate-300 bg-slate-800 rounded-full border border-slate-700">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 mb-12">
            <FileText className="w-6 h-6 text-emerald-400" />
            <h2 className="text-3xl font-bold text-white">Certifications</h2>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <a 
                key={index} 
                href={cert.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:bg-slate-800 transition-colors group block"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="h-2 w-12 bg-emerald-500 rounded-full"></div>
                  <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-emerald-400 transition-colors" />
                </div>
                <h3 className="text-white font-bold mb-2 group-hover:text-emerald-400 transition-colors">{cert.name}</h3>
                <p className="text-sm text-slate-400">{cert.issuer}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-slate-800/30">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Let's Secure the Future</h2>
          <p className="text-slate-400 mb-10 text-lg">
            I'm currently looking for internship opportunities or collaborative projects in Cybersecurity.
            Whether you have a question or just want to say hi, my inbox is open!
          </p>
          
          <div className="flex justify-center gap-6 mb-12">
            <a 
              href={`mailto:${personalInfo.email}`}
              className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-lg transition-all shadow-lg shadow-emerald-500/20"
            >
              Say Hello
            </a>
          </div>

          <div className="flex justify-center gap-8 border-t border-slate-800 pt-8">
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-emerald-400 transition-colors flex flex-col items-center gap-2">
              <Linkedin className="w-6 h-6" />
              <span className="text-xs">LinkedIn</span>
            </a>
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-emerald-400 transition-colors flex flex-col items-center gap-2">
              <Github className="w-6 h-6" />
              <span className="text-xs">GitHub</span>
            </a>
            <a href={`mailto:${personalInfo.email}`} className="text-slate-400 hover:text-emerald-400 transition-colors flex flex-col items-center gap-2">
              <Mail className="w-6 h-6" />
              <span className="text-xs">Email</span>
            </a>
          </div>
          
          <div className="mt-12 text-slate-600 text-sm">
            <p>© {new Date().getFullYear()} Shivam Kumar. Built with React & Tailwind.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;

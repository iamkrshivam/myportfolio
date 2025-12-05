import React, { useState, useEffect, useRef } from 'react';

/* --- ICONS (Inline) --- */
const IconWrapper = ({ children, className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    {children}
  </svg>
);

const Menu = ({ className }) => <IconWrapper className={className}><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></IconWrapper>;
const X = ({ className }) => <IconWrapper className={className}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></IconWrapper>;
const Github = ({ className }) => <IconWrapper className={className}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></IconWrapper>;
const Linkedin = ({ className }) => <IconWrapper className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></IconWrapper>;
const Mail = ({ className }) => <IconWrapper className={className}><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></IconWrapper>;
const Terminal = ({ className }) => <IconWrapper className={className}><polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/></IconWrapper>;
const Shield = ({ className }) => <IconWrapper className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></IconWrapper>;
const ChevronDown = ({ className }) => <IconWrapper className={className}><path d="m6 9 6 6 6-6"/></IconWrapper>;
const MapPin = ({ className }) => <IconWrapper className={className}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></IconWrapper>;
const Download = ({ className }) => <IconWrapper className={className}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></IconWrapper>;
const CheckCircle = ({ className }) => <IconWrapper className={className}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></IconWrapper>;
const Globe = ({ className }) => <IconWrapper className={className}><circle cx="12" cy="12" r="10"/><line x1="2" x2="22" y1="12" y2="12"/><path d="a12.2 12.2 0 0 1 8-10 12.2 12.2 0 0 1 4 10 12.2 12.2 0 0 1-4 10 12.2 12.2 0 0 1-8-10z"/></IconWrapper>;
const ExternalLink = ({ className }) => <IconWrapper className={className}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></IconWrapper>;
const FileText = ({ className }) => <IconWrapper className={className}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></IconWrapper>;
const BookOpen = ({ className }) => <IconWrapper className={className}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></IconWrapper>;

/* DATA SOURCE - Extracted from Old Code & Uploads */
const portfolioData = {
  personal: {
    name: "Shivam Kumar",
    title: "Cybersecurity Student & Ethical Hacker",
    tagline: "Securing the digital frontier, one vulnerability at a time.",
    email: "skgp11808@gmail.com",
    phone: "+91 8102092859",
    location: "Gaya, Bihar, India",
    linkedin: "https://www.linkedin.com/in/shivam-kumar-243a39389/",
    github: "https://github.com/iamkrshivam", 
    resumeLink: "/resume.pdf", 
    profileImage: "/Shivam.png", 
    about: "I'm a B.Tech CSE (Cybersecurity) student at Darbhanga College of Engineering (2024-2028) with a relentless passion for ethical hacking, network security, and digital forensics. My technical foundation is backed by world-class training from Harvard CS50, Cisco, and Fortinet. I believe in hands-on application, having gained practical exposure through virtual job simulations with industry giants like Tata, AIG, and Mastercard."
  },
  skills: {
    "Languages & Scripting": ["Python", "Bash", "Linux", "HTML", "CSS", "JavaScript", "C"],
    "Security Tools": ["Wireshark", "Nmap", "Metasploit", "Ettercap", "Burp Suite", "Ghidra"],
    "Networking": ["TCP/IP", "OSI Model", "IPv4/IPv6", "Troubleshooting", "CCNA Concepts"],
    "Platforms & OS": ["Git", "GitHub", "VirtualBox", "Termux", "Kali Linux", "Parrot OS", "Windows", "Android"],
    "Soft Skills": ["Problem Solving", "Analytical Thinking", "Attention to Detail", "Self-Learning"]
  },
  experience: [
    {
      company: "UptoSkills",
      role: "Cybersecurity Intern",
      period: "Oct 2025 - Present",
      type: "Internship",
      description: "Focusing on threat analysis, vulnerability assessment, and implementing security best practices to enhance system protection."
    },
    {
      company: "Mastercard (via Forage)",
      role: "Cybersecurity Analyst Intern",
      period: "Oct 2025",
      type: "Virtual Job Simulation",
      description: "Simulated SOC operations and cyber incident investigations. Performed access control analysis and vulnerability management in an enterprise environment."
    },
    {
      company: "Tata (via Forage)",
      role: "Cybersecurity Analyst",
      period: "Oct 2025",
      type: "Virtual Job Simulation",
      description: "Gained experience in Identity and Access Management (IAM). Analyzed network vulnerabilities and configured secure systems."
    },
    {
      company: "AIG (via Forage)",
      role: "Cybersecurity Intern",
      period: "2025",
      type: "Virtual Job Simulation",
      description: "Supported digital security operations and cyber risk management tasks."
    }
  ],
  education: [
    {
      institution: "Darbhanga College of Engineering",
      degree: "B.Tech in Computer Science & Engineering (Cybersecurity)",
      period: "2024 - 2028",
      location: "Bihar, India",
      details: "1st Year / 2nd Semester. Focusing on Network Defense, Ethical Hacking, and Computer Science fundamentals."
    }
  ],
  certifications: [
    { name: "Ethical Hacker", issuer: "Cisco Networking Academy", link: "/Ethical Hacker.pdf" },
    { name: "Fortinet Certified Associate", issuer: "Fortinet", link: "/Fortinet Certified Associate in Cybersecurity.pdf" },
    { name: "Junior Cybersecurity Analyst", issuer: "Cisco Networking Academy", link: "/Junior Cybersecurity Analyst Career Path Exam.pdf" },
    { name: "Introduction to Cybersecurity", issuer: "Cisco Networking Academy", link: "/introtocybersecurity.pdf" }
  ],
  projects: [
    {
      title: "Network Monitor Tool",
      tech: "Python, Networking, Cybersecurity",
      description: "Created a simple Python tool to monitor network traffic and log unusual activity for practice purposes.",
      link: "https://github.com/iamkrshivam/network-monitor-tool"
    },
    {
      title: "Password Manager",
      tech: "Python, Encryption, Security",
      description: "Built a basic password manager to securely store and retrieve passwords using Python and file encryption.",
      link: "https://github.com/iamkrshivam/my-password-manager"
    },
    {
      title: "Linux Security Script",
      tech: "Bash, Linux, Automation",
      description: "Developed a small Bash script to automate system updates and apply basic security checks on Linux.",
      link: "https://github.com/iamkrshivam/Linux-Security-Script"
    },
    {
      title: "Network Port Scanner",
      tech: "Python, Scapy, Networking",
      description: "Fast interactive port scanner supporting TCP/UDP, auto timeouts, banner grabbing, and JSON/CSV output.",
      link: "https://github.com/iamkrshivam/Port_scanner"
    }
  ]
};

/* --- UTILITY: Scroll Reveal Wrapper --- */
const RevealOnScroll = ({ children, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } ${className}`}
    >
      {children}
    </div>
  );
};

/* --- COMPONENTS --- */

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Education', href: '#education' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 border-b ${scrolled ? 'bg-black/80 backdrop-blur-xl border-zinc-800 py-4' : 'bg-transparent border-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="p-2 bg-green-500/10 rounded-lg border border-green-500/20 group-hover:border-green-500/50 transition-colors relative overflow-hidden">
               <div className="absolute inset-0 bg-green-500/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <Terminal className="h-5 w-5 text-green-500 relative z-10" />
            </div>
            <span className="text-xl font-bold font-mono tracking-tighter text-white group-hover:text-green-500 transition-colors">
              SHIVAM<span className="text-green-500 group-hover:text-white transition-colors">_KUMAR</span>
            </span>
          </div>
          
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-sm font-medium text-zinc-400 hover:text-green-400 transition-colors tracking-wide relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-500 transition-all group-hover:w-full"></span>
              </a>
            ))}
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-zinc-400 hover:text-white transition-colors">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className={`md:hidden absolute w-full bg-black/95 backdrop-blur-xl border-b border-zinc-800 transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
        <div className="px-6 py-4 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block py-3 text-lg font-medium text-zinc-400 hover:text-green-400 transition-colors border-b border-zinc-800/50 last:border-0 font-mono"
            >
              {`> ${link.name}`}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-black selection:bg-green-500/30">
      
      {/* --- CYBER GRID BACKGROUND --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>
        <div className="absolute bottom-0 left-0 right-0 h-[500px] bg-gradient-to-t from-green-900/10 to-transparent opacity-30 blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Text Content */}
        <div className="order-2 lg:order-1 text-center lg:text-left">
          <RevealOnScroll>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-900/10 border border-green-500/20 text-green-500 text-xs font-mono mb-6 hover:bg-green-900/20 transition-colors cursor-default">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              SYSTEM STATUS: ONLINE
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
              Digital <br/>
              <span className="relative inline-block">
                <span className="absolute -inset-1 bg-green-500/20 blur-xl"></span>
                <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600 animate-pulse">
                  Defender.
                </span>
              </span>
            </h1>
            
            <p className="text-zinc-400 text-lg md:text-xl max-w-lg mx-auto lg:mx-0 mb-8 leading-relaxed">
              {portfolioData.personal.tagline}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a href="#projects" className="px-8 py-4 bg-white text-black font-bold rounded-lg hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]">
                View Protocols
              </a>
              <a href={portfolioData.personal.resumeLink} download className="px-8 py-4 bg-zinc-900 text-white border border-zinc-800 rounded-lg hover:border-green-500/50 hover:bg-zinc-900/80 transition-all flex items-center justify-center gap-2 group">
                <Download className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                Init Resume
              </a>
            </div>
            
            <div className="mt-12 flex items-center justify-center lg:justify-start gap-6 text-zinc-500">
               <a href={portfolioData.personal.github} target="_blank" rel="noreferrer" className="hover:text-green-400 transition-colors transform hover:scale-110"><Github className="w-6 h-6"/></a>
               <a href={portfolioData.personal.linkedin} target="_blank" rel="noreferrer" className="hover:text-green-400 transition-colors transform hover:scale-110"><Linkedin className="w-6 h-6"/></a>
               <a href={`mailto:${portfolioData.personal.email}`} className="hover:text-green-400 transition-colors transform hover:scale-110"><Mail className="w-6 h-6"/></a>
            </div>
          </RevealOnScroll>
        </div>

        {/* Profile Image Section */}
        <div className="order-1 lg:order-2 flex justify-center lg:justify-end relative">
          <RevealOnScroll className="delay-200">
            {/* UPDATED: Resized image container */}
            <div className="relative w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 group">
              {/* Animated Rings */}
              <div className="absolute inset-0 rounded-full border border-green-500/20 animate-[spin_10s_linear_infinite]"></div>
              <div className="absolute inset-4 rounded-full border border-dashed border-zinc-700 animate-[spin_15s_linear_infinite_reverse]"></div>
              
              {/* Image Container */}
              <div className="absolute inset-8 rounded-full overflow-hidden border-2 border-green-500/20 bg-zinc-900 relative z-10">
                <img 
                  src={portfolioData.personal.profileImage} 
                  alt="Shivam Kumar" 
                  className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105"
                  onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400"; }} // Fallback if image not found
                />
                {/* Scanline Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/10 to-transparent h-full w-full animate-[scan_2s_linear_infinite] pointer-events-none opacity-50"></div>
              </div>

              {/* Floating Badges */}
              <div className="absolute top-6 -right-2 bg-black/80 backdrop-blur border border-green-900/30 px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-2xl animate-bounce delay-1000 z-20">
                 <Shield className="w-4 h-4 text-green-500" />
                 <span className="text-[10px] font-mono text-green-400 font-bold tracking-wider">SECURE</span>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-zinc-600">
        <ChevronDown className="w-6 h-6" />
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 bg-zinc-950/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <RevealOnScroll>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-green-500/20 to-transparent blur-2xl opacity-50"></div>
              <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-2xl relative">
                <div className="flex items-center gap-3 mb-6 border-b border-zinc-800 pb-4">
                  <Terminal className="w-5 h-5 text-green-500" />
                  <span className="font-mono text-sm text-zinc-400">MISSION_PROFILE.log</span>
                  <div className="ml-auto flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                  </div>
                </div>
                
                <p className="text-zinc-300 leading-relaxed font-mono text-sm md:text-base mb-6">
                  <span className="text-green-500">{'>'}</span> {portfolioData.personal.about}
                </p>
                
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="bg-black/50 p-4 rounded border border-zinc-800">
                    <span className="text-xs text-zinc-500 uppercase tracking-wider block mb-1">Location</span>
                    <div className="flex items-center gap-2 text-zinc-300 text-sm">
                      <MapPin className="w-4 h-4 text-green-500" />
                      {portfolioData.personal.location}
                    </div>
                  </div>
                  <div className="bg-black/50 p-4 rounded border border-zinc-800">
                    <span className="text-xs text-zinc-500 uppercase tracking-wider block mb-1">Status</span>
                    <div className="flex items-center gap-2 text-zinc-300 text-sm">
                      <Globe className="w-4 h-4 text-green-500" />
                      Available for Hire
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>
          
          <RevealOnScroll className="delay-200">
             <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
               Forged in <span className="text-green-500">Code</span>,<br />
               Proven in <span className="underline decoration-green-500/30 underline-offset-8">Simulation</span>.
             </h2>
             <p className="text-zinc-400 mb-8 leading-relaxed">
               I don't just study cybersecurity; I practice it. From analyzing network traffic patterns to simulating enterprise-level SOC operations, my approach is rooted in hands-on defense.
             </p>
             
             {/* Note: Education has been moved to its own dedicated section below */}
             <div className="flex flex-col gap-4">
               <p className="text-sm font-mono text-green-500/80">
                 // See Education section for academic details
               </p>
             </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="py-32 bg-black relative overflow-hidden">
      {/* Decorative BG elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <RevealOnScroll>
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Technical <span className="text-green-500">Arsenal</span></h2>
            <div className="h-1 w-20 bg-green-600 rounded-full"></div>
          </div>
        </RevealOnScroll>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {Object.entries(portfolioData.skills).map(([category, items], idx) => (
            <RevealOnScroll key={idx} className={`delay-${idx * 100}`}>
              <div className="h-full bg-zinc-900/30 backdrop-blur-sm border border-zinc-800/50 p-6 rounded-2xl hover:bg-zinc-900/60 transition-all duration-300 hover:border-green-500/30 hover:-translate-y-1 group hover:shadow-[0_10px_30px_-10px_rgba(34,197,94,0.1)]">
                <h3 className="text-lg font-bold text-white mb-6 capitalize flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 group-hover:animate-pulse"></span>
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill, i) => (
                    <span key={i} className="px-3 py-1.5 bg-zinc-900/50 text-zinc-400 text-xs font-mono rounded border border-zinc-800 hover:text-green-400 hover:border-green-500/30 transition-colors cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

const Experience = () => {
  return (
    <section id="experience" className="py-32 bg-zinc-950 relative">
      <div className="max-w-5xl mx-auto px-6">
        <RevealOnScroll>
          <div className="flex items-end justify-between mb-20">
            <div>
              <h2 className="text-4xl font-bold text-white mb-2">Experience <span className="text-green-500">Log</span></h2>
              <p className="text-zinc-500">My timeline of internships and simulations.</p>
            </div>
          </div>
        </RevealOnScroll>
        
        <div className="space-y-12">
          {portfolioData.experience.map((job, index) => (
            <RevealOnScroll key={index}>
              <div className="group relative pl-8 md:pl-0">
                {/* Desktop Timeline Line */}
                <div className="hidden md:block absolute left-[150px] top-0 bottom-0 w-px bg-zinc-800 group-last:bottom-auto group-last:h-full"></div>
                
                <div className="md:flex gap-12 items-start">
                  <div className="hidden md:block w-[150px] text-right py-1">
                    <span className="text-sm font-mono text-zinc-500 group-hover:text-green-400 transition-colors">{job.period}</span>
                  </div>

                  <div className="relative flex-1 bg-gradient-to-br from-zinc-900/50 to-black border border-zinc-800 p-8 rounded-2xl hover:border-green-500/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,197,94,0.05)]">
                    {/* Timeline Dot */}
                    <div className="absolute -left-[37px] top-8 w-3 h-3 rounded-full bg-zinc-800 border-4 border-zinc-950 group-hover:bg-green-500 group-hover:scale-125 transition-all hidden md:block shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                    
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-green-400 transition-colors">{job.role}</h3>
                        <div className="text-zinc-400 text-sm mt-1">{job.company} <span className="text-zinc-600 mx-2">•</span> <span className="text-xs border border-green-900/30 text-green-600 px-2 py-0.5 rounded bg-green-900/10">{job.type}</span></div>
                      </div>
                    </div>
                    <p className="text-zinc-400 text-sm leading-relaxed border-t border-zinc-800/50 pt-4 mt-2">
                      {job.description}
                    </p>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

/* --- NEW COMPONENT: EDUCATION --- */
const Education = () => {
  return (
    <section id="education" className="py-24 bg-black border-t border-zinc-900/50 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <RevealOnScroll>
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Academic <span className="text-green-500">Record</span></h2>
            <div className="h-1 w-20 bg-green-600 rounded-full"></div>
          </div>
        </RevealOnScroll>

        <div className="space-y-8">
          {portfolioData.education.map((edu, idx) => (
            <RevealOnScroll key={idx}>
              <div className="bg-zinc-900/20 border border-zinc-800 rounded-2xl p-8 hover:border-green-500/30 transition-colors relative overflow-hidden group">
                {/* Decorative BG icon */}
                <div className="absolute -right-10 -bottom-10 opacity-5 group-hover:opacity-10 transition-opacity">
                  <BookOpen className="w-48 h-48 text-green-500" />
                </div>

                <div className="flex flex-col md:flex-row gap-6 relative z-10">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-green-500/10 rounded-xl flex items-center justify-center border border-green-500/20 text-green-500">
                       <BookOpen className="w-8 h-8" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
                      <h3 className="text-2xl font-bold text-white">{edu.institution}</h3>
                      <span className="text-green-500 font-mono text-sm bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20 mt-2 md:mt-0">{edu.period}</span>
                    </div>
                    
                    <h4 className="text-lg text-green-400 mb-4">{edu.degree}</h4>
                    
                    <div className="grid md:grid-cols-2 gap-4 text-sm text-zinc-400 font-mono">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-zinc-500" />
                        {edu.location}
                      </div>
                    </div>
                    
                    <p className="mt-6 text-zinc-400 leading-relaxed border-t border-zinc-800 pt-4">
                      {edu.details}
                    </p>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="py-32 bg-zinc-950 relative">
       {/* Background Noise Texture */}
       <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <RevealOnScroll>
          <h2 className="text-4xl font-bold text-white mb-16">Featured <span className="text-green-500">Projects</span></h2>
        </RevealOnScroll>
        
        <div className="grid md:grid-cols-2 gap-8">
          {portfolioData.projects.map((project, index) => (
            <RevealOnScroll key={index} className={`delay-${index * 100}`}>
              <div className="group relative bg-zinc-900/20 border border-zinc-800 rounded-3xl p-8 hover:bg-zinc-900/40 transition-all duration-500 hover:border-green-500/30 overflow-hidden hover:-translate-y-2 flex flex-col h-full">
                {/* Decoration */}
                <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0">
                   <Terminal className="w-24 h-24 text-green-500/5 -rotate-12" />
                </div>
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 bg-zinc-900 rounded-xl border border-zinc-800 flex items-center justify-center group-hover:border-green-500/30 group-hover:text-green-500 transition-colors">
                      <Terminal className="w-6 h-6" />
                    </div>
                    <a href={project.link} target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white transition-colors">
                      <ExternalLink className="w-5 h-5"/>
                    </a>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors">{project.title}</h3>
                  <p className="text-zinc-400 mb-8 line-clamp-3 leading-relaxed text-sm">
                    {project.description}
                  </p>
                  
                  <div className="mt-auto">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.split(', ').map((t, i) => (
                        <span key={i} className="text-xs font-medium text-green-400/80 bg-green-900/10 px-3 py-1 rounded-full border border-green-500/10">
                          {t}
                        </span>
                      ))}
                    </div>
                    <a href={project.link} target="_blank" rel="noreferrer" className="inline-flex items-center text-sm font-bold text-green-500 hover:text-green-400">
                      View Source <Github className="w-4 h-4 ml-2" />
                    </a>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

const Certifications = () => {
    return (
      <section id="certifications" className="py-24 bg-black border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
            <RevealOnScroll>
                <h2 className="text-4xl font-bold text-white mb-12">Credentials <span className="text-green-500">& Certs</span></h2>
            </RevealOnScroll>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {portfolioData.certifications.map((cert, index) => (
                    <RevealOnScroll key={index} className={`delay-${index * 100}`}>
                        <a href={cert.link} target="_blank" rel="noreferrer" className="block h-full bg-zinc-900/40 border border-zinc-800 p-6 rounded-2xl hover:border-green-500/50 hover:bg-zinc-900/60 transition-all group">
                            <div className="w-10 h-10 bg-green-900/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <FileText className="w-5 h-5 text-green-500" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-200 group-hover:text-green-400 transition-colors mb-2">{cert.name}</h3>
                            <p className="text-xs text-gray-500 font-mono mb-4">{cert.issuer}</p>
                            <div className="flex items-center text-xs text-green-500 font-bold mt-auto">
                                VIEW DOCUMENT <ExternalLink className="w-3 h-3 ml-2" />
                            </div>
                        </a>
                    </RevealOnScroll>
                ))}
            </div>
        </div>
      </section>
    );
};

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus(''), 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-32 bg-zinc-950 border-t border-zinc-900/50">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <RevealOnScroll>
          <h2 className="text-5xl font-bold text-white mb-6">Initialize <span className="text-green-500">Connection</span></h2>
          <p className="text-zinc-400 mb-12 text-lg">
            Ready to secure your infrastructure? I am available for internships and security audits.
          </p>

          <div className="bg-zinc-900/30 backdrop-blur-md border border-zinc-800 p-8 md:p-12 rounded-3xl shadow-2xl relative overflow-hidden">
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-green-500/20 rounded-tl-3xl"></div>
            <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-green-500/20 rounded-br-3xl"></div>

            <form onSubmit={handleSubmit} className="space-y-6 text-left relative z-10">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Identity</label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    className="w-full bg-black/50 border border-zinc-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-green-500 transition-colors placeholder:text-zinc-700"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Frequency</label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    className="w-full bg-black/50 border border-zinc-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-green-500 transition-colors placeholder:text-zinc-700"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Payload</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Message content..."
                  className="w-full bg-black/50 border border-zinc-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-green-500 transition-colors resize-none placeholder:text-zinc-700"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={status === 'sending' || status === 'success'}
                className={`w-full py-4 rounded-xl font-bold tracking-wide transition-all duration-300 transform hover:-translate-y-1 ${
                  status === 'success' 
                    ? 'bg-green-500 text-black shadow-lg shadow-green-500/20' 
                    : 'bg-white text-black hover:bg-zinc-200 shadow-lg shadow-white/10'
                }`}
              >
                {status === 'sending' ? 'Transmitting...' : status === 'success' ? 'Transmission Complete' : 'Execute Transmission'}
              </button>
            </form>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-black py-12 border-t border-zinc-900 text-center relative overflow-hidden">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-green-900 to-transparent"></div>
    
    <div className="flex items-center justify-center gap-2 mb-6 text-green-900">
      <Shield className="w-6 h-6 animate-pulse" />
      <span className="text-xs font-mono tracking-[0.2em]">SECURE CONNECTION ESTABLISHED</span>
    </div>
    <p className="text-zinc-600 text-sm">
      &copy; {new Date().getFullYear()} Shivam Kumar. All protocols secured.
    </p>
  </footer>
);

export default function App() {
  return (
    <div className="bg-black min-h-screen text-zinc-100 selection:bg-green-500/30 selection:text-green-200">
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Education />
      <Projects />
      <Certifications />
      <Contact />
      <Footer />
    </div>
  );
}

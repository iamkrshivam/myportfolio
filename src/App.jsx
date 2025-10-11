import React from 'react';
const { useState, useEffect, useRef, createContext, useContext, useMemo } = React;

// ---[ ICONS (as inline SVG components) ]---
// Using inline SVGs to avoid dependencies in a single-file setup.
const IconGitHub = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);
const IconLinkedin = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);
const IconFileDown = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-down"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M12 18v-6"/><path d="m15 15-3 3-3-3"/></svg>
);
const IconSend = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-send"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
);
const IconExternalLink = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-external-link"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>
);
const IconX = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
);
const IconSun = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sun"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m4.93 17.66 1.41-1.41"/><path d="m17.66 4.93 1.41 1.41"/></svg>
);
const IconMoon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-moon"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
);
const IconPower = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-power"><path d="M12 2v10"/><path d="M18.4 6.6a9 9 0 1 1-12.77.04"/></svg>
);
const IconEye = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
);

// ---[ MOCK DATA ]---
// In a real app, this would be fetched from a single JSON file.
const PORTFOLIO_DATA = {
  "skills": {
    "Operating Systems": ["Linux (Debian/Arch)", "Windows Server", "macOS"],
    "Networking": ["TCP/IP", "DNS", "DHCP", "Wireshark", "Nmap"],
    "Security Tools": ["Metasploit", "Burp Suite", "Nessus", "John the Ripper"],
    "Languages": ["Python", "Bash", "JavaScript", "C++"],
    "Web Security": ["OWASP Top 10", "XSS", "SQLi", "CSRF"]
  },
  "projects": [
    {
      "title": "Vulnerability Scanner",
      "summary": "A Python-based network scanner to detect open ports and common vulnerabilities.",
      "tags": ["Python", "Nmap", "Socket"],
      "links": { "github": "#", "demo": "#" },
      "details": {
        "problem": "Manual vulnerability scanning is time-consuming. An automated tool was needed to quickly assess a network's security posture.",
        "tools": ["Python", "python-nmap library", "Argparse"],
        "steps": [
          "Developed a command-line interface using argparse.",
          "Integrated python-nmap to perform port scanning.",
          "Created a simple vulnerability database (JSON) to check against common CVEs.",
          "Implemented multi-threading to scan multiple hosts concurrently."
        ],
        "results": "The scanner successfully identifies open ports and flags potential vulnerabilities based on service versions. Scan times were reduced by 70% compared to manual checks.",
        "lessons": "Learned the intricacies of network protocols and the importance of efficient, non-blocking I/O for network applications."
      }
    },
    {
      "title": "Phishing Email Analyzer",
      "summary": "A tool to analyze email headers and content to detect phishing attempts.",
      "tags": ["Python", "Regex", "Email Headers"],
      "links": { "github": "#", "demo": "#" },
      "details": {
        "problem": "Users often struggle to identify sophisticated phishing emails. This tool provides an automated first-pass analysis.",
        "tools": ["Python 3", "regular expressions"],
        "steps": [
          "Parsed raw email files to extract headers.",
          "Analyzed 'Received' headers to trace the email's path.",
          "Checked SPF, DKIM, and DMARC records.",
          "Scanned email body for suspicious links and keywords."
        ],
        "results": "The analyzer provides a risk score and highlights suspicious elements, helping users make more informed decisions.",
        "lessons": "Gained a deep understanding of email protocols and the various techniques attackers use to bypass filters."
      }
    },
    {
      "title": "CTF Write-up Blog",
      "summary": "A personal blog built to document solutions for TryHackMe and HackTheBox challenges.",
      "tags": ["Markdown", "React", "Static Site Generation"],
      "links": { "github": "#", "demo": "#" },
      "details": {
        "problem": "Needed a centralized place to store and share my solutions and findings from various CTF platforms.",
        "tools": ["Next.js", "Tailwind CSS", "MDX"],
        "steps": [
          "Set up a Next.js project for static site generation.",
          "Styled the site with a dark, hacker-themed aesthetic using Tailwind CSS.",
          "Used MDX to write blog posts, allowing for embedded React components within Markdown.",
          "Deployed the site to Vercel for fast, global access."
        ],
        "results": "A performant, easy-to-update blog that serves as a personal knowledge base and a portfolio piece.",
        "lessons": "Mastered the concepts of static site generation and learned how to effectively communicate technical concepts through writing."
      }
    },
     {
      "title": "Encrypted Chat Application",
      "summary": "A simple client-server chat application with end-to-end encryption.",
      "tags": ["Python", "Cryptography", "Sockets"],
      "links": { "github": "#" },
      "details": {
        "problem": "Standard chat applications often lack robust privacy. This project aimed to implement a secure communication channel from scratch.",
        "tools": ["Python", "socket library", "cryptography library (Fernet)"],
        "steps": [
          "Built a multi-threaded server to handle multiple client connections.",
          "Implemented a key exchange mechanism for clients to establish a shared secret.",
          "Used symmetric encryption (AES via Fernet) to encrypt all messages before transmission.",
          "Developed a simple terminal-based UI for clients."
        ],
        "results": "The application allows multiple users to chat securely, with all messages being unreadable to anyone intercepting the network traffic.",
        "lessons": "Gained practical experience with symmetric encryption, socket programming, and the challenges of secure key exchange."
      }
    }
  ]
};

// ---[ CONTEXT ]---
const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [theme, setTheme] = useState('dark');
    const [isMatrixOn, setIsMatrixOn] = useState(true);

    useEffect(() => {
        const storedTheme = localStorage.getItem('portfolio-theme') || 'dark';
        const storedMatrix = localStorage.getItem('portfolio-matrix') !== 'false';
        setTheme(storedTheme);
        setIsMatrixOn(storedMatrix);
    }, []);

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('portfolio-theme', theme);
    }, [theme]);

    useEffect(() => {
        localStorage.setItem('portfolio-matrix', isMatrixOn);
    }, [isMatrixOn]);

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
    };

    const toggleMatrix = () => {
        setIsMatrixOn(prevState => !prevState);
    };

    const value = { theme, toggleTheme, isMatrixOn, toggleMatrix };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// ---[ COMPONENTS ]---

const MatrixRain = ({ isPlaying, theme }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
        const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const nums = '0123456789';
        const alphabet = katakana + latin + nums;

        const fontSize = 16;
        const columns = Math.floor(canvas.width / fontSize);

        const rainDrops = [];
        for (let x = 0; x < columns; x++) {
            rainDrops[x] = 1;
        }

        const draw = () => {
            ctx.fillStyle = document.documentElement.classList.contains('dark') ? 'rgba(10, 25, 47, 0.05)' : 'rgba(241, 245, 249, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#00ff7f';
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < rainDrops.length; i++) {
                const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
                ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

                if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    rainDrops[i] = 0;
                }
                rainDrops[i]++;
            }
        };
        
        const clearCanvas = () => {
             const bgColor = document.documentElement.classList.contains('dark') ? 'rgb(15, 23, 42)' : 'rgb(241, 245, 249)';
             ctx.fillStyle = bgColor;
             ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        const animate = () => {
            if (isPlaying) {
                draw();
            } else {
                 clearCanvas();
            }
            animationFrameId = window.requestAnimationFrame(animate);
        };
        
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.cancelAnimationFrame(animationFrameId);
        };
    }, [isPlaying, theme]); // Rerun effect if theme changes

    // The 'opacity-20' and 'dark:opacity-30' classes below control the transparency of the matrix rain effect.
    // Lower values make the rain "fade" into the background more.
    return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 opacity-20 dark:opacity-30" />;
};

const Header = () => {
    const { toggleTheme, isMatrixOn, toggleMatrix, theme } = useContext(AppContext);
    const [activeSection, setActiveSection] = useState('hero');
    const sections = useMemo(() => ['hero', 'about', 'skills', 'projects', 'contact'], []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: '-50% 0px -50% 0px' }
        );

        sections.forEach(id => {
            const el = document.getElementById(id);
            if(el) observer.observe(el);
        });

        return () => sections.forEach(id => {
             const el = document.getElementById(id);
             if(el) observer.unobserve(el);
        });
    }, [sections]);

    const navLinkClass = (id) => `transition-colors hover:text-green-400 ${activeSection === id ? 'text-green-400' : 'text-slate-500 dark:text-slate-400'}`;

    return (
        <header className="fixed top-0 left-0 right-0 z-50 py-4 px-4 sm:px-8 bg-slate-100/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
            <div className="container mx-auto flex justify-between items-center">
                <a href="#hero" className="text-xl font-bold text-green-500 dark:text-green-400">
                    S.K. <span className="text-slate-900 dark:text-white animate-pulse">/&gt;</span>
                </a>
                <nav className="hidden md:flex items-center space-x-6">
                    {sections.map(s => (
                        <a key={s} href={`#${s}`} className={navLinkClass(s)}>{s.charAt(0).toUpperCase() + s.slice(1)}</a>
                    ))}
                </nav>
                 <div className="flex items-center space-x-4">
                    <button onClick={toggleMatrix} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors" aria-label="Toggle Matrix Rain">
                         {isMatrixOn ? <IconPower className="w-5 h-5 text-green-500"/> : <IconPower className="w-5 h-5 text-slate-500" />}
                    </button>
                    <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors" aria-label="Toggle Theme">
                        {theme === 'dark' ? <IconSun className="w-5 h-5 text-yellow-400" /> : <IconMoon className="w-5 h-5 text-slate-500" />}
                    </button>
                </div>
            </div>
        </header>
    );
};

const BlinkingCursor = () => <span className="inline-block w-2 h-5 bg-green-500 dark:bg-green-400 ml-1 animate-blink" />;

const Hero = () => (
    <section id="hero" className="min-h-screen flex items-center justify-center text-center px-4">
        <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 dark:text-slate-100 leading-tight">
                Shivam Kumar
            </h1>
            <p className="mt-4 text-lg sm:text-xl md:text-2xl text-green-600 dark:text-green-400 font-mono">
                Cybersecurity Student
                <BlinkingCursor />
            </p>
            <p className="mt-6 max-w-2xl mx-auto text-slate-600 dark:text-slate-400">
                Building secure systems and exploring the depths of digital defense. Practicing ethical hacking and digital forensics to create a safer cyberspace.
            </p>
            <div className="mt-8 flex justify-center flex-wrap gap-4">
                <a href="./resume.pdf" download className="group relative inline-flex items-center justify-center px-6 py-3 border-2 border-green-500 text-green-600 dark:border-green-400 dark:text-green-400 font-bold rounded-lg overflow-hidden transition-all duration-300 hover:text-white dark:hover:text-slate-900">
                    <span className="absolute inset-0 bg-green-500 dark:bg-green-400 transition-all duration-300 w-0 group-hover:w-full"></span>
                    <span className="relative flex items-center gap-2"><IconFileDown /> Download Resume</span>
                </a>
                <a href="#contact" className="group relative inline-flex items-center justify-center px-6 py-3 border-2 border-slate-500 text-slate-600 dark:text-slate-300 font-bold rounded-lg overflow-hidden transition-all duration-300 hover:text-slate-900 hover:border-slate-900 dark:hover:text-white dark:hover:border-white">
                    <span className="relative flex items-center gap-2"><IconSend /> Contact Me</span>
                </a>
                <a href="https://github.com/your-username" target="_blank" rel="noopener noreferrer" className="group relative inline-flex items-center justify-center px-6 py-3 border-2 border-slate-500 text-slate-600 dark:text-slate-300 font-bold rounded-lg overflow-hidden transition-all duration-300 hover:text-slate-900 hover:border-slate-900 dark:hover:text-white dark:hover:border-white">
                    <span className="relative flex items-center gap-2"><IconGitHub /> GitHub</span>
                </a>
            </div>
        </div>
    </section>
);

const Section = ({ id, title, children }) => (
    <section id={id} className="py-20 px-4 sm:px-8">
        <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-slate-900 dark:text-slate-100">
                <span className="text-green-600 dark:text-green-400 font-mono">&lt;</span>{title}<span className="text-green-600 dark:text-green-400 font-mono"> /&gt;</span>
            </h2>
            {children}
        </div>
    </section>
);

const About = () => (
    <Section id="about" title="About Me">
        <div className="flex flex-col md:flex-row items-center gap-12 max-w-5xl mx-auto">
            <div className="w-48 h-48 md:w-64 md:h-64 flex-shrink-0 rounded-full overflow-hidden border-4 border-green-500/50 dark:border-green-400/50 p-1 bg-slate-200 dark:bg-slate-800">
                 <img
                    src="https://placehold.co/256x256/0a192f/00ff7f?text=SK"
                    alt="Shivam Kumar"
                    className="w-full h-full object-cover rounded-full"
                />
            </div>
            <div className="text-center md:text-left">
                <p className="text-slate-700 dark:text-slate-300 text-lg mb-4">
                    Hello! I'm Shivam, a passionate cybersecurity student with a keen interest in ethical hacking, network security, and digital forensics. My journey into tech started with a fascination for how things work, and it has evolved into a drive to understand how to protect them.
                </p>
                <p className="text-slate-600 dark:text-slate-400">
                    I thrive on challenges and am constantly learning new technologies and methodologies. Whether it's dissecting malware or securing a web application, I am committed to developing robust and resilient systems. I'm currently focused on penetration testing and threat intelligence.
                </p>
            </div>
        </div>
    </Section>
);

const Skills = () => (
    <Section id="skills" title="Skills">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(PORTFOLIO_DATA.skills).map(([category, skills]) => (
                <div key={category} className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-md p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg shadow-green-500/5 hover:border-green-500/50 dark:hover:border-green-400/50 transition-all duration-300">
                    <h3 className="text-xl font-bold text-green-600 dark:text-green-400 mb-4">{category}</h3>
                    <ul className="space-y-2">
                        {skills.map(skill => (
                            <li key={skill} className="text-slate-700 dark:text-slate-300 font-mono">
                                <span className="text-green-500 mr-2">✓</span>{skill}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    </Section>
);

const ProjectModal = ({ project, onClose }) => {
    if (!project) return null;
    
    useEffect(() => {
        const handleEsc = (event) => {
            if (event.keyCode === 27) onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-slate-50 dark:bg-slate-900 border border-green-500/30 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8 relative" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 dark:text-slate-400 hover:text-green-500 dark:hover:text-green-400 transition-colors">
                    <IconX size={24} />
                </button>
                <h2 className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">{project.title}</h2>
                <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map(tag => (
                        <span key={tag} className="bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 text-xs font-mono px-2 py-1 rounded">{tag}</span>
                    ))}
                </div>
                
                <div className="space-y-4 text-slate-700 dark:text-slate-300">
                    <div>
                        <h3 className="font-bold text-slate-900 dark:text-slate-100 text-lg mb-1">Problem Statement</h3>
                        <p>{project.details.problem}</p>
                    </div>
                     <div>
                        <h3 className="font-bold text-slate-900 dark:text-slate-100 text-lg mb-1">Tools Used</h3>
                        <p>{project.details.tools.join(', ')}</p>
                    </div>
                     <div>
                        <h3 className="font-bold text-slate-900 dark:text-slate-100 text-lg mb-1">Process</h3>
                        <ul className="list-disc list-inside space-y-1">
                            {project.details.steps.map((step, i) => <li key={i}>{step}</li>)}
                        </ul>
                    </div>
                     <div>
                        <h3 className="font-bold text-slate-900 dark:text-slate-100 text-lg mb-1">Results</h3>
                        <p>{project.details.results}</p>
                    </div>
                     <div>
                        <h3 className="font-bold text-slate-900 dark:text-slate-100 text-lg mb-1">Lessons Learned</h3>
                        <p>{project.details.lessons}</p>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center gap-4">
                     {project.links.github && <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"><IconGitHub /> GitHub Repo</a>}
                     {project.links.demo && <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"><IconExternalLink /> Live Demo</a>}
                </div>

            </div>
        </div>
    );
};

const Projects = () => {
    const [selectedProject, setSelectedProject] = useState(null);

    return (
        <Section id="projects" title="Projects">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {PORTFOLIO_DATA.projects.map((project, index) => (
                    <div key={index} className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg shadow-green-500/5 p-6 flex flex-col group hover:border-green-500/50 dark:hover:border-green-400/50 transition-all duration-300">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">{project.title}</h3>
                        <p className="text-slate-600 dark:text-slate-400 mt-2 flex-grow">{project.summary}</p>
                        <div className="flex flex-wrap gap-2 mt-4">
                            {project.tags.map(tag => (
                                <span key={tag} className="bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 text-xs font-mono px-2 py-1 rounded">{tag}</span>
                            ))}
                        </div>
                        <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                {project.links.github && <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="text-slate-500 dark:text-slate-400 hover:text-green-500 dark:hover:text-green-400 transition-colors"><IconGitHub /></a>}
                                {project.links.demo && <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="text-slate-500 dark:text-slate-400 hover:text-green-500 dark:hover:text-green-400 transition-colors"><IconExternalLink /></a>}
                            </div>
                            <button onClick={() => setSelectedProject(project)} className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 font-semibold hover:underline">
                                <IconEye className="w-4 h-4" /> Case Study
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        </Section>
    );
};


const Contact = () => (
    <Section id="contact" title="Contact">
        <div className="max-w-2xl mx-auto text-center">
             <p className="text-slate-700 dark:text-slate-300 text-lg mb-8">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of an amazing team. Feel free to reach out.
            </p>
            <a href="mailto:shivam.kumar@example.com"
               className="inline-block text-2xl font-mono text-green-600 dark:text-green-400 hover:text-green-500 dark:hover:text-green-300 transition-colors underline decoration-dotted underline-offset-4 mb-10">
                shivam.kumar@example.com
            </a>
            <div className="flex justify-center gap-6 text-slate-500 dark:text-slate-400">
                <a href="https://github.com/your-username" target="_blank" rel="noopener noreferrer" className="hover:text-green-500 dark:hover:text-green-400 transition-colors" aria-label="GitHub"><IconGitHub size={32}/></a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-green-500 dark:hover:text-green-400 transition-colors" aria-label="LinkedIn"><IconLinkedin size={32}/></a>
            </div>
        </div>
    </Section>
);


const Footer = () => (
    <footer className="py-6 px-4 text-center text-sm text-slate-500 dark:text-slate-500 border-t border-slate-200 dark:border-slate-800">
        <p>&copy; {new Date().getFullYear()} Shivam Kumar. All rights reserved.</p>
        <p className="mt-1">Designed and built with <span className="text-green-500 dark:text-green-400">&lt;3</span></p>
    </footer>
);


function App() {
    const { isMatrixOn, theme } = useContext(AppContext);
    
    return (
        // This solid background color is the key to making the text content readable.
        // It provides a high-contrast base layer behind the semi-transparent matrix animation.
        <div className="bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 transition-colors duration-300">
            <MatrixRain isPlaying={isMatrixOn} theme={theme} />
            <div className="relative z-10">
                <Header />
                <main>
                    <Hero />
                    <About />
                    <Skills />
                    <Projects />
                    <Contact />
                </main>
                <Footer />
            </div>
        </div>
    );
}


const Root = () => (
    <AppProvider>
        <App />
    </AppProvider>
);

export default Root;


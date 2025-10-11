import React, { useState, useEffect, useRef } from 'react';

// --- SVG Icons ---
const CodeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>;
const ShieldIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>;
const BrainIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v0A2.5 2.5 0 0 1 9.5 7h-3A2.5 2.5 0 0 1 4 4.5v0A2.5 2.5 0 0 1 6.5 2h3m11 2A2.5 2.5 0 0 0 18 4.5v0A2.5 2.5 0 0 0 20.5 7h-3A2.5 2.5 0 0 0 15 4.5v0A2.5 2.5 0 0 0 17.5 2h3M9 12a3 3 0 1 0 6 0 3 3 0 1 0-6 0"></path><path d="M9.5 7.5c.63.84 1.58 1.5 2.5 1.5s1.87-.66 2.5-1.5"></path><path d="M6.5 15.5c1.5 0 2.5-1.5 2.5-3"></path><path d="M17.5 15.5c-1.5 0-2.5-1.5-2.5-3"></path><path d="M2 14v.5A2.5 2.5 0 0 0 4.5 17h15a2.5 2.5 0 0 0 2.5-2.5V14"></path><path d="M15.5 22c-1.5 0-2.5-1.5-2.5-3"></path><path d="M8.5 22c1.5 0 2.5-1.5 2.5-3"></path></svg>;
const ServerIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>;
const CertificationIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21l-8-4.5v-9L12 3l8 4.5v9L12 21z"></path><path d="M12 12l8-4.5"></path><path d="M12 12L4 7.5"></path><path d="M12 12v9"></path><path d="M12 3v9"></path></svg>;
const DownloadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>;

// --- Main App Component ---
export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [visibleSections, setVisibleSections] = useState(new Set(['home']));

  const sectionRefs = {
    home: useRef(null),
    about: useRef(null),
    skills: useRef(null),
    projects: useRef(null),
    experience: useRef(null),
    certifications: useRef(null),
    contact: useRef(null),
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          if (entry.isIntersecting) {
            setActiveSection(id);
            setVisibleSections(prev => new Set(prev).add(id));
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0.1 }
    );

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => {
      Object.values(sectionRefs).forEach((ref) => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, []);

  const scrollToSection = (sectionId) => {
    sectionRefs[sectionId]?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const isSectionVisible = (id) => visibleSections.has(id);
  
  const getSectionClassName = (id) => 
    `py-20 md:py-32 transition-opacity duration-1000 ease-in ${isSectionVisible(id) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`;

  return (
    <>
      <style>{`
        :root { --cyan: 187, 100%, 50%; --dark-bg: #0a0a0a; }
        .selection\\:bg-cyan-300::selection { background-color: hsl(var(--cyan), 0.7); color: var(--dark-bg); }
        .bg-grid-pattern { background-image: linear-gradient(hsl(var(--cyan), 0.1) 1px, transparent 1px), linear-gradient(to right, hsl(var(--cyan), 0.1) 1px, transparent 1px); background-size: 30px 30px; }
        .bg-radial-gradient { background-image: radial-gradient(circle at center, hsl(var(--cyan), 0.3), transparent 50%); }
        @keyframes aurora { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-aurora { animation: aurora 20s linear infinite; }
        .shadow-cyan-glow { box-shadow: 0 0 15px hsl(var(--cyan), 0.5), 0 0 5px hsl(var(--cyan), 0.7); }
        .matrix-canvas { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 0; opacity: 0.2; }
        .glitch-text { position: relative; }
        .glitch-text::before, .glitch-text::after { content: attr(data-text); position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: var(--dark-bg); overflow: hidden; }
        .glitch-text::before { left: 2px; text-shadow: -2px 0 #ff00c1; clip: rect(44px, 450px, 56px, 0); animation: glitch-anim-1 2s infinite linear alternate-reverse; }
        .glitch-text::after { left: -2px; text-shadow: -2px 0 #00fff9, 2px 2px #ff00c1; clip: rect(85px, 450px, 90px, 0); animation: glitch-anim-2 3s infinite linear alternate-reverse; }
        @keyframes glitch-anim-1 { 0%, 100% { clip: rect(42px, 9999px, 44px, 0); } 20% { clip: rect(69px, 9999px, 71px, 0); } 40% { clip: rect(21px, 9999px, 23px, 0); } 60% { clip: rect(9px, 9999px, 11px, 0); } 80% { clip: rect(81px, 9999px, 83px, 0); } }
        @keyframes glitch-anim-2 { 0%, 100% { clip: rect(31px, 9999px, 33px, 0); } 15% { clip: rect(91px, 9999px, 93px, 0); } 35% { clip: rect(49px, 9999px, 51px, 0); } 55% { clip: rect(18px, 9999px, 20px, 0); } 75% { clip: rect(62px, 9999px, 64px, 0); } }
        .cyber-button, .cyber-button-outline { position: relative; padding: 12px 24px; text-transform: uppercase; letter-spacing: 2px; transition: all 0.3s; overflow: hidden; display: inline-flex; align-items: center; justify-content: center; gap: 8px; }
        .cyber-button { color: #0ff; border: 2px solid #0ff; }
        .cyber-button:hover { color: #0a0a0a; background: #0ff; box-shadow: 0 0 20px #0ff; }
        .cyber-button::before { content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent); transition: left 0.4s; }
        .cyber-button:hover::before { left: 100%; }
        .cyber-button-outline { color: #0ff; border: 2px solid #0ff8; background: transparent; }
        .cyber-button-outline:hover { background: #0ff2; border-color: #0ff; }
        @keyframes tilt { 0%, 100% { transform: rotate(0deg); } 50% { transform: rotate(2deg); } }
        .animate-tilt { animation: tilt 10s infinite linear; }
        .cyber-card { border: 1px solid hsl(var(--cyan), 0.2); background: rgba(10, 25, 47, 0.2); backdrop-filter: blur(10px); transition: all 0.3s ease; }
        .cyber-card:hover { transform: translateY(-8px); border-color: hsl(var(--cyan), 0.5); box-shadow: 0 10px 30px -15px hsl(var(--cyan), 0.2); }
        .skill-item { background: hsl(var(--cyan), 0.1); border: 1px solid hsl(var(--cyan), 0.3); padding: 8px 16px; border-radius: 4px; transition: all 0.3s; }
        .skill-item:hover { background: hsl(var(--cyan), 0.3); color: white; transform: scale(1.05); }
      `}</style>
      <div className="bg-[#0a0a0a] text-cyan-300 font-mono selection:bg-cyan-300">
        <MatrixRain />
        <div className="fixed top-0 left-0 w-full h-full bg-grid-pattern opacity-10 z-0"></div>
        <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a] z-10"></div>
        <div className="fixed top-[-50%] left-[-50%] w-[200%] h-[200%] bg-radial-gradient opacity-20 animate-aurora z-0"></div>
        
        <Header activeSection={activeSection} scrollToSection={scrollToSection} />
        <SocialLinks />

        <main className="relative z-20 container mx-auto px-4 md:px-8 lg:px-16 xl:px-20">
          {/* This pt-24 class adds padding to the top on mobile to prevent the fixed header from overlapping the content. It's removed on medium screens (md:pt-0). */}
          <section id="home" ref={sectionRefs.home} className={`min-h-screen flex items-center pt-24 md:pt-0 transition-opacity duration-1000 ${isSectionVisible('home') ? 'opacity-100' : 'opacity-0'}`}>
            <Hero />
          </section>
          <section id="about" ref={sectionRefs.about} className={getSectionClassName('about')}>
            <About />
          </section>
          <section id="skills" ref={sectionRefs.skills} className={getSectionClassName('skills')}>
            <Skills />
          </section>
          <section id="experience" ref={sectionRefs.experience} className={getSectionClassName('experience')}>
            <Experience />
          </section>
          <section id="projects" ref={sectionRefs.projects} className={getSectionClassName('projects')}>
            <Projects />
          </section>
          <section id="certifications" ref={sectionRefs.certifications} className={getSectionClassName('certifications')}>
            <Certifications />
          </section>
          <section id="contact" ref={sectionRefs.contact} className={getSectionClassName('contact')}>
            <Contact />
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
}

// --- Background and Static UI Components ---

const MatrixRain = () => {
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
        const characters = katakana + latin + nums;
        const fontSize = 16;
        const columns = Math.floor(canvas.width / fontSize);

        const drops = Array.from({ length: columns }).fill(1);

        const draw = () => {
            ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#0ff';
            ctx.font = `${fontSize}px monospace`;
            for (let i = 0; i < drops.length; i++) {
                const text = characters.charAt(Math.floor(Math.random() * characters.length));
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
            animationFrameId = window.requestAnimationFrame(draw);
        };
        draw();

        return () => {
            window.cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    return <canvas ref={canvasRef} className="matrix-canvas" />;
};

const Header = ({ activeSection, scrollToSection }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navLinks = ['home', 'about', 'skills', 'experience', 'projects', 'certifications', 'contact'];

    return (
        <header className="fixed top-0 left-0 w-full p-4 md:p-6 z-50 bg-[#0a0a0a]/80 backdrop-blur-lg border-b border-cyan-300/10">
            <div className="container mx-auto flex justify-between items-center">
                <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }} className="text-2xl font-bold glitch-text" data-text="J.DOE">SK/</a>
                <nav className="hidden md:flex space-x-8">
                    {navLinks.map((link, index) => (
                        <a key={link} href={`#${link}`} onClick={(e) => { e.preventDefault(); scrollToSection(link); }}
                           className={`capitalize text-sm tracking-widest transition-all duration-300 hover:text-white hover:shadow-cyan-glow relative after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-full after:h-[2px] after:bg-cyan-400 after:scale-x-0 after:origin-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-left ${activeSection === link ? 'text-white shadow-cyan-glow' : 'text-cyan-300/70'}`}>
                           <span className="text-cyan-400 mr-1">0{index + 1}.</span>{link}
                        </a>
                    ))}
                </nav>
                <button className="md:hidden z-50" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Open menu">
                    <div className={`w-6 h-0.5 bg-cyan-300 mb-1.5 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
                    <div className={`w-6 h-0.5 bg-cyan-300 transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
                    <div className={`w-6 h-0.5 bg-cyan-300 mt-1.5 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
                </button>
            </div>
            {isMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-[#0a0a0a]/95 backdrop-blur-lg">
                    <nav className="flex flex-col items-center py-4">
                        {navLinks.map(link => (
                             <a key={link} href={`#${link}`} onClick={(e) => { e.preventDefault(); scrollToSection(link); setIsMenuOpen(false); }}
                                className={`capitalize w-full text-center py-4 transition-all duration-300 hover:bg-cyan-900/50 ${activeSection === link ? 'text-white bg-cyan-900/30' : 'text-cyan-300/70'}`}>
                                {link}
                            </a>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
};

const SocialLinks = () => (
    <div className="hidden md:flex fixed bottom-0 left-8 flex-col items-center space-y-4 z-40">
        {[
            { href: "https://github.com/iamkrshivam", icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg> },
            { href: "https://www.linkedin.com/in/shivam-kumar-243a39389/", icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg> },
            ].map((social, i) => (
            <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className="p-2 text-cyan-300/60 hover:text-cyan-300 hover:scale-110 transition-all duration-300">{social.icon}</a>
        ))}
        <div className="w-px h-24 bg-cyan-300/30"></div>
    </div>
);

const Footer = () => (
    <footer className="relative z-20 text-center py-8 text-cyan-300/60 text-sm">
        <p>Designed & Built by SHIVAM KUMAR</p>
        <p>I Hope You Liked It.</p>
    </footer>
);

// --- Section Components ---

const SectionTitle = ({ title, number }) => (
    <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 flex items-center whitespace-nowrap">
        <span className="text-cyan-400 mr-4 text-2xl md:text-3xl">0{number}.</span> {title}
        <span className="flex-grow h-px bg-cyan-300/20 ml-6 w-full"></span>
    </h2>
);

const GlitchText = ({ text }) => <div className="glitch-text" data-text={text}>{text}</div>;

const Hero = () => {
    const codeLines = [
        "// Firing up mission scanner...",
        "import { mind } for 'next mission';",
        "class SystemAudit {",
        "  constructor() {",
        "    this.target = 'next victim';",
        "    this.vulnerabilities = [everything];",
        "  }",
        "  runScan() {",
        "    console.log(`Scanning ${this.target}...`);",
        "    return 'Next Target Found. Lets' Attack.';",
        "  }",
        "}",
    ];
    const [typedCode, setTypedCode] = useState("");

    useEffect(() => {
        const fullCode = codeLines.join('\n');
        let i = 0;
        const typingInterval = setInterval(() => {
            setTypedCode(fullCode.substring(0, i));
            i++;
            if (i > fullCode.length) clearInterval(typingInterval);
        }, 50);
        return () => clearInterval(typingInterval);
    }, []);

    return (
        <div className="w-full flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-3/5 text-center md:text-left">
                <p className="text-lg md:text-xl text-cyan-400 mb-2">Hello, my designation is</p>
                <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white"><GlitchText text="SHIVAM KUMAR" /></h1>
                <h2 className="text-2xl md:text-3xl text-cyan-300 mb-6">&gt; B.Tech CSE (Cybersecurity) Student </h2>
                <p className="max-w-xl mx-auto md:mx-0 text-cyan-300/80 mb-8">"I explore cybersecurity, ethical hacking, and pentesting, turning complex challenges into practical solutions while constantly learning and innovating in the digital world."</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                    <a href="#contact" className="cyber-button">Initiate Contact</a>
                    {/* FIX: This link requires a 'public' folder at the root of your project containing 'resume.pdf' */}
                    <a href="/resume.pdf" download="ShivamKumar-Resume.pdf" className="cyber-button-outline">Download CV <DownloadIcon /></a>
                </div>
            </div>
            <div className="md:w-2/5 mt-12 md:mt-0">
                <div className="bg-[#0D1117]/80 backdrop-blur-sm border border-cyan-300/20 p-4 rounded-lg shadow-lg shadow-cyan-500/10">
                    <div className="flex space-x-1.5 p-3 bg-gray-800/50 rounded-t-md">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <pre className="text-sm text-green-400 p-4 overflow-x-auto">
                        <code>{typedCode}</code>
                        <span className="animate-blink text-white">|</span>
                    </pre>
                </div>
            </div>
        </div>
    );
};

const About = () => (
    <div>
        <SectionTitle title="About Me" number={1} />
        <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-2/3 text-cyan-300/80 space-y-4 text-base leading-relaxed">
                <p>I am Shivam Kumar, a B.Tech CSE student specializing in Cybersecurity. Passionate about ethical hacking, network security, and digital forensics, I enjoy exploring the intricacies of how systems work and how to protect them from modern cyber threats.</p>
                <p>I’m constantly learning new technologies and tools, from programming in C, C++, and Python, to experimenting with Linux, networking, and penetration testing. My goal is to become a proficient ethical hacker and cybersecurity professional, building secure and resilient digital systems that make the digital world safer.</p>
                <p>Outside of my professional work, I contribute to open-source security tools, participate in CTF competitions, and research to enhance computer security.</p>
            </div>
            <div className="md:w-1/3 flex justify-center items-center">
                 <div className="relative w-64 h-64 group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                    <div className="relative w-full h-full p-1 bg-black rounded-lg">
                     {/* FIX: Using a placeholder. For your image, create a 'public' folder, add 'Shivam.jpg', and set src="/Shivam.jpg" */}
                     <img src="https://placehold.co/300x300/0a0a0a/00FFFF?text=SK" alt="Shivam Kumar" className="w-full h-full object-cover rounded-md grayscale group-hover:grayscale-0 transition-all duration-500"/>
                        <div className="absolute inset-0 bg-cyan-900/30 mix-blend-color group-hover:bg-transparent transition-all duration-500"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const SkillCard = ({ category, skills, icon }) => (
    <div className="border border-cyan-300/10 rounded-lg p-6 bg-black/20 backdrop-blur-sm transform transition-transform hover:-translate-y-2">
        <div className="flex items-center justify-center gap-4 mb-6">
            <span className="text-cyan-400">{icon}</span>
            <h3 className="text-xl font-bold text-white">{category}</h3>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
            {skills.map(skill => (
                <div key={skill} className="group relative">
                    <div className="skill-item text-sm">{skill}</div>
                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 z-10 w-auto p-2 text-xs text-black bg-cyan-300 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">{skill}</span>
                </div>
            ))}
        </div>
    </div>
);

const Skills = () => {
    const skillsData = [
        { category: "Languages & Scripting", skills: ["Python", "Bash","Linux","HTML","CSS","JavaScript", "C", "C++"], icon: <CodeIcon /> },
        { category: "Security Tools", skills: ["Wireshark", "Nmap", "Metasploit", "Ettercap", "Burp Suite", "Ghidra"], icon: <ShieldIcon /> },
        { category: "Networking & Protocols", skills: ["TCP/IP", "OSI Model", "IPv4/IPv6", "Network Troubleshooting", "Basic CCNA Concepts"], icon: <BrainIcon /> },
        { category: "Other Tools & Platforms", skills: ["Git", "GitHub", "VirtualBox", "Termux", "Linux Command Line"], icon: <ServerIcon /> },
        { category: "Operating System", skills: ["Windows", "Linux (Debian/Parrot/Kali)", "macOS", "Android"], icon: <ServerIcon /> },
        { category: "Soft Skills", skills: ["Problem Solving", "Analytical Thinking", "Attention to Detail", "Self-Learning", "Curiosity"], icon: <ServerIcon /> },
       
    ];


    return (
        <div>
            <SectionTitle title="Skills " number={2} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {skillsData.map((skillSet) => (
                    <SkillCard key={skillSet.category} {...skillSet} />
                ))}
            </div>
        </div>
    );
};

const Experience = () => {
    const jobs = [
        {
            company: "Darbhanga College of Engeneering",
            role: "Student",
            duration: "2024 - Present",
            tasks: [
                "Currently Student of B.Tech C.S.E(Cybersecurity)"
            ]
        },
        
    ];

    const [activeTab, setActiveTab] = useState(0);

    return (
        <div>
            <SectionTitle title="Professional Experience" number={3} />
            <div className="flex flex-col md:flex-row gap-8">
                <div className="flex md:flex-col overflow-x-auto md:overflow-x-visible">
                    {jobs.map((job, index) => (
                        <button key={index} onClick={() => setActiveTab(index)}
                                className={`text-left p-3 whitespace-nowrap border-b-2 md:border-l-2 md:border-b-0 transition-all duration-300 ${activeTab === index ? 'text-cyan-400 border-cyan-400 bg-cyan-900/20' : 'text-cyan-300/70 border-cyan-300/20 hover:bg-cyan-900/20 hover:text-cyan-400'}`}>
                            {job.company}
                        </button>
                    ))}
                </div>
                <div className="w-full">
                    <h3 className="text-xl font-bold text-white">{jobs[activeTab].role} <span className="text-cyan-400">@ {jobs[activeTab].company}</span></h3>
                    <p className="text-sm text-cyan-300/60 mb-4 mt-1">{jobs[activeTab].duration}</p>
                    <ul className="space-y-3">
                        {jobs[activeTab].tasks.map((task, i) => (
                            <li key={i} className="flex items-start">
                                <span className="text-cyan-400 mr-3 mt-1">&#9655;</span>
                                <span className="text-cyan-300/80">{task}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

const ProjectCard = ({ project }) => (
    <a href={project.link} target="_blank" rel="noopener noreferrer" className="block cyber-card group p-6">
        <div className="flex justify-between items-start mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400"><path d="M4 18.5A2.5 2.5 0 0 1 6.5 21H18a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v14.5z"></path><polyline points="14 2 14 8 20 8"></polyline><path d="m10 14-2 2 2 2"></path><path d="m14 14 2 2-2 2"></path></svg>
            <span className="text-cyan-300/60 group-hover:text-cyan-300 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            </span>
        </div>
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{project.title}</h3>
        <p className="text-cyan-300/70 text-sm mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2">
            {project.tags.map(tag => (
                <span key={tag} className="text-xs text-cyan-400 bg-cyan-900/40 px-2 py-1 rounded">{tag}</span>
            ))}
        </div>
    </a>
);

const Projects = () => {
    const projectsData = [
        { title: "Network Monitor Tool", description: "Created a simple Python tool to monitor network traffic and log unusual activity for practice purposes.", tags: ["Python", "Networking", "Cybersecurity"], link: "#" },
        { title: "Password Manager", description: "Built a basic password manager to securely store and retrieve passwords using Python and file encryption.", tags: ["Python", "Encryption", "Security"], link: "#" },
        { title: "Linux Security Script", description: "Developed a small Bash script to automate system updates and apply basic security checks on Linux.", tags: ["Bash", "Linux", "Cybersecurity"], link: "#" }
    ];

    return (
        <div>
            <SectionTitle title="Project Showcase" number={4} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projectsData.map(project => <ProjectCard key={project.title} project={project} />)}
            </div>
        </div>
    );
};

const Certifications = () => {
    const certificationsData = [
        { name: "Introduction to Cybersecurity", issuer: "Cisco Networking Academy", link: "https://www.credly.com/badges/e4a4648c-ef48-484c-a460-f8d6e7793c9b" },
        { name: "Computer Hardware Basics", issuer: " Darbhanga College of Engineering through the Cisco Networking Academy program", link: "https://www.credly.com/badges/8872f6e1-8b3f-4d27-817e-28c36cbe1760" },
        // FIX: This link requires a 'public' folder at the root of your project containing 'Ethical-Hacker-Cert.pdf'
        { name: "Ethical Hacker", issuer: "Cisco Networking Academy", link: "/Ethical-Hacker-Cert.pdf" }, 
    ];
    return (
        <div>
            <SectionTitle title="Certifications" number={5} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {certificationsData.map(cert => (
                    <a key={cert.name} href={cert.link} target="_blank" rel="noopener noreferrer" className="block cyber-card group p-6">
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-cyan-400"><CertificationIcon /></span>
                            <span className="text-cyan-300/60 group-hover:text-cyan-300 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                            </span>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">{cert.name}</h3>
                        <p className="text-cyan-300/70 text-sm">{cert.issuer}</p>
                    </a>
                ))}
            </div>
        </div>
    );
};

const Contact = () => {
    const [status, setStatus] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('Sending...');
        // Mock sending form
        setTimeout(() => {
            setStatus('Signal received! I will be in touch.');
            e.target.reset();
            setTimeout(() => setStatus(''), 5000);
        }, 1500);
    };

    return (
        <div className="text-center max-w-2xl mx-auto">
            <SectionTitle title="Get In Touch" number={6} />
            <p className="text-cyan-300/80 mb-8">
                My inbox is always open. Whether you have a question, a project proposal, or just want to connect, feel free to reach out. I'll do my best to get back to you!
            </p>
            <form onSubmit={handleSubmit} className="w-full mx-auto flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    <input type="text" name="name" placeholder="Name / Alias" required className="w-full bg-black/30 border border-cyan-300/20 p-3 rounded-md focus:outline-none focus:border-cyan-400 transition-colors" />
                    <input type="email" name="email" placeholder="Email Address" required className="w-full bg-black/30 border border-cyan-300/20 p-3 rounded-md focus:outline-none focus:border-cyan-400 transition-colors" />
                </div>
                <textarea name="message" rows="5" placeholder="Your message..." required className="bg-black/30 border border-cyan-300/20 p-3 rounded-md focus:outline-none focus:border-cyan-400 transition-colors"></textarea>
                <button type="submit" className="cyber-button self-center mt-4">
                    Send Transmission
                </button>
            </form>
            {status && <p className="mt-4 text-green-400">{status}</p>}
        </div>
    );
};


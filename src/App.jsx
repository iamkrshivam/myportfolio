import React, { useState, useEffect, useRef } from 'react';

// --- MAIN APP ---
export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [visibleSections, setVisibleSections] = useState(new Set(['home'])); // first section visible

  const sectionRefs = {
    home: useRef(null),
    about: useRef(null),
    skills: useRef(null),
    contact: useRef(null),
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            setVisibleSections(prev => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.1 } // trigger when 10% visible
    );

    Object.values(sectionRefs).forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => {
      Object.values(sectionRefs).forEach(ref => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, []);

  const scrollToSection = (sectionId) => {
    sectionRefs[sectionId].current.scrollIntoView({ behavior: 'smooth' });
  };

  const isSectionVisible = (id) => visibleSections.has(id);

  return (
    <div className="bg-[#0a0a0a] text-cyan-300 font-mono selection:bg-cyan-300 selection:text-black">
      <MatrixRain />

      <div className="fixed top-0 left-0 w-full h-full bg-grid-pattern opacity-10 z-0"></div>
      <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a] z-10"></div>
      <div className="fixed top-[-50%] left-[-50%] w-[200%] h-[200%] bg-radial-gradient opacity-20 animate-aurora z-0"></div>

      <Header activeSection={activeSection} scrollToSection={scrollToSection} />
      <SocialLinks />

      <main className="relative z-20 container mx-auto px-4 md:px-8 lg:px-16 xl:px-20">
        <section
          id="home"
          ref={sectionRefs.home}
          className={`min-h-screen flex items-center transition-opacity duration-1000 ${isSectionVisible('home') ? 'opacity-100' : 'opacity-0'}`}
        >
          <Hero />
        </section>

        <section
          id="about"
          ref={sectionRefs.about}
          className={`py-20 md:py-32 transition-opacity duration-1000 ${isSectionVisible('about') ? 'opacity-100' : 'opacity-0'}`}
        >
          <About />
        </section>

        <section
          id="skills"
          ref={sectionRefs.skills}
          className={`py-20 md:py-32 transition-opacity duration-1000 ${isSectionVisible('skills') ? 'opacity-100' : 'opacity-0'}`}
        >
          <Skills />
        </section>

        <section
          id="contact"
          ref={sectionRefs.contact}
          className={`py-20 md:py-32 transition-opacity duration-1000 ${isSectionVisible('contact') ? 'opacity-100' : 'opacity-0'}`}
        >
          <Contact />
        </section>
      </main>

      <Footer />
    </div>
  );
}

// --- MATRIX RAIN BACKGROUND ---
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

    const characters = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#0ff';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
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

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0 opacity-20" />;
};

// --- HEADER ---
const Header = ({ activeSection, scrollToSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navLinks = ['home', 'about', 'skills', 'contact'];

  return (
    <header className="fixed top-0 left-0 w-full p-4 md:p-6 z-50 bg-black/50 backdrop-blur-lg border-b border-cyan-300/10">
      <div className="container mx-auto flex justify-between items-center">
        <a href="#home" className="text-2xl font-bold glitch-text" data-text="SHIVAM KUMAR">
          SHIVAM KUMAR
        </a>
        <nav className="hidden md:flex space-x-8">
          {navLinks.map(link => (
            <a
              key={link}
              href={`#${link}`}
              onClick={(e) => { e.preventDefault(); scrollToSection(link); }}
              className={`capitalize text-sm tracking-widest transition-all duration-300 hover:text-white hover:shadow-cyan-glow relative after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-full after:h-[2px] after:bg-cyan-400 after:scale-x-0 after:origin-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-left ${activeSection === link ? 'text-white shadow-cyan-glow' : 'text-cyan-300/70'}`}
            >
              <span className="text-cyan-400">/</span>{link}
            </a>
          ))}
        </nav>
        <button
          className="md:hidden z-50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Open menu"
        >
          <div className={`w-6 h-0.5 bg-cyan-300 mb-1.5 transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
          <div className={`w-6 h-0.5 bg-cyan-300 transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
          <div className={`w-6 h-0.5 bg-cyan-300 mt-1.5 transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-black/80 backdrop-blur-lg">
          <nav className="flex flex-col items-center py-4">
            {navLinks.map(link => (
              <a
                key={link}
                href={`#${link}`}
                onClick={(e) => { e.preventDefault(); scrollToSection(link); setIsMenuOpen(false); }}
                className={`capitalize w-full text-center py-4 transition-all duration-300 hover:bg-cyan-900/50 ${activeSection === link ? 'text-white bg-cyan-900/30' : 'text-cyan-300/70'}`}
              >
                {link}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

// --- SOCIAL LINKS ---
const SocialLinks = () => (
  <div className="hidden md:flex fixed bottom-0 left-8 flex-col items-center space-y-4 z-40">
    <a href="#" target="_blank" rel="noopener noreferrer" className="p-2 text-cyan-300/60 hover:text-cyan-300 hover:scale-110 transition-all duration-300">
      {/* GitHub Icon */}
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
    </a>
    <a href="#" target="_blank" rel="noopener noreferrer" className="p-2 text-cyan-300/60 hover:text-cyan-300 hover:scale-110 transition-all duration-300">
      {/* LinkedIn Icon */}
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
    </a>
    <div className="w-px h-24 bg-cyan-300/30"></div>
  </div>
);

// --- FOOTER ---
const Footer = () => (
  <footer className="relative z-20 text-center py-8 text-cyan-300/40 text-sm">
    <p>Designed & Built by Shivam Kumar</p>
    <p>Inspired by modern cyberpunk aesthetics.</p>
  </footer>
);

// --- HELPER COMPONENTS ---
const GlitchText = ({ text }) => (
  <div className="glitch-text" data-text={text}>{text}</div>
);

const SectionTitle = ({ title, number }) => (
  <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 flex items-center">
    <span className="text-cyan-400 mr-4 text-2xl md:text-3xl">0{number}.</span> {title}
    <span className="flex-grow h-px bg-cyan-300/20 ml-6"></span>
  </h2>
);

// --- HERO SECTION ---
const Hero = () => {
  const codeLines = [
    "// Initializing consciousness...",
    "import { Mind } from 'cybersec_student';",
    "class Portfolio extends Mind {",
    "  constructor() {",
    "    this.name = 'Shivam Kumar';",
    "    this.role = 'Aspiring Ethical Hacker';",
    "  }",
    "  mission() {",
    "    return 'To learn, adapt, and secure the digital world';",
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
      <div className="md:w-1/2 text-center md:text-left">
        <p className="text-lg md:text-xl text-cyan-400 mb-2">Hello, my name is</p>
        <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white">
          <GlitchText text="Shivam Kumar" />
        </h1>
        <h2 className="text-2xl md:text-3xl text-cyan-300 mb-6">
          &gt; Aspiring Ethical Hacker & Cybersecurity Student
        </h2>
        <p className="max-w-xl mx-auto md:mx-0 text-cyan-300/80 mb-8">
          I am a computer science student passionate about cybersecurity. I'm currently learning to identify vulnerabilities, understand threats, and build secure systems.
        </p>
        <a href="#contact" className="cyber-button">
          Initiate Contact
          <span className="cyber-button__glitch"></span>
        </a>
      </div>
      <div className="md:w-1/2 mt-12 md:mt-0">
        <div className="bg-gray-900/30 backdrop-blur-sm border border-cyan-300/20 p-4 rounded-lg shadow-2xl shadow-cyan-500/10 animated-border">
          <div className="flex space-x-1.5 p-3 bg-gray-800/50 rounded-t-md">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <pre className="text-sm text-green-400 p-4 overflow-x-auto">
            <code>{typedCode}</code>
            <span className="animate-blink">|</span>
          </pre>
        </div>
      </div>
    </div>
  );
};

// --- ABOUT SECTION ---
const About = () => (
  <div>
    <SectionTitle title="About Me" number="1" />
    <p className="text-cyan-300/80 max-w-3xl">
      I am Shivam Kumar, a cybersecurity student with a passion for ethical hacking and securing digital infrastructures. I am constantly exploring new technologies, networking concepts, and security protocols. My goal is to learn, adapt, and contribute to making the internet safer.
    </p>
  </div>
);

// --- SKILLS SECTION ---
const Skills = () => (
  <div>
    <SectionTitle title="Skills" number="2" />
    <ul className="grid grid-cols-2 md:grid-cols-3 gap-6 text-cyan-300/80">
      {['Ethical Hacking', 'Network Security', 'Penetration Testing', 'Python', 'Linux', 'Web Development'].map(skill => (
        <li key={skill} className="border border-cyan-300/20 p-4 rounded-lg hover:bg-cyan-900/20 transition">{skill}</li>
      ))}
    </ul>
  </div>
);

// --- CONTACT SECTION ---
const Contact = () => (
  <div>
    <SectionTitle title="Contact" number="3" />
    <p className="text-cyan-300/80 mb-6">
      Feel free to reach out for collaborations, mentorship, or just to say hi!
    </p>
    <form className="grid gap-4 max-w-md">
      <input type="text" placeholder="Your Name" className="p-3 rounded bg-black/50 border border-cyan-300/20 text-cyan-300" />
      <input type="email" placeholder="Your Email" className="p-3 rounded bg-black/50 border border-cyan-300/20 text-cyan-300" />
      <textarea placeholder="Your Message" rows="4" className="p-3 rounded bg-black/50 border border-cyan-300/20 text-cyan-300"></textarea>
      <button type="submit" className="bg-cyan-400 text-black p-3 rounded hover:bg-cyan-500 transition">Send Message</button>
    </form>
  </div>
);

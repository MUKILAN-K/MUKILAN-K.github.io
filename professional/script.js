/* ============================================================
   PROFESSIONAL PORTFOLIO HOME — BEHAVIOR
   ScrollSpy · Theme Cacher · Spotlight tracker · UHD Particles Canvas · Details Modal · Typing Loop
   ============================================================ */

'use strict';

// ── DATA DICTIONARY FOR DETAILED DIALOGS ─────────────────────
const modalData = {
    // Professional Summary Card
    "summary-card": {
        category: "Professional Identity",
        title: "Executive Summary",
        desc: "A highly driven AI & Data Science specialist bridging the gap between deep learning parameters and physical edge telemetry circuits.",
        specs: [
            "Areas of Expertise: Machine Learning pipelines, Cloud serverless backends (AWS & IBM), and Embedded hardware layouts.",
            "Key Focus: Sustainable devices, clean-tech sensor grids, public safety alarms, and automated mechatronics.",
            "Research Contribution: Holds 14 registered patents covering integrated mechatronic networks and medical safety enclosures."
        ],
        tags: ["Machine Learning", "Cloud Systems", "Embedded Firmware", "Patent Inventor", "Sustainability"]
    },

    // Education
    "edu-btech": {
        category: "Undergraduate Education",
        title: "B.Tech - Artificial Intelligence and Data Science",
        desc: "Currently pursuing B.Tech in Artificial Intelligence & Data Science at K Ramakrishnan College of Technology. Wielding deep academic foundations in machine learning algorithms, database administration, and mechatronic design.",
        specs: [
            "Current Academic Score: Cumulative GPA of 8.42/10 locked in through the 5th semester.",
            "Relevant Coursework: Neural Networks, Embedded Systems, Database Management (DBMS), Data Structures and Algorithms.",
            "Practical Inventions: Filed multiple utility and design patents in medical and carbon monitoring sectors during college labs."
        ],
        tags: ["Machine Learning", "Data Science", "Embedded IoT", "B.Tech Degree", "Academic Honors"]
    },
    "edu-hsc": {
        category: "Secondary Education",
        title: "Higher Secondary (Class XII)",
        desc: "Completed secondary education at St. Antony's Higher Secondary School with a focus on Mathematics and Physical Sciences.",
        specs: [
            "Final Board Score: Cumulative score of 86.5% achieved in board examinations.",
            "Core Subjects: Physics, Chemistry, Mathematics, and Computer Science."
        ],
        tags: ["High School", "Physical Sciences", "Mathematics"]
    },

    // Stats
    "stat-patents": {
        category: "Intellectual Property Details",
        title: "Registered Patent Portfolio",
        desc: "A comprehensive summary of the 14 intellectual property patents filed under Mukilan K's name.",
        specs: [
            "11 Published Utility Patents: WIPO/IPO registrations covering low-power sensor handshakes and telemetry transmission logic.",
            "3 Invented Design Patents: Blueprint configurations defining wearable medical SOS bands and portable bioreactor casings.",
            "4 Applications Filed: Active applications currently in review with patent validation agencies."
        ],
        tags: ["Utility Claims", "Design blueprints", "Intellectual Property", "WIPO", "IPO"]
    },
    "stat-cgpa": {
        category: "Academic Statistics",
        title: "B.Tech Academic standing",
        desc: "Consistently scoring high marks inside the Artificial Intelligence & Data Science department.",
        specs: [
            "CGPA Score: 8.42 out of 10.0 scale, calculated through the end of the 5th semester.",
            "Active Awards: Received college fellowships for research efforts combining machine learning pipelines with physical IoT models."
        ],
        tags: ["Academic CGPA", "AI & Data Science", "Honor Roll"]
    },
    "stat-languages": {
        category: "Communications & Languages",
        title: "Multilingual Communications Matrix",
        desc: "Proficient in multiple languages, enabling global research operations.",
        specs: [
            "Tamil: Native proficiency (speaking, writing, reading).",
            "English: Professional working proficiency.",
            "Japanese: Certified JLPT N5 Proficiency, handling basic communication triggers."
        ],
        tags: ["Tamil", "English", "Japanese (JLPT N5)"]
    },
    "stat-msme": {
        category: "Research Funding",
        title: "Orchid Solution MSME Grant",
        desc: "Awarded seed capital research funding to commercialize custom hardware prototypes.",
        specs: [
            "Grant Capital: 5 Lakhs awarded by MSME agencies.",
            "Objective: Develop and manufacture AI, IoT, and clean renewable energy products commercially.",
            "Prototypes: Funding directed to build solar bio-purifier nodes and mechatronic rovers."
        ],
        tags: ["MSME Funding", "Seed Grant", "CleanTech Venture", "Product Prototyping"]
    },

    // Projects
    "project-rescuewrist": {
        category: "Embedded AI & Wearable Safety",
        title: "RescueWrist",
        desc: "AI-powered SOS wearable for women safety designed to detect distress vocal cues in real-time, compute safety states, and transmit coordinate beacons over cellular channels.",
        specs: [
            "Edge Keyword Classifier: Runs speech keyword spotting using quantized deep learning parameters directly on low-power microcontrollers.",
            "Autonomous Transceiver: Operates over direct GSM/LTE cellular networks to broadcast geographic coordinates.",
            "GPS/GNSS Tracking: Employs coordinates tracking modules to capture active latitude and longitude coordinates upon emergency trigger."
        ],
        tags: ["ESP32 Firmware", "Speech Recognition", "GPS Module", "Embedded AI", "Cellular Link"]
    },
    "project-biorespira": {
        category: "Ecological Biotech & Telemetry",
        title: "BioRespira",
        desc: "Spirulina-based environmental purification system designed to capture carbon dioxide and filter suspended pollutants.",
        specs: [
            "Carbon Bioreactor: Utilizes Spirulina cultures to capture greenhouse carbon and release clean oxygen.",
            "Telemetry Interface: Monitored by ESP32-CAM nodes, capturing telemetry values locally.",
            "Optical Metrics: Wrote logic checking culture density and triggering notification logs."
        ],
        tags: ["ESP32-CAM", "Spirulina Tower", "Bioreactor Node", "Air Purifier", "CleanTech"]
    },
    "project-trackrobot": {
        category: "Robotics & Railway Safety",
        title: "Railway Crack Detection Robot",
        desc: "Solar-powered autonomous railway inspection system engineered to scan railway tracks and report structural defects.",
        specs: [
            "Ultrasonic Scanning: Employs sensor arrays to identify splits and structural track cracks.",
            "Solar Tracking Charging: Onboard panels automatically track optimal light to extend operating loops.",
            "Edge Transceiver: Fires SMS alerts coordinates warnings when cracks are scanned."
        ],
        tags: ["Arduino Core", "Ultrasonic Array", "Solar Tracker", "GPS Telemetry", "Robotics"]
    },
    "project-zentra": {
        category: "Enterprise Cloud SaaS",
        title: "Zentra",
        desc: "Retail management SaaS platform designed to manage retail inventories and branch analytics.",
        specs: [
            "Inventory Indexes: High-throughput ledger coordinates stock levels across multiple branches.",
            "Analytics Dashboard: Captures sales performance metrics and renders analytical data charts.",
            "Automatic Alerts: Employs serverless hooks to flag sub-optimal inventory levels."
        ],
        tags: ["React.js", "Supabase", "Serverless APIs", "Sales Analytics", "SaaS Core"]
    },
    "project-purifier": {
        category: "CleanTech & Web3",
        title: "SmartAir",
        desc: "Solar-powered decentralized air purifier with blockchain monitoring.",
        specs: [
            "Ledger Registry: Air filtration metrics and filter health indexes are written securely to blockchain nodes.",
            "Smart Contracts: Employs Solidity scripts to coordinate database handshakes.",
            "Solar Power Grid: Battery cells run on solar energy parameters, ensuring self-sufficiency."
        ],
        tags: ["Solidity", "Blockchain Ledger", "Solar Charging", "CleanTech", "Smart Contracts"]
    },
    "project-carznow": {
        category: "Database Systems",
        title: "CarzNow",
        desc: "Car rental database management system featuring optimized SQL query tables and reservations scheduling logic.",
        specs: [
            "SQL Architectures: Optimized indexes, schema designs, and reservation scheduler queries.",
            "Transaction Locks: Multi-connection locks prevent data race conflicts during bookings.",
            "Analytics Schemas: Database queries track rental trends and fleet metrics."
        ],
        tags: ["SQL", "PostgreSQL", "DBMS Design", "Optimized Schema", "Enterprise database"]
    },

    // Experience
    "exp-brand": {
        category: "Work Experience",
        title: "Brand Ambassador at Remote Recruiters Philippines",
        desc: "Managed representative channels and coordinated digital pipelines connecting recruiting teams globally.",
        specs: [
            "Digital Outreach: Coordinated communications models across remote hubs.",
            "Channel Management: Managed brand representation platforms and resolved candidate queries."
        ],
        tags: ["Brand Ambassador", "Remote Operations", "Outreach", "Channel Coordination"]
    },
    "exp-greenskill": {
        category: "Work Internship",
        title: "AI Intern, GreenSkill AI (Edunet Foundation) with SHELL",
        desc: "Developed machine learning forecasting models and sensor telemetry programs under SHELL sustainability frameworks.",
        specs: [
            "Forecasting Models: Coded Scikit-Learn regression pipelines forecasting environmental trends.",
            "Telemetry Firmware: Programmed ESP32 sensor protocols, stabilizing data packet deliveries."
        ],
        tags: ["GreenSkill AI", "SHELL Collaboration", "Python ML", "ESP32", "Carbon Telemetry"]
    },
    "exp-ibm": {
        category: "Work Internship",
        title: "Cloud Intern, IBM Cloud (Edunet + IBM)",
        desc: "Architected serverless microservices and explored container deployment arrays on IBM Cloud networks.",
        specs: [
            "Cloud Architectures: Wrote serverless functions reducing deployment latency.",
            "Kubernetes Orchestration: Explored container pod controls and scaled network targets."
        ],
        tags: ["IBM Cloud", "Serverless", "Kubernetes Arrays", "Cloud Storage"]
    },
    "exp-inexus": {
        category: "Work Internship",
        title: "Wix Web Developer Intern at Inexus",
        desc: "Constructed customized database integrations and responsive interface layouts.",
        specs: [
            "Database Integrations: Structured secure collections with filter parameters.",
            "Responsive Designs: Managed component layout coordinates, ensuring smooth navigation."
        ],
        tags: ["Web Layouts", "Wix Databases", "Responsive UI", "SEO Coordination"]
    },

    // Achievements
    "ach-msme": {
        category: "Government Grant Details",
        title: "MSME Grant Recipient (₹5 Lakhs)",
        desc: "Seed capital grant awarded by MSME agencies to prototype ecological telemetry and IoT solutions.",
        specs: [
            "Orchid Solutions Venture: Venture aimed at developing commercial AI, IoT, and renewable energy products.",
            "Commercialization: Funding directed to construct solar bio-purifiers and mechatronic rovers."
        ],
        tags: ["MSME Funding", "Seed Capital", "CleanTech Venture", "Product Prototyping"]
    },
    "ach-design-patents": {
        category: "Intellectual Property Designs",
        title: "Registered Design Patents (3)",
        desc: "Industrial designs officially registered under Indian Patent Office guidelines.",
        specs: [
            "Smart Water Bottle Design: Integrated sensors to monitor fluid levels and report metrics.",
            "Sand Siever Design: Custom mechatronic separator layout designed to automate construction sieving.",
            "Brick Holder Design: Ergonomic hardware tool designed to optimize manual brick masonry."
        ],
        tags: ["Design Patents", "Hardware Blueprints", "Patent Inventions"]
    },
    "ach-utility-patents": {
        category: "Intellectual Property Utilities",
        title: "Published Utility Patents (11)",
        desc: "Utility patents registered across WIPO and IPO databases.",
        specs: [
            "Telemetry Handshakes: Circuit logic securing low-power transceiver coordinate dispatches.",
            "Gas Bioreactors: Structural pathways managing Spirulina microalgae parameters dynamically."
        ],
        tags: ["Utility Patents", "Telemetry Circuits", "IPO Registry", "WIPO Standards"]
    },
    "ach-patent-apps": {
        category: "Intellectual Property Applications",
        title: "Patent Applications Filed (4)",
        desc: "Four additional intellectual property patent applications currently in active filing stages.",
        specs: [
            "Status: WIPO / Indian Patent Office database coordinates registered.",
            "Subject Areas: Assistive medical sensors and clean energy-based smart devices."
        ],
        tags: ["Patent Filings", "WIPO Applications", "Invention Pipeline"]
    },
    "ach-aws": {
        category: "Featured Certification",
        title: "AWS Certified Solutions Architect – Associate",
        desc: "Authorized cloud certification validating technical skills to deploy reliable AWS infrastructures.",
        specs: [
            "AWS Services: Configured serverless compute functions on AWS Lambda, API Gateway nodes, and DynamoDB schemas.",
            "Architecture: Established highly-available load balancers and auto-healing groups."
        ],
        tags: ["AWS Architect", "Cloud Security", "Serverless Networks", "VPC Networking"]
    },
    "ach-ibm": {
        category: "Featured Certification",
        title: "IBM Python for Data Science",
        desc: "Professional certifications validating statistical analytics and ML pipelines.",
        specs: [
            "Python: Wielding data analysis frameworks (pandas, NumPy) and predictive scikit-learn systems.",
            "Data Science: Coded predictive regression modules and generated visual graphs."
        ],
        tags: ["IBM Certification", "Python Core", "Data Science Models", "Data Analytics"]
    },
    "ach-jlpt": {
        category: "Language Certification",
        title: "JLPT N5 – Japanese Language Proficiency",
        desc: "Certified Japanese Language Proficiency N5.",
        specs: [
            "Japanese: Certified basic Japanese reading, writing, and communication protocols.",
            "Research Reach: Facilitates cross-border scientific telemetry and technical cooperation."
        ],
        tags: ["JLPT N5 Japanese", "Language Proficiency", "Global Engineering"]
    },
    "ach-tata": {
        category: "Featured Certification",
        title: "Tata Data Visualization Virtual Experience",
        desc: "Data analytics certification demonstrating statistical visualization skills.",
        specs: [
            "Data Models: Engineered business telemetry dashboards charting database indices.",
            "Statistical Analysis: Wrote visualization scripts querying SQL databases."
        ],
        tags: ["Tata Virtual Program", "Data Visualization", "Statistical Analysis"]
    }
};

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initScrollSpy();
    initContactForm();
    initCardSpotlights();
    initScrollReveals();
    initStatsCounters();
    initHeroCanvas();
    initDetailModals();
    initTypingAnimation();
});

// ── THEME TOGGLER ─────────────────────────────────────────────
function initTheme() {
    const themeBtn = document.getElementById('theme-toggle-btn');
    const body = document.body;

    const savedTheme = localStorage.getItem('professional-theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
    } else {
        body.classList.remove('dark-theme');
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            body.classList.toggle('dark-theme');
            const isDark = body.classList.contains('dark-theme');
            localStorage.setItem('professional-theme', isDark ? 'dark' : 'light');
        });
    }
}

// ── HEADER SCROLLSPY & ACTIVE TRACKER ─────────────────────────
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu-links a[href^="#"]');

    function spy() {
        const scrollY = window.pageYOffset + 100; // Offset for sticky navbar

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop;
            const id = section.getAttribute('id');
            const link = document.querySelector(`.nav-menu-links a[href="#${id}"]`);

            if (link) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            }
        });
    }

    window.addEventListener('scroll', spy);
    spy(); // Trigger initially to set active state

    // Smooth scroll for nav links (Using native scrollIntoView)
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const headerHeight = document.querySelector('.sticky-header').offsetHeight;
                const targetTop = targetSection.offsetTop - headerHeight + 5;
                window.scrollTo({
                    top: targetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ── SPOTLIGHT MOUSE-MOUNT TRACKER ────────────────────────────
function initCardSpotlights() {
    const spotlightElements = document.querySelectorAll('.skills-card, .project-card, .ach-card, .contact-form-card, .showcase-card, .summary-card-container');
    spotlightElements.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

// ── SCROLL REVEALS (INTERSECTION OBSERVER) ───────────────────
function initScrollReveals() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.skills-card, .project-card, .ach-card, .timeline-step, .about-stat-card, .summary-card-container').forEach(el => {
        el.classList.add('scroll-reveal');
        observer.observe(el);
    });
}

// ── STATS COUNTER TRIGGER ─────────────────────────────────────
function initStatsCounters() {
    const stats = document.querySelectorAll('.about-stat-card .stat-num span');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                animateStat(entry.target);
            }
        });
    }, { threshold: 0.4 });

    stats.forEach(s => observer.observe(s));
}

function animateStat(element) {
    const text = element.textContent.trim();
    const numMatch = text.match(/\d+(\.\d+)?/);
    if (!numMatch) return;
    
    const target = parseFloat(numMatch[0]);
    const suffix = text.replace(numMatch[0], '');
    const isDecimal = numMatch[0].includes('.');
    
    let current = 0;
    const duration = 1500;
    const steps = 60;
    const stepTime = duration / steps;
    const increment = target / steps;
    
    const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + suffix;
            clearInterval(interval);
        } else {
            element.textContent = (isDecimal ? current.toFixed(2) : Math.floor(current)) + suffix;
        }
    }, stepTime);
}

// ── UHD INTERACTIVE HERO CANVAS ENGINE ──────────────────────────
function initHeroCanvas() {
    const canvas = document.getElementById('hero-interactive-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let nodes = [];
    let mouse = { x: null, y: null, radius: 180 };

    function scaleCanvas() {
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);
    }
    
    scaleCanvas();
    window.addEventListener('resize', scaleCanvas);

    class SparkNode {
        constructor() {
            this.x = Math.random() * canvas.clientWidth;
            this.y = Math.random() * canvas.clientHeight;
            this.vx = (Math.random() - 0.5) * 0.15;
            this.vy = (Math.random() - 0.5) * 0.15;
            this.radius = Math.random() * 1.2 + 0.6;
            this.baseRadius = this.radius;
        }

        update() {
            // Drift velocity
            this.x += this.vx;
            this.y += this.vy;

            // Bounce on boundary limits
            if (this.x < 0 || this.x > canvas.clientWidth) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.clientHeight) this.vy *= -1;

            // Mouse attraction loop
            if (mouse.x !== null && mouse.y !== null) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.hypot(dx, dy);

                if (dist < mouse.radius) {
                    const force = (mouse.radius - dist) / mouse.radius;
                    // Attract gently
                    this.x += (dx / dist) * force * 0.22;
                    this.y += (dy / dist) * force * 0.22;
                    this.radius = this.baseRadius + force * 0.6;
                } else {
                    this.radius = this.baseRadius;
                }
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            const isDark = document.body.classList.contains('dark-theme');
            ctx.fillStyle = isDark ? 'rgba(99, 102, 241, 0.4)' : 'rgba(79, 70, 229, 0.22)';
            ctx.fill();
        }
    }

    function initNodes() {
        nodes = [];
        const count = Math.min(45, Math.floor((canvas.clientWidth * canvas.clientHeight) / 16000));
        for (let i = 0; i < count; i++) {
            nodes.push(new SparkNode());
        }
    }
    initNodes();

    // Reinitialize nodes if layout bounds scale
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(initNodes, 250);
    });

    // Tracking mouse actions on the hero section only
    const heroSection = document.getElementById('hero');
    heroSection.addEventListener('mousemove', (e) => {
        const rect = heroSection.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });

    heroSection.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    function animate() {
        ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

        nodes.forEach(node => {
            node.update();
            node.draw();
        });

        // Connection lines between nearby nodes
        const maxDist = 110;
        const isDark = document.body.classList.contains('dark-theme');
        
        ctx.lineWidth = 0.4;
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dist = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
                if (dist < maxDist) {
                    const alpha = (1 - dist / maxDist) * 0.12;
                    ctx.strokeStyle = isDark 
                        ? `rgba(99, 102, 241, ${alpha})` 
                        : `rgba(79, 70, 229, ${alpha * 0.8})`;
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.stroke();
                }
            }
        }

        // Draw connections to the mouse cursor
        if (mouse.x !== null && mouse.y !== null) {
            nodes.forEach(node => {
                const dist = Math.hypot(mouse.x - node.x, mouse.y - node.y);
                if (dist < 140) {
                    const alpha = (1 - dist / 140) * 0.12;
                    ctx.strokeStyle = isDark 
                        ? `rgba(99, 102, 241, ${alpha})` 
                        : `rgba(79, 70, 229, ${alpha * 0.8})`;
                    ctx.lineWidth = 0.45;
                    ctx.beginPath();
                    ctx.moveTo(node.x, node.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }
            });
        }

        requestAnimationFrame(animate);
    }
    animate();
}

// ── DETAILS DIALOG MODAL TRIGGERS ─────────────────────────────
function initDetailModals() {
    const modal = document.getElementById('details-modal');
    const closeBtn = document.getElementById('modal-close-btn');
    const contentArea = document.getElementById('modal-content-area');
    const triggers = document.querySelectorAll('[data-modal]');

    if (!modal || !closeBtn || !contentArea) return;

    function openModal(modalId) {
        const data = modalData[modalId];
        if (!data) return;

        // Render contents dynamically
        contentArea.innerHTML = `
            <span class="modal-category">${data.category}</span>
            <h3 class="modal-title">${data.title}</h3>
            <p class="modal-body-text">${data.desc}</p>
            <div class="modal-section">
                <h4 class="modal-section-title">Key Specifications &amp; Overview</h4>
                <ul class="modal-specs-list">
                    ${data.specs.map(spec => `<li>${spec}</li>`).join('')}
                </ul>
            </div>
            <div class="modal-section">
                <h4 class="modal-section-title">Technologies &amp; Frameworks</h4>
                <div class="modal-tags-wrapper">
                    ${data.tags.map(tag => `<span class="modal-tag">${tag}</span>`).join('')}
                </div>
            </div>
        `;

        modal.classList.add('open');
        document.body.style.overflow = 'hidden'; // Lock background scrolling
    }

    function closeModal() {
        modal.classList.remove('open');
        document.body.style.overflow = ''; // Unlock background scrolling
    }

    // Add click listeners to all data-modal containers
    triggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            // Prevent navigating away if it happens to be inside a link/button structure
            if (e.target.closest('a') && !e.target.closest('a').getAttribute('href').startsWith('#')) {
                // If it's a direct download or external link click, let it pass
                return;
            }
            e.preventDefault();
            const modalId = trigger.getAttribute('data-modal');
            openModal(modalId);
        });
    });

    // Close options
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close on ESC keypress
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('open')) {
            closeModal();
        }
    });
}

// ── CONTACT UPLINK FORM SUBMISSION ────────────────────────────
function initContactForm() {
    const form = document.getElementById('recruiter-contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simple visual loading feedback
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'TRANSMITTING...';
            submitBtn.disabled = true;

            setTimeout(() => {
                alert('Thank you! Your message has been successfully transmitted.');
                form.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1000);
        });
    }
}

// ── HERO TYPING SEQUENCE ENGINE ───────────────────────────────
function initTypingAnimation() {
    const element = document.getElementById('hero-typing');
    if (!element) return;

    const words = [
        "Building AI Solutions...",
        "Deploying Cloud Systems...",
        "Creating Sustainable Technology...",
        "Designing Intelligent Experiences..."
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 90;
    const deletingSpeed = 45;
    const delayBetweenWords = 1800;

    function type() {
        const currentWord = words[wordIndex];
        if (isDeleting) {
            element.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            element.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let delta = isDeleting ? deletingSpeed : typingSpeed;

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            delta = delayBetweenWords;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            delta = 400;
        }

        setTimeout(type, delta);
    }

    type();
}

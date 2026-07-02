/* ============================================================
   RPG CHARACTER PROFILE HOME DESIGN — SCRIPT
   Mascot Reactivity · Tab Swapper · CRT UI Core Swapping
   ============================================================ */

'use strict';

// ── VISOR FACIAL PATH FORMULAS ────────────────────────────────
const VISOR_EXPRESSIONS = {
    happy: {
        left:  'M 82,84 Q 88,76 94,84',
        right: 'M 106,84 Q 112,76 118,84'
    },
    blink: {
        left:  'M 82,82 L 94,82',
        right: 'M 106,82 L 118,82'
    },
    flat: {
        left:  'M 82,82 L 94,82',
        right: 'M 106,82 L 118,82'
    },
    circles: {
        left:  'M 83,82 A 5,5 0 1 1 93,82 A 5,5 0 1 1 83,82',
        right: 'M 107,82 A 5,5 0 1 1 117,82 A 5,5 0 1 1 107,82'
    },
    wink: {
        left:  'M 82,82 L 94,82',
        right: 'M 106,84 Q 112,76 118,84'
    },
    spark: {
        left:  'M 88,76 L 88,88 M 82,82 L 94,82',
        right: 'M 112,76 L 112,88 M 106,82 L 118,82'
    }
};

const HOLO_CARDS = {
    about:        ['[INVENTOR]', '[AI & DS]', '[B.TECH]'],
    skills:       ['[PyTorch]', '[ESP32]', '[AWS S.A.]'],
    patents:      ['[11 Utility]', '[3 Design]', '[IP Archive]'],
    projects:     ['[RescueWist]', '[BioRespira]', '[SolarGrid]'],
    achievements: ['[IBM Cloud]', '[National Win]', '[Academic Fellow]'],
    profile:      ['[IBM Cloud]', '[@Email]', '[linkedin.com]']
};

let activeExpression = 'happy';
let statsInitialized = false;

// ── EXPOSED SINGLE PAGE INITIALIZER ───────────────────────────
// Called by script.js once the welcome black hole collapses
window.initializeHomepage = function() {
    init3DModel();
    initTheme();
    initTabSwapper();
    initVisorVis();
    initCTAAction();
    initStatsCounter();
    initNeuralConstellation();
    initScrollHijack();
};

function init3DModel() {
    const viewer = document.getElementById('mascot-3d-model');
    if (viewer) {
        if (typeof MODEL_BASE64 !== 'undefined') {
            try {
                const parts = MODEL_BASE64.split(',');
                const mime = parts[0].match(/:(.*?);/)[1];
                const base64Data = parts[1];
                const byteCharacters = atob(base64Data);
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
                const blob = new Blob([byteArray], {type: mime});
                const blobUrl = URL.createObjectURL(blob);
                viewer.src = blobUrl;
            } catch (e) {
                console.error("Failed to parse base64 model, falling back to direct load:", e);
                viewer.src = "../shared/sandrone_rigged_free.glb";
            }
        } else {
            // Direct load over HTTPS if base64 script is not present
            viewer.src = "../shared/sandrone_rigged_free.glb";
        }
    }
}
document.addEventListener('DOMContentLoaded', init3DModel);

// ── THEME SWITCHER ────────────────────────────────────────────
function initTheme() {
    const themeBtn = document.getElementById('theme-toggle');
    const body = document.body;

    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme === 'light') {
        body.classList.remove('dark-theme', 'dark-mode');
        body.classList.add('light-theme', 'light-mode');
    } else {
        body.classList.add('dark-theme', 'dark-mode');
        body.classList.remove('light-theme', 'light-mode');
    }

    if (themeBtn) {
        const newBtn = themeBtn.cloneNode(true);
        themeBtn.parentNode.replaceChild(newBtn, themeBtn);
        
        newBtn.addEventListener('click', () => {
            if (body.classList.contains('light-theme') || body.classList.contains('light-mode')) {
                body.classList.remove('light-theme', 'light-mode');
                body.classList.add('dark-theme', 'dark-mode');
                localStorage.setItem('portfolio-theme', 'dark');
            } else {
                body.classList.remove('dark-theme', 'dark-mode');
                body.classList.add('light-theme', 'light-mode');
                localStorage.setItem('portfolio-theme', 'light');
            }
        });
    }
}

// ── RPG TAB CONTROLLER ────────────────────────────────────────
const TAB_HEADERS = {
    about:        '◈ ATTRIBUTES',
    skills:       '◈ WEAPONS',
    patents:      '◈ ARTIFACTS',
    projects:     '◈ CONSTELLATION',
    achievements: '◈ TALENTS',
    profile:      '◈ PROFILE'
};

function initTabSwapper() {
    const navItems = document.querySelectorAll('.nav-item');
    const infoPanel = document.getElementById('info-panel-content');
    const panelHeader = document.getElementById('dynamic-panel-header');
    
    // Load default template on load
    swapTab('about');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (item.classList.contains('active')) return;
            
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            
            const targetTab = item.getAttribute('data-tab');
            swapTab(targetTab);
        });
    });

    function swapTab(tabId) {
        const template = document.querySelector(`[data-template="${tabId}"]`);
        if (!template) return;

        // Apply slide fade out/in effect
        infoPanel.style.opacity = '0';
        infoPanel.style.transform = 'translateY(10px)';

        setTimeout(() => {
            infoPanel.innerHTML = `<div class="panel-tab-content">${template.innerHTML}</div>`;
            panelHeader.textContent = TAB_HEADERS[tabId] || 'CHARACTER DATA SHEET';
            
            infoPanel.style.opacity = '1';
            infoPanel.style.transform = 'translateY(0)';
            
            // Trigger mascot behavior reaction
            reactMascot(tabId);
            
            // If about is loaded, trigger counters if not yet done
            if (tabId === 'about') {
                initStatsCounter();
            }
        }, 150);
    }
}

// ── COMPANION VISOR FACIAL BLINK LOOP ─────────────────────────
function initVisorVis() {
    const eyeLeft = document.getElementById('visor-eye-left');
    const eyeRight = document.getElementById('visor-eye-right');

    // Run blinking loops
    setInterval(() => {
        if (activeExpression !== 'happy') return; // Don't interrupt processing expression blink
        
        // Quick blink
        setVisorPaths(VISOR_EXPRESSIONS.blink.left, VISOR_EXPRESSIONS.blink.right);
        
        setTimeout(() => {
            if (activeExpression === 'happy') {
                setVisorPaths(VISOR_EXPRESSIONS.happy.left, VISOR_EXPRESSIONS.happy.right);
            }
        }, 180);
    }, 4500);
}

function setVisorPaths(leftPath, rightPath) {
    const eyeLeft = document.getElementById('visor-eye-left');
    const eyeRight = document.getElementById('visor-eye-right');
    if (eyeLeft && eyeRight) {
        eyeLeft.setAttribute('d', leftPath);
        eyeRight.setAttribute('d', rightPath);
    }
}

// ── AI MASCOT TAB REACTION SYSTEM ─────────────────────────────
function reactMascot(tabId) {
    const leftArm = document.querySelector('.robot-left-arm');
    const rightArm = document.querySelector('.robot-right-arm');
    const coreGlow = document.querySelector('.core-glow-pulse');
    const thruster = document.querySelector('.thruster-fire');
    const holoScreens = document.querySelectorAll('.hologram-screen');

    // Reset arm states
    if (leftArm) leftArm.style.transform = 'none';
    if (rightArm) rightArm.style.transform = 'none';
    if (thruster) thruster.style.transform = 'none';

    // Project dynamic holographic cards with scale transition
    const cards = HOLO_CARDS[tabId] || ['</>', '⚡', '◈'];
    holoScreens.forEach((screen, index) => {
        screen.style.transform = 'scale(0.8) translateY(5px)';
        screen.style.opacity = '0.3';
        
        setTimeout(() => {
            const symbolEl = screen.querySelector('.holo-symbol');
            if (symbolEl && cards[index]) {
                symbolEl.textContent = cards[index];
            }
            screen.style.transform = 'none';
            screen.style.opacity = '1';
        }, 120);
    });

    switch (tabId) {
        case 'about':
            activeExpression = 'happy';
            setVisorPaths(VISOR_EXPRESSIONS.happy.left, VISOR_EXPRESSIONS.happy.right);
            // Wave left arm
            if (leftArm) {
                leftArm.style.transformOrigin = '60px 130px';
                leftArm.style.transform = 'rotate(-30deg)';
            }
            break;

        case 'skills':
            activeExpression = 'circles';
            setVisorPaths(VISOR_EXPRESSIONS.circles.left, VISOR_EXPRESSIONS.circles.right);
            holoScreens.forEach(s => {
                s.style.boxShadow = '0 0 25px var(--neon-cyan)';
            });
            break;

        case 'patents':
            activeExpression = 'spark';
            setVisorPaths(VISOR_EXPRESSIONS.spark.left, VISOR_EXPRESSIONS.spark.right);
            break;

        case 'projects':
            activeExpression = 'flat';
            setVisorPaths(VISOR_EXPRESSIONS.flat.left, VISOR_EXPRESSIONS.flat.right);
            // Jet engines expand
            if (thruster) {
                thruster.style.transform = 'scaleY(1.35) scaleX(1.15)';
            }
            break;

        case 'achievements':
            activeExpression = 'happy';
            setVisorPaths(VISOR_EXPRESSIONS.happy.left, VISOR_EXPRESSIONS.happy.right);
            // Celebrate hands raise
            if (leftArm) {
                leftArm.style.transformOrigin = '60px 130px';
                leftArm.style.transform = 'rotate(-35deg)';
            }
            if (rightArm) {
                rightArm.style.transformOrigin = '140px 130px';
                rightArm.style.transform = 'rotate(35deg)';
            }
            break;

        case 'profile':
            activeExpression = 'wink';
            setVisorPaths(VISOR_EXPRESSIONS.wink.left, VISOR_EXPRESSIONS.wink.right);
            if (leftArm) {
                leftArm.style.transformOrigin = '60px 130px';
                leftArm.style.transform = 'rotate(-15deg)';
            }
            break;
    }
}

// ── ANIMATED STATS COUNTER ────────────────────────────────────
function initStatsCounter() {
    const counterElements = document.querySelectorAll('.stat-num');
    
    counterElements.forEach(el => {
        const target = parseInt(el.getAttribute('data-val'), 10);
        if (isNaN(target)) return;

        let current = 0;
        const duration = 1500; // ms
        const steps = 60;
        const increment = target / steps;
        const stepTime = duration / steps;

        const interval = setInterval(() => {
            current += increment;
            if (current >= target) {
                el.textContent = target;
                clearInterval(interval);
            } else {
                el.textContent = Math.floor(current);
            }
        }, stepTime);
    });
}

// ── CTA ENTRY NAVIGATION ──────────────────────────────────────
function initCTAAction() {
    const ctaBtn = document.getElementById('enter-realm-btn');
    if (ctaBtn) {
        ctaBtn.addEventListener('click', () => {
            const activeItem = document.querySelector('.nav-item.active');
            const activeTab = activeItem ? activeItem.getAttribute('data-tab') : 'about';
            window.location.href = `${activeTab}.html`;
        });
    }
}

// ── NEURAL CONSTELLATION ENGINE ───────────────────────────────
function initNeuralConstellation() {
    const canvas = document.getElementById('neural-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Node {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.35;
            this.vy = (Math.random() - 0.5) * 0.35;
            this.radius = Math.random() * 1.5 + 0.8;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = document.body.classList.contains('light-theme') 
                ? 'rgba(0, 0, 0, 0.12)' 
                : 'rgba(255, 255, 255, 0.18)';
            ctx.fill();
        }
    }

    const nodes = [];
    const nodeCount = Math.min(45, Math.floor((canvas.width * canvas.height) / 30000));
    for (let i = 0; i < nodeCount; i++) {
        nodes.push(new Node());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        nodes.forEach(node => {
            node.update();
            node.draw();
        });

        ctx.lineWidth = 0.5;
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dist = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
                if (dist < 110) {
                    const alpha = (1 - dist / 110) * 0.12;
                    ctx.strokeStyle = document.body.classList.contains('light-theme')
                        ? `rgba(0, 0, 0, ${alpha})`
                        : `rgba(0, 225, 255, ${alpha * 1.5})`;
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.stroke();
                }
            }
        }

        animationFrameId = requestAnimationFrame(animate);
    }

    animate();
}

// ── SCROLL TAB HIJACK CONTROLLER ──────────────────────────────
function initScrollHijack() {
    const tabs = ['about', 'skills', 'patents', 'projects', 'achievements', 'profile'];
    let lastScrollTime = 0;
    const cooldown = 900; // ms to prevent rapid multiple panel skips

    window.addEventListener('wheel', (e) => {
        // Only trigger scroll swap if homepage has been revealed (welcome stage collapsed)
        if (!document.body.classList.contains('home-active')) return;

        const now = Date.now();
        if (now - lastScrollTime < cooldown) return;

        // Find active navigation item
        const activeItem = document.querySelector('.nav-item.active');
        if (!activeItem) return;
        const currentTab = activeItem.getAttribute('data-tab');
        let index = tabs.indexOf(currentTab);

        if (e.deltaY > 0) {
            // Scroll Down -> Next Section
            if (index < tabs.length - 1) {
                index++;
                triggerTabClick(tabs[index]);
                lastScrollTime = now;
            }
        } else if (e.deltaY < 0) {
            // Scroll Up -> Previous Section
            if (index > 0) {
                index--;
                triggerTabClick(tabs[index]);
                lastScrollTime = now;
            }
        }
    }, { passive: true });

    function triggerTabClick(tabId) {
        const targetItem = document.querySelector(`.nav-item[data-tab="${tabId}"]`);
        if (targetItem) {
            targetItem.click();
        }
    }
}

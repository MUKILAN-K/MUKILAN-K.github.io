// Web Audio API Synthesizer for ambient portal audio
class PortalAudio {
    constructor() {
        this.ctx = null;
        this.ambientDrone = null;
        this.isPlaying = false;
    }

    init() {
        if (this.ctx) return;
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }

    startDrone() {
        if (!this.ctx) this.init();
        if (this.isPlaying) return;

        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }

        // Deep space drone
        const droneOsc = this.ctx.createOscillator();
        const droneGain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        droneOsc.type = 'sawtooth';
        droneOsc.frequency.setValueAtTime(55, this.ctx.currentTime); // Low A drone
        
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(140, this.ctx.currentTime);
        filter.Q.setValueAtTime(4, this.ctx.currentTime);

        const lfo = this.ctx.createOscillator();
        const lfoGain = this.ctx.createGain();
        lfo.type = 'sine';
        lfo.frequency.setValueAtTime(0.15, this.ctx.currentTime);
        lfoGain.gain.setValueAtTime(30, this.ctx.currentTime);
        
        lfo.connect(lfoGain);
        lfoGain.connect(filter.frequency);
        lfo.start();

        droneGain.gain.setValueAtTime(0.08, this.ctx.currentTime);

        droneOsc.connect(filter);
        filter.connect(droneGain);
        droneGain.connect(this.ctx.destination);

        droneOsc.start();
        
        this.ambientDrone = {
            osc: droneOsc,
            lfo: lfo,
            gain: droneGain
        };
        this.isPlaying = true;
    }

    stopDrone() {
        if (!this.isPlaying) return;
        
        const now = this.ctx.currentTime;
        if (this.ambientDrone) {
            this.ambientDrone.gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
            setTimeout(() => {
                try {
                    this.ambientDrone.osc.stop();
                    this.ambientDrone.lfo.stop();
                } catch(e) {}
            }, 1300);
        }
        this.isPlaying = false;
    }

    playUnlockSound() {
        if (!this.ctx) this.init();
        const now = this.ctx.currentTime;
        const frequencies = [220, 277.18, 329.63, 440, 554.37, 659.25, 880];
        
        frequencies.forEach((freq, index) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now + (index * 0.08));
            
            gain.gain.setValueAtTime(0, now);
            gain.gain.linearRampToValueAtTime(0.05, now + (index * 0.08) + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.001, now + (index * 0.08) + 1.0);
            
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            
            osc.start(now + (index * 0.08));
            osc.stop(now + (index * 0.08) + 1.2);
        });
    }

    playTransitionSound() {
        if (!this.ctx) this.init();
        const now = this.ctx.currentTime;

        // Giant synthetic portal swoosh
        const osc = this.ctx.createOscillator();
        const noise = this.createNoiseBuffer();
        const oscGain = this.ctx.createGain();
        const noiseGain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(110, now);
        osc.frequency.exponentialRampToValueAtTime(25, now + 1.6);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(80, now);
        filter.frequency.exponentialRampToValueAtTime(15000, now + 1.2);
        filter.Q.setValueAtTime(5, now);

        oscGain.gain.setValueAtTime(0.14, now);
        oscGain.gain.exponentialRampToValueAtTime(0.001, now + 1.8);

        osc.connect(filter);
        filter.connect(oscGain);
        oscGain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 2.0);

        if (noise) {
            const noiseNode = this.ctx.createBufferSource();
            noiseNode.buffer = noise;
            const noiseFilter = this.ctx.createBiquadFilter();
            noiseFilter.type = 'bandpass';
            noiseFilter.frequency.setValueAtTime(150, now);
            noiseFilter.frequency.exponentialRampToValueAtTime(8000, now + 1.2);
            noiseFilter.Q.setValueAtTime(4, now);

            noiseGain.gain.setValueAtTime(0, now);
            noiseGain.gain.linearRampToValueAtTime(0.10, now + 0.4);
            noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 1.8);

            noiseNode.connect(noiseFilter);
            noiseFilter.connect(noiseGain);
            noiseGain.connect(this.ctx.destination);

            noiseNode.start(now);
            noiseNode.stop(now + 2.0);
        }
    }

    createNoiseBuffer() {
        if (!this.ctx) return null;
        const bufferSize = this.ctx.sampleRate * 2.0;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }
        return buffer;
    }

    playBlackHoleRumble() {
        if (!this.ctx) this.init();
        const now = this.ctx.currentTime;
        
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(65, now);
        osc.frequency.linearRampToValueAtTime(30, now + 2.0);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(100, now);
        filter.frequency.exponentialRampToValueAtTime(35, now + 2.0);
        filter.Q.setValueAtTime(8, now);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.3, now + 0.5);
        gain.gain.setValueAtTime(0.3, now + 1.8);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 2.2);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 2.3);

        this.blackHoleActiveRumble = { osc, gain };
    }

    playCollapsePop() {
        if (!this.ctx) this.init();
        const now = this.ctx.currentTime;

        if (this.blackHoleActiveRumble) {
            try {
                this.blackHoleActiveRumble.gain.gain.cancelScheduledValues(now);
                this.blackHoleActiveRumble.gain.gain.setValueAtTime(0.3, now);
                this.blackHoleActiveRumble.gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
            } catch(e) {}
        }

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(120, now);
        osc.frequency.exponentialRampToValueAtTime(30, now + 0.2);

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.4);
    }
}

const portalAudio = new PortalAudio();
let isMuted = true;

// ----------------------------------------------------
// Swirling Particles Vortex Engine (Canvas)
// ----------------------------------------------------
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
let centerX = window.innerWidth / 2;
let centerY = window.innerHeight / 2;
let isEntering = false; // Transition acceleration flag

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    centerX = canvas.width / 2;
    centerY = canvas.height / 2;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class VortexParticle {
    constructor() {
        this.reset();
        // Disperse across orbit on init
        this.distance = Math.random() * (Math.max(canvas.width, canvas.height) / 1.5) + 50;
    }

    reset() {
        this.angle = Math.random() * Math.PI * 2;
        this.distance = Math.random() * 200 + 260; // Spawn outside the core rings
        this.size = Math.random() * 2.2 + 0.4;
        this.angularSpeed = (Math.random() * 0.005 + 0.002) * (Math.random() > 0.3 ? 1 : -1); // Rotational orbit
        this.radialSpeed = Math.random() * 0.2 - 0.1; // Radial drift
        this.alpha = Math.random() * 0.5 + 0.25;
        this.colorIndex = Math.floor(Math.random() * 5) + 1;
    }

    update() {
        if (isEntering) {
            // Spiral inwards rapidly at extreme acceleration
            this.angle += this.angularSpeed * 8;
            this.distance -= (this.distance * 0.08) + 1.5;
            this.alpha = Math.min(1, this.alpha + 0.05);
            if (this.distance < 5) {
                this.distance = 0;
                this.alpha = 0;
            }
        } else {
            // Normal orbit behavior
            this.angle += this.angularSpeed;
            this.distance += this.radialSpeed;

            // Constrain drift distance to keep particles in view
            if (this.distance < 180) {
                this.radialSpeed = Math.abs(this.radialSpeed);
            } else if (this.distance > Math.max(canvas.width, canvas.height)) {
                this.reset();
            }
        }
    }

    draw() {
        if (this.distance === 0 || this.alpha <= 0) return;

        const x = centerX + Math.cos(this.angle) * this.distance;
        const y = centerY + Math.sin(this.angle) * this.distance;

        ctx.save();
        ctx.beginPath();
        ctx.arc(x, y, this.size, 0, Math.PI * 2);

        const isDark = document.body.classList.contains('dark-mode');

        // Dark mode: bright neon colors on dark sky
        // Light mode: deep saturated colors visible on blue sky
        let color;
        if (isDark) {
            color = '255, 250, 230'; // Gold/White default
            if (Math.random() > 0.7) {
                switch(this.colorIndex) {
                    case 1: color = '0, 240, 255'; break;
                    case 2: color = '255, 183, 0'; break;
                    case 3: color = '0, 114, 255'; break;
                    case 4: color = '57, 255, 20'; break;
                    case 5: color = '176, 38, 255'; break;
                }
            }
        } else {
            color = '10, 12, 20'; // Deep navy default
            if (Math.random() > 0.6) {
                switch(this.colorIndex) {
                    case 1: color = '0, 100, 130'; break;  // Deep Cyan
                    case 2: color = '154, 60, 0'; break;   // Deep Orange
                    case 3: color = '13, 71, 161'; break;  // Deep Blue
                    case 4: color = '30, 100, 30'; break;  // Deep Green
                    case 5: color = '90, 20, 140'; break;  // Deep Violet
                }
            }
        }

        ctx.fillStyle = `rgba(${color}, ${this.alpha})`;
        ctx.shadowBlur = this.size * 4;
        ctx.shadowColor = `rgba(${color}, 0.4)`;
        
        ctx.fill();
        ctx.restore();
    }
}

function initParticles() {
    particles = [];
    const count = Math.floor((canvas.width * canvas.height) / 12000);
    for (let i = 0; i < Math.min(count, 140); i++) {
        particles.push(new VortexParticle());
    }
}
initParticles();

function animate() {
    // Semi-transparent redraw to leave a subtle light trail
    const isDark = document.body.classList.contains('dark-mode');
    ctx.fillStyle = isDark ? 'rgba(3, 4, 7, 0.2)' : 'rgba(242, 245, 250, 0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}
animate();


// ----------------------------------------------------
// Connection Simulation
// ----------------------------------------------------
const statusMessage = document.getElementById('status-message');
const progressFill = document.getElementById('loader-progress');
const touchPrompt = document.getElementById('touch-prompt');
const gateContainer = document.getElementById('gate-loader-container');
const portalFlash = document.getElementById('portal-flash');
const mainContent = document.getElementById('main-content');
const audioToggle = document.getElementById('audio-toggle');
const portalTouchCore = document.getElementById('portal-touch-core');

const statusStages = [
    { threshold: 0, text: "CONNECTING..." },
    { threshold: 25, text: "GATHERING COGNITIONS..." },
    { threshold: 50, text: "STABILIZING PORTAL..." },
    { threshold: 75, text: "ESTABLISHING LINK..." },
    { threshold: 100, text: "CONNECTION SECURED" }
];

let progress = 0;
let loadingComplete = false;

function simulateLoading() {
    const interval = setInterval(() => {
        let increment = Math.random() * 2.2 + 0.4;
        // Slow segments to build tension
        if (progress > 35 && progress < 50) increment *= 0.55;
        if (progress > 75 && progress < 85) increment *= 0.45;

        progress = Math.min(100, progress + increment);
        progressFill.style.width = `${progress}%`;

        // Update status text
        const matchedStage = [...statusStages].reverse().find(stage => progress >= stage.threshold);
        if (matchedStage) {
            statusMessage.textContent = matchedStage.text;
        }

        // Light up circular symbols
        const symbols = document.querySelectorAll('.element-symbol');
        symbols.forEach(sym => {
            const index = parseInt(sym.getAttribute('data-element'));
            if (progress >= index * 20) {
                if (!sym.classList.contains('active')) {
                    sym.classList.add('active');
                    if (!isMuted) {
                        portalAudio.playUnlockSound();
                    }
                }
            }
        });

        if (progress >= 100) {
            clearInterval(interval);
            onLoaded();
        }
    }, 40);
}

function onLoaded() {
    loadingComplete = true;
    gateContainer.classList.add('loaded');

    // Fade out progress line
    document.querySelector('.progress-bar-container').classList.add('fade-out');

    // Display the Touch Core prompt
    setTimeout(() => {
        touchPrompt.classList.remove('hidden');
    }, 800);
}

// ----------------------------------------------------
// Touch Core Entering Trigger (Mouse Hover)
// ----------------------------------------------------
function executePortalEntry() {
    if (!loadingComplete || isEntering) return;
    isEntering = true;

    // Play swoop sound if audio is toggled on
    if (!isMuted) {
        portalAudio.playTransitionSound();
        portalAudio.stopDrone();
    }

    // Spin SVG rings into overdrive
    const outerRunes = document.querySelector('.outer-runes');
    const middleSegments = document.querySelector('.middle-segments');
    const middleDots = document.querySelector('.middle-dots');
    const innerSolid = document.querySelector('.inner-solid');

    outerRunes.style.animation = 'rotate-cw 0.8s cubic-bezier(0.8, 0, 0.2, 1) infinite';
    middleSegments.style.animation = 'rotate-ccw 0.7s cubic-bezier(0.8, 0, 0.2, 1) infinite';
    middleDots.style.animation = 'rotate-cw 0.6s cubic-bezier(0.8, 0, 0.2, 1) infinite';
    innerSolid.style.animation = 'rotate-ccw 0.5s cubic-bezier(0.8, 0, 0.2, 1) infinite';

    // Disperse/suck all circular outer symbols inside
    const symbols = document.querySelectorAll('.element-symbol');
    symbols.forEach(sym => {
        sym.style.transform = 'translate(-50%, -50%) scale(0) translateZ(0)';
        sym.style.opacity = '0';
    });

    // Zoom and fade out titles
    const title = document.querySelector('.realm-title');
    title.style.transition = 'transform 0.6s cubic-bezier(0.8, 0, 0.2, 1), opacity 0.6s';
    title.style.transform = 'scale(0.8) translateZ(50px)';
    title.style.opacity = '0';

    touchPrompt.style.transition = 'opacity 0.4s';
    touchPrompt.style.opacity = '0';

    // Trigger blinding white screen flash
    setTimeout(() => {
        portalFlash.classList.add('active');
    }, 1200);

    // Swap panels
    const welcomeStage = document.getElementById('welcome-stage');
    const welcomeContent = document.getElementById('welcome-content');
    const portfolioHomepage = document.getElementById('portfolio-homepage');

    setTimeout(() => {
        gateContainer.classList.add('fade-out');
        welcomeStage.classList.remove('hidden');
        
        setTimeout(() => {
            gateContainer.classList.add('hidden');
            portalFlash.classList.remove('active');
            welcomeStage.classList.add('visible');
            
            // Spawn upward drifting glitters
            startGlitters();
            
            // Interactive click transition: TAP TO BEGIN
            const beginTransition = () => {
                welcomeStage.removeEventListener('click', beginTransition);
                
                // Play entry pop chime
                if (!isMuted) {
                    portalAudio.playCollapsePop();
                }
                
                // Add fade out state to welcome screen
                welcomeStage.classList.add('fade-out');
                
                // Reveal the homepage chamber in the background
                document.body.classList.add('home-active');
                
                // Trigger homepage stats counter & mascot reactions
                if (typeof window.initializeHomepage === 'function') {
                    window.initializeHomepage();
                }
                
                // Complete clean-up after transition finishes (1.5s)
                setTimeout(() => {
                    welcomeStage.classList.add('hidden');
                    gateContainer.classList.add('hidden');
                    if (glitterInterval) {
                        clearInterval(glitterInterval);
                        glitterInterval = null;
                    }
                }, 1500);
            };
            
            welcomeStage.addEventListener('click', beginTransition);
            
        }, 150);
    }, 2500);
}

// Hover/touch triggers entry once loading finishes
portalTouchCore.addEventListener('mouseenter', () => {
    executePortalEntry();
});

portalTouchCore.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Prevent double tap behaviors
    executePortalEntry();
});

// Audio Toggle Button
audioToggle.addEventListener('click', () => {
    isMuted = !isMuted;
    const soundOnIcon = document.querySelector('.icon-sound-on');
    const soundOffIcon = document.querySelector('.icon-sound-off');

    if (isMuted) {
        soundOnIcon.classList.add('hidden');
        soundOffIcon.classList.remove('hidden');
        portalAudio.stopDrone();
    } else {
        soundOnIcon.classList.remove('hidden');
        soundOffIcon.classList.add('hidden');
        portalAudio.init();
        portalAudio.startDrone();
    }
});

// Theme Toggle Button
const themeToggle = document.getElementById('gate-theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    
    const sunIcon = document.querySelector('.icon-sun');
    const moonIcon = document.querySelector('.icon-moon');
    
    if (isDark) {
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
    } else {
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
    }
});

// Trigger loading on page display
window.addEventListener('load', () => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('bypass') === 'true' || document.body.classList.contains('instant-bypass')) {
        const welcomeStage = document.getElementById('welcome-stage');
        const gateLoader = document.getElementById('gate-loader-container');
        if (welcomeStage) {
            welcomeStage.classList.add('hidden');
            welcomeStage.style.display = 'none';
        }
        if (gateLoader) {
            gateLoader.classList.add('hidden');
            gateLoader.style.display = 'none';
        }
        document.body.classList.add('home-active');
        if (typeof window.initializeHomepage === 'function') {
            window.initializeHomepage();
        }
    } else {
        simulateLoading();
    }
});

// Floating Glitters Particle Animation loop
let glitterInterval = null;
function startGlitters() {
    const container = document.getElementById('glitters-container');
    if (!container) return;
    container.innerHTML = '';
    
    glitterInterval = setInterval(() => {
        const p = document.createElement('div');
        p.classList.add('glitter-particle');
        
        // Random horizontal spawn position
        const x = Math.random() * window.innerWidth;
        p.style.left = `${x}px`;
        
        // Random size (3px to 6px)
        const size = 2.5 + Math.random() * 3.5;
        p.style.width = `${size}px`;
        p.style.height = `${size}px`;
        
        // Random drift speed and vertical travel time
        const duration = 4500 + Math.random() * 4500; // 4.5s to 9.0s
        
        container.appendChild(p);
        
        const spawnY = window.innerHeight + 10;
        const startTime = Date.now();
        const driftOffset = -40 + Math.random() * 80;
        
        function step() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const curY = spawnY - (window.innerHeight + 50) * progress;
            const curX = x + driftOffset * Math.sin(progress * Math.PI);
            
            p.style.top = `${curY}px`;
            p.style.left = `${curX}px`;
            
            // Fade in at start, fade out at end
            let opacity = 0;
            if (progress < 0.15) {
                opacity = progress / 0.15;
            } else if (progress > 0.75) {
                opacity = (1 - progress) / 0.25;
            } else {
                opacity = 1;
            }
            p.style.opacity = opacity * 0.7;
            
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                p.remove();
            }
        }
        requestAnimationFrame(step);
        
    }, 200);
}

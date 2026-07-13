// ========== KONFIGURASI ==========
const CONFIG = {
    name: "Daizyla Putri Ratitya",      // Ganti dengan nama penerima
    photo: "img/photo.jpg",            // Path foto penerima
    music: "storage/sound/happy_birthday.mp3", // Path musik
    wishes: [
        "🎂 Semoga panjang umur dan sehat selalu!",
        "✨ Semoga semua impianmu menjadi kenyataan!",
        "💖 Semoga bahagia dan tersenyum setiap hari!",
        "🌟 Semoga sukses dalam segala hal yang dikerjakan!",
        "🎈 Semoga dikelilingi orang-orang yang sayang padamu!",
        "💫 Semoga tahun ini menjadi tahun terbaikmu!",
        "🌸 Semoga selalu diberkahi rezeki yang melimpah!",
        "🎁 Semoga setiap harimu penuh kejutan indah!"
    ],
    balloonColors: ['#ff6b9d', '#c44569', '#f8b500', '#4facfe', '#00f2fe', '#a8edea', '#fed6e3'],
    confettiCount: 150
};

// ========== ELEMENTS ==========
const startScreen = document.getElementById('startScreen');
const startBtn = document.getElementById('startBtn');
const mainContent = document.getElementById('mainContent');
const bgMusic = document.getElementById('bgMusic');
const countdownSection = document.getElementById('countdownSection');
const countdownNumber = document.getElementById('countdownNumber');
const greetingSection = document.getElementById('greetingSection');
const birthdayName = document.getElementById('birthdayName');
const messageSection = document.getElementById('messageSection');
const wishSection = document.getElementById('wishSection');
const wishText = document.getElementById('wishText');
const nextWishBtn = document.getElementById('nextWishBtn');
const balloonSection = document.getElementById('balloonSection');
const balloonsContainer = document.getElementById('balloonsContainer');
const fireworksSection = document.getElementById('fireworksSection');
const closingSection = document.getElementById('closingSection');
const replayBtn = document.getElementById('replayBtn');
const navDots = document.getElementById('navDots');

// ========== STATE ==========
let currentWishIndex = 0;
let currentSection = 0;
const sections = ['countdownSection', 'greetingSection', 'messageSection', 'wishSection', 'balloonSection', 'fireworksSection', 'closingSection'];

// ========== INIT ==========
document.addEventListener('DOMContentLoaded', () => {
    if (birthdayName) {
        const currentHTMLName = birthdayName.textContent.trim();
        if (CONFIG.name && CONFIG.name !== "Nama Orang Spesial" && CONFIG.name !== "masukan nama orang" && CONFIG.name.trim() !== "") {
            birthdayName.textContent = CONFIG.name;
        } else if (currentHTMLName !== "" && currentHTMLName !== "Nama Orang Spesial" && currentHTMLName !== "masukan nama orang") {
            CONFIG.name = currentHTMLName;
        }
    }
    if (navDots) {
        createNavDots();
    }
    if (document.getElementById('confettiCanvas')) {
        setupConfetti();
    }
});

// ========== START BUTTON ==========
if (startBtn && startScreen) {
    startBtn.addEventListener('click', () => {
        startScreen.style.opacity = '0';
        startScreen.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            startScreen.classList.add('hidden');
            if (mainContent) mainContent.classList.remove('hidden');
            if (bgMusic) bgMusic.play().catch(e => console.log('Audio autoplay blocked'));
            startSequence();
        }, 500);
    });
}

// ========== SEQUENCE CONTROLLER ==========
function startSequence() {
    showSection(0); // Countdown
    runCountdown();
}

function showSection(index) {
    sections.forEach((id, i) => {
        const el = document.getElementById(id);
        if (i === index) {
            el.classList.remove('hidden');
            el.style.animation = 'fadeInUp 0.8s ease';
        } else {
            el.classList.add('hidden');
        }
    });
    updateNavDots(index);
    currentSection = index;
}

function nextSection() {
    if (currentSection < sections.length - 1) {
        showSection(currentSection + 1);
        
        // Trigger special effects
        if (currentSection === 2) animateMessageCards();
        if (currentSection === 4) createBalloons();
        if (currentSection === 5) startFireworks();
    }
}

// ========== COUNTDOWN ==========
function runCountdown() {
    let count = 3;
    const interval = setInterval(() => {
        countdownNumber.textContent = count;
        countdownNumber.style.animation = 'none';
        countdownNumber.offsetHeight; // Trigger reflow
        countdownNumber.style.animation = 'countPulse 1s ease-in-out';
        
        count--;
        if (count < 0) {
            clearInterval(interval);
            countdownNumber.textContent = '🎉';
            setTimeout(() => nextSection(), 1000);
        }
    }, 1000);
}

// ========== NAV DOTS ==========
function createNavDots() {
    sections.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.className = 'nav-dot';
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            showSection(i);
            if (i === 2) animateMessageCards();
            if (i === 4) createBalloons();
            if (i === 5) startFireworks();
        });
        navDots.appendChild(dot);
    });
}

function updateNavDots(index) {
    const dots = document.querySelectorAll('.nav-dot');
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

// ========== MESSAGE CARDS ANIMATION ==========
function animateMessageCards() {
    const cards = document.querySelectorAll('.message-card');
    cards.forEach((card, i) => {
        setTimeout(() => {
            card.classList.add('visible');
        }, i * 200);
    });
}

// ========== WISH SECTION ==========
if (nextWishBtn && wishText) {
    nextWishBtn.addEventListener('click', () => {
        wishText.style.animation = 'none';
        wishText.offsetHeight;
        
        currentWishIndex = (currentWishIndex + 1) % CONFIG.wishes.length;
        wishText.textContent = CONFIG.wishes[currentWishIndex];
        wishText.style.animation = 'fadeIn 0.5s ease';
        
        // Create mini confetti burst
        createMiniConfetti(nextWishBtn);
        
        if (currentWishIndex === CONFIG.wishes.length - 1) {
            setTimeout(() => nextSection(), 2000);
        }
    });
}

// ========== BALLOONS ==========
function createBalloons() {
    balloonsContainer.innerHTML = '';
    for (let i = 0; i < 20; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        balloon.style.left = Math.random() * 100 + '%';
        balloon.style.background = CONFIG.balloonColors[Math.floor(Math.random() * CONFIG.balloonColors.length)];
        balloon.style.animationDuration = (Math.random() * 3 + 4) + 's';
        balloon.style.animationDelay = Math.random() * 2 + 's';
        balloon.style.width = (Math.random() * 30 + 50) + 'px';
        balloon.style.height = (parseInt(balloon.style.width) * 1.25) + 'px';
        
        balloon.addEventListener('click', () => {
            balloon.style.transform = 'scale(1.5)';
            balloon.style.opacity = '0';
            setTimeout(() => balloon.remove(), 300);
            createMiniConfetti(balloon);
        });
        
        balloonsContainer.appendChild(balloon);
    }
    
    setTimeout(() => nextSection(), 8000);
}

// ========== CONFETTI ==========
function setupConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    for (let i = 0; i < CONFIG.confettiCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            w: Math.random() * 10 + 5,
            h: Math.random() * 10 + 5,
            color: CONFIG.balloonColors[Math.floor(Math.random() * CONFIG.balloonColors.length)],
            speed: Math.random() * 3 + 2,
            angle: Math.random() * 360,
            spin: Math.random() * 0.2 - 0.1
        });
    }
    
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(p => {
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.angle);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.w/2, -p.h/2, p.w, p.h);
            ctx.restore();
            
            p.y += p.speed;
            p.angle += p.spin;
            
            if (p.y > canvas.height) {
                p.y = -20;
                p.x = Math.random() * canvas.width;
            }
        });
        
        requestAnimationFrame(draw);
    }
    
    draw();
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

function createMiniConfetti(element) {
    const rect = element.getBoundingClientRect();
    const canvas = document.getElementById('confettiCanvas');
    const ctx = canvas.getContext('2d');
    
    for (let i = 0; i < 20; i++) {
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        
        const particle = {
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 10,
            vy: (Math.random() - 0.5) * 10 - 5,
            color: CONFIG.balloonColors[Math.floor(Math.random() * CONFIG.balloonColors.length)],
            size: Math.random() * 6 + 2,
            life: 1
        };
        
        function animateParticle() {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vy += 0.3;
            particle.life -= 0.02;
            
            if (particle.life > 0) {
                ctx.globalAlpha = particle.life;
                ctx.fillStyle = particle.color;
                ctx.fillRect(particle.x, particle.y, particle.size, particle.size);
                ctx.globalAlpha = 1;
                requestAnimationFrame(animateParticle);
            }
        }
        
        animateParticle();
    }
}

// ========== FIREWORKS ==========
function startFireworks() {
    const canvas = document.getElementById('fireworksCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const fireworks = [];
    const particles = [];
    
    class Firework {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height;
            this.targetY = Math.random() * canvas.height * 0.4 + 50;
            this.speed = Math.random() * 3 + 4;
            this.color = CONFIG.balloonColors[Math.floor(Math.random() * CONFIG.balloonColors.length)];
            this.exploded = false;
        }
        
        update() {
            if (!this.exploded) {
                this.y -= this.speed;
                if (this.y <= this.targetY) {
                    this.explode();
                    this.exploded = true;
                }
            }
        }
        
        explode() {
            for (let i = 0; i < 30; i++) {
                particles.push({
                    x: this.x,
                    y: this.y,
                    vx: (Math.random() - 0.5) * 8,
                    vy: (Math.random() - 0.5) * 8,
                    color: this.color,
                    life: 1,
                    size: Math.random() * 3 + 1
                });
            }
        }
        
        draw() {
            if (!this.exploded) {
                ctx.fillStyle = this.color;
                ctx.fillRect(this.x, this.y, 3, 10);
            }
        }
    }
    
    function animate() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        if (Math.random() < 0.05) {
            fireworks.push(new Firework());
        }
        
        fireworks.forEach((fw, i) => {
            fw.update();
            fw.draw();
            if (fw.exploded && particles.length === 0) {
                fireworks.splice(i, 1);
            }
        });
        
        particles.forEach((p, i) => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.1;
            p.life -= 0.02;
            
            if (p.life > 0) {
                ctx.globalAlpha = p.life;
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.globalAlpha = 1;
            } else {
                particles.splice(i, 1);
            }
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    setTimeout(() => nextSection(), 10000);
}

// ========== REPLAY ==========
if (replayBtn) {
    replayBtn.addEventListener('click', () => {
        currentWishIndex = 0;
        if (wishText) wishText.textContent = CONFIG.wishes[0];
        showSection(0);
        runCountdown();
    });
}

// ========== SCROLL NAVIGATION ==========
let isScrolling = false;
window.addEventListener('wheel', (e) => {
    if (isScrolling) return;
    isScrolling = true;
    
    if (e.deltaY > 0 && currentSection < sections.length - 1) {
        nextSection();
    } else if (e.deltaY < 0 && currentSection > 0) {
        showSection(currentSection - 1);
    }
    
    setTimeout(() => isScrolling = false, 1000);
});

// ========== KEYBOARD NAVIGATION ==========
window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        nextSection();
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        if (currentSection > 0) showSection(currentSection - 1);
    }
});
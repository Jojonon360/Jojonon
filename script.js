// 1. Digital Clock Display
function updateClock() {
    const now = new Date();
    const timeString = now.toUTCString().slice(17, 25);
    document.getElementById('clock').innerText = `SYS_TIME: ${timeString} UTC`;
}
setInterval(updateClock, 1000);
updateClock();

// 2. Interactive Scrolling Transition (Intersection Observer)
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const revealElements = document.querySelectorAll('.reveal-right');

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Stop observing once transition has triggered
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

revealElements.forEach(element => {
    observer.observe(element);
});

// 3. HTML5 Canvas: Floating Neon Green Dots Background
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let particlesArray = [];
const numberOfParticles = 45;

// Resize Canvas dynamically
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Particle Constructor
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1; // Mini neon dots
        this.speedX = (Math.random() * 0.4) - 0.2; // Slow floating movement
        this.speedY = (Math.random() * 0.4) - 0.2;
        this.alpha = Math.random() * 0.5 + 0.2; // Opacity level
        this.opacityDirection = Math.random() > 0.5 ? 0.005 : -0.005; // Slow pulsing/fading
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Loop back on edges
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;

        // Pulse alpha values
        this.alpha += this.opacityDirection;
        if (this.alpha >= 0.85 || this.alpha <= 0.15) {
            this.opacityDirection = -this.opacityDirection;
        }
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#39ff14';
        ctx.fillStyle = '#39ff14';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

// Initialize particles
function initParticles() {
    particlesArray = [];
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}
initParticles();

// Loop animation
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    requestAnimationFrame(animate);
}
animate();

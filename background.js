// --- HIGH-FIDELITY CYBERNETIC NEON MATRIX BACKGROUND ENGINE ---

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("neon-lights-container");
    if (!container) return;

    const numHalos = 12;
    const numSparks = 20; // Animated fluorescent dust micro-particles
    const elementsToTrack = [];

    // 1. Generate primary giant glowing organic halos
    for (let i = 0; i < numHalos; i++) {
        const isGreen = i % 2 === 0;
        const width = Math.random() * 200 + 150; // 150px - 350px
        const left = Math.random() * 90;
        const top = Math.random() * 90;
        const duration = Math.random() * 15 + 15; // 15s to 30s
        const delay = Math.random() * -15;

        const halo = document.createElement("div");
        halo.className = "absolute rounded-full pointer-events-none transition-transform duration-1000 ease-out";
        
        if (isGreen) {
            halo.style.background = "radial-gradient(circle, rgba(34, 197, 94, 0.32) 0%, transparent 70%)";
        } else {
            halo.style.background = "radial-gradient(circle, rgba(244, 63, 94, 0.28) 0%, transparent 70%)";
        }

        halo.style.width = `${width}px`;
        halo.style.height = `${width}px`;
        halo.style.left = `${left}%`;
        halo.style.top = `${top}%`;
        halo.style.animation = `floatParticle ${duration}s ease-in-out ${delay}s infinite alternate`;

        container.appendChild(halo);
        elementsToTrack.push({
            el: halo,
            factorX: Math.random() * 15 + 5, // Parallax depth factor
            factorY: Math.random() * 15 + 5
        });
    }

    // 2. Generate small high-density cyber sparks
    for (let j = 0; j < numSparks; j++) {
        const isGreen = j % 2 === 0;
        const size = Math.random() * 4 + 2; // 2px - 6px
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const duration = Math.random() * 8 + 6; // 6s to 14s
        const delay = Math.random() * -10;

        const spark = document.createElement("div");
        spark.className = "absolute rounded-full pointer-events-none transition-transform duration-700 ease-out";
        
        if (isGreen) {
            spark.style.backgroundColor = "rgba(34, 197, 94, 0.85)";
            spark.style.boxShadow = "0 0 10px rgba(34, 197, 94, 0.9), 0 0 20px rgba(34, 197, 94, 0.5)";
        } else {
            spark.style.backgroundColor = "rgba(244, 63, 94, 0.85)";
            spark.style.boxShadow = "0 0 10px rgba(244, 63, 94, 0.9), 0 0 20px rgba(244, 63, 94, 0.5)";
        }

        spark.style.width = `${size}px`;
        spark.style.height = `${size}px`;
        spark.style.left = `${left}%`;
        spark.style.top = `${top}%`;
        spark.style.opacity = Math.random() * 0.4 + 0.3;
        spark.style.animation = `driftSpark ${duration}s linear ${delay}s infinite`;

        container.appendChild(spark);
        elementsToTrack.push({
            el: spark,
            factorX: Math.random() * 30 + 15, // Higher parallax response
            factorY: Math.random() * 30 + 15
        });
    }

    // 3. Smooth mouse interaction parallax flow
    document.addEventListener("mousemove", (e) => {
        const mouseX = (e.clientX / window.innerWidth) - 0.5; // range: -0.5 to 0.5
        const mouseY = (e.clientY / window.innerHeight) - 0.5;

        elementsToTrack.forEach(item => {
            const shiftX = mouseX * item.factorX;
            const shiftY = mouseY * item.factorY;
            // Let native animations continue, but translate based on coordinates!
            item.el.style.transform = `translate(${shiftX}px, ${shiftY}px)`;
        });
    });
});

// Dynamic Animations styling definition injected to DOM head
const styleElement = document.createElement("style");
styleElement.innerHTML = `
@keyframes floatParticle {
    0% {
        transform: translate(0px, 0px) scale(1);
    }
    50% {
        transform: translate(45px, -60px) scale(1.15);
    }
    100% {
        transform: translate(-30px, 30px) scale(0.9);
    }
}

@keyframes driftSpark {
    0% {
        transform: translateY(0px) translateX(0px);
        opacity: 0;
    }
    15% {
        opacity: 0.8;
    }
    85% {
        opacity: 0.8;
    }
    100% {
        transform: translateY(-120px) translateX(25px);
        opacity: 0;
    }
}
`;
document.head.appendChild(styleElement);

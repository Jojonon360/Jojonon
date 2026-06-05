// --- BACKGROUND PARTICLES AND NEON LIGHTS GENERATOR ---

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("neon-lights-container");
    if (!container) return;

    // Generate 12 distinct floating halos (1/2 Neon Green, 1/2 Rosish Red)
    const numHalos = 12;

    for (let i = 0; i < numHalos; i++) {
        const isGreen = i % 2 === 0;
        const width = Math.random() * 200 + 150; // 150px - 350px
        const left = Math.random() * 90; // percentage
        const top = Math.random() * 90; // percentage
        const duration = Math.random() * 15 + 15; // 15s to 30s
        const delay = Math.random() * -15; // Negative delay so it renders immediately

        const halo = document.createElement("div");
        halo.className = "absolute rounded-full pointer-events-none transition-transform";
        
        // Green neon template gradient vs Rosish Red neon template gradient
        if (isGreen) {
            halo.style.background = "radial-gradient(circle, rgba(34, 197, 94, 0.28) 0%, transparent 70%)";
        } else {
            halo.style.background = "radial-gradient(circle, rgba(244, 63, 94, 0.25) 0%, transparent 70%)";
        }

        halo.style.width = `${width}px`;
        halo.style.height = `${width}px`;
        halo.style.left = `${left}%`;
        halo.style.top = `${top}%`;
        
        // Dynamic Keyframe Animation applied inline
        halo.style.animation = `floatParticle ${duration}s ease-in-out ${delay}s infinite alternate`;

        container.appendChild(halo);
    }
});

// Append global keyframes dynamically to the head for modular simplicity
const style = document.createElement("style");
style.innerHTML = `
@keyframes floatParticle {
    0% {
        transform: translate(0px, 0px) scale(1);
    }
    33% {
        transform: translate(30px, -45px) scale(1.1);
    }
    66% {
        transform: translate(-45px, 20px) scale(0.9);
    }
    100% {
        transform: translate(20px, -20px) scale(1.05);
    }
}
`;
document.head.appendChild(style);

// --- JOJONON_CYBERNETICS EXTRA HIGH-FIDELITY EFFECTS ---

let audioCtx = null;
let isAudioEnabled = false;

// Initialize safe browser synthesis context
function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
}

// Simple synthesizer beep generator for retro click actions
function playSyncBeep(freq = 1400, type = 'sine', duration = 0.06, gainValue = 0.03) {
    if (!isAudioEnabled) return;
    try {
        initAudio();
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        osc.type = type;
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        
        gainNode.gain.setValueAtTime(gainValue, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
        
        osc.start();
        osc.stop(audioCtx.currentTime + duration);
    } catch (err) {
        console.warn("Audio simulation blocked by user security policy:", err);
    }
}

// Synthesize a pleasant dual-tone chirping click for UI success/runs
function playChirpSuccess() {
    if (!isAudioEnabled) return;
    try {
        initAudio();
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        const now = audioCtx.currentTime;
        const osc1 = audioCtx.createOscillator();
        const osc2 = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        osc1.type = 'triangle';
        osc1.frequency.setValueAtTime(400, now);
        osc1.frequency.exponentialRampToValueAtTime(1600, now + 0.12);
        
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(600, now);
        osc2.frequency.exponentialRampToValueAtTime(2400, now + 0.12);
        
        gainNode.gain.setValueAtTime(0.04, now);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);
        
        osc1.connect(gainNode);
        osc2.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        osc1.start();
        osc2.start();
        osc1.stop(now + 0.14);
        osc2.stop(now + 0.14);
    } catch (err) {}
}

// Scramble Decoder Effect Function
window.scrambleElement = function(element, finalString, duration = 800) {
    if (!element || element.classList.contains("scrambling")) return;
    element.classList.add("scrambling");
    
    const chars = "10X[]._#@=+?-%~";
    const start = performance.now();
    const originalText = element.textContent;
    
    function scrambleFrame(time) {
        const elapsed = time - start;
        const progress = Math.min(elapsed / duration, 1);
        
        let result = "";
        for (let i = 0; i < finalString.length; i++) {
            if (finalString[i] === " " || finalString[i] === "\n") {
                result += finalString[i];
                continue;
            }
            if (i < progress * finalString.length) {
                result += finalString[i];
            } else {
                result += chars[Math.floor(Math.random() * chars.length)];
            }
        }
        
        element.textContent = result;
        
        if (progress < 1) {
            requestAnimationFrame(scrambleFrame);
        } else {
            element.classList.remove("scrambling");
        }
    }
    
    requestAnimationFrame(scrambleFrame);
    playSyncBeep(1800, 'sine', 0.08, 0.012);
};

// Mouse Trailing Grid & Telemetry Diagnostic HUD Builder
document.addEventListener("DOMContentLoaded", () => {
    
    // Create diagnostic corner overlay
    const diagHUD = document.createElement("div");
    diagHUD.id = "diagnostic-telemetry-hud";
    diagHUD.className = "fixed bottom-4 right-4 z-50 p-3 bg-[#121215]/90 rounded-lg border border-white/5 font-mono text-[9px] text-gray-500 pointer-events-none text-left hidden md:block max-w-[200px] shadow-2xl backdrop-blur-md";
    diagHUD.innerHTML = `
        <div class="flex items-center justify-between border-b border-white/5 pb-1 mb-1.5 text-rose-400 font-bold tracking-widest text-[8px]">
            <span>SYSTEM_HUD_COCKPIT</span>
            <span class="animate-pulse">●</span>
        </div>
        <div class="space-y-0.5 whitespace-pre">
            <div>MESH_COORD: <span id="hud-coord" class="text-gray-300">X:0 Y:0</span></div>
            <div>SCROLL_V: <span id="hud-scroll" class="text-gray-300">0px</span></div>
            <div>CPU_SIM_LOAD: <span id="hud-cpu" class="text-emerald-500">1.21%</span></div>
            <div>MEM_ARRAY: <span class="text-cyan-400">0xEF8${(Math.random()*1000).toFixed(0)}</span></div>
            <div>NET_REFRESH: <span id="hud-ping" class="text-emerald-500">0.03ms</span></div>
        </div>
    `;
    document.body.appendChild(diagHUD);

    // Audio Control Pill Elements and listeners
    const audioToggleBtn = document.getElementById("comm-audio-toggle");
    const audioStatusIndicator = document.getElementById("comms-status-indicator");
    const audioStatusLabel = document.getElementById("comms-status-label");

    if (audioToggleBtn && audioStatusIndicator && audioStatusLabel) {
        audioToggleBtn.addEventListener("click", () => {
            isAudioEnabled = !isAudioEnabled;
            if (isAudioEnabled) {
                initAudio();
                audioStatusLabel.textContent = "ACTIVE";
                audioStatusLabel.className = "font-bold text-emerald-400";
                audioStatusIndicator.className = "w-1.5 h-1.5 rounded-full bg-[#22c55e] shadow-[0_0_8px_#22c55e]";
                audioToggleBtn.style.borderColor = "rgba(34, 197, 94, 0.4)";
                
                // Play beautiful power on chime!
                playChirpSuccess();
            } else {
                audioStatusLabel.textContent = "MUTED";
                audioStatusLabel.className = "font-bold text-gray-400";
                audioStatusIndicator.className = "w-1.5 h-1.5 rounded-full bg-gray-600";
                audioToggleBtn.style.borderColor = "rgba(255, 255, 255, 0.05)";
            }
        });
    }

    // Attach synthesizer ticks to standard UI clickables and hovers
    const interactiveSelectors = 'button, a, [onclick], .cursor-pointer';
    
    document.addEventListener("click", (e) => {
        if (e.target.closest(interactiveSelectors)) {
            if (e.target.closest("#run-btn")) {
                playChirpSuccess();
            } else {
                playSyncBeep(1200, 'sine', 0.08, 0.02);
            }
        }
    });

    document.addEventListener("mouseover", (e) => {
        const matches = e.target.closest(interactiveSelectors);
        if (matches) {
            playSyncBeep(1800, 'sine', 0.015, 0.008);
            
            // If the hovered element is heading or logo or tab, trigger text scramble decryption
            if (matches.hasAttribute("data-scramble")) {
                const finalStr = matches.getAttribute("data-scramble-text") || matches.textContent;
                scrambleElement(matches, finalStr, 500);
            }
        }
    });

    // Update Telemetry HUD components dynamically
    const coordEl = document.getElementById("hud-coord");
    const scrollEl = document.getElementById("hud-scroll");
    const cpuEl = document.getElementById("hud-cpu");
    const pingEl = document.getElementById("hud-ping");

    document.addEventListener("mousemove", (e) => {
        if (coordEl) {
            coordEl.textContent = `X:${e.clientX} Y:${e.clientY}`;
        }
        
        // Push floating lights subtly towards mouse position (Parallax spotlight effect)
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        const lightsContainer = document.getElementById("neon-lights-container");
        if (lightsContainer) {
            // Translate the neon lights layout up to 25px in the coordinate vectors smoothly
            lightsContainer.style.transform = `translate(${(mouseX - 0.5) * 40}px, ${(mouseY - 0.5) * 40}px)`;
        }
    });

    window.addEventListener("scroll", () => {
        if (scrollEl) {
            scrollEl.textContent = `${window.scrollY.toFixed(0)}px`;
        }
    });

    // Simulate mild operational load fluctuating naturally
    setInterval(() => {
        if (cpuEl && Math.random() > 0.4) {
            const simulatedLoad = (Math.random() * 2 + 0.8).toFixed(2);
            cpuEl.textContent = `${simulatedLoad}%`;
            
            if (simulatedLoad > 2.5) {
                cpuEl.className = "text-amber-500";
            } else {
                cpuEl.className = "text-emerald-500";
            }
        }
        
        if (pingEl && Math.random() > 0.6) {
            pingEl.textContent = `${(Math.random() * 0.04 + 0.01).toFixed(3)}ms`;
        }
    }, 1200);

    // Initial Trigger Scramble Decryption animations for key elements
    const decryptOnLoad = document.querySelectorAll("[data-autodecrypt]");
    decryptOnLoad.forEach((el, index) => {
        setTimeout(() => {
            const finalStr = el.textContent;
            scrambleElement(el, finalStr, 900 + index * 200);
        }, 300 + index * 100);
    });
});

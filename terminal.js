// --- INTERACTIVE PYTHON TERMINAL SIMULATOR ---

const compilationLines = [
    ">>> python3 -u jojonon_cybernetics.py",
    "Initializing simulated environment compiler...",
    "[⚙️] Boot Complete by Jojonon",
    "Loading dependencies: System Core, UI Engine, Python v3.11...",
    "[⚡] Emitting Neon Lights...",
    "Verifying static responsive layouts ... OK",
    "[⚙️] Status Code: UNDER_CONSTRUCTION",
    "✨ Build successfully simulated. Scroll down to browse developer statistics below!",
    ">>> _"
];

let isExecuting = false;

function executePython() {
    if (isExecuting) return;

    const screen = document.getElementById("terminal-screen");
    const runBtn = document.getElementById("run-btn");
    
    if (!screen || !runBtn) return;

    isExecuting = true;
    screen.innerHTML = ""; // Clear existing console
    runBtn.textContent = "EXECUTING...";
    runBtn.style.opacity = "0.5";
    runBtn.style.cursor = "not-allowed";

    let step = 0;

    function renderStep() {
        if (step < compilationLines.length) {
            const line = compilationLines[step];
            const div = document.createElement("div");
            
            // Text color definitions for professional scifi styling
            if (line.startsWith(">>>")) {
                div.className = "text-sky-400 font-semibold";
            } else if (line.includes("[⚙️]")) {
                div.className = "text-amber-400";
            } else if (line.includes("[⚡]")) {
                div.className = "text-rose-400 animate-pulse";
            } else if (line.includes("UNDER_CONSTRUCTION")) {
                div.className = "text-rose-500 font-bold";
            } else if (line.includes("✨") || line.includes("OK")) {
                div.className = "text-emerald-400 font-medium";
            } else {
                div.className = "text-gray-300";
            }

            div.textContent = line;
            screen.appendChild(div);

            // Auto scrolling to lock view to the bottom line
            screen.scrollTop = screen.scrollHeight;
            
            step++;
            const randomLatency = Math.random() * 300 + 250; // humanized output latency
            setTimeout(renderStep, randomLatency);
        } else {
            isExecuting = false;
            runBtn.textContent = "RUN SCRIPT";
            runBtn.style.opacity = "1";
            runBtn.style.cursor = "pointer";
        }
    }

    renderStep();
}

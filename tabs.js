// --- MODULAR SECTIONS SWITCHER AND SCROLL SMOOTHER ---

// Seamless scrolling helper
function scrollToProfile() {
    const profileSection = document.getElementById("profile-matrix");
    if (profileSection) {
        profileSection.scrollIntoView({ behavior: "smooth" });
    }
}

// Active tab manager
function switchTab(tabId) {
    const devBtn = document.getElementById("tab-dev-btn");
    const projBtn = document.getElementById("tab-proj-btn");
    const devContent = document.getElementById("tab-dev-content");
    const projContent = document.getElementById("tab-proj-content");

    if (!devBtn || !projBtn || !devContent || !projContent) return;

    if (tabId === "dev") {
        // Toggle Active Stats Buttons
        devBtn.className = "flex-1 py-2 px-4 rounded-full text-xs font-mono font-semibold tracking-wider transition-all cursor-pointer bg-emerald-500/[0.08] text-emerald-400 border border-emerald-500/30";
        projBtn.className = "flex-1 py-2 px-4 rounded-full text-xs font-mono font-semibold tracking-wider transition-all cursor-pointer text-gray-400 hover:text-white";

        // Display contents and hide counterparts
        devContent.classList.remove("hidden");
        projContent.classList.add("hidden");

        // Trigger safe scramble overlay
        const activeHeader = devContent.querySelector("h3");
        if (activeHeader && window.scrambleElement) {
            window.scrambleElement(activeHeader, activeHeader.textContent, 600);
        }
    } else {
        // Toggle Active Stats Buttons
        devBtn.className = "flex-1 py-2 px-4 rounded-full text-xs font-mono font-semibold tracking-wider transition-all cursor-pointer text-gray-400 hover:text-white";
        projBtn.className = "flex-1 py-2 px-4 rounded-full text-xs font-mono font-semibold tracking-wider transition-all cursor-pointer bg-rose-500/[0.08] text-rose-400 border border-rose-500/30";

        // Display contents and hide counterparts
        projContent.classList.remove("hidden");
        devContent.classList.add("hidden");

        // Trigger safe scramble overlay
        const activeHeader = projContent.querySelector("h3");
        if (activeHeader && window.scrambleElement) {
            window.scrambleElement(activeHeader, activeHeader.textContent, 600);
        }
    }
}

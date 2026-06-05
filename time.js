// --- REAL-TIME CYBERNETIC CLOCK COUPLER ---

document.addEventListener("DOMContentLoaded", () => {
    const liveTimeEl = document.getElementById("live-time");
    const liveDateEl = document.getElementById("live-date");
    const heartbeatEl = document.getElementById("time-heartbeat");

    function renderTime() {
        const now = new Date();

        // Hours, Minutes, Seconds formatting
        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
        const seconds = String(now.getSeconds()).padStart(2, "0");
        
        if (liveTimeEl) {
            liveTimeEl.textContent = `${hours}:${minutes}:${seconds}`;
        }

        // Years, Months, Days formatting
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");

        if (liveDateEl) {
            liveDateEl.textContent = `${year}.${month}.${day}`;
        }
    }

    // Initialize display immediately
    renderTime();

    // Trigger precise 1-second update cycle
    setInterval(renderTime, 1000);

    // Dynamic pulse rate styling for the secure indicator indicator
    let isLit = true;
    setInterval(() => {
        if (!heartbeatEl) return;
        isLit = !isLit;
        if (isLit) {
            heartbeatEl.className = "w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(34,197,94,0.7)]";
        } else {
            heartbeatEl.className = "w-1.5 h-1.5 rounded-full bg-emerald-900";
        }
    }, 850);
});

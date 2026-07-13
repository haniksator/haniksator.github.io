/*
 * File: main.js
 *
 * Description:
 * Initializes the portfolio after all modules have loaded.
 *
 * Responsible for application-wide startup tasks such as
 * updating the system clock and initializing Lucide icons.
 */
function updateClock() {
  const clock = document.getElementById("clock");

  if (!clock) {
    return;
  }

  const now = new Date();

  clock.textContent = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });
}

updateClock();
setInterval(updateClock, 1000);

if (window.lucide) {
  lucide.createIcons();
}
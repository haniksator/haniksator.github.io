/*
 * File: boot.js
 *
 * Description:
 * Implements the animated operating system boot sequence displayed
 * when the portfolio first loads.
 *
 * Handles the typing animation, boot messages, skip functionality,
 * and automatic transition into the desktop environment.
 */

const bootOverlay = document.getElementById("bootOverlay");
const bootText = document.getElementById("bootText");

const bootLines = [
  "hanikOS v2.2",
  "─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─",

  "loading kernel ................. done",
  "mounting filesystem ............ done",
  "detecting hardware ............. done",
  "memory check ................... passed",

  "",
  "system",
  "─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─",

  "user ........................... haniksator",
  "shell .......................... zsh",
  "editor ......................... vscode",
  "compositor ..................... wayland",
  "environment .................... development",

  "",
  "services",
  "─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─",

  "desktop environment ............ active",
  "renderer ....................... initialized",
  "theme configuration ............ loaded",
  "portfolio services ............. running",

  "",
  "workspace",
  "─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─",

  "freshtrack",
  "stock_exchange_simulator",
  "remote_controlled_car",

  "",
  "status",
  "─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─",

  "network ........................ online",
  "terminal ....................... ready",
  "renderer ....................... active",

  "",
  "haniksator@portfolio:~$ boot --launch"
];

const lineDelay = 5;
const linePause = 25;

let lineIndex = 0;
let charIndex = 0;

function typeNextChar() {
  if (lineIndex >= bootLines.length) {
    bootText.innerHTML +=
      "<span style='color:#00ff88'>[ ACCESS GRANTED – Welcome! ]</span><br>";

    bootOverlay.scrollTop = bootOverlay.scrollHeight;

    setTimeout(() => {
      bootOverlay.classList.add("hidden");
    }, 600);

    return;
  }

  const currentLine = bootLines[lineIndex];

  if (charIndex < currentLine.length) {
    bootText.innerHTML += currentLine.charAt(charIndex);
    charIndex++;

    bootOverlay.scrollTop = bootOverlay.scrollHeight;

    setTimeout(typeNextChar, lineDelay);
  } else {
    bootText.innerHTML += "<br>";

    lineIndex++;
    charIndex = 0;

    bootOverlay.scrollTop = bootOverlay.scrollHeight;

    setTimeout(typeNextChar, linePause);
  }
}

window.addEventListener("load", () => {
  setTimeout(typeNextChar, 600);
});

document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    !bootOverlay.classList.contains("hidden")
  ) {
    bootOverlay.classList.add("hidden");
  }
});

const skipBootButton = document.getElementById("skipBoot");

if (skipBootButton) {
  skipBootButton.addEventListener("click", () => {
    bootOverlay.classList.add("hidden");
  });
}
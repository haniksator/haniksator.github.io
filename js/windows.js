/*
 * File: windows.js
 *
 * Description:
 * Implements the desktop window manager.
 *
 * Responsible for opening, closing, minimizing, maximizing,
 * focusing, dragging, and managing window z-index ordering,
 * as well as synchronizing dock indicators.
 */

const windows = document.querySelectorAll(".window");
const launchers = document.querySelectorAll("[data-window]");

let highestZ = 10;

function focusWindow(win) {
  windows.forEach((windowElement) => {
    windowElement.classList.remove("active-window");
  });

  highestZ++;

  win.style.zIndex = highestZ;
  win.classList.add("active-window");
}

function openDesktopWindow(windowId) {
  const target = document.getElementById(windowId);

  if (!target) {
    return;
  }

  target.classList.remove("hidden", "is-closing", "minimized");

  target.classList.remove("window-opening");
  void target.offsetWidth;
  target.classList.add("window-opening");

  focusWindow(target);
  updateDockIndicators();
}

function updateDockIndicators() {
  document.querySelectorAll(".dock-icon").forEach((icon) => {
    const target = document.getElementById(icon.dataset.window);

    if (!target) {
      return;
    }

    icon.classList.toggle(
      "active-dock",
      !target.classList.contains("hidden")
    );
  });
}

launchers.forEach((button) => {
  button.addEventListener("click", () => {
    openDesktopWindow(button.dataset.window);
  });
});

windows.forEach((win) => {
  const header = win.querySelector(".window-header");

  if (!header) {
    return;
  }

  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  header.addEventListener("mousedown", (event) => {
    if (event.target.closest(".window-controls")) {
      return;
    }

    if (win.classList.contains("maximized")) {
      return;
    }

    isDragging = true;

    focusWindow(win);

    offsetX = event.clientX - win.offsetLeft;
    offsetY = event.clientY - win.offsetTop;
  });

  document.addEventListener("mousemove", (event) => {
    if (!isDragging) {
      return;
    }

    win.style.left = `${event.clientX - offsetX}px`;
    win.style.top = `${event.clientY - offsetY}px`;
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
  });

  win.addEventListener("mousedown", () => {
    focusWindow(win);
  });

  const closeButton = win.querySelector(".close");
  const minimizeButton = win.querySelector(".minimize");
  const maximizeButton = win.querySelector(".maximize");

  if (closeButton) {
    closeButton.addEventListener("click", () => {
      win.classList.add("is-closing");

      setTimeout(() => {
        win.classList.add("hidden");
        win.classList.remove("is-closing", "minimized");

        updateDockIndicators();
      }, 220);
    });
  }

  if (minimizeButton) {
    minimizeButton.addEventListener("click", () => {
      win.classList.add("minimized");

      setTimeout(() => {
        win.classList.add("hidden");
        win.classList.remove("minimized");

        updateDockIndicators();
      }, 220);
    });
  }

  if (maximizeButton) {
    maximizeButton.addEventListener("click", () => {
      win.classList.toggle("maximized");
      focusWindow(win);
    });
  }
});
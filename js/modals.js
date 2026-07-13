/*
 * File: modals.js
 *
 * Description:
 * Manages modal dialogs used throughout the portfolio.
 *
 * Handles the walkthrough video player, "Coming Soon"
 * notifications, modal opening and closing behavior,
 * keyboard shortcuts, and focus restoration.
 */
const comingSoonModal = document.getElementById("comingSoonModal");

if (comingSoonModal) {
  let comingSoonReturnFocus = null;

  function openComingSoonModal(triggerElement, message) {
    comingSoonReturnFocus = triggerElement || null;

    const body = comingSoonModal.querySelector(".cs-body");

    if (body) {
      body.textContent =
        message ||
        "This project page isn’t connected yet. I’m polishing the write-up and links.";
    }

    comingSoonModal.setAttribute("aria-hidden", "false");

    const panel = comingSoonModal.querySelector(".cs-panel");

    if (panel) {
      panel.focus();
    }
  }

  function closeComingSoonModal() {
    comingSoonModal.setAttribute("aria-hidden", "true");

    if (comingSoonReturnFocus) {
      comingSoonReturnFocus.focus();
    }
  }

  comingSoonModal.addEventListener("click", (event) => {
    if (event.target.matches("[data-close], .cs-backdrop")) {
      closeComingSoonModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      comingSoonModal.getAttribute("aria-hidden") === "false"
    ) {
      closeComingSoonModal();
    }
  });

  document.addEventListener("click", async (event) => {
    const trigger = event.target.closest(".project-link");

    if (!trigger || trigger.dataset.video) {
      return;
    }

    const liveUrl = trigger.dataset.liveUrl;

    if (!liveUrl) {
      openComingSoonModal(trigger);
      return;
    }

    try {
      const controller = new AbortController();

      const timeoutId = setTimeout(() => {
        controller.abort();
      }, 2500);

      await fetch(liveUrl, {
        mode: "no-cors",
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      window.open(liveUrl, "_blank", "noopener");
    } catch {
      openComingSoonModal(
        trigger,
        "The live FreshTrack demo appears to be offline right now. Please try again later or email me for a walkthrough."
      );
    }
  });
}

const videoModal = document.getElementById("videoModal");
const videoPlayer = document.getElementById("videoPlayer");
const videoTitle = document.getElementById("videoTitle");
const videoNotes = document.getElementById("videoNotes");

if (videoModal && videoPlayer && videoTitle) {
  let videoReturnFocus = null;

  function openVideoModal(triggerElement, source, titleText) {
    videoReturnFocus = triggerElement || null;

    videoTitle.textContent = titleText || "Walkthrough";

    videoPlayer.pause();
    videoPlayer.removeAttribute("src");
    videoPlayer.load();

    videoPlayer.src = source;

    if (videoNotes) {
      videoNotes.innerHTML = "";

      const notesTitle = triggerElement.dataset.notesTitle;

      if (notesTitle) {
        const heading = document.createElement("h4");

        heading.textContent = notesTitle;
        videoNotes.appendChild(heading);
      }

      const list = document.createElement("ul");
      let hasNotes = false;

      Object.keys(triggerElement.dataset).forEach((key) => {
        if (key.startsWith("note") && key !== "notesTitle") {
          hasNotes = true;

          const item = document.createElement("li");

          item.textContent = triggerElement.dataset[key];
          list.appendChild(item);
        }
      });

      if (hasNotes) {
        videoNotes.appendChild(list);
      }
    }

    videoModal.setAttribute("aria-hidden", "false");

    const panel = videoModal.querySelector(".cs-panel");

    if (panel) {
      panel.focus();
    }
  }

  function closeVideoModal() {
    videoModal.setAttribute("aria-hidden", "true");

    videoPlayer.pause();
    videoPlayer.removeAttribute("src");
    videoPlayer.load();

    if (videoReturnFocus) {
      videoReturnFocus.focus();
    }
  }

  videoModal.addEventListener("click", (event) => {
    if (event.target.matches("[data-close-video], .cs-backdrop")) {
      closeVideoModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      videoModal.getAttribute("aria-hidden") === "false"
    ) {
      closeVideoModal();
    }
  });

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest(".project-link");

    if (!trigger || !trigger.dataset.video) {
      return;
    }

    event.preventDefault();

    openVideoModal(
      trigger,
      trigger.dataset.video,
      trigger.dataset.videoTitle
    );
  });
}
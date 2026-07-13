/*
 * File: explorer.js
 *
 * Description:
 * Controls the Projects Explorer application.
 *
 * Handles repository navigation and dynamically switches
 * between project information panels within the explorer.
 */
const projectButtons = document.querySelectorAll(".project-file");
const projectPanels = document.querySelectorAll(".project-panel");

projectButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const projectId = button.dataset.project;
    const selectedPanel = document.getElementById(projectId);

    if (!selectedPanel) {
      return;
    }

    projectButtons.forEach((projectButton) => {
      projectButton.classList.remove("active");
    });

    projectPanels.forEach((panel) => {
      panel.classList.remove("active");
    });

    button.classList.add("active");
    selectedPanel.classList.add("active");
  });
});
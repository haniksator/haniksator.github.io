/*
  * File: applications.js
  *
  * Description:
  * Implements functionality specific to individual desktop
  * applications that is not shared across the system.
  *
  * Currently manages the Contact application, including
  * clipboard operations and future application behaviors.
  */

const copyEmailButton = document.getElementById("copyEmailBtn");

if (copyEmailButton) {
  copyEmailButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText("haniksator@gmail.com");

      copyEmailButton.textContent = "Email Copied";

      setTimeout(() => {
        copyEmailButton.textContent = "Copy Email";
      }, 1800);
    } catch {
      copyEmailButton.textContent = "Copy Failed";

      setTimeout(() => {
        copyEmailButton.textContent = "Copy Email";
      }, 1800);
    }
  });
}
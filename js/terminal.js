/*
 * File: terminal.js
 *
 * Description:
 * Implements the interactive terminal application.
 *
 * Processes user commands, displays command output,
 * manages terminal history, and launches portfolio
 * applications through terminal commands.
 */

const terminalInput = document.getElementById("terminalInput");
const terminalOutput = document.getElementById("terminalOutput");

const terminalCommands = {
  help: `
Available commands:

help
about
experience
skills
projects
resume
contact
whoami
ls
clear
`,

  whoami: `
Hanik Sator

Computer science graduate and software engineer who enjoys building practical systems, backend applications, and interfaces that feel clean and intentional.
`,

  ls: `
about.txt
experience.log
skills.config
projects
resume.pdf
contact.service
`,

  about: "Opening about.txt...",
  experience: "Opening experience.log...",
  skills: "Opening skills.config...",
  projects: "Opening projects...",
  resume: "Opening resume.pdf...",

  contact: `
email: haniksator@gmail.com
location: chicago, il
status: available
`
};

function printToTerminal(text, className = "terminal-response") {
  const lines = text.trim().split("\n");

  lines.forEach((line) => {
    const paragraph = document.createElement("p");

    paragraph.className = className;
    paragraph.textContent = line;

    terminalOutput.appendChild(paragraph);
  });

  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

const commandWindows = {
  about: "aboutWindow",
  experience: "experienceWindow",
  skills: "skillsWindow",
  projects: "projectsWindow",
  resume: "resumeWindow",
  contact: "contactWindow"
};

if (terminalInput && terminalOutput) {
  terminalInput.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") {
      return;
    }

    const command = terminalInput.value.trim().toLowerCase();

    if (!command) {
      return;
    }

    const commandLine = document.createElement("p");

    commandLine.className = "terminal-line";

    const prompt = document.createTextNode("hanik@portfolio:~$ ");
    const commandText = document.createElement("span");

    commandText.className = "terminal-command";
    commandText.textContent = command;

    commandLine.append(prompt, commandText);
    terminalOutput.appendChild(commandLine);

    if (command === "clear") {
      terminalOutput.innerHTML = "";
      terminalInput.value = "";

      return;
    }

    if (terminalCommands[command]) {
      printToTerminal(terminalCommands[command]);

      const targetWindow = commandWindows[command];

      if (targetWindow) {
        openDesktopWindow(targetWindow);
      }
    } else {
      printToTerminal(`command not found: ${command}`);
    }

    terminalInput.value = "";
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  });
}
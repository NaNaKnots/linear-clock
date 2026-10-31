console.log("Linear Clock JavaScript loaded!");
function updateClock() {
  const now = new Date();

  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const milliseconds = now.getMilliseconds();

  // Display the current time
  const time = now.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });

  document.getElementById("digital-time")
    .textContent = time;

  // Calculate how much of the day has passed
  const secondsToday =
    hours * 3600 +
    minutes * 60 +
    seconds +
    milliseconds / 1000;

  const secondsPerDay = 24 * 60 * 60;

  const progress = 
      (secondsToday / secondsPerDay) * 100;

  // Update the timeline
  document.getElementById("progress")
      .style.width = progress + "%";

  document.getElementById("time-marker")
      .style.left = progress + "%";

  // Display today's date
  const date = now.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric"
    });

  document.getElementById("current-date")
      .textContent = date;
}

// Update immediately
updateClock();

// Update every second
setInterval(updateClock, 1000);
  
function createHourTicks() {
  const tickContainer =
      document.getElementById("hour-ticks");

  for (let hour = 0; hour <= 24; hour++) {
      const tick = document.createElement("div");

      tick.classList.add("hour-tick");

      // Calculate position on the timeline
      const position = (hour / 24) * 100;

      tick.style.left = position + "%";

      // Make every sixth hour more visible
      if (hour % 6 === 0) {
          tick.classList.add("major");
      }

      tickContainer.appendChild(tick);
  }
}

createHourTicks();

const themes = {
  lavender: {
    pageBg: "#15151f",
    clockBg: "#242435",
    text: "#ffffff",
    accent: "#b197fc",
    secondary: "#c8b6ff",
    muted: "#aaaabc",
    track: "#505065",
  },

  rose: {
    pageBg: "#21191f",
    clockBg: "#382833",
    text: "#fff7fa",
    accent: "#f0a7c1",
    secondary: "#f0a7c1",
    muted: "#d2afc0",
    track: "#765362",
  },

  ocean: {
    pageBg: "#101d29",
    clockBg: "#1d3242",
    text: "#f1faff",
    accent: "#75c9ed",
    secondary: "#75c9ed",
    muted: "#a3c4d4",
    track: "#456174",
  },

  mint: {
    pageBg: "#101e1b",
    clockBg: "#20342e",
    text: "#f2fff8",
    accent: "#88dfb8",
    secondary: "#88dfb8",
    muted: "b1cfc0",
    track: "#4b6b5f",
  }
};

function applyTheme(themeName) {
  const theme = themes[themeName];

  if (!theme) return;

  const root = document.documentElement;

  root.style.setProperty("--page-bg", theme.pageBg);
  root.style.setProperty("--clock-bg", theme.clockBg);
  root.style.setProperty("--text-color", theme.text);
  root.style.setProperty("--accent-color", theme.accent);
  root.style.setProperty("--secondary-color", theme.secondary);
  root.style.setProperty("--muted-color", theme.muted);
  root.style.setProperty("--track-color", theme.track);
}

const themeSelect =
  document.getElementById("theme-select");

themeSelect.addEventListener("change", function () {
  applyTheme(themeSelect.value);
});

//Restore the saved theme whem page loads
const savedTheme = localStorage.getItem("clockTheme");

if (savedTheme && themes[savedTheme]) {
  themeSelect.value = savedTheme;
  applyTheme(savedTheme);
}

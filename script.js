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
  

// --- Seat map data for each location ---
const seatMaps = {
  canteen1: [
    ["free", "occupied", "free", "free"],
    ["free", "free", "occupied", "free"],
    ["occupied", "free", "free", "occupied"],
  ],
  canteen2: [
    ["free", "free", "occupied"],
    ["occupied", "free", "free"],
    ["free", "occupied", "free"],
  ],
  library: [
    ["free", "occupied", "free", "free", "occupied"],
    ["free", "free", "occupied", "free", "free"],
  ],
};

let currentLocation = "canteen1";

// --- Render seat map ---
function renderSeatMap() {
  const map = seatMaps[currentLocation];
  const seatMapDiv = document.getElementById("seat-map");
  seatMapDiv.innerHTML = "";

  map.forEach((row, rowIdx) => {
    const rowDiv = document.createElement("div");
    rowDiv.className = "seat-row";
    row.forEach((status, colIdx) => {
      const seatBtn = document.createElement("div");
      seatBtn.className = `seat ${status}`;
      seatBtn.textContent = String.fromCharCode(65 + rowIdx) + (colIdx + 1);
      seatBtn.addEventListener("click", () => toggleSeat(rowIdx, colIdx));
      rowDiv.appendChild(seatBtn);
    });
    seatMapDiv.appendChild(rowDiv);
  });
  updateStats();
}

// --- Toggle seat status ---
function toggleSeat(row, col) {
  const map = seatMaps[currentLocation];
  if (map[row][col] === "occupied") {
    map[row][col] = "free";
  } else {
    map[row][col] = "occupied";
  }
  renderSeatMap();
}

// --- Update quick stats ---
function updateStats() {
  const map = seatMaps[currentLocation];
  let free = 0, occupied = 0;
  map.forEach(row => {
    row.forEach(status => {
      if (status === "free") free++;
      else if (status === "occupied") occupied++;
    });
  });
  document.getElementById("stat-free").textContent = free;
  document.getElementById("stat-occupied").textContent = occupied;
}

// --- Handle location switching ---
document.querySelectorAll(".location-btn").forEach(btn => {
  btn.addEventListener("click", function() {
    document.querySelectorAll(".location-btn").forEach(b => b.classList.remove("selected"));
    this.classList.add("selected");
    currentLocation = this.getAttribute("data-location");
    document.getElementById("map-title").textContent = this.textContent;
    renderSeatMap();
  });
});

// --- Initial render ---
renderSeatMap();

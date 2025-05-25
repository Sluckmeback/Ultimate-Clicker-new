let score = 0;
let multiplier = 1;
let autoClickers = 0;
let megaClickActive = false;

const clickBtn = document.getElementById("click-btn");
const scoreDisplay = document.getElementById("score");
const multiplierDisplay = document.getElementById("multiplier");
const autoDisplay = document.getElementById("auto");
const progressBar = document.getElementById("progress-bar");
const clickSound = document.getElementById("click-sound");

const buyMultiplierBtn = document.getElementById("buy-multiplier");
const buyAutoBtn = document.getElementById("buy-auto");
const buyBoostBtn = document.getElementById("buy-boost");
const saveBtn = document.getElementById("save");
const resetBtn = document.getElementById("reset");

function updateScore() {
  scoreDisplay.textContent = score.toFixed(0);
  multiplierDisplay.textContent = `${multiplier}x`;
  autoDisplay.textContent = autoClickers;
  updateProgressBar();
}

function updateProgressBar() {
  const nextThreshold = 1000;
  const width = Math.min((score % nextThreshold) / nextThreshold * 100, 100);
  progressBar.style.width = `${width}%`;
}

clickBtn.addEventListener("click", () => {
  const power = megaClickActive ? multiplier * 10 : multiplier;
  score += power;
  clickSound.currentTime = 0;
  clickSound.play();
  updateScore();
});

buyMultiplierBtn.addEventListener("click", () => {
  if (score >= 100) {
    score -= 100;
    multiplier *= 2;
    updateScore();
  }
});

buyAutoBtn.addEventListener("click", () => {
  if (score >= 250) {
    score -= 250;
    autoClickers++;
    updateScore();
  }
});

buyBoostBtn.addEventListener("click", () => {
  if (score >= 1000 && !megaClickActive) {
    score -= 1000;
    megaClickActive = true;
    updateScore();
    buyBoostBtn.disabled = true;
    setTimeout(() => {
      megaClickActive = false;
      buyBoostBtn.disabled = false;
    }, 10000);
  }
});

saveBtn.addEventListener("click", () => {
  const data = { score, multiplier, autoClickers };
  localStorage.setItem("clickerSave", JSON.stringify(data));
});

resetBtn.addEventListener("click", () => {
  if (confirm("Сбросить прогресс?")) {
    localStorage.removeItem("clickerSave");
    location.reload();
  }
});

function loadGame() {
  const saved = localStorage.getItem("clickerSave");
  if (saved) {
    const data = JSON.parse(saved);
    score = data.score || 0;
    multiplier = data.multiplier || 1;
    autoClickers = data.autoClickers || 0;
  }
  updateScore();
}

setInterval(() => {
  score += autoClickers * multiplier;
  updateScore();
}, 1000);

loadGame();

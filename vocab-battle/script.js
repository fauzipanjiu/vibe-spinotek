const questionBank = [
  {
    q: "SEMANGKA",
    a: "Watermelon",
    options: ["Melon", "Watermelon", "Pineapple", "Apple"],
  },
  { q: "BUKU", a: "Book", options: ["Pencil", "Eraser", "Book", "Ruler"] },
  {
    q: "SEPEDA",
    a: "Bicycle",
    options: ["Car", "Motorcycle", "Bicycle", "Bus"],
  },
  { q: "MATAHARI", a: "Sun", options: ["Moon", "Star", "Sun", "Cloud"] },
  { q: "KUCING", a: "Cat", options: ["Dog", "Cat", "Bird", "Rabbit"] },
  { q: "JERUK", a: "Orange", options: ["Apple", "Grape", "Orange", "Banana"] },
];

let gameState = {
  1: {
    score: 0,
    currentIdx: 0,
    timeLeft: 10,
    timer: null,
    active: false,
    finished: false,
  },
  2: {
    score: 0,
    currentIdx: 0,
    timeLeft: 10,
    timer: null,
    active: false,
    finished: false,
  },
};

const startBtn = document.getElementById("start-btn");
const overlay = document.getElementById("overlay");
const menuContent = document.getElementById("menu-content");
const countdownEl = document.getElementById("countdown");
const winnerCard = document.getElementById("winner-card");

startBtn.onclick = () => {
  menuContent.classList.add("hidden");
  countdownEl.classList.remove("hidden");
  let count = 3;

  const countInterval = setInterval(() => {
    countdownEl.innerText = count;
    countdownEl.classList.remove("animate__zoomIn");
    void countdownEl.offsetWidth;
    countdownEl.classList.add("animate__zoomIn");

    if (count === 0) {
      clearInterval(countInterval);
      countdownEl.classList.add("hidden");
      initGame();
    }
    count--;
  }, 1000);
};

function initGame() {
  overlay.classList.add("hidden");
  [1, 2].forEach(team => {
    gameState[team].score = 0;
    gameState[team].currentIdx = 0;
    gameState[team].active = true;
    gameState[team].finished = false;
    document.getElementById(`score${team}`).innerText = "0";
    document.getElementById(`rocket${team}`).style.bottom = "0%";
    showQuestion(team);
  });
}

function showQuestion(team) {
  const teamData = gameState[team];

  if (teamData.currentIdx >= questionBank.length) {
    teamData.active = false;
    teamData.finished = true;
    clearInterval(teamData.timer);
    document.getElementById(`q${team}`).innerText = "FINISH! 🏁";
    document.getElementById(`choices${team}`).innerHTML = "";
    checkGameOver();
    return;
  }

  const currentQ = questionBank[teamData.currentIdx];
  document.getElementById(`q${team}`).innerText = currentQ.q;
  const cEl = document.getElementById(`choices${team}`);
  cEl.innerHTML = "";

  [...currentQ.options]
    .sort(() => Math.random() - 0.5)
    .forEach(opt => {
      const btn = document.createElement("button");
      btn.innerText = opt;
      btn.className = `choice-btn p-5 text-2xl font-black rounded-2xl text-white ${team === 1 ? "bg-blue-500" : "bg-red-500"}`;
      btn.onclick = () => handleAnswer(team, opt, btn);
      cEl.appendChild(btn);
    });

  startTimer(team);
}

function handleAnswer(team, selected, btn) {
  const teamData = gameState[team];
  if (!teamData.active) return;
  clearInterval(teamData.timer);

  const isCorrect = selected === questionBank[teamData.currentIdx].a;
  const sfx = document.getElementById(isCorrect ? "sfx-correct" : "sfx-wrong");
  const rocket = document.getElementById(`rocket${team}`);
  const fire = rocket.querySelector(".fire-particle");

  sfx.currentTime = 0;
  sfx.play();

  if (isCorrect) {
    teamData.score += 50 + teamData.timeLeft * 10;
    btn.classList.add("correct");
    document.getElementById(`score${team}`).innerText = teamData.score;

    // ANIMASI ROKET MELUNCUR
    rocket.classList.add("launching");
    fire.style.opacity = "1";

    const progress = ((teamData.currentIdx + 1) / questionBank.length) * 85;
    rocket.style.bottom = `${progress}%`;

    // Matikan api setelah meluncur selesai
    setTimeout(() => {
      rocket.classList.remove("launching");
      fire.style.opacity = "0";
    }, 800);
  } else {
    btn.classList.add("wrong");
    // ANIMASI ROKET ERROR (Goncang di tempat)
    rocket.classList.add("animate__animated", "animate__headShake");
    setTimeout(() => {
      rocket.classList.remove("animate__animated", "animate__headShake");
    }, 500);
  }

  btn.parentElement
    .querySelectorAll("button")
    .forEach(b => (b.disabled = true));

  setTimeout(() => {
    teamData.currentIdx++;
    showQuestion(team);
  }, 800);
}

function startTimer(team) {
  const teamData = gameState[team];
  teamData.timeLeft = 10;
  document.getElementById(`timer${team}`).innerText = "10";

  teamData.timer = setInterval(() => {
    teamData.timeLeft--;
    document.getElementById(`timer${team}`).innerText = teamData.timeLeft;
    if (teamData.timeLeft <= 0) {
      clearInterval(teamData.timer);
      teamData.currentIdx++;
      showQuestion(team);
    }
  }, 1000);
}

function checkGameOver() {
  if (gameState[1].finished && gameState[2].finished) {
    setTimeout(() => {
      overlay.classList.remove("hidden");
      winnerCard.classList.remove("hidden");

      const s1 = gameState[1].score;
      const s2 = gameState[2].score;
      document.getElementById("final-s1").innerText = s1;
      document.getElementById("final-s2").innerText = s2;

      const winTitle = document.getElementById("winner-team-name");
      if (s1 > s2) {
        winTitle.innerText = "TIM BIRU MENANG!";
        winTitle.className = "text-7xl font-black text-blue-400 mb-6";
      } else if (s2 > s1) {
        winTitle.innerText = "TIM MERAH MENANG!";
        winTitle.className = "text-7xl font-black text-red-400 mb-6";
      } else {
        winTitle.innerText = "SKOR SERI!";
        winTitle.className = "text-7xl font-black text-yellow-400 mb-6";
      }

      launchFinalFireworks();
    }, 1000);
  }
}

function launchFinalFireworks() {
  const duration = 5 * 1000;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ["#3b82f6", "#fbbf24"],
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ["#ef4444", "#fbbf24"],
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}

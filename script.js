let coins = parseInt(localStorage.getItem("coins")) || 5;

const balanceEl = document.getElementById("coin-balance");
const spendBtn = document.getElementById("spend-coin");
const getBtn = document.getElementById("get-coin");
const messageBox = document.getElementById("message-box");

// Toss coin
const tossBtn = document.getElementById("toss-btn");
const coinEl = document.getElementById("coin");
const tossResult = document.getElementById("toss-result");

const messages = [
    "You will have a lucky day",
    "A surprise is waiting for you",
    "Happiness comes from within",
    "Your hard work will pay off soon",
    "Good news will come your way",
    "Someone is thinking about you",
    "Adventure awaits you",
    "Smile, and the world smiles with you",
    "Expect the unexpected",
    "Your energy attracts positive vibes",
    "Vulnerability sounds like faith and looks like courage",
    "Each time you break your own boundaries to ensure that someone else likes you, you like yourself a little less."
];

function updateBalance() {
    balanceEl.textContent = coins;
    localStorage.setItem("coins", coins);
}

// Spend coin for fortune
if (spendBtn) {
    spendBtn.addEventListener("click", () => {
        if (coins > 0) {
            coins--;
            updateBalance();
            const randomIndex = Math.floor(Math.random() * messages.length);
            messageBox.textContent = messages[randomIndex];
        } else {
            messageBox.textContent = "⚠️ Not enough Coins!";
        }
    });
}

// Free coin (from "Want more coins?")
if (getBtn) {
    getBtn.addEventListener("click", () => {
        coins++;
        updateBalance();
        messageBox.textContent = "🎉 You received a free coin!";
    });
}

// Coin Toss Logic
if (tossBtn) {
    tossBtn.addEventListener("click", () => {
        if (coins < 10) {
            tossResult.textContent = "⚠️ Not enough coins to toss!";
            return;
        }

        coins -= 10;
        updateBalance();

        // Randomly decide outcome
        const outcome = Math.random() < 0.5 ? "heads" : "tails";

        // Animate
        let spins = 6; // full spins
        let rotation = spins * 180 + (outcome === "heads" ? 0 : 180);

        coinEl.style.transform = `rotateY(${rotation}deg)`;
        tossResult.textContent = "Flipping...";

        setTimeout(() => {
            if (outcome === "heads") {
                coins += 20;
                updateBalance();
                tossResult.textContent = "🎉 It's HEADS! You won +20 coins!";
            } else {
                tossResult.textContent = "😢 It's TAILS! You lost 10 coins.";
            }
        }, 1000);
    });
}

// Theme toggle
const themeSwitch = document.getElementById("theme-switch");
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    themeSwitch.checked = true;
}
themeSwitch.addEventListener("change", () => {
    if (themeSwitch.checked) {
        document.body.classList.add("dark-mode");
        localStorage.setItem("theme", "dark");
    } else {
        document.body.classList.remove("dark-mode");
        localStorage.setItem("theme", "light");
    }
});

// Init
updateBalance();

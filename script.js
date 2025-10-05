let coins = parseInt(localStorage.getItem("coins")) || 5;

const balanceEl = document.getElementById("coin-balance");
const spendBtn = document.getElementById("spend-coin");
const getBin = document.getElementById("get-coin");
const messageBox = document.getElementById("message-box");

const message = [
    "You will have a lucky day 🍀",
  "A surprise is waiting for you 🎁",
  "Happiness comes from within ✨",
  "Your hard work will pay off soon 💼",
  "Good news will come your way 📩",
  "Someone is thinking about you 💭",
  "Adventure awaits you 🌍",
  "Smile, and the world smiles with you 😀",
  "Expect the unexpected 🔮",
  "Your energy attracts positive vibes 🌟"
];

function updateBalance() {
    balanceEl.textContent = coins;
    localStorage.setItem("coins", coins);
}

spendBtn.addEventListener("click", () => {
    if (coins > 0) {
        coins--;
        updateBalance();

        const randomIndex = Math.floor(Math.random() * message.length);
        const fortune = message[randomIndex];

        messageBox.textContent = fortune;
    } else {
        message.textContent = "Not enogh Coins!";
    }
});

getBin.addEventListener("click", () => {
    coins++;
    updateBalance();
    message.textContent = " You received a free coin!"
});

updateBalance();

// Toggle
const themeSwitch = document.getElementById("theme-switch");

themeSwitch.addEventListener("change", () => {
    document.body.classList.toggle("dark-mode");
})
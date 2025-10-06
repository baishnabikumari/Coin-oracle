// It loads the current coin form the localStorage
// if the balance is not saved so it will start default by coins
let coins = parseInt(localStorage.getItem("coins")) || 5;

// this here will link the HTML code for better integration
const balanceEl = document.getElementById("coin-balance");
const spendBtn = document.getElementById("spend-coin");
const getBtn = document.getElementById("get-coin");
const messageBox = document.getElementById("message-box");

// These are the elements for Toss coin section which is down side left 
const tossBtn = document.getElementById("toss-btn");
const coinEl = document.getElementById("coin");
const tossResult = document.getElementById("toss-result");

// this is the main part here are the message which will display after every coin user spent by clicking "Spend 1 Coin"
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

// here function: will update the balance and store it in localStorage
// so if the user refresh the page the coin will be the same which was stored in the localStorage
function updateBalance() {
    balanceEl.textContent = coins;
    localStorage.setItem("coins", coins);
}

// Spend coin for a fortune message which will be showig in the white HOME page
if (spendBtn) {
    spendBtn.addEventListener("click", () => {
        if (coins > 0) {
            coins--;
            updateBalance();
            const randomIndex = Math.floor(Math.random() * messages.length);
            messageBox.textContent = messages[randomIndex];
        } else {
            messageBox.textContent = "Not enough Coins!";
        }
    });
}

// Free coin (click "Want more coins?" button) 
if (getBtn) {
    getBtn.addEventListener("click", () => {
        coins++;
        updateBalance();
        messageBox.textContent = "🎉 You received a free coin!";
    });
}

// Coin Toss Logic
// a mini game like head or tail
// no need to guess head or tail it will be by own rondom stuff just you will be charged 10 coins per toss
// this is more fun ig 😁
if (tossBtn) {
    tossBtn.addEventListener("click", () => {
        if (coins < 10) {
            tossResult.textContent = "Not enough coins to toss!";
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

// Theme for dark and light theme change use the button on the top right 
// this will switch the page to dark and light instantly
// also automatically restores when page is refreshed
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
// it update the balance on the page which load to sync with the saved data
updateBalance();

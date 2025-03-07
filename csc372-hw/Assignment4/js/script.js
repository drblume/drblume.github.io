document.addEventListener("DOMContentLoaded", () => {
    const choices = ["rock", "paper", "scissors"];
    let wins = localStorage.getItem("wins") || 0;
    let losses = localStorage.getItem("losses") || 0;
    let ties = localStorage.getItem("ties") || 0;

    document.getElementById("wins").textContent = wins;
    document.getElementById("losses").textContent = losses;
    document.getElementById("ties").textContent = ties;

    document.querySelectorAll(".choice").forEach(choice => {
        choice.addEventListener("click", () => playGame(choice.id));
    });

    function playGame(playerChoice) {
        document.querySelectorAll(".choice").forEach(choice => choice.classList.remove("selected"));
        document.getElementById(playerChoice).classList.add("selected");

        let computerChoice = shuffleComputerChoice();

        setTimeout(() => {
            let result = determineWinner(playerChoice, computerChoice);
            updateScore(result);
        }, 3000); // Wait for shuffle animation to finish
    }

    function shuffleComputerChoice() {
        let computerImg = document.getElementById("computer-img");
        let index = 0;
        let interval = setInterval(() => {
            computerImg.src = `images/${choices[index]}.png`; 
            index = (index + 1) % 3;
        }, 500);
    
        let finalChoice = choices[Math.floor(Math.random() * 3)];
        setTimeout(() => {
            clearInterval(interval);
            computerImg.src = `images/${finalChoice}.png`; 
        }, 3000);
    
        return finalChoice;
    }

    function determineWinner(player, computer) {
        if (player === computer) return "tie";
        if (
            (player === "rock" && computer === "scissors") ||
            (player === "scissors" && computer === "paper") ||
            (player === "paper" && computer === "rock")
        ) {
            return "win";
        } else {
            return "lose";
        }
    }

    function updateScore(result) {
        let message = "";
        if (result === "win") {
            wins++;
            localStorage.setItem("wins", wins);
            message = "You Win!";
        } else if (result === "lose") {
            losses++;
            localStorage.setItem("losses", losses);
            message = "You Lose!";
        } else {
            ties++;
            localStorage.setItem("ties", ties);
            message = "It's a Tie!";
        }

        document.getElementById("winner").textContent = message;
        document.getElementById("wins").textContent = wins;
        document.getElementById("losses").textContent = losses;
        document.getElementById("ties").textContent = ties;
    }

    document.getElementById("reset").addEventListener("click", () => {
        localStorage.setItem("wins", 0);
        localStorage.setItem("losses", 0);
        localStorage.setItem("ties", 0);
        document.getElementById("wins").textContent = "0";
        document.getElementById("losses").textContent = "0";
        document.getElementById("ties").textContent = "0";
    });
});

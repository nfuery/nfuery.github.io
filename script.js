// script.js

const players = [
    { name: "Lionel Messi", group: "Forwards" },
    { name: "Cristiano Ronaldo", group: "Forwards" },
    { name: "Neymar", group: "Forwards" },
    { name: "Kylian Mbappe", group: "Forwards" },
    { name: "Sergio Ramos", group: "PSG Players" },
    { name: "Marquinhos", group: "PSG Players" },
    { name: "Angel Di Maria", group: "PSG Players" },
    { name: "Keylor Navas", group: "PSG Players" },
    { name: "Sergio Aguero", group: "Argentinian Players" },
    { name: "Paulo Dybala", group: "Argentinian Players" },
    { name: "Angel Di Maria", group: "Argentinian Players" },
    { name: "Lautaro Martinez", group: "Argentinian Players" },
    { name: "Thiago Silva", group: "Brazilian Players" },
    { name: "Alisson Becker", group: "Brazilian Players" },
    { name: "Casemiro", group: "Brazilian Players" },
    { name: "Roberto Firmino", group: "Brazilian Players" }
];

const playerGrid = document.getElementById('player-grid');
const selectedGroup = document.getElementById('selected-group');
const feedback = document.getElementById('feedback');
let selectedPlayers = [];

// Initialize the player grid
function initializeGrid() {
    players.forEach((player, index) => {
        const playerDiv = document.createElement('div');
        playerDiv.textContent = player.name;
        playerDiv.dataset.index = index;
        playerDiv.addEventListener('click', () => selectPlayer(index));
        playerGrid.appendChild(playerDiv);
    });
}

// Handle player selection
function selectPlayer(index) {
    const player = players[index];
    if (selectedPlayers.length < 4 && !selectedPlayers.includes(player)) {
        selectedPlayers.push(player);
        updateSelectedGroup();
    }
}

// Update the selected group display
function updateSelectedGroup() {
    selectedGroup.innerHTML = '';
    selectedPlayers.forEach(player => {
        const playerDiv = document.createElement('div');
        playerDiv.textContent = player.name;
        selectedGroup.appendChild(playerDiv);
    });
}

// Check if the selected group is correct
function checkGroup() {
    if (selectedPlayers.length === 4) {
        const group = selectedPlayers[0].group;
        const isCorrect = selectedPlayers.every(player => player.group === group);
        feedback.textContent = isCorrect ? 'Correct Group!' : 'Incorrect Group. Try Again.';
        selectedPlayers = [];
        updateSelectedGroup();
    } else {
        feedback.textContent = 'Please select 4 players.';
    }
}

// Add event listener to submit button
document.getElementById('submit-group').addEventListener('click', checkGroup);

// Initialize the game
initializeGrid();

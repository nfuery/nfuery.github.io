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
    { name: "Lautaro Martinez", group: "Argentinian Players" },
    { name: "Diego Maradona", group: "Argentinian Players"},
    { name: "Thiago Silva", group: "Brazilian Players" },
    { name: "Alisson Becker", group: "Brazilian Players" },
    { name: "Casemiro", group: "Brazilian Players" },
    { name: "Roberto Firmino", group: "Brazilian Players" }
];

const playerGrid = document.getElementById('player-grid');
const correctGroups = document.getElementById('correct-groups');
const feedback = document.getElementById('feedback');
let selectedPlayers = [];
let remainingPlayers = shuffleArray([...players]);

// Shuffle array function
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Initialize the player grid
function initializeGrid() {
    playerGrid.innerHTML = '';
    remainingPlayers.forEach((player, index) => {
        const playerDiv = document.createElement('div');
        playerDiv.textContent = player.name;
        playerDiv.dataset.index = index;
        playerDiv.classList.add('player');
        playerDiv.addEventListener('click', () => selectPlayer(index));
        playerGrid.appendChild(playerDiv);
    });
}

// Handle player selection
function selectPlayer(index) {
    const player = remainingPlayers[index];
    const playerDiv = playerGrid.querySelector(`div[data-index='${index}']`);
    
    if (selectedPlayers.includes(player)) {
        selectedPlayers = selectedPlayers.filter(p => p !== player);
        playerDiv.classList.remove('selected');
    } else if (selectedPlayers.length < 4) {
        selectedPlayers.push(player);
        playerDiv.classList.add('selected');
    }
}

// Check if the selected group is correct
function checkGroup() {
    if (selectedPlayers.length === 4) {
        const group = selectedPlayers[0].group;
        const isCorrect = selectedPlayers.every(player => player.group === group);
        if (isCorrect) {
            feedback.textContent = 'Correct Group!';
            addCorrectGroup(group, selectedPlayers);
            remainingPlayers = remainingPlayers.filter(player => !selectedPlayers.includes(player));
            selectedPlayers = [];
            initializeGrid();
        } else {
            feedback.textContent = 'Incorrect Group. Try Again.';
        }
    } else {
        feedback.textContent = 'Please select 4 players.';
    }
}

// Add correct group to the top display
function addCorrectGroup(group, players) {
    const groupDiv = document.createElement('div');
    groupDiv.classList.add('group');
    groupDiv.innerHTML = `<strong>${group}</strong><div class="players">${players.map(player => player.name).join(', ')}</div>`;
    correctGroups.appendChild(groupDiv);
}

// Add event listener to submit button
document.getElementById('submit-group').addEventListener('click', checkGroup);

// Initialize the game
initializeGrid();

let startButton = document.getElementById('start-button');
let logArea = document.getElementById('log-area');
let scoreValue = document.getElementById('score-value');
let score = 0;
let events = [
    { log: 'User1 logged in from New York.', suspicious: false },
    { log: 'Failed login attempt from IP: 192.168.1.5.', suspicious: true },
    { log: 'User2 changed password.', suspicious: false },
    { log: 'Suspicious login attempt from Russia.', suspicious: true },
    { log: 'User3 logged in from London.', suspicious: false },
    { log: 'Multiple failed login attempts from IP: 192.168.1.10.', suspicious: true },
    { log: 'User4 logged in from California.', suspicious: false },
    { log: 'Suspicious file download from untrusted IP.', suspicious: true },
];

startButton.addEventListener('click', startGame);

function startGame() {
    score = 0;
    scoreValue.textContent = score;
    logArea.innerHTML = '';
    startButton.style.display = 'none';
    generateLogs();
}

function generateLogs() {
    let eventCount = 0;
    let interval = setInterval(() => {
        if (eventCount >= events.length) {
            clearInterval(interval);
            alert('Game Over! Your Score: ' + score);
            startButton.style.display = 'block';
            return;
        }

        let event = events[eventCount];
        let logElement = document.createElement('p');
        logElement.textContent = event.log;
        logElement.style.cursor = 'pointer';
        logElement.addEventListener('click', () => flagEvent(event, logElement));
        logArea.appendChild(logElement);

        eventCount++;
    }, 2000); // New log every 2 seconds
}

function flagEvent(event, logElement) {
    if (event.suspicious) {
        score += 10;
        scoreValue.textContent = score;
        logElement.style.color = 'red';  // Mark flagged event
        logElement.style.fontWeight = 'bold';
    } else {
        score -= 5;  // Penalty for incorrect flagging
        scoreValue.textContent = score;
        logElement.style.color = 'green';  // Mark safe event
    }
}

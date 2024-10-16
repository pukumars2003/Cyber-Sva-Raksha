const canvas = document.getElementById('gradientCanvas');
const ctx = canvas.getContext('2d');
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;
const greetings = {
    en: "Hello {name}, welcome to the game!",
    hi: "नमस्ते {name}, खेल में आपका स्वागत है!",
    kn: "ನಮಸ್ಕಾರ {name}, ಆಟಕ್ಕೆ ಸ್ವಾಗತ!",
    te: "హలో {name}, ఆటకు స్వాగతం!",
    ta: "வணக்கம் {name}, விளையாட்டிற்கு வரவேற்கிறோம்!"
};

document.getElementById('start-button').addEventListener('click', function () {
    const name = document.getElementById('player-name').value.trim();
    const language = document.getElementById('language').value;

    if (name) {
        greetPlayer(name, language);
    } else {
        alert("Please enter your name.");
    }
});

function greetPlayer(name, language) {
    const greetingText = greetings[language].replace("{name}", name);
    document.getElementById('greeting').textContent = greetingText;
    speak(greetingText, language);

    setTimeout(function () {
        window.location.href = `/${language}/game_level.html`;
    }, 3000);
}

function speak(text, language) {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;

    utterance.onend = function () {
        console.log('Speech has finished.');
    };
    utterance.onerror = function (e) {
        console.error('Speech synthesis error: ' + e.error);
    };
    synth.speak(utterance);
}

const points = [
    { x: 100, y: 300, color: 'rgba(148,238,144,0.8)', radius: 400, dx: 1, dy: 1.2 },
    { x: 300, y: 600, color: 'rgba(255,192,203, 0.5)', radius: 500, dx: 1, dy: 1.2 },
    { x: 800, y: 400, color: 'rgba(255, 255, 0, 0.5)', radius: 350, dx: -1, dy: -1 },
    { x: 400, y: 700, color: 'rgb(255,192,203,0.5)', radius: 450, dx: 1.5, dy: -0.8 }
];

function drawGradient() {
    ctx.clearRect(0, 0, width, height);
    points.forEach(point => {
        const gradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, point.radius);
        gradient.addColorStop(0, point.color);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.beginPath();
        ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
    });
}

function updatePoints() {
    points.forEach(point => {
        point.x += point.dx;
        point.y += point.dy;

        if (point.x < 0 || point.x > width) point.dx *= -1;
        if (point.y < 0 || point.y > height) point.dy *= -1;
    });
}

function animate() {
    updatePoints();
    drawGradient();
    requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
});

document.getElementById('startButton').addEventListener('click', function () {
    var audio = document.getElementById('gameAudio');
    audio.play();
    setTimeout(function () {
        window.location.href = 'next_page.html'; // Change this to your target page
    }, 20000); // 20 seconds
});
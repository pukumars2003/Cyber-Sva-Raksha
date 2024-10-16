const canvas = document.getElementById('gradientCanvas');
const ctx = canvas.getContext('2d');
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

const points = [
    { x: 100, y: 300, color: 'rgba(34, 43, 122,0.8)', radius: 400, dx: 1, dy: 1.2 },
    { x: 300, y: 600, color: 'rgba(174, 227, 255, 0.5)', radius: 500, dx: 1, dy: 1.2 },
    { x: 800, y: 400, color: 'rgba(174, 141, 255, 0.5)', radius: 350, dx: -1, dy: -1 },
    { x: 400, y: 700, color: 'rgb(180, 180, 180,0.5)', radius: 450, dx: 1.5, dy: -0.8 }
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

function allowDrop(event) {
    event.preventDefault();
}


function drop(event) {
    event.preventDefault();
    // Show the investigate button
    document.getElementById('investigate-button').classList.remove('hidden');
    document.getElementById('investigation-table').innerHTML = `<p>You can now investigate the URL.</p>`;
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function showUrlParts() {
    // Hide the investigation table and button
    document.getElementById('investigation-table').style.display = 'none';
    document.getElementById('investigate-button').classList.add('hidden');

    // Show URL parts
    document.getElementById('url-parts-container').classList.remove('hidden');
}

function showSecurityTips() {
    $('#securityTipsModal').modal('show');
}
// Load the Lottie animation
var httpsAnimation = lottie.loadAnimation({
    container: document.getElementById('https-animation'), // the DOM element that will contain the animation
    renderer: 'svg', // render as SVG
    loop: true, // loop the animation
    autoplay: true, // start playing the animation
    path: 'https.json' // the path to your JSON animation
});


function showModal(part) {
    let explanation;

    switch (part) {
        case 'https://':
            explanation = "HTTPS (Hypertext Transfer Protocol Secure) ಇಂಟರ್ನೆಟ್ನಲ್ಲಿ ಡೇಟಾ ಸುರಕ್ಷಿತವಾಗಿ ವಿನಿಮಯ ಮಾಡಲು ಬಳಸುವ ವಿಧಾನ. ಇದು HTTP ಗಿಂತ ಹೆಚ್ಚು ಸುರಕ್ಷಿತ, ಏಕೆಂದರೆ ಇದು ನಿಮ್ಮ ಡೇಟಾವನ್ನು ಎನ್ಕ್ರಿಪ್ಟ್ ಮಾಡುತ್ತದೆ. ಇದರಿಂದ, ವೆಬ್ಸೈಟು ಮತ್ತು ನಿಮ್ಮ ಬ್ರೌಸರ್ನ ನಡುವಿನ ಸಂಪರ್ಕವು ಕಳ್ಳತನವಾಗದಂತೆ ಕಾಯುತ್ತದೆ.  HTTPS ಬಳಸುವ ವೆಬ್ಸೈಟುಗಳಲ್ಲಿ 'https://' ಎಂಬ ಲೇಕನ ಮತ್ತು ಬ್ರೌಸರ್ನಲ್ಲಿನ ಲಾಕ್ ಚಿಹ್ನೆ ಇದೆ. ಇದು ವೆಬ್ಸೈಟ್ ನಿಜವಾದದು ಮತ್ತು ನಿಮ್ಮ ಮಾಹಿತಿ ಸುರಕ್ಷಿತವಾಗಿದೆ ಎಂದು ಸೂಚಿಸುತ್ತದೆ. ಇಂಟರ್ನೆಟ್ನಲ್ಲಿ ಸುರಕ್ಷಿತವಾಗಿ ಸವರಣೆಗೆ HTTPS ಬಗ್ಗೆ ತಿಳಿದುಕೊಳ್ಳುವುದು ಮುಖ್ಯ.";
            playAudio('./audio/https.mp3'); // Specify the audio for HTTPS
            break;
        case 'scholarship':
            explanation = "ಡೊಮೇನ್ಗಳು ಇಂಟರ್ನೆಟ್ನಲ್ಲಿ ವೆಬ್ಸೈಟ್ಗಳನ್ನು ಗುರುತಿಸಲು ಬಳಸುವ ವಿಶಿಷ್ಟ ಹೆಸರುಗಳು. ಪ್ರತಿಯೊಂದು ಡೊಮೇನ್ ಅನ್ನು ತನ್ನದೇ ಆದ ವಿಳಾಸವಾಗಿದೆ, ಇದು ಬಳಕೆದಾರರಿಗೆ ಸುಲಭವಾಗಿ ನೆನಪಿಡಲು ಮತ್ತು ಪ್ರವೇಶಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ. ಉದಾಹರಣೆಗೆ, 'example.com' ಅಥವಾ 'instagram.com' ಎಂಬ ಹೆಸರುಗಳು ಡೊಮೇನ್ಗಳಿಗೆ ಉದಾಹರಣೆ.Instagram.com ಎಂಬ ಡೊಮೇನ್ ನಿಜವಾದ ಮತ್ತು ಅಧಿಕೃತವಾಗಿದೆ. ಇದರ URL https://www.instagram.com, ಇಲ್ಲಿ 'https://' ಬಳಕೆಯು ಸುರಕ್ಷಿತ ಸಂಪರ್ಕವನ್ನು ಸೂಚಿಸುತ್ತದೆ. ಬ್ರೌಸರ್ನಲ್ಲಿಯ ಲಾಕ್ ಚಿಹ್ನೆವು ಈ ತಾಣ ಭದ್ರವಾಗಿದೆ ಎಂದು ಖಾತರಿಯನ್ನು ನೀಡುತ್ತದೆ. Instagram, Meta Platforms Inc. ಯಿಂದ ನಿರ್ವಹಿಸಲ್ಪಡುವ ಕಾರಣ, ಇದರ ಉದ್ದೇಶಗಳು ಮತ್ತು ಸೇವೆಗಳು ವಿಶ್ವಾಸಾರ್ಹವಾಗಿವೆ. ಈ ಎಲ್ಲಾ ಅಂಶಗಳು Instagram.com ಅನ್ನು legit ಮತ್ತು ಸುರಕ್ಷಿತ ವೆಬ್ಸೈಟ್ ಎಂದು ಗುರುತಿಸಲು ಸಹಾಯಿಸುತ್ತವೆ.";
            playAudio('./audio/domain.mp3'); // Specify the audio for Domain
            break;
        case '.com':
            explanation = "This is the top-level domain (TLD), indicating the type of entity associated with the domain.";
            playAudio('audio/tld.mp3'); // Specify the audio for TLD
            break;
        default:
            explanation = "Unknown part.";
    }

    const generalExplanation = `
            <h6>How to Recognize a Legitimate URL:</h6>
            <p>A legitimate URL typically includes:</p>
            <ul>
                <li><strong>HTTPS:</strong> Indicates a secure connection. Always check for 'https://' at the start of the URL.</li>
                <li><strong>Domain Name:</strong> The main part of the website address (e.g., 'scholarship' in this case).</li>
                <li><strong>Top-Level Domain (TLD):</strong> Common TLDs include '.com', '.org', '.net', etc. Check if the TLD is legitimate.</li>
            </ul>
            <p>Be cautious of URLs that have misspellings or unusual characters.</p>
        `;

    document.getElementById('modal-body-content').innerHTML = explanation + generalExplanation;
    $('#urlModal').modal('show');
}

function playAudio(src) {
    const audio = document.getElementById('modal-audio');
    audio.src = src;
    audio.play();
}
function goToGame() {
    window.location.href = '../game_level.html';
}
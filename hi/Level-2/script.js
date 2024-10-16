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
            explanation = "HTTPS (हाइपरटेक्स्ट ट्रांसफर प्रोटोकॉल सेक्योर) इंटरनेट पर डेटा को सुरक्षित रूप से साझा करने के लिए एक विधि है। यह HTTP की तुलना में अधिक सुरक्षित है क्योंकि यह आपके डेटा को एन्क्रिप्ट करता है। इससे वेबसाइट और आपके ब्राउज़र के बीच का संपर्क चोरी से बचा रहता है। HTTPS का उपयोग करने वाली वेबसाइटों में 'https://' का प्रारंभिक भाग और ब्राउज़र में एक ताले का चिह्न होता है। यह संकेत करता है कि वेबसाइट असली है और आपका जानकारी सुरक्षित है। इंटरनेट पर सुरक्षित ब्राउज़िंग के लिए HTTPS के बारे में जानना महत्वपूर्ण है।";
            playAudio('./audio/HTTPS Hindi.mp3'); // Specify the audio for HTTPS
            break;
        case 'scholarship':
            explanation = "डोमेन इंटरनेट पर वेबसाइटों को पहचानने के लिए उपयोग होने वाले विशिष्ट नाम हैं। प्रत्येक डोमेन का अपना एक अद्वितीय पता होता है, जो उपयोगकर्ताओं के लिए इसे याद रखना और एक्सेस करना आसान बनाता है। उदाहरण के लिए, 'example.com' या 'instagram.com' जैसे नाम डोमेन के उदाहरण हैं। Instagram.com एक वास्तविक और आधिकारिक डोमेन है। इसका URL https://www.instagram.com है, जहाँ 'https://' का उपयोग सुरक्षित संपर्क को दर्शाता है। ब्राउज़र में ताले का चिह्न यह सुनिश्चित करता है कि यह साइट सुरक्षित है। Instagram, Meta Platforms Inc. द्वारा प्रबंधित किया जाता है, इसलिए इसकी सेवाएँ और उद्देश्यों पर भरोसा किया जा सकता है। ये सभी पहलू Instagram.com को एक विश्वसनीय और सुरक्षित वेबसाइट के रूप में पहचानने में मदद करते हैं।";
            playAudio('./audio/Domain Hindi1.mp3'); // Specify the audio for Domain
            break;
        case '.com':
            explanation = "इसका URL https://www.instagram.com है, जहाँ 'https://' का उपयोग सुरक्षित संपर्क को दर्शाता है। ब्राउज़र में ताले का चिह्न यह सुनिश्चित करता है कि यह साइट सुरक्षित है। Instagram, Meta Platforms Inc. द्वारा प्रबंधित किया जाता है, इसलिए इसकी सेवाएँ और उद्देश्यों पर भरोसा किया जा सकता है। ये सभी पहलू Instagram.com को एक विश्वसनीय और सुरक्षित वेबसाइट के रूप में पहचानने में मदद करते हैं।  This is the top-level domain (TLD), indicating the type of entity associated with the domain.";
            playAudio('audio/Domain Hindi2.mp3'); // Specify the audio for TLD
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
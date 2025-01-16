
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');


function resizeCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

let serverHealth = 100;
let budget = 50000;
let wave = 0;
let attacks = [];
let defenses = [];


const serverHealthEl = document.getElementById('serverHealth');
const budgetEl = document.getElementById('budget');
const placeFirewallBtn = document.getElementById('placeFirewall');
const placeAntivirusBtn = document.getElementById('placeAntivirus');
const startWaveBtn = document.getElementById('startWave');

const server = {
  x: 50, // Fixed x position on the left
  y: canvas.height / 2 - 50, // Centered vertically
  width: 100,
  height: 100
};

// Update server position on resize
function updateServerPosition() {
  server.y = canvas.height / 2 - server.height / 2;
}

window.addEventListener('resize', updateServerPosition);
updateServerPosition();

// Game Elements
class Attack {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;  
    this.health = 100;   
    this.size = 30;
  }

  move() {
    this.x -= this.speed;
  }

  draw() {
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }
}

class Defense {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.range = type === 'firewall' ? 100 : 150;
    this.damage = type === 'firewall' ? 0.5 : 1.0; 
    this.size = 40;
  }

  draw() {
    ctx.fillStyle = this.type === 'firewall' ? 'blue' : 'green';
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }

  attack(enemy) {
    // Calculate center positions for distance calculation
    const defenseCenterX = this.x + this.size / 2;
    const defenseCenterY = this.y + this.size / 2;
    const enemyCenterX = enemy.x + enemy.size / 2;
    const enemyCenterY = enemy.y + enemy.size / 2;

    const distance = Math.hypot(defenseCenterX - enemyCenterX, defenseCenterY - enemyCenterY);

    if (distance < this.range) {
      if (this.type === 'firewall') {
      
        enemy.speed = Math.max(0.1, enemy.speed - 0.1); 
      } else if (this.type === 'antivirus') {
        
        enemy.health -= this.damage;
        if (enemy.health <= 0) {
          const index = attacks.indexOf(enemy);
          if (index > -1) {
            attacks.splice(index, 1);
            budget += 250; 
            updateBudget();
          }
        }
      }
    }
  }
}


function getRandomPosition() {
  const x = canvas.width - 50; 
  const y = Math.random() * (canvas.height - 50);
  return { x, y };
}

// Update Budget Display
function updateBudget() {
  budgetEl.textContent = budget;
}

// Handle placing defenses at random positions within the right half
placeFirewallBtn.addEventListener('click', () => {
  if (budget >= 5000) {
    budget -= 5000;
    updateBudget();
    const { x, y } = getRandomPosition();
    defenses.push(new Defense(x, y, 'firewall'));
  } else {
    alert('Insufficient funds to place Firewall.');
  }
});

placeAntivirusBtn.addEventListener('click', () => {
  if (budget >= 10000) {
    budget -= 10000;
    updateBudget();
    const { x, y } = getRandomPosition();
    defenses.push(new Defense(x, y, 'antivirus'));
  } else {
    alert('Insufficient funds to place Antivirus.');
  }
});

startWaveBtn.addEventListener('click', () => {
  wave++;
  for (let i = 0; i < wave * 5; i++) {
    attacks.push(new Attack(canvas.width - 50, Math.random() * (canvas.height - 50), 1 + Math.random() * 2));
  }
});


function drawServer() {
  ctx.fillStyle = '#555';
  ctx.fillRect(server.x, server.y, server.width, server.height);

  
  ctx.fillStyle = '#fff';
  ctx.font = '16px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('SERVER', server.x + server.width / 2, server.y + server.height / 2);
}


function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  
  drawServer();

  // Move and draw attacks
  attacks.forEach((attack, index) => {
    attack.move();
    attack.draw();


    if (attack.x <= server.x + server.width) {
      serverHealth -= 2;
      serverHealthEl.textContent = serverHealth;
      attacks.splice(index, 1);
    }

    defenses.forEach(defense => {
      defense.attack(attack);
    });
  });

  defenses.forEach(defense => {
    defense.draw();
  });

  serverHealthEl.textContent = serverHealth;


  if (serverHealth <= 0) {
    alert('Game Over! Your server has been compromised.');
    resetGame();
  }

  requestAnimationFrame(gameLoop);
}


function resetGame() {
  serverHealth = 100;
  budget = 50000;
  wave = 0;
  attacks = [];
  defenses = [];
  updateBudget();
  serverHealthEl.textContent = serverHealth;
}


gameLoop();
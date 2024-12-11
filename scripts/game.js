import { rotateTurret } from './turret.js';
import { spawnEnemy } from './enemies.js';
import { shootBullet } from './bullets.js';

// Main game setup
const gameArea = document.getElementById('gameArea');

// Initialize game events
gameArea.addEventListener('mousemove', (event) => rotateTurret(event, gameArea));
gameArea.addEventListener('click', (event) => shootBullet(event, gameArea));

gameArea.addEventListener('mousemove', (event) => rotateTurret(event, gameArea));
gameArea.addEventListener('click', (event) => shootBullet(event, gameArea));

// Spawn enemies periodically
spawnInterval = setInterval(() => spawnEnemy(gameArea), 1000);


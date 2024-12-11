/*export function shootBullet(event, gameArea) {
    const bullet = document.createElement('div');
    bullet.classList.add('bullet');

    // Turret center
    const rect = gameArea.getBoundingClientRect();
    const turretCenter = {
        x: rect.width / 2,
        y: rect.height / 2
    };

    // Initial position and angle
    let x = turretCenter.x;
    let y = turretCenter.y;
    const angle = Math.atan2(event.clientY - turretCenter.y, event.clientX - turretCenter.x);

    bullet.style.left = `${x}px`;
    bullet.style.top = `${y}px`;
    gameArea.appendChild(bullet);

    // Move bullet
    const speed = 8;

    function moveBullet() {
        x += Math.cos(angle) * speed;
        y += Math.sin(angle) * speed;

        bullet.style.left = `${x}px`;
        bullet.style.top = `${y}px`;

        // Check for collision with enemies
        const enemies = document.querySelectorAll('.enemy');
        enemies.forEach((enemy) => {
            if (isCollision(bullet, enemy)) {
                // Ensure enemy can only trigger one collision
                if (!enemy.dataset.hit) {
                    enemy.dataset.hit = "true"; // Mark as hit to prevent duplicate collisions

                    // Create an explosion effect
                    createExplosion(enemy, gameArea);

                    // Remove bullet and enemy
                    bullet.remove();
                    enemy.remove();
                }
            }
        });

        // Remove bullet if out of bounds
        if (x < 0 || y < 0 || x > window.innerWidth || y > window.innerHeight) {
            bullet.remove();
        } else {
            requestAnimationFrame(moveBullet);
        }
    }

    moveBullet();
}
*/
let score = 0; // Variável para armazenar o score

// Função para atualizar o score na tela
function updateScore() {
    const scoreElement = document.getElementById('score');
    if (scoreElement) {
        scoreElement.textContent = `Score: ${score}`;
    }
}

export function shootBullet(event, gameArea) {
    const bullet = document.createElement('div');
    bullet.classList.add('bullet');

    // Turret center
    const rect = gameArea.getBoundingClientRect();
    const turretCenter = {
        x: rect.width / 2,
        y: rect.height / 2
    };

    // Initial position and angle
    let x = turretCenter.x;
    let y = turretCenter.y;
    const angle = Math.atan2(event.clientY - turretCenter.y, event.clientX - turretCenter.x);

    bullet.style.left = `${x}px`;
    bullet.style.top = `${y}px`;
    gameArea.appendChild(bullet);

    // Move bullet
    const speed = 8;

    function moveBullet() {
        x += Math.cos(angle) * speed;
        y += Math.sin(angle) * speed;

        bullet.style.left = `${x}px`;
        bullet.style.top = `${y}px`;

        // Check for collision with enemies
        const enemies = document.querySelectorAll('.enemy');
        enemies.forEach((enemy) => {
            if (isCollision(bullet, enemy)) {
                // Ensure enemy can only trigger one collision
                if (!enemy.dataset.hit) {
                    enemy.dataset.hit = "true"; // Mark as hit to prevent duplicate collisions

                    // Create an explosion effect
                    createExplosion(enemy, gameArea);

                    // Remove bullet and enemy
                    bullet.remove();
                    enemy.remove();

                    // Increment score and update display
                    score++;
                    updateScore(); // Update the score on the screen
                }
            }
        });

        // Remove bullet if out of bounds
        if (x < 0 || y < 0 || x > window.innerWidth || y > window.innerHeight) {
            bullet.remove();
        } else {
            requestAnimationFrame(moveBullet);
        }
    }

    moveBullet();
}


// Helper function to check for collision
function isCollision(bullet, enemy) {
    const bulletRect = bullet.getBoundingClientRect();
    const enemyRect = enemy.getBoundingClientRect();

    return !(
        bulletRect.right < enemyRect.left ||
        bulletRect.left > enemyRect.right ||
        bulletRect.bottom < enemyRect.top ||
        bulletRect.top > enemyRect.bottom
    );
}

// Helper function to create an explosion
function createExplosion(enemy, gameArea) {
    const explosion = document.createElement('div');
    explosion.classList.add('explosion');
    explosion.style.left = `${enemy.offsetLeft}px`;
    explosion.style.top = `${enemy.offsetTop}px`;
    gameArea.appendChild(explosion);

    // Remove explosion after animation
    setTimeout(() => explosion.remove(), 300);
}

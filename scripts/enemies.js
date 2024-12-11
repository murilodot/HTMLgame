export function spawnEnemy(gameArea) {
    const enemy = document.createElement('div');
    enemy.classList.add('enemy');

    // Set initial position (randomly on the edges of the game area)
    const rect = gameArea.getBoundingClientRect();
    const side = Math.floor(Math.random() * 4); // 0 = top, 1 = right, 2 = bottom, 3 = left
    let x, y;

    switch (side) {
        case 0: // Top
            x = Math.random() * rect.width;
            y = 0;
            break;
        case 1: // Right
            x = rect.width;
            y = Math.random() * rect.height;
            break;
        case 2: // Bottom
            x = Math.random() * rect.width;
            y = rect.height;
            break;
        case 3: // Left
            x = 0;
            y = Math.random() * rect.height;
            break;
    }

    enemy.style.left = `${x}px`;
    enemy.style.top = `${y}px`;
    gameArea.appendChild(enemy);

    // Move enemy toward center
    moveEnemy(enemy, gameArea);
}

function moveEnemy(enemy, gameArea) {
    const rect = gameArea.getBoundingClientRect();
    const turretCenter = {
        x: rect.width / 2,
        y: rect.height / 2
    };

    const speed = Math.random() * 2 + 1;

    function updatePosition() {
        if (!enemy.parentElement) {
            // Se o inimigo não estiver mais no DOM, parar o movimento
            return;
        }

        const enemyRect = enemy.getBoundingClientRect();
        const angle = Math.atan2(turretCenter.y - enemyRect.top, turretCenter.x - enemyRect.left);

        const x = parseFloat(enemy.style.left);
        const y = parseFloat(enemy.style.top);

        enemy.style.left = `${x + Math.cos(angle) * speed}px`;
        enemy.style.top = `${y + Math.sin(angle) * speed}px`;

        // Verificar se o inimigo encostou na torreta (colisão)
        const enemyCenterX = enemyRect.left + enemyRect.width / 2;
        const enemyCenterY = enemyRect.top + enemyRect.height / 2;

        const turretRect = gameArea.getBoundingClientRect();
        const turretCenterX = turretRect.width / 2;
        const turretCenterY = turretRect.height / 2;

        const distance = Math.hypot(
            turretCenterX - enemyCenterX,
            turretCenterY - enemyCenterY
        );

        if (distance < 40) { // A distância foi reduzida para garantir que o inimigo tocou a torreta
            console.log("GAME OVER! O inimigo encostou na torreta.");
            enemy.remove(); // Remove o inimigo
            endGame(); // Chama a função para terminar o jogo
        } else {
            requestAnimationFrame(updatePosition); // Continua o movimento
        }
    }

    requestAnimationFrame(updatePosition);
}

// Função que termina o jogo
function endGame() {
    alert("Fim de Jogo! O inimigo atingiu a torreta.");
    
    location.reload();
}

export function rotateTurret(event, gameArea) {
    const turret = document.getElementById('turret');

    // Get turret center position
    const rect = gameArea.getBoundingClientRect();
    const turretCenter = {
        x: rect.width / 2,
        y: rect.height / 2
    };

    // Calculate angle between turret and mouse
    const angle = Math.atan2(event.clientY - turretCenter.y, event.clientX - turretCenter.x);
    turret.style.transform = `rotate(${angle}rad)`;
}

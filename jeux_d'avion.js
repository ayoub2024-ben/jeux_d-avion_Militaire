// button jouer 

function nvfenetre(){
    window.location.href="http://127.0.0.1:5500/Jeux_d'avion/jeux_d'avion.html";
}

// Récupère les éléments HTML
const startButton = document.querySelector('.start');
const restartButton = document.querySelector('.restart');
const gameContainer = document.querySelector('.game');
const gameInfo = document.querySelector('.gameinfo');
let score = 0;
let timer;
let time = 0;

// Fonction pour démarrer le jeu
function startGame() {
    // Masquer le bouton Start
    startButton.style.display = 'inline-block';
    
    // Afficher le bouton Restart
    restartButton.style.display = 'inline-block';
    
    // Afficher le contenu du jeu
    gameContainer.style.display = 'block';
    
    // Démarrer un chronomètre (simple compteur de temps)
    timer = setInterval(function() {
        time++;
        document.querySelector('.time').innerHTML = `<strong> Time : ${time} </strong>`;
    }, 1000);
    
}

// Fonction pour redémarrer le jeu
function restartGame() {
    // Réinitialiser le score et le temps
    score = 0;
    time = 0;
    document.querySelector('.score').innerHTML = `<strong> Score : ${score} </strong>`;
    document.querySelector('.time').innerHTML = `<strong> Time : ${time} </strong>`;
    
    // Masquer le jeu et réafficher le bouton Start
    gameContainer.style.display = 'block';
    startButton.style.display = 'inline-block';
    
    // Masquer le bouton Restart
    restartButton.style.display = 'inline-block';
    
    // Arrêter le chronomètre
    clearInterval(timer);
}

// Ajouter des écouteurs d'événements
startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', restartGame);

// Sélectionner les éléments nécessaires
const airplane = document.getElementById('airplane');
let isGameStarted = false;  // Variable pour vérifier si le jeu est lancé

const moveStep = 20;  // Distance de déplacement à chaque étape
let direction = ''; // Direction de l'avion

// Fonction pour démarrer le jeu
startButton.addEventListener('click', () => {
    if (!isGameStarted) {
        isGameStarted = true;
        startButton.disabled = true;  // Désactiver le bouton Start une fois cliqué
        moveAirplane();  // Démarrer le déplacement de l'avion
    }
});

// Fonction pour redémarrer le jeu
restartButton.addEventListener('click', () => {
    x = -100;
    y = 15;
    airplane.style.transform = `translate(${x}px, ${y}px)`;  // Réinitialiser la position
    isGameStarted = false;
    startButton.disabled = false;  // Réactiver le bouton Start
});

// Fonction pour déplacer l'avion
function moveAirplane() {
    if (!isGameStarted) return;

    // Ajouter un effet de flash lors du mouvement
    airplane.classList.add('flash');
    setTimeout(() => {
        airplane.classList.remove('flash');
    }, 100); // Flash visible pendant 100ms

    // Appliquer la nouvelle position de l'avion
    airplane.style.transform = `translate(${x}px, ${y}px)`;

    // Redemander à l'animation de se déplacer
    setTimeout(moveAirplane, 50);  // Déplace l'avion toutes les 50ms
}

// Fonction pour gérer la direction de l'avion avec les touches du clavier
document.addEventListener('keydown', (event) => {
    if (!isGameStarted) return;

    // Changer la direction selon les touches pressées
    if (event.key === 'ArrowUp') {
        y -= moveStep;  // Déplacer l'avion vers le haut
    } else if (event.key === 'ArrowDown') {
        y += moveStep;  // Déplacer l'avion vers le bas
    } else if (event.key === 'ArrowLeft') {
        x -= moveStep;  // Déplacer l'avion vers la gauche
    } else if (event.key === 'ArrowRight') {
        x += moveStep;  // Déplacer l'avion vers la droite
    }

    if (x == 12) ;
    if (x == maxX) ;
    if (y < 0) ;
    if (y > maxY) ;


});


// Sélectionner le modal et le bouton pour démarrer le jeu
const modal = document.getElementById('introModal');
const startGameBtn = document.getElementById('startGameBtn');
const closeModal = document.querySelector('.close');

// Afficher le modal au début
window.onload = function() {
    modal.style.display = 'block'; // Affiche le modal
}

// Lorsque l'utilisateur clique sur "Commencer le jeu", fermer le modal
startGameBtn.addEventListener('click', function() {
    modal.style.display = 'none'; // Cache le modal
});


let enemies = [];
let enemySpeed = 1;  // Vitesse de descente des ennemis
let enemyInterval;  // Intervalle pour créer des ennemis
let gameOverModal = document.getElementById('gameOver');  // Modal de fin de jeu

// Fonction pour créer un ennemi
function createEnemy() {
    const enemy = document.createElement('img');
    enemy.classList.add('enemy');
    enemy.src = 'enemies-removebg-preview.png';
    enemy.style.position = 'absolute';
    enemy.style.left = `${Math.random() * (gameContainer.offsetWidth - 50)}px`;  // Position aléatoire
    enemy.style.top = `-50px`;  // Commence au-dessus du jeu
    enemy.style.width = '50px';
    enemy.style.height = '50px';

    gameContainer.appendChild(enemy);
    enemies.push(enemy);
}

// Fonction pour faire tomber les ennemis
function dropEnemies() {
    for (let i = 0; i < enemies.length; i++) {
        let enemy = enemies[i];
        let currentTop = parseInt(enemy.style.top);

        if (currentTop < gameContainer.offsetHeight) {
            enemy.style.top = `${currentTop + enemySpeed}px`;
        } else {
            // Si l'ennemi atteint le bas, le retirer
            gameContainer.removeChild(enemy);
            enemies.splice(i, 1);
            i--;
        }

        // Vérification de collision avec l'avion
        checkCollision(enemy);
    }
}

// Fonction de vérification de la collision entre l'avion et un ennemi
function checkCollision(enemy) {
    const airplaneRect = airplane.getBoundingClientRect();
    const enemyRect = enemy.getBoundingClientRect();

    if (airplaneRect.left < enemyRect.right &&
        airplaneRect.right > enemyRect.left &&
        airplaneRect.top < enemyRect.bottom &&
        airplaneRect.bottom > enemyRect.top) {
        gameOver();  // Si collision, fin du jeu
    }
}

// Fonction Game Over
function gameOver() {
    // Afficher le message de Game Over
    gameOverModal.style.display = 'block';
    clearInterval(enemyInterval);  // Arrêter la création d'ennemis
    clearInterval(timer);  // Arrêter le chronomètre
}

// Ajouter l'écouteur d'événement pour redémarrer le jeu
document.getElementById('restartBtn').addEventListener('click', restartGame);

// Fonction pour redémarrer le jeu
function restartGame() {
    // Réinitialiser l'avion et les ennemis
    airplane.style.transform = `translate(-100px, 15px)`;  // Réinitialiser la position de l'avion
    enemies.forEach(enemy => gameContainer.removeChild(enemy));  // Enlever tous les ennemis
    enemies = [];
     // Réinitialiser le temps et le score
     time = 0;  // Réinitialiser le temps
     document.querySelector('.time').innerHTML = `<strong> Time : ${time} </strong>`;  // Mettre à jour l'affichage du temps
     document.querySelector('.score').innerHTML = `<strong> Score : 0 </strong>`;  // Réinitialiser le score (si tu veux aussi le réinitialiser)
    gameOverModal.style.display = 'none';  // Cacher le modal Game Over
    startGame();  // Recommencer le jeu
}

function startGame() {
    // Masquer le bouton Start et afficher le jeu
    startButton.style.display = 'none';
    restartButton.style.display = 'inline-block';
    gameContainer.style.display = 'block';

    // Démarrer un chronomètre
    timer = setInterval(function() {
        time++;
        document.querySelector('.time').innerHTML = `<strong> Time : ${time} </strong>`;
    }, 1000);

    // Commencer à créer les ennemis toutes les 0.2 secondes
    enemyInterval = setInterval(createEnemy, 2000);  // Créer un ennemi toutes les 200ms
    setInterval(dropEnemies, 20);  // Déplacer les ennemis toutes les 20ms
}



let bullets = []; // Tableau pour stocker les balles
let x = -100; // Position X de l'avion (ajustez selon votre code)
let y = 15; // Position Y de l'avion (ajustez selon votre code)

// Fonction pour tirer la balle
function shootBullet() {
    // Créer un nouvel élément de balle
    const bullet = document.createElement('div');
    bullet.classList.add('bullet');
    bullet.style.position = 'absolute';
    bullet.style.width = '10px';
    bullet.style.height = '20px';
    bullet.style.backgroundColor = 'red';  // La couleur de la balle

    // Positionner la balle juste devant l'avion (ajustez les valeurs si nécessaire)
    bullet.style.left = `${x + 450}px`;  // Position X de l'avion + décalage horizontal
    bullet.style.top = `${y + 390}px`;  // Position Y de l'avion + décalage vertical

    gameContainer.appendChild(bullet);
    bullets.push(bullet);

    // Déplacer la balle
    moveBullet(bullet);
}

// Fonction pour déplacer la balle
function moveBullet(bullet) {
    const bulletInterval = setInterval(() => {
        const currentTop = parseInt(bullet.style.top); // Récupérer la position actuelle en haut

        // Déplacer la balle vers le haut (diminuez la valeur de `top`)
        bullet.style.top = `${currentTop - 10}px`; // Déplacer vers le haut

        // Vérifier la collision avec les ennemis
        for (let i = 0; i < enemies.length; i++) {
            const enemy = enemies[i];
            if (checkCollision(bullet, enemy)) {
                // Si collision, tuer l'ennemi et ajouter au score
                gameContainer.removeChild(enemy);
                enemies.splice(i, 1);
                gameContainer.removeChild(bullet);  // Supprimer la balle
                bullets = bullets.filter(b => b !== bullet);  // Retirer la balle du tableau
                score++;
                document.querySelector('.score').innerHTML = `<strong> Score : ${score} </strong>`;
                clearInterval(bulletInterval);  // Arrêter le mouvement de la balle
                break;
            }
        }

        // Si la balle sort du haut de l'écran, la supprimer
        if (currentTop < 0) {  // Si la balle est au-dessus de l'écran
            gameContainer.removeChild(bullet);
            bullets = bullets.filter(b => b !== bullet);
            clearInterval(bulletInterval);
        }
    }, 10);  // Déplacer la balle toutes les 10ms
}

// Ajouter un événement pour écouter la pression de la touche 'espace'
document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {  // Vérifie si la touche "espace" est pressée
        shootBullet();  // Appeler la fonction pour tirer la balle
    }
});

// Fonction de vérification de collision entre la balle et un ennemi
function checkCollision(bullet, enemy) {
    const bulletRect = bullet.getBoundingClientRect();
    const enemyRect = enemy.getBoundingClientRect();

    return (
        bulletRect.left < enemyRect.right &&
        bulletRect.right > enemyRect.left &&
        bulletRect.top < enemyRect.bottom &&
        bulletRect.bottom > enemyRect.top
    );
}

// Ajouter l'écouteur d'événement pour la barre d'espace
document.addEventListener('keydown', (event) => {
    if (!isGameStarted) return;

    if (event.key === ' ') {  // Vérifier si la touche est espace
        shootBullet();  // Appeler la fonction de tir
    } else if (event.key === 'ArrowUp') {
        y -= moveStep;
    } else if (event.key === 'ArrowDown') {
        y += moveStep;
    } else if (event.key === 'ArrowLeft') {
        x -= moveStep;
    } else if (event.key === 'ArrowRight') {
        x += moveStep;
    }

    airplane.style.transform = `translate(${x}px, ${y}px)`;  // Appliquer la nouvelle position
});



// Fonction pour créer un bonus
function createBonus() {
    const bonus = document.createElement('div');
    bonus.classList.add('bonus');
    bonus.style.position = 'absolute';
    bonus.style.width = '30px';
    bonus.style.height = '30px';
    bonus.style.backgroundColor = 'orange';  // Couleur du bonus
    bonus.style.borderRadius = '50%';  // Donne une forme ronde
    bonus.style.left = `${Math.random() * (gameContainer.offsetWidth - 30)}px`;  // Position X aléatoire
    bonus.style.top = `${Math.random() * (gameContainer.offsetHeight - 30)}px`; // Position Y aléatoire

    gameContainer.appendChild(bonus);

    // Vérifier la collision avec l'avion et multiplier le score par 2
    checkBonusCollision(bonus);
}

// Fonction pour vérifier la collision entre l'avion et le bonus
function checkBonusCollision(bonus) {
    const bonusInterval = setInterval(() => {
        const bonusRect = bonus.getBoundingClientRect();
        const airplaneRect = airplane.getBoundingClientRect();

        // Vérifier si l'avion touche le bonus
        if (
            airplaneRect.left < bonusRect.right &&
            airplaneRect.right > bonusRect.left &&
            airplaneRect.top < bonusRect.bottom &&
            airplaneRect.bottom > bonusRect.top
        ) {
            // Si collision, multiplier le score par 2
            score *= 2;
            document.querySelector('.score').innerHTML = `<strong> Score : ${score} </strong>`;

            // Afficher un message pendant 3 secondes
            displayBonusMessage();

            // Supprimer le bonus et arrêter la vérification
            gameContainer.removeChild(bonus);
            clearInterval(bonusInterval);
        }
    }, 10);  // Vérifier la collision toutes les 10ms
}

// Fonction pour afficher un message de bonus
function displayBonusMessage() {
    const bonusMessage = document.createElement('div');
    bonusMessage.classList.add('bonus-message');
    bonusMessage.innerHTML = "<strong> Bonus activé! Score x2 </strong>";
    bonusMessage.style.position = 'absolute';
    bonusMessage.style.top = '20px';
    bonusMessage.style.left = '50%';
    bonusMessage.style.transform = 'translateX(-50%)';
    bonusMessage.style.backgroundColor = 'green';
    bonusMessage.style.padding = '10px';
    bonusMessage.style.borderRadius = '5px';

    // Afficher le message pendant 3 secondes
    gameContainer.appendChild(bonusMessage);

    setTimeout(() => {
        gameContainer.removeChild(bonusMessage);
    }, 1000);  // Retirer le message après 1 secondes
}


// Ajouter un bonus toutes les 7 secondes
setInterval(() => {
    createBonus();
}, 7000);  // Créer un bonus toutes les 7 secondes











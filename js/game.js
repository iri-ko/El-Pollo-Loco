let canvas;
let world;
let keyboard = new Keyboard();

const worlds = [];

function startGame(screenID, buttonID) {
    canvas = document.getElementById("canvas");
    resetGameState();
    if (worlds.length == 0) {
        worlds.push(new World(canvas, keyboard));
    }
    makeScreenInvisible(screenID, buttonID);
    legalInvisible();
    playMusic();
}

function resetGameState() {
    if (worlds.length == 1) {
        worlds.splice(0, 1, new World(canvas, keyboard));

        // world.gameOverFlag = false;
        // world.showBossBar = false;

        // // Reset player stats
        // world.character.energy = 100;
        // world.character.coinCounter = 0;
        // world.character.bottleCounter = 0;

        // // Reset enemy health
        // world.level.enemies.forEach((enemy) => {
        //     if (enemy instanceof Endboss) {
        //         enemy.energy = 100;
        //     }
        // });
    }
}

function playMusic() {
    if (AudioHub.music.paused || AudioHub.music.currentTime === 0) {
        AudioHub.music.loop = true;
        AudioHub.music.play(); // Start playing
    }
    AudioHub.music.volume = 0.2;
}

function controlsInvisible() {
    const closeRef = document.getElementById("controlPanal");
    closeRef.classList.add("d-none");
}

function legalInvisible() {
    const closeRef = document.getElementById("legal");
    closeRef.classList.add("d-none");
}

function makeScreenInvisible(screenID, buttonID) {
    const screenRef = document.getElementById(`${screenID}`);
    const buttonRef = document.getElementById(`${buttonID}`);
    screenRef.classList.remove("d-flex");
    screenRef.classList.add("d-none");
    buttonRef.classList.remove("d-flex");
    buttonRef.classList.add("d-none");
}

document.getElementById("left").addEventListener("touchstart", () => {
    keyboard.LEFT = true;
});

document.getElementById("left").addEventListener("touchend", () => {
    keyboard.LEFT = false;
});

document.getElementById("right").addEventListener("touchstart", () => {
    keyboard.RIGHT = true;
});

document.getElementById("right").addEventListener("touchend", () => {
    keyboard.RIGHT = false;
});

document.getElementById("jump").addEventListener("touchstart", () => {
    keyboard.SPACE = true;
});

document.getElementById("jump").addEventListener("touchend", () => {
    keyboard.SPACE = false;
});

document.getElementById("throw").addEventListener("touchstart", () => {
    keyboard.DOWN = true;
});

document.getElementById("throw").addEventListener("touchend", () => {
    keyboard.DOWN = false;
});

window.addEventListener("keydown", (event) => {
    if (event.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if (event.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if (event.keyCode == 40) {
        keyboard.DOWN = true;
    }

    if (event.keyCode == 38) {
        keyboard.UP = true; //
    }

    if (event.keyCode == 32) {
        keyboard.SPACE = true;
    }
});

window.addEventListener("keyup", (event) => {
    if (event.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if (event.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if (event.keyCode == 40) {
        keyboard.DOWN = false;
    }

    if (event.keyCode == 38) {
        keyboard.UP = false;
    }

    if (event.keyCode == 32) {
        keyboard.SPACE = false;
    }
});

/**
 * The game canvas element.
 * @type {HTMLCanvasElement}
 */
let canvas;

/**
 * The main game world instance.
 * @type {World}
 */
let world;

/**
 * The keyboard input manager for player controls.
 * @type {Keyboard}
 */
let keyboard = new Keyboard();

/**
 * Array storing active world instances.
 * @type {World[]}
 */
const worlds = [];

/**
 * Initializes and starts the game.
 * Sets up the canvas, resets game state, and prepares the level.
 *
 * @param {string} screenID - The ID of the screen to hide.
 * @param {string} buttonID - The ID of the button to hide.
 */
function startGame(screenID, buttonID) {
    canvas = document.getElementById("canvas");
    resetGameState();
    initLevel();
    if (worlds.length === 0) {
        worlds.push(new World(canvas, keyboard));
    }
    makeScreenInvisible(screenID, buttonID);
    legalInvisible();
    playMusic();
}

/**
 * Resets the game state by replacing the current world instance.
 */
function resetGameState() {
    if (worlds.length === 1) {
        worlds.splice(0, 1, new World(canvas, keyboard));
    }
}

/**
 * Plays background music if not already playing.
 * Ensures volume is adjusted based on settings.
 */
function playMusic() {
    if (AudioHub.music.paused || AudioHub.music.currentTime === 0) {
        AudioHub.music.loop = true;
        AudioHub.music.play();
    }

    AudioHub.initializeAudioSettings();
    AudioHub.music.volume = AudioHub.volumeOn ? 0.2 : 0;
}

function showStartScreen(screenID, buttonID) {
    makeScreenInvisible(screenID, buttonID);
    const startRef = document.getElementById("start");
    startRef.classList.add("d-flex");
    startRef.classList.remove("d-none");
    const startButtonRef = document.getElementById("start-game");
    startButtonRef.classList.add("d-flex");
    startButtonRef.classList.remove("d-none");
}

/**
 * Hides the game controls panel.
 */
function controlsInvisible() {
    document.getElementById("controlPanal").classList.add("d-none");
}

/**
 * Hides the legal information section.
 */
function legalInvisible() {
    document.getElementById("legal").classList.add("d-none");
}

/**
 * Hides a given screen and button by modifying their visibility.
 *
 * @param {string} screenID - The ID of the screen to hide.
 * @param {string} buttonID - The ID of the button to hide.
 */
function makeScreenInvisible(screenID, buttonID) {
    const screenRef = document.getElementById(screenID);
    const buttonRef = document.getElementById(buttonID);
    screenRef.classList.remove("d-flex");
    screenRef.classList.add("d-none");
    buttonRef.classList.remove("d-flex");
    buttonRef.classList.add("d-none");
}

//#region Touch Controls
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
//#endregion

//#region Keyboard Controls
window.addEventListener("keydown", (event) => {
    switch (event.keyCode) {
        case 39:
            keyboard.RIGHT = true;
            break;
        case 37:
            keyboard.LEFT = true;
            break;
        case 40:
            keyboard.DOWN = true;
            break;
        case 38:
            keyboard.UP = true;
            break;
        case 32:
            keyboard.SPACE = true;
            break;
    }
});

window.addEventListener("keyup", (event) => {
    switch (event.keyCode) {
        case 39:
            keyboard.RIGHT = false;
            break;
        case 37:
            keyboard.LEFT = false;
            break;
        case 40:
            keyboard.DOWN = false;
            break;
        case 38:
            keyboard.UP = false;
            break;
        case 32:
            keyboard.SPACE = false;
            break;
    }
});
//#endregion

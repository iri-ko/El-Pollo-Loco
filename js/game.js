let canvas;
let world;
let keyboard = new Keyboard();

function startGame(screenID, buttonID) {

    resetGameState();
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);

    makeScreenInvisible(screenID, buttonID);
}

function resetGameState() {
    if (world) {
        world.gameOverFlag = false;
        world.showBossBar = false;

        // Reset player stats
        world.character.energy = 100;
        world.character.coinCounter = 0;
        world.character.bottleCounter = 0;

        // Reset enemy health
        world.level.enemies.forEach((enemy) => {
            if (enemy instanceof Endboss) {
                enemy.energy = 100;
            }
        });

    }
}






function makeScreenInvisible(screenID, buttonID){
    const screenRef = document.getElementById(`${screenID}`);
    const buttonRef = document.getElementById(`${buttonID}`);
    screenRef.classList.remove("d-flex");
    screenRef.classList.add("d-none")
    buttonRef.classList.remove("d-flex");
    buttonRef.classList.add("d-none")
}



window.addEventListener("keydown", (event) => {
    if (event.keyCode == 39){
        keyboard.RIGHT = true; 
    }

    if (event.keyCode == 37){
        keyboard.LEFT = true;
    }

    if (event.keyCode == 40){
        keyboard.DOWN = true;
    }

    if (event.keyCode == 38){
        keyboard.UP = true;  // 
    }

    if (event.keyCode == 32){
        keyboard.SPACE = true;
    }
});


window.addEventListener("keyup", (event) => {
    if (event.keyCode == 39){
        keyboard.RIGHT = false;
    }

    if (event.keyCode == 37){
        keyboard.LEFT = false;
    }

    if (event.keyCode == 40){
        keyboard.DOWN = false;
    }

    if (event.keyCode == 38){
        keyboard.UP = false;
    }

    if (event.keyCode == 32){
        keyboard.SPACE = false;
    }    
});
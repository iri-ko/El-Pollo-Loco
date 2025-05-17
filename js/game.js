let canvas;
let world;
let keyboard = new Keyboard();

function init(){
    canvas = document.getElementById('canvas'); //zugreifen auf Canvas
    world = new World(canvas, keyboard); //neues Object mit World wird kreeiert, Canvas wird mitgegeben.
}


window.addEventListener("keydown", (event) => {
    if (event.keyCode == 39){
        keyboard.RIGHT = true; // ✅ Correct — referencing the keyboard object
    }

    if (event.keyCode == 37){
        keyboard.LEFT = true;
    }

    if (event.keyCode == 40){
        keyboard.DOWN = true;
    }

    if (event.keyCode == 38){
        keyboard.UP = true;  // ✅ Fix typo (previously DOWN instead of UP)
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
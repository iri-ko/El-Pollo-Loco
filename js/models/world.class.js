class World {
    character = new Character();
    enemies = [new Chicken(), new Chicken(), new Chicken()];
    clouds = [new Cloud()];
    backgroundObjects = [
        new BackgroundObject("./assets/img/5_background/layers/air.png", 0, 0),
        new BackgroundObject(
            "./assets/img/5_background/layers/3_third_layer/1.png",
            0,
            0
        ),
        new BackgroundObject(
            "./assets/img/5_background/layers/2_second_layer/1.png",
            0,
            0
        ),
        new BackgroundObject(
            "./assets/img/5_background/layers/1_first_layer/1.png",
            0,
            0
        ),
    ];

    ctx;
    canvas;
    keyboard;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        setTimeout(() => this.draw(), 100);
        this.keyboard = keyboard;
        this.canvas = canvas;
        this.setWorld(keyboard);
    }

    setWorld() {
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.addObjectsToMap(this.backgroundObjects);

        this.addToMap(this.character);
        //zugriff auf Bild und Koordinaten vom Charakter)

        this.addObjectsToMap(this.enemies); //kreiert Wolken

        this.addObjectsToMap(this.clouds); //kreiert Wolken

        let self = this;
        //draw() wird immer wieder ausgeführt
        requestAnimationFrame(function () {
            self.draw(); //this geht hier nicht mehr -> deswegen oben self als this definiert und hier unten statt this verwendet
        });
    }

    addObjectsToMap(objects) {
        objects.forEach((o) => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    }
}

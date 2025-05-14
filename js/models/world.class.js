class World {
    character = new Character();
    enemies = [new Chicken(), new Chicken(), new Chicken()];
    clouds = [new Cloud()];
   backgroundObjects = [
    new BackgroundObject("./assets/img/5_background/layers/air.png", -720),
    new BackgroundObject("./assets/img/5_background/layers/3_third_layer/1.png", -720, 0),
    new BackgroundObject("./assets/img/5_background/layers/2_second_layer/1.png", -720, 0),
    new BackgroundObject("./assets/img/5_background/layers/1_first_layer/1.png", -720, 0),

    new BackgroundObject("./assets/img/5_background/layers/air.png", 0),
    new BackgroundObject("./assets/img/5_background/layers/3_third_layer/1.png", 0, 0),
    new BackgroundObject("./assets/img/5_background/layers/2_second_layer/1.png", 0, 0),
    new BackgroundObject("./assets/img/5_background/layers/1_first_layer/1.png", 0, 0),

    new BackgroundObject("./assets/img/5_background/layers/air.png", 719),
    new BackgroundObject("./assets/img/5_background/layers/3_third_layer/2.png", 719, 0),
    new BackgroundObject("./assets/img/5_background/layers/2_second_layer/2.png", 719, 0),
    new BackgroundObject("./assets/img/5_background/layers/1_first_layer/2.png", 719, 0),

    new BackgroundObject("./assets/img/5_background/layers/air.png", 719*2),
    new BackgroundObject("./assets/img/5_background/layers/3_third_layer/1.png", 719*2, 0),
    new BackgroundObject("./assets/img/5_background/layers/2_second_layer/1.png", 719*2, 0),
    new BackgroundObject("./assets/img/5_background/layers/1_first_layer/1.png", 719*2, 0),

    new BackgroundObject("./assets/img/5_background/layers/air.png", 719*3),
    new BackgroundObject("./assets/img/5_background/layers/3_third_layer/2.png", 719*3, 0),
    new BackgroundObject("./assets/img/5_background/layers/2_second_layer/2.png", 719*3, 0),
    new BackgroundObject("./assets/img/5_background/layers/1_first_layer/2.png", 719*3, 0),
];

//FIX ISSUE OF IMAGE STICHING


    ctx;
    canvas;
    keyboard;
    camera_x = 0;

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

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.backgroundObjects);

        this.addToMap(this.character);
        //zugriff auf Bild und Koordinaten vom Charakter)

        this.addObjectsToMap(this.enemies); //kreiert Wolken

        this.addObjectsToMap(this.clouds); //kreiert Wolken

        this.ctx.translate(-this.camera_x, 0);

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
        if (mo.otherDirection) {
            this.ctx.save(); //aktuelle Einstellungen speichern
            this.ctx.translate(mo.width, 0); //verändern vom eingefügten Bild
            this.ctx.scale(-1, 1); //spiegeln
            mo.x = mo.x * -1;
        }

        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);

        if (mo.otherDirection) {
            mo.x = mo.x * -1;
            this.ctx.restore(); // stellt ursprüngliche Einstellungen wieder her
        }
    }
}

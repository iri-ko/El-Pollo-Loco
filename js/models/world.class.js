class World {
    character = new Character();
    enemies = level1.enemies;
    clouds = level1.clouds;
    backgroundObjects = level1.backgroundObjects;

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

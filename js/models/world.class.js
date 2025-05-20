class World {
    character = new Character();
    level = level1;

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

        this.addObjectsToMap(this.level.salsaBottles);
        this.addObjectsToMap(this.level.coins);

        this.addObjectsToMap(this.level.backgroundObjects);

        //zugriff auf Bild und Koordinaten vom Charakter)

        this.addObjectsToMap(this.level.clouds); //kreiert Wolken

        this.addObjectsToMap(this.level.enemies); //kreiert Gegner

        this.addToMap(this.character);

        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        //draw() wird immer wieder ausgeführt
        requestAnimationFrame(function () {
            self.draw(); //this geht hier nicht mehr -> deswegen oben self als this definiert und hier unten statt this verwendet
        });
        this.checkCollisions();
    }


    //use for Collions
    checkCollisions(){
        setInterval(() => {
    this.level.enemies.forEach((enemy) => {
        if (this.character.isColling(enemy)) {
            let timeSinceLastHit = Date.now() - this.character.lastHit;
            
            if (timeSinceLastHit > 1000) { // **Only register hits every 1 second**
                console.log("Collision detected! Character takes damage.");
                this.character.hit();
            }
        }
    });
}, 200); // **Still checks often, but damage only happens once per second**

    }

    addObjectsToMap(objects) {
        objects.forEach((o) => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.drawObject(this.ctx);
        mo.drawFrame(this.ctx);
        mo.drawHitbox(this.ctx)

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save(); //aktuelle Einstellungen speichern
        this.ctx.translate(mo.width, 0); //verändern vom eingefügten Bild
        this.ctx.scale(-1, 1); //spiegeln
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore(); // stellt ursprüngliche Einstellungen wieder her
    }
}

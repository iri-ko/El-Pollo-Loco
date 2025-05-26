class World {
    //#region attributes
    character = new Character();
    level = level1;

    ctx;
    canvas;
    keyboard;
    camera_x = 0;

    healthBar = new HealthBar();
    bottleBar = new BottleBar();
    throwableObjects = [new ThrowableObject()];

    coinHit = false;

    //#endregion

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

        this.addObjectsToMap(this.level.backgroundObjects);

        this.addObjectsToMap(this.level.salsaBottles);
        this.addObjectsToMap(this.level.coins);

        //zugriff auf Bild und Koordinaten vom Charakter)

        this.addObjectsToMap(this.level.clouds); //kreiert Wolken

        this.addObjectsToMap(this.level.enemies); //kreiert Gegner

        this.addToMap(this.character);
        this.addObjectsToMap(this.throwableObjects);

        this.ctx.translate(-this.camera_x, 0);

        //space for fixed elements
        this.addToMap(this.healthBar);
        this.addToMap(this.bottleBar);

        let self = this;
        //draw() wird immer wieder ausgeführt
        requestAnimationFrame(function () {
            self.draw(); //this geht hier nicht mehr -> deswegen oben self als this definiert und hier unten statt this verwendet
        });
        this.checkCollisions();
    }

    //use for Collions
    checkCollisions() {
        setInterval(() => {
            //check enemy
            this.level.enemies.forEach((enemy) => {
                if (
                    this.character.isColliding(enemy) &&
                    !this.character.jumpKill(enemy)
                ) {
                    let timeSinceLastHit = Date.now() - this.character.lastHit;

                    if (timeSinceLastHit > 1000) {
                        console.log(
                            "Collision detected! Character takes damage."
                        );
                        this.character.hit();
                        this.healthBar.setPercentage(this.character.energy);
                    }
                }
            });

            //check coin collision
            this.level.coins.forEach((coin, index) => {
                if (this.character.isColliding(coin)) {
                    this.character.coinCounter++;
                    this.level.coins.splice(index, 1); //removes coin
                    console.log("coins:" + this.character.coinCounter);
                }
            });

            this.level.salsaBottles.forEach((bottle, index) => {
                if (this.character.isColliding(bottle)) {
                    this.character.bottleCounter++;
                    this.level.salsaBottles.splice(index, 1); //removes coin
                    let newPercentage = Math.min(
                        (this.character.bottleCounter / 5) * 100 // Adjust scaling as needed
                    );

                    this.bottleBar.setPercentage(newPercentage);
                }
            });

            this.level.enemies.forEach((enemy, index) => {
                if (
                    enemy instanceof Chicken &&
                    this.character.jumpKill(enemy)
                ) {
                    console.log("Jump kill successful! Removing chicken...");
                    enemy.die(); // Trigger death animation
                    this.character.speedY = 10; // Bounce effect after jumping on the chicken
                    this.level.enemies.splice(index, 1); // Remove chicken from the game
                } else if (this.character.isColliding(enemy)) {
                    let timeSinceLastHit = Date.now() - this.character.lastHit;
                    if (timeSinceLastHit > 1000) {
                        this.character.hit();
                        this.healthBar.setPercentage(this.character.energy);
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
        mo.drawHitbox(this.ctx);

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

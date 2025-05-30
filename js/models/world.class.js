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
    bossBar = new BossBar();
    coinBar = new CoinBar();
    throwableObjects = [];

    throwFlag = false;
    bottleFlag = false;
    bossFlag = false;
    enemyFlag = false;
    gameOverFlag = false;
    winFlag = false;

    showBossBar = false;


    //#endregion

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        setTimeout(() => this.draw(), 100);
        this.keyboard = keyboard;
        this.canvas = canvas;
        this.setWorld(keyboard);
        this.level.enemies.forEach((enemy) => {
            if (enemy instanceof Endboss) {
                enemy.world = this;
            }
        });
    }

    setWorld() {
        this.character.world = this;
    }

    

    //#region Draw methods
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.addLevelOptics();
        this.requestAnimation();
        this.addChecks();
    }

    requestAnimation() {
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addChecks() {
        IntervalHub.startInterval(this.checkCollisions, 200, "worldCollisioncheck");
        this.checkThrowObjects();
    }

    addLevelOptics() {
        this.ctx.translate(this.camera_x, 0);
        this.addEnvironment();
        this.addDynamicObjects();
        this.ctx.translate(-this.camera_x, 0);
        this.addStatusBars();
    }

    addEnvironment() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.salsaBottles);
        this.addObjectsToMap(this.level.coins);
    }

    addDynamicObjects() {
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.character);
        this.addObjectsToMap(this.throwableObjects);
    }

    addStatusBars() {
        this.addToMap(this.healthBar);
        this.addToMap(this.bottleBar);
        this.addToMap(this.coinBar);
        if (this.showBossBar) {
            this.addToMap(this.bossBar); // Show boss health bar when active
        }
    }
    //#endregion

    //#region checkCollisions
    checkCollisions = () => {
        this.checkCharacterEnemyCollision();
        this.checkCharacterCoinCollision();
        this.checkCharacterSalsaCollision();
        this.checkJumpKill();
        this.checkThrowCollision();
        this.isApproachingBoss();
    };

    checkCharacterEnemyCollision() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                if (!this.character.jumpKill(enemy)) {
                    let timeSinceLastHit = Date.now() - this.character.lastHit;

                    if (timeSinceLastHit > 1000) {
                        this.character.hit();
                        this.healthBar.setPercentage(this.character.energy);

                        if (this.character.isDead() && !this.gameOverFlag) {
                            // **Trigger game over**
                            this.gameOverFlag = true;

                            this.gameOver();
                        }
                    }
                }
            }
        });
    }

gameOver() {
    IntervalHub.stopAllIntervals();
    let gameoverScreen = document.getElementById("gameover");
    let tryAgainButton = document.getElementById("try-again");

    gameoverScreen.classList.remove("d-none");
    gameoverScreen.classList.add("d-flex")
    tryAgainButton.classList.remove("d-none"); // **Ensure button is visible**
    tryAgainButton.style.display = "block"; // **Guarantees it appears**
}


    checkCharacterCoinCollision() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                AudioHub.playOne(AudioHub.coinCollect);
                this.character.coinCounter++;
                this.level.coins.splice(index, 1); //removes coin

                let newPercentage = Math.min(
                    (this.character.coinCounter / 5) * 100 // adjust scaling as needed
                );

                this.coinBar.setPercentage(newPercentage);
            }
        });
    }

    checkCharacterSalsaCollision() {
        this.level.salsaBottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                AudioHub.playOne(AudioHub.bottleCollect);
                this.character.bottleCounter++;
                this.level.salsaBottles.splice(index, 1); 
                let newPercentage = Math.min(
                    (this.character.bottleCounter / 5) * 100 
                );

                this.bottleBar.setPercentage(newPercentage);
            }
        });
    }

    checkJumpKill() {
        this.level.enemies.forEach((enemy, index) => {
            if (
                (enemy instanceof Chicken || enemy instanceof BabyChick) &&
                this.character.jumpKill(enemy)
            ) {
                AudioHub.playOne(AudioHub.jumpKill);
                enemy.die(); // Trigger death animation
                this.character.speedY = 10; // makes jump bouncy :D
                this.level.enemies.splice(index, 1); // Remove chicken from the game
            } else if (this.character.isColliding(enemy)) {
                let timeSinceLastHit = Date.now() - this.character.lastHit;
                if (timeSinceLastHit > 1000) {
                    this.character.hit();
                    this.healthBar.setPercentage(this.character.energy);
                }
            }
        });
    }

    checkThrowCollision() {
    this.throwableObjects.forEach((bottle) => {
        this.level.enemies.forEach((enemy) => {
            if (
                (enemy instanceof Chicken || enemy instanceof BabyChick) &&
                bottle.isColliding(enemy) &&
                !this.enemyFlag
            ) {
                AudioHub.playOne(AudioHub.bottleSplash);
                this.enemyHit(enemy, bottle);
                this.handleEnemyFlag();
            } else if (
                enemy instanceof Endboss &&
                bottle.isColliding(enemy) &&
                !this.bossFlag
            ) {
                AudioHub.playOne(AudioHub.bottleSplash);
                this.bossHit(enemy, bottle);
                this.handleBossFlag();

                if (enemy.energy <= 0 && !this.winFlag) {
                    this.winGame();
                } 
            }
        });
    });
}


    winGame() {
    IntervalHub.stopAllIntervals();


    document.getElementById("win").classList.remove("d-none"); // Show win screen
    document.getElementById("win").classList.add("d-flex");
    document.getElementById("play-again").classList.remove("d-none"); // Show button
    document.getElementById("play-again").style.display = "block"; // Ensure visibility
}


    enemyHit(enemy, bottle) {
        enemy.die();
        bottle.splash();
    }

    bossHit(enemy, bottle) {
        enemy.hit();
        this.bossBar.setPercentage(enemy.energy);
        bottle.splash();
    }

    handleEnemyFlag() {
        this.enemyFlag = true;
        setTimeout(() => {
            this.enemyFlag = false;
        }, 1000);
    }

    handleBossFlag() {
        this.bossFlag = true;

        setTimeout(() => {
            this.bossFlag = false;
        }, 1000);
    }

    isApproachingBoss() {
        if (this.character.x >= 1500) {
            this.showBossBar = true; // show boss bar when character reaches x = 1500
            this.character.bottleCounter += 12;
        }
    }

    //#endregion

    //#region checkThrowObjects
    checkThrowObjects() {
        if (
            this.keyboard.DOWN &&
            !this.throwFlag &&
            this.character.bottleCounter >= 1
        ) {
            let bottle = new ThrowableObject(
                this.character.x + this.character.width / 2,
                this.character.y + this.character.height / 2,
                this.character,
                this
            );

            this.throwableObjects.push(bottle);

            this.character.bottleCounter -= 1;

            this.handleThrowFlag();
        }
    }

    handleThrowFlag() {
        this.throwFlag = true;

        setTimeout(() => {
            this.throwFlag = false;
        }, 500);
    }
    //#endregion

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
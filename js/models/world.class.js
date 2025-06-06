/**
 * creates new world.
 * @class
 */
class World {
    //#region Attributes

    /**
     * The main playable character in the game.
     * @type {Character}
     */
    character = new Character();

    /**
     * Determines whether the game is running.
     * @type {boolean}
     */
    isRunning = true;

    /**
     * The current level containing enemies, collectibles, and background objects.
     * @type {Level}
     */
    level = new Level();

    /**
     * The rendering context for the game canvas.
     * @type {CanvasRenderingContext2D}
     */
    ctx;

    /**
     * The game canvas element.
     * @type {HTMLCanvasElement}
     */
    canvas;

    /**
     * The keyboard input manager for tracking player actions.
     * @type {Keyboard}
     */
    keyboard;

    /**
     * Camera position for tracking the character's movement.
     * @type {number}
     */
    camera_x = 0;

    /**
     * The player's health status bar.
     * @type {HealthBar}
     */
    healthBar = new HealthBar();

    /**
     * The player's bottle collection status bar.
     * @type {BottleBar}
     */
    bottleBar = new BottleBar();

    /**
     * The boss health status bar.
     * @type {BossBar}
     */
    bossBar = new BossBar();

    /**
     * The player's coin collection status bar.
     * @type {CoinBar}
     */
    coinBar = new CoinBar();

    /**
     * Array containing all throwable objects in the game.
     * @type {ThrowableObject[]}
     */
    throwableObjects = [];

    /**
     * Flags managing various game events.
     * @type {boolean}
     */
    throwFlag = false;
    bottleFlag = false;
    bossFlag = false;
    enemyFlag = false;
    gameOverFlag = false;
    winFlag = false;

    /**
     * Determines whether to display the boss health bar.
     * @type {boolean}
     */
    showBossBar = false;

    //#endregion

    /**
     * Creates a new game world and initializes rendering.
     *
     * @param {HTMLCanvasElement} canvas - The game canvas.
     * @param {Keyboard} keyboard - The keyboard input manager.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        setTimeout(() => this.draw(), 100);
        this.keyboard = keyboard;
        this.canvas = canvas;
        this.setWorld();
        this.level.enemies.forEach((enemy) => {
            if (enemy instanceof Endboss) {
                enemy.world = this;
            }
        });
    }

    /**
     * Assigns the current world instance to the character.
     */
    setWorld() {
        this.character.world = this;
    }

    //#region Drawing Methods

    /**
     * Continuously renders the game world.
     */
    draw() {
        if (!this.isRunning) return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.addLevelOptics();
        requestAnimationFrame(() => this.draw());
        this.addChecks();
    }

    /**
     * Adds periodic game checks for collisions and object interactions.
     */
    addChecks() {
        IntervalHub.startInterval(this.checkCollisions, 200);
        this.checkThrowObjects();
    }

    /**
     * Handles rendering of all level objects.
     */
    addLevelOptics() {
        this.ctx.translate(this.camera_x, 0);
        this.addEnvironment();
        this.addDynamicObjects();
        this.ctx.translate(-this.camera_x, 0);
        this.addStatusBars();
    }

    /**
     * Adds background and collectible objects to the scene.
     */
    addEnvironment() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.salsaBottles);
        this.addObjectsToMap(this.level.coins);
    }

    /**
     * Adds enemies and interactive objects to the scene.
     */
    addDynamicObjects() {
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.character);
        this.addObjectsToMap(this.throwableObjects);
    }

    /**
     * Adds UI status bars to the scene.
     */
    addStatusBars() {
        this.addToMap(this.healthBar);
        this.addToMap(this.bottleBar);
        this.addToMap(this.coinBar);
        if (this.showBossBar) {
            this.addToMap(this.bossBar);
        }
    }

    //#endregion

    //#region checkCollisions
    //#region Collision Checks

    /**
     * Performs all necessary collision checks, ensuring interactions with enemies, collectibles, and projectiles.
     */
    checkCollisions = () => {
        this.checkCharacterEnemyCollision();
        this.checkCharacterCoinCollision();
        this.checkCharacterSalsaCollision();
        this.checkJumpKill();
        this.checkThrowCollision();
        this.isApproachingBoss();
    };

    /**
     * Detects collisions between the character and enemies.
     * If an enemy is hit without being jump-killed, damage is applied.
     */
    checkCharacterEnemyCollision() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                if (!this.character.jumpKill(enemy)) {
                    let timeSinceLastHit = Date.now() - this.character.lastHit;
                    if (timeSinceLastHit > 1000) {
                        this.character.hit();
                        AudioHub.playOne(AudioHub.characterHurt);
                        this.healthBar.setPercentage(this.character.energy);
                        if (this.character.isDead() && !this.gameOverFlag) {
                            this.gameOverFlag = true;
                            setTimeout(() => this.gameOver(), 1000);
                        }
                    }
                }
            }
        });
    }

    /**
     * Triggers the game-over sequence when the character dies.
     * Stops all intervals and displays the game-over screen.
     */
    gameOver() {
        AudioHub.stopAll();
        this.isRunning = false;
        IntervalHub.stopAllIntervals();

        let gameoverScreen = document.getElementById("gameover");
        let tryAgainButton = document.getElementById("try-again");

        gameoverScreen.classList.remove("d-none");
        gameoverScreen.classList.add("d-flex");
        tryAgainButton.classList.remove("d-none");
        tryAgainButton.style.display = "block";

        setTimeout(() => AudioHub.playOne(AudioHub.characterDead), 500);
    }

    /**
     * Detects collisions between the character and coins.
     * Updates the player's coin counter and removes collected coins.
     */
    checkCharacterCoinCollision() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                AudioHub.playOne(AudioHub.coinCollect);
                this.character.coinCounter++;
                this.level.coins.splice(index, 1);

                let newPercentage = Math.min(
                    (this.character.coinCounter / 5) * 100
                );
                this.coinBar.setPercentage(newPercentage);
            }
        });
    }

    /**
     * Detects collisions between the character and salsa bottles.
     * Updates the player's bottle counter and removes collected bottles.
     */
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
F
    /**
     * Detects collisions where the character jump-kills an enemy.
     * Removes defeated enemies from the level.
     */
    checkJumpKill() {
        this.level.enemies.forEach((enemy, index) => {
            if (
                (enemy instanceof Chicken || enemy instanceof BabyChick) &&
                this.character.jumpKill(enemy)
            ) {
                AudioHub.playOne(AudioHub.jumpKill);
                enemy.die();
                this.character.speedY = 10;
                this.level.enemies.splice(index, 1);
            } else if (this.character.isColliding(enemy)) {
                let timeSinceLastHit = Date.now() - this.character.lastHit;
                if (timeSinceLastHit > 1000) {
                    this.character.hit();
                    this.healthBar.setPercentage(this.character.energy);
                }
            }
        });
    }

    /**
     * Detects collisions where thrown bottles hit enemies.
     * Applies damage to enemies and handles win conditions if the boss is defeated.
     */
    checkThrowCollision() {
        this.throwableObjects.forEach((bottle) => {
            this.level.enemies.forEach((enemy) => {
                if (this.throwBottleHitsChicken(enemy, bottle)) {
                    AudioHub.playOne(AudioHub.bottleSplash);
                    this.enemyHit(enemy, bottle);
                    this.handleEnemyFlag();
                } else if (this.throwBottleHitsEndboss(enemy, bottle)) {
                    this.playSoundOfBottleHittingEnemy();
                    this.bossHit(enemy, bottle);
                    this.handleBossFlag();
                    this.handleWinFlag(enemy);
                }
            });
        });
    }

    /**
     * Condition for if a bottle hits a small enemy
     */
    throwBottleHitsChicken(enemy, bottle) {
        return (
            (enemy instanceof Chicken || enemy instanceof BabyChick) &&
            bottle.isColliding(enemy) &&
            !this.enemyFlag
        );
    }

    /**
     * Condition for if a bottle hits the endboss
     */
    throwBottleHitsEndboss(enemy, bottle) {
        return (
            enemy instanceof Endboss &&
            bottle.isColliding(enemy) &&
            !this.bossFlag
        );
    }

    playSoundOfBottleHittingEnemy() {
        AudioHub.playOne(AudioHub.bottleSplash);
        AudioHub.playOne(AudioHub.angryChicken);
    }

    handleWinFlag(enemy) {
        if (enemy.energy <= 0 && !this.winFlag) {
            setTimeout(() => this.winGame(), 500);
        }
    }

    /**
     * Triggers the win sequence when the boss is defeated.
     * Stops all intervals and displays the win screen.
     */
    winGame() {
        AudioHub.stopAll();
        this.isRunning = false;
        IntervalHub.stopAllIntervals();

        document.getElementById("win").classList.remove("d-none");
        document.getElementById("win").classList.add("d-flex");
        document.getElementById("play-again").classList.remove("d-none");
        document.getElementById("play-again").style.display = "block";

        setTimeout(() => AudioHub.playOne(AudioHub.win), 500);
    }

    /**
     * Handles enemy hit events, making them disappear upon collision with a thrown bottle.
     * @param {MovableObject} enemy - The enemy being hit.
     * @param {ThrowableObject} bottle - The thrown bottle.
     */
    enemyHit(enemy, bottle) {
        enemy.die();
        bottle.splash();
    }

    /**
     * Handles boss hit events, reducing its energy upon collision with a thrown bottle.
     * @param {Endboss} enemy - The boss being hit.
     * @param {ThrowableObject} bottle - The thrown bottle.
     */
    bossHit(enemy, bottle) {
        enemy.hit();
        this.bossBar.setPercentage(enemy.energy);
        bottle.splash();
    }

    /**
     * Temporarily activates the enemy flag to prevent repeated bottle collisions.
     */
    handleEnemyFlag() {
        this.enemyFlag = true;
        setTimeout(() => (this.enemyFlag = false), 1000);
    }

    /**
     * Temporarily activates the boss flag to prevent repeated bottle collisions.
     */
    handleBossFlag() {
        this.bossFlag = true;
        setTimeout(() => (this.bossFlag = false), 1000);
    }

    /**
     * Shows the boss health bar when the player approaches the boss.
     * Grants additional bottles for the encounter.
     */
    isApproachingBoss() {
        if (this.character.x >= 1500) {
            this.showBossBar = true;
            this.character.bottleCounter += 12;
        }
    }

    //#endregion

    //#region checkThrowObjects
    /**
     * Checks if the player is attempting to throw a bottle.
     * If the down key is pressed, a bottle is spawned, and the throw flag is set.
     */
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

    /**
     * Temporarily activates the throw flag to prevent rapid consecutive throws.
     * Automatically resets after 500 milliseconds.
     */
    handleThrowFlag() {
        this.throwFlag = true;

        setTimeout(() => {
            this.throwFlag = false;
        }, 500);
    }

    //#endregion

    /**
     * Adds an array of drawable objects to the game map.
     * Iterates through each object and renders it.
     *
     * @param {DrawableObject[]} objects - Array of objects to render.
     */
    addObjectsToMap(objects) {
        objects.forEach((o) => {
            this.addToMap(o);
        });
    }

    /**
     * Renders a single drawable object to the game map.
     * Flips the object if facing another direction.
     *
     * @param {DrawableObject} mo - The object to render.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        mo.drawHitbox(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * Flips the object horizontally for left-facing movement.
     * Saves the current canvas state, translates the object, and scales it negatively.
     *
     * @param {DrawableObject} mo - The object to flip.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = -mo.x;
    }

    /**
     * Restores the object orientation after flipping.
     * Restores the saved canvas state and resets position.
     *
     * @param {DrawableObject} mo - The object to restore.
     */
    flipImageBack(mo) {
        mo.x = -mo.x;
        this.ctx.restore();
    }
}

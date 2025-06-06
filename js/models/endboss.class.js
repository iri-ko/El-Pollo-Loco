/**
 * creates new boss
 * @class
 */
class Endboss extends MovableObject {
    //#region Attributes

    /**
     * health of Endboss.
     * @type {number}
     */
    energy = 100;

    /**
     * horizontal position of Endboss.
     * @type {number}
     */
    x = 2100;

    /**
     * vertical position of Endboss.
     * @type {number}
     */
    y = 60;

    /**
     * height of Endboss sprite.
     * @type {number}
     */
    height = 400;

    /**
     * width of Endboss sprite.
     * @type {number}
     */
    width = 500;

    /**
     * Movement speed of Endboss.
     * @type {number}
     */
    speed = 25;

    /**
     * Hitbox (offset) values
     * @type {Object}
     * @property {number} top - Top offset.
     * @property {number} bottom - Bottom offset.
     * @property {number} left - Left offset.
     * @property {number} right - Right offset.
     */
    offset = { top: 80, bottom: 30, left: 50, right: 50 };

    /**
     * Flag to track whether Endboss has jumped forward.
     * @type {boolean}
     */
    forwardFlag = false;

    //#endregion

    /**
     * Creates Endboss instance and initializes animations.
     */
    constructor() {
        super();
        this.loadImagesEndboss();
        IntervalHub.startInterval(this.animateEndboss, 100, "bossanima");
    }

    /**
     * Loads all Endboss images including animations.
     */
    loadImagesEndboss() {
        this.loadImages(ImageHub.endboss.alert);
        this.loadImages(ImageHub.endboss.hurt);
        this.loadImages(ImageHub.endboss.dead);
        this.loadImages(ImageHub.endboss.attack);
        this.loadImages(ImageHub.endboss.walk);
    }

    //#region Animations

    /**
     * Determines Endboss behavior based on player's position and health.
     */
    animateEndboss = () => {
        if (!this.world || !this.world.character) return; // Prevent errors before world exists
        let distance = Math.abs(this.world.character.x - this.x);
        if (this.energy <= 0) {
            this.playAnimation(ImageHub.endboss.dead);
        } else if (this.isHurt()) {
            this.playAnimation(ImageHub.endboss.hurt);
        } else if (distance <= 150) {
            this.playAnimation(ImageHub.endboss.attack);
            this.jumpForward();
        } else if (distance <= 600) {
            this.playAnimation(ImageHub.endboss.walk);
            this.x -= this.speed;
        } else {
            this.playAnimation(ImageHub.endboss.alert);
        }
    };

    /**
     * Makes Endboss jump forward once, modifying its position.
     */
    jumpForward() {
    if (!this.forwardFlag) {
        this.y -= 30; 
        this.x -= 30; 
        this.forwardFlag = true;

        setTimeout(() => {
            this.y += 30;  
            this.forwardFlag = false; 
        }, 300);
    }
}


    //#endregion
}

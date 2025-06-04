/**
 * creates a new Chicken
 * @class
 */
class Chicken extends MovableObject {
    
    //#region Attributes

    /**
     * horizontal position of Chicken, randomized within a range.
     * @type {number}
     */
    x = 550 + Math.random() * 700;

    /**
     * The vertical position of the Chicken.
     * @type {number}
     */
    y = 360;

    /**
     * The height of the Chicken sprite.
     * @type {number}
     */
    height = 80;

    /**
     * The width of the Chicken sprite.
     * @type {number}
     */
    width = 70;

    /**
     * Movement speed of the Chicken, randomized within a range.
     * @type {number}
     */
    speed = 0.35 + Math.random() * 0.25;

    /**
     * Hitbox values (offset)
     * @type {Object}
     * @property {number} top - Top offset.
     * @property {number} bottom - Bottom offset.
     * @property {number} left - Left offset.
     * @property {number} right - Right offset.
     */
    offset = { top: 4, bottom: 4, left: 4, right: 4 };

    //#endregion

    /**
     * Creates Chicken instance and initializes animations.
     */
    constructor() {
        super();
        this.loadImages(ImageHub.chicken.walk);
        this.animate();
    }

    /**
     * Starts animation loops for Chicken's movement and sprite changes.
     */
    animate() {
        IntervalHub.startInterval(this.animateChicken, 80, "chickenAnimate");
        IntervalHub.startInterval(this.moveLeft, 17, "chickenMoveLeft");
    }

    /**
     * Plays walking animation for Chicken.
     */
    animateChicken = () => {
        this.playAnimation(ImageHub.chicken.walk);
    };

    /**
     * Handles death behavior of Chicken.
     * Changes sprite moves the object off-view
     */
    die() {
        this.loadImage("assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png"); 
        setTimeout(() => {
            this.x = -9999;
        }, 500);
    }
}

/**
 * creates new BabyChick
 * @class
 */
class BabyChick extends MovableObject {
    /**
     * The horizontal position of the BabyChick.
     * @type {number}
     */
    x = 750 + Math.random() * 700;

    /**
     * The vertical position of the BabyChick.
     * @type {number}
     */
    y = 390;

    /**
     * The height of the BabyChick sprite.
     * @type {number}
     */
    height = 50;

    /**
     * The width of the BabyChick sprite.
     * @type {number}
     */
    width = 50;

    /**
     * Movement speed of the BabyChick.
     * @type {number}
     */
    speed = 0.35 + Math.random() * 3;

    /**
     * Offset values used for collision detection.
     * @type {Object}
     * @property {number} top - Top offset.
     * @property {number} bottom - Bottom offset.
     * @property {number} left - Left offset.
     * @property {number} right - Right offset.
     */
    offset = { top: 8, bottom: 8, left: 8, right: 8 };

    /**
     * Creates a BabyChick instance and initializes its behavior.
     */
    constructor() {
        super();
        this.loadImages(ImageHub.babyChick.walk);
        this.animate();
    }

    /**
     * Starts animation loops for the BabyChick.
     * Moves the chick to the left and plays the walking animation.
     */
    animate = () => {
        IntervalHub.startInterval(this.animateBabyChick, 80, "animateBabyChicken");
        IntervalHub.startInterval(this.moveLeft, 17, "babyChickenMoveleft");
    };

    /**
     * Plays walking animation for the BabyChick.
     */
    animateBabyChick = () => {
        this.playAnimation(ImageHub.babyChick.walk);
    };

    /**
     * Handles the death behavior of the BabyChick.
     * Changes sprite to "dead" and moves the object off-screen.
     */
    die() {
        this.loadImage(
            "assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png"
        );
        setTimeout(() => {
            this.x = -9999;
        }, 500);
    }
}

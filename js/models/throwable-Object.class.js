/**
 * creates new throwable Salsa Bottle
 * @class
 */
class ThrowableObject extends MovableObject {
    /**
     * The height of the throwable object.
     * @type {number}
     */
    height = 60;

    /**
     * The width of the throwable object.
     * @type {number}
     */
    width = 60;

    /**
     * Offset values for collision detection.
     * @type {Object}
     * @property {number} top - Top offset.
     * @property {number} bottom - Bottom offset.
     * @property {number} left - Left offset.
     * @property {number} right - Right offset.
     */
    offset = { top: 8, bottom: 8, left: 8, right: 8 };

    /**
     * The initial vertical speed when thrown.
     * @type {number}
     */
    speedY = 25;

    /**
     * The horizontal speed when thrown.
     * Assigned dynamically based on the player's facing direction.
     * @type {number}
     */
    speedX;

    /**
     * Creates a ThrowableObject instance.
     * Loads the throwable object image and initializes its animation.
     * 
     * @param {number} x - The initial horizontal position.
     * @param {number} y - The initial vertical position.
     * @param {Character} character - Reference to the player character.
     * @param {Object} world - Reference to the game world.
     */
    constructor(x, y, character, world) {
        super();
        this.loadImage("assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png");
        this.character = character;
        this.world = world;
        this.x = x;
        this.y = y;
        this.loadImagesBottle();
        IntervalHub.startInterval(this.animateThrowBottle, 60, "throwAnima");
        this.throw();
    }

    /**
     * Loads all throwable object images for animation effects.
     */
    loadImagesBottle() {
        this.loadImages(ImageHub.bottle.spin);
        this.loadImages(ImageHub.bottle.splash);
    }

    /**
     * Executes the throwing action.
     * Assigns horizontal speed based on the player's direction.
     * Starts gravity and movement intervals.
     */
    throw() {
        this.speedX = this.character.isFacingRight ? 15 : -15;
        IntervalHub.startInterval(this.applyGravity, 25, "throwGravi");
        IntervalHub.startInterval(this.moveX, 25, "throwMovex");
        AudioHub.playOne(AudioHub.bottleSpin);
    }

    /**
     * Moves the throwable object horizontally over time, reducing speed slightly.
     */
    moveX = () => {
        this.x += this.speedX;
        this.speedX *= 0.98;
    };

    /**
     * Handles splash animation when the throwable object collides with the ground.
     * Removes the object from the game world after animation completes.
     */
    splash() {
        this.isSplashing = true;
        this.playAnimation(ImageHub.bottle.splash);
        this.speedY = 0;

        setTimeout(() => {
            let index = this.world.throwableObjects.indexOf(this);
            if (index > -1) {
                this.world.throwableObjects.splice(index, 1);
            }
        }, ImageHub.bottle.splash.length * 100);
    }

    /**
     * Animates the throwable object based on its current state.
     */
    animateThrowBottle = () => {
        if (this.isSplashing) {
            this.playAnimation(ImageHub.bottle.splash);
        } else {
            this.playAnimation(ImageHub.bottle.spin);
        }
    };
}

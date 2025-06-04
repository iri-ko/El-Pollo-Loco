/**
 * Represents a movable object in the game.
 * @class
 */
class MovableObject extends DrawableObject {
    //#region Attributes

    /**
     * The movement speed of object.
     * @type {number}
     */
    speed = 0.15;

    /**
     * Indicates whether the object is facing the opposite direction.
     * @type {boolean}
     */
    otherDirection = false;

    /**
     * The vertical speed of the object.
     * @type {number}
     */
    speedY = 0;

    /**
     * Offset values for collision detection (to be defined in subclasses).
     * @type {Object}
     */
    offset;

    /**
     * Timestamp of the last hit taken.
     * @type {number}
     */
    lastHit = 0;

    /**
     * The acceleration factor influencing gravity.
     * @type {number}
     */
    acceleration = 2;

    //#endregion

    /**
     * Creates a MovableObject instance.
     */
    constructor() {
        super();
    }

    /**
     * Applies gravity to the object.
     * Decreases speedY over time, making the object fall naturally.
     */
    applyGravity = () => {
        if (this.isAboveGround() || this.speedY > 0) {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
        } else {
            this.speedY = 0;
        }
    };

    //#region Conditions

    /**
     * Checks whether the object is above the ground.
     * ThrowableObjects always return `true` to allow bottle physics.
     * Other objects must be below a certain threshold.
     * @returns {boolean} True if the object is above the ground.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true; // Allows bottle physics
        } else {
            return this.y < 190;
        }
    }

    /**
     * Detects collision between this object and another movable object.
     * @param {MovableObject} mo - The other object to check for collision.
     * @returns {boolean} True if collision occurs.
     */
    isColliding(mo) {
        return (
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top
        );
    }

    /**
     * Detects if the object performs a jump kill on a chicken.
     * @param {Chicken} chicken - The chicken object to check against.
     * @returns {boolean} True if the object successfully jump-kills the chicken.
     */
    jumpKill(chicken) {
        return (
            this.speedY < 0 &&
            this.y + this.height - this.offset.bottom >= chicken.y + chicken.offset.top &&
            this.y + this.height - this.offset.bottom < chicken.y + chicken.height + 10 &&
            this.x + this.offset.left < chicken.x + chicken.width - chicken.offset.right &&
            this.x + this.width - this.offset.right > chicken.x + chicken.offset.left
        );
    }

    /**
     * Handles when the object takes damage.
     * Reduces energy and updates last hit timestamp.
     */
    hit() {
        this.energy -= 20;
        this.lastHit = Date.now();

        if (this.energy <= 0) {
            this.energy = 0;
        } else {
            this.currentImage = 0;
        }
    }

    //#endregion

    //#region Hurt & Death

    /**
     * Checks whether the object is in a hurt state.
     * @returns {boolean} True if the object is hurt.
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        return timePassed < 250;
    }

    /**
     * Checks whether the object is dead.
     * @returns {boolean} True if the object's energy reaches zero.
     */
    isDead() {
        let timePassed = new Date().getTime() - this.lastHit;
        return this.energy === 0 && timePassed < 1000;
    }

    //#endregion

    //#region Movement & Walking

    /**
     * Moves the object to the right.
     */
    walkRight() {
        this.x += 10;
        this.otherDirection = false;
    }

    /**
     * Moves the object to the left.
     */
    walkLeft() {
        this.x -= 10;
        this.otherDirection = true;
    }

    /**
     * Moves the object continuously to the left.
     */
    moveLeft = () => {
        this.x -= this.speed;
    };

    /**
     * Moves the object continuously to the right.
     */
    moveRight = () => {
        this.x += this.speed;
    };

    //#endregion

    /**
     * Makes the object jump upwards.
     */
    jump() {
        this.speedY = 30;
    }

    /**
     * Plays an animation by cycling through a series of images.
     * @param {string[]} images - Array of image file paths for animation frames.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}

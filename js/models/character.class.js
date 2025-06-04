/**
 * Creates new character
 * @class
 */
class Character extends MovableObject {
    //#region Attributes

    /**
     * connects character to world
     * @type {Object}
     */
    world;

    /**
     * Index of current displayed image
     * @type {number}
     */
    currentImage = 0;

    /**
     * vertical position of character.
     * @type {number}
     */
    y = 200;

    /**
     * Hitbox values
     * @type {Object}
     * @property {number} top - Top offset.
     * @property {number} bottom - Bottom offset.
     * @property {number} left - Left offset.
     * @property {number} right - Right offset.
     */
    offset = { top: 130, bottom: 30, left: 50, right: 50 };

    /**
     * acceleration factor of the character. Needed for jump and gravity.
     * @type {number}
     */
    acceleration = 2;

    /**
     * character's energy level.
     * @type {number}
     */
    energy = 100;

    /**
     * number of coins collected.
     * @type {number}
     */
    coinCounter = 0;

    /**
     * number of bottles collected.
     * @type {number}
     */
    bottleCounter = 0;

    /**
     * Determines whether the character is facing right.
     * @type {boolean}
     */
    isFacingRight = true;

    //#endregion

    /**
     * Creates new character instance and initializes animations.
     */
    constructor() {
        super();
        this.loadAllCharacterImages();
        this.animate();
        this.lastActivityTime = Date.now();
        IntervalHub.startInterval(this.applyGravity, 40, "characterApplyGrav");
    }

    /**
     * Loads all character images including animations.
     */
    loadAllCharacterImages() {
        this.loadImage("assets/img/2_character_pepe/2_walk/W-21.png");
        this.loadImages(ImageHub.character.walk);
        this.loadImages(ImageHub.character.idle);
        this.loadImages(ImageHub.character.idleLong);
        this.loadImages(ImageHub.character.jump);
        this.loadImages(ImageHub.character.dead);
        this.loadImages(ImageHub.character.hurt);
    }

    /**
     * Starts animation intervals for movement and actions.
     */
    animate() {
        IntervalHub.startInterval(this.checkDirection, 16, "characterCheckDirection");
        IntervalHub.startInterval(this.handleMovementAnimation, 200, "characHandleMove");
    }

    //#region checkdirection

    /**
     * Checks direction of movement and updates accordingly.
     */
    checkDirection = () => {
        if (this.isHurt()) return;
        this.handleMovement();
        this.handleAnimation();
        this.updateCamera();
    };

    /**
     * Handles movement logic based on keyboard inputs.
     */
    handleMovement = () => {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.walkRight();
            this.isFacingRight = true;
        } else if (this.world.keyboard.LEFT && this.x > 0) {
            this.walkLeft();
            this.isFacingRight = false;
        }
    };

    /**
     * Plays walking animation when moving on ground.
     */
    handleAnimation = () => {
        if ((this.world.keyboard.RIGHT || this.world.keyboard.LEFT) && !this.isAboveGround()) {
            this.playAnimation(ImageHub.character.walk);
        }
    };

    /**
     * Updates camera position based on character movement.
     */
    updateCamera = () => {
        this.world.camera_x = -this.x + 100;
    };

    //#endregion


    //#region Movement Animations

    /**
     * Handles animations for movement, idle, and jumping.
     */
    handleMovementAnimation = () => {
        if (this.isHurt()) {
            this.playAnimation(ImageHub.character.hurt);
        } else if ((this.world.keyboard.RIGHT || this.world.keyboard.LEFT) && !this.isAboveGround()) {
            this.playAnimation(ImageHub.character.walk);
        } else if (this.isAboveGround()) {
            this.playAnimation(ImageHub.character.jump);
        } else if (this.isDead()) {
            this.playAnimation(ImageHub.character.dead);
        } else {
            this.animateIdle();
            this.currentImage++;
        }
        this.handleJump();
    };

    /**
     * Checks if no movement buttons are pressed.
     * @returns {boolean} True if the character is idle.
     */
    noButtonsPressed() {
        return (
            !this.world.keyboard.RIGHT &&
            !this.world.keyboard.LEFT &&
            !this.world.keyboard.UP &&
            !this.world.keyboard.DOWN &&
            !this.world.keyboard.SPACE
        );
    }

    /**
     * Handles idle animation based on inactivity time.
     */
    animateIdle() {
        let currentTime = Date.now();
        let timeElapsed = currentTime - this.lastActivityTime;

        if (this.noButtonsPressed()) {
            this.playAnimation(timeElapsed >= 7000 ? ImageHub.character.idleLong : ImageHub.character.idle);
            return;
        }

        this.lastActivityTime = Date.now();
    }

    /**
     * Handles jumping logic when the space key is pressed.
     */
    handleJump() {
        if (this.world.keyboard.SPACE && !this.isAboveGround()) {
            this.jump();
        }
    }

    //#endregion
}

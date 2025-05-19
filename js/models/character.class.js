/**
 * Create a new Character
 * @class
 */

class Character extends MovableObject {
    IMAGES_WALKING = [
        "assets/img/2_character_pepe/2_walk/W-21.png",
        "assets/img/2_character_pepe/2_walk/W-22.png",
        "assets/img/2_character_pepe/2_walk/W-23.png",
        "assets/img/2_character_pepe/2_walk/W-24.png",
        "assets/img/2_character_pepe/2_walk/W-25.png",
        "assets/img/2_character_pepe/2_walk/W-26.png",
    ];

    IMAGES_IDLE = [
        "assets/img/2_character_pepe/1_idle/idle/I-1.png",
        "assets/img/2_character_pepe/1_idle/idle/I-2.png",
        "assets/img/2_character_pepe/1_idle/idle/I-3.png",
        "assets/img/2_character_pepe/1_idle/idle/I-4.png",
        "assets/img/2_character_pepe/1_idle/idle/I-5.png",
        "assets/img/2_character_pepe/1_idle/idle/I-6.png",
        "assets/img/2_character_pepe/1_idle/idle/I-7.png",
        "assets/img/2_character_pepe/1_idle/idle/I-8.png",
        "assets/img/2_character_pepe/1_idle/idle/I-9.png",
        "assets/img/2_character_pepe/1_idle/idle/I-10.png",
    ];

    IMAGES_IDLE_LONG = [
        "assets/img/2_character_pepe/1_idle/long_idle/I-11.png",
        "assets/img/2_character_pepe/1_idle/long_idle/I-12.png",
        "assets/img/2_character_pepe/1_idle/long_idle/I-13.png",
        "assets/img/2_character_pepe/1_idle/long_idle/I-14.png",
        "assets/img/2_character_pepe/1_idle/long_idle/I-15.png",
        "assets/img/2_character_pepe/1_idle/long_idle/I-16.png",
        "assets/img/2_character_pepe/1_idle/long_idle/I-17.png",
        "assets/img/2_character_pepe/1_idle/long_idle/I-18.png",
        "assets/img/2_character_pepe/1_idle/long_idle/I-19.png",
        "assets/img/2_character_pepe/1_idle/long_idle/I-20.png",
    ];

    IMAGES_JUMPING = [
        "assets/img/2_character_pepe/3_jump/J-31.png",
        "assets/img/2_character_pepe/3_jump/J-32.png",
        "assets/img/2_character_pepe/3_jump/J-33.png",
        "assets/img/2_character_pepe/3_jump/J-34.png",
        "assets/img/2_character_pepe/3_jump/J-35.png",
        "assets/img/2_character_pepe/3_jump/J-36.png",
        "assets/img/2_character_pepe/3_jump/J-37.png",
        "assets/img/2_character_pepe/3_jump/J-38.png",
        "assets/img/2_character_pepe/3_jump/J-39.png",
    ];

    world;
    currentImage = 0;
    y = 200;
    acceleration = 2;

    constructor() {
        super();
        this.loadImage("assets/img/2_character_pepe/2_walk/W-21.png");
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_IDLE_LONG);
        this.loadImages(this.IMAGES_JUMPING);

        this.animate();
        this.applyGravity();
        this.offset = { top: 130, bottom: 30, left: 50, right: 50 };
    }

    applyGravity() {
        //damit Pepe runterfällt
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        return this.y < 190;
    }

    animate() {
        // #region walking animation
        setInterval(() => {
            if (
                this.world.keyboard.RIGHT &&
                this.x < this.world.level.level_end_x
            ) {
                this.walkRight();
            }

            if (this.world.keyboard.LEFT && this.x > 0) {
                this.walkLeft();
            }

            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => {
            if (
                (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) &&
                !this.isAboveGround()
            ) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 50);

        //#endregion

        //#region jump animations
        setInterval(() => {
            if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else {
                if (
                    !this.world.keyboard.RIGHT &&
                    !this.world.keyboard.LEFT &&
                    !this.world.keyboard.UP &&
                    !this.world.keyboard.DOWN &&
                    !this.world.keyboard.SPACE
                    //checks if no key was pressed
                ) {
                    let currentTime = Date.now(); //now checks current time
                    let timeElapsed = currentTime - lastActivityTime; //checks how much time since any activity was detected)

                    if (timeElapsed >= 7000) {
                        //if 7 seconds have passed, play long idle animation
                        this.playAnimation(this.IMAGES_IDLE_LONG);
                    } else {
                        // Otherwise, play normal idle animation
                        this.playAnimation(this.IMAGES_IDLE);
                    }

                    this.currentImage++;
                } else {
                    lastActivityTime = Date.now(); // Reset timer when key is pressed
                }
            }

            //Jump only when pressed up and Pepe is on the ground (or not above the ground)
            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump();
            }
        }, 100);
        //#endregion

        //#region Idle animations

        let lastActivityTime = Date.now(); // Store last key press time

        setInterval(() => {
            if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else {
                if (
                    !this.world.keyboard.RIGHT &&
                    !this.world.keyboard.LEFT &&
                    !this.world.keyboard.UP &&
                    !this.world.keyboard.DOWN &&
                    !this.world.keyboard.SPACE
                ) {
                    let currentTime = Date.now();
                    let timeElapsed = currentTime - lastActivityTime;

                    if (timeElapsed >= 7000) {
                        this.playAnimation(this.IMAGES_IDLE_LONG);
                    } else {
                        this.playAnimation(this.IMAGES_IDLE);
                    }
                }
                this.currentImage++;
            }

            if (this.world.keyboard.UP && !this.isAboveGround()) {
                this.speedY = 20;
            }
        }, 200);

        //#endregion
    }
}

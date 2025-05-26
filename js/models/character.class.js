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

    IMAGES_DEAD = [
        "assets/img/2_character_pepe/5_dead/D-51.png",
        "assets/img/2_character_pepe/5_dead/D-52.png",
        "assets/img/2_character_pepe/5_dead/D-53.png",
        "assets/img/2_character_pepe/5_dead/D-54.png",
        "assets/img/2_character_pepe/5_dead/D-55.png",
        "assets/img/2_character_pepe/5_dead/D-56.png",
        "assets/img/2_character_pepe/5_dead/D-57.png",
    ];

    IMAGES_HURT = [
        "assets/img/2_character_pepe/4_hurt/H-41.png",
        "assets/img/2_character_pepe/4_hurt/H-42.png",
        "assets/img/2_character_pepe/4_hurt/H-43.png",
    ];

    world;
    currentImage = 0;
    y = 200;
    acceleration = 2;
    energy = 100;
    coinCounter = 0;
    bottleCounter = 0;
    isFacingRight = true;

    constructor() {
        super();
        this.loadImage("assets/img/2_character_pepe/2_walk/W-21.png");
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_IDLE_LONG);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);

        this.animate();
        this.applyGravity();
        this.offset = { top: 130, bottom: 30, left: 50, right: 50 };

        this.lastActivityTime = Date.now();
    }

    
    

    animate() {
        // #region walking animation
        setInterval(() => {
            if (
                this.world.keyboard.RIGHT &&
                this.x < this.world.level.level_end_x
            ) {
                this.walkRight();
                this.isFacingRight = true;
                console.log(this.isFacingRight);
            }

            if (this.world.keyboard.LEFT && this.x > 0) {
                this.walkLeft();
                this.isFacingRight = false;
                console.log(this.isFacingRight);
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

        let lastActivityTime = Date.now(); // Store last key press time

    setInterval(() => {
    if (this.isAboveGround()) {
        this.playAnimation(this.IMAGES_JUMPING);
    }
    else if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
    }
    else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
    }
    else {
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
        } else {
            lastActivityTime = Date.now(); // **Reset inactivity timer whenever movement occurs**
        }

        this.currentImage++;
    }

    if (this.world.keyboard.SPACE && !this.isAboveGround()) {
        this.speedY = 20;
    }

    if (this.world.keyboard.SPACE && !this.isAboveGround()) {
        this.jump();
    }
}, 200);


    }
}

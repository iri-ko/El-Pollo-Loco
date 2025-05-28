class Character extends MovableObject {

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
        this.loadImages(ImageHub.character.walk);
        this.loadImages(ImageHub.character.idle);
        this.loadImages(ImageHub.character.idleLong);
        this.loadImages(ImageHub.character.jump);
        this.loadImages(ImageHub.character.dead);
        this.loadImages(ImageHub.character.hurt);

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
            }

            if (this.world.keyboard.LEFT && this.x > 0) {
                this.walkLeft();
                this.isFacingRight = false;
            }

            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => {
            if (
                (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) &&
                !this.isAboveGround()
            ) {
                this.playAnimation(ImageHub.character.walk);
            }
        }, 50);
        //#endregion

        let lastActivityTime = Date.now(); // Store last key press time

    setInterval(() => {
    if (this.isAboveGround()) {
        this.playAnimation(ImageHub.character.jump);
    }
    else if (this.isDead()) { 
        this.playAnimation(ImageHub.character.dead); 
    }
    else if (this.isHurt()) {
        this.playAnimation(ImageHub.character.hurt);
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
                this.playAnimation(ImageHub.character.idleLong);
            } else {
                this.playAnimation(ImageHub.character.idle);
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

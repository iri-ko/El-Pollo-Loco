class Character extends MovableObject {
    //#region attributes
    world;
    currentImage = 0;
    y = 200;
    offset = { top: 130, bottom: 30, left: 50, right: 50 };

    acceleration = 2;

    energy = 100;

    coinCounter = 0;
    bottleCounter = 0;

    isFacingRight = true;
    //#endregion

    constructor() {
        super();
        this.loadAllCharacterImages();
        this.animate();
        this.lastActivityTime = Date.now();
        IntervalHub.startInterval(this.applyGravity, 40);
    }

    loadAllCharacterImages() {
        this.loadImage("assets/img/2_character_pepe/2_walk/W-21.png");
        this.loadImages(ImageHub.character.walk);
        this.loadImages(ImageHub.character.idle);
        this.loadImages(ImageHub.character.idleLong);
        this.loadImages(ImageHub.character.jump);
        this.loadImages(ImageHub.character.dead);
        this.loadImages(ImageHub.character.hurt);
    }

    animate() {
        IntervalHub.startInterval(this.checkDirection, 16);
        IntervalHub.startInterval(this.handleMovementAnimation, 200);
    }

    checkDirection = () => {
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

        if (
            (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) &&
            !this.isAboveGround()
        ) {
            this.playAnimation(ImageHub.character.walk);
        }

        this.world.camera_x = -this.x + 100;
    };

    handleMovementAnimation = () => {
    if (this.isAboveGround()) {
        this.playAnimation(ImageHub.character.jump);
    } else if (this.isDead()) {
        this.playAnimation(ImageHub.character.dead);
    } else if (this.isHurt()) {
        this.playAnimation(ImageHub.character.hurt);
    } else {
        let currentTime = Date.now();
        let timeElapsed = currentTime - this.lastActivityTime;

        if (
            !this.world.keyboard.RIGHT &&
            !this.world.keyboard.LEFT &&
            !this.world.keyboard.UP &&
            !this.world.keyboard.DOWN &&
            !this.world.keyboard.SPACE
        ) {
            if (timeElapsed >= 7000) {
                this.playAnimation(ImageHub.character.idleLong);
            } else {
                this.playAnimation(ImageHub.character.idle);
            }
        } else {
            this.lastActivityTime = Date.now(); // **Corrected: Updating class-level variable**
        }

        this.currentImage++;
    }

    if (this.world.keyboard.SPACE && !this.isAboveGround()) {
        this.jump();
    }
};

}

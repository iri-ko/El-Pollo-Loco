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

    world;
    currentImage = 0;
    y = 80
    speedY = 0;
    acceleration = 2;

    constructor() {
        super();
        this.loadImage("assets/img/2_character_pepe/2_walk/W-21.png");
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_IDLE_LONG);

        this.animate();
        this.applyGravity();
    }

    applyGravity(){
        //damit Pepe runterfällt
        setInterval( () => {
            if (this.isAboveGround()){
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25)
    }

    isAboveGround(){
        return this.y < 190;
    }

    animate() {
        // #region walking animation
        setInterval(() => {
            if (
                this.world.keyboard.RIGHT &&
                this.x < this.world.level.level_end_x
            ) {
                this.x += 10;
                this.otherDirection = false;
            }

            if (this.world.keyboard.LEFT && this.x > 0) {
                this.x -= 10;
                this.otherDirection = true;
            }

            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                let i = this.currentImage % this.IMAGES_WALKING.length;
                let path = this.IMAGES_WALKING[i];
                this.img = this.imageCache[path];
                this.currentImage++;
            }
        }, 50);

        //#endregion

        //#region Idle animations

        let lastActivityTime = Date.now(); // Store last key press time

        setInterval(() => {
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

                if (timeElapsed >= 7000) {//if 7 seconds have passed, play long idle animation
                    let i = this.currentImage % this.IMAGES_IDLE_LONG.length;
                    let path = this.IMAGES_IDLE_LONG[i];
                    this.img = this.imageCache[path];
                } else {
                    // Otherwise, play normal idle animation
                    let i = this.currentImage % this.IMAGES_IDLE.length;
                    let path = this.IMAGES_IDLE[i];
                    this.img = this.imageCache[path];
                }

                this.currentImage++;
            } else {
                lastActivityTime = Date.now(); // Reset timer when key is pressed
            }
        }, 200);

        //#endregion
    }
}

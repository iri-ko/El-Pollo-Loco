class BabyChick extends MovableObject {
    IMAGES_WALKING_BABY = [
        "assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
        "assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
        "assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES_WALKING_BABY);
        this.x = 550 + Math.random() * 300;
        this.y = 360;
        this.height = 80;
        this.width = 70;
        this.speed = 0.35 + Math.random() * 0.25;
        this.animate(this.speed);
        this.offset = { top: 7, bottom: 6, left: 7, right: 5 };
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING_BABY);
        }, 80);
        //this.moveLeft();
    }

    die() { 
        this.loadImage(
            "assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png"
        ); // Show "dead" sprite
        setTimeout(() => {
            this.x = -9999; // Move it far off-screen instead of removing it
        }, 500);
    }
}

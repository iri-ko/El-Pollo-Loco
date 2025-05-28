class BabyChick extends MovableObject {
    x = 550 + Math.random() * 300;
    y = 390;
    height= 50;
    width = 50;
    speed = 0.35 + Math.random() * 5;
    offset = { top: 8, bottom: 8, left: 8, right: 8 };

    constructor() {
        super();
        this.loadImages(ImageHub.babyChick.walk);
        this.animate();
    }

    animate = () => {
        IntervalHub.startInterval(this.animateBabyChick, 80);
        //IntervalHub.startInterval(this.moveLeft, 17);
    };

    animateBabyChick = () => {
        this.playAnimation(ImageHub.babyChick.walk);
    };

    die() {
        this.loadImage(
            "assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png"
        ); // Show "dead" sprite
        setTimeout(() => {
            this.x = -9999; // Move it far off-screen instead of removing it
        }, 500);
    }
}

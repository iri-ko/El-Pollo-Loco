class Chicken extends MovableObject {
    constructor() {
        super();
        this.loadImages(ImageHub.chicken.walk);
        this.x = 250 + Math.random() * 300;
        this.y = 360;
        this.height = 80;
        this.width = 70;
        this.speed = 0.35 + Math.random() * 0.25;
        this.animate(this.speed);
        this.offset = { top: 4, bottom: 4, left: 4, right: 4 };
    }

    animate() {
        setInterval(() => {
            this.playAnimation(ImageHub.chicken.walk);
        }, 80);
        //this.moveLeft();
    }

    die() {
        this.loadImage(
            "assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png"
        ); // Show "dead" sprite
        setTimeout(() => {
            this.x = -9999; // Move it far off-screen instead of removing it
        }, 500);
    }
}

class Chicken extends MovableObject {
    
    //#region attributes
    x =  550 + Math.random() * 700;
    y = 360;
    height = 80;
    width = 70;
    speed = 0.35 + Math.random() * 0.25;
    offset = { top: 4, bottom: 4, left: 4, right: 4 };
    //#endregion

    constructor() {
        super();
        this.loadImages(ImageHub.chicken.walk);
        this.animate();
    }

    animate() {
        IntervalHub.startInterval(this.animateChicken, 80, "chickenAnimate")
        IntervalHub.startInterval(this.moveLeft, 17, "chickenMoveLeft");
    }

    animateChicken = () => {
        this.playAnimation(ImageHub.chicken.walk);
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

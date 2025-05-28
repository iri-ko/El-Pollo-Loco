class Endboss extends MovableObject {
    energy = 100;
    x = 2100;
    y = 60;
    height = 400;
    width = 500;
    speed = 25;
    offset = { top: 80, bottom: 30, left: 50, right: 50 };

    constructor() {
        super();
        this.loadImagesEndboss();
        IntervalHub.startInterval(this.animateEndboss, 100)
    }

    loadImagesEndboss() {
        this.loadImages(ImageHub.endboss.alert);
        this.loadImages(ImageHub.endboss.hurt);
        this.loadImages(ImageHub.endboss.dead);
        this.loadImages(ImageHub.endboss.attack);
        this.loadImages(ImageHub.endboss.walk);
    }

    animateEndboss = () => {
        let distance = Math.abs(this.world.character.x - this.x);

        if (this.energy <= 0) {
            this.playAnimation(ImageHub.endboss.dead);
        } else if (this.isHurt()) {
            this.playAnimation(ImageHub.endboss.hurt);
        } else if (distance <= 50) {
            this.playAnimation(ImageHub.endboss.attack);
        } else if (distance <= 700) {
            this.playAnimation(ImageHub.endboss.walk);
            this.x -= this.speed;
        } else {
            this.playAnimation(ImageHub.endboss.alert);
        }
    };
}

class Endboss extends MovableObject {
    energy = 100;
    x = 2100;
    y = 60;
    height = 400;
    width = 500;
    speed = 25;
    offset = { top: 80, bottom: 30, left: 50, right: 50 };

    forwardFlag = false;

    constructor() {
        super();
        this.loadImagesEndboss();
        IntervalHub.startInterval(this.animateEndboss, 100, "bossanima");
    }

    loadImagesEndboss() {
        this.loadImages(ImageHub.endboss.alert);
        this.loadImages(ImageHub.endboss.hurt);
        this.loadImages(ImageHub.endboss.dead);
        this.loadImages(ImageHub.endboss.attack);
        this.loadImages(ImageHub.endboss.walk);
    }

    animateEndboss = () => {
        if (!this.world || !this.world.character) return; // **Prevent errors before world exists**

        let distance = Math.abs(this.world.character.x - this.x);

        if (this.energy <= 0) {
            this.playAnimation(ImageHub.endboss.dead);
        } else if (this.isHurt()) {
            this.playAnimation(ImageHub.endboss.hurt);
        } else if (distance <= 150) {
            this.playAnimation(ImageHub.endboss.attack);
            this.jumpForward();
        } else if (distance <= 600) {
            this.playAnimation(ImageHub.endboss.walk);
            this.x -= this.speed;
        } else {
            this.playAnimation(ImageHub.endboss.alert);
        }
    };

    jumpForward() {
        if (!this.forwardFlag) {
            this.y -= 30;
            this.x -= 30;
            this.forwardFlag = true;
        }

        setTimeout(() => {
            this.y += 30;
        }, 300);

        setTimeout(() => {
            this.forwardFlag = false;
        })
    }
}

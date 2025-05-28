class Endboss extends MovableObject {
    energy = 100;

    constructor() {
        super();
        this.world = this.loadImages(ImageHub.endboss.alert);
        this.loadImages(ImageHub.endboss.hurt);
        this.loadImages(ImageHub.endboss.dead);
        this.loadImages(ImageHub.endboss.attack);
        this.loadImages(ImageHub.endboss.walk);

        this.x = 2100;
        this.y = 60;
        this.height = 400;
        this.width = 500;
        this.speed = 25;
        this.offset = { top: 80, bottom: 30, left: 50, right: 50 };

        this.animate(this.speed);
    }

    animate() {
        setInterval(() => {
            let distance = Math.abs(this.world.character.x - this.x);

            if (this.energy <= 0) {
                this.playAnimation(ImageHub.endboss.dead);
            } else if (this.isHurt()) {
                this.playAnimation(ImageHub.endboss.hurt);
            } else if (distance <= 150) {
                
                this.playAnimation(ImageHub.endboss.attack);
                
            } else if (distance <= 700) {
                this.playAnimation(ImageHub.endboss.walk);
                this.x -= this.speed;
            } else {
                this.playAnimation(ImageHub.endboss.alert);
            }
        }, 100);
    }
}

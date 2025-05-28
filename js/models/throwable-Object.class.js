class ThrowableObject extends MovableObject {
    height = 60;
    width = 60;
    offset = { top: 8, bottom: 8, left: 8, right: 8 };
    speedY = 25;
    speedX;

    constructor(x, y, character, world) {
        super();
        this.loadImage(
            "assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png"
        );
        this.character = character;
        this.world = world;
        this.x = x;
        this.y = y;

        this.loadImagesBottle();

        IntervalHub.startInterval(this.animateThrowBottle, 60)


        this.throw(100, 150);
    }

    loadImagesBottle() {
        this.loadImages(ImageHub.bottle.spin);
        this.loadImages(ImageHub.bottle.splash);
    }

    throw() {
        this.speedX = this.character.isFacingRight ? 15 : -15;
        IntervalHub.startInterval(this.applyGravity, 25);

        IntervalHub.startInterval(this.moveX, 25);
    }

    moveX = () => {
        this.x += this.speedX;
        this.speedX *= 0.98;
    };

    splash() {
        this.isSplashing = true;
        this.playAnimation(ImageHub.bottle.splash);
        this.speedY = 0;
        this.x += 0;

        setTimeout(() => {
            let index = this.world.throwableObjects.indexOf(this);
            if (index > -1) {
                this.world.throwableObjects.splice(index, 1);
            }
        }, ImageHub.bottle.splash.length * 100);
    }

    animateThrowBottle = () => {
        if (this.isSplashing) {
            this.playAnimation(ImageHub.bottle.splash);
        } else {
            this.playAnimation(ImageHub.bottle.spin);
        }
    };
}

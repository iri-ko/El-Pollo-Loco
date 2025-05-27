class ThrowableObject extends MovableObject {
    IMAGES_SPINNING = [
        "assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
        "assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
        "assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
        "assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
    ];

    IMAGES_SPLASHING = [
        "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
        "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
        "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
        "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
        "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
        "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
    ];

    constructor(x, y, character, world) {
        super();
        this.loadImage(
            "assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png"
        );
        this.character = character;
        this.world = world;
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 60;
        this.offset = { top: 8, bottom: 8, left: 8, right: 8 };
        this.loadImages(this.IMAGES_SPINNING);
        this.loadImages(this.IMAGES_SPLASHING);
        //
        this.animate();
        //
        this.throw(100, 150);
    }

    throw() {
        this.speedY = 25;
        this.applyGravity();

        let movementDirection;

        if (this.character.isFacingRight === true) {
            movementDirection = 5; // Move right
        } else {
            movementDirection = -5; // Move left
        }

        setInterval(() => {
            this.x += movementDirection; // 
        }, 25);
    }

splash() {
    this.isSplashing = true;
    this.playAnimation(this.IMAGES_SPLASHING); 
    this.speedY = 0; 
    this.x += 0; 


    setTimeout(() => {
        let index = this.world.throwableObjects.indexOf(this);
        if (index > -1) {
            this.world.throwableObjects.splice(index, 1); 
        }
    }, this.IMAGES_SPLASHING.length * 100); 
}




   animate() {
    setInterval(() => {
        if (this.isSplashing) {
            this.playAnimation(this.IMAGES_SPLASHING); // ✅ Correct animation trigger
        } else {
            this.playAnimation(this.IMAGES_SPINNING); // ✅ Keep spinning until splash
        }
    }, 60);
}

}

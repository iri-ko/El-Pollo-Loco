class ThrowableObject extends MovableObject {
    IMAGES_SPINNING = [
        "assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
        "assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
        "assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
        "assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
    ];

    constructor(x, y, character) {
        super();
        this.loadImage(
            "assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png"
        );
        this.character = character; 
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 60;
        this.offset = { top: 8, bottom: 8, left: 8, right: 8 };
        //this.height = 50;
        //this.width = 50;
        this.loadImages(this.IMAGES_SPINNING);
        //this.animate();
        //
        this.throw(100, 150);
    }

throw() {
    this.speedY = 35;
    this.applyGravity();

    let movementDirection;

    if (this.character.isFacingRight === true) {
        movementDirection = 5; // Move right
    } else {
        movementDirection = -5; // Move left
    }

    setInterval(() => {
        this.x += movementDirection; // ✅ Now using movementDirection correctly!
    }, 25);
}




    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_SPINNING);
        }, 60);
    }
}

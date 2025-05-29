class MovableObject extends DrawableObject {
    //#region attributes
    speed = 0.15;
    otherDirection = false; //für Spiegeln beim links/rechts laufen
    speedY = 0;
    offeset;
    lastHit = 0;
    acceleration = 2;

    //#endregion

    constructor() {
        super();
    }

    applyGravity = () => {
        if (this.isAboveGround() || this.speedY > 0) {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
        } else {
            this.speedY = 0; // speed stays 0 once grounded (to avoid triggering jumpKill when not jumping)
        }
    };

    //#region conditions
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
            //bottle goes through ground when thrown
        } else {
            return this.y < 190;
        }
    }

    isColliding(mo) {
        return (
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top
        );
    }

    jumpKill(chicken) {
        return (
            this.speedY < 0 && // Character must be falling
            this.y + this.height - this.offset.bottom >=
                chicken.y + chicken.offset.top && // Feet land on top
            this.y + this.height - this.offset.bottom <
                chicken.y + chicken.height + 10 && // Small buffer to prevent false triggers
            this.x + this.offset.left <
                chicken.x + chicken.width - chicken.offset.right && // Horizontal alignment
            this.x + this.width - this.offset.right >
                chicken.x + chicken.offset.left // Horizontal alignment
        );
    }

hit() {
    this.energy -= 20;

    if (this.energy <= 0) {
        this.energy = 0; // **This guarantees energy never drops below 0**
        this.lastHit = Date.now();
    } else {
        this.lastHit = Date.now();
        this.currentImage = 0; // Reset animation frame
    }
}



    //#endregion

    //#region hurt/dead
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        return timePassed < 1000;
        //animation plays for 1 second after hit
    }

    isDead() {
        let timePassed = new Date().getTime() - this.lastHit;
        return this.energy == 0 && timePassed < 1000;
    }
    //#endregion

    //#region move/walk directions
    walkRight() {
        this.x += 10;
        this.otherDirection = false;
    }

    walkLeft() {
        this.x -= 10;
        this.otherDirection = true;
    }

    moveLeft = () => {
        this.x -= this.speed; // X gets reduced by 5 according to set time
    };

    moveRight = () => {
        this.x += this.speed; // X gets reduced by 5 according to set time
    };
    //#endregion

    jump() {
        this.speedY = 30; //determines how high Pepe jumps
    }

    playAnimation(images) {
        let i = this.currentImage % images.length; // Ensure looping through the array
        let path = images[i]; // Use passed array, not a missing property
        this.img = this.imageCache[path]; // Retrieve cached image
        this.currentImage++;
    }
}

class MovableObject extends DrawableObject {
    
    speed = 0.15;
    otherDirection = false; //für Spiegeln beim links/rechts laufen
    speedY = 0;

    offeset;
    lastHit = 0;

    constructor() {
        super();
        this.x = 100;
        this.y = 200;
        this.width = 150;
        this.height = 250;
        this.img;
        this.speed = 0.15;

        this.offset = { top: 0, bottom: 0, left: 0, right: 0 };
    }




    

    isColling(mo) {
        return (
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top
        );
    }

   hit() {
    this.energy -= 20;
    if (this.energy <= 0) {
        this.energy = 0;
    } else {
        this.lastHit = Date.now(); // Ensures fresh timestamp
        this.currentImage = 0; // **Reset animation frame to start the hurt animation**
    }
}


    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        return timePassed < 1000;
        //animation plays for 1 second after hit
    }

    isDead() {
        let timePassed = new Date().getTime() - this.lastHit;
        return this.energy == 0 && timePassed < 1000;
    }

    walkRight() {
        this.x += 10;
        this.otherDirection = false;
    }

    walkLeft() {
        this.x -= 10;
        this.otherDirection = true;
    }

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed; // X gets reduced by 5 according to set time
        }, 1000 / 60); //set time
    }

    playAnimation(images) {
        let i = this.currentImage % images.length; // Ensure looping through the array
        let path = images[i]; // Use passed array, not a missing property
        this.img = this.imageCache[path]; // Retrieve cached image
        this.currentImage++;
    }

    jump() {
        this.speedY = 30; //determines how high Pepe jumps
    }
}

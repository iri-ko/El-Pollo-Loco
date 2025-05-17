class MovableObject {
    x = 100; //PLatzierung von CHarakter und Enemies
    y = 200;
    height = 250;
    width = 150;
    img;
    imageCache = {}; //für animations
    currentImage = 0;
    speed = 0.15;
    otherDirection = false; //für Spiegeln beim links/rechts laufen
    speedY = 0;

    loadImage(path) {
        this.img = new Image(); //vorgefertigt
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image(); // kreiert neues Bild
            img.src = path; //Abfrage nach URL
            this.imageCache[path] = img; //Zugriff auf imageCache JSON
        });
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

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

    constructor() {
        this.x = 100;
        this.y = 200;
        this.width = 150;
        this.height = 250;
        this.img;
        this.speed = 0.15;
    }

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

    drawObject(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }

    drawHitbox(ctx){
        ctx.beginPath();
        ctx.lineWidth = "2";
        ctx.strokeStyle = "blue";
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
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

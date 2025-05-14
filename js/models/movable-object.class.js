class MovableObject {
    x = 70; //PLatzierung von CHarakter und Enemies
    y = 200;
    height = 250;
    width = 150;
    img;
    imageCache = {}; //für animations
    currentImage = 0;
    speed = 0.15;

    loadImage(path) {
        this.img = new Image(); //vorgefertigt
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();// kreiert neues Bild
            img.src = path; //Abfrage nach URL
            this.imageCache[path] = img; //Zugriff auf imageCache JSON
        });
    }

    moveRight() {
    }
    
    moveLeft(){
        setInterval(() => {
            this.x -= this.speed // X gets reduced by 5 according to set time
        }, 1000 / 60) //set time
    }
}

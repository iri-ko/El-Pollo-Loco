class MovableObject {
    x = 70; //PLatzierung von CHarakter und Enemies
    y = 200;
    height = 250;
    width = 150;
    img;
    imageCache = {}; //für animations

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
        console.log("move right");
    }

    moveLeft() {}
}

class DrawableObject {
    x = 100; //PLatzierung von CHarakter und Enemies
    y = 200;
    height = 250;
    width = 150;
    img;
    imageCache = {}; //für animations
    currentImage = 0;
    
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

    drawObject(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}

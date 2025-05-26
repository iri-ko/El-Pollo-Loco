class DrawableObject {
    //#region attributes
    x = 100; //PLatzierung von CHarakter und Enemies
    y = 200;
    height = 250;
    width = 150;
    img;
    imageCache = {}; //für animations
    currentImage = 0;
    //endregion

    //#region general rendering
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
    //#endregion

    //#region frames
    drawFrame(ctx) {
        if (
            this instanceof Character ||
            this instanceof Chicken ||
            this instanceof BabyChick ||
            this instanceof SalsaBottle ||
            this instanceof Coin ||
            this instanceof ThrowableObject
        ) {
            ctx.beginPath();
            ctx.lineWidth = "2";
            ctx.strokeStyle = "blue";
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    drawHitbox(ctx) {
        if (
            this instanceof Character ||
            this instanceof Chicken ||
            this instanceof BabyChick ||
            this instanceof SalsaBottle ||
            this instanceof Coin ||
            this instanceof ThrowableObject
        ) {
            ctx.beginPath();
            ctx.lineWidth = "2";
            ctx.strokeStyle = "red";
            ctx.rect(
                this.x + this.offset.left,
                this.y + this.offset.top,
                this.width - this.offset.left - this.offset.right,
                this.height - this.offset.top - this.offset.bottom
            );
            ctx.stroke();
        }
    }
    //#endregion
}

class BackgroundObject extends DrawableObject {
    width = 720;
    height = 480;
    y = 480 - this.height;
    x;

    constructor(imagePath, x){
        super(); //zugriff auf MovableObject
        this.loadImage(imagePath);
        this.x = x;
    }
}
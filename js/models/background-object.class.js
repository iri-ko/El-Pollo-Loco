class BackgroundObject extends MovableObject {
    width = 720;
    height = 480;

    constructor(imagePath, x, y){
        super(); //zugriff auf MovableObject

        this.loadImage(imagePath);
        this.y = 480 - this.height; //setzt images immer ganz nach unten, je nach Höhe)
        this.x = x;
    }
}
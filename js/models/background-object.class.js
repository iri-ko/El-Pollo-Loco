class BackgroundObject extends MovableObject {
    width = 720;
    height = 600;

    constructor(imagePath, x, y){
        super(); //zugriff auf MovableObject

        this.loadImage(imagePath);
        this.y = -120;
        this.x = x;
    }
}
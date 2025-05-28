class SalsaBottle extends DrawableObject {
    x = 49 + Math.random() * 1500;
    y = 360;
    height = 80;
    width = 80;
    offset = { top: 15, bottom: 10, left: 35, right: 18 };

    constructor() {
        super();
        this.loadImage(
            "assets/img/6_salsa_bottle/s1_salsa_bottle_on_ground.png"
        ); 
    }
}

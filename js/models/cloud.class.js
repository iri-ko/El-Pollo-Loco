class Cloud extends MovableObject {
    height = 180;
    speed = 0.15;
    y = 20;
    width = 500;
    x = Math.random() * 500;

    constructor() {
        super();
        this.loadImage("assets/img/5_background/layers/4_clouds/w1.png"); //super übergeordnete FUnkiton -> MovalbeObject
        this.animate();
    }

    animate() {
        IntervalHub.startInterval(this.moveLeft, 17, "cloudMoveleft");
    }
}

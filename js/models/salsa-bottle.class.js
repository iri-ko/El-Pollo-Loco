class SalsaBottle extends MovableObject {

    constructor() {
        super();
        this.loadImage('assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png'); //super übergeordnete FUnkiton -> MovalbeObject
        
        this.x = 50 + Math.random() * 800;
        this.y = 360;
        this.height = 30;
        this.width = 30;
    }
    
}

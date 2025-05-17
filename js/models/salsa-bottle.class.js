class SalsaBottle extends MovableObject {

    constructor() {
        super();
        this.loadImage('assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png'); //super übergeordnete FUnkiton -> MovalbeObject
        
        this.x = 49 + Math.random() * 1500;
        this.y = 360;
        this.height = 80;
        this.width = 80;
    }
    
}

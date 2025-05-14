class Chicken extends MovableObject{

    constructor(){
        super();
        this.loadImage('assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png'); //super übergeordnete FUnkiton -> MovalbeObject

        this.x = 250 + Math.random() * 300;
        this.y = 360;
        this.height = 80;
        this.width = 70;

    }
}
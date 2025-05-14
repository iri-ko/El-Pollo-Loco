class Chicken extends MovableObject{

    constructor(){
        super();
        this.loadImage('assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png'); //super übergeordnete FUnkiton -> MovalbeObject

        this.x = 150 + Math.random() * 100;
        this.y = 70;
        this.height = 40;
        this.width = 30;

    }
}
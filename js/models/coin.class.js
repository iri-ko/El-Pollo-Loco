class Coin extends MovableObject {

    constructor(){
        super();
        this.loadImage('assets/img/8_coin/coin_1.png'); //super übergeordnete FUnkiton -> MovalbeObject
        this.x = 250 + Math.random() * 300;
        this.y = 360 - Math.random() * 300;;
        this.height = 20;
        this.width = 20;
    }

}
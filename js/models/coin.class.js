class Coin extends MovableObject {

    constructor(){
        super();
        this.loadImage('assets/img/8_coin/coin_1.png'); //super übergeordnete FUnkiton -> MovalbeObject
        this.x = 250 + Math.random() * 1200;
        this.y = 150 + Math.random() * 160; // Keeps them between 200 and 360
        this.height = 100;
        this.width = 100;
        this.offset = { top: 35, bottom: 35, left: 35, right: 35};
    }

}
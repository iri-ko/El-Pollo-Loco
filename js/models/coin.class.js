class Coin extends DrawableObject {
        x = 250 + Math.random() * 1200;
        y = 150 + Math.random() * 160; // Keeps them between 200 and 360
        height = 100;
        width = 100;
        offset = { top: 35, bottom: 35, left: 35, right: 35};

    constructor(){
        super();
        this.loadImage('assets/img/8_coin/coin_1.png'); //super übergeordnete FUnkiton -> MovalbeObject
    }
}
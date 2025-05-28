class CoinBar extends StatusBar {
    constructor() {
        super(ImageHub.coinBar);
        this.x = 20;
        this.y = 100;

        this.setPercentage(0);
    }
}
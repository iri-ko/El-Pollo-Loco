class CoinBar extends StatusBar {
    x = 20;
    y = 100;

    constructor() {
        super(ImageHub.coinBar);
        this.setPercentage(0);
    }
}

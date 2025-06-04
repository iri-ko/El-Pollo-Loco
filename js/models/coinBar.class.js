/**
 * creates new coinbar that shows status of collected coins
 * @class
 */
class CoinBar extends StatusBar {
    /**
     * horizontal position of coin bar.
     * @type {number}
     */
    x = 20;

    /**
     * vertical position of coin bar.
     * @type {number}
     */
    y = 100;

    /**
     * Creates CoinBar instance.
     * Loads coin bar sprite from ImageHub and initializes percentage to 0.
     */
    constructor() {
        super(ImageHub.coinBar);
        this.setPercentage(0);
    }
}

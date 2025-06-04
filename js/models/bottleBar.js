/**
 * creates BottleBar that displays amount of collected bottles
 * @class
 */
class BottleBar extends StatusBar {
    /**
     * The horizontal position of the bottle bar.
     * @type {number}
     */
    x = 20;

    /**
     * The vertical position of the bottle bar.
     * @type {number}
     */
    y = 40;

    /**
     * Creates BottleBar instance.
     * Loads bottle bar sprite from ImageHub and initializes percentage to 0.
     */
    constructor() {
        super(ImageHub.bottleBar);
        this.setPercentage(0);
    }
}

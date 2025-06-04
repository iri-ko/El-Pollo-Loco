/**
 * creates new Coin
 * @class
 */
class Coin extends DrawableObject {
    /**
     * horizontal position of coin, randomized within range.
     * @type {number}
     */
    x = 250 + Math.random() * 1200;

    /**
     * vertical position of coin, randomized within range.
     * Keeps coin between 200 and 360 on the screen.
     * @type {number}
     */
    y = 150 + Math.random() * 160;

    /**
     *  height of  coin sprite.
     * @type {number}
     */
    height = 100;

    /**
     *  width of coin sprite.
     * @type {number}
     */
    width = 100;

    /**
     * Offset values used for collision detection.
     * @type {Object}
     * @property {number} top - Top offset.
     * @property {number} bottom - Bottom offset.
     * @property {number} left - Left offset.
     * @property {number} right - Right offset.
     */
    offset = { top: 35, bottom: 35, left: 35, right: 35 };

    /**
     * Creates Coin instance and loads image.
     */
    constructor() {
        super();
        this.loadImage('assets/img/8_coin/coin_1.png'); 
    }
}

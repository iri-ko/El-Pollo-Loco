/**
 * Creates new Salsa Bottle
 * @class
 */
class SalsaBottle extends DrawableObject {
    /**
     * The horizontal position of the salsa bottle, randomized within a range.
     * @type {number}
     */
    x = 49 + Math.random() * 1500;

    /**
     * The vertical position of the salsa bottle.
     * @type {number}
     */
    y = 360;

    /**
     * The height of the salsa bottle sprite.
     * @type {number}
     */
    height = 80;

    /**
     * The width of the salsa bottle sprite.
     * @type {number}
     */
    width = 80;

    /**
     * Offset values used for collision detection.
     * @type {Object}
     * @property {number} top - Top offset.
     * @property {number} bottom - Bottom offset.
     * @property {number} left - Left offset.
     * @property {number} right - Right offset.
     */
    offset = { top: 15, bottom: 10, left: 35, right: 18 };

    /**
     * Creates a SalsaBottle instance and loads its image.
     */
    constructor() {
        super();
        this.loadImage("assets/img/6_salsa_bottle/s1_salsa_bottle_on_ground.png");
    }
}

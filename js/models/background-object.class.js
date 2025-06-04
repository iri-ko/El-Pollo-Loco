/**
 * Represents a background object in the game.
 * @class
 */
class BackgroundObject extends DrawableObject {
    /**
     * The width of the background object.
     * @type {number}
     */
    width = 720;

    /**
     * The height of the background object.
     * @type {number}
     */
    height = 480;

    /**
     * The vertical position of the background object. Automatically calculated based on its height.
     * @type {number}
     */
    y = 480 - this.height;

    /**
     * The horizontal position of the background object.
     * @type {number}
     */
    x;

    /**
     * Creates a background object instance and loads its image.
     * 
     * @param {string} imagePath - file path of background image.
     * @param {number} x - horizontal position of background object.
     */
    constructor(imagePath, x) {
        super();
        this.loadImage(imagePath);
        this.x = x;
    }
}

/**
 * Represents a status bar displaying a percentage-based value.
 * @class
 */
class StatusBar extends DrawableObject {
    /**
     * The current percentage value displayed on the status bar.
     * @type {number}
     */
    percentage;

    /**
     * Array of image paths representing different status levels.
     * @type {string[]}
     */
    IMAGES = [];

    /**
     * The vertical position of the status bar.
     * @type {number}
     */
    y = -10;

    x= 20;

    /**
     * The height of the status bar.
     * @type {number}
     */
    height = 60;

    /**
     * The width of the status bar.
     * @type {number}
     */
    width = 200;

    /**
     * Creates a new StatusBar instance.
     * Loads status bar images and initializes percentage to 100%.
     * 
     * @param {string[]} images - Array of image file paths representing different percentage levels.
     */
    constructor(images) {
        super();
        this.IMAGES = images;
        this.loadImages(this.IMAGES);
        this.setPercentage(100);
    }

    /**
     * Updates the percentage value displayed on the status bar.
     * Determines the appropriate image based on the percentage value.
     * 
     * @param {number} percentage - The new percentage value (0-100).
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let barPath = this.resolveImageIndex();
        this.img = this.imageCache[barPath];
    }

    /**
     * Resolves the correct image index based on the percentage value.
     * 
     * @returns {string} The file path of the corresponding image.
     */
    resolveImageIndex() {
        if (this.percentage >= 100) return this.IMAGES[0];
        if (this.percentage > 80) return this.IMAGES[1];
        if (this.percentage > 60) return this.IMAGES[2];
        if (this.percentage > 20) return this.IMAGES[3];
        if (this.percentage > 0) return this.IMAGES[4];
        return this.IMAGES[5]; 
    }
}

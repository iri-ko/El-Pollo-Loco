/**
 * creates healthbar for boss
 * @class
 */
class BossBar extends StatusBar {
    /**
     * horizontal position of the boss bar.
     * @type {number}
     */
    x = 400;

    /**
     * vertical position of the boss bar.
     * @type {number}
     */
    y = 420;

    /**
     * width of the boss bar.
     * @type {number}
     */
    width = 300;

    /**
     * height of the boss bar.
     * @type {number}
     */
    height = 60;

    /**
     * Creates BossBar instance.
     * Loads boss health bar sprite from ImageHub.
     */
    constructor() {
        super(ImageHub.bossBar);
    }

    /**
     * Updates  boss bar image based on  given health percentage.
     * 
     * @param {number} percentage -  current health percentage of boss.
     */
    setPercentage(percentage) {
        let imageIndex = Math.floor(
            (percentage / 100) * (this.IMAGES.length - 1)
        );
        imageIndex = Math.max(0, Math.min(imageIndex, this.IMAGES.length - 1));

        this.currentImage = this.IMAGES[imageIndex];

        if (this.currentImage) {
            this.img = new Image();
            this.img.src = this.currentImage;
        }
    }
}

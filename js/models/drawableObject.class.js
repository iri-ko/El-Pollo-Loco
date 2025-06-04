/**
 * Represents a drawable object in the game.
 * @class.
 */
class DrawableObject {
    //#region Attributes

    /**
     * horizontal position of object.
     * @type {number}
     */
    x = 100;

    /**
     * vertical position of object.
     * @type {number}
     */
    y = 200;

    /**
     * height of object.
     * @type {number}
     */
    height = 250;

    /**
     * width of object.
     * @type {number}
     */
    width = 150;

    /**
     * image used for rendering object.
     * @type {HTMLImageElement}
     */
    img;

    /**
     * Cache for preloaded images used for animations.
     * @type {Object}
     */
    imageCache = {};

    /**
     * index of currently displayed animation frame.
     * @type {number}
     */
    currentImage = 0;

    //#endregion

    //#region General Rendering

    /**
     * Loads single image for the object.
     * @param {string} path - file path of the image.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Loads array of images into image cache for animations.
     * @param {string[]} arr - Array of image file paths.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Draws the object onto the given canvas context.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    //#endregion

    //#region Frames

    /**
     * Draws a debug frame around the object if it is an instance of a valid class.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     * currently not in use, only for helping with collision
     */
    drawFrame(ctx) {
        if (this.frameInstances()) {
            ctx.beginPath();
            ctx.lineWidth = "2";
            ctx.strokeStyle = "blue";
            ctx.rect(this.x, this.y, this.width, this.height);
            //ctx.stroke();
        }
    }

    /**
     * Draws a debug hitbox around the object if it is an instance of a valid class.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     * currently not in use, only for helping with collision
     */
    drawHitbox(ctx) {
        if (this.frameInstances()) {
            ctx.beginPath();
            ctx.lineWidth = "2";
            ctx.strokeStyle = "red";
            ctx.rect(
                this.x + this.offset.left,
                this.y + this.offset.top,
                this.width - this.offset.left - this.offset.right,
                this.height - this.offset.top - this.offset.bottom
            );
        }
    }

    /**
     * determines whether current object is an instance of specific game entities.
     * @returns {boolean} True if  object is an instance of a recognized entity.
     */
    frameInstances() {
        return (
            this instanceof Character ||
            this instanceof Chicken ||
            this instanceof BabyChick ||
            this instanceof Endboss ||
            this instanceof SalsaBottle ||
            this instanceof Coin ||
            this instanceof ThrowableObject
        );
    }

    //#endregion
}
